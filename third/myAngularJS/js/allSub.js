//allSub.hmtl
var app1 = angular.module('app.allSub',[]);
//控制器
app1.controller('allSubController',function ($scope,allSubService,$routeParams,$location) {

    //题目类型
    allSubService.findAllTypes(function (data) {
        $scope.types = data;
    });
    //题目等级
    allSubService.findAllLevels(function (data) {
        $scope.levels = data;
    });
    //题目方向
    allSubService.findAllDeps(function (data) {
        $scope.deps = data;
    });
    //知识点
    allSubService.findAllTopics(function (data) {
        $scope.topics = data;
    });
    //获取所有题目
    /*console.log($routeParams);*/// Object { a="0",  b="0",  c="0",  更多...}
    $scope.params = $routeParams;
    allSubService.getAllSubjects( $scope.params,function (subjects) {
        //这个subjects就是后台返回给我们的所有数据[{},{}]
        //遍历拿到每一个对象
        angular.forEach(subjects,function (subject) {
           // console.log(subject);//subject  {},{}
            if(subject.subjectType!=null){//判断一下题型不为空的情况下
                if(subject.subjectType.id!=3){//判断一下题型不为简答的情况下
                    //循环遍历choices
                    angular.forEach(subject.choices,function (choice,index) {
                        //console.log(choice);
                        //console.log(index);
                        //调用服务中的方法给choice加一个no属性  A B  C  D
                        choice.no = allSubService.addNo(index);
                    });
                };
                //声明一个空数组
                var choicesAdd = [];
                angular.forEach(subject.choices,function (choice) {
                    if(choice.correct == true){
                        choicesAdd.push(choice.no)
                    }
                });
                subject.answer = choicesAdd.join(',');
            }
        });
        $scope.subjects = subjects;
    })
    //搜索框查询
    $scope.show =  function(i) {
        var input = $('input')[i];
        $(input).show().siblings('input').hide()
    }



});
//服务
app1.provider('allSubService',function () {
    this.$get = function ($http) {
        return {
            findAllTypes:function (fun) {
                $http.get('data/types.json').success(function (data) {
                    fun(data);
                });
            },
            findAllLevels:function (fun) {
                $http.get('data/levels.json').success(function (data) {
                    fun(data);
                });
            },
            findAllDeps:function (fun) {
                $http.get('data/departmentes.json').success(function (data) {
                    fun(data);
                });
            },
            findAllTopics:function (fun) {
                $http.get('data/topics.json').success(function (data) {
                    fun(data);
                });
            },
            getAllSubjects:function(allSub,fun){
                //查询展示页面提前判断一下
               // console.log(allSub);// Object { a="1",  b="0",  c="0",  更多...}
                //声明一个空对象，用来放你此时拿到的a  b  c  d对应的内容
                var id = {};
                //遍历一下该对象，拿到里面的  a  b  c  d
                for(var key in allSub){
                   // console.log(key)
                    //console.log(allSub[key]);
                    var val = allSub[key];
                    if(val!=0){
                        switch (key){
                            case 'a':
                                id['subject.subjectType.id'] = val;
                                break;
                            case 'b':
                                id['subject.subjectLevel.id'] = val;
                                break;
                            case 'c':
                                id['subject.department.id	'] = val;
                                break;
                            case 'd':
                                id['subject.topic.id'] = val;
                                break;
                        }
                    }
                }
                $http.get('data/subjects.json',{
                    params:id
                }).success(function(data){
                    fun(data);
                });
            },
            addNo:function (index) {
                return index == 0 ? 'A' :(index == 1 ? 'B' : (index == 2 ? 'C' : 'D'));
            }
        }
    }
});
/*用来配置添加subject的路径及其controller*/
app1.config(function($routeProvider){
    $routeProvider.when("/addSubject",{
        templateUrl:"tpl/addsubject.html",
        controller:"allSubController"
    })
})
