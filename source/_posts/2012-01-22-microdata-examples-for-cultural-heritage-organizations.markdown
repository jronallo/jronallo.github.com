---
layout: post
title: "Microdata Examples for Cultural Heritage Organizations"
date: 2012-01-22 14:44
comments: true
categories: [microdata, schema.org]
published: false
---

While implementing Microdata is relatively simple, it always helps to have more
examples to learn from.
Below are examples of Microdata and/or Schema.org that may help
cultural heritage organizations with their own implementations. The hope is that
by seeing more examples, we can discuss best practices and 
opportunities for more engagement.

<!-- more -->

[NCSU Libraries' Digital Collections: Rare and Unique Materials](http://d.lib.ncsu.edu/collections)
----------------------------------------------------------------

The example used in 
[a tutorial published in the Code4Lib Journal](/blog/html5-microdata-and-schema-dot-org-code4lib-article/)
is based on this site. 


[Indianapolis Museum of Art](http://www.imamuseum.org/art/collections/artwork/untitled-calder-alexander)
----------------------------

Uses CreativeWork and extends that type by adding the following properties:
accessionNumber, collection, copyright, creditLine, dimensions, materials.
  
  
[Biodiversity Heritage Library](http://www.biodiversitylibrary.org/bibliography/51518)
-------------------------------

Adds an "OCLC" property for a Book. If we need a property for the OCLC identifier,
it may be better to pick something like "oclcID" which follows the convention
for property case and is in line with [productID](http://schema.org/Product).

  
[Sudoc French academic union catalogue](http://www.sudoc.fr/132133520.html) 
---------------------------------------

Seems to only show the Microdata representation to crawlers? 
[More information](http://lists.w3.org/Archives/Public/public-lld/2011Jul/0013.html).


[Sindice Search](http://sindice.com/search?q=schema&nq=&fq=class%3Ahttp%3A%2F%2Fschema.org%2F*%20format%3AMICRODATA&interface=guru&facet.field=domain)
----------------

This is a search of the Sindice index. The search can be adjusted to find a 
specific schema.org type (called class by Sindice).
Faceting by the Microdata does not always seem to find sites that predominantly
use Microdata rather than RDFa. You can also search for particular domains, like
in this search for [d.lib.nsu.edu](http://sindice.com/search?q=domain%3Ad.lib.ncsu.edu).
Sindice [accepts sitemaps](http://sindice.com/main/submit) for crawling, and
I encourage cultural heritage organizations to submit their sitemaps to provide
another way to discover examples.


[Berkeley Law Library Staff Directory](http://www.law.berkeley.edu/library/dynamic/staff.php)
--------------------------------------

This page marks up persons. This is a clear case where libraries could 
mark up some of 
their structured data for contact points for better discoverability.
It does currently (2012-01-22) contain some errors, but none that keep the
page from parsing.
(Thanks to Michael Lindsey for pointing out this implemenation.)


[The Social Networks and Archival Context Project Prototype](http://socialarchive.iath.virginia.edu/xtf/view?docId=anthony-susan-b-cr.xml)
------------------------------------------------------------

Uses Microdata, but not Schema.org and no `itemtype`s (2012-01-22).
(Thanks to Brian Tingle for pointing out this prototype.)


[WorldCat Identities Development](http://orlabs.oclc.org/identities/)
---------------------------------

This is the development version of Identities so it might be in the
[production version](http://www.worldcat.org/identities/) by the time you read
this. Listed is the Person and items for their CreativeWorks. 
(Thanks to Ralph LeVan for bringing this to my attention.)


[code4lib jobs](http://jobs.code4lib.org/)
---------------

Uses the Schema.org [JobPosting](http://schema.org/JobPosting) type. See the my 
[Code4Lib Article in the section "Another way forward for the cultural heritage sector?"](/blog/html5-microdata-and-schema-dot-org-code4lib-article/)
for how the history of the JobPosting type is relevant to how cultural 
heritage organizations might pursue extending the Schema.org vocabularies.
(Thanks to Ed Summers for putting this site together and making some 
[requested changes](https://github.com/code4lib/shortimer/commit/902e944414ad3fda14ea2574c250e2808e16dd80).)


