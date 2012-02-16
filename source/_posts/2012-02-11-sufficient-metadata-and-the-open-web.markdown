---
layout: post
title: "Sufficient Metadata and the Open Web"
date: 2012-02-11 07:54
comments: true
categories: [metadata]
published: false
---

Recently on the Code4Lib list [Patrick Berry asked the question](https://listserv.nd.edu/cgi-bin/wa?A2=ind1202&L=CODE4LIB&T=0&F=&S=&P=104952):

> When do you know you have enough metadata?

I think this is an interesting question, so thought I would try to provide a longer response in the form of some notes.

<!-- more -->

The initial reactions I've seen to this question fall into two categories:

## 1. What Functionality Do You Need?

For the most part, I think this question is partially on the right track. If you need particular functionality for an application then it becomes important to determine the metadata needed to support that functionality. Since you cannot always know all of the functionality you might want or need upfront, this can be difficult to do at the beginning. If you are doing agile development, then you may not even attempt to specify all of the functionality at the beginning. Some of the metadata could be presented to the user, while other metadata is behind the scenes enabling functionality. As Andreas Orphanides points out coming up with at least some use cases is a good place to start.

Functionality within the application is only part of what is needed in many cases.

## 2. Infinite Return

The other suggestion is that you never really have enough or good enough metadata. There is always the need to come back to metadata and enhance or refresh it to continue to make it useful. 

I think this is an important point that surfaces some other considerations. There may be some metadata record that never gets enhanced while other metadata that continually gets touched to be optimized for certain uses. For our digital collections we often use minimal metadata extracted from the collection guide which we call a stub record. Once there is some kind of stub record, we can almost immediately make the content accessible. From there some resources get more metadata which make the items more discoverable. With Brian Dietz, I have written some about how we're doing this in *[Automating a digital special collections workflow through iterative development](http://www.ala.org/acrl/sites/ala.org.acrl/files/content/conferences/confsandpreconfs/national/2011/papers/automating_digital_s.pdf)*.

## Measured Functionality and Feedback

While you can plan for the metadata needed to support different functionality and return to the metadata as needs change, evaluation is often a missing component. A site may have functionality fully supported by the metadata, but do users actually use this functionality? More than just pageview data it could be important to track events which do not take the user to another page. Once you know how a site is actually being used, you can determine if functionality may need to be added or find something that you could cut from the interface. In the case of cutting functionality, it may be that the metadata needed to support that functionality could cease being collected. If it is expensive metadata to collect it may not be worthwhile to continue to collect the metadata that no longer surfaces anywhere in the interface. Testing out these assumptions early can help manage the costs of metadata creation and management.

Is anyone else doing this kind of evaluation for non-MARC metadata?

## Reuse

All of the above depends on the specifics of a particular website. There is a potential trap here where metadata could be created which is so custom designed that it loses its reusability. 

Sometimes more work needs to be put in for greater reuse. For instance, we create some local headings for people and organizations in LCSH format. At times those headings can be quite ugly and long including dash-dash notation and parenthesis. All of that extra content may be needed in a larger system to disambiguate headings. In a faceted browse interface, these long headings can just lead to less scannability and readability. To compensate for this we also store a short version of the heading to use as facet values. Similar short headings could be used for mobile interfaces where longer strings may get cut off or clutter the interface. While it is more work to create the shorter headings, the user experience is better. We can also consolidate metadata in one reusable record rather than creating separate metadata records for the same entities for different interfaces.

## Open Web Discoverability

One aspect of this discussion on sufficient metadata, which appears is often missing, involves discoverability on the open Web. The functionality within a site is only part of the calculation of what metadata is good enough. How a site is viewed and interacts with the Web should often be a much larger consideration than the functionality within a site.

If a site is not an internal application and it can be crawled, it is no longer good enough to think of sufficient metadata only in terms of desired functionality in the local application. Over 75% of my traffic on one of my digital collections sites is from the search engines, and nearly 15% is referral traffic. The overwhelming majority of that traffic is directed to show views of items. Below are some quick notes on how metadata figures in to different aspects of discoverability on the open Web.

Indexing, relevance, and uniqueness can all be tested and quantitatively evaluated. At NCSU Libraries we have done some work to evaluate how our metadata effects open Web discoverability. There is still much more to do.

**Indexing.** Do you have sufficient metadata to get indexed? The search engines work off of content. If you have a sitemap, Google Webmaster Tools will tell you what percentage of your sitemap is indexed. You can use a search like [site:d.lib.ncsu.edu/collections](https://www.google.com/search?q=site%3Ad.lib.ncsu.edu%2Fcollections) to do a quick check of how many pages of your site are indexed. 

**Relevance.** Does your site get on the first page for the keywords you think should lead to your content? If not then you may not have or expose sufficient metadata to appear relevant. Word choice can be important and have effects on rank. Metadata creators could begin to adopt new tools like [Google AdWords Keyword Tool](https://adwords.google.com/select/KeywordToolExternal) which provide new ways of seeing the effect of metadata choices in the search engines. As users change the words they search for, we may need to change the terms we use to describe our content. 

There are many tactics from general search engine optimization which could figure in. Do you want your site content to compete with the content from many other sites for popular keywords? Is your site the authority on a topic? In some cases you may be able to drive more traffic to your site by ranking for keywords few others are competing for. Even though fewer users search for those terms if they are appropriate to your content you may get better ranking.

**Uniqueness.** Do you have unique titles? Google notices when too many pages have similar titles and may treat the content as duplicate. If you do reuse archival description as we do this can be a definite problem. One simple way around this is to include a unique identifier at the end of the title for the page.

Do each of your pages have enough content to distinguish one resource from another? This can be a big problem for digital collections sites where we make stuff accessible with repeated, minimal metadata before having enough metadata to really make them discoverable. It may be that it is only worthwhile to enhance some of your resources to make them more attractive.

If your content is reused on scattered sites on the Web that do not use [URL canonicalization](http://support.google.com/webmasters/bin/answer.py?hl=en&answer=139066) then you may also get penalized for duplicate content. This point is less about sufficient metadata than it is about taking care with how your metadata is used.

**Search Snippet.** It can make a big difference if you get an attractive search snippet in the search engines. Titles should be descriptive and put unique, interesting words at the front of the title as long titles often get truncated. While Google may use any part of a page for the description it is still worthwhile to create a good meta description. Descriptive URLs with title words can also help.

Beyond this [Schema.org](http://schema.org) can be used to provide data to potentially get a Rich Snippet. You can read my article on [HTML5 Microdata and Schema.org](http://journal.code4lib.org/articles/6400) in the Code4Lib Journal for more about digital collections and Rich Snippets. Many of the common types which libraries might use are currently not displaying Rich Snippets. (That's a problem we should talk about.)

Schema.org provides all of the properties that you could associate with a particular type of item, but it is not necessary to have every property for a type to have a chance of displaying a Rich Snippet. Each type of item will have different required properties for each of the search engines. Check [Google Rich Snippets help pages](http://support.google.com/webmasters/bin/topic.py?hl=en&topic=21997) to see whether you have sufficient metadata to trigger a Google Rich Snippet. For example a
[Recipe](http://support.google.com/webmasters/bin/answer.py?hl=en&answer=173379&topic=1088474&ctx=topic) will only display if it has a name and two of the following: 

* photo
* prepTime, cookTime, totalTime, or ingredients
* calories
* review (nested)

**Context.** Once someone gets to a website, especially if they get to a view of a single resource, it is important to orient the user to the site. Does the thing the user is looking at make sense without having arrived at the page through other pages on the same site? While much of this has to do with design, some of this context setting can be helped with better metadata and other page content.

**Further Discovery.** Metadata can help make the site sticky by providing other facets for exploring the site. So while site search and browse may be secondary to open Web search, it is still important to have metadata to provide some way to get to other parts of a site. For each bit of metadata which is indexed a resource page should provide a link to find similar resources. It is surprising how many interfaces do not do this at all or do it in a confusing way.

**Social.** Are you collecting enough metadata in a good format for exposing through social sharing buttons on your site? When you implement these buttons you can have some information pre-filled for the user that clicks the button. Making this content attractive can impact whether other folks come to your site based on their social network. For the most part this will be covered by good titles and descriptions, but as social search becomes more important this will be a space to watch.

## Other Web Uses For Metadata

Discoverability is only one part of how metadata can work on the web. There are many other external services that can be enabled and interoperability that can be powered by Web metadata. For instance syndication feeds rely on having dates for when resources are created and updated. 

In many cases metadata about something in turn becomes data for another purpose. The same metadata that can be used to trigger Rich Snippets could be [extracted and reused for metadata aggregations](/blog/dpla-strawman-technical-proposal/) and some data mining performed. Another application that will be possible is to have information for an Event from one Web application be dragged and dropped into a Web-based calendar or timeline application. Many of the services which this data could enable are yet to be implemented. 

## Conclusion

I hope I have begun to make the point that functionality on a site is only part of how your metadata functions. For public-facing sites it will be increasingly important to look at how your metadata works on the open Web.
