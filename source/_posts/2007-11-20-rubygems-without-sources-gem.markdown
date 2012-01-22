---
date: '2007-11-20 23:47:22'
layout: post
slug: rubygems-without-sources-gem
status: publish
title: rubygems without sources gem
wordpress_id: '6'
categories:
- ruby
- rubygems
published: false
---

If you uninstall the sources gem that rubygems relies on you'll get an awful error if you try to run gem. And since sources-0.0.1 is probably best installed as a gem well... you get the picture.
If you accidentally uninstall the sources gem, create a file named sources.rb and place the following inside:
`
module Gem
@sources = ["http://gems.rubyforge.org"]
def self.sources
@sources
end
end
`
I was then able to reinstall the sources gem and be back in business.
