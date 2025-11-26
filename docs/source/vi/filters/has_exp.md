---
title: has_exp
---

Kiểm tra xem collection có phần tử thoả biểu thức (expression) hay không.

Ví dụ:
```liquid
{{ users | has_exp: 'age > 18' }} => true/false
```
