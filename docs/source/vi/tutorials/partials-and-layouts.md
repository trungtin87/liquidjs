---
title: Partials và Layouts
---

## Render Partials

Đối với các tệp mẫu sau:

```
// file: color.liquid
color: '{{ color }}' shape: '{{ shape }}'

// file: theme.liquid
{% assign shape = 'circle' %}
{% render 'color.liquid' %}
{% render 'color.liquid' with 'red' %}
{% render 'color.liquid', color: 'yellow', shape: 'square' %}
```

Đầu ra sẽ là:

```
color: '' shape: 'circle'
color: 'red' shape: 'circle'
color: 'yellow' shape: 'square'
```

Để biết thêm chi tiết, vui lòng tham khảo thẻ [render](../tags/render.html).

{% note tip The &quot;.liquid&quot; Extension %}
Phần mở rộng ".liquid" trong <code>layout</code>, <code>render</code> và <code>include</code> có thể được bỏ qua nếu phiên bản Liquid được tạo bằng tùy chọn `extname: ".liquid"`. Xem <a href="./options.html#extname">tùy chọn extname</a> để biết chi tiết.
{% endnote %}

## Mẫu Layout (Mở rộng)

Đối với các tệp mẫu sau:

```
// file: default-layout.liquid
Header
{% block content %}Nội dung mặc định của tôi{% endblock %}
Footer

// file: page.liquid
{% layout "default-layout.liquid" %}
{% block content %}Nội dung trang của tôi{% endblock %}
```

Đầu ra của `page.liquid`:

```
Header
Nội dung trang của tôi
Footer
```

Để biết thêm chi tiết, vui lòng tham khảo thẻ [layout](../tags/layout.html).
