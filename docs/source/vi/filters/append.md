---
title: append
---

{% since %}v1.9.1{% endsince %}

Nối hai chuỗi và trả về giá trị đã nối.

Input
```liquid
{{ "/my/fancy/url" | append: ".html" }}
```

Output
```text
/my/fancy/url.html
```

`append` cũng có thể được dùng với biến:

Input
```liquid
{% assign filename = "/index.html" %}
{{ "website.com" | append: filename }}
```

Output
```text

website.com/index.html
```
