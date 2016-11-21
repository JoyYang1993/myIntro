//广告栏右侧内容
	//获取元素
	var btns=document.getElementsByTagName("button");
	var picture=document.getElementById("picture");
	//绑定事件
	function left(){
		picture.src="4.jpg";
	}
	function right(){
		picture.src="2.jpg"
	}
	btns[0].addEventListener("click",left,false);
	btns[1].addEventListener("click",right,false);

	//广告栏左侧内容
	//功能：
	//鼠标移入导航条的时候显示下面所对应的内容，
	//当数遍移出的时候，返回默认
	//获取元素
	var ad_ul=document.getElementById("ad_ul");
	var lis=ad_ul.children;//类数组
	var ad_nav_bottom=document.getElementsByClassName("ad_nav_bottom");//类数组
	//为lis绑定鼠标移动时间
	for(var i=0;i<lis.length;i++){
		lis[i].index=i;
		//鼠标移入事件
		//鼠标移入的时候，作用的那个li的背景色改变，所对应的内容显示
		//而先前默认的li的背景色变为无色，内容隐藏
		lis[i].onmouseover=function(event){
			for(var j=0;j<ad_nav_bottom.length;j++){
				lis[j].style["background-color"]="";
				ad_nav_bottom[j].style.display="";
			}
			this.style["background-color"]="#FFAACC";
			ad_nav_bottom[this.index].style.display="block";
		};
		//鼠标移出事件
		//当鼠标移出的时候，刚刚作用的那个li背景色恢复原样，所对应的内容隐藏；
		//恢复默认
		lis[i].onmouseout=function(event){
			//console.log(this);//this指向当前作用的那个li
			this.style["background-color"]="";
			ad_nav_bottom[this.index].style.display="";
			lis[0].style["background-color"]="#FFAACC";
			ad_nav_bottom[0].style.display="block";
		};
	}


	
	
	