$(document).ready(function(){
  $('video').bind('timeupdate',function(){
    var current_time = $('video')[0].currentTime;
    if (window.console){
      console.log(current_time);
    }    
    $('#current_time').html(parseInt(current_time));
  });  
});