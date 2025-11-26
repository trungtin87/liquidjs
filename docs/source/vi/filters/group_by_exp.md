---
title: group_by_exp
---

Nhóm các phần tử theo một biểu thức (expression) tuỳ chỉnh.

Ví dụ:
```liquid
{{ users | group_by_exp: 'age > 30' }}
```
