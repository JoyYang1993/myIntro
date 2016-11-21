(function($) {
    $.pageImagesAsyn=function(el,parameter){
        var $asyn={},$el=el?$(el):$("body");
        $asyn.run = {
            init:function(){
                $asyn.arr=[];
                $asyn.currentArr=[];
                if(this.getModuleContent()) return;
				$asyn.imgContent=$el.find("img");
				$asyn.mode=parameter.mode||"multiple";//single,multiple,none
				$asyn.eff=parameter.eff||"block";//block,none
				$asyn.domTop=parameter.domTop||$(window);
                this.getArr();
                this.loadingImage();
                this.event();
            },
            event:function(){
                $(window).unbind("scroll.asyn-scroll").bind("scroll.asyn-scroll",function(){$asyn.run.loadingImage();});
                $(window).unbind("resize.asyn-resize").bind("resize.asyn-resize",function(){$asyn.run.loadingImage();});
            },
            loadingImage:function(){
                $asyn.run.getArr();
                $asyn.currentArr=this.getCurrentArr($asyn.arr);
                var imgArr=[];
                var count=0;
                $.each($asyn.currentArr, function(index, item) {
                  if(item.attr("data-img")){
                        imgArr.push({obj:item,url:item.attr("data-img"),error:item.attr("data-error")});        
                    }else{
                        if(item.css("opacity")==0){$(item).animate({opacity:1}, 400).css({"flter":"alpha(opacity=100)"});}
                    }
                });
                $.each(imgArr, function(index, item) {
                    var img=new Image();
                    img.src=item.url;
                    img.par={};
                    img.par.url=item.url;
                    img.par.obj=item.obj;
                    img.par.error=item.error;
                    if(img.complete){count++;$asyn.run.loadComplete(img,count,imgArr.length); return true;};
                    img.onload = function () {count++;$asyn.run.loadComplete(this,count,imgArr.length);return true;};
                    img.onerror=function(){count++;$asyn.run.loadComplete(this,count,imgArr.length,true);return true;};
                });
            },
            loadComplete:function(el,curNum,totalNum,isError){
                if(isError){el.par.obj.attr("src",el.par.error);}else{el.par.obj.attr("src",el.par.url).removeAttr("data-img");}
                if($asyn.mode=="multiple"){
                    if(curNum==totalNum){$asyn.run.speed($asyn.currentArr);}
                }else{
                    if($asyn.eff=="block"){
                        $(el.par.obj).animate({opacity:1}, 400).css({"flter":"alpha(opacity=100)"});
                     }else{
                        $(el.par.obj).css({"opacity":1,"flter":"alpha(opacity=100)"});
                    }
                }
            },
            updata:function(){
               $asyn.imgContent=$el.find("img").css({"opacity":0,"flter":"alpha(opacity=0)"});
                $asyn.arr=[];
                $asyn.run.getArr();
                $asyn.run.loadingImage();
            },
            speed:function(arr){
                $.each(arr,function(index,item){
                  if($asyn.eff=="block"){
                    $(item).delay(index*80).animate({opacity:1}, 400).css({"flter":"alpha(opacity=100)"});
                  }else{
                      $(item).css({"opacity":1,"flter":"alpha(opacity=100)"});
                  }
                });
            },
            getArr:function(){
                $asyn.arr=$asyn.arr.splice();
                $asyn.imgContent.each(function(index, item) {
                    if($(this).attr("data-img")||$(this).css("opacity")==0){
                        $(this).css({"opacity":0,"flter":"alpha(opacity=0)"});
                        $asyn.arr.push({el:$(this),top:$(this).offset().top});
                     }
                });
            },
            getCurrentArr:function(arr){
                var newArr=[];
                $.each($asyn.arr, function(index, item) {
                   if(item.top>=$asyn.domTop.scrollTop()&&item.top<$asyn.domTop.scrollTop()+$(window).height()&&item.el.css("opacity")==0){
                       newArr.push(item.el);
                   }
                });
                return newArr;
            },
            getModuleContent:function(){
                if(!parameter)return false;
                if(!parameter.module) return false;
                if(parameter.module.length==0) return false;
                for(var i=0;i<parameter.module.length;i++){
                    if($(parameter.module[i]).size()>0) return true;
                }
                return false;
            }
        };
       $asyn.run.init();
       return $asyn.run;
    };
 })(jQuery);