//所有的数据操作
function createDB(name){
    var req = window.indexedDB.open('Student');
    req.onupgradeneeded = function (event) {
        var db = event.target.result;
        //判断表在Student中是否存在
        if(db.objectStoreNames.contains(name)){
            db.deleteObjectStore(name);
        }
        //创建
        db.createObjectStore(name,{
            keyPath:'id',
            autoIncrement:true
        });
    }
}
//拿到仓库
function getDBStore(handler){
    var req = window.indexedDB.open('Student');
    req.onsuccess = function (event) {
        var db = this.result;
        var tran = db.transaction(['stuList'],'readwrite');
        var store = tran.objectStore('stuList');
        handler(store);
    }
}
//保存
function save(stu,fun) {
    getDBStore(function (store) {
        //拿到store 存储
        var req = store.put(stu);
        req.onsuccess = function (event) {
            fun(event);
        }
    });
}
//查询
function findAll(fun){
    getDBStore(function (store) {
        var req = store.getAll();
        req.onsuccess = function (event) {
            fun(event.target.result);
        }
    });
}
//删除
function deleteStuById(id,fun) {
    getDBStore(function (store) {
        var req = store.delete(id);
        req.onsuccess = function (event) {
            fun('删除成功');
        }
    })
}

$(function(){
    //保证表能够创建
    createDB('stuList');
});

function Student(id,name,gender,age,address){
    this.id = id;
    this.name = name;
    this.gender = gender;
    this.age = age;
    this.address =address;
}
