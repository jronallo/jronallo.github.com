---
layout: post
title: "Using the webvtt Ruby gem to display subtitles on the page"
date: 2013-02-09 13:12
comments: true
categories: [accessibility, seo, html5, video, audio]
published: false
---

Using the [webvtt](https://github.com/jronallo/webvtt) gem, you can display on the page the [WebVTT](http://dev.w3.org/html5/webvtt/) subtitles, captions, or chapters you've created for HTML5 video or audio. If you're already creating WebVTT files for your media, you ought to get the most use out of it as you can. I'll show you how.

<!-- more -->

## Why include subtitles on the page?

There are a variety of reasons why you might want to include the subtitles or captions on a page. Some of the reasons are based on uncertainty whether robots are currently smart enough to be crawling the content behind track elements. (If anyone knows whether this is happening, I'd love to know! And if they're doing voice recognition of non-YouTube videos they find on the Web, that'd be very interesting as well!) Other reasons for wanting to put the WebVTT content on the page is to add new features which may work for your use case regardless of what the search engines are currently doing.

Media often has very little metadata to support discoverability of the content. A title and short description alone might not include the details someone is looking for. For instance a name dropped in the middle of a video might not be the main subject of the content, but it could be the important detail to some user. That user might otherwise not find your content through a search engine because the detail was hidden behind the non-indexable content of the media. Including the text from WebVTT on the page allows that text to be crawled and indexed to improve access points to media. 

Also consider how reading can be faster than watching time-based media. Instead of having to watch some of a video to make decisions about whether to continue on with it, scanning a transcript can give a much quicker idea of whether the media suits the user. It also would allow for searching through the content and jumping to interesting sections. This and other non-SEO use cases could be met with client-side parsing, but there still might be reasons why you'd want to do this processing server-side.

You might also want to cover the second part of SEO by providing users with a rich discovery experience on your own site. You could have an indexing script which can parse the file for indexing in a full-text search server. Every WebVTT file begins with the string "WEBVTT". You don't want every video or audio file you index to come up for a search for "WEBVTT" and there are other pieces like the cue timings that you'd want to remove before indexing. Depending on how your WebVTT file has been phrased and what full-text search engine you're using, you'd probably want to concatenate the text. Otherwise phrase queries might not work as intended, since sentences often must span cues in captioning. (OK, this paragraph isn't about why you'd want the content on the page, but it is a good reason to have this kind of library available for server-side processing.)

At least one video polyfill includes the [ability to auto-translate tracks](http://mediaelementjs.com/examples/?name=translation). I expect this feature would come to other polyfills and browsers in the future. While we're waiting for that to happen, including the text on the page allows for normal google translate functionality to make the video accessible.

So now that we have some reasons to need a library for parsing WebVTT files, let's take a look at how it works.

## Simple webvtt

Before showing how to display caption text on the page, let's get started by showing how you could concatenate all of the text into a single string for indexing. You can install the webvtt gem with:

```
gem install webvtt
```

Here's a short sample WebVTT file we will use for this example.

```
WEBVTT

1
00:00:03.000 --> 00:00:08.616
Once you've used the library's online 
catalog to identify a book you want, 
you have to go get the book.

2
00:00:08.616 --> 00:00:13.308
On the bottom of a book's catalog 
page, there's information about the 
<b>location</b> of the book.
```

For more on the format used here and the other features of this file format, [see the WebVTT specification](http://dev.w3.org/html5/webvtt/).

We'll just use [pry](YKK) for now.

```bash
$ pry
> require 'webvtt'
> vtt = Webvtt::File.new('path/to/file.vtt')
> vtt_text_lines = vtt.cues.map{|cue| cue.text}
> full_text = vtt_text_lines.join(' ')
```

Since some cues can have markup to allow for styling, you'll want to strip those out as well:

```bash
> clean_full_text = Nokogiri::HTML(full_text).text
```

Then you can use the `clean_full_text` variable to index the text in Solr or elasticsearch.

We can also look at the cues in the WebVTT file:

```bash
> vtt.cues
=> [#<Webvtt::Cue:0x00000001512cb8
  @end="00:00:03.000",
  @identifier="1",
  @settings="D:vertical A:start",
  @start="00:00:00",
  @text="I grew up in Eastern North Carolina, <b>Edgecombe</b> County">,
 #<Webvtt::Cue:0x0000000151d028
  @end="00:00:07.800",
  @identifier="2",
  @settings="A:start",
  @start="00:00:03.300",
  @text="on a tobacco and dairy farm outside of Tarboro.">]
```

Mainly what we're interested in are the text, start, and end attributes of each cue.

## Adding track to page

Let's assume that we have a Rails application


YKK YKK

- media fragments