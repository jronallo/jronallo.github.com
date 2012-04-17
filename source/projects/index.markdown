---
layout: page
title: "projects"
date: 2012-04-16 21:36
date updated: 2012-04-16
comments: true
sharing: true
footer: true
---

Besides what I have on [my public github account](https://github.com/jronallo),
I have worked on internal projects that have not been open sourced.
This is a space where I can list projects I have worked on and give
a litle information on each. 

## Special Collections Asset Management System (SCAMS)

The Special Collections Asset Management System is a web application for managing 
descriptive metadata for the Special Collections Research Center digital collections. 
The application is particularly atuned to managing the lifecycle of metadata.

SCAMS started as an Access datebase, before I came to NCSU Libraries. It became
clear quickly that further automation would be more difficult than it needed to
be if we continued to use Access. We needed something better, but needed to 
continue to create metadata. The first step was a migration from using an
Access database to using MySQL while continuing to use the Access front end.
This allowed us to continue operations as I developed a new web application on
top of the same database.

Initial development for the SCAMS web application was creation of stub records
for batches of digitized images. This would allow us to publish new materials
more quickly rather than waiting for metadata enhancement. It would also save
time as some repeated values like rights and classification could be applied
to all records in the batch.

After metadata editing functionality was further built out we moved to using 
the web application instead of the Access database. Quick ways to move through
resources that need editing and keyboard shortcuts where added to improve
efficiency. Since then some batch editing functionality has been added.
Validations were added to improve data integrity and catch issues before they
could get to a quality control stage.

The name was chosen to distinguish it from other digital asset managment needs
within the library. SCAMS tries to optimize for the digitized (and born digital)
collections workflow. It is not intended to be a digital asset management system
for all purposes.

SCAMS is also responsible for indexing resources to Solr. Other applications can
then reuse the Solr index for various discovery interfaces. SCAMS also provides
some web APIs to more simply expose the metadata to other developers. We also
mapped the database to MODS so that we could contribute records to the RDA test.

I am currently the sole developer of SCAMS. It continues to undergo development
as new needs and opportunities are identified. Iterative development allows us
to continue to improve the tool in new directions. Technologies used include Ruby,
Rails, Solr, MySQL, and Blacklight.

## Steady 

This project solved the simple problem of how to convert CSV files into EAD XML.
Initially, I would get a CSV file via email and run a script to do the conversion.
The library though was written in such a way that made it easy to place a simple
web application over top of it. [Steady](http://steady.heroku.com/) now runs 
for free with the cloud provider Heroku. Libraries from around the world are
regularly using this tool. It has proven to be useful beyond 
[our initial use cases](http://steady.heroku.com/pages/about) for things like
converting legacy container lists into EAD.

## NCSU Libraries Digital Collections: Rare and Unique Materials

[NCSU Libraries Digital Collections](http://d.lib.ncsu.edu/collections) is a
public-facing search and discovery application. Two features make this 
Blacklight-backed application unique.

The application 
event tracking
(YKK: write more about event tracking.)

The site adapts to different widths and devices. This is known as responsive 
design and is implemented using CSS media queries. This technique allows me to
maintain a single application that works across devices rather than attempting
to maintain and keep in sync a desktop and mobile version. Based on analytics
of site visits iOS devices were targeted.



