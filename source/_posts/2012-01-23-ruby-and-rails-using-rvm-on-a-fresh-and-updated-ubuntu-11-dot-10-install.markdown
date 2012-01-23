---
layout: post
title: "Ruby and Rails using RVM on a fresh and updated Ubuntu 11.10 install"
date: 2012-01-23 09:53
comments: true
categories: ruby, rails, ubuntu
---

Here are the steps I took to install Ruby and Rails on a fresh and updated 
Ubuntu 11.10 install. The two places where there were hiccups involved having
to install openssl through rvm and updating to a more recent version of 
rubygems. Some steps are thrown in there just to show how rvm provides 
some information.

<!-- more -->

```bash
sudo apt-get update

sudo apt-get upgrade

sudo apt-get install build-essential openssl libreadline6 libreadline6-dev curl git-core zlib1g zlib1g-dev libssl-dev libyaml-dev libsqlite3-0 libsqlite3-dev sqlite3 libxml2-dev libxslt-dev autoconf libc6-dev ncurses-dev automake libtool bison subversion ruby ncurses-term mercurial ruby-dev exuberant-ctags libnotify-bin curl autoconf make automake ssh openjdk-6-jdk git-core git-doc imagemagick postgresql-contrib libpq-dev postgresql pgadmin3 vim vim-rails

bash -s stable < <(curl -s https://raw.github.com/wayneeseguin/rvm/master/binscripts/rvm-installer)

echo '[[ -s "$HOME/.rvm/scripts/rvm" ]] && . "$HOME/.rvm/scripts/rvm" # Load RVM function' >> ~/.bash_profile

source .bash_profile

rvm get head

# openssl in ubuntu 11.10 has a problem, so we install an older version
rvm pkg install openssl

# then we compile our ruby against the older version of openssl
rvm install ree-1.8.7-2011.03 --with-openssl-dir=$rvm_path/usr

rvm use ree-1.8.7-2011.03

# this update rubygems to the latest version which works
gem update --system

rvm info

rvm gemset create test

rvm use ree-1.8.7-2011.03@test

rvm info

gem list

gem install rails

gem list

mkdir code

cd code

rails new testapp
```
