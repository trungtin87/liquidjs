---
title: group_by
---

Nhóm các phần tử trong mảng theo một thuộc tính và trả về object với các nhóm.

Ví dụ:
```liquid
{{ users | group_by: "role" }}
```
