---
title: Creating a Books Page
description: How and why I decided to create a Books page to keep track of my reading.
date: 2025-01-05 21:43:00
tags:
  - personal
  - reading
---

tl;dr: Go to my [/books](/books) page.

For the past couple years, I kept track of my books here on my website. For [2023](/posts/2023/books-of-2023) and [2024](/posts/2024/books-of-2024), I simply updated a post listing the books I'm currently reading, have finished, did not finish, and want to read.

This is simple enough of course, but I've now decided to list every book on a single page. The source of data for the page could be managed from a simple JSON file. Moving the data from the post pages to JSON was straightforward enough.

I also used to use Goodreads to keep track of my books, but it has been several years since I last updated my account, which has plenty of data that I'd like to use for this. Unfortunately, they [stopped offering API keys in December 2020](https://www.goodreads.com/api), which probably would've made getting this data a bit simpler.

Anyways, here's how I built the [/books](/books) page.

## Collect the data

1. Download a CSV of my Goodreads data
   - This is under [My Books > Import and Export](https://www.goodreads.com/review/import), not account settings
2. Create a script to clean up the data
3. Merge data from Goodreads with my personal data
   - Includes data from website plus my personal Calibre library

## Extend the data

1. Get the ISBN or any other missing data
2. Get link to cover art
   - Most are from OpenLibrary
   - Rest are from Goodreads or elsewhere
3. Get links to books
4. Add a rating, if needed

## Display the data

1. Organize by year
2. Create the layout
3. Show the cover art, including default
4. Show data, including rating

## Thoughts

- I read a lot of fiction, I'd like to read more nonfiction.
