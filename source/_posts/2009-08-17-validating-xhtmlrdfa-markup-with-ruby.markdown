---
date: '2009-08-17 08:56:49'
layout: post
slug: validating-xhtmlrdfa-markup-with-ruby
status: publish
title: validating XHTML+RDFa markup with Ruby
wordpress_id: '18'
categories:
- ruby
- rubygems
- testing
tags:
- rdfa
- validation
- xhtml
published: false
---

I'm working on a project right now where I'm running [Cucumber](http://cukes.info/) tests. As part of my Cucumber features I'm checking the validity of the XHTML markup with a [special step definition](http://caiustheory.com/adding-xhtml-output-validation-to-cucumber-stories) sprinkled throughout my scenarios. As part of that the [markup_validity gem](http://github.com/tenderlove/markup_validity/tree/master) is included to perform the actual validation. When I started adding [RDFa](http://en.wikipedia.org/wiki/RDFa) to my pages the markup of course no longer validated. I had the choice of either forgoing validating as part of my Cucumber tests and testing markup validity some other way or adding RDFa support to markup_validity. It was simple enough to fork the markup_validity github project, add support for [XHTML+RDFa](http://www.w3.org/TR/rdfa-syntax/#a_xhtmlrdfa_dtd), and get my tests passing again. After a few corrections, Aaron Patterson (of Nokogiri fame) accepted my changes into trunk, re-released the gem and added me as a collaborator on the github project.

If you need to validate your XHTML+RDFa markup as part of your test/unit or rspec tests, please give it a try and let me know if it works for you:

    
    gem install markup_validity
