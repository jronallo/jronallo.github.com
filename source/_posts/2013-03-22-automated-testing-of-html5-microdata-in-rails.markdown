---
layout: post
title: "Automated Testing of HTML5 Microdata in Rails"
date: 2013-03-22 22:50
comments: true
categories: [html5, microdata, rails, ruby]
published: true
sidebar: collapse
---

While [HTML5 Microdata](http://www.whatwg.org/specs/web-apps/current-work/multipage/microdata.html) has the advantage of using visible markup, it can still be invisible enough that when your app changes your Microdata goes out of sync. Testing your Microdata is important for ensuring your Microdata parses correctly and you're communicating to the search engines what you think you are. I'll show you a simple example of test-first addition of Microdata in a Rails project. 

Spoiler: It is super easy using the [microdata gem](https://github.com/jronallo/microdata).

<!-- more -->

## Original HTML

Here's the simple text that you might find on an about page that we want to mark up with Microdata and schema.org:

<hr>
<p>
  <a href="http://twitter.com/ronallo">Jason Ronallo</a> is the Associate Head of Digital Library Initiatives at <a href="http://lib.ncsu.edu">NCSU Libraries</a>. 
</p>
<hr>

Here's what the HTML looks like. The indented formatting is just to make it more readable.

```html
<!doctype html>
<html lang=en>
  <head>
    <meta charset=utf-8>
    <title>blah</title>
  </head>
  <body>
    <p>
      <a href="http://twitter.com/ronallo">Jason Ronallo</a> is the 
      Associate Head of Digital Library Initiatives at 
      <a href="http://lib.ncsu.edu">NCSU Libraries</a> 
    </p>
  </body>
</html>
``` 

We have a person's name, a job title, and the organization the person is affiliated with.

## Test Preparation

We'll start with writing some tests for what we want the resulting data to look like. I'll assume that you are already using Capybara for your integration tests. To get set up all we have to do is add the [microdata](https://github.com/jronallo/microdata) gem to our Gemfile for the test environment and `bundle install`.

```ruby
gem 'microdata', :group => :test
```

## Tests

We'll write these tests as integration tests using test-unit. To generate a test run:

```bash
bundle exec rails g integration_test microdata
```

Open up test/integration/microdata_test.rb and add your tests for how you'd expect the Microdata to parse:

``` ruby
class MicrodataTest < ActionDispatch::IntegrationTest

  setup do 
    path = examples_path
    visit path
    @items = Microdata::Document.new(page.body, path).extract_items
  end

  test "the top level item is a schema.org/Person" do
    assert_equal ['http://schema.org/Person'], @items.first.type
  end

  test "the Person should have a name, url, and job title" do
    person = @items.first
    assert_equal ['Jason Ronallo'], person.properties['name']
    assert_equal ['http://twitter.com/ronallo'], person.properties['url']
    assert_equal ['Associate Head of Digital Library Initiatives'], person.properties['jobTitle']
  end

  test "the Person's affiliation" do 
    affiliation = @items.first.properties['affiliation'].first
    assert affiliation
    assert_equal ['http://schema.org/Library'], affiliation.type
    assert_equal ['NCSU Libraries'], affiliation.properties['name']
    assert_equal ['http://lib.ncsu.edu'], affiliation.properties['url']
  end
end

```

Run the tests. OK, these tests fail as they should.

## HTML with Microdata

Here's how we'll update the HTML for the tests to pass.

```html
<!doctype html>
<html lang=en>
  <head>
    <meta charset=utf-8>
    <title>blah</title>
  </head>
  <body>
    <p>
      <span itemscope itemtype="http://schema.org/Person">
        <a itemprop="url" href="http://twitter.com/ronallo">
          <span itemprop="name">Jason Ronallo</span>
        </a> is the 
        <span itemprop="jobTitle">Associate Head of Digital Library Initiatives</span> at 
        <span itemprop="affiliation" itemscope itemtype="http://schema.org/Library">
          <span itemprop="name">
            <a itemprop="url" href="http://lib.ncsu.edu">NCSU Libraries</a>
          </span>
        </span>.
      </span>
    </p>
  </body>
</html>
``` 

And it doesn't look any different, but here's it is:

<hr>
<p>
  <span itemscope itemtype="http://schema.org/Person">
    <a itemprop="url" href="http://twitter.com/ronallo"><span itemprop="name">Jason Ronallo</span></a> is the 
    <span itemprop="jobTitle">Associate Head of Digital Library Initiatives</span> at 
    <span itemprop="affiliation" itemscope itemtype="http://schema.org/Library"><span itemprop="name"><a itemprop="url" href="http://lib.ncsu.edu">NCSU Libraries</a></span></span>.
  </span>
</p>
<hr>

Here's what this looks like parsed to JSON:

```javascript
{
  "items": [
    {
      "type": [
        "http://schema.org/Person"
      ],
      "properties": {
        "url": [
          "http://twitter.com/ronallo"
        ],
        "name": [
          "Jason Ronallo"
        ],
        "jobTitle": [
          "Associate Head of Digital Library Initiatives"
        ],
        "affiliation": [
          {
            "type": [
              "http://schema.org/Library"
            ],
            "properties": {
              "name": [
                "NCSU Libraries"
              ],
              "url": [
                "http://lib.ncsu.edu"
              ]
            }
          }
        ]
      }
    }
  ]
}

```

Here's the full [Microdata test example repo](https://github.com/jronallo/microdata_test_example) if you want to look closer.

## Thanks

Thank you to Lawrence Woodman for making the [mida](https://github.com/LawrenceWoodman/mida) gem available under a permissive license which allowed me to extract out just the bits I was interested in for the [microdata](https://github.com/jronallo/microdata) gem. If you need vocabulary awareness, then mida might be better for you.