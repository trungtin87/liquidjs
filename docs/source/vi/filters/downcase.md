---
title: downcase
---

{% since %}v1.9.1{% endsince %}

Chuyển đổi mỗi ký tự trong một chuỗi thành chữ thường. Nó không có tác dụng trên các chuỗi đã ở dạng chữ thường.

Đầu vào
```liquid
{{ "Parker Moore" | downcase }}
```

Đầu ra
```text
parker moore
```

Đầu vào
```liquid
{{ "apple" | downcase }}
```

Đầu ra
```text
apple
```
