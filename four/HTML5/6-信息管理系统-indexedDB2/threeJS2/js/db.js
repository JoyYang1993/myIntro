//所有的数据操作

//创建仓库
function createDB(name) {
    //拿到一个可以打开数据库的对象
    var request = window.indexedDB.open('Person',1);
    //更新
    request.onupgradeneeded = function (event) {
        var db = this.result;
        //判断一下是否有这个仓库
        if(db.objectStoreNames.contains(name)){
            db.deleteObjectStore(name)
        }
        //创建
        db.createObjectStore([name],{
            keyPath:'id',
            autoIncrement:true
        });
    }
}
//拿到仓库
function getDB(handler) {
    //拿到一个可以打开仓库的对象
    var request = window.indexedDB.open('Person',1);
    request.onsuccess = function (event) {
        //db---->tran---->store
        var db = this.result;
        var tran = db.transaction(['person'],'readwrite');
        var store = tran.objectStore('person');
        handler(store);
    }
}

$(function () {
    //保证仓库创建出来
    createDB('person');
});



//保存
function save(stu) {
    getDB(function (store) {
        store.put(stu);
    })
}
//查询  展示
function findAll(fun) {
    getDB(function (store) {
        var re = store.getAll();
        re.onsuccess = function (event) {
            var val = this.result;
            fun(val);
        }
    })
}
//删除
function deleteById(idArr) {
    getDB(function(store){
        for(var i =0;i<idArr.length;i++){
           store.delete(idArr[i]);
        }
    })
}
//修改
function change(stu) {
    getDB(function (store) {
        store.put(stu);
    })
}


function Person(id,name,gender,age,address,psw){
    this.id = id;
    this.name = name;
    this.gender = gender;
    this.age = age;
    this.address =address;
    this.psw = psw;
}
