---
layout: post
title: "Common Crawl URL Index"
date: 2013-01-13 18:20
comments: true
categories: 
published: false
---

I was excited to see the announcement from the Common Crawl that a [URL index is now available](http://commoncrawl.org/common-crawl-url-index/). While the Common Crawl has been making a large corpus of crawl data available for over a year now, if you wanted to access the data you'd have to parse through it all yourself. While setting up a parallel Hadoop job running in AWS EC2 is cheaper than crawling the Web, it still is rather expensive. Now with the index it is possible to query for URLs you are interested in to discover whether they are in the Common Crawl corpus. The result you get

YKK, who was responsible for putting the index together, writes in the [github README](https://github.com/trivio/common_crawl_index) about the file format used for the index and how to query it. If you're interested you can read the details there.

If you just want to see how to get the data now, the repository provides a couple [python scripts for querying the index](https://github.com/trivio/common_crawl_index/tree/master/bin). I used the [`remote_read`](https://github.com/trivio/common_crawl_index/blob/master/bin/remote_read) script. You'll need to clone the git repository to get the script along with the library:

```
git clone https://github.com/trivio/common_crawl_index.git
```

Then enter the cloned repository and make the file executable:

```
cd common_crawl_index
chmod u+x bin/remote_read
```

You then need to sign up with [Amazon Web Services](http://aws.amazon.com/) if you do not already have an account. You'll have to give them credit card information. While the data set is hosted for free as part of [AWS open data sets](YKK), I believe you will still be charged for use getting data out in many cases. It appears that with light usage you may not incur any costs, though you'll want to double check that for yourself. You'll also want to be careful that your queries are scoped closely enough not to download everything in a TLD if that's not really what you want.

Once you have an account you'll update these lines in `remote_read` with your own AWS key and secret. 

```
  mmap = BotoMap(
    '<YOUR AWS KEY>',
    '<YOUR AWS SECRET>',
    'aws-publicdatasets',
    '/common-crawl/projects/url-index/url-index.1356128792'
  )
```

Now you can run the script like this:

```bash querying the Common Crawl URL index http://jronallo.github.com/YKK Output

bin/remote_read edu.ncsu.lib

```

Note because of how the index is constructed you'll be querying for domains in reverse order. This allows you scope your queries to match everything from a TLD down to a specific subdomain. This will return every URL matching under [http://lib.ncsu.edu](http://lib.ncsu.edu) as well as any subdomains like [http://d.lib.ncsu.edu](http://d.lib.ncsu.edu).

Currently, the [index is only partial](YKK), while folks provide feedback on the index, so your current results may not reflect everything that is currently in the Common Crawl corpus.

## NCSU Libraries URLs in the Common Crawl Index

You can see the [results for my query for edu.ncsu.lib](YKK). Here's a snippet from the beginning of the set:

```text
edu.ncsu.lib.blogs/:http {'arcFileParition': 200, 'compressedSize': 2062, 'arcSourceSegmentId': 1346876860565, 'arcFileDate': 1346911439829, 'arcFileOffset': 1518768}
edu.ncsu.lib.d/:http {'arcFileParition': 2132, 'compressedSize': 855, 'arcSourceSegmentId': 1346876860782, 'arcFileDate': 1346908147933, 'arcFileOffset': 2759941}
edu.ncsu.lib.d/collections/:http {'arcFileParition': 2132, 'compressedSize': 5165, 'arcSourceSegmentId': 1346876860782, 'arcFileDate': 1346908633502, 'arcFileOffset': 81186482}
edu.ncsu.lib.d/collections/catalog/0228376:http {'arcFileParition': 2132, 'compressedSize': 5738, 'arcSourceSegmentId': 1346876860782, 'arcFileDate': 1346908633502, 'arcFileOffset': 60135728}
edu.ncsu.lib.d/collections/catalog/bh2127pnc001:http {'arcFileParition': 2132, 'compressedSize': 6003, 'arcSourceSegmentId': 1346876860782, 'arcFileDate': 1346908633502, 'arcFileOffset': 27791779}
edu.ncsu.lib.d/collections/catalog/unccmc00145-002-ff0003-002-004_0002:http {'arcFileParition': 2132, 'compressedSize': 6456, 'arcSourceSegmentId': 1346876860782, 'arcFileDate': 1346909064600, 'arcFileOffset': 7308443}
edu.ncsu.lib.databases/:http {'arcFileParition': 76, 'compressedSize': 5688, 'arcSourceSegmentId': 1346823846039, 'arcFileDate': 1346870337194, 'arcFileOffset': 37040682}
```

The result is a line delimited with information about one URL on each line. A space separates the URL from some JSON data. Again, the URL hostname is in reverse order followed by the path in normal order and finally the protocol. The JSON data is a pointer to the location for the file within a segment of the common crawl dataset. This information can be used to [retrieve the page from AWS S3](https://github.com/trivio/common_crawl_index#retrieving-a-page).

What I'm interested in is what NCSU Libraries URLs are represented in the index. In total the URL index has 4033 URLs. Here's the breakdown for subdomains:

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

```

The results here are interesting as I'm always trying to raise the profile of NCSU Libraries' digital collections. At the top of the list is the main web site. The hostnames www.lib.ncsu.edu and lib.ncsu.edu both point to the same resources. If we unpack that further we find that of the 2427 URLs there, many are for digital collections related pages. 636 are under the [Special Collections Research Center](http://www.lib.ncsu.edu/specialcollections/). Some of these are pages for some legacy collections. 407 URLs are for pages in our [collection guides](http://www.lib.ncsu.edu/findingaids/) application, many of them for individual guides or, strangely the EAD XML for the guides. Some of those collection guides [link to online digital collections](http://www.lib.ncsu.edu/findingaids/search?onlineContent=true).

The institutional repository is also well represented at the top of this list. The [Technical Reports Repository](http://repository.lib.ncsu.edu/dr) accounts for 159 of those URLs, and the [NCSU Institutional Repository](http://repository.lib.ncsu.edu/ir/) accounts for just 3. The [digital collections](http://repository.lib.ncsu.edu/collections/), mainly special collections, accounts for 626 URLs. 719 of these are URLs directly to the PDFs.

[geodata.lib.ncsu.edu](http://geodata.lib.ncsu.edu/) YKK

Other digital collections projects like [Historical State](http://historicalstate.lib.ncsu.edu/), [Inside Wood](http://insidewood.lib.ncsu.edu/), [North Carolina Architects & Builders](http://ncarchitects.lib.ncsu.edu/), and [NCSU Libraries' Rare and Unique Materials](http://d.lib.ncsu.edu/collections) are represented, but not exhaustively.

You can see the scripts I used for this output in [this gist](https://gist.github.com/4527250).

## What can libraries and archives do do with this?

YKK





