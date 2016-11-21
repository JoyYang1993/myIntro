//add页面所有js
$(function(){
    $('form').submit(function(){
       //怎么去拿到输入框中的值
        var id = $('#number').val();
        var name = $('#username').val();
        var gender = $('tbody').find('input[name="gender"]:checked').val();
        var age = $('#age').val();
        var address = $('tbody').find('input[name="address"]').val();
        console.log(id,name,gender,age,address);
        var stu = new Student(id,name,gender,age,address);
        save(stu);
        alert('保存成功');
        //console.log( $('form').get(0));
       $('form').get(0).reset();
    })
});