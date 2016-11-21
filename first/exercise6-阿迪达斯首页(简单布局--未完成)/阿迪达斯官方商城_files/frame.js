(function($) {
    //倒计时
    $.countDown=function(element,parameter){
        var $countDown=$(element);
        $.data(element, "countDown", $countDown);
        $countDown.methods = {
            init:function(){
               $countDown.time=parameter.time||$countDown.attr("data-time")||null;
               $countDown.mode=parameter.mode||"hours";
               $countDown.showClass=parameter.showClass||false;
               $countDown.show=parameter.show||null;
               $countDown.key=parameter.key||$countDown.attr("data-key")||"";
               $countDown.callback=parameter.callback||null;
               $countDown.endCallBack=parameter.endCallBack||null;
               $countDown.setNum=null;
               if($countDown.time)$countDown.updata($countDown.time);
            },
            timer:function(){
                var dataStr=$countDown.time.substring(0,$countDown.time.lastIndexOf(","));
                var timeArr=$countDown.time.substring($countDown.time.lastIndexOf(",")+1,$countDown.time.length);
                var dateArr=dataStr.split("-");
                var timeArr=timeArr.split(":");
                var ts=(new Date(dateArr[0], dateArr[1]-1, dateArr[2], timeArr[0], timeArr[1], timeArr[2])) - (new Date());
                if(ts<=0){$countDown.methods.showData(0,0,0,0);$countDown.methods.clear();return false;}
                var day=parseInt(ts / 1000 / 60 / 60 / 24, 10); 
                var hours=parseInt(ts / 1000 / 60 / 60 % 24, 10);
                var minute=parseInt(ts / 1000 / 60 % 60, 10);
                var second=parseInt(ts / 1000 % 60, 10);
                if($countDown.mode=="hours"){
                    hours=hours+day*24;
                }
                $countDown.methods.showData(day,hours,minute,second);
            },
            showData:function(day,hours,minute,second){
                var day=day<10?("0"+day):day,hours=hours<10?("0"+hours):hours,minute=minute<10?("0"+minute):minute,second=second<10?("0"+second):second;
                if($countDown.callback){if($countDown.mode=="hours"){$countDown.callback({hours:hours,minute:minute,second:second},{dom:$(element)[0],key:$countDown.key});}else{$countDown.callback({day:day,hours:hours,minute:minute,second:second},{dom:$(element)[0],key:$countDown.key});}};
                if($countDown.show){
                    if(typeof $countDown.show=="string"){
                        var str="";
                        if($countDown.mode=="hours"){
                            str=hours+":"+minute+":"+second;
                        }else {
                            str=day+"天"+hours+"时"+minute+"分"+second+"秒";
                        }
                        var dataEl=null;
                        if($countDown.showClass){dataEl=$($countDown).find($countDown.show);}else{dataEl=$($countDown.show);};
                        try{dataEl.html(str);}catch(e){};    
                        try{dataEl.val(str);}catch(e){};
                    }else{
                        var dayEl,hoursEl,minuteEl,secondEl=null;
                        if($countDown.showClass){
                            if($countDown.show.length==4){
                                dayEl=$($countDown).find($countDown.show[0]),hoursEl=$($countDown).find($countDown.show[1]),minuteEl=$($countDown).find($countDown.show[2]),secondEl=$($countDown).find($countDown.show[3]);
                            }else if($countDown.show.length==3){
                                hoursEl=$($countDown).find($countDown.show[0]),minuteEl=$($countDown).find($countDown.show[1]),secondEl=$($countDown).find($countDown.show[2]);
                            }
                        }else{
                            if($countDown.show.length==4){
                                dayEl=$($countDown.show[0]),hoursEl=$($countDown.show[1]),minuteEl=$($countDown.show[2]),secondEl=$($countDown.show[3]);
                            }else if($countDown.show.length==3){
                                hoursEl=$($countDown.show[0]),minuteEl=$($countDown.show[1]),secondEl=$($countDown.show[2]);
                            }
                        }
                        if($countDown.mode=="day"){
                            try{dayEl.text(day);}catch(e){};
                            try{dayEl.val(day);}catch(e){};
                        }
                        try{hoursEl.text(hours),minuteEl.text(minute),secondEl.text(second);}catch(e){};
                        try{hoursEl.val(hours),minuteEl.val(minute),secondEl.val(second);}catch(e){};
                    }
                }
                if($countDown.mode=="hours")if(hours==0&&minute==0&&second==0)if($countDown.endCallBack){$countDown.endCallBack({hours:hours,minute:minute,second:second},{dom:$(element)[0],key:$countDown.key});$countDown.methods.clear();return false;}
                if($countDown.mode=="day")if(day==0&&hours==0&&minute==0&&second==0)if($countDown.endCallBack){$countDown.endCallBack({day:day,hours:hours,minute:minute,second:second},{dom:$(element)[0],key:$countDown.key});$countDown.methods.clear();return false;}
            },
            clear:function(){
                clearInterval($countDown.setNum);
            }
        };
        $countDown.updata=function(time){
            if(!time||time=="") return false;
            $countDown.time=time;
            $countDown.methods.clear();
            $countDown.setNum=setInterval(function(){$countDown.methods.timer();},1000);
            $countDown.methods.timer();
        };
        $countDown.methods.init();
    };
	//评分
    $.proStar=function(element,parameter){
        var $proStar=$(element),spanWidth=$(element).width();
        $.data(element, "proStar", $proStar.methods);
        $proStar.methods={
            init:function(){
                $proStar.type=parameter.type||"span";
                this.event();
            },
            event:function(){
                $(element).swipe({threshold:1,swipeStatus:function(event){$proStar.methods.start(event);}});
            },
            start:function(event){
                var event=event||window.event;
                 var _pageX=event.pageX||event.clientX||event.changedTouches[0].pageX;
                 _pageX=_pageX-$(element).offset().left;
                 var _width=this.getNum(Math.floor(_pageX/spanWidth*100));
                 $(element).find($proStar.type).css({width:_width+"%"});
            },
            getNum:function(num){return Math.ceil(num/20)*20;}
        };
         $proStar.methods.init();
    };
    //滑块input
    $.inputSlider=function(element,parameter){
        var $inputSlider={};
        var slider=null,mininput=null,maxinput=null,minNum=maxNum=initMin=initMax=0;
        $.data(element, "inputSlider", $inputSlider);
        $inputSlider.methods={
            init:function(){
              slider=parameter.slider||".slider";
              mininput=parameter.mininput||".mininput";
              maxinput=parameter.maxinput||".maxinput";
              $inputSlider.complete=parameter.complete||null;
              if($(element).find(slider).size()<=0)return false;
              initMin=$(element).find(mininput).val();
              initMax=$(element).find(maxinput).val();
              this.event();
              $inputSlider.slider();
            },
            event:function(){
                $(element).find(mininput).focus(function() {$inputSlider.inputFocus();});
                $(element).find(maxinput).focus(function() {$inputSlider.inputFocus();});
                $(element).find(mininput).blur(function() {$inputSlider.inputBlur();});
                $(element).find(maxinput).blur(function() {$inputSlider.inputBlur();});
                //$(element).find(mininput).keyup(function(e){var e=e||window.event;if(e.which==13){$inputSlider.inputBlur();};return false;});
                //$(element).find(maxinput).keyup(function(e){var e=e||window.event;if(e.which==13){$inputSlider.inputBlur();};return false;});
            }
        };
        $inputSlider.slider=function(){
            $(slider).slider({range:true,
                        min:parseInt($(element).find(mininput).val()),
                        max:parseInt($(element).find(maxinput).val()),
                        values: [parseInt($(element).find(mininput).val()),parseInt($(element).find(maxinput).val())],
                        slide: function( event, ui) {
                           $(element).find(mininput).val(ui.values[ 0 ]);
                           $(element).find(maxinput).val(ui.values[ 1 ]);
                        },
                        stop:function(){if($inputSlider.complete)$inputSlider.complete($(element).find(mininput).val(),$(element).find(maxinput).val());}
             });
        };
        $inputSlider.inputFocus=function(){
            minNum=$(element).find(mininput).val();
            maxNum=$(element).find(maxinput).val();
        };
        $inputSlider.inputBlur=function(){
            var minval = parseInt($(element).find(mininput).val());
            var maxval = parseInt($(element).find(maxinput).val());
            if(minval!=parseInt(minNum)||maxval!=parseInt(maxNum)){
                if(minval<initMin||minval>initMax||maxval>initMax||maxval<initMin){
                    $(element).find(mininput).val(minNum);
                    $(element).find(maxinput).val(maxNum);
                    return;
                }
                if(minval>maxNum){minval=maxNum;$(element).find(mininput).val(minval);}
                if(maxval<minNum){maxval=minNum;$(element).find(maxinput).val(maxval);}
                $(slider).slider('option', 'values', [minval,maxval]);
                setTimeout(function(){if($inputSlider.complete)$inputSlider.complete($(element).find(mininput).val(),$(element).find(maxinput).val());},100);
            }
        };
        $inputSlider.methods.init();
    };
    //加载图片
    $.loadImages=function (element,parameter){
        var $loadImages={},$el=$(element);
        $loadImages.methods={
            init:function(){
               $loadImages.type= parameter.type||"data-slides-img";
               $loadImages.imgContent=$el.find("img");
                $loadImages.load();
            }
        };
        $loadImages.load=function(){
            $loadImages.imgArr=$loadImages.getImgArr();
            if($loadImages.imgArr.length==0)return false;
            for(var i=0;i<$loadImages.imgArr.length;i++){
                 var img=new Image();
                 img.src=$loadImages.imgArr[i].url;
                 img.par={};
                 img.par.url=$loadImages.imgArr[i].url;
                 img.par.obj=$loadImages.imgArr[i].el;
                 if(img.complete){
                    img.par.obj.attr("src",img.par.url).removeAttr($loadImages.type).css({"opacity":1,"flter":"alpha(opacity=100)"});
                    continue;
                }
                img.onload = function () {
                    img.par.obj.attr("src",img.par.url).removeAttr($loadImages.type).css({"opacity":1,"flter":"alpha(opacity=100)"});
                };
            }
        };
        $loadImages.getImgArr=function(){
            var arr=[];
            $loadImages.imgContent.each(function(index, item) {
                if($(this).attr($loadImages.type)){
                    $(this).css({"opacity":0,"flter":"alpha(opacity=0)"});
                    arr.push({el:$(this),url:$(this).attr($loadImages.type)});
                 }
            });
            return arr;
        };
        $loadImages.methods.init();
        return $loadImages;
    };
     //pupop
    $.popup = {
        show:function(parameter){
            new $.setAjax({
                url:parameter.url+"?r="+Math.random()*100000,
                success:function(data){if(parameter.complete) parameter.complete(data);$.popup.event(parameter);},
                error:function(){if(parameter.error) parameter.error();}    
            });
        },
        hide:function(parameter){
            if(parameter.closeComplete)parameter.closeComplete();
            if(parameter.el) $(parameter.el).hide();
        },
        remove:function(parameter){
            if(parameter.closeComplete)parameter.closeComplete();
            if(!parameter){$(".popup").remove(); return false;}
            if(parameter.el) $(parameter.el).remove();
        },
        event:function(parameter){
            if($(".closePop").size()>0)$(".closePop").click(function(){$.popup.click($(this),parameter);});
            if($(".popBg").size()>0)$(".popBg").click(function(){$.popup.click($(this),parameter);});
        },
        click:function(el,parameter){
            if(!parameter||!parameter.close){
                $.popup.hide({el:el.parents(".popup"),closeComplete:parameter.closeComplete});
            }else{
                $.popup.remove({el:el.parents(".popup"),closeComplete:parameter.closeComplete});
            }
        }
    };
    //radio
    $.radio=function(element,parameter){
        var $radio=$(element);
        $.data(element, "radio", $radio);
        $radio.methods = {
            init:function(){
                $radio.type=parameter.type||"li";
                if($radio.find($radio.type).size()<=0)$radio.type="p";
                if($radio.find($radio.type).size()<=0)$radio.type="span";
                $radio.content=$radio.find($radio.type);
                $radio.label=parameter.label||false;
                $radio.callback=parameter.callback||null;
                $radio.currentCallback=parameter.currentCallback||null;
                $radio.parentsEvent=$radio.hasClass("radioEvent");
                if(parameter.bionic) $radio.creat();
            }
        };
        $radio.creat=function(){
            $radio.content.each(function(index){
                if($(this).hasClass("radio-view")) return;
                var input=$(this).find("input");
                var parent=input.parent();
                $('<span class="radio-view '+input.attr("type")+'"><em class="radio-view-em"></em></span>').appendTo(parent).append(input);
                input.change(function(){$radio.style();if($radio.callback)$radio.callbackValue();if($radio.currentCallback) $radio.currentCallback({$element:$(this),checked:$(this).prop("checked")});});
                if($radio.parentsEvent)$(this).click(function(e){if($(this).find("input").attr("type")=="radio"&&!$(this).find("input").attr("disabled"))$radio.replayCheck();$radio.styleLi($(this));}); else 
                $(this).find("em.radio-view-em").click(function(){if($(this).find("input").attr("type")=="radio"&&!$(this).find("input").attr("disabled"))$radio.replayCheck();$radio.styleLi($(this).parents(".radio-view"));});
                if($radio.label)$(this).find($radio.type).find("label").click(function(){$radio.style();});
                if($(this).find("input").attr("disabled"))$(this).find("em.radio-view-em").addClass("disabled");
            });
            $radio.style();
            if($radio.callback)$radio.callbackValue(true);
        };
        $radio.style=function(){
            $radio.find($radio.type).each(function(index){
                if($(this).find("input").prop("checked")){$(this).find("input").attr("checked","checked");$(this).find(".radio-view-em").addClass("cur");
                }else{$(this).find("input").removeAttr("checked");$(this).find(".radio-view-em").removeClass("cur");};
            }); 
        };
        $radio.styleLi=function(el){
            if(el.find("input").attr("disabled"))return false;
            if(el.find("input").is(":checked")){
                el.find("input").removeAttr("checked");el.find(".radio-view-em").removeClass("cur");
            }else{
                el.find("input").prop("checked","checked");el.find("input").attr("checked","checked");el.find(".radio-view-em").addClass("cur");
            }
            el.find("input").trigger("change");
        };
        $radio.replayCheck=function(){
            $radio.content.each(function(index) {
                   $(this).find("em").removeClass("cur");
                   $(this).find("input").removeAttr("checked");
             });
        },
        $radio.callbackValue=function(isFrist){
            var allChecked=[],checked=[],notChecked=[];
            //var allChecked=checked=notChecked=[];
            $radio.content.each(function(index){
                allChecked.push({$element:$(this).find("input").get(0),index:index,value:$(this).find("input").val(),name:$(this).find("input").attr("name"),id:$(this).find("input").attr("id"),checked:$(this).find("input").is(":checked"),disabled:$(this).find(".radio-view-em").hasClass("disabled")?true:false});
                if($(this).find("input").prop("checked")){
                    checked.push({$element:$(this).find("input").get(0),index:index,value:$(this).find("input").val(),name:$(this).find("input").attr("name"),id:$(this).find("input").attr("id"),checked:true,disabled:$(this).find(".radio-view-em").hasClass("disabled")?true:false});
                }else{
                    notChecked.push({$element:$(this).find("input").get(0),index:index,value:$(this).find("input").val(),name:$(this).find("input").attr("name"),id:$(this).find("input").attr("id"),checked:false,disabled:$(this).find(".radio-view-em").hasClass("disabled")?true:false});  
                }
            });
            $radio.callback(element,checked,allChecked,notChecked);
            $radio.trigger("changed",[{isOpen:isFrist||false,el:element,checked:checked,notChecked:notChecked,allChecked:allChecked}]);
        };
        $radio.methods.init();
    };
    //placeholder
	$.placeholder=function(element,parameter){
        var $placeholder=$(element);
        $.data(element, "placeholder", $placeholder.methods);
        $placeholder.methods = {
            init:function(){
                if(!$(element).attr("placeholder")||!this.userAgent(10))return false;
                $placeholder.parameter={};
                $placeholder.type=$(element).attr("type");
                $placeholder.parameter.value=$(element).attr("placeholder");
                if($(element).attr("type")=="password")$placeholder.parameter.value="..........";
                $placeholder.parameter.color=parameter.color||"#000";
                $placeholder.parameter.defaultColor="#b1b1b1";
                this.initStyle(element);
                this.event(element);
             },
             event:function(el){
                 $(el).bind("blur.input-blur",function(){$placeholder.methods.initStyle(this);});
                 $(el).bind("mousedown.input-mouse",function(){
                    var _value=this.value;
                    if(_value==$placeholder.parameter.value){
                        this.value="";
                        $(el)[0].style.color=$placeholder.parameter.color;
                    }
                });
             },
            initStyle:function(el){
                var _value=el.value;
                if(!_value||_value==""||_value==$placeholder.parameter.value){
                     el.value=$placeholder.parameter.value;
                    $(el)[0].style.color=$placeholder.parameter.defaultColor;
                }else{
                    $(el)[0].style.color=$placeholder.parameter.color;
                }
            },
            userAgent:function(version){
              var agent=navigator.userAgent.toLowerCase();
               if(agent.indexOf("msie")<0) return false;
               return parseInt(agent.split("msie")[1].split(";")[0]) < version;  
            }
        };
        $placeholder.methods.init();
    };
	//copySelect
    $.copySelect=function(element,parameter){
        var $copySelect={},current=0;
        $.data(element, "copySelect", $copySelect);
        $copySelect.methods = {
            init:function(){
                $copySelect.optionClick=parameter.optionClick||null;
                $copySelect.isDefault=parameter.isDefault||false;
                $copySelect.defaultText=parameter.defaultText||null;
                $copySelect.title=parameter.title||"";
                $copySelect.parent=$(element).parents(".pdpSuggestSlides").size();
                $copySelect.updata();
            }
        };
        $copySelect.replay=function(){
            $copySelect.select.children("option").eq(0).attr("selected","selected").siblings().removeAttr('selected');
            var index=$copySelect.select.find("option[selected='selected']").index();
            var selected=index<=0?$copySelect.select.find("option").eq(0):$copySelect.select.children("option[selected='selected']");
            var text=selected.text();
            $copySelect.selectBox.find(".selectVal").html(text);
            $copySelect.optionBox.find(".optionAll span").eq(selected.index()).addClass('cur');
        };
        $copySelect.updata=function(){
            $(element).find(".selectBox").remove();
            $(element).find(".optionBox").remove();
            $copySelect.select=$(element).find("select");
            $copySelect.selectBox=$('<div class="selectBox"></div>');
            $copySelect.selectTitle=$('<div class="selectVal"></div><div class="selectNav"><em></em></div>');
            $copySelect.optionBox=$('<div class="optionBox"><div class="optionAll"></div></div>').hide();
            $copySelect.selectTitleHeight=0;
            $copySelect.optionBoxHeight=0;
            $copySelect.addSelect();
            if($copySelect.defaultText){current=-1;$copySelect.selectBox.find(".selectVal").html($copySelect.defaultText);}else{$copySelect.copyData();}
            $copySelect.event();
        },
        $copySelect.defaultScroll=function(){
            var index=$copySelect.select.find("option[selected='selected']").index();
            index=index<=0?0:index;
            var pageNum=Math.floor($copySelect.optionBoxHeight/$copySelect.optionBox.find("span").outerHeight());
            if(index>pageNum){
                $($copySelect.optionBox).scrollTop((index-pageNum/2)*$copySelect.optionBox.find("span").outerHeight());
            }
        },
        $copySelect.addSelect=function(){
            $(element).append($copySelect.selectBox.append($copySelect.selectTitle)).append($copySelect.optionBox);
            $copySelect.select.find("option").each(function(index,item){
                var option=$('<span>'+$(this).html()+'</span>');
                $copySelect.optionBox.find(".optionAll").append(option);
            });
        };
        $copySelect.copyData=function(index){
            var curIndex=$copySelect.select.find("option[selected='selected']").index();
            curIndex=curIndex<=0?0:curIndex;
            var index=index||curIndex;
            var selected=$copySelect.select.find("option").eq(index);
            var text=selected.text();
            if($copySelect.isDefault){text=$copySelect.title+text;}
            $copySelect.selectBox.find(".selectVal").html(text);
            $copySelect.optionBox.find(".optionAll span").eq(index).addClass('cur');
            current=index;
        };
        $copySelect.show=function(){
            $copySelect.optionBox.show();
            $copySelect.selectTitleHeight=$copySelect.selectBox.outerHeight();
            $copySelect.optionBoxHeight=$copySelect.optionBox.outerHeight();
            if($copySelect.parent>0||$(window).scrollTop() - ($(element).offset().top - $(window).height()) < $copySelect.optionBoxHeight){
                $copySelect.optionBox.css("top",-($copySelect.optionBoxHeight-1));
            }else{
                $copySelect.optionBox.css("top",$copySelect.selectTitleHeight-1);
            }
            $copySelect.selectBox.addClass("on");
            $copySelect.defaultScroll();
        };
        $copySelect.hide=function(){
            $copySelect.optionBox.hide();
            $copySelect.selectBox.removeClass("on");
        };
        $copySelect.event=function(){
            //option鼠标经过事件
            $copySelect.optionBox.find(".optionAll span").bind("mouseover",function(){$(this).addClass('cur').siblings().removeClass("cur");});
            //option点击事件
            $copySelect.optionBox.find(".optionAll span").bind("click",function(){
                $copySelect.hide();
				$(this).addClass('cur').siblings().removeClass("cur");
                if(current==$(this).index())return false;
                $copySelect.select.find("option").eq($(this).index()).attr("selected",true).siblings().attr("selected",false);
                $copySelect.copyData($(this).index());
                $copySelect.select.trigger("change",[$(this).index(),$copySelect.select.find("option").eq($(this).index())]);
                if($copySelect.optionClick)$copySelect.optionClick($copySelect.select.find("option").eq($(this).index())[0],$(this).index());
            });
            //title点击事件
            $copySelect.selectTitle.bind("click",function(event){
                var index=$copySelect.select.find("option[selected='selected']").index();
                index=index<=0?0:index;
                $copySelect.optionBox.find(".optionAll span").eq(index).addClass('cur').siblings().removeClass('cur');
                var other=$(document.body).find($copySelect.optionBox).siblings();
                $(".optionBox").each(function(index,item){if($copySelect.optionBox[0]!=item){$(item).hide();$(item).siblings(".selectBox").find(".selectNav em").removeClass("show");}});
                if($copySelect.selectBox.find(".selectNav em").hasClass("show"))$copySelect.hide();else $copySelect.show();
                return false;
            });
            //window点击事件
            $(document.body).bind("click",function(){$copySelect.hide();});
        };
        $copySelect.methods.init();
    };
    //创建loading
    $.loading=function(html){
        var $loading={};
        $loading.methods = {
            init:function(){
                if($(html).size()<=0){html=window.projectLoading;}
                $loading.loading=html?$(html).find(".commonLoad"):$("<div class='commonLoad'><div class='loadImg'></div></div>");
                $loading.mask=html?$(html).find(".commonMask"):$("<div class='commonMask'>mask</div>");
                window.projectLoading=html?$(html).clone():null;
                if(html)$("body").find(html).remove(); 
                return this;
            },
            show:function(paramater){
                if(!paramater||!paramater.dom) paramater.dom="body";
                if(!paramater.dom || paramater.dom == "body") $($loading.loading).css({"position":"fixed"});
                $(paramater.dom).append($loading.loading);
                if(paramater.mask){$(paramater.mask).append($loading.mask);}
            },
            //关闭loading
            hide:function(){
                $("body").find(".commonLoad").remove();
                $("body").find(".commonMask").remove();
            }
        };
        $loading.methods.init();
        return $loading.methods;
    };
      //放大镜效果
    $.zoom=function(element,parameter){
        var $zoom=$(element),smallWidth=smallHeight=bigWidth=bigHeight=hovWidth=hovHeight=imgLeft=imgTop=0;
        var touch = ("ontouchstart" in window) || window.DocumentTouch && document instanceof DocumentTouch,
        eventType = (touch) ? "touchmove" : "mousemove";
        $zoom.methods={
            init:function(){
                $zoom.moveEvent = parameter.moveEvent || null;
                $zoom.hoverEvent = parameter.hoverEvent || null;
                $zoom.smallImg=parameter.smallImg||".skuImg";
                $zoom.bigImg=parameter.bigImg||".skuImgSuper";
                $zoom.hovImg=parameter.hovImg||".skuHover";
                $zoom.isZoom=parameter.isZoom||false;
                smallWidth=$(element).find($zoom.smallImg).width();
                smallHeight=$(element).find($zoom.smallImg).height();
                bigWidth=$(element).find($zoom.bigImg).find("img").width();
                bigHeight=$(element).find($zoom.bigImg).find("img").height();
                hovWidth=$(element).find($zoom.hovImg).width();
                hovHeight=$(element).find($zoom.hovImg).height();
                this.event();
            },
            updata:function(status){
               $zoom.isZoom=status;
               $zoom.methods.status();
            },
            status:function(){
               if($zoom.isZoom){
                   if(!touch){
                    $(element).find($zoom.hovImg).show();
                   }
                   $(element).find($zoom.bigImg).show();
               }else{
                   $(element).find($zoom.hovImg).hide();
                   $(element).find($zoom.bigImg).hide(); 
               }
            },
            event:function(){
                $(element).find($zoom.smallImg).hover(function(){
                    imgLeft=$(this).offset().left;
                    imgTop=$(this).offset().top;
                    $zoom.methods.status();
                    if($zoom.hoverEvent&&!touch)$zoom.hoverEvent("over");
                    $(document.body).bind(eventType,function(e){$zoom.methods.speed(e);return false;});
                },function(){
                    if($zoom.hoverEvent&&!touch)$zoom.hoverEvent("out");
                    if(!$zoom.isZoom)return false;
                    $(document.body).unbind(eventType);
                    $(element).find($zoom.hovImg).hide();
                    $(element).find($zoom.bigImg).hide();
                });
               
            },
            speed:function(e){
                var e=e||window.event;
                var pageX=e.pageX||e.originalEvent.touches[0].pageX;
                var pageY=e.pageY||e.originalEvent.touches[0].pageY;
                var xpos=pageX-hovWidth/2-imgLeft;
                xpos=xpos<0?0:xpos;
                xpos=xpos>smallWidth-hovWidth?smallWidth-hovWidth:xpos;
                var ypos=pageY-hovHeight/2-imgTop;
                ypos=ypos<0?0:ypos;
                ypos=ypos>smallHeight-hovHeight?smallHeight-hovHeight:ypos;
                if($zoom.moveEvent&&!touch)$zoom.moveEvent({smallWidth:smallWidth,smallHeight:smallHeight,spacingLeft:imgLeft,spacingTop:imgTop,pageX:pageX,pageY:pageY});
                if($zoom.isZoom){
                    $(element).find($zoom.hovImg).css({"left":xpos ,"top":ypos});
                    $(element).find($zoom.bigImg)[0].scrollLeft=(bigWidth/smallWidth)*xpos-hovWidth/2;
                    $(element).find($zoom.bigImg)[0].scrollTop=(bigHeight/smallHeight)*ypos-hovHeight/2;
                }
            }
        };
        $zoom.methods.init();
        return $zoom;
    };
    //搜索
    $.search=function(element,parameter){
        var $search={};
        $search.methods={
            init:function(){
                $search.list=parameter.list||null;
                $search.listType=parameter.listType||"a";
                $search.input=parameter.input||$(element).find("input");
                $search.keyEnter=parameter.keyEnter||null;
                $search.ajaxStart=parameter.ajaxStart||null;
                $search.addData=parameter.addData||null;
                this.event();
                $search.keyAddEventListener();
            },
            event:function(){
               $search.input.bind("input",function(){$search.analysis();});
               $search.input.bind("propertychange",function(){$search.analysis();});
               $search.input.bind("click",function(){$search.analysis(true);return false;});
               $(document.body).bind("click",function(){$search.listHide();});
            }
        };
        $search.keyAddEventListener=function(){
            //new $.keyList($(element),{content:$($search.list),type:$search.listType,enterback:$search.keyEnter});
        };
        $search.analysis=function(isFcous){
            if($search.input.val()==""||$search.input.val()==" "||$search.input.val()==$search.input.attr("data-tags")||$search.input.val()==$search.input.attr("placeholder")){
                $search.listHide();}else{if(isFcous){$search.listShow();}else{if($search.ajaxStart)$search.ajaxStart();}}
        };
        $search.ajax=function(obj){
            new $.setAjax({url:obj.url,data:obj.data,type:obj.type,dataType:"json",
                success:function(data){
                    if(data.code!=1) return false;
                    if(data.info.length == 0) {
                        $search.listHide();
                    }else{
                        $($search.list).html("");
                        if($search.addData)$search.addData(data);
                        $search.listShow();
                    }
                }
            });
        };
        $search.listShow=function(){$($search.list).show();};
        $search.listHide=function(){$($search.list).hide();};
        $search.methods.init();
        return $search;
    };
      //ajax
    $.setAjax=function(parameter){
        var type=parameter.type||"GET";
        var dataType=parameter.dataType||"html";
        var url=parameter.url||null;
        var data=parameter.data||null;
        var success=parameter.success||null;
        var error=parameter.error||null;
        if(!parameter.url||parameter.url==""){setTimeout(function(){if(success)success(parameter.test,parameter);},500);return false;}
        $.ajax({type:type,dataType:dataType,url:url,data:data,
           success:function(msg){if(success)success(msg,parameter);} ,
           error: function(msg){if(error)error(msg,parameter);}
        });
    };
    $.fn.countDown=function(options){var options = options || {};return this.each(function() {new $.countDown(this, options);});};
	$.fn.proStar=function(options){var options = options || {};return this.each(function() {new $.proStar(this, options);});};
    $.fn.inputSlider=function(options){var options = options || {};return this.each(function() {new $.inputSlider(this, options);});};
	$.fn.radio=function(options){var options = options || {};return this.each(function() {new $.radio(this, options);});};
    $.fn.copySelect=function(options){var options = options || {};return this.each(function() {new $.copySelect(this, options);});};
	$.fn.placeholder=function(options){var options = options || {};return this.each(function() {new $.placeholder(this, options);});};
 })(jQuery);
