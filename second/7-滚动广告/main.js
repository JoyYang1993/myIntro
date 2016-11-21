//实现功能：图片默认向左轮转，当点击左边箭头的时候，图片向左滚动，
//当点击右边箭头的时候，图片向右滚动，并且，当鼠标移入图片的时候，
//停止滚动，移出的时候恢复滚动
//（1）获取元素
	var ul=document.getElementsByTagName("ul")[0];
	//console.log(ul);
	var li=document.getElementsByTagName("li");
	/*console.log(li);
	console.log(li[0].offsetWidth);*///140
	//console.log(li.length);//追加之前 4
	var btnL=document.getElementById("btn_l");
	//console.log(btnL);
	var btnR=document.getElementById("btn_r");
	//console.log(btnR);
//(2)新建一组li,并追加到ul后面
	ul.innerHTML=ul.innerHTML+ul.innerHTML;
	//console.log(ul.innerHTML);
//(3)设置现在得到的ul的长度
	//console.log(li.length);//追加之后 8
	ul.style.width=li[0].offsetWidth*li.length+"px";
	console.log(ul.style.width);	
//(4)为按钮添加鼠标滑动事件
	var speed=-5;
	btnL.onmouseover=function(){
		speed=-5;
	};
	btnR.onmouseover=function(){
		speed=5;
	};
//（5）设置滑动效果
	var item=0;
	item=setInterval(function(){
		ul.style.left=ul.offsetLeft+speed+"px";
		//向左
		if(ul.offsetLeft<-(ul.offsetWidth/2)){//offsetWidth:元素的宽度
			ul.style.left=0+"px";//ul的margin-left
		}
		//向右
		if(ul.offsetLeft>0){//offsetLeft:元素相对于父元素的left
			ul.style.left=-(ul.offsetWidth/2)+"px";
		}
	},30);
//(6)取消动画效果
	ul.onmouseover=function(){
		clearInterval(item);
	};
	ul.onmouseout=function(){
		item=setInterval(function(){
			ul.style.left=ul.offsetLeft+speed+"px";
			//向左
			if(ul.offsetLeft<-(ul.offsetWidth/2)){//offsetWidth:元素的宽度
				ul.style.left=0+"px";//ul的margin-left
			}
			//向右
			if(ul.offsetLeft>0){//offsetLeft:元素相对于父元素的left
				ul.style.left=-(ul.offsetWidth/2)+"px";
			}
		},30);
	};

	

//向右滑动
