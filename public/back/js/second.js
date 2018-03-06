/**
 * Created by Administrator on 2018/3/5.
 */
$(".add").on("click",function(){
    $("#addModal").modal("show");


    $.ajax({
        url : "/category/queryTopCategoryPaging",
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


var page = 1;
var pageSize = 5;

function render (){
    $.ajax({
        url : "/category/querySecondCategoryPaging",
        data : {
            page : page,
            pageSize : pageSize
        },
        type : "get",
        success : function(info){
            console.log(info);
            //console.log(template("temp", info));
            $(".table tbody").html(template("temp_second",info));

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


//li注册事件

$(".dropdown-menu").on("click","a",function(){
    console.log($(this).data("id"));

    $("[name='categoryId']").val($(this).data("id"));

    $(".categoryname").text($(this).text());

    $("#form").data("bootstrapValidator").updateStatus("categoryId","VALID");
})


$("#fileupload").fileupload({
    dataType:"json",
    //e：事件对象
    //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
    done:function (e, data) {
        console.log(data.result.picAddr);
        console.log(e);
        console.log(data);
        $(".img_box img").attr("src",data.result.picAddr);
        $(".img_box input").val(data.result.picAddr);
        $("#form").data("bootstrapValidator").updateStatus("brandLogo","VALID");
    }
});

var $form = $("#form");

$("#form").bootstrapValidator({
    feedbackIcons : {
        valid : "glphicon glphicon-ok",
        invalid : "glphicon glphicon-remove",
        validating : "glphicon glphicon-refresh"
    },

    fields : {
        categoryId : {
            validators : {
                notEmpty :{
                    message : "一级分类不能为空"
                }
            }
        },
        brandName : {
            validators : {
                notEmpty : {
                    message : "二级分类不能为空"
                }
            }
        },
        brandLogo : {
            validators : {
                notEmpty : {
                    message : "图片不能为空"
                }
            }
        }
    },
    excluded: [],
})


//var $form = $("form");
//$form.bootstrapValidator({
//    //小图标
//    feedbackIcons: {
//        valid: 'glyphicon glyphicon-ok',
//        invalid: 'glyphicon glyphicon-remove',
//        validating: 'glyphicon glyphicon-refresh'
//    },
//    //校验规则
//    fields:{
//        categoryId:{
//            validators:{
//                notEmpty:{
//                    message:'请选择一级分类'
//                }
//            }
//        },
//        brandName:{
//            validators:{
//                notEmpty:{
//                    message:'请输入品牌的名称'
//                }
//            }
//        },
//        brandLogo: {
//            validators:{
//                notEmpty:{
//                    message:'请上传品牌的图片'
//                }
//            }
//        }
//    },
//    excluded:[]
//});

$("form").on("success.form.bv",function(e){
    e.preventDefault();
    $.ajax({
        url : "/category/addSecondCategory",
        data : $("#form").serialize(),
        type : "post",
        success :  function(info){
            console.log(info);
            render();
            $("#form").data("bootstrapValidator").resetForm(true);
            $("[name='categoryId']").val("");

            $(".categoryname").text("请选择一级分类");

            $(".img_box img").attr("src","");
            $(".img_box input").val("");

            $("#addModal").modal("hide");
        }
    })
})


