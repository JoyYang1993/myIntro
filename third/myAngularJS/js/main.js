//index.hmtl
$(function(){
    //先将事件管理和考试管理默认收起来
    $('.baseUI>li>ul').slideUp();
    $('.baseUI>li>ul').eq(0).slideDown();
    //解绑
    $('.baseUI>li>ul').off('click');
    //绑定事件
    $('.baseUI>li').on('click',function (event) {
       // console.log(this);
        //判断一下是不是ul是不是隐藏
        if($(this).children('ul').css('display','none')){
            $('.baseUI>li>ul').slideUp();
            $(this).children('ul').slideDown();
        }
    })
    //选中的背景色变化
    $('.baseUI>li>ul>li').on('click',function (event) {
       // console.log(this);
        $(this).addClass('current').siblings().removeClass('current');
    });
});

var app = angular.module('myApp',['ngRoute','app.allSub','app.subMan']);
//控制器
app.controller('mainController',function ($scope,$location) {
    //页面一加载数据展示在全部题目
    $location.path('/AllSubjects/a/0/b/0/c/0/d/0');
});
//config  配置  路由
app.config(function ($routeProvider) {
    $routeProvider.when('/AllSubjects/a/:a/b/:b/c/:c/d/:d',{
        templateUrl:'tpl/allSub.html',
        controller:'allSubController'
    }).when('/subManage/a/:a/b/:b/c/:c/d/:d',{
        templateUrl:'tpl/subMan.html',
        controller:'subManController'
    });
});
