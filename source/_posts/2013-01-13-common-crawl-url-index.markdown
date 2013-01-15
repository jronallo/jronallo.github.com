---
layout: post
title: "Common Crawl URL Index"
date: 2013-01-15 18:20
comments: true
categories: [crawl, microdata, schema.org, rdf, search engines, analytics]
published: true
sidebar: collapse
---

The Common Crawl now has a [URL index available](http://commoncrawl.org/common-crawl-url-index/). While the Common Crawl has been making a large corpus of crawl data available for over a year now, if you wanted to access the data you'd have to parse through it all yourself. While setting up a parallel Hadoop job running in AWS EC2 is cheaper than crawling the Web, it still is rather expensive for most. Now with the URL index it is possible to query for domains you are interested in to discover whether they are in the Common Crawl corpus. Then you can grab just those pages out of the crawl segments.

<!-- more -->

[Scott Robertson](https://angel.co/srobertson), who was responsible for putting the index together, writes in the [github README](https://github.com/trivio/common_crawl_index) about the file format used for the index and the algorithm for querying it. If you're interested you can read the details there.

If you just want to see how to get the data now, the repository provides a couple [python scripts for querying the index](https://github.com/trivio/common_crawl_index/tree/master/bin). I used the [`remote_read`](https://github.com/trivio/common_crawl_index/blob/master/bin/remote_read) script. You'll need to clone the git repository to get the script along with the library files:

```bash
git clone https://github.com/trivio/common_crawl_index.git
```

Then enter the cloned repository and make the file executable:

```bash
cd common_crawl_index
chmod u+x bin/remote_read
```

Since the data set is hosted for free as part of [AWS open data sets](http://aws.amazon.com/publicdatasets/), it appears that they allow anonymous access. This means that you may not have to sign up for an [Amazon Web Services](http://aws.amazon.com/) account. The current `remote_read` script does not have this anonymous access turned on, but there is an [open issue and patch submitted to allow anonymous access](https://github.com/trivio/common_crawl_index/pull/4). You may want to get that version of the `remote_read` script and use it until that issue is closed.

If you have an account you want to use, you'll update these lines in `remote_read` with your own AWS key and secret. 

```
  mmap = BotoMap(
    '<YOUR AWS KEY>',
    '<YOUR AWS SECRET>',
    'aws-publicdatasets',
    '/common-crawl/projects/url-index/url-index.1356128792'
  )
```

Finally you'll have to install boto:

```bash
pip install boto
```

Now you can run the script:

```bash querying the Common Crawl URL index
bin/remote_read edu.ncsu.lib
```

Note that because of how the index is constructed you'll be querying for domains in reverse order. This allows you scope your queries to match everything from a TLD down to a specific subdomain. This will return every URL matching under [http://lib.ncsu.edu](http://lib.ncsu.edu) as well as any subdomains like [http://d.lib.ncsu.edu](http://d.lib.ncsu.edu).

As I write this, the [index is only partial](https://groups.google.com/d/msg/common-crawl/EfR1YHvtWrY/ImnW7Z0rgq4J), while folks provide feedback on the index, so your current results may not reflect everything that is currently in the Common Crawl corpus.

## NCSU Libraries' URLs in the Common Crawl Index

You can see the [results for my query for edu.ncsu.lib](/demos/common_crawl/edu.ncsu.lib-commoncrawl-index.txt). Here's a snippet from the beginning of the set:

```text Query for edu.ncsu.lib in Common Crawl URL Index http://jronallo.github.com/demos/common_crawl/edu.ncsu.lib-commoncrawl-index.txt Full Text
edu.ncsu.lib.blogs/:http {'arcFileParition': 200, 'compressedSize': 2062, 'arcSourceSegmentId': 1346876860565, 'arcFileDate': 1346911439829, 'arcFileOffset': 1518768}
edu.ncsu.lib.d/:http {'arcFileParition': 2132, 'compressedSize': 855, 'arcSourceSegmentId': 1346876860782, 'arcFileDate': 1346908147933, 'arcFileOffset': 2759941}
edu.ncsu.lib.d/collections/:http {'arcFileParition': 2132, 'compressedSize': 5165, 'arcSourceSegmentId': 1346876860782, 'arcFileDate': 1346908633502, 'arcFileOffset': 81186482}
edu.ncsu.lib.d/collections/catalog/0228376:http {'arcFileParition': 2132, 'compressedSize': 5738, 'arcSourceSegmentId': 1346876860782, 'arcFileDate': 1346908633502, 'arcFileOffset': 60135728}
edu.ncsu.lib.d/collections/catalog/bh2127pnc001:http {'arcFileParition': 2132, 'compressedSize': 6003, 'arcSourceSegmentId': 1346876860782, 'arcFileDate': 1346908633502, 'arcFileOffset': 27791779}
edu.ncsu.lib.d/collections/catalog/unccmc00145-002-ff0003-002-004_0002:http {'arcFileParition': 2132, 'compressedSize': 6456, 'arcSourceSegmentId': 1346876860782, 'arcFileDate': 1346909064600, 'arcFileOffset': 7308443}
edu.ncsu.lib.databases/:http {'arcFileParition': 76, 'compressedSize': 5688, 'arcSourceSegmentId': 1346823846039, 'arcFileDate': 1346870337194, 'arcFileOffset': 37040682}
```

The result is a line delimited file with information about one URL on each line. A space separates the URL from some JSON-like data. (You'll need to convert the single quotes to double quotes for it to parse as JSON, or just eval the data with Python if you are filled with trust or like to live dangerously.) Again, the URL hostname is in reverse order followed by the path in normal order and finally the protocol. The data is a pointer to the location for the file within a segment of the common crawl dataset. This information can be used to [retrieve the page from AWS S3](https://github.com/trivio/common_crawl_index#retrieving-a-page).

What I'm interested in is what NCSU Libraries URLs are represented in the index. In total the URL index has 4033 URLs that all look to be from a crawl in early September. Here's the breakdown for subdomains:

```
 2278: www.lib.ncsu.edu
  801: repository.lib.ncsu.edu
  326: geodata.lib.ncsu.edu
  289: news.lib.ncsu.edu
  149: lib.ncsu.edu
   54: wikis.lib.ncsu.edu
   27: images.lib.ncsu.edu
   16: ncslaap.lib.ncsu.edu
   15: historicalstate.lib.ncsu.edu
   11: insidewood.lib.ncsu.edu
   10: ncarchitects.lib.ncsu.edu
    5: d.lib.ncsu.edu
    2: media.lib.ncsu.edu
    2: insight.lib.ncsu.edu
    2: hegel.lib.ncsu.edu
    2: libb.ncsu.edu
    2: library.ncsu.edu
    1: reserves.lib.ncsu.edu
    1: ww.lib.ncsu.edu
    1: linkinghub.elsevier.com.www.lib.ncsu.edu
    1: wais.lib.ncsu.edu
    1: vega.lib.ncsu.edu
    1: tricks.lib.ncsu.edu
    1: smithers.lib.ncsu.edu
    1: sirius.lib.ncsu.edu
    1: sfx.lib.ncsu.edu
    1: search.lib.ncsu.edu
    1: rppnt.lib.ncsu.edu
    1: rpp.lib.ncsu.edu
    1: web.ebscohost.com.www.lib.ncsu.edu
    1: isiknowledge.com.www.lib.ncsu.edu
    1: bst.sagepub.com.www.lib.ncsu.edu
    1: ncsulib4.lib.ncsu.edu
    1: ncsulib2.lib.ncsu.edu
    1: sag.sagepub.com.www.lib.ncsu.edu
    1: nclive.lib.ncsu.edu
    1: sciencedirect.com.www.lib.ncsu.edu
    1: ncarchitect.lib.ncsu.edu
    1: metcalf.lib.ncsu.edu
    1: springerlink.com.www.lib.ncsu.edu
    1: luna.lib.ncsu.edu
    1: libntapp1.lib.ncsu.edu
    1: jacob.lib.ncsu.edu
    1: proquest.umi.com.www.lib.ncsu.edu
    1: www3.interscience.wiley.com.www.lib.ncsu.edu
    1: pubs.acs.org.www.lib.ncsu.edu
    1: link.aps.org.www.lib.ncsu.edu
    1: avmajournals.avma.org.www.lib.ncsu.edu
    1: gopher.lib.ncsu.edu
    1: vetpathology.org.www.lib.ncsu.edu
    1: ftp.lib.ncsu.edu
    1: etd.lib.ncsu.edu
    1: ematb.lib.ncsu.edu
    1: dli.lib.ncsu.edu
    1: dewey.lib.ncsu.edu
    1: databases.lib.ncsu.edu
    1: wwwnew.lib.ncsu.edu
    1: blogs.lib.ncsu.edu
    1: bliss.lib.ncsu.edu
Total URLs: 4033
Total hostnames: 59
```

## Analyzing the Results

The results here are interesting as I'm always trying to raise the discoverability of NCSU Libraries' digital collections. At the top of the list is the main web site for NCSU Libraries. The hostnames www.lib.ncsu.edu and lib.ncsu.edu both point to the same resources. Looking closer we find that of the 2427 URLs there, many are for digital collections related pages. 636 are under the [Special Collections Research Center](http://www.lib.ncsu.edu/specialcollections/), and some of these are pages for some legacy collections. 407 URLs are for pages in our [collection guides](http://www.lib.ncsu.edu/findingaids/) application, many of them for individual guides or, strangely the EAD XML for the guides. Some of those collection guides do [link to online digital collections](http://www.lib.ncsu.edu/findingaids/search?onlineContent=true).

The institutional repository (Dspace instances) is also well represented at the top of this list. The [Technical Reports Repository](http://repository.lib.ncsu.edu/dr) accounts for 159 of those URLs, and the [NCSU Institutional Repository](http://repository.lib.ncsu.edu/ir/) accounts for just 3. The [digital collections](http://repository.lib.ncsu.edu/collections/) in the repository, mainly special collections, accounts for 626 URLs. 719 of the 801 repository URLs are directly to the PDFs. Evidently the PDFs rank higher than the landing pages.

NCSU Libraries has been providing [Geospatial Data Services](http://www.lib.ncsu.edu/gis/) and paying attention to SEO for those pages for a long time, so it isn't completely surprising that this directory of files has gotten indexed: <http://geodata.lib.ncsu.edu>. (Note that this server may not be accessible from off-campus.) Many of the URLs under www.lib.ncsu.edu are also GIS pages, so GIS data services and collections pages are even better represented--and human-friendly--than at first appears.

Other digital collections projects like [Historical State](http://historicalstate.lib.ncsu.edu/), [Inside Wood](http://insidewood.lib.ncsu.edu/), [North Carolina Architects & Builders](http://ncarchitects.lib.ncsu.edu/), and [NCSU Libraries' Rare and Unique Materials](http://d.lib.ncsu.edu/collections) are represented, but nowhere near exhaustively. Historical State now [canonicalizes](http://support.google.com/webmasters/bin/answer.py?hl=en&answer=139066) its URLs for individual resources to point to the Rare and Unique Materials site, but Common Crawl may not be paying attention that that hint. (Hopefully, at some point I'll be able to do a similar analysis for historicalstate.lib.nsu.edu as I've done in the following.)

For <http://d.lib.ncsu.edu> these are the URLs listed:

- <http://d.lib.ncsu.edu/> <br> This is the root page of a subdomain that includes a growing number of digital collections sites. This index page was just updated to be more than a single unstyled link.
- <http://d.lib.ncsu.edu/collections/> <br> The home page for NCSU Libraries' Digital Collections: Rare and Unique Materials which includes over 63,700 resources. It has been a focus of my own work to try to improve the discoverability of this content on the open Web. I implemented embedded semantic markup, [Microdata and Schema.org](http://journal.code4lib.org/articles/6400), on this site.
- <http://d.lib.ncsu.edu/collections/catalog/0228376> <br> This is an image of Mary Travers singing live on stage. Looking in Google Analytics for this page as a landing page for referrals, Google is the top referrer. Since Google is not likely to have been crawled to discover this URL, it is more likely that the next referrer is responsible for this getting in the index. This [post on the Peter, Paul & Mary Love Tumblr](http://weloveppm.tumblr.com/post/15597561903) was reblogged and liked a number of times. That particular post is the only one from this Tumblr which is in the Common Crawl index.
- <http://d.lib.ncsu.edu/collections/catalog/bh2127pnc001> <br>  This is an image of the [Webb-Barron-Wells House](http://d.lib.ncsu.edu/collections/catalog?utf8=%E2%9C%93&q=Webb-Barron-Wells+House&search_field=all_fields&commit=search) in [Wilson County, North Carolina](http://d.lib.ncsu.edu/collections/catalog?f%5Blocation_facet%5D%5B%5D=Wilson+County+%28N.C.%29&search_field=all_fields&utf8=%E2%9C%93). It has seen better days, and is not the best representation of many of the [beautiful architectural photographs and drawings](http://d.lib.ncsu.edu/collections/catalog?commit=search&f%5Btopic_facet%5D%5B%5D=Architecture&search_field=all_fields&utf8=%E2%9C%93) in the collection. This page is linked to from the [Webb Surname DNA Project Album](http://www.webbdnaproject.org/album.php). None of this site's pages are in the index, so that may not be where the link comes from.
- <http://d.lib.ncsu.edu/collections/catalog/unccmc00145-002-ff0003-002-004_0002> <br> This is a "First floor plumbing plan" from the [Louis H. Asbury Papers, 1906-1975](http://d.lib.ncsu.edu/collections/catalog?f%5Bclassification_facet%5D%5B%5D=Louis+H.+Asbury+Papers%2C+1906-1975) with many fine drawings. I can't seem to track down a referrer from Google Analytics that might have led to this link finding its way into the Common Crawl.

So it appears that the Common Crawl probably hasn't (at least in this half of the index!), decided to crawl this site to any extent. Instead it appears it is only deciding to crawl pages that have been linked up. Once the rest of the index comes out, I'll have to take a look, and consider how to improve that number. The key though is obviously getting more links into the site.

Further down in the list there are a bunch of funny looking URLs. I think these are all proxy URLs for user authentication to restricted resources.

- linkinghub.elsevier.com.www.lib.ncsu.edu
- web.ebscohost.com.www.lib.ncsu.edu
- isiknowledge.com.www.lib.ncsu.edu

<http://gopher.lib.ncsu.edu> no longer seems to exist, so I don't know where they got that page.

## Double Checking in Web Data Commons

While the Common Crawl URL index is useful if you need the whole page, in many cases just extracted embedded semantic markup may be enough. The [Web Data Commons](http://webdatacommons.org/) is already extracting Microdata and RDFa data, and makes indexes available, though it takes a bit more effort to parse through their indexes. (I'd like a service or script to query for an N-Quad context and get back all the related triples. Anyone know if there is already such a service? Do I have to write one?) They do have a [helpful page on how to download the extracted data](http://webdatacommons.org/2012-08/stats/how_to_get_the_data.html) in whole or in part.

The <http://d.lib.ncsu.edu/collections/> site publishes Microdata and Schema.org. Looking in the [Web Data Commons Microdata index](http://webdatacommons.org/downloads/2012-08/nquads/html-microdata.nq.index.gz) I found the [the N-Quad file with triples extracted from ncsu.edu pages](http://webdatacommons.org/downloads/2012-08/nquads/html-microdata-00337.nq.sort.gz). They list only the same URLs as the Common Crawl URL index reports. This leads me to believe that these may be the only URLs in the Common Crawl index right now even though that index is incomplete.

## What can libraries and archives do with this?

First, how much of your content is in the Common Crawl corpus? I'd be interested in hearing what your results are like. 

We need to figure out how to get more cultural heritage content crawled and indexed by the Common Crawl. Without our stuff in the Common Crawl we are missing many opportunities to broaden the reach of our content. It doesn't appear that Common Crawl accepts sitemaps. It works off of page rank and the link graph of popular sites. While my sites for rare and unique digital collections get most of their traffic from search engines, mainly Google, an increasing amount of traffic is due to referrals. Referrals, links from other sites, seem like the key for getting our stuff into the corpus. Efforts to [add links to library special or digital collections to appropriate Wikipedia articles](http://en.wikipedia.org/wiki/Wikipedia:WikiProject_Libraries) and the like would seem to be a good starting point.

Social sites are in the corpus and may also be a good way to get inbound links to our collections. There are 134,928+ Pinterest URLs in the Common Crawl index, and folks are actively pinning content from [d.lib.ncsu.edu](http://pinterest.com/source/d.lib.ncsu.edu/). Will the content pinned and repinned on Pinterest begin showing up in the crawl? Where else are crawlers likely to find links from people who make use of our content?

If more cultural heritage content is a part of the index, then there are all sorts of things we can begin to do. For web archiving projects it would be possible to begin with data in the corpus, potentially saving some crawling expense. New targeted search engines (or [aggregations](http://jronallo.github.com/blog/code4lib-2012-lightning-talk-that-wasnt/)) can be created for different slices of content. Implement [Microdata](http://www.whatwg.org/specs/web-apps/current-work/multipage/microdata.html) (or [RDFa Lite](http://www.w3.org/TR/rdfa-lite/)) with [Schema.org](http://schema.org/) vocabularies and richer metadata can be extracted from your pages by the Web Data Commons and understood by many. This data can then be used in a variety of interfaces to save the time of the user in finding the content they really want. 

What are some other ways that libraries, archives, and museums might be able to use the Common Crawl?

You can see the simple Ruby scripts I used for parsing the Common Crawl URL index out and the Web Data Commons N-Quads in [this gist](https://gist.github.com/4527250).





