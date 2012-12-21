// A quick look at how TimeRanges work.
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
        var played = video.played;

        // just log the TimeRange object itself
        console.log(['played: ', played]);

        // how many time ranges are there?
        console.log(['# of time ranges', played.length]);

        // get the values for the first time range
        console.log(['1st time range', played.start(0), played.end(0)]);

        // get the values for the second time range
        console.log(['2nd time range', played.start(1), played.end(1)]);
    },5000);    
}, 5000);


