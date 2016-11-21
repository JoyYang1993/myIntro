(function($) {
    $.productStruct=function(){
        var $productStruct={};
        $productStruct.methods={
            init:function(){
				return this;
			},
            showMore1:function(el){
                new $.loadImages($(el),{type:"data-slides-img"});
                if($(el).hasClass("showSizes")){
                }else{
                    $(el).addClass("hover");
                }
            },
            showMore2:function(el){
                if(!$(el).hasClass("showSizes")){
                    $(el).removeClass("hover");
                }
            },
            selectSize:function(el){
                if(!$(el).hasClass('addCart')){
                    $(".addCartOverlay").show();
                    $(el).parents(".productTile").addClass("showSizes");
    				$(el).addClass("disabled");
                }
            },
            replayStyle:function(){
                $(".addCartOverlay").hide();
                $(".productTile").removeClass("hover showSizes");
                $(".productTile").each(function(){
                    if($(this).find(".btnCommon").hasClass('addCart')){
                        $(this).find(".copySelect").data("copySelect").replay();
                    }
                });
                $(".productTile .btnCommon.addCart").unbind("click.addcart");
                $(".productTile .btnCommon").removeClass("disabled addCart");
            },
            closeSize:function(el){
                this.replayStyle();
            },
            slide:function(el){
                $(el).flexslider({
                    animation: "slide",
                    slideshow: false,
                    move:3,
                    itemWidth:52,
                    itemMargin:4,
                    animationLoop:false,
                    slideshowSpeed:5000,
                    controlNav:false,
                    directionNav:true,
                    maxItems:3,
                }); 
            }, 
            switchColor:function(el){
                $(el).siblings().removeClass("active");
                $(el).addClass("active");
            },
            changeSelect:function(el){
                var selectIndex=$(el).children("option:selected").index();
                 if(selectIndex==0){
                     $(el).parents(".productTile").find(".btnCommon").removeClass('addCart');
                     $(el).parents(".productTile").find(".btnCommon.btnAddBag.addCart").unbind("click.addcart");
                     $(el).parents(".productTile").find(".btnCommon").addClass('disabled');
                 }else{
                     $(el).parents(".productTile").find(".btnCommon").addClass('addCart');
                     $(el).parents(".productTile").find(".btnCommon.btnAddBag.addCart").bind("click.addcart",function(){$common.addCart.click($(this));});
                     $(el).parents(".productTile").find(".btnCommon").removeClass('disabled');
                 }
            },
            run:function(){
                $(".productTile").hover(function(){$productStruct.methods.showMore1(this);},function(){$productStruct.methods.showMore2(this);});//hover的时候展开或关闭加入购物车
                $(".productTile .btnCommon").click(function(){$productStruct.methods.selectSize(this);});//点击购物车选择尺码
                $(".productTile .closeButton").click(function(){$productStruct.methods.closeSize(this);});//关闭尺码选择，恢复默认属性
                $(".colorCarousel .slides li").click(function(){$productStruct.methods.switchColor(this);});//关闭尺码选择，恢复默认属性
                $(".productTile").each(function(){
                    if($(this).find(".colorCarousel .slides li").length>3){$productStruct.methods.slide($(this).find(".colorCarousel"));}//当产品颜色大于三种的时候轮播
                });
                $(".copySelect select").bind("change",function(event,index,option){$productStruct.methods.changeSelect($(this));});//选择尺码的时候，加入购物车按钮变蓝并且可以点击
                $(".addCartOverlay").click(function(){$productStruct.methods.replayStyle();});
                return this;
            }
        };
        return $productStruct.methods;
    };
})(jQuery);