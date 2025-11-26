---
title: url_decode
---

Giải mã chuỗi đã được mã hoá trong URL (percent-encoding) trở về dạng ban đầu.

Ví dụ:
```liquid
{{ "a%20b" | url_decode }} => "a b"
```
