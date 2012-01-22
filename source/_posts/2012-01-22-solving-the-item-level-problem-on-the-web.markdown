---
layout: post
title: "Solving the Item-Level Problem on the Web2"
date: 2012-01-22 13:00
comments: true
categories: 
published: false
---

Digital Collections Services Using Web Crawls
---------------------------------------------

Digital libraries have attempted various aggregations of the content that they 
already make accessible on the open web. The approaches to aggregating content 
that have been taken in the past have relied on hosting institutions to provide 
their metadata in new ways and support additional infrastructure and workflows. 
An alternative approach to creating aggregations is to perform targeted crawls 
and reuse the content on the pages. The problem with the crawler approach 
dentifying items in the collection as opposed to other pages. This document 
presents a few possibilities for how to identify items.


If you know of prior work with similar critiques and suggested solutions, please 
let me know.

This document was initially written in support of a 
[DPLA Technical Strawman Proposal](YKK). 

Problems with technical approaches taken so far to achieve aggregations
-----------------------------------------------------------------------

The approaches taken to achieve aggregations of digital collections have had 
problems for those who want to be a part of such aggregations. These problems 
fall into the categories of separate standards, separate infrastructure, and 
metadata dumb-down. 


A common approach can be found in aggregations which rely on a OAI-PMH gateway 
for harvesting item-level metadata about collections. The primary way in which 
institutions make their resources available is on the web. Great effort is 
expended to make web pages that are optimized for search engines and usable
and attractive for users. This is done through use of common, ubiquitous web 
standards shared by many developers throughout the world. 


In order for collections to take part in an OAI-PMH enabled aggregation, 
institutions which host digital collections must expose their information 
through special XML rather than HTML. The different standards and tools are a 
barrier to entry. An OAI-PMH gateway is another separate service which needs to 
be maintained in addition to the web site. The effort for providing services 
and harmonizing data can be pushed down to the source collections. It takes 
extra effort on the part of institutions which are already squeezed. There are 
maintenance costs to keeping these services up and in sync with the data which 
is exposed through the website. New aggregators would do well to investigate 
the problems encountered by previous aggregations using this kind of approach 
like the DLF Aquifer.


Metadata dumb-down is where metadata goes through a transformation which 
decreases the level of precision of metadata. It has been a valuable strategy 
to harmonizing metadata across institutions. The problem is that many 
institutions have rich, specialized metadata that when dumbed-down loses much 
of its value. This rich content is often exposed on collection websites but 
cannot make it through the transformation to the shared metadata schema. In 
order to create the powerful aggregations that we want, we need to look for 
new ways to leverage more of the rich metadata our institutions have invested in.

Crawling for Data
-----------------

Instead of relying on separate standards or infrastructure to provide an 
aggregation, it is possible to crawl websites instead. This significantly 
lowers the barrier for institutions to participate in an aggregation as it 
relies on the existing web sites of digital collections. When a robot crawls 
a web site, it may follow all of the links on a page. Pages like browse, search, 
about, and contact pages can be crawled along with the pages that describe 
individual digital objects. For many kinds of search, an index of all of that 
crawled content could be useful. 


Some aggregations, though, prefer to only expose item-level metadata including 
small surrogates like thumbnails. Crawling digital collections is not 
incompatible with being able to identify individual items in a digital 
collection. There are relatively simple solutions for identifying items which 
could cover many of the digital collections that already exist on the web. 


Even if you are able to identify pages that describe individual items, there 
is still the problem of how to extract useful information to allow for 
functionality like faceted search interfaces. Until recently search engines 
have had to be content with using some HTML semantics (<ol> means an ordered 
list) along with natural language processing in order to discover the core 
content and meaning of pages on the web. These approaches can go very far in 
extracting meaning from the unstructured data on a page, but they have their 
limits. 


Recently there have been renewed efforts to create simple standards for 
embedding data in HTML. These allow search engines to extract data from the 
page and make sense of it. While these efforts so far have been targeted 
toward the use cases of search engines and commercial organization, there are 
possibilities for the cultural heritage sector to make use of these same 
technologies. By digital collections using hidden markup embedded in HTML 
the crawler approach could also have access to the rich content that is 
already accessible in a form which would enable more interesting interfaces 
for aggregations.


Following sections will make the case for how this could be accomplished.


### Collection Profiles

The first problem encountered in using crawlers to create item-level 
aggregations is curatorial. It is infeasible for most institutions to crawl 
the whole web looking for appropriate digital collections content. Instead 
there needs to be a store of metadata about digital collections to know what 
is accessible and where to find it. Such a system can store metadata about 
collections that enable crawling and other services. 


Collection Profiles are a compilation of metadata about digital collections on 
the open web. The other solutions set out below could use such a metadata 
store, though the approaches themselves do not rely on it. We have done prior 
work in setting out what a system for compiling metadata about digital 
collections might look like and how it might function. For more information 
on this work see the documentation for the Collection Achievements and 
Profiles System:

[http://go.ncsu.edu/dplacaps](http://go.ncsu.edu/dplacaps)


Possible Solutions to the Item-Level Problem
--------------------------------------------

Below are different solutions for being able to discover item-level pages and 
make the best use of them.


### Identifying Item Pages
The first problem is determining which pages in a crawl of a site are 
item-level pages rather than search or browse pages. 

#### URL Template
The URLs for item-level pages often have a standard pattern on a single site. 
Knowing the pattern would allow a system to only use those crawled URLs which 
fit the pattern to be included in an search aggregation. For example, it would 
be simple to determine that URLs of this pattern are item-level:


http://example.org/items/asdf
http://example.edu/items?id=asdf


While these are not:


http://example.org/
http://example.org/items
http://example.org/about


We could create templates for those URLs which are about individual items 
something like this:


http://example.org/items/{identifier}
http://example.edu/items?id={identifier}


These URL templates could be stored with a centralized Collection Profile or 
made available through metadata in the head of web pages. This is a simple, 
low-cost solution that could work for many digital collections sites.


This is a pattern inspired by [OpenSearch](http://www.opensearch.org/).

#### Meta extension

A site which can add content to the head of the HTML on item pages could add a 
meta element with a particular name and a value specifying that the page is an 
item page. The HTML5 specification has a way to officially [extend the values](http://wiki.whatwg.org/wiki/MetaExtensions) 
allowed for the name attribute to meta.


The problem with this approach is that consumers would have to know to look 
for this particular extension.

#### Sitemaps
The [Sitemap Protocol](http://www.sitemaps.org/) is a simple standard to allow 
crawlers to see a list of 
the pages that a site suggests could be crawled. In most cases a site will only 
want to expose the most important pages. Item-level pages would be included, 
while search pages or pages with duplicate content could be excluded (though 
they still could be crawled by search engines).


Many sites are already publishing sitemaps, making them discoverable through 
their robots.txt, and sending them to search engines. There are common tools 
for creating sitemaps based on existing sites. 


An aggregation could specify that the sitemap provided to their crawler should 
only contain item-level URLs. Since this is something that many sites are 
already doing, it could be a low-cost way for many digital collections to 
give an indication as to what pages are item-level.

### Extracting Meaning

Once item-level pages are identified, it is possible to use the page to 
communicate the meaning and metadata associated with the resource.


#### Links to Alternate Representations
One mechanism which has been available for a long time is the ability to add 
links to alternative representations of resources in the head of the HTML. For 
instance, a page which describes a book could advertise that an [RIS](http://en.wikipedia.org/wiki/RIS_(file_format)) 
formatted representation is available.


    <link rel="alternate" type="application/x-research-info-systems" 
      href="/search?q=cartoons&format=ris" />


The metadata in the alternative representation could then be parsed and indexed.

A problems with this approach is that the alternative representation could go 
out of sync with the public-facing HTML or the API could be neglected. 
Nevertheless this approach could be a bridge between a specialized API and a 
crawl-centered approach.

#### Meta head content

Digital collections may already make the structured data of their documents 
available by exposing Dublin Core terms through meta elements in the head of 
the HTML.

#### Semantic HTML Markup
Semantic markup is a promising future direction for digital collections 
aggregators to be able to extract richer metadata out of the visible content 
on web pages. 


Semantic markup is the use within HTML of additional, hidden markup and 
vocabularies to more fully express the meaning of the content of the page. 
Cultural heritage organizations often have detailed metadata about the 
digital and physical objects they curate. Digital collections metadata are 
often stored in relational databases with rich schema. When they currently 
expose their metadata through the web, search engines for the most part get 
plain text and need to attempt to make sense of the page with natural language 
processing. 


Semantic markup would allow cultural heritage organizations to expose their 
metadata in a way that preserves more of the intention and meaning. Rather 
than dumb-down the metadata to Dublin Core before being used by an aggregator, 
consumers of structured data could utilize something much closer to the 
intention of the producer. It also allows organizations to expose this 
structured data without having the burden of maintaining a separate, little 
used service. Since effort is already being put into the website, it allows 
organizations to leverage that representation of the data which they already 
make available.


Producers of digital collections only need to expose to the public one version 
of the metadata they have. Everyone wants to have web pages for their digital 
collections. The semantic HTML enables both human users and machines to access 
the same data and understand it. Relying on collections to have metadata 
gateways or APIs to expose alternative representations of their data can be 
burdensome. It adds greater maintenance costs for making the data available. 
Having more than one public representation of the data leads to the less public 
one becoming unmaintained and getting stale or out of sync.


[Microformats](http://microformats.org/) and [RDFa](http://www.w3.org/TR/xhtml-rdfa-primer/) 
syntaxes have allowed for making embedded, structured 
data available on the web through HTML, for a while and have existing communities 
of practice, but are sometimes difficult to implement. The newer standard 
[HTML5 Microdata](http://developers.whatwg.org/links.html#microdata) 
has learned from previous efforts and attempts to be simpler for page authors. 
[RDFa Lite](http://www.w3.org/TR/rdfa-lite/) is a profile of RDFa which tries 
to simplify the RDFa syntax similar to Microdata.


These syntaxes are used in combination with a vocabulary to make meaning. In 
2011 the big search engines announced the [schema.org](http://schema.org/) 
vocabulary and support 
for Microdata. When the search engines make an announcement it gets the 
attention of webmasters. This means that many webmasters will be applying 
Microdata and schema.org. The tools and ecosystem will be growing. Already 
many content management systems are providing a way to implement this kind of 
markup.


There are simple to complex ways in which semantic markup could be implemented 
to better support aggregations through crawling. For instance, it is simple in 
Microdata using schema.org to specify that a particular page is an 
[item-level page](http://schema.org/ItemPage). 
Even this amount of information would allow 
an aggregator to sort item-level pages from others. Layered on top of that, 
digital collections sites could embed a whole host of other types of data on 
their pages that could be extracted to create new tools and more powerful 
search interfaces.


This would allow aggregators, search engines, and others to do more interesting 
things with the pages of resources that collections already make accessible. 
This broad benefit for collection producers could encourage more involvement 
from within and outside the cultural heritage community. So while benefiting 
digital collections through the aggregation this would also benefit them on 
the open web.


Semantic HTML markup and relevant vocabularies is also an area where cultural 
heritage organizations could still have input on the web. While the predominant 
vocabularies at use now meet the needs of e-commerce, they could be improved 
and expanded to better fit cultural heritage materials. Using a common, 
standard, widely-accepted, and widely-consumed web vocabulary for description 
of cultural heritage materials would have multiplier effects for these 
collections. Aggregators could be a strong force for spurring creation of web 
vocabularies which better fit our data models and the use cases we want to 
enable. Through using common web standards, aggregators could also encourage 
consumption of this data at scale in ways that have until now been impossible.

Conclusion
----------

Creating aggregations through crawling can lessen the burden on institutions 
that want to make their collections more discoverable. With just a little more 
effort, the crawler approach to aggregations can still be narrowed to item-level 
resources. With a bit more work, collections can implement semantic markup to 
make data available on their pages, then rich semantic data can be extracted 
from pages for more powerful aggregations. All of these web-centered approaches 
to the item-level problem benefit digital collections broadly on the web as 
well as aggregators, search engines, and developers.


At this point an aggregator may need to use some of the existing infrastructure 
distributed digital collections have in place for exposing item-level resources,
but the nudge of standards ought to be in the direction of doing this in the 
future in this more web-centric way. There are possibilities for merging the 
HTML and alternative (e.g. XML) versions for indexing. While a current 
implementation of an aggregation is likely to use niche protocols like OAI-PMH 
to include some collections, these approaches should be deprecated. 


This work is copyright Jason Ronallo and is licensed under a 
[Creative Commons Attribution 3.0 Unported License](http://creativecommons.org/licenses/by/3.0/).
