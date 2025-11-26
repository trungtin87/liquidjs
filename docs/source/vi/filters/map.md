---
title: map
---

Trích xuất một thuộc tính từ từng phần tử của mảng và trả về mảng mới chứa các giá trị đó.

Ví dụ:
```liquid
{{ users | map: "name" }} => ["Alice", "Bob"]
```
