---
title: case
---

`case`/`when` cung cấp cấu trúc điều kiện tương tự `switch` để so sánh nhiều nhánh.

Ví dụ:
```liquid
{% case status %}
  {% when "open" %} Open
  {% when "closed" %} Closed
{% endcase %}
```
