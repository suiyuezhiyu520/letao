/**
 * Created by Administrator on 2018/3/3.
 */
$(function(){{
    $(".sencond").prev().on("click",function(){
        $(this).next().slideToggle();
    })


    $(document).ajaxStart(function(){
        NProgress.start();
    })

    $(document).ajaxStop(function () {
        setTimeout(function () {
            NProgress.done();
        }, 500);
    });


    if(!location.search.indexOf("login.html")){
        $.ajax({
            url : "/employee/checkRootLogin",
            data : "get",
            success : function(info){
                console.log(info);
                if(info.error == 400){
                    location.href = "login.html";
                }
            }
        })
    }
}})