---
title: raw
---

Tag `raw` bảo đảm rằng nội dung bên trong khối không bị xử lý bởi trình phân tích Liquid (giữ nguyên nguyên bản).

Ví dụ:
```liquid
{% raw %}
  {{ not_a_variable }}
{% endraw %}
```
