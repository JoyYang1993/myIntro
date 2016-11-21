(function($) {
    $.commonMiniShoppingcar=function(){
        var $commonMiniShoppingcar={};
        var mincar,isDate = false,time=0,first=true,isOver=false;
        $commonMiniShoppingcar.methods={
            init:function(){
                time=new Date().getTime();
                this.popup();
                $commonMiniShoppingcar.onHover();
            },
            popup:function(){
                var popurl=$common.dev.getPopUrl("miniShoppingcar");
                new $.popup.show({url:popurl,
                    complete:function(data){
                        $(".headerBox .minicart").append(data);
                        $('.minicarlistbox').jScrollPane({autoReinitialise: true,verticalDragMinHeight: 32,verticalDragMaxHeight: 32});
                    },
                    error:function(){}
                });
            }
        };
        $commonMiniShoppingcar.onHover=function(){
            $(".minicart").hover(function() {
				$(this).addClass("hover");
				isOver=true;
                var now=new Date().getTime();
                if(now-time>5000||first){
                   first=false;
                   time=now;
                   $(".manicarBox").show();
                   $common.loading.show(".manicarBox");
                   $commonMiniShoppingcar.updata();
                }else{
                    if(!isDate){
                       $(".emptyCart").show();
                     }else{
                       $(".manicarBox").show();
                     }
                }
            }, function() {
				$(this).removeClass("hover");
                $(".manicarBox").hide();
                $(".emptyCart").hide();
                isOver=false;
            });
        };
        $commonMiniShoppingcar.addData=function(data){
            if(data.info.length == 0){
                isDate = false;
                $(".manicarBox").hide();
                if(isOver)$(".emptyCart").show();
            }else{
                isDate = true;
                $(".emptyCart").hide();
                if(isOver)$(".manicarBox").show();
                $(".minicarlistbox .jspPane").html('');
                $.each(data.info,function(index,item){
                    var presaleHtml=item.isPresale?'<span class="lablePreSale show"></span>':'';
                    $(".minicarlistbox .jspPane").append('<div class="minicarProBox cf">'+
                        '<a href="#" title="" class="headProImg"><img src="'+item.img+'" alt="" /></a>'+
                        '<div class="headProTxt">'+
                            '<a title="" class="headProTit">'+item.name+'</a>'+
                            '<span class="headProColor">颜色：'+item.color+'</span>'+
                            '<span class="headProSize">尺寸：'+item.size+'</span>'+
                            '<span class="headProNum"><em>'+item.qty+'</em>x<em class="headPrice">¥'+item.price+'</em>'+presaleHtml+'</span>'+
                        '</div>'+
                    '</div>');
                });
                $(".manicarBox .headTotalPrice em").html('¥'+data.totalprice);
                $(".manicarBox .headEmptyTxt em").html(data.qty);
            }
            $common.loading.hide();
        };
        $commonMiniShoppingcar.ajax=function(obj){
            new $.setAjax({url:obj.url,data:obj.data,type:obj.type,dataType:"json",
                success:function(data){$commonMiniShoppingcar.addData(data);}
            });
        };
        $commonMiniShoppingcar.updata=function(obj){
            $commonMiniShoppingcar.ajax($common.dev.getAjaxUrl("miniShoppingcar"));
        };
        return $commonMiniShoppingcar.methods;
    };
})(jQuery);