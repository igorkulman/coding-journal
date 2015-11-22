---
title: Generating all permutations of a list … how hard can that be?
author: Igor Kulman
layout: post
date: 2013-02-01
url: /generating-all-permutations-of-a-list-how-hard-can-that-be/
dsq_thread_id:
  - 1399741150
categories:
  - Functional programming
  - Programming in general
tags:
  - 'c#'
  - 'f#'
---
While reading an article that had nothing in common with programming I came upon a sudden need to find a way to generate all the permutations of a list, or more exactly a string (it is just a list of characters). As lazy as I am I tried to google a few examples of C# code that does exactly that. I was horrified that programmers could come up with the complicated ways I found. Not to mention programmers writing a ton of unit test and classes before actualy writing the code that solves to problem. 

The problem is naturaly recursive. All the permutations of a list of n items consit of each of the n items combined with all the permutations of the list without the actual item. So if you have a list of let&#8217;s say items (a,b,c), all the permutations are (a+permutation((b,c)) + (b+permutations((a,c))) + (c+permutations((a,b)).

First I came up with F# code to solve it, after some yield googling:

When I started to think about a C# solution I got stuck. The functional solution was still resonating in my head so I ended up basically rewriting F# to C#:

Looking for other functional solutions I found a realy neat way to generate permutations in Haskell, thanks to the generators