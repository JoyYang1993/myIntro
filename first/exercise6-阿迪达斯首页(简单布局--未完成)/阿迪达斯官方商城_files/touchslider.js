(function($) {
	 touchslider = function (container, params) {
		 	var defaults = {
	            direction: 'horizontal',//vertical
	            nextButton: null,
         	   	prevButton: null,
         	   	size :1,
         	   	moveFinishEvent:null,
         	   	blur:false,
         	   	scrollSize:1,
         	   	iconContent:null,
         	   	iconbtnHtml:''
	        }
	        params = params || {};
	        for (var def in defaults) {
	            if (typeof params[def] === 'undefined') {
	                params[def] = defaults[def];
	            }
	            else if (typeof params[def] === 'object') {
	                for (var deepDef in defaults[def]) {
	                    if (typeof params[def][deepDef] === 'undefined') {
	                        params[def][deepDef] = defaults[def][deepDef];
	                    }
	                }
	            }
	        }
	        var containerWill = $(container);
		  	var s = this;
		  	s.crtindex = 1;
		  	s.curNum=1;
		  	s.totalIndex = containerWill.children().length;
		  	s.params = params;
			s.blurIndex = Math.ceil(s.params.size/2);
			s.pageSize = Math.ceil((s.totalIndex-s.params.size)/s.params.scrollSize)+1;
		    var re = /^[1-9]+[0-9]*]*$/;
      	    var checkValue = s.params.size/2;
      	    if(re.test(checkValue)){s.params.blur = false;}
  			var isTouch = ("ontouchstart" in window) || window.DocumentTouch && document instanceof DocumentTouch;
  	      	var eventType = (!isTouch) ? "click" : "touchstart";
	      	if(s.params.iconContent){
	  			for(var i =0;i<s.pageSize;i++){
  				   s.params.iconContent.append(s.params.iconbtnHtml);
	  			}
	  			s.params.iconContent.css("margin-left",-(40*s.pageSize)/2+"px")
	      		s.params.iconContent.children().each(function(i,item){
	      	  		if(i==0)$(item).addClass('cur');
					$(item).bind(eventType,function(){
					 	 var index = i+1;
						 s.navToPage (index);
					})
	      	    });	
			}
	        s.initEvents = function (detach) {
			 	if (s.params.nextButton) {
         			 $(s.params.nextButton).bind(eventType,function(){ s.onClickNext ();})
         	  	}
         	  	if (s.params.prevButton) {
         			  $(s.params.prevButton).bind(eventType,function(){ s.onClickPrev ();})
         	  	}
         	  	if(isTouch){
         	  		var touchConfig = {};
         	  		touchConfig.threshold = 15;
         	  		if(s.params.direction == 'vertical'){
         	  			touchConfig.swipeDown = function(){s.onClickPrev()};
         	  			touchConfig.swipeUp = function(){ s.onClickNext()};
         	  		}else{
         	  			touchConfig.swipeLeft = function(){s.onClickNext()};
         	  			touchConfig.swipeRight = function(){ s.onClickPrev()};
         	  		}
 	  			  	containerWill.swipe(touchConfig);
         	  	}	
                var  pageTotal = Math.ceil(s.totalIndex/s.params.size);
                if(s.params.moveFinishEvent){s.params.moveFinishEvent(s.curNum,pageTotal)}
            };
	        s.initEvents();
	        s.onClickNext = function(){
	       		if(s.crtindex > (s.totalIndex - s.params.size)){return;}
	       		var size =s.params.scrollSize;
	        	var page =  s.totalIndex - s.params.size-s.crtindex
        		if(page <size)size =  page+1;
	            s.crtindex+=size;
	            s.curNum++;
	       		s.pageto();
	        }
         	s.navToPage =  function(crtPage){
	        	var size =s.params.scrollSize;
	        	var index=(crtPage-1)*size+1;
	        	if(index+size-1>s.totalIndex){
	        	    index=s.totalIndex-size+1;
	        	}
	         	s.crtindex=index;
	         	s.curNum=crtPage;
        	 	s.pageto();
	        }
	      //  setTimeout(s.navToPage,1000,3)
	        s.onClickPrev =  function(){
	        	if(s.crtindex == 1)return;
	       		var size =s.params.scrollSize;
	    		var page =  s.totalIndex - s.params.size-s.crtindex
         		if( s.crtindex<=size)size =  s.crtindex-1
	     		s.crtindex-=size
	     		s.curNum--;
	     		s.pageto();
			 }
	        s.pageto = function() {
	    		if(s.params.direction == 'vertical'){
	       			var bottom = parseInt(containerWill.children().css('margin-bottom').slice(0,containerWill.children().css('margin-bottom').length-2)) ;
	        		var movedistance = (s.crtindex-1)*(containerWill.children().height()+ bottom);
	        		containerWill.animate({'margin-top':-movedistance});
	       		}else{
	       			var left = parseInt(containerWill.children().css('margin-right').slice(0,containerWill.children().css('margin-right').length-2)) ;
	        		var movedistance = (s.crtindex-1)*(containerWill.children().width()+ left);
	        		containerWill.animate({'margin-left':-movedistance});
	       		}
	       		var  pageTotal =Math.ceil(s.totalIndex/s.params.size);
	       		var page=s.curNum-1;
	       		if(s.params.iconContent){
	       			s.params.iconContent.children().each(function(i,item){
	      	  		 	$(item).removeClass('cur');
	      	  		 	if(i==page)	$(item).addClass('cur');
	      	  		})
	       		}
	       		if(s.params.moveFinishEvent){s.params.moveFinishEvent(page+1,pageTotal)}
	        }
	 }
})(jQuery);
