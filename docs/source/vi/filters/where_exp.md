---
title: where_exp
---

Lọc mảng trả về các phần tử thoả biểu thức (expression) cho trước.

Ví dụ:
```liquid
{{ users | where_exp: 'age > 18' }}
```
