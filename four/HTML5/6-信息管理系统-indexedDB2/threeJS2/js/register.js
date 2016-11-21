$(function () {
    $('form').submit(function () {
        var id = $('#number').val();
        var name = $('#username').val();
        var gender = $('input[name="gender"]:checked').val();
        var age = $('#age').val();
        var address = $('input[name="address"]').val();
        var psw = $('input[name="psw"]').val();
        console.log(id,name,gender,age,address);
        var person = new Person(id,name,gender,age,address,psw)
        var flag = confirm('这是公共网络不建议保存数据，是否继续？')
        if(flag){
            save(person);
        }else{
            alert('欢迎再次使用');
        }
        $('form').get(0).reset();
        window.location.reload();
    });



});