/**
 * Created by Administrator on 2018/3/6.
 */
$.ajax({
    url : "/category/queryTopCategory",
    type : "get",
    success : function(info){
        //console.log(info);
        console.log($(this).parent());
        $(".category_nav ul").html(template("temp_category",info))
        $(".category_nav ul li")[0].classList.add("now");
    }
})

$(".category_nav ul").on("click","a",function(){
    console.log($(this).data("id"));
    $(this).parent().addClass("now").siblings().removeClass("now");

    $("")
    $.ajax({
        url : "/category/querySecondCategory",
        data : {id : $(this).data("id")},
        type : "get",
        success : function(info){
            //console.log(info);
            console.log($(".category_second ul"));
            $(".category_second ul").html(template("temp_second",info));
            mui('.mui-scroll-wrapper').scroll()[1].scrollTo(0,0,100);
        }
    })
})

$.ajax({
    url : "/category/querySecondCategory",
    data : {id : 1},
    type : "get",
    success : function(info){
        //console.log(info);
        console.log($(".category_second ul"));
        $(".category_second ul").html(template("temp_second",info));
        mui('.mui-scroll-wrapper').scroll()[1].scrollTo(0,0,100);

    }
})

