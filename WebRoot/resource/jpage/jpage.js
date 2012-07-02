$(function(){
	//下一页
	$(".default_pgNext").click(function(){
		var page = parseInt(document.pageform.page.value);
		var pageCount = parseInt(document.pageform.pageCount.value);
		page = page + 1;
		
		if(page == pageCount){
			alert("已经是最后一页");
			return;
		}
		document.pageform.page.value = page;
		document.pageform.submit();
	});
	
	//最后一页
	$(".default_pgLast").click(function(){
		var page = parseInt(document.pageform.page.value);
		var pageCount = parseInt(document.pageform.pageCount.value);
		
		if(page == pageCount -1){
			alert("已经是最后一页");
			return;
		}
		
		page = pageCount - 1;
		
		document.pageform.page.value = page;
		document.pageform.submit();
	});
	
	//上一页
	$(".default_pgPrev").click(function(){
		var page = parseInt(document.pageform.page.value);
		var pageCount = parseInt(document.pageform.pageCount.value);
		
		page = page - 1;
		if(page == -1){
			page = page + 1;
			alert("已经是第一页");
			return;
		}
		
		document.pageform.page.value = page;
		document.pageform.submit();
	});
	
	//第一页
	$(".default_pgFirst").click(function(){
		var page = parseInt(document.pageform.page.value);
		var pageCount = parseInt(document.pageform.pageCount.value);
		
		if(page == 0){
			alert("已经是第一页");
			return;
		}
		page = 0;
		
		document.pageform.page.value = page;
		document.pageform.submit();
	});
});