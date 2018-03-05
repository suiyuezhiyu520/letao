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
    //console.log(window.location.search);


    if(location.href.indexOf("login.html") == -1){
        $.ajax({
            url : "/employee/checkRootLogin",
            data : "get",
            success : function(info){
                console.log(info);
                if(info.error == 400){
                    //if(location.href.indexOf("login.html") == -1) {
                        location.href = "login.html";
                    //}
                }
            }
        })
    }

    $(function(){
        $('.login_out').on("click",function(e){
            console.log(12);
            e.preventDefault();
            $('#logoutModal').modal("show");
        })


        $(".btn_logout").on("click",function(){
            $.ajax({
                url : "/employee/employeeLogout",
                type : "get",
                success :  function(info){
                    //console.log(info);
                    if(info.success){
                        location.href = "login.html";
                    }
                }
            })
        })
    })

}})