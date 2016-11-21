var app1 = angular.module('myApp.stu',[]);//1
//stu.html中的controller
app1.controller('stuController',function ($scope,stuService,$location,$rootScope) {
    alert();
    stuService.findAllStu(function (data) { //3
        $scope.stus = data;
        //console.log(data);
    });
    //当点击div中添加按钮的时候，页面跳转到添加的页面进行操作(要用到config)
    $scope.addStu = function () {//4
        $location.path('/addStu');
    };
    //!!!删除的时候要注意，删除不是前端人员从页面上删除，而是前端人员将要删除的内容所对应的id传递给后台，后台从数据
    //库中删除，页面中就不会再有展示
    //当点击table里面的删除按钮的时候，将你要删除的内容所对应的id传给后台即可//8
    var tbody = angular.element(document).find('tbody');
    tbody.on('click',function (event) {
       // console.log(event.target);
        //判断一下你点击的是否是button
        if(event.target.nodeName == 'BUTTON'){
            //当你点击的是button的时候，拿到button里面的value属性值，也就是你要删除的内容的id，通过$http传递给后台
            var value = angular.element(event.target).attr('value');
           // console.log(value);
            //调用方法传给后台
            stuService.deleteStudent(value);
        }
    });
    //当点击div中的删除按钮的时候，拿到你选中内容的id，将选中内容的id进行拼接，然后通过$http发给后台//10
    $scope.delStu = function () {
        //首先拿到input标签
        var inputs = angular.element(document).find('tbody').find('input');
        console.log(inputs);
        //声明一个空数组，将拿到的id放到里面传递给后台
        var idArr = [];
        for(var i= 0;i<inputs.length;i++){
           var input = angular.element(inputs[i]);
            //console.log(input);
            //判断一下是否被选中
            if(input.prop('checked')){
                idArr.push(input.attr('value'));
            }
        }
        var idStr = idArr.join('-');
        //console.log(idStr);
        //将idStr通过$http传递给后台
        stuService.deleteAllStu(idStr);
    };
    //当点击div中修改按钮的时候，将选中的要修改内容的id发送给后台，后台将数据返回给我们，我们展示在页面上
    //修改完成后，将修改后的数据发送给后台保存
    $scope.changeStu = function () {//12
        var inputs = angular.element(document).find('tbody').find('input');
        console.log(inputs);
        var id = '';
        angular.forEach(inputs,function (item) {
           // console.log(item);
            var input = angular.element(item);
            console.log(input);
            //判断一下是否被选中,如果被选中就拿到被选中的id
            if(input.prop('checked')){
                id = input.attr('value');
            }
        });
        //然后将拿到的id通过$htpp传递给后台，并拿到后台传过来的响应数据
        stuService.changeStudent(id,function (data) {
            console.log(data);
            $rootScope.changeStus = data;
        });
        //点击修改的时候将修改页面加载过来(config)
        $location.path('/changeStu');
    }
});
//页面一加载将数据展示在页面
//stu.html中的service
app1.provider('stuService',function () {
    this.$get = function ($http) {
        return {
            findAllStu:function (fun) {//2
                $http.get('data/stus.json').success(function (data) {
                    fun(data);
                });
            },
            addStudent:function (stu) {//7
                $http.get('#',{stu:stu}).success(function () {
                    alert('添加成功');
                });
            },
            deleteStudent:function (id) {//9
                $http.get('#',{id:id}).success(function () {
                    alert('删除成功');
                });
            },
            deleteAllStu:function (idStr) {//11
                $http.get('#',{idStr:idStr}).success(function () {
                    alert('删除成功');
                });
            },
            changeStudent:function (changeID,fun) {//13
                $http.get('data/user.json',{changeID:changeID}).success(function (data) {
                    fun(data);
                });
            }
        }
    }
});
//stu.html中的config
app1.config(function ($routeProvider) {//5
    $routeProvider.when('/addStu',{
        templateUrl:'tpl/addStu.html',
        controller:'addStuController'
    }).when('/changeStu',{//14
        templateUrl:'tpl/changeStu.html',
        controller:'changeController'
    });
});
//addStu.html中的controller
app1.controller('addStuController',function ($scope,stuService,$location) {//6
    //首先声明一个对象，来装你的数据
    $scope.stu = {};
    $scope.addStu = function () {
        //然后调用你在服务里面写的往后台传数据的那个方法  整个保存
        stuService.addStudent($scope.stu);
    };
    //点击返回的时候，页面回到首页
    $scope.backIndex = function () {
        $location.path('/Student');
    }
});
//changeStu.html里面的额controller
app1.controller('changeController',function ($scope,stuService,$location) {//15
    //声明一个空对象，来放你修改完成往后台发送的数据
    $scope.stu = {};
    $scope.addStu = function () {
        //调用你在服务里面写的网后台传数据的那个方法  整个保存
        stuService.addStudent($scope.stu);
    };
    //保存完以后点击返回调回主页面
    $scope.backIndex = function () {
        $location.path('/Student');
    }
})