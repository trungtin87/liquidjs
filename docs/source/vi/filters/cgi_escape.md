---
title: cgi_escape
---

Mã hoá một chuỗi theo chuẩn CGI/URL (percent-encoding) để an toàn trong URL.

Ví dụ:
```liquid
{{ "a b & c" | cgi_escape }}
```
