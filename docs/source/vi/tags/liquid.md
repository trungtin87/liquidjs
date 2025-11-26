---
title: liquid
---

Tag `liquid` cho phép nhúng code Liquid bên trong khối, thường dùng để tách biệt nội dung để phân tích hoặc render sau.

Ví dụ:
```liquid
{% liquid %}
  {{ 'hi' | upcase }}
{% endliquid %}
```
