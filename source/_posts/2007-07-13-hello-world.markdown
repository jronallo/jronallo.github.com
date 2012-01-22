---
date: '2007-07-13 13:48:25'
layout: post
slug: hello-world
status: publish
title: Rube Goldberg machines
wordpress_id: '1'
published: false
---

I was trying to tackle a little problem. There is the right way to do it, and then a way that might just work.
[ruby-marc](http://www.textualize.com/ruby_marc) doesn't do character conversion from MARC-8 to UTF-8. This is a problem as most MARC records are still trapped in MARC-8 character encoding. It's particularly a problem for something I'd like to add to [my copy cataloging script](http://zcc.rubyforge.org).

Right now I use [ruby-zoom](http://ruby-zoom.rubyforge.org/) to grab records from Z39.50 targets. These z-targets, even if they store their information as UTF-8, still usually present their records to the world as MARC-8 encoded records.  In normal workflow this isn't a problem. As a C-binding to ZOOM, ruby-zoom does character conversion through YAZ. I can grab a record and, besides checking leader byte 9 to double check the current character set, ruby-zoom does the work of conversion.

But what if I want to read in a MARC-8 encoded record from file using ruby-marc and convert it to UTF-8? I'm outta luck. And as part of my script I'd like to be able to do just that. I'd then be able to maintain the same workflow: accept records, run through a macro, edit subfields, and create a csv file for labelmaking. And there's no straightforward way I've found to move a ruby-marc record object into a ruby-zoom record object to do the conversion.

So I thought what if I could get the record from file into ruby-zoom first, do the conversion and then accept the record as a marc object? So in order to mock something up really quick I created a fake SRU server with WEBrick that always responded with the contents of the file supplied on the command line. The file was in MARC-8 and to work with SRU it was converted to MARCXML--except with the MARC-8 character encoding still. Very bad idea I'm sure to have MARC-8 XML.

I wanted to put the server into a thread that would stop when the program terminated and then in the same script slurp up the record using zoom, convert to UTF-8 and then move the record into a ruby-marc record object. For some reason I couldn't do both things from the same script.

So then I wrote another script that could use SRU in zoom to grab the awful MARC-8 MARCXML record, do character conversion and move it over to a marc record. Even if I did a system call from the first script to this other script it failed. So I opened up another terminal to run the slurping script.

In the end I got it working. Who knows if the character encoding on it would have been any good. The main problem was how slow it was and how I needed to use two different scripts to get it to work. I learned a lot about SRU and WEBrick, but in the end it was a Rube Goldberg machine.

Soon I hope to share my current idea that's forming on how to solve this problem for [ZCC](http://zcc.rubyforge.org). Let's hope it doesn't end up the same mess as this one.
