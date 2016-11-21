//这是index的js
var app = angular.module('myApp',['ngRoute','myApp.stu','myApp.tea','myApp.clazz']);//myApp.stu作用是告诉myApp一声，myApp.stu是来源于他的
//配置，(1)链接到stu.html    (2)链接到tea.html
app.config(function ($routeProvider) {
    $routeProvider.when('/Student',{
        templateUrl:'tpl/stu.html',
        controller:'stuController'//此时的stuController就是stu.html对应的js里面的controller
    }).when('/Teacher',{
        templateUrl:'tpl/tea.html',
        controller:'teaController'//此时的teaController就是tea.html对应的js里面的controller
    }).when('/Clazz',{
        templateUrl:'tpl/clazz.html',
        controller:'clazzController'//此时的clazzController就是clazz.html里面的controller
    });
});