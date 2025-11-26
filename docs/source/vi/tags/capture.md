---
title: capture
---

Tag `capture` gán nội dung của một khối vào một biến để sử dụng sau.

Ví dụ:
```liquid
{% capture greeting %}
  Hello {{ name }}
{% endcapture %}
{{ greeting }}
```
