/**
 * Created by Administrator on 2018/3/6.
 */

$(function(){



    var page = 1;
    var pageSize = 5;
    var arr = [];

    function render (){
        $.ajax({
            url : "/product/queryProductDetailList",
            data : {
                page : page,
                pageSize : pageSize
            },
            type : "get",
            success : function(info){
                console.log(info);
                //console.log(template("temp", info));
                $(".table tbody").html(template("temp_product",info));

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


        $.ajax({
            url : "/category/querySecondCategoryPaging",
            data : {
                page : page,
                pageSize : 99999
            },
            type : "get",
            success : function(info){
                console.log(info);
                //console.log(template("temp", info));
                $(".dropdown-menu").html(template("temp_category",info));
                //console.log(template("temp_category", info));

            }
        })
    })




    $(".dropdown-menu").on("click","a",function(){
        console.log($(this).data("id"));

        $("[name='categoryId']").val($(this).data("id"));

        $(".categoryname").text($(this).text());

        $("#form").data("bootstrapValidator").updateStatus("brandId","VALID");
    })

    $("#fileupload").fileupload({
        type : "json",
        done : function(e,data){
            //console.log(e);

            if(arr.length >= 3){
                return ;
            }
            //console.log(data);
            $('<img src="'+ data.result.picAddr +'" width="100" height="100" alt="">').appendTo($(".img_box"));
            //data.result.picName
            arr.push(data.result);
            console.log(arr);


            if(arr.length == 3){
                $("#form").data("bootstrapValidator").updateStatus("productLogo","VALID")
            }else {
                $("#form").data("bootstrapValidator").updateStatus("productLogo","INVALID")
            }

        }
    })


    $("#form").bootstrapValidator({
        feedbackIcons : {
            valid : "glyphicon glyphicon-ok",
            invalid : "glyphicon glyphicon-remove",
            validating : "glyphicon glyphicon-refresh"
        },
        fields : {
            brandId : {
                validators : {
                    notEmpty :{
                        message : "二级分类不能为空"
                    }
                }
            },
            proName : {
                validators : {
                    notEmpty : {
                        message : "商品名称不能为空"
                    }
                }
            },
            proDesc : {
                validators : {
                    notEmpty : {
                        message : "不能为空"
                    }
                }
            },
            num : {
                validators : {
                    notEmpty : {
                        message : "不能为空"
                    },
                    regexp : {
                        regexp : /^[1-9]\d*$/,
                        message : "请规范填写一个整数",
                    }
                }
            },
            size : {
                validators : {
                    notEmpty : {
                        message : "不能为空"
                    },
                    regexp : {
                        regexp : /^\d{2}-\d{2}$/,
                        message : "请规范填写（例如32-44）"
                    }
                }
            },
            oldPrice : {
                validators : {
                    notEmpty : {
                        message : "不能为空"
                    }
                }
            },
            price : {
                validators : {
                    notEmpty : {
                        message : "不能为空"
                    }
                }
            },
            productLogo : {
                validators : {
                    notEmpty : {
                        message : "请上传三张"
                    }
                }
            }
        },
        excluded: [],
    })


    $("#form").on("success.form.bv",function(e){
        e.preventDefault();
            var str = "";
            str  += "&picName1="+ arr[0].picName +"&picAddr1="+ arr[0].picAddr
             str   += "&picName2="+ arr[1].picName +"&picAddr2="+ arr[1].picAddr
             str   += "&picName3="+ arr[2].picName +"&picAddr3="+ arr[2].picAddr
        console.log(str);
        $.ajax({
            url : "/product/addProduct",
            type : "post",
            data : $("#form").serialize()+str,
            success : function(info){
                console.log(info);
                arr = [];
                $("#form").data("bootstrapValidator").resetForm(true);
                $("#addModal").modal("hide");
                render();
                $(".categoryname").text("请选择二级分类");
                $(".img_box img").remove();
            }
        })
    })

})