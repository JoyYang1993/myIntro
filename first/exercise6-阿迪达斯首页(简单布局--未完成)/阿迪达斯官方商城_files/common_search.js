(function($) {
    $.commonSearch=function(){
        var $commonSearch={};
        $commonSearch.methods={
            init:function(){
               	new $.search(".headSeachArea",{
               	    list:".headSeachList",listType:"li",
               	    //键入的事件
               	    keyEnter:function(str,dom){},
               	    //请求ajax之前
               	    ajaxStart:function(){this.ajax($common.dev.getAjaxUrl("search"));},
               	    //ajax完成之后
               	    addData:function(data){
               	        console.log(data)
               	    	var html = '<div class="column">\
                            	<div class="headline">相关关键字</div>\
                                <div class="headProTit Keywordlist">\
                                </div>\
                            </div>\
                            <div class="column headProducts">\
                            	<div class="headline">产品</div>\
                                 <div class="suggestList productslist">\
                                </div>\
                            </div>\
                            <div class="column headProducts ">\
                            	<div class="headline"></div>\
                                <div class="headProTit typelist">\
                                 </div>\
                        </div>'
                        $('.headSeachList').append(html)
               	    	 $.each(data.info,function(index,item){
               	    	 	$('.headSeachList .Keywordlist').append('<a href="'+item.url+'" title="men">'+item.name+'</a>')
               	    	 });

               	    	 var index =  0
               	    	 $.each(data.product,function(index,item){
               	    	 	var producthtml = 	'<div class="headSearchBox cf">\
			                                    	<a href="'+item.url+'" title="" class="headProImg"><img src="'+item.img+'" alt="" /></a>\
			                                     	<div class="headProTxt">\
			                                        	<a href="'+item.url+'">'+item.name+'<br />ITB29</a>\
			                                            <span>¥'+item.price+'</span>\
			                                        </div>\
			                                    </div>'
                            if(index <3 )
                            {
                            	$('.headSeachList .productslist').append(producthtml)
                            }else
                            {
                            
                            	$('.headSeachList .typelist').append(producthtml)
                            }
               	    	 	
                            index++
               	    	 });
               	    	  //$.each(data.type,function(index,item){
               	    	// 	$('.headSeachList .typelist').append('<a href="#" title="men">'+item.name+'</a>')

               	    	 //});
               	    }
               	});
            }
        };
        return $commonSearch.methods;
    };
})(jQuery);