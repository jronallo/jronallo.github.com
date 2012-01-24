---
layout: post
title: "Listing Published Octopress Posts"
date: 2012-01-24 08:01
comments: true
categories: [octopress]
published: true
---

In converting my blog from Wordpress to [Octopress](http://octopress.org/), I 
had a lot of old posts I was leaving unpublished. I wanted to keep them around
but don't see the need to republish them right now. I also want to be able to 
create a lot of drafts of ideas and leave them unpublished. Then whenever I'm 
ready to work on a post, they're all right there in my repository already. 

Problem is that I find it hard to read through the filenames of posts and try to
remember which have been published and which have not. So in order to see
the publication status of all my posts, I created this rake task. I just
dropped this at the end of `Rakefile` and run `rake listpub`.

<!-- more -->

When posts have `published: false` in the YAML front matter, they get no
asterisk. All other posts get an asterisk as they either have no `published` 
field and so are published
by default, or set explicitly to true with `published: true`.

The method of extracting the YAML front matter from the post with a regular
expression is taken
[from Jekyll](https://github.com/mojombo/jekyll/blob/master/lib/jekyll/convertible.rb).


```ruby
desc "List all blog posts and an asterisk if they are published"
task :listpub do |t|
  Dir.glob("#{source_dir}/#{posts_dir}/*.markdown").sort.each do |post|
    file = File.read(post)
    file =~ /^(---\s*\n.*?\n?)^(---\s*$\n?)/m
    data = YAML.load($1)
    status = data['published'] || data['published'] == nil ? '*' : ' '
    puts "#{status} #{File.basename(post)}"
  end
end

```

Here's some partial output showing two published posts and one unpublished:

```
* 2012-01-23-dpla-strawman-technical-proposal.markdown
  2012-01-23-listing-published-octopress-posts.markdown
* 2012-01-23-ruby-and-rails-using-rvm-on-a-fresh-and-updated-ubuntu-11-dot-10-install.markdown

```

What other tasks would help you manage drafts and publication workflow for your
blog?
