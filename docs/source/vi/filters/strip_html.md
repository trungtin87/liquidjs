---
title: strip_html
---

{% since %}v1.9.1{% endsince %}

Loại bỏ tất cả thẻ HTML khỏi một chuỗi.

Input
```liquid
{{ "Have <em>you</em> read <strong>Ulysses</strong>?" | strip_html }}
```

Output
```text
Have you read Ulysses?
```
