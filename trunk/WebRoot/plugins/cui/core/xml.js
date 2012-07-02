(function(cuiPackage){
	/**
	 * @class jQuery.fn.XML
	 * @singleton
	 * XML解析类
	 * @author cqb
	 * @version 1.0
	 */
	cuiPackage.Class("XML",{
		doc: null,
		xml: null,
		/**
         * @private
         * @description 设置参数信息
         * @param {json} options构造参数对象
         */
        _initialize : function(options){
        	jQuery.extend(this, options);
            this._create();
        },
        
        _create: function(){
        	this.createXmlDoc();
        	if(this.xml){
        		this.loadXml();
        	}
        },
        
        createXmlDoc: function(){
        	if(jQuery.browser.msie){
                var arrSingatures = [
                    "MSXML2.DOMDocument.5.0",
                    "MSXML2.DOMDocument.4.0",
                    "MSXML2.DOMDocument.3.0",
                    "MSXML2.DOMDocument",
                    "Microsoft.XmlDom"
                ];
                for(var i=0;i<arrSingatures.length;i++){
                    try{
                        this.doc = new ActiveXObject(arrSingatures[i]);
                        this.doc.async=false;
                        return false;
                    }catch(oError){}
                }
                throw new Error("当前是IE特殊版本！");
            }else{
                this.doc = document.implementation.createDocument("","",null);
                this.doc.async=false;
                return false; 
            }
        },
        
        loadXml: function(){
        	if(this.xml == null){
                 throw new Error("xml属性为空！");
             }
             if(typeof(this.xml) == "object"){
                 this.doc = this.xml;
             }else{
                 this.xml = jQuery.trim(this.xml);
                 if(jQuery.browser.msie){
                     if(this.isStringXML(this.xml)){
                        this.doc.loadXML(this.xml);
                     }else{
                        this.doc.load(this.xml);
                     }
                 }else if(jQuery.browser.mozilla){
                    if(this.isStringXML(this.xml)){
                        var oParser = new DOMParser();
                        this.doc = oParser.parseFromString(this.xml,"text/xml");
                    }else{
                        this.doc.load(this.xml);
                    }
                 }else{
                    if(this.isStringXML(this.xml)){
                        var oParser = new DOMParser();
                        this.doc = oParser.parseFromString(this.xml,"text/xml");
                    }else{
                        var xmlhttp = new window.XMLHttpRequest();
                        xmlhttp.open("GET", this.xml, false);
                        xmlhttp.send(null);
                        this.doc = xmlhttp.responseXML;
                    }
                 }
             }
        },
        
        toString: function(){
        	if(jQuery.browser.msie){
                return this.doc.xml;
            }else{
                return new XMLSerializer().serializeToString(this.doc,"text/xml");
            }
        },
        
        isStringXML: function(xml){
        	if(xml.indexOf("<") != -1 && xml.indexOf(">") != -1){
        		return true;
        	}
        	return false;
        },
        
        getRootNode : function(){
            var root = this.doc.documentElement;
            if(root == null){
                throw new Error("传入的XML可能存在不合法的字符！");
            }
            return new cuiPackage.XML.Node({node: root});
        },
        
        createElement: function(tagName, value){
        	var ele = this.doc.createElement(tagName);
        	if(value){
        		ele.text = value;
        	}
        	return ele;
        },
        
        createAttribute: function(ele, key, value){
        	var attr = this.doc.createAttribute(key);
        	attr.value = value;
        	ele.setAttributeNode(attr);
        },
        
        createAttributes: function(ele, attrs){
        	for(var i in attrs){
        		this.createAttribute(ele, i, attrs[i]);
        	}
        }
	});
	
	cuiPackage.Class("XML.Node", cuiPackage.XML, {
		tagName: null,
		value: null,
		attributes: null,
		node: null,
		/**
         * @private
         * @description 设置参数信息
         * @param {json} options构造参数对象
         */
        _initialize : function(options){
        	jQuery.extend(this, options);
            this._create();
        },
        
        _create: function(){
        	if(this.tagName){
        		this.node = this.createElement(this.tagName, this.value);
        	}
        	if(this.node && this.attributes){
        		this.createAttributes(this.node, this.attributes);
        	}
        },
        
        appendChild: function(node){
        	this.node.appendChild(node.node);
        },
        
        removeChild : function(node){
            this.node.removeChild(node.node);
        },
        
        getNodeValue : function(){
			var childs = this.node.childNodes;
            if(childs.length > 0){
                return childs[0].nodeValue == null ? "" : childs[0].nodeValue;
            }else{
                return "";
            }
        },
        
        getAttribute : function(attrname){
            return this.node.getAttribute(attrname);
        },
        
        getAttributes : function(){
            var attrArray = new Array();
            var attr = this.node.attributes;
            if(attr != null){
                for(var i=0; i<attr.length; i++){
                    attrArray.push({name: attr[i].nodeName,value: attr[i].nodeValue});
                }
                return attrArray;
            }
        },
        
        getParentNode : function(){
            return this.node.parentNode == null ? null : new cuiPackage.XML.Node({node:this.node.parentNode});
        },
        
        getChildNodes : function(tagName){
            var childNodes = null;
            if(typeof(tagName)=="undefined"){
                childNodes = this.node.childNodes;
            }else{
                childNodes = this.node.getElementsByTagName(tagName);
            }
            var childNodesArray = new Array();
            for(var i=0,num=childNodes.length;i<num;i++){
                if(childNodes[i].nodeType==1){
                    childNodesArray.push(new cuiPackage.XML.Node({node:childNodes[i]}));
                }
            }
            return childNodesArray;    
        },
        
        getChildNodesByXPath : function(xPath){
             if(xPath != null && xPath != '' && typeof(xPath) != "undefined"){
                 var childNodes = null;
                 var childNodesArray = new Array();
                 if(jQuery.browser.msie){
                    childNodes = this.node.selectNodes(xPath);
                    for(var i=0, num=childNodes.length; i<num; i++){
                       childNodesArray.push(new cuiPackage.XML.Node({node:childNodes[i]}));
                    }
                 }else{
                     var oEvaluator = new XPathEvaluator();
                     childNodes = oEvaluator.evaluate(xPath,this.node,null,XPathResult.ORDERED_NODE_ITERATOR_TYPE,null);
                     if(childNodes!=null){
                        var oElement = childNodes.iterateNext();
                        while(oElement){
                            childNodesArray.push(new cuiPackage.XML.Node({node:oElement}));
                            oElement = childNodes.iterateNext();
                        }
                     }
                 }
                 return childNodesArray;
             }else{
                 throw new Error("xpath可能存在问题!");
             }
        },
        
        getPreviousNode : function(){
            if(jQuery.browser.msie){
                var pNode = this.node.previousSibling;
                if(pNode == null){
                    return null;
                }else{
                    return new cuiPackage.XML.Node({node:pNode});
                }
            }else{
                var pNode = this.node.previousSibling;
                while(pNode != null){
                    if(pNode.nodeType == 1){
                        return new cuiPackage.XML.Node({node:pNode});
                    }
                    pNode = pNode.previousSibling;
                }
                return null;
            }
        },

        /**
          * @description : 返回当前节点的后一节点
          * @return {Node}: {@link jQuery.fn.base.Xml.Node}当前节点的后一节点
          */
        getNextNode : function(){
            if(jQuery.browser.msie){
                var nNode = this.node.nextSibling;
                if(nNode == null){
                    return null;
                }else{
                    return new cuiPackage.XML.Node({node:nNode});
                }
            }else{
                var nNode = this.node.nextSibling;
                while(nNode != null){
                    if(nNode.nodeType == 1){
                        return new cuiPackage.XML.Node({node:nNode});
                    }
                    nNode = nNode.nextSibling;
                }
                return null;
            }
        }
	});
})(jQuery.fn);