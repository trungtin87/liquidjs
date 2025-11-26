---
title: unshift
---

Thêm một giá trị vào đầu mảng và trả về mảng mới.

Ví dụ:
```liquid
{% assign a = [2,3] %}
{{ a | unshift: 1 }} => [1,2,3]
```
