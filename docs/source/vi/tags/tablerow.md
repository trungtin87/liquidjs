---
title: tablerow
---

`tablerow` là một tag để hiển thị mảng dưới dạng bảng HTML, với hàng và cột tự động chia.

Ví dụ:
```liquid
{% tablerow product in products cols:3 %}
  {{ product.title }}
{% endtablerow %}
```
