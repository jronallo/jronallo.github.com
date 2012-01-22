---
date: '2007-09-25 15:45:30'
layout: post
slug: worldcat-identities-change
status: publish
title: WorldCat Identities Change
wordpress_id: '5'
categories:
- OCLC
- ruby
- WorldCat Identities
tags:
- authorities
- disappiontment
- OCLC
- ruby
- zcc
published: false
---

I meant to get this out a week or two ago. Seems as if there's been a little, but possibly significant change in the way WorldCat Identities works. Before you could get directly to a WCID record by knowing the proper base link and the [NACO normalization](http://www.loc.gov/catdir/pcc/naco/normrule.html) of the name (1XX). The NACO normalization seems to be what some [FRBRizations](http://www.oclc.org/research/projects/frbr/algorithm.htm) use to match identities. Just matching normalized strings. This value was marked up in the xml of the Identities records as the 'pnkey.' For most names you could very easily normalize it and get directly to the record you want, especially if you had a MARC record that already had authority work done on it. The resulting link would look something like: http://orlabs.oclc.org/SRW/search/Identities?query=local.pnkey+exact+%22fforde,%20jasper%22

I was hoping to use WCID as a way to easily grab [MARCXML authority records](http://errol.oclc.org/laf/n79-71307.MarcXML) from the [Linked Authority File](http://alcme.oclc.org/laf/index.html) (see the bottom of any WCID record's page for the link). I thought this would be a nice feature to add into [my little Ruby copy cataloging script](http://zcc.rubyforge.org/zcc.html). It would have been nice to have the ability to grab authority records at the same time as cataloging and maybe enrich the bibliographic record with such things as a [link to wikipedia](http://orlabs.oclc.org/Identities/key/lccn-n79-71307#linklinks) or back to the WCID record.

To make sure I was able to generate the links properly I was working on a little Ruby library to do the NACO normalizations correctly. I invested a lot of time in learning how to pack a hex number representing the UTF-16 value for a letter into the UTF-8 version. The [python example for NACO normalizations](http://www.oclc.org/research/researchworks/naco/default.htm) used the UTF-16 value so instead of looking up and calculating all the UTF-8 octals I wanted to just use these values directly.  I spent time with Iconv for Ruby trying to get diacritic stripping transliteration to work before realizing that it wasn't very portable since it relied on system locales. In fact I could get Iconv to do proper transliteration to ASCII from UTF-8 in irb, but as soon as I tried it in a script it failed replacing everything with a diacritic with a '?'. I took a look at the ICU4R library but couldn't get it to compile on my system. Finally I fell back on the older Unicode gem to do decomposing normalizations and then strip out every byte above 127 which would include all those diacritics. Of course there's an [OCLC web service for NACO normalization](http://www.oclc.org/research/researchworks/naco/default.htm) but I wanted to learn some of this stuff anyways.

I think I had it mostly working when I wanted to take a look at some of the WCID pnkeys to make sure I had all the spacing correct for a good match. The site seemed down since a link directly to one of the records I often took a look at threw an ugly error. Since the site has been in beta I've often seen these types of errors, so I went to the homepage instead. The homepage came up. Searching a name also threw an error so I clicked on the tag cloud.

I discovered that now WCID has changed the pnkey to be the 010$a from the LC authority record with "lccn-" tacked onto the front. The links look nicer (more RESTful?): [http://orlabs.oclc.org/Identities/key/lccn-n79-21164](http://orlabs.oclc.org/Identities/key/lccn-n79-21164)  But you're no longer able to get directly to the record unless you already know the LC control number for the authority record.

It's still to be seen what other kind of valid links you might be able to create with WCID, but for now it's not looking good for what I had hoped to do. I can't get to an authority record I don't have if I need information from that record to get there. They've cut off my one simple route to the information I want. It may be that I'll have to do a two step process: search first and then have a way to pick the proper record. More cumbersome than I had hoped for sure. It looks to me as if OCLC may have made WCID less generally useful. It's a beautiful project but if I can't have an API to it or have to wade through a couple step process and parse all the xml myself, then it's not really very useful.

It'll be interesting to see what happens but I don't know that I'll be touching anything from OCLC in the future until it's out of beta. Lesson learned.

Update: Searching WCID now works. It seems for entities without authority records they still use a normalized form of the name as their pnkey.
