---
title: reject_exp
---

{% since %}v10.21.0{% endsince %}

Chọn tất cả các đối tượng trong một mảng mà biểu thức là sai. Trong ví dụ này, giả sử bạn có một danh sách các sản phẩm và bạn muốn ẩn các sản phẩm nhà bếp của mình. Sử dụng `reject_exp`, bạn có thể tạo một mảng bỏ qua các sản phẩm có `"type"` là `"kitchen"`.

Đầu vào
```liquid
Tất cả sản phẩm:
{% for product in products %}
- {{ product.title }}
{% endfor %}

{% assign non_kitchen_products = products | reject_exp: "item", "item.type == 'kitchen'" %}

Sản phẩm không phải đồ bếp:
{% for product in non_kitchen_products %}
- {{ product.title }}
{% endfor %}
```

Đầu ra
```text
Tất cả sản phẩm:
- Vacuum
- Spatula
- Television
- Garlic press

Sản phẩm không phải đồ bếp:
- Vacuum
- Television
```

[truthy]: ../tutorials/truthy-and-falsy.html
