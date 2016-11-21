var app3 = angular.module('myApp.clazz',[]);
//控制器
app3.controller('clazzController',function ($scope,clazzService,$location,$rootScope) {
   //1当页面一加载的时候数据就要显示在页面上（首页）
    clazzService.showAllClazz(function (data) {
        $scope.clazzData = data;
        //console.log( $scope.clazzData);
    })
    //2.查询  ng-model
    //3.添加
    //当点击添加按钮的时候(绑定事件)，首先将添加页面加载进来，其次在添加页面上输入数据，将数据放在一个空对象里面，
    // 通过调用服务中的添加方法发送给后台即可
    $scope.addClazz = function () {
        $location.path('/addClazz');//配置一下config
    }
    //4.删除
    //4.1删除单另一个
    //当点击table中的删除按钮的时候，拿到你要删除的那一行的id，并通过调用服务中删除一个的方法将id传递给后台即可
    var tbody = angular.element(document).find('tbody');
    tbody.on('click',function (event) {
       // console.log(event.target);
        //判断一下你点击的是否是button
        if(event.target.nodeName == 'BUTTON'){
            var value = angular.element(event.target).attr('value');
           // console.log(value);
            //将这个id通过调用方法传递给后台即可
            clazzService.delClazz(value);
        }
    });
    //4.2删除选择到的所有
    //当点击div中的删除按钮的时候(绑定事件)，拿到你要删除的所有内容的id,并拼接起来发送给后台即可
    $scope.delCheckedClazz = function () {
        //首先声明一个空数组
        var delIDs = [];
        var inputs = angular.element(document).find('tbody').find('input');
       // console.log(inputs);
        //拿到每一个input
        angular.forEach(inputs,function (item) {
            //console.log(item);
            var input = angular.element(item);
            //判断一下是否被选中
            if(input.prop('checked')){
                delIDs.push(input.attr('value'));
            }
        });
        var delStrIDs = delIDs.join('-');
        //将delStrIDs通过调用服务中的方法传递给后台
        clazzService.delCheckedClazz(delStrIDs);
    };
    //5.修改
    //当点击修改按钮的时候(绑定事件)，将你要修改的那一行的id通过服务中的方法发送给后台，并接受到他闯过来的数据展示在修改页面上
    //同时将修改页面加载过来，然后在修改页面上修改完数据，将修改以后的数据拿到，放在一个对象中发送给后台即可
    $scope.changeClazz = function () {
        var changeID = '';
        var inputs = angular.element(document).find('tbody').find('input');
        console.log(inputs);
        //拿到每一个input
        angular.forEach(inputs,function (item) {
            var input = angular.element(item);
            console.log(input);
            //判断一下是否被选中
            if(input.prop('checked')){
                changeID = input.attr('value');
            }
        });
        console.log(changeID);
        //将changeID通过调用服务中的方法传递给后台，并拿到后台返回的数据展示在页面上
        clazzService.findClazzById(changeID,function (data) {
            $rootScope.changeClazzData = data;
            console.log($scope.changeClazzData);
        });
        //与此同时，页面跳转到修改页面
        $location.path('/changeClazz');//配置
    }

});
//服务
app3.provider('clazzService',function () {
    this.$get = function ($http) {
        return {
            showAllClazz:function (fun) {
                $http.get('data/clazz.json').success(function (data) {
                    fun(data);
                });
            },
            addClazz:function (clazz) {
                $http.post('xx.action',{clazz:clazz}).success(function () {
                    alert('添加成功');
                });
            },
            delClazz:function (delID) {
                $http.post('del.action',{delID:delID}).success(function () {
                    alert('删除成功');
                });
            },
            delCheckedClazz:function (delStrIDs) {
                $http.post('del.action',{delStrIDs:delStrIDs}).success(function () {
                    alert('选择到的删除成功');
                });
            },
            findClazzById:function (changeID,fun) {
                $http.get('data/user.json',{changeID:changeID}).success(function (data) {
                    fun(data);
                });
            }
        }
    }
});
//配置
app3.config(function ($routeProvider) {
    $routeProvider.when('/addClazz',{
        templateUrl:'tpl/addClazz.html',
        controller:'addClazzController'
    }).when('/changeClazz',{
        templateUrl:'tpl/changeClazz.html',
        controller:'changeClazzController'
    });
});
//addClazz的控制器
app3.controller('addClazzController',function ($scope,clazzService,$location) {
    //在添加页面拿到输入的数据，调用服务中的添加方法将数据传送给后台
    //声明一个空对象
    $scope.clazz = {};
    //当点击添加页面的提交的时候调用方法（绑定事件），传数据
    $scope.addClazzs = function () {
        clazzService.addClazz($scope.clazz);//一定要在.html页面ng-model绑定数据
    };
    //添加完成之后点击返回的时候页面跳转到首页
    $scope.backIndex = function () {
        $location.path('/Clazz');
    }
});
//changeClazz.html的控制器
app3.controller('changeClazzController',function ($scope,clazzService) {
    //在修改页面拿到输入的数据，调用服务中的添加方法将数据传送给后台
    //声明一个空对象
    $scope.clazz = {};
    //当点击修改页面的提交的时候调用方法（绑定事件），传数据
    $scope.addClazzs = function () {
        clazzService.addClazz($scope.clazz);//一定要在.html页面ng-model绑定数据
    };
    //添加完成之后点击返回的时候页面跳转到首页
    $scope.backIndex = function () {
        $location.path('/Clazz');
    }
});
//修改的时候必须要用双向绑定将我修改后的数据放在一个对象里面传递给后台这怎么实现？？？？？
