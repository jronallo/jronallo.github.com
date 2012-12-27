---
layout: post
title: "Detailed Video Engagement Analytics for HTML5 Video"
date: 2012-12-27 13:35:31
update: 2012-12-27 13:41:31
comments: true
categories: [html5, video, analytics]
sidebar: collapse
published: true
---

If you have published video on the Web with HTML5 Video, then you will want to know how engaged your viewers are with your video. This post will lead you through collecting the data you need to assess your video publishing efforts. Services like Google Analytics only get you so far. To get deeper insights into how your video is being used, you may want to track detailed video engagement analytics.

<!-- more -->

If you've not published video with HTML5 Video yet, then you may want to read [everything I know about HTML5 Video](/blog/html5-video-everything-i-needed-to-know/) and then return here. 

I'll try to update this post as I learn better ways to do video analytics or make corrections to the examples given here.

## Video Play Page ##

For a very basic understanding of how folks are using your video, you will first want to track views of your video play pages. If folks aren't even getting to your video play pages, they do not even have the chance of engaging with your video.

[Remember](/blog/html5-video-everything-i-needed-to-know/) that it is best for search engines like Google if your video plays only on a single page. This makes implementation easier since every video will have one and only one page from which it can be played. This makes it easy to track video play pages.

I won't cover how to set up something like Google Analytics page view tracking. 

## Simple Events ##

What I can show you is how to begin to track various video-related events like clicks on the play and pause controls. If you are just using the browser's native controls, they may not expose elements which you can bind event listeners to. So instead we will listen for the `play` and `pause` events of the `video` element. This allows us to add our own controls through the JavaScript Media Element API or use a polyfill that does so. Any controls you add will trigger off the `play` and `pause` events just the same.

We'll begin with [this demo](/demos/html5_video/55_microdata.html) and extend it to add this simple event tracking. 

First, we'll create a simple object to hold our `track` function. All we need to send into the `track` function is the action we want to track. In the `track` function we'll just log the tracking parameters to the browser's console. If we were really implementing this we would replace the "console.log()" line with however you queue up a tracking event with whatever analytics program you're using. 

We will, though, model the parameters sent to the tracking function on the parameters used for Google Analytics event tracking. The parameters in order then will be category, action, and label.  The category will always be "Videos". The action will be "Play" or "Pause". The value will always be the identifier for the video. We'll determine the video by taking the current source of the video and removing the extension.

One thing you'll notice is that we are wrapping everything within a event handler for "loadedmetadata". We only want to apply any of this if there is a video element on the page and the video actually loads its metadata. This means that you can use `video.currentSrc` to determine the current video file URL.

```javascript video event tracking function http://jronallo.github.com/demos/html5_video/javascripts/video_analytics_events.js Source
// Wait for the video element to be parsed before attempting this.
VideoAnalytics = {};

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

    // SNIP

  });
  
});
```

You can try this tracking function out in the console as follows: 

```bash
> VideoAnalytics.track('Action');
  ["_trackEvent", "Video", "Action", "http://siskel.lib.ncsu.edu/RIS/getting_a_book/getting_a_book"] 
```

Now to track the `play` and `pause` events, we can add simple event handlers like the following. While we're at it we can track whether the `ended` event is fired. This will tell us that a viewer got to the end of the video but it will not tell us that they have actually watched the whole video. We can also track the `seeked` event. When the current time is set the `seeked` event fires. It also gets triggered when a user clicks on the time rail control.

```javascript tracking video events http://jronallo.github.com/demos/html5_video/javascripts/video_analytics_events.js Source
var VideoAnalytics = {};

$(document).ready(function(){

  $('video').on('loadedmetadata', function(){

    //SNIP    

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

```

### Interpreting Simple Events ###

When looking at your analytics for these kinds of simple events, there are some things to keep in mind. The `pause` event fires just before the `ended` event (at least in Chrome and Firefox). It is unclear in the spec whether this doubling of events is correct or not. What this means, though, is that a `pause` event does not necessarily mean that someone took an action to pause the video. To tell the number of `pause` events that are real user interactions, you may have to subtract the number of `ended` events.

Note the meaning of the `ended` event. This event tells us that a viewer got to the end of the video but it will not tell us that they have actually watched the whole video. The user could have clicked the time rail or chapters (from a `<track>` polyfill) to seek ahead or used some other control on the page to get near the end, possibly skipping most of the content.

## Video Engagement ##

But just tracking these kinds of events does not give us the full picture. Do visitors watch the whole video or do they drop off or go somewhere else on your site before finishing the video? How much of the video do visitors actually watch? How far do they get through the video? Is there a particular point in the video where most users have dropped off? Are there portions of a video that are watched more often than others? Are parts skipped? What we really want to know about is video engagement. Answering these questions can help determine whether there are ways that you might make your video more engaging. 

It will take more information than just play and pause events to get at this data. We need more detailed information about how the video is being watched.

## Simplistic Video Engagement ##

Some have suggested a way to track video engagement with Google Analtyics. The basic idea is that the time of the video can be divided into equal parts. If a 100 second video is divided into 10 parts then once the video plays the 10th second it triggers a tracking event that "10%"" of the video has been played. The same if the 90th second is played, then "90%" is recorded in the tracking event. (Here is an [example of this approach](http://htmlcssjavascript.com/javascript/html5-demo-tracking-video-progress-with-google-analytics/).)

As standards like [Media Fragments](http://www.w3.org/TR/media-frags/) get implemented, it will be easier to deep link into videos similarly to how you can link to a section of a page that has an `id` attribute. So a user may begin a video in the middle depending on the URI they follow.

The current problem with these simple analytics schemes is that visitors can jump around arbitrarily through a video by clicking anywhere on the time rail. If the video has an associated chapter track then the user can also jump to a specific section of the video. Just because the second at 80% of the video has been played does not mean that 80% of the video has actually been viewed. 

## Deeper Video Engagement ##

I want more information than that the second at 80% of the video has been played. The most exact way to get at that information is by keeping track of which seconds have actually been played. Let's look at what it takes to implement some deeper analytics tracking. 

Rather than keeping a tally of discreet events on the page or faulty engagement analytics, we want to track the ranges of time within each video that have been watched during a particular visitor page view session. So the data we want to collect is the identifier for the video, an identifier for a particular visitor page view session, the current date-time of the tracker, and the ranges of time that have been watched within that session. Let's unpack each of those a bit. 

### Video Identifier ###

To aggregate all of the data about a particular video, we want to have a unique identifier for the video. We could use and munge the current video source to supply that identifier like we have above. There we just took the URL for the video and stripped off the last 3 characters (the dot and extension). In my own applications, I could do that because I can be certain that it will easily map to a unique video. 

It may be that your video is hosted somewhere else and the URL of the video file will not provide the identifier you would want. For our engagement analytics we'll change our approach and I'll add a data- attribute `data-video-id`.

```html data-video-id http://jronallo.github.com/demos/html5_video/70_analytics.html Demo
<video data-video-id="getting_a_book" controls poster="http://siskel.lib.ncsu.edu/RIS/getting_a_book/getting_a_book.png">
```

Then in our javascript (within the `engagement` object within the module VideoAnalytics) we can set the variable for the current video identifier.

```javascript videoId http://jronallo.github.com/demos/html5_video/javascripts/video_engagement_analytics.js
var current_video_id = $('video').first().data('videoId');
```

### Page View Session ###

To make sure that we are tracking a single page view we need to create a page view session. I do not want to track a bunch of other data about users. I just want to know how much of a video is watched within a particular page view. If you wanted to associate what videos a user watched you could do more server side using a cookie-based session, but I will leave that and other server-side work to the reader.

We can easily set a page view session. Every time the page is loaded, we can create a UUID with JavaScript. (The current implementation is rather naive, but is good enough to show the method.) That UUID will be sent back to the server with any data, so that the data can be updated or merged there.

Creating a timestamp for the tracking event is as simple as `new Date()`.

### TimeRanges ###

The last piece of data that we need is what parts of the video are actually watched. Luckily HTML5 Video provides a straightforward way to get at exactly which parts of a video (or audio) have been played. 

The media elements API provides a `played` property for a `video` element that returns a `TimeRanges` object. Since users can click on the time rail to jump around a video, there may be more than one range which has been played. Reload the [demo page](/demos/html5_video/70_analytics.html), and then run the following script in your console to simulate a user starting to play a video from the beginning and then jumping to near the end. 

```javascript a look at TimeRanges http://jronallo.github.com/demos/html5_video/javascripts/a_look_at_time_ranges.js Source
// This script simulates a user watching 5 seconds of video then jumpting to 100 seconds in and
// watching another 5 seconds. Then some output is logged to the console.

var video = document.getElementsByTagName('video')[0];

// start playing the video
video.play();

// play the video for 5 seconds and then...
setTimeout(function(){

    // jump to 100 seconds into the video
    video.currentTime = 100;
    setTimeout(function(){
        // after the video plays for 5 seconds more pause it
        video.pause();
        var time_ranges = video.played;

        // just log the TimeRange object itself
        console.log(['time ranges: ', time_ranges]);

        // how many time ranges are there?
        console.log(['# of time ranges', time_ranges.length]);

        // get the values for the first time range
        console.log(['1st time range', time_ranges.start(0), time_ranges.end(0)]);

        // get the values for the second time range
        console.log(['2nd time range', time_ranges.start(1), time_ranges.end(1)]);
    },5000);    
}, 5000);

``` 

Using the `currentTime` setter allows us to jump in time to a point towards the end of our example video. A `TimeRanges` object has a `length` property which returns the total number of time ranges it contains. Each time range can then be retrieved with indexing starting at zero. A `TimeRanges` object has `start` and `end` methods which must be passed the index of the time range you want. You can see that time ranges are zero based.

Here a function to turn a `TimeRanges` object into an array of objects. Each object will have the appropriate seconds value for each start and end key. 

```javascript time_ranges_to_array http://jronallo.github.com/demos/html5_video/javascripts/video_engagement_analytics.js Source
var time_ranges_to_array = function(time_ranges){
  var ranges = [];
  for (var i=0; i < time_ranges.length; i++) { 
    var range = {};
    range.start = Math.round(time_ranges.start(i)); 
    range.end   = Math.round(time_ranges.end(i)) ;
    ranges.push(range);
  }
  return ranges;
}
```

The result from this `time_ranges_to_array` function will look something like this for our "a look at TimeRanges" script above:

```javascript result of time_ranges function
[
 {start: 0,   end: 5},
 {start: 100, end: 104}
]
```

### Implementation ###

Now we have all the pieces we need in order to track time ranges. We can attach event listeners for various events to send the tracking data. To make sure that we capture most of the use we will send the data to the server every so often by listening for the `timeupdate` event. The `timeupdate` event can be triggered much more often than every second. If you're looking at our example, you'll see in the console that every time the `timeupdate` event it fired that the current time gets output to the console. There are also differences between browsers. Chrome seems to trigger the `timeupdate` event 8 times a second, while Firefox appears to only fire the event 4 times every second.

We set and increment a counter so that every N times (25 in our example) the `timeupdate` event fires, the tracking data is sent (in our case logged to the console). This prevents us from posting data to the server up to 8 times a second needlessly. Delaying by 25 `timeupdate`s may be too few, so adjust to something where you're ensuring that you're not dropping data if someone closes a tab, but you're also not sending data too frequently.

We also will listen for `pause` and `ended` events to trigger tracking data be sent. Finally, for any outbound link on the page we will listen for clicks on those links, initiate sending the tracking data, and ensure the data gets sent by including a short pause. When links are clicked JavaScript can cease execution meaning our tracking data may not be send, so the pause helps make sure that the JavaScript has enough time to execute sendint the data before taking the user to the new page.

```javascript video engagement analytics events http://jronallo.github.com/demos/html5_video/javascripts/video_engagement_analytics.js Source
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
```

The [demo](/demos/html5_video/70_analytics.html) does not POST data to a server, but just outputs the data to the console. Open up your developers tools console, start and stop the video, click around the time rail, and see what data gets created. It would be trivial for us to change this to use jQuery to POST the data.

## Interpretation ##

The result is that we can use this data to graph out engagement. Within an administrative console for one of my sites, I have embedded the video into the page along with a chart created with D3.js. As the video plays the line of the current time moves along the chart. Since I can watch the video alongside the chart, I can see exactly when visitors start to drop off. To show how it works, here's an video with dummy data:

<video controls poster="http://siskel.lib.ncsu.edu/SLI/demo/video_engagement_analytics/video_engagement_analytics.png">
  <source src="http://siskel.lib.ncsu.edu/SLI/demo/video_engagement_analytics/video_engagement_analytics.mp4" type='video/mp4;codecs="avc1.4D401E, mp4a.40.2"'/>
  <source src="http://siskel.lib.ncsu.edu/SLI/demo/video_engagement_analytics/video_engagement_analytics.webm" type='video/webm;codecs="vp8, vorbis"'/>
  <source src="http://siskel.lib.ncsu.edu/SLI/demo/video_engagement_analytics/video_engagement_analytics.ogv" type='video/ogg;codecs="theora, vorbis"'/>
</video>

## Issues ##

While this seems to work across browsers that understand the `video` element, you are likely to have a Flash fallback for older browsers or in the case that you only encode to one codec. My favorite HTML5 video polyfill with Flash fallback is [MediaElement.js](http://mediaelementjs.com/). The player has an API which allows you to work consistently across HTML5 video and Flash fallback using something similar to the standard API, but it does not implement the `played` property. (Do you know a polyfill which does implement `played` for its Flash fallback?) This means that you would have to come up with a different solution for the Flash fallback player if you receive traffic from older browsers.

What I have done in one application to work around this limitation is to duplicate the functionality of `played` and `TimeRanges`. Each time the `timeupdate` event fires, I collect the current time into a array. Every so often I send this array of seconds to the server and also clear out the array so it does not get too big. This seems to work well enough, but would likely have some performance problems.

## Conclusion ##

It is relatively simple with the HTML5 video API to hook into video events for video engagement analytics. The main problem is coming up with a solution that works on older browsers using a Flash fallback.

What other questions would you like to answer about your videos? What data would you need to answer those questions? As I launch the video site I've worked on and take a look at the analytics we're already grabbing, I may have the opportunity to expand on my work and this post. I'd be interested to hear what your use cases are for better video analytics.