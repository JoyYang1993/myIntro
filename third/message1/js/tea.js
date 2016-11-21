var app2 = angular.module('myApp.tea',[]);
//tea.html中的controller
app2.controller('teaController',function ($scope,teaService,$location,$rootScope) {
    //首先页面一加载就要拿到数据（要用到服务）
    teaService.findAllTea(function (data) {
        $scope.teaData = data;
        //console.log($scope.teaData);
    });
    //添加
    $scope.addTea = function () {
        //当点击添加按钮的时候，页面跳转到添加的页面，再添加页面输入数据后将所有数据拿到传递给后台
        $location.path('/addTea');//此时要在config中配置一下，跳转页面
    };
    //删除
    //(1)删除一个
    //当点击table中的删除按钮的时候，拿到你要删除内容的id传给后台即可
    var tbody = angular.element(document).find('tbody');
    tbody.on('click',function (event) {
        console.log(event.target);
        //要判断一下你点击的是否是button
        if(event.target.nodeName == 'BUTTON'){
            var value = angular.element(event.target).attr('value');
            console.log(value);
            //将拿到的value（id）通过调用服务中的delTea()方法传递给后台
            teaService.delTea(value);
        }
    });
    //(2)删除多个
    //当点击div中的删除按钮的时候，拿到被选中的内容的id，并进行拼接，将拼接后的结果传递给后台，此时才要绑事件
    $scope.delTeacher = function () {
        //拿到所有的input框，看看是否被选中，并将选中的拼接起来
        var inputs = angular.element(document).find('tbody').find('input');
       // console.log(inputs);
        //拿到每一个input  forEach()
        //声明一个空数组，用来放你选中内容的id
        var idArr = [];
        angular.forEach(inputs,function (item) {
            //console.log(item);
            var input = angular.element(item);
            console.log(input);
            //判断一下是否被选中,将被选中的id放进数组中
            if(input.prop('checked')){
                idArr.push(input.attr('value'));
            }
        });
        //将数组转换为字符串
        var idStr = idArr.join('-');
        //将此字符串通过调用服务中的方法传递给后台，让后台来删除
        teaService.delSelectTea(idStr);
    };
    //修改
    $scope.changeTea = function () {
        //点击修改按钮的时候，将你要修改内容的id传递给后台，后台返回对应的数据，
        // 你将数据展示在修改页面上，此时要将修改页面加载上来
        //在修改页面中修改完数据，将修改的数据放在一个对象中，点击修改页面的提交按钮，
        // 将数据提交给后台保存(要给表单绑定一个submit事件)
        //当点击修改页面的返回的时候，页面跳转到首页
        var inputs = angular.element(document).find('tbody').find('input');
       // console.log(inputs);
        //声明一个空数组，用来放你选中内容的id
        var changeID = '';
        angular.forEach(inputs,function (item) {
           // console.log(item);
            var input = angular.element(item);
            console.log(input);
            //判断一下是否被选中
            if(input.prop('checked')){
                changeID = input.attr('value');
            }
        });
        //将changeStrID通过调用服务中的方法传递给后台
        teaService.changeTea(changeID,function (data) {
            console.log(data);
            $rootScope.changeTeaData = data;
        });
        //同时将页面跳转到修改页面
        $location.path('/changeTea');//config配置一下
    }

});
//服务，定义方法，获取数据，发送数据
app2.provider('teaService',function () {
    this.$get = function ($http) {
        return {
            findAllTea:function (fun) {
                $http.get('data/teas.json').success(function (data) {
                    fun(data);
                });
            },
            addTea:function (tea) {
                $http.get('#',{tea:tea}).success(function () {
                    alert('添加成功');
                });
            },
            delTea:function (delID) {
                $http.get('#',{delID:delID}).success(function () {
                   alert('删除成功');
                });
            },
            delSelectTea:function (selectID) {
                $http.get('#',{selectID:selectID}).success(function () {
                    alert('删除成功');
                });
            },
            changeTea:function (changeID,fun) {
                $http.get('data/user.json',{changeID:changeID}).success(function (data) {
                    fun(data);
                });
            }
        }
    }
});
//config
app2.config(function ($routeProvider) {
    $routeProvider.when('/addTea',{
        templateUrl:'tpl/addTea.html',
        controller:'addTeaController'
    }).when('/changeTea',{
        templateUrl:'tpl/changeTea.html',
        controller:'changeTeaController'//去定义修改页面的控制器
    });
});
//addTea.html中的controller
app2.controller('addTeaController',function ($scope,teaService,$location) {
    //首先声明一个空对象，用来放你添加的数据
    $scope.tea = {};
    //当点击提交的时候，将提交的内容给后台
    $scope.addTeacher = function () {
        teaService.addTea($scope.tea);
    };
    //当点击返回的时候，页面跳转到首页
    $scope.backIndex = function () {
        $location.path('/Teacher');
    }
})
//changeTea.html的controller
app2.controller('changeTeaController',function ($scope,teaService,$location) {
    //首先声明一个空对象，将你修改后的数据放在里面
    $scope.tea = {};
    $scope.addTeacher = function () {
        //当点击提交的时候，通过调用服务中的addTea()方法将数据提交给后台
        teaService.addTea($scope.tea);
    };
    //当点击返回按钮的时候，页面跳转到首页
    $scope.backIndex = function () {
        $location.path('/Teacher');
    }
});