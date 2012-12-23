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