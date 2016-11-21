//所有的数据操作
function getDB(){
    var db = window.openDatabase('stu',1.0,'这是信息存储的',1024*1024*5);
    return db;
}
$(function(){
    //创建数据库
     var db = getDB();
    db.transaction(function(transaction){
        var sql = 'CREATE TABLE IF NOT EXISTS student(id integer PRIMARY KEY ,name text, gender text,age integer,address text)';
        transaction.executeSql(sql,[]);
    })
});
function saveStu(stu,handler){
    //保存数据
    var db = getDB();
    //写sql
    db.transaction(function(transaction){
        //插入
        var sql = 'INSERT INTO student VALUES (?,?,?,?,?)';
       // console.log(stu)
        transaction.executeSql(sql,[stu.id,stu.name,stu.gender,stu.age,stu.address],function(){
            handler('保存成功');
        },function (tran,error) {
            console.log(error);
        });
    })
}
//查询
function findAll(handler) {
    var db = getDB();
    db.transaction(function (transaction) {
        var sql = 'SELECT * FROM student';
        transaction.executeSql(sql,[],function(transaction,result){
            handler(result.rows);
        })
    })
}
//删除
function deleteSelect(arr) {
    var db = getDB();
    db.transaction(function(transaction){
        for(var i=0;i<arr.length;i++){
            var sql = 'DELETE FROM student WHERE id=?';
            transaction.executeSql(sql,[arr[i]])
        }
    })
}
//修改学生信息
function changeStu(stu,handler) {
    var db = getDB();
    db.transaction(function(transaction){
        var sql = 'UPDATE student set name = ?,gender = ?,age = ?,address = ? where id = ?';
        transaction.executeSql(sql,[stu.name,stu.gender,stu.age,stu.address,stu.id],function () {
            handler('修改成功');
        })
    })
}
function Student(id,name,gender,age,address){
    this.id = id;
    this.name = name;
    this.gender = gender;
    this.age = age;
    this.address =address;
}
