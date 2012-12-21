$(document).ready(function(){
  $('#play').on("click", function(){
    $('video')[0].play();
  });
  $('#pause').on("click", function(){
    $('video')[0].pause();
  });
});