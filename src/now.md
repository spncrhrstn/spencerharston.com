---
layout: layouts/default
title: Now
description: A somewhat up-to-date list of stuff I'm currently pursuing, consuming, or being entertained by.
---

{{ description }}

## Books
{%- for book in media.now.books %}
* {{ book.title }} by {{ book.author }}
{%- endfor %}

## Shows
{%- for show in media.now.shows %}
* {{ show.title }}
{%- endfor %}

## Games
{%- for game in media.now.games %}
* {{ game.title }}
{%- endfor %}

