---
layout: post
title: "Library Catalog Pages Ranking in Search Engines"
date: 2012-02-24 15:20
comments: true
categories: 
published: false
---

Recently there was a thread on the code4lib list about [local catalog records being in the search engines](http://www.mail-archive.com/code4lib@listserv.nd.edu/msg13356.html) like Google, Bing, and Yahoo!. The anecdotal evidence is that Google is [actively crawling and indexing library catalogs like Johns Hopkins](http://www.mail-archive.com/code4lib@listserv.nd.edu/msg13360.html). 

Some of the discussion has revolved around how useful this local catalog data is to folks coming from search engines. For How many of these users are satisfied with coming to the local catalog? I think many people will be unsatisfied because they have found something interesting that they cannot access. Much of what academic libraries have is only available to their own students, faculty, and staff or to other institutions through inter-library loan. I think the situation may be improving.

## User Data

One way these kinds of searches are improving is through the search engines knowing more about user preferences and browsing history. It seems that changes to Google's privacy policy means that more data will be shared between applications. If a user is logged in to a Google product it will be possible to have this data effect search relevancy. If Google knows I visit the library catalog often, then it could push results for the catalog up for relevant searches. This kind of service certainly is not uncontroversial, but it appears that use of this kind of data to effect relevancy will be happening more often. (In the academic library context I wonder to what extent the data from Google Apps like campus Gmail is allowed to be folded in to the other data the search engines have about a person? This institutional connection could be a clear way for library catalogs to increase in relevance for these users.)

Increasingly data about people comes to search engines through social networks. Facebook and Google+ are collecting information about user preferences that can be worked into search. Social connections and their preferences are starting to figure in to the ranking algorithm. So my social circles are starting to change what results show up on the first page. It is interesting to see the results with this social component added in compared with it removed. While many will turn off or away from these new factors to search ranking, there are some ways library catalogs and other interfaces could be improved for those who opt in.

## Location vs. Affiliation

One suggestion is that the user's geographic location could figure in to which library catalogs show up in results. This is a very rough way of determining relevance. It may work for public libraries, but does not work well for academic libraries. I could live right next door to a university with a fabulous library, but have no rights to access the collections. 

This is basically how [WorldCat](http://www.worldcat.org/) works to determine relevance by location. The problem is that it shows me all results even those over 100 miles away from my current location. It is not until you get to the view of an individual resource does it tell me that it is too far away. Even if the search engines used my location along with location data from WorldCat the results may still not be relevant or something I could borrow.

Geographic location has been a crude surrogate for personal relevance. What would be better would be for the search engines to use affiliation. Affiliation more accurate for determining an appropriate copy. The motivation for search engines to use affiliation to effect relevance is, as usual, to improve the user experience. Folks already use search engines to find content on their institutional websites that have poor information architecture or search capabilities. This is not something that is specific to library catalogs, but cuts across information from an institution.

Google+ already knows my current work affiliation. How does a search engine use that information to make results from the local catalog rank higher? The missing component is for the library catalog (or any institutional site) to advertise institutional ownership. 

URLs already does this in some cases, but there is no explicit link between the text of the institution name I enter into a social network profile and the URL for a library catalog or website. In other cases, library catalogs and other applications are hosted by third parties so not within the institutional domain.

Another approach that could work across these cases is to use embedded semantic markup to effectively brand a site for machines like crawlers. This kind of annotation can unambiguously state that a page is from a particular institution. It is easier to link the organization name on a Web page with the name given as an affiliation in a social network profile.

Here's an example using Microdata and the Schema.org vocabulary. It covers both the geographic location and affiliation cases.

```html
<div itemscope itemtype="http://schema.org/Organization" itemid="http://lib.ncsu.edu/">
  <span itemprop="name">NCSU Libraries</span>
  <div itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">
      <span itemprop="streetAddress">2 Broughton Drive</span>,
      <span itemprop="addressLocality">Raleigh</span>,
      <span itemprop="addressRegion">NC</span>
      <span itemprop="postalCode">27695-7111</span>
  </div>
  <span itemprop="telephone">(919) 515-3364</span>
  <span itemprop="location" itemscope itemtype="http://schema.org/Place">
    <span itemprop="geo" itemscope itemtype="http://schema.org/GeoCoordinates">
      <meta itemprop="latitude" content="35.78743" />
      <meta itemprop="longitude" content="-78.67012" />
    </span>
  </span>
</div>
```

This might be enough of a hint to the search engines to give a boost to content from my institution if I have that information in my profile. I don't have evidence that the search engines are doing this, but it seems within the realm of possibility. Whether Google will do this kind of linking with library catalog pages, I don't know, but Google is increasingly becoming this kind of aggregator. 

WorldCat is in the same space by more explicitly aggregating information about holdings but only for their member libraries that submit holdings data (that's how it works, right?). Using Microdata and Schema.org allows for this kind of aggregation of *distributed* sites on the Web. The search engines may not be the only service providers for this kind of aggregated data, though the search engines have the advantage of being the first place users look.

One thing that would make this easier would be the adoption of identifiers on both ends. In the example above the `itemid` attribute gives a URL as an institutional identifier. If social profiles either explicitly or implicitly used the institutional URL http://lib.ncsu.edu/ as an identifier for "NCSU Libraries" then this linking would be more solid.

## Personal Profiles

There is more that needs to be worked out for affiliation to work like this more generally. Sometimes you may have the right to borrow something as part of a consortium that does not share a name with your place of work. While there is not a way to stipulate this kind of relationship in many social network profiles, it may be possible through a profile on your own website. If you eschew giving lots of information about yourself to social networks, this approach may work for you. In this scenario the search engines would still need to know that a particular searcher is associated with a particular website to make this kind of link.

Here's a short partial snippet of some Microdata using Schema.org to communicate my affiliation with the [Triangle Research Library Network](http://www.trln.org/). (TRLN is a collaborative organization of Duke University, North Carolina Central University, North Carolina State University, and The University of North Carolina at Chapel Hill.) I could place something like this on [my own website](http://jronallo.github.com/).

```html
<div itemscope itemtype="http://schema.org/Person">
  YKK
</div>
```

So in some ways what I've written about here could provide a basic appropriate copy relevancy boost and in the same space as our link resolvers. It is all hints to the search engines, but in line with the direction the search engines are going. As the search engines get smarter about directing users to appropriate content, there will probably increasingly be reasons to have local library catalogs crawled and indexed.




