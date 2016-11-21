//实现功能：当鼠标滑过月份标题之后，对应的内容显示在内容区域
//获取元素
var month_title=document.getElementById("month_title");
//console.log(month_title);
//每一个月份对应的标题的div
var month_title_=month_title.children;//类数组
//console.log(month_title_);
//每一个月份对应的内容的div
var montn_content=document.getElementsByClassName("montn_content");//类数组
//console.log(montn_content);
//为获取到的元素添加鼠标事件
//移进事件
for(var i=0;i<month_title_.length;i++){
	//console.log(i);
	//console.log(month_title_[i]);
	month_title_[i].index=i;
	//console.log(month_title_[i].index);
	//当鼠标移入的时候对应的月份背景变成白色，月份的字变成红色，
	//对应的内容显示
	month_title_[i].onmouseover=function(event){
		//console.log(event);
		//console.log(event.target);
		event=event.target;
		//console.log(event);
		//console.log(this);
		for(var j=0;j<montn_content.length;j++){
			month_title_[j].style["background-color"]="";
			month_title_[j].style.color=""
			montn_content[j].style.display="";
		}
		this.style["background-color"]="white";
		this.style.color="#E84A7E";
		montn_content[this.index].style.display="block";

	};
}