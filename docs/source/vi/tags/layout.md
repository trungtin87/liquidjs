---
title: Layout
---

{% since %}v1.9.1{% endsince %}

## Sử dụng Layout

Giới thiệu một mẫu layout để mẫu hiện tại hiển thị trong đó. Thư mục cho các tệp layout được xác định bởi [layouts][layouts] hoặc [root][root].

```liquid
// default-layout.liquid
Header
{% block %}{% endblock %}
Footer

// page.liquid
{% layout "default-layout.liquid" %}
{% block %}Nội dung trang của tôi{% endblock %}

// kết quả
Header
Nội dung trang của tôi
Footer
```

Nếu tùy chọn [extname][extname] được đặt, phần mở rộng `.liquid` sẽ trở thành tùy chọn:

```liquid
{% layout 'default-layout' %}
```

{% note info Scoping %}
Khi một mẫu cục bộ được hiển thị bởi `layout`, mẫu của nó có quyền truy cập vào các biến của trình gọi nhưng không ngược lại. Các biến được xác định trong layout sẽ bị loại bỏ trước khi quyền điều khiển trả về cho trình gọi của nó.
{% endnote %}

## Nhiều khối

Tệp layout có thể chứa nhiều khối, mỗi khối có một tên được chỉ định. Các đoạn mã sau đây cho kết quả tương tự như trong ví dụ trên.

```liquid
// default-layout.liquid
{% block header %}{% endblock %}
{% block content %}{% endblock %}
{% block footer %}{% endblock %}

// page.liquid
{% layout "default-layout.liquid" %}
{% block header %}Header{% endblock %}
{% block content %}Nội dung trang của tôi{% endblock %}
{% block footer %}Footer{% endblock %}
```

## Nội dung khối mặc định

Trong các tệp layout ở trên, các khối có nội dung trống. Nhưng nó không nhất thiết phải trống, trong trường hợp đó, nội dung khối trong tệp layout sẽ được sử dụng làm mẫu mặc định. Các đoạn mã sau đây cũng tương đương với các ví dụ trên:

```liquid
// default-layout.liquid
{% block header %}Header{% endblock %}
{% block content %}{% endblock %}
{% block footer %}Footer{% endblock %}

// page.liquid
{% layout "default-layout.liquid" %}
{% block content %}Nội dung trang của tôi{% endblock %}
```

## Truyền biến

Các biến được xác định trong mẫu hiện tại có thể được truyền đến mẫu layout bằng cách liệt kê chúng dưới dạng tham số trên thẻ `layout`:

```liquid
{% assign my_variable = 'apples' %}
{% layout 'name', my_variable: my_variable, my_other_variable: 'oranges' %}
```

## Đầu ra & Bộ lọc

Khi tên tệp được chỉ định dưới dạng chuỗi ký tự, nó hỗ trợ cú pháp đầu ra và bộ lọc Liquid. Hữu ích khi nối các chuỗi cho một tên tệp phức
cạp.

```liquid
{% layout "prefix/{{name | append: \".html\"}}" %}
```

{% note info Escaping %}
Trong LiquidJS, `"` trong các chuỗi ký tự được trích dẫn cần phải được thoát. Thêm một dấu gạch chéo trước dấu ngoặc kép, ví dụ: `\"`. Sử dụng tên tệp giống Jekyll có thể làm cho điều này dễ dàng hơn, xem bên dưới.
{% endnote %}

## Tên tệp giống Jekyll

Đặt [dynamicPartials][dynamicPartials] thành `false` sẽ bật tên tệp giống Jekyll, tên tệp được chỉ định dưới dạng chuỗi ký tự. Và nó cũng hỗ trợ các đầu ra và bộ lọc Liquid.

```liquid
{% layout prefix/{{ page.my_variable }}/suffix %}
```

Bằng cách này, bạn không cần phải thoát `"` trong biểu thức tên tệp.

```liquid
{% layout prefix/{{name | append: ".html"}} %}
```

[extname]: /api/interfaces/LiquidOptions.html#extname
[root]: /api/interfaces/LiquidOptions.html#root
[layouts]: /api/interfaces/LiquidOptions.html#layouts
[dynamicPartials]: /api/interfaces/LiquidOptions.html#dynamicPartials
