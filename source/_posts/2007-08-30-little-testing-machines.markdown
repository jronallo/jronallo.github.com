---
date: '2007-08-30 14:01:20'
layout: post
slug: little-testing-machines
status: publish
title: little testing machines
wordpress_id: '4'
categories:
- ruby
- testing
- xisbn
published: false
---

I've been updating the [xisbn rubygem](http://rubyforge.org/projects/xisbn/) to use the new api. I've got a little project where I could use some of the metadata that can now be returned. Ed Summers let me go off on my own experimental branch (and I see now, added me to the project--thanks, Ed).

I like what I've done with the first draft. I don't know if it is what most rubyists would call beautiful code but it works. And it just doesn't work--it passes tests. This is the first time I've written unit tests as I've gone along. I've written tests for already existing code and that was good, but write a method, test, repeat probably made a better initial product.

I'm pleasantly surprised at how much faster I was able to get this done because I wrote tests. No guessing that something works or writing adhoc little programs to test it.

Often I'd write a test and inadvertently write it wrong, so the test failed. For instance in one case I need an array to be passed in and instead I used a string. OK, go back and write some duck typing and raise an exception for that case then write a test to make sure it works. Now I wrote the method and got it wrong, so certainly someone approaching the library fresh will make similar mistakes and it's good in this case that there's a helpful error to direct them. So every mistake I make can be an opportunity for another test. Makes me more calm about making mistakes.

There's more work I need to do on xisbn for sure and some little convenience methods I'd like to add as well as documentation, but I'm happy with what I've done so far and what I learned about testing.

I can also imagine that this won't be the last change OCLC makes to their xisbn service, so having tests in place should be able to tell me right away what needs to be rewritten.

This was also a test of sorts for me. xisbn is the first [little api](http://xisbn.worldcat.org/xisbnadmin/doc/api.htm) I've taken a look at and tried to translate into code. I think the documentation was a great help especially in writing the tests.
