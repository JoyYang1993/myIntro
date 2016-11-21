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
        //console.log(id,name,gender,age,address);
        var stu = new Student(id,name,gender,age,address);
        changeStu(stu,function(result){
            alert(result);
            window.location.reload('listStu.html');
        });
    });
});