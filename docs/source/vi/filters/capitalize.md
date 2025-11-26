---
title: capitalize
---

{% since %}v1.9.1{% endsince %}

Viết hoa ký tự đầu tiên của một chuỗi.

Đầu vào
```liquid
{{ "title" | capitalize }}
```

Đầu ra
```text
Title
```

`capitalize` chỉ viết hoa ký tự đầu tiên của một chuỗi, các từ sau đó không bị ảnh hưởng:

Đầu vào
```liquid
{{ "my great title" | capitalize }}
```

Đầu ra
```text
My great title
```
