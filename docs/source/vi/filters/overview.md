---
title: Bộ lọc
description: Mô tả và demo cho mỗi bộ lọc Liquid
---

LiquidJS triển khai các bộ lọc độc lập với logic nghiệp vụ thường được triển khai trong [shopify/liquid][shopify/liquid]. Phần này chứa đặc tả và demo cho tất cả các bộ lọc được triển khai bởi LiquidJS.

Có hơn 40 bộ lọc được LiquidJS hỗ trợ. Các bộ lọc này có thể được phân loại vào các nhóm sau:

Loại | Bộ lọc
--- | ---
Toán học | plus, minus, modulo, times, floor, ceil, round, divided_by, abs, at_least, at_most
Chuỗi | append, prepend, capitalize, upcase, downcase, strip, lstrip, rstrip, strip_newlines, split, replace, replace_first, replace_last,remove, remove_first, remove_last, truncate, truncatewords, normalize_whitespace, number_of_words, array_to_sentence_string
HTML/URI | escape, escape_once, url_encode, url_decode, strip_html, newline_to_br, xml_escape, cgi_escape, uri_escape, slugify
Mảng | slice, map, sort, sort_natural, uniq, where, where_exp, group_by, group_by_exp, find, find_exp, first, last, join, reverse, concat, compact, size, push, pop, shift, unshift
Ngày | date, date_to_xmlschema, date_to_rfc822, date_to_string, date_to_long_string
Khác | default, json, jsonify, inspect, raw, to_integer
Base64 | base64_encode, base64_decode

[shopify/liquid]: https://github.com/Shopify/liquid
