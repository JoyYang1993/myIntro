$(function () {
    findAll(function (result) {
        var arrID = [];
        var arrName = [];
        var arrPsw = [];
        for(var key in result){
            var id = result[key].id;
            arrID.push(id);
            var name = result[key].name;
            arrName.push(name);
            var  psw = result[key].psw;
            arrPsw.push(psw);
        }
        console.log(arrID);
        console.log(arrName);
        console.log(arrPsw);
        $('form').submit(function () {
            var ID = $('#number').val();
            var Name = $('#username').val();
            var Psw = $('#psw').val();
           for(var i=0;i<arrID.length;i++){
               //判断一下你输入的ID、姓名、密码是否在数据库中存在
               if((ID == arrID[i]) && (Name == arrName[i]) && (Psw == arrPsw[i])){
                   alert('OK');
                   $('body').load('index.html');
               }else{
                   confirm('你的输入有误，请重新输入')
               }
           }

        });
    });



});