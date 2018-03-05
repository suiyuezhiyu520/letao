/**
 * Created by Administrator on 2018/3/5.
 */
$(function(){
    var page = 1;
    var pageSize = 5;

    function render (){
        $.ajax({
            url : "/category/queryTopCategoryPaging",
            data : {
                page : page,
                pageSize : pageSize
            },
            type : "get",
            success : function(info){
                console.log(info);
                //console.log(template("temp", info));
                $(".table tbody").html(template("temp_category",info));

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


    $(".add").on("click",function(){
        $("#addModal").modal("show");
    })

    $("#form").bootstrapValidator({
        feedbackIcons : {
            valid : "glyphicon glyphicon-ok",
            invalid : "glyphicon glyphicon-remove",
            validating : "glyphicon glyphicon-refresh"
        },

        fields : {
            categoryName : {
                validators : {
                    notEmpty : {
                        message : "一级分类不能为空"
                    }
                }
            }
        }

    });

    $("#form").on("success.form.bv",function(e){
        e.preventDefault();
        $.ajax({
            url : "/category/addTopCategory",
            data : $("#form").serialize(),
            type : "post",
            success : function(info){
                console.log(info);
                if(info.success){
                    $("#addModal").modal("hide");
                    page = 1;
                    render();
                }
            }
        })

    })





})