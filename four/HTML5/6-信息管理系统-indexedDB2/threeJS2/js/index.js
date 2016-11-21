$(function(){
    //拿到数据并且展示
    findAll(function (result) {
       // console.log(result);
        for(var i=0;i<result.length;i++){
            var obj = result[i];
            // console.log(obj);
            //拿到隐藏的模板
            var tr = $('tbody tr:hidden').clone().removeAttr('hidden');
            //追加
            $('tbody').append(tr);
            //往里面添加数据
            tr.find('td input').eq(0).attr('id',obj.id);
            tr.find('td').eq(1).html(obj.name);
            tr.find('td').eq(2).html(obj.gender);
            tr.find('td').eq(3).html(obj.age);
            tr.find('td').eq(4).html(obj.address);
            tr.find('td').eq(5).html(obj.psw);
        }
    })
//删除
   $($('button').eq(2)).click(function(){
        var idArr = [];
        //首先选择到checkbox里面的值  id
        for(var i=0;i<$('tbody tr td input').length;i++){
            var input = $('tbody tr td input[type="checkbox"]')[i];
            // console.log(input);
            if($(input).prop('checked')){
                idArr.push($(input).attr('id'));
            }
        }
        deleteById(idArr);
        alert('删除成功');
        window.location.reload();
    })


    //修改
     $($('button').eq(3)).click(function(){
        var id = '';
        for(var i=0;i<$('tbody tr td input').length;i++){
            var input = $('tbody tr td input[type="checkbox"]')[i];
            // console.log(input);
            if($(input).prop('checked')){
                id = $(input).attr('id');
            }
        }
        //load进来change.html
        //id 存到本地缓存中
        localStorage.setItem('id',id);
        $('body').load('change.html');
    })

});