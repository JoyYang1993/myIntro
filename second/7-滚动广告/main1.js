//实现功能：当打开页面的时候，图片自动自上而下轮换
//鼠标滑过上鼠标的时候向上轮换
//鼠标滑过下鼠标的时候向下轮换
//鼠标移入图片的时候停止滑动
//鼠标移除恢复滑动
//(1)获取元素
var btn_t=document.getElementById("btn_t");
//console.log(btn_t);
var btn_bo=document.getElementById("btn_bo");
//console.log(btn_bo);
var ul=document.getElementsByTagName("ul")[0];
//console.log(ul);
var lis=document.getElementsByTagName("li");
//console.log(lis);


//(2)新建一组li，并追加到ul里面
//console.log(ul.innerHTML);
ul.innerHTML+=ul.innerHTML;
//console.log(ul.innerHTML);
//(3)得到追加之后的ul的总长度
//console.log(lis[0].offsetHeight);//108
//console.log(lis.length);//8
ul.style.height=lis[0].offsetHeight*lis.length+"px";
//console.log(ul.style.height);
//(4)添加鼠标事件
var speed=-5;
btn_t.onmouseover=function(){
	speed=-5;
};
btn_bo.onmouseover=function(){
	speed=5;
};
//(5)滑动效果
	var item=0;
	item=setInterval(function(){
		//console.log(ul.offsetHeight);
		//console.log(ul.offsetTop);
		//向上
		ul.style.top=ul.offsetTop+speed+"px";
		if(ul.offsetTop<-(ul.offsetHeight/2)){
			ul.style.top=0+"px";
		}
		//向下
		if(ul.offsetTop>0){
			ul.style.top=-(ul.offsetHeight/2)+"px";
		}
	},30);
//(6)鼠标移入和移出
ul.onmouseover=function(){
	clearInterval(item);
};
ul.onmouseout=function(){
	item=setInterval(function(){
		//console.log(ul.offsetHeight);
		//console.log(ul.offsetTop);
		//向上
		ul.style.top=ul.offsetTop+speed+"px";
		if(ul.offsetTop<-(ul.offsetHeight/2)){
			ul.style.top=0+"px";
		}
		//向下
		if(ul.offsetTop>0){
			ul.style.top=-(ul.offsetHeight/2)+"px";
		}
	},30);
};

