/**
 * Created by Administrator on 2018/3/3.
 */

$(function() {
    $('form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            username: {
                validators: {
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    //stringLength : {
                    //    min : 2,
                    //    max : 6,
                    //    message : '用户名长度必须在2到6之间'
                    //}，
                    callback : {
                        message:"用户名错误！"
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    stringLength: {
                        min: 2,
                        max: 6,
                        message: '密码长度必须在2到6之间'
                    },
                    callback : {
                        message : "密码错误！！"
                    }
                }
            }
        }
    })

    $('[type=reset]').on("click", function () {
        $('form').data('bootstrapValidator').resetForm();
    })

    //$('form').on("success.form.bv",function(e){
    //    //console.log(12);
    //    e.preventDefault();
    //    $.ajax({
    //        type : "post",
    //        url : "/employee/employeeLogin",
    //        data : $('form').serialize(),
    //        success : function(info){
    //            console.log(info);
    //        }
    //    })
    //})

    $("form").on("success.form.bv", function (e) {
        //阻止浏览器默认行为
        e.preventDefault();
        console.log($("form").serialize());

        //发送ajax请求登录

        //dataType:'json'  jquery会自动识别   根据 contentType: text/json
        $.ajax({
            type: 'post',
            url: "/employee/employeeLogin",
            data: $("form").serialize(),
            dataType: 'json',
            success: function (info) {
                console.log(info);
                if (info.error === 1000) {
                    //把username这个字段改成校验失败
                    $("form").data("bootstrapValidator").updateStatus("username", "INVALID", "callback");
                }

                if (info.error === 1001) {
                    $("form").data("bootstrapValidator").updateStatus("password", "INVALID", "callback");
                }

                if (info.success) {
                    location.href = "index.html";
                }
            }
        })


    })
})


