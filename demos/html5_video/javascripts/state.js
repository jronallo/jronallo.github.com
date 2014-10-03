$(document).ready(function(){
  $('video').bind('play',function(){
    $('#state').html('playing...')
  });
  $('video').bind('pause',function(){
    $('#state').html('PAUSED')
  });
  $('video').bind('ended',function(){
    $('#state').html('The End')
  });
});