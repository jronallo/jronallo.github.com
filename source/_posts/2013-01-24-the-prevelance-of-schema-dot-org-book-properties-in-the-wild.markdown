---
layout: post
title: "The Prevelance of Schema.org Book Properties in the Wild"
date: 2013-01-24 23:00
update: 2013-01-24
comments: true
categories: [crawl, microdata, schema.org]
published: true
---

The [Web Data Commons](YKK) is extracting the structured data discovered in the [Common Crawl](YKK) corpus, and they're making the extracted data and some high-level analyzed data available for free to all. I took a look at which properties of <http://schema.org/Book> were actually used in the wild in the [August 2012 corpus](http://webdatacommons.org/2012-08/stats/how_to_get_the_data.html). My hope is to inform, in a small way, the discussion around extending Schema.org to better accommodate bibliographic data happening through the [W3C Schema Bib Extend Community Group](http://www.w3.org/community/schemabibex/). By seeing what is actually being used, we might make better decisions about how Schema.org could be extended. 

<!-- more -->

I looked at the [Class-Property-Co-occurrence Matrixes](http://webdatacommons.org/2012-08/stats/how_to_get_the_data.html#toc2) spreadsheets. Looking at just the "Properties" worksheet shows the number of Pay Level Domains (PLDs) that use each property. It appears that schema.org/Book only shows up in the Microdata spreadsheet and not in the RDFa one, though it seems as if they might have some differences I don't understand. 

Of the 23 properties listed only 18 are valid properties (5 are not and given an asterisk below). About 32 properties of <http://schema.org/Book> are not used at all (there are some properties with deprecated plural duplicates I may have counted), so not every property is being used so far. This was just doing some quick counts, so my numbers might be off a bit.

As new data comes out of Web Data Commons, I will try to report on it.

So here are the properties that are actually used followed by the number of PLDs that use that property:

Property                    | Pay Level Domain Count
-------------------------- |------------------------ 
http://schema.org/Book/name            | 375 
http://schema.org/Book/image           | 298 
http://schema.org/Book/author          | 244
http://schema.org/Book/description     | 212
http://schema.org/Book/isbn            | 157
http://schema.org/Book/publisher       | 141
http://schema.org/Book/offers          | 113
http://schema.org/Book/url             | 87
http://schema.org/Book/numberOfPages   | 83
http://schema.org/Book/bookFormat      | 81
http://schema.org/Book/datePublished   | 75
http://schema.org/Book/aggregateRating | 52
http://schema.org/Book/inLanguage      | 48
http://schema.org/Book/price*          | 46
http://schema.org/Book/numPages*       | 45
http://schema.org/Book/reviews         | 31
http://schema.org/Book/bookEdition     | 25
http://schema.org/Book/genre           | 23
http://schema.org/Book/about           | 20
http://schema.org/Book/publishDate*    | 17
http://schema.org/Book/keywords        | 15
http://schema.org/Book/priceCurrency*  | 11
http://schema.org/Book/ratingValue*    | 10
