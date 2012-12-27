// video_engagement_analytics.js
// Use this as a template for creating your own video engagement analytics tracking
// in your application.

// We want to track how much of the video gets played within each page view. We will
// send a video identifier by looking at the data-video-id attribute of the video
// element so that we can aggregate by unique video. The most important thing we 
// want to track are the ranges of time the 
// video has been played. This is done by looking at the played property of the 
// video which returns a TimeRanges object. While we continually send this 
// data back to the server lest it go uncounted, we can update the data on the 
// server based on the session. To do that we have to set up a page view 
// "session" to be tracked. We use a randomly generated UUID for the session 
// identifier. We will also send the current time so that only the latest time 
// gets indexed by the server.

// VideoAnalytics modules. Some of this code is extracted from the kinney Ruby gem:
// https://github.com/jronallo/kinney
var VideoAnalytics = VideoAnalytics || {};

$(document).ready(function(){
  VideoAnalytics.engagement = (function ($) {

    // Place a data-video-id attribute on the video element, so that we can send that
    // identifier back to the server. Since the video could be anywhere 
    // we won't asume that the URL of the video file is the same as identifier we
    // ought to use.
    var current_video_id = $('video').first().data('videoId');
    
    // Generate a random (version 4) UUID as the page view session identifier.
    // WARNING: This may not be truly random depending on the system.
    // http://stackoverflow.com/a/2117523/620065
    // It'd be best if we could reliably generate unique ids client-side since we want to be able
    // to do page caching so generating them server side won't work.
    // TODO: consider swapping in node-uuid instead: https://github.com/broofa/node-uuid
    var current_uuid = (function(){
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
      });
    })();

    // Iterate over the TimeRanges object to create an Array of Hashes for the
    // start and end times of each range.
    var time_ranges_to_array = function(time_ranges){
      var ranges = [];
      for (var i=0; i<time_ranges.length; i++) { 
        var range = {};
        range.start = Math.round(time_ranges.start(i)); 
        range.end   = Math.round(time_ranges.end(i)) ;
        ranges.push(range);
      }
      return ranges;
    }

    // Data that we send back to the server.
    var post_data = function(time_ranges){
      return {
        uuid: current_uuid,
        time_ranges: time_ranges,
        video_id: current_video_id,
        time: new Date()
      }
    }

    return {
      // Used so that data is only sent back to the server every 25 timeupdates.
      tracker_delay_counter: 0,  

      // Collects the current TimeRanges object
      time_ranges: null,

      // POST data back to the server. Right now we just log to the console.
      track: function(){
        var time_ranges = time_ranges_to_array($('video')[0].played);
        // Change the following line to post this data 
        // $.post( 'YOUR_POST_PATH', post_data(time_ranges) );

        // if a developer's console is available log to console
        if (window.console){
          console.log( post_data(time_ranges) );
        }      
      },

      // If a user clicks a link that takes them away from the current video page,
      // we will need to include this pause so that any tracking POST completes
      // before the user goes to the new page.
      pause: function(){
        var date = new Date();
        var curDate = null;
        do {
          curDate = new Date();
        } while(curDate-date < 300);
      }
    }; //return
  }(jQuery));

  // Bind to different events so that the time ranges can be POSTed to the server.

  // Every 25 times the timeupdate event fires we'll log the time ranges played.
  $('video').bind('timeupdate',function(){
    VideoAnalytics.engagement.tracker_delay_counter += 1;    
    if (VideoAnalytics.engagement.tracker_delay_counter >= 25) {      
      VideoAnalytics.engagement.track();
      VideoAnalytics.engagement.tracker_delay_counter = 0; // reset the delay counter     
    }
  });  

  // For the seeked, pause, and ended events also send off the tracking data
  // so that we do not lose some data.
  // TODO: Are there other events when we should send the tracker?
  $('video').bind('seeked pause ended', function(){    
    VideoAnalytics.engagement.track();
  });

  // For any link that is clicked on the page also send the tracking data. This will ensure
  // that the latest time ranges are sent to the server before visiting a new page.
  $('a').click(function(){
    VideoAnalytics.engagement.track();
    VideoAnalytics.engagement.pause(); // add a pause so we are sure the POST event can finish
  });
});