var app2 = angular.module('app.subMan',[]);
//控制器
app2.controller('subManController',function ($scope,subManService) {
    //页面一加载显示数据
    //类型
    subManService.getAllType(function (data) {
        $scope.types = data;
    });
    //难易程度
    subManService.getAllLevel(function (data) {
        $scope.levels = data;
    });
    //方向
    subManService.getDepatment(function (data) {
        $scope.departments = data;
    });
    //知识点
    subManService.getTopic(function (data) {
        $scope.topics = data;
    });
    //所有题目
    subManService.getAllSubject(function (subjects) {
       //console.log(subjects);
        //稍微处理一下subjects,给每一个选项加上A B C D
        angular.forEach(subjects,function (subject) {
            var choices = subject.choices;
            angular.forEach(choices,function (choice,index) {
                //console.log(choice);
                //console.log(index);
               // console.log(typeof index);
                switch (index){
                    case 0:
                        choice.number = 'A';
                        break;
                    case 1:
                        choice.number = 'B';
                        break;
                    case 2:
                        choice.number = 'C';
                        break;
                    case 3:
                        choice.number = 'D';
                        break;
                }
            });
        });
        $scope.subjects = subjects;
        console.log($scope.subjects);
    });
    
});
//服务
app2.service('subManService',function ($http) {
    //类型
    this.getAllType = function (fun) {
        $http.get('data/types.json').success(function (data) {
            fun(data);
        });
    };
    //难易程度
    this.getAllLevel = function (fun) {
        $http.get('data/levels.json').success(function(data){
            fun(data);
        });
    };
    //方向
    this.getDepatment = function (fun) {
        $http.get('data/departmentes.json').success(function (data) {
            fun(data);
        });
    };
    //知识点
    this.getTopic = function (fun) {
        $http.get('data/topics.json').success(function (data) {
            fun(data);
        });
    };
    //所有题目
    this.getAllSubject = function (fun) {
        $http.get('data/subjects.json').success(function (data) {
            fun(data);
        });
    }
});