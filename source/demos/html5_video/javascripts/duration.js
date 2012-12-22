$(document).ready(function(){
  // It is only safe to add the duration to the page after the metadata 
  // for the video has been loaded.
  $('video').bind('loadedmetadata',function(){
    var duration = $('video')[0].duration;
    $('#duration').html('Duration: ' + duration);
  });  
});