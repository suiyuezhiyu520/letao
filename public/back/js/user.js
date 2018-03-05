/**
 * Created by Administrator on 2018/3/5.
 */

$(function(){
    var page = 1;
    var pageSize = 5;


    //$.ajax({
    //    url : "/user/queryUser",
    //    data : {
    //        page : page,
    //        pageSize : pageSize
    //    },
    //    type : "get",
    //    success : function(info){
    //        console.log(info);
    //        //console.log(template("temp", info));
    //        $(".table tbody").html(template("temp",info));
    //
    //        $("#pagintor").bootstrapPaginator({
    //            bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
    //            currentPage:1,//当前页
    //            totalPages:Math.ceil(info.total/info.size),//总页数
    //            size:"small",//设置控件的大小，mini, small, normal,large
    //            onPageClicked:function(event, originalEvent, type,p){
    //                //为按钮绑定点击事件 page:当前点击的按钮值
    //                page = p;
    //
    //            }
    //        });
    //    }
    //})

    function render (){
        $.ajax({
            url : "/user/queryUser",
            data : {
                page : page,
                pageSize : pageSize
            },
            type : "get",
            success : function(info){
                console.log(info);
                //console.log(template("temp", info));
                $(".table tbody").html(template("temp",info));

                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage:page,//当前页
                    totalPages:Math.ceil(info.total/info.size),//总页数
                    size:"small",//设置控件的大小，mini, small, normal,large
                    onPageClicked:function(event, originalEvent, type,p){
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        page = p;
                        render();

                    }
                });
            }
        })
    }

    render();


})
