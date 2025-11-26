---
title: default
---

{% since %}v1.9.1{% endsince %}

Trả về giá trị mặc định nếu biến là `nil` hoặc rỗng.

Input
```liquid
{{ user.name | default: "Anonymous" }}
```

Output
```text
Anonymous
```
