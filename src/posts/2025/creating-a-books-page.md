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

My book data is scattered across a few different places: Goodreads, my Calibre library, my website, and somewhere else probably. I started with downloading my existing Goodreads data. There are two places in Goodreads to download data, account data and library data. After 10 minutes of digging into that data export did I realize it contains next to no personal book data. The real book data is exported by going to [My Books > Import and Export](https://www.goodreads.com/review/import).

The Goodreads library export includes lots of data I didn't need for my purposes. Using the simple [csvtojson](https://www.npmjs.com/package/csvtojson) package, I created a script to get the data I wanted in an initial format I was looking for. I combined that data with the data from my website^[Part of doing this new Books page is because my website's book data was stored in the markdown. I had to manually collect this data, and I should've used a better data format initially.] and from my Calibre library^[Calibre probably has a way to track books but I had to make some assumptions based on when I last modified a book's data file.]. I cleaned up any duplicate entries, made sure all the fields were there, and threw it all in a new JSON file.

## Enhance the data

1. Get the ISBN or any other missing data
2. Get link to cover art
   - Most are from OpenLibrary
   - Rest are from Goodreads or elsewhere
3. Get links to books
4. Add a rating, if needed

The compiled JSON of book data had the basic data I wanted: title, author, and status. But most were missing some data, such as ISBN number, Goodreads ID, my personal rating, or relevant dates. I only needed extended data for read books, so I added my rating, an approximate date that I finished reading, and added identifiers manually.

To display covers for books I'm reading or have read, I planned to use the [OpenLibrary Covers API](https://openlibrary.org/dev/docs/api/covers) to get the cover art URLs. Each book in OpenLibrary has multiple editions, each with their own artwork. Rarely did two editions share the exact same image; there were differences in color, size, and quality. I wanted decent quality covers, so I would have to manually select the ISBN of the edition (and accompanying cover). But as I mentioned, I was missing the ISBNs for many books.

To aid in both these issues, I created another script to do two things. First, I searched OpenLibrary by title and author to just get an ISBN and a URL to the entry. With the URL, I then visited the page for each book and grabbed the ISBN for the edition that had the cover I wanted. The second part of the script would use the ISBN to query OpenLibrary to get the medium-sized cover URL for that book. Finally, the script would augment my JSON data with the updated data.

This script got me 95%-ish completed data. Unfortunately, OpenLibrary couldn't find a couple books, or they didn't have any good quality covers. For these items, I manually added a link to the Goodreads cover image URL.

With that, I finally had all the data I needed to display my books.

## Display the data

1. Organize by year
2. Create the layout
3. Show the cover art, including default
4. Show data, including rating

Inspired by a few others' pages I've seen recently, I wanted to show my books in a grid. Each entry would show the cover, date read, whether it was the audiobook version, and a star for 4+ ratings. Initially I wanted to group by year, but decided to lump all in one, ordered by date descending.

First, I added the `books.json` file to my 11ty `_data` directory. The books were already in the right order but for future-proofing, I have some sorting filters to handle sorting by dateRead or title.

## Thoughts

- I read a lot of fiction, I'd like to read more nonfiction.
- I probably could've simplified some of the scripts, or skipped a step
