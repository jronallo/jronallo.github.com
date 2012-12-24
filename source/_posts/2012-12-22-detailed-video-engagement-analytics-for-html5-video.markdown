---
layout: post
title: "Detailed Video Engagement Analytics for HTML5 Video"
date: 2012-12-22 20:26
update: 2012-12-22 20:26
comments: true
categories: [html5, video, analytics]
sidebar: collapse
published: false
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

```javascript video event tracking function http://jronallo.github.com/demos/html5_video/javascripts/video_analytics.js Source
VideoAnalytics = {};

// Wait for the video element to be parsed before attempting this.
VideoAnalytics = {};

// Wait for the video element to be parsed before attempting this.
$(document).ready(function(){

  // Wait until the video metadata has been loaded before we try to determine the current video source.
  $('video').on('loadedmetadata', function(){

    // Simple function to chop off the file extension for the current source of the video. 
    // Probably a better way to do this would be to use a data-video-identifier attribute on the 
    // video or with a regular expression.
    VideoAnalytics.video_identifier = (function(){
      var current_source = $('video')[0].currentSrc;
      return current_source.substring(0, current_source.length - 4);
    }());

    // function that sends the actual tracking beacon
    VideoAnalytics.track = function(action) {
      // All events will be in the Video category
      var tracking_params = ['_trackEvent','Video']
      // append the event action after the event method and the event category    
      tracking_params.push(action);
      // append the video identifier as the event label
      tracking_params.push(VideoAnalytics.video_identifier);

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

```javascript tracking video events http://jronallo.github.com/demos/html5_video/javascripts/video_analytics.js Source
VideoAnalytics = {};

$(document).ready(function(){

  $('video').on('loadedmetadata', function(){

    //SNIP    

    // Track the play event.
    $('video').on('play', function(){
      VideoAnalytics.track('Play');
    });

    // Track the pause event.
    $('video').on('pause', function(){
      VideoAnalytics.track('Pause');
    });

    // Track the seeked event. This gets fired when the currentTime is set. For instance it gets
    // triggered with a click on the time rail control.
    $('video').on('seeked', function(){
      VideoAnalytics.track('Seeked');
    });

    // Track the ended event.
    $('video').on('ended', function(){
      VideoAnalytics.track('Ended');
    });

  });
  
});

```

## Video Engagement ##

But just tracking these kinds of events does not give us the full picture. Do visitors watch the whole video or do they drop off or go somewhere else on your site before finishing the video? Are there portions of a video that are watched more often than others? Are parts skipped? What we really want to know about is video engagement. Answering these questions can help determine whether there are ways that you might make your video more engaging. 

It will take more information than just play and pause events to get at this data. We need more detailed information about how the video is being watched.

## Simplistic Video Engagement ##

Some have suggested a way to track video engagement with Google Analtyics. The basic idea is that the time of the video can be divided into equal parts. If a 100 second video is divided into 10 parts then once the video plays the 10th second it triggers a tracking event that "10%"" of the video has been played. The same if the 90th second is played, then "90%" is recorded in the tracking event.

As standards like [Media Fragments](YKK) come to fruition, it will be easier to deep link into videos similarly to how you can link to a section of a page that has an `id` attribute. So a user may begin a video in the middle.

The problem with these schemes is that visitors can jump around arbitrarily through a video by clicking anywhere on the time rail. If the video has an associated chapter track then the user can also jump to a specific section of the video. Just because the second at 80% of the video has been played does not mean that 80% of the video has actually been viewed. 

## Deeper Video Engagement ##

I want more information than that the second at 80% of the video has been played. The most exact way to get at that information is by keeping track of which seconds have actually been played.

### TimeRanges ###

YKK: A little look at TimeRanges.

YKK: What other background is needed to pull this off?

### Implementation ###



Now that we've learned a bit about HTML5 video and the JS API, let's solve a real problem. Let's use the JS API to begin to answer a question we have about how our video is being used. One thing we may want to know is how much of the video do visitors actually watch? How far do they get through the video? Is there a particular point in the video where most users have dropped off? 

Having this kind of granular data could help us make better decisions about the videos we produce. Could we make our videos more engaging? Would it help to break up a video into separate videos or allow exact seeking within the video to answer more specific questions?

Google Analytics makes it easy to track many video-related events like clicks on the play or pause buttons or time rail. The same video events we listened for before (play, pause, ended, etc.) can also be used to queue [an event](YKK) to be tracked in Google Analytics. Tracking video engagement, though, is something that I have only been able to do outside of Google Analytics.

Rather than keeping a tally of discreet events on the page, we want to track the ranges of time within each video that have been watched during a particular visitor page view session. So the data we want to collect is the identifier for the video, an identifier for a particular visitor page view session, the current date-time of the tracker, and the ranges of time that have been watched within that session. Let's unpack each of those a bit.

To aggregate all of the data about a particular video, we want to have a unique identifier for the video. We could use and munge the current video source to supply that identifier. In my own applications, I do that because I can be certain that it will easily map to a unique video. It may be that your video is hosted somewhere else and the URL of the video file will not provide the identifier you would want. To make our example code simple we will add a data- attribute `data-video-id`.

```
<video controls data-video-id="getting_a_book">

```

To make sure that we are tracking a single page view we need to create a page view session. Every time the page is loaded, we can create a UUID with JavaScript. (The current implementation is rather naive, but is good enough to show the method.) Creating the timestamp for the tracking event is as simple as `new Date()`.

Now all we need to do is get the time ranges that have been played. The media elements API provides a `played` property for a `video` element that returns a `TimeRanges` object. Since users can click on the time rail to jump around a video, there may be more than one range which has been played. Run the following script in your console to simulate a user starting to play a video from the beginning and then jumping to near the end. Using the `currentTime` setter allows us to jump in time to a point towards the end of our example video.

```javascript
YKK

``` 

[a look at time ranges](a_look_at_time_ranges.js)

Now we have all the pieces we need in order to track time ranges. We can attach event listeners for various events to send the tracking data. To make sure that we capture most of the use we will send the data to the server every so often by listening for the `timeupdate` event. We also will listen for `pause` and `ended` events to trigger tracking data be sent. Finally, for any outbound link on the page we will listen for clicks on those links, initiate sending the tracking data, and ensure it gets sent by including a short pause.

The [demo](analytics.html) does not POST data to a server, but just outputs the data to the console. Open up your developers tools console, start and stop the video, click around the time rail, and see what data gets created. It would be trivial for us to change this to use jQuery to POST the data.

[link to video engagement analytics](video_engagement_analytics.js)

The result is that we can use this data to graph out engagement. Within an administrative console for one site, I have embedded the video into the page along with a chart created with D3.js. As the video plays the line of the current time moves along the chart. Since I can watch the video alongside the chart, I can see exactly when visitors start to drop off.

[YKK Include video of the video engagement example from SLI]

![image from SLI of video engagement]()

## Interpretation ##

YKK: At least in Chrome the `pause` event fires just before the `ended` event.

YKK: the ended event is fired. This will tell us that a viewer got to the end of the video but it will not tell us that they have actually watched the whole video.