(function($){
    $.carouselImages= function(el, options) {
        var carouselImages=$(el),
         touch = ("ontouchstart" in window) || window.DocumentTouch && document instanceof DocumentTouch,
         eventType = (touch) ? "touchstart" : "click";
         $.data(el, "carouselImages", carouselImages);
        carouselImages.methods = {
            init:function(){
                carouselImages.type=options.type||"li";
                carouselImages.width=options.width||carouselImages.find(carouselImages.type).eq(0).outerWidth();
                carouselImages.total=carouselImages.find(carouselImages.type).size();
                carouselImages.current=options.current||0;
                carouselImages.speed=options.speed||500;
                carouselImages.easing=options.ease||"swing";
                carouselImages.loop=options.loop||false;
                carouselImages.version=options.version||"px";
                carouselImages.time=options.time||8000;
                carouselImages.autoplay=options.autoPlay||false;
                carouselImages.autoPlayNum=null;
                carouselImages.callback=options.callback||null;
                carouselImages.container = $(options.content||carouselImages.find("ul"), carouselImages);
                carouselImages.sync=options.sync||true;
                carouselImages.animating=false;

                carouselImages.setup();
                carouselImages.contentEvent();
                carouselImages.style();
                if(options.arrow&&carouselImages.total>1) this.directionNav.setup();
                if(options.round&&carouselImages.total>1) this.directionRound.setup();
                if(options.thum&&options.thum!="")this.thum.setup();
                if(carouselImages.autoplay&&carouselImages.total>1)this.autoplay.openAutoplay();

                if(carouselImages.sync)this.loading.setup();
                
            },
            autoplay:{
                openAutoplay:function(){
                    carouselImages.autoPlayNum=setInterval(function(){carouselImages.carouselImagesAnimate(carouselImages.getCurrent(carouselImages.current,"next"))},carouselImages.time);
                },
                closeAutoPlay:function(){
                    clearInterval(carouselImages.autoPlayNum);
                }
            },
            directionNav:{
                setup:function(){
                    var directionNavStr='<div class="carouselImages-direction-nav"><span class="carouselImages-prev"></span><span class="carouselImages-next"></span></div>';
                     carouselImages.append(directionNavStr);
                     carouselImages.directionNav = $('.carouselImages-direction-nav span',carouselImages);
                     if(options.arrow) carouselImages.methods.directionNav.style();
                     carouselImages.directionNav.bind(eventType, function(event) {
                        var direction=$(this).hasClass("carouselImages-next")?"next":"prev";
                        if(carouselImages.animating)return false;
                        carouselImages.carouselImagesAnimate(carouselImages.getCurrent(carouselImages.current,direction))
                     });
                },
                style:function(){
                    var prev=carouselImages.directionNav.eq(0);
                    var next=carouselImages.directionNav.eq(1);
                    if(carouselImages.total<=1){
                        prev.css({"opacity":.5,"filter":"alpha(opacity=50)","cursor":"default"});
                        next.css({"opacity":.5,"filter":"alpha(opacity=50)","cursor":"default"});
                        return false;
                    }
                    if(carouselImages.loop) return false;
                    prev.css({"opacity":1,"filter":"alpha(opacity=100)","cursor":"pointer"});
                    next.css({"opacity":1,"filter":"alpha(opacity=100)","cursor":"pointer"});
                    if(carouselImages.current==0)prev.css({"opacity":.5,"filter":"alpha(opacity=50)","cursor":"default"});
                    if(carouselImages.current==carouselImages.total-1)next.css({"opacity":.5,"filter":"alpha(opacity=50)","cursor":"default"});
                }
            },
            directionRound:{
                setup:function(){
                    carouselImages.directionRound=$('<div class="carouselImages-direction-round"></div>');
                    carouselImages.container.find(carouselImages.type).each(function(index, element) {
                        $(carouselImages.directionRound).append('<span><em>'+(index+1)+'</em></span>');
                    });
                    carouselImages.directionRound.find("span").eq(carouselImages.total-1).addClass("last");
                    carouselImages.append(carouselImages.directionRound);
                    var roundMargin=carouselImages.directionRound.find("span").eq(1).position().left-carouselImages.directionRound.find("span").eq(0).width();
                    var roundWidth=(carouselImages.directionRound.find("span").eq(0).width()+roundMargin)*carouselImages.total-roundMargin;
                    var left=carouselImages.version=="px"?-roundWidth/2+"px":-roundWidth/2/100+"rem";
                    carouselImages.directionRound.css("margin-left",left);
                    carouselImages.methods.directionRound.style();
                    carouselImages.directionRound.find("span").bind(eventType,function(){
                        if(carouselImages.animating)return false;
                        carouselImages.carouselImagesAnimate($(this).index());
                    });
                },
                style:function(){
                    carouselImages.directionRound.find("span").eq(carouselImages.current).addClass("cur").siblings().removeClass("cur");
                }
            },
            loading:{
                setup:function(){
                    var loadingStr = '<div class="loading"><div class="loading-carousel-img"></div></div>';
                    carouselImages.append(loadingStr);
                    this.start(this.geturl());
                },
                geturl:function(){
                    return carouselImages.container.find(carouselImages.type).eq(carouselImages.current).find("img").attr("data-img");
                },
                start:function(url){
                    if(!url)return;
                    carouselImages.find(".loading").css("display","block");
                    var img=new Image();
                    img.src=url;
                    if (img.complete) { carouselImages.methods.loading.complete(); return false;}
                    img.onload = function () {carouselImages.methods.loading.complete();return false;};
                },
                complete:function(){
                    carouselImages.find(".loading").css("display","none");
                    var current=carouselImages.container.find(carouselImages.type).eq(carouselImages.current).find("img");
                    current.attr("src",current.attr("data-img")).removeAttr("data-img");
                }
            }
        };
        carouselImages.carouselImagesAnimate=function(current){
            if(current==carouselImages.current||carouselImages.total==1)return false;
            carouselImages.methods.autoplay.closeAutoPlay();
            var direction= carouselImages.direction(current);
            carouselImages.animating=true;
            var width=0;
            if(direction){width=-carouselImages.width;}else{width=carouselImages.width;}
            carouselImages.container.find(carouselImages.type).eq(carouselImages.current).animate({left:width,zIndex:-1},carouselImages.speed,carouselImages.easing);
            carouselImages.current=current;
            //异步处理
            if(carouselImages.sync){carouselImages.methods.loading.start(carouselImages.methods.loading.geturl());}
            //开始运动
            carouselImages.container.find(carouselImages.type).eq(carouselImages.current).css({"left":-width,"zIndex":0});
            carouselImages.container.find(carouselImages.type).eq(carouselImages.current).animate({left:0},carouselImages.speed,carouselImages.easing,function(){carouselImages.animating=false;if(carouselImages.autoplay)carouselImages.methods.autoplay.openAutoplay();if(carouselImages.callback)carouselImages.callback(carouselImages.current)});
            carouselImages.style();
            if(options.arrow) carouselImages.methods.directionNav.style();
            if(options.round) carouselImages.methods.directionRound.style();
            if(options.thum&&options.thum!="")carouselImages.methods.thum.style();
            if(options.thum&&options.thum!="")carouselImages.methods.thum.move();
        };
        carouselImages.getCurrent=function(current,direction){
            var curNum;
            if (direction == "next") {
                curNum=current<carouselImages.total-1?current+=1:carouselImages.loop?0:carouselImages.total-1;
              } else {
                curNum=current>0?current-=1:carouselImages.loop?carouselImages.total-1:0;
              }
              return curNum;
        };
        carouselImages.direction=function(current){
           var flag=false;
           if(current==0&&carouselImages.current==carouselImages.total-1){
                flag=true;
            }else{
                if(current>carouselImages.current){
                    if(current==carouselImages.total-1&&carouselImages.current==0){flag=false;}else{flag=true;}
                }
            }
            return flag;
        };
        carouselImages.updata=function(){
          carouselImages.width=carouselImages.container.find(carouselImages.type).eq(0).outerWidth();
          carouselImages.total=carouselImages.container.find(carouselImages.type).size();
          if(options.arrow) carouselImages.methods.directionNav.style();
           carouselImages.container.find(carouselImages.type).eq(carouselImages.current).css({"left":0}).siblings().css({"left":carouselImages.width});
        };
        carouselImages.style=function(){
            carouselImages.container.find(carouselImages.type).eq(carouselImages.current).addClass("cur").siblings().removeClass('cur');
        };
        carouselImages.setup=function(type){
            carouselImages.viewport = $('<div class="carouselImages-viewport"></div>').css({"width":"100%","height":"100%","overflow":"hidden","position":"relative"}).appendTo(carouselImages).append(carouselImages.container);   
            carouselImages.css({"overflow":"visible"});
            carouselImages.container.find(carouselImages.type).eq(carouselImages.current).css({"left":0}).siblings().css({"left":-carouselImages.width});
            if(carouselImages.total>1&&touch)$(carouselImages.viewport).swipe({threshold:30,
                 swipeRight:function(event, direction, distance){if(carouselImages.animating)return false;carouselImages.carouselImagesAnimate(carouselImages.getCurrent(carouselImages.current,"prve"));},
                 swipeLeft:function(event, direction, distance){if(carouselImages.animating)return false;carouselImages.carouselImagesAnimate(carouselImages.getCurrent(carouselImages.current,"next"));}
             });
        };
        carouselImages.contentEvent=function(){
            carouselImages.container.bind("DOMNodeInserted",function(e) {carouselImages.updata();});
            $(window).bind("resize",function(e) {carouselImages.updata();});
        };
        carouselImages.methods.init();
    };
     $.fn.carouselImages=function(options){var options = options || {};return this.each(function() {new $.carouselImages(this, options);});}
})(jQuery);