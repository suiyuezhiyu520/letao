/**
 * Created by Administrator on 2018/3/7.
 */
$(function(){

    function getsearchKey (){
        return localStorage.getItem("list_search") ? localStorage.getItem("list_search").split(',') : [];
    }

    function render (){
        $(".search-content").html(template("temp_search",{arr : getsearchKey()}));
    }
    render();

    $(".search-content").on("click",".del_all",function(){
        localStorage.removeItem("list_search");
        render();
    })

    function setsearchKey (key){
        var arr = getsearchKey();
        if(arr.indexOf(key)){

        }
    }

    $(".search-content").on("click",".btn_delete",function(){
        var index = $(this).data("index");
        var arr = getsearchKey()
        arr.splice(index,1);
        localStorage.setItem("list_search",arr.join(","));
        render();
    })


















    $(".search button").on("click",function(){
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
            localStorage.setItem("list_search",arr.join(","));
            //render();

            location.href= "productList.html?searchkey=" + searchkey;
        }else{
            return ;
        }
    })























})