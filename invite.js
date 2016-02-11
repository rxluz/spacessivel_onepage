$(".uiScrollableAreaWrap").scrollTop(100000);
$("._5kwh button").click();

var x=1;
function inn(){
  $(".uiScrollableAreaWrap").scrollTop(100000);
  $("._5kwh button").click();
  console.log('entrou '+x);
  x++;
  setTimeout(inn, 120000);
}

inn();

//setTimeout(function(){in();}, 120000);
