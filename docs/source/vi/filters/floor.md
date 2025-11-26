---
title: floor
---

{% since %}v1.9.1{% endsince %}

Làm tròn xuống số nguyên gần nhất. LiquidJS sẽ cố gắng chuyển đổi đầu vào thành một số trước khi áp dụng bộ lọc.

Đầu vào
```liquid
{{ 1.2 | floor }}
```

Đầu ra
```text
1
```

Đầu vào
```liquid
{{ 2.0 | floor }}
```

Đầu ra
```text
2
```

Đầu vào
```liquid
{{ 183.357 | floor }}
```

Đầu ra
```text
183
```

Ở đây, giá trị đầu vào là một chuỗi:

Đầu vào
```liquid
{{ "3.5" | floor }}
```

Đầu ra
```text
3
```
