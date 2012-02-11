---
layout: post
title: "When is enough metadata?"
date: 2012-02-11 07:54
comments: true
categories: [metadata]
published: false
---

Recently on the Code4Lib list [Patrick Berry asked the question](YKK):

> When do you know you have enough metadata?

I think this is an interesting question, so thought I would try to provide a longer response in the form of some notes.

The initial reactions to this question fall into two categories:

1. What functionality do you need?
2. Infinite Return

## 1. What Functionality Do You Need?

This answers the initial question with another question. For the most part, I think this is partially on the right track. If you need particular functionality for an application then it becomes important to determine the metadata needed to support that functionality. Since you cannot always know all of the functionality you might want or need upfront, this can be difficult to do at the beginning. If you are doing agile development, then you may not even attempt to specify all of the functionality at the beginning. Some of the metadata could be presented to the user, while other metadata is behind the scenes enabling functionality. As Andreas Orphanides points out coming up with at least some use cases is a good place to start. 

## 2. Infinite Return

The other suggestion is that you never really have enough metadata. There is always the need to come back to metadata and enhance or refresh it to continue to make it useful. 

I think this is an important point that surfaces some other considerations. There may be some metadata that never gets enhanced while other metadata that continually gets touched to be optimized for certain uses. For our digital collections we often use minimal metadata extracted from the collection guide which we call a stub record. Once there is some kind of stub record, we can almost immediately make the content accessible. From there some get more metadata which make the items more discoverable. I have written about YKK

## Measured Functionality and Feedback

While you can plan for the metadata needed to support different functionality and return to the metadata as needs change, evaluation is often a missing component. A site may have functionality fully supported by the metadata, but do users actually use this functionality? More than just pageview data it could be important to track events which do not take the user to another page. Once you know how a site is actually being used, you can determine if functionality may need added or find something that could be cut. In the case of cutting functionality, it may be that the metadata needed to support that functionality could be cut as well. If it is expensive metadata to collect it may not be worthwhile to continue to collect it if no longer surfaces anywhere in the interface. Testing out these assumptions early can help manage the costs of metadata creation and management.

## Reuse

All of the above depends on the specifics of a particular website. There is a potential trap here where metadata could be created which is so custom designed that it loses its reusability. 

Sometimes more work needs to be put in for greater reuse. For instance, we create some local headings for people and organizations in LCSH format. Those headings can be quite ugly and long at times including dash-dash notation and parenthesis. All of that extra content may be needed in a larger system to disambiguate headings. In a faceted browse interface, these long headings can just lead to less scannability and readability. We also store a short version of the heading to use as facet values. Similar short headings could be used for mobile interfaces where longer strings may get cut off or clutter the interface. While it is more work to create the shorter headings, the user experience is better. We can also consolidate on one reusable record rather than creating separate metadata records for the same entities for different interfaces.

## Open Web Discoverability

One aspect of this discussion on sufficient metadata, which I think is often missing, involves discoverability on the open Web. If a site is not an internal application and it can be crawled, it is no longer good enough to think of sufficient metadata only in terms of desired functionality in the local application. Over 75% of my traffic on one of my digital collections sites is from the search engines, and nearly 15% is referral traffic. The overwhelming majority of that traffic is directed to show views of items. Below are some quick notes on how metadata figures in to different aspects of discoverability on the open Web.

**Indexing** Do you have sufficient metadata to get indexed? If you have a sitemap, Google Webmaster Tools will tell you what percentage of your sitemap is indexed. You can use a search like [site:d.lib.ncsu.edu/collections](https://www.google.com/search?q=site%3Ad.lib.ncsu.edu%2Fcollections) to do a quick check of how many pages of your site are indexed. 

**Relevance**

**Uniqueness**

**Search Snippet**

**Context**

**Further Discovery** 

**Social** Are you collecting enough metadata in a good format for exposing through social widgets on your site? 
