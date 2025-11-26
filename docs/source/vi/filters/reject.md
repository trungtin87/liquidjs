---
title: reject
---

Trả về mảng các phần tử không thoả điều kiện cho trước (ngược lại của `where`).

Ví dụ:
```liquid
{{ users | reject: "active" }}
```
