---
layout: post
title: "HTML and PDF Slideshows with DZSlides, Pandoc, Guard, Capybara Webkit, and a little Ruby"
date: 2013-07-21 17:27
comments: true
categories: 
published: false
sidebar: collapse
---

I've used different HTML slideshow tools in the past, but was never satisfied with them. I didn't like to have to run a server just for a slideshow. I don't like when a slideshow requires external dependencies that make it difficult to share the slides. I want to write my slides in a single Markdown file. As a backup I always like to have my slides available as a PDF. 

For my latest presentation I came up with workflow that I'm satisfied with. Once all the little pieces are stitched together it worked really well for me.

<!-- more -->

I had looked at DZSlides before but had always passed it by after seeing what a default slide deck looked like. It wasn't as flashy as others and doesn't immediately have all the same features readily available. I looked at it again because I liked the idea that it is a single file template. I also saw that Pandoc will convert Markdown into a DZSlides slideshow. YKK link to Pandoc DZSlides documentation

To convert my Markdown to DZSlides it was as easy as:

```bash
pandoc -w dzslides presentation.md > presentation.html
```

What is even better is that Pandoc has settings to embed images and any external files as data URIs within the HTML. So this allows me to maintain a single Markdown file share my presentation as a single HTML file, including images and all--no external dependencies.

```bash
pandoc -w dzslides --standalone --self-contained presentation.md > presentation.html
```

The DZSlides default template is rather plain, so you'll likely want to make some stylistic changes to the CSS. You may also want to add some more JavaScript as part of your presentation or to add features to the slides. For instance I wanted to add a simple way to toggle my speaker notes from showing. The way I do this is to add in any external styles or scripts directly before the closing body tag after Pandoc does its processing. Here's the simple script I wrote to do this:

```ruby
#! /usr/bin/env ruby

# Converts a markdown file into a DZslides presentation. Pandoc must be installed.
# Read in the given CSS file and insert it between style tags just before the close of the body tag.

css    = File.read('styles.css')
script = File.read('scripts.js')

`pandoc -w dzslides --standalone --self-contained presentation.md > presentation.html`

presentation = File.read('presentation.html')
style = "<style>#{css}</style>"
scripts = "<script>#{script}</script>"
presentation.sub!('</body>', "#{style}#{scripts}</body>")

File.open('presentation.html', 'w') do |fh|
  fh.puts presentation
end
```

Now what I wanted was for this script to run any time the Markdown file changed. I used Guard to watch the files and set off the script to convert the Markdown to slides. While I was at it I could also reload the slides in my browser. One trick with guard-livereload is to allow it to watch local files so that you do not have to have it behind a server. Here's my Guardfile:

```ruby
guard 'livereload' do
  watch("presentation.html")
end


guard :shell do
  # If any of these change run the script to build presentation.html
  watch('presentation.md') {`./markdown_to_slides.rb`}
  watch('styles.css') {`./markdown_to_slides.rb`}
  watch('scripts.js') {`./markdown_to_slides.rb`}
  watch('markdown_to_slides.rb') {`./markdown_to_slides.rb`}
end
```

Now I have a nice automated way to build my slides, continue to work in Markdown, and have a single file as a result.

The last piece I needed was a way to convert the slideshow into a PDF as a backup. I never know what kind of equipment will be set up or whether the browser will be recent enough to work well with the HTML slides. In any case it makes me feel more comfortable knowing I can fall back to the PDF if needs be. Also some slide deck services will accept a PDF but won't take an HTML file.

In order to create the PDF I wrote a simple ruby script using capybara-webkit to drive a headless browser. If you aren't able to install the dependencies for capybara-webkit you might try some of the other drivers. I did not have luck with the resulting images from selenium. I then used the DZSlides JavaScript API to advance the slides. I do a simple count of how many times to advance based on the number of sections. If you have incremental slides this script would need to be adjusted to work for you.

The Webkit driver is used to take a snapshot of each slide, save it to a screenshots directory, and then ImageMagick's convert is used to turn the PNGs into a PDF. You could just as well use other tools to stitch the PNGs together into a PDF. The quality of the resulting PDF isn't great, but it is good enough. Also the capybara-webkit browser does not evaluate @font-face so the fonts will be plain.

```ruby
#! /usr/bin/env ruby

# dzslides2pdf.rb
# dzslides2pdf.rb http://localhost/presentation_root presentation.html

require 'capybara/dsl'
require 'capybara-webkit'
# require 'capybara/poltergeist'
require 'fileutils'
include Capybara::DSL

base_url = ARGV[0] || exit
presentation_name = ARGV[1] || 'presentation.html'

# temporary file for screenshot
FileUtils.mkdir('./screenshots') unless File.exist?('./screenshots')

Capybara.configure do |config|
  config.run_server = false
  config.default_driver
  config.current_driver = :webkit # :poltergeist
  config.app = "fake app name"
  config.app_host = base_url
end

visit '/presentation.html' # visit the first page

# change the size of the window
if Capybara.current_driver == :webkit
  page.driver.resize_window(1024,768)
end

sleep 3 # Allow the page to render correctly
page.save_screenshot("./screenshots/screenshot_000.png", width: 1024, height: 768) # take screenshot of first page

# calculate the number of slides in the deck
slide_count = page.body.scan(%r{slide level1}).size
puts slide_count

(slide_count - 1).times do |time|
  slide_number = time + 1
  keypress_script = "Dz.forward();" # dzslides script for going to next slide
  page.execute_script(keypress_script) # run the script to transition to next slide
  sleep 3 # wait for the slide to fully transition
  # screenshot_and_save_page # take a screenshot
  page.save_screenshot("./screenshots/screenshot_#{slide_number.to_s.rjust(3,'0')}.png", width: 1024, height: 768)
  print "#{slide_number}. "
end

puts `convert screenshots/*png presentation.pdf`

FileUtils.rm_r('screenshots')

```