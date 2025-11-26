---
title: escape
---

{% since %}v1.9.1{% endsince %}

Trốn các ký tự đặc biệt HTML bằng cách thay thế chúng bằng các entity escape. Nếu chuỗi không có ký tự cần escape thì không thay đổi.

Input
```liquid
{{ "Have you read 'James & the Giant Peach'?" | escape }}
```

Output
<pre class="highlight">
{{"Have you read &#39;James &amp; the Giant Peach&#39;?" | escape}}
</pre>

Input
```liquid
{{ "Tetsuro Takara" | escape }}
```

Output
```text
Tetsuro Takara
```
