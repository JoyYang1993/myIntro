(function($) {
    $.page=function(){
        var $page={};
        $page.methods={
            init:function(){
				//顶部轮播
                $(".hpKv .slider").carouselImages({arrow:true,round:true,autoPlay:true,loop:true,loading:true,version:"px"});
				$page.slider.init();
				this.event();
				//tab初始化显示内容
				var index=$('.hpTabNav li.cur').index();
				$(".hpTabItem").eq(index).show().siblings(".hpTabItem").hide();
            },
			//tab切换
			tab:function(el){
				var index=$(el).index();
				$(el).addClass("cur").siblings().removeClass("cur");
				$(".hpTabItem").eq(index).show().siblings(".hpTabItem").hide();
			},
			//图片缩放
			zoomImage:function(el,isZoom){
			    var scale=isZoom?1.1:1;
			    TweenMax.to($(el).children("img")[0],2.5,{css:{scale:scale},ease:Linear.easeInOut});
			},
			event:function(){
				$(".hpTabNav li").click(function(){$page.methods.tab(this);});
				if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE8.0"){return false;}
				$(".hpClassify a").hover(function(){$page.methods.zoomImage(this,true);},function(){$page.methods.zoomImage(this,false);});
				 
			}
		};
		$page.slider={
            init:function(){
                //你可能也会喜欢slider
                new touchslider('.menItem .pdpSuggestSlides', {nextButton: '.menItem .nextH',prevButton: '.menItem .prevH',size:4,scrollSize:4,direction:'horizontal',
                    moveFinishEvent:function(crtPage,totalPage){
                        $page.slider.arrowStyle(".menItem",crtPage,totalPage);
                    }
                 });
				 
				 new touchslider('.womenItem .pdpSuggestSlides', {nextButton: '.womenItem .nextH',prevButton: '.womenItem .prevH',size:4,scrollSize:4,direction:'horizontal',
                    moveFinishEvent:function(crtPage,totalPage){
                        $page.slider.arrowStyle(".womenItem",crtPage,totalPage);
                    }
                 });	 
            },
            //更新箭头样式
            arrowStyle:function(el,crtPage,totalPage){
                $(el).find(".nextH").removeClass("unable");
                $(el).find(".prevH").removeClass("unable");
                if(crtPage==1){$(el).find(".prevH").addClass("unable");}
                if(crtPage==totalPage){$(el).find(".nextH").addClass("unable");}
            }
        };
        return $page.methods;
    };
})(jQuery);