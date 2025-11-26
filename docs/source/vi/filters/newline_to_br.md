---
title: newline_to_br
---

Thay thế ký tự xuống dòng (`\n`) bằng thẻ HTML `<br />`.

Ví dụ:
```liquid
{{ "line1\nline2" | newline_to_br }} => line1<br />line2
```
