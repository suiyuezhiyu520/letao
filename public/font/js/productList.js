/**
 * Created by Administrator on 2018/3/7.
 */
$(function(){
    function getKVUrl (key){
        var obj = {};
        var arr = decodeURI(location.search).split("?")[1].split("&");
        for(var i = 0 ; i < arr.length ; i++){
            var arr2 = arr[i].split("=");
            obj[arr2[0]] = arr2[1];
        }

        return obj[key];
    }


    function getsearchKey (){
        return localStorage.getItem("list_search") ? localStorage.getItem("list_search").split(',') : [];
    }

    $(".search input").val(getKVUrl("searchkey"));

    //var data = getKVUrl("searchkey");
    //console.log(data);
    var key = getKVUrl("searchkey")

    function render (){
        var pro = {
            proName : key,
            page : 1,
            pageSize : 9999999,
        }

        var nows = $(".nav a.now");

        if(nows.length > 0){
            var name = nows.data("type");
            var value = nows.find("span").hasClass("fa-angle-down")? 2:1;

            pro[name] = value;
        }else {

        }


        $.ajax({
            url : "/product/queryProduct",
            data : pro,
            type : "get",
            success : function(info){
                console.log(info);
                $(".lt_product").html(template("temp_product",info));
            }
        })
    }

    render();


    $(".search button").on("click",function(){
        console.log(1234);
        var searchkey = $(".search input").val().trim()
        if(searchkey){
            var arr  = getsearchKey();
            var index = arr.indexOf(searchkey);
            if( index != -1){
                arr.splice(index ,1)
            }

            if(arr.length >= 10){
                arr.pop();
            }

            arr.unshift(searchkey);
            key = searchkey;

            //render();

           render();
        }else{
            return ;
        }
    })




    $(".nav a[data-type]").on("click",function(){

        console.log(1234);
        $this = $(this);
        if($this.hasClass("now")){
            $this.find("span").toggleClass("fa-angle-down").toggleClass("fa-angle-up")
        }else {
            $this.addClass("now").parent().siblings().find("a").removeClass("now");
            $this.parent().siblings().find("span").addClass("fa-angle-down");
        }


        render();
    })























})