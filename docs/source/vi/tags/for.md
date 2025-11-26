---
title: for
---

Vòng lặp `for` lặp qua mảng hoặc phạm vi và hỗ trợ các biến vòng lặp như `forloop.index`.

Ví dụ:
```liquid
{% for item in items %}
  {{ forloop.index }}: {{ item }}
{% endfor %}
```
