---
title: Creating a Books Page
description: How and why I decided to create a Books page to keep track of my reading.
date: 2025-01-05 21:43:00
tags:
  - personal
---

tl;dr: Go to my [Books](/books) page.

I used to use Goodreads to keep track of my books, but it has been several years since I last updated my account.

Instead, I started keeping track of my books here on my website. For [2023](/posts/2023/books-of-2023) and [2024](/posts/2024/books-of-2024), I simply updated a post for each year for books I'm currently reading, have finished, decided to not continue (for one reason or another), and potential books.

While this is simple enough, I've now decided to list every book on a single page, the source of which could be changed from a single source of data (in this case, a simple JSON file). Here's how I did it.

## Collect the data

1. Download a CSV of my Goodreads data
2. Clean up the data

## Transform the data

1. Cleaned data to JSON
2. Get the ISBN data
3. Get the cover art
4. Get links to books
5. Add a rating, if needed

## Display the data

1. Organize by year
2. Create the layout
3. Show the cover art, including default
4. Show data, including rating
