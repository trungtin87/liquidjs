---
title: Kiểm soát khoảng trắng
---

Để giữ cho mã nguồn gọn gàng và được thụt lề, chúng ta thường thêm các khoảng trắng vào mẫu của mình. LiquidJS cung cấp các khả năng kiểm soát khoảng trắng để loại bỏ các khoảng trắng không mong muốn này trong HTML đầu ra.

## qua Markups

Theo mặc định, tất cả các dòng thẻ và đánh dấu đầu ra sẽ tạo ra một NL (\n), và các khoảng trắng nếu có bất kỳ thụt lề nào. Ví dụ:

```liquid
{%  author = "harttle" %}
{{ author }}
```

Đầu ra (lưu ý dòng trống):

```

harttle
```

Chúng ta có thể bao gồm dấu gạch ngang trong cú pháp thẻ của mình ({% raw %}{{-{% endraw %}, -}}, {% raw %}{%-{% endraw %}, -%}) để loại bỏ khoảng trắng từ bên trái hoặc bên phải. Ví dụ:

```liquid
{% assign author = "harttle" -%}
{{ author }}
```

Đầu ra:

```
harttle
```

Trong trường- hợp này, -%}} loại bỏ khoảng trắng từ phía bên phải của thẻ `assign`.

## qua Tùy chọn

Ngoài ra, LiquidJS cung cấp các tùy chọn cho mỗi công cụ này để bật kiểm soát khoảng trắng mà không cần thay đổi sâu rộng các mẫu của bạn:

* `trimTagLeft`
* `trimTagRight`
* `trimOutputLeft`
* `trimOutputRight`

[LiquidJS][liquidjs] sẽ **KHÔNG** loại bỏ bất kỳ khoảng trắng nào theo mặc định, tức là các tùy chọn trên đều mặc định là `false`. Để biết chi tiết về các tùy chọn này, hãy xem [tùy chọn][options].

## Chế độ tham lam

Trong chế độ tham lam (được bật bởi [tùy chọn tham lam][greedy]), tất cả các ký tự khoảng trắng liên tiếp (bao gồm \n) sẽ bị loại bỏ. Chế độ tham lam được bật theo mặc định để tuân thủ [shopify/liquid][shopify/liquid].

[shopify/liquid]: https://github.com/Shopify/liquid
[liquidjs]: https://github.com/harttle/liquidjs
[options]: /api/interfaces/LiquidOptions.html
[greedy]: /api/interfaces/LiquidOptions.html#greedy
