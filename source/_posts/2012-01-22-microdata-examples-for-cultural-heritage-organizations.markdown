---
layout: post
title: "Microdata Examples for Cultural Heritage Organizations"
date: 2012-01-22 14:44
comments: true
categories: [microdata, schema.org]
published: false
---

These are examples of implementing Microdata or Schema.org that may help
cultural heritage organizations with their own implementations. The hope is that
by seeing more examples, we can dicuss more about best practices and 
opportunities for more engagement.

<!-- more -->

[NCSU Libraries' Digital Collections: Rare and Unique Materials](http://d.lib.ncsu.edu/collections)
----------------------------------------------------------------

The example in [this tutorial](/blog/html5-microdata-and-schema-dot-org-code4lib-article/)
is based on this site.


[Indianapolis Museum of Art](http://www.imamuseum.org/art/collections/artwork/untitled-calder-alexander)
----------------------------

Uses CreativeWork and extends the type by adding the following properties:
accessionNumber, collection, copyright, creditLine, dimensions, materials.
  
  
[Biodiversity Heritage Library](http://www.biodiversitylibrary.org/bibliography/51518)
-------------------------------

Adds an "OCLC" property for a Book.

  
[Sudoc French academic union catalogue](http://www.sudoc.fr/132133520.html) 
---------------------------------------

Seems to only show the Microdata representation to crawlers? 
[more information](http://lists.w3.org/Archives/Public/public-lld/2011Jul/0013.html)


[Sindice Search](http://sindice.com/search?q=schema&nq=&fq=class%3Ahttp%3A%2F%2Fschema.org%2F*%20format%3AMICRODATA&interface=guru&facet.field=domain)
----------------

This search can be adjusted to find a specific schema.org type (class here).
Faceting by the Microdata does not always seem to find sites that predominantly
use Microdata rather than RDFa.
