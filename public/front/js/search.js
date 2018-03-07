(function () {

 function getHistory() {
     var history =localStorage.getItem("search_list") || '[]';
     var arr = JSON.parse(history);    //JSON.parse() 从一个字符串中解析出json对象
      return arr;
     console.log(arr);
 }

   function render() {
       var arr=getHistory();
       //console.log(arr);
       console.log(template("temp", {arr: arr}));
       //$('.lt_history').html(template("temp",{ }));
   }
   render();

})();