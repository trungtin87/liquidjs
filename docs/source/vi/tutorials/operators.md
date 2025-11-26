---
title: Các toán tử (Operators)
---

Các toán tử trong LiquidJS khá đơn giản và khác biệt. Có 2 loại toán tử được hỗ trợ:

* Toán tử so sánh: `==`, `!=`, `>`, `<`, `>=`, `<=`
* Toán tử logic: `not`, `or`, `and`, `contains`

Vì vậy các toán tử số học thông thường không được hỗ trợ và bạn không thể cộng hai số trực tiếp như `{% raw %}{{a + b}}{% endraw %}`; thay vào đó cần dùng filter `{% raw %}{{ a | plus: b}}{% endraw %}`. Thật ra `+` còn có thể là một tên biến hợp lệ trong LiquidJS.

## Ưu tiên (Precedence)

1. Toán tử so sánh và `contains`. Tất cả các toán tử so sánh cùng `contains` có cùng mức ưu tiên cao nhất.
2. Toán tử `not`. Nó có mức ưu tiên cao hơn một chút so với `or` và `and`.
3. Toán tử `or` và `and`. Các toán tử logic này có mức ưu tiên thấp nhất.

## Tính kết hợp (Associativity)

Các toán tử logic được đánh giá từ phải sang trái (right-to-left), xem [tài liệu Shopify][operator-order].

[operator-order]: https://shopify.dev/docs/api/liquid/basics#order-of-operations
