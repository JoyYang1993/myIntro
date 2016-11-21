$(function(){
    var id = localStorage.getItem('id');
    //拿到id 的input  把id放入
    $('input').eq(0).val(id);
    //提交
    $('form').submit(function(){
        var id = $('#number').val();
        var name = $('#username').val();
        var gender = $('tbody').find('input[name="gender"]:checked').val();
        var age = $('#age').val();
        var address = $('tbody').find('input[name="address"]').val();
        var psw = $('tbody').find('input[name="psw"]').val();
        //console.log(id,name,gender,age,address);
        var stu = new Person(id,name,gender,age,address,psw);
        console.log(stu);
        change(stu);
       $('body').load('index.html');
    });
});