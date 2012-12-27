var VideoAnalytics = VideoAnalytics || {};

// Wait for the video element to be parsed before attempting this.
$(document).ready(function(){

  // Wait until the video metadata has been loaded before we try to determine the current video source.
  $('video').on('loadedmetadata', function(){

    // Simple function to chop off the file extension for the current source of the video. 
    VideoAnalytics.video_url = (function(){
      var current_source = $('video')[0].currentSrc;
      return current_source.slice(0, -4);
    }());

    // function that sends the actual tracking beacon
    VideoAnalytics.gaq_track = function(action) {
      // All events will be in the Video category
      var tracking_params = ['_trackEvent','Video']
      // append the event action after the event method and the event category    
      tracking_params.push(action);
      // append the video url as the event label
      tracking_params.push(VideoAnalytics.video_url);

      // Replace this console.log with something like this if you are using Google Analytics:
      // _gaq.push(tracking_params);
      console.log(tracking_params);
    }

    // Track the play event.
    $('video').on('play', function(){
      VideoAnalytics.gaq_track('Play');
    });

    // Track the pause event.
    $('video').on('pause', function(){
      VideoAnalytics.gaq_track('Pause');
    });

    // Track the seeked event. This gets fired when the currentTime is set. For instance it gets
    // triggered with a click on the time rail control.
    $('video').on('seeked', function(){
      VideoAnalytics.gaq_track('Seeked');
    });

    // Track the ended event.
    $('video').on('ended', function(){
      VideoAnalytics.gaq_track('Ended');
    });

  });
  
});