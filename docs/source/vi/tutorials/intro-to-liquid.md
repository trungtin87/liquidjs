---
title: Ngôn ngữ mẫu Liquid
describe: Giới thiệu ngắn về ngôn ngữ mẫu Liquid và một vài ví dụ đơn giản.
---

LiquidJS là một engine mẫu (template engine) đơn giản, biểu cảm và an toàn tương thích với [Shopify][shopify/liquid] / GitHub Pages, viết hoàn toàn bằng JavaScript. Mục đích của repo này là cung cấp một triển khai chuẩn của Liquid cho cộng đồng JavaScript. Liquid ban đầu được triển khai bằng Ruby và được sử dụng bởi GitHub Pages, Jekyll và Shopify, xem [Khác biệt với Shopify/liquid][diff].

Cú pháp của LiquidJS khá đơn giản. Có 2 loại ký hiệu (markup) trong LiquidJS:

- **Tags (thẻ)**. Một tag bao gồm tên tag và các đối số tùy chọn, được bọc giữa `{%raw%}{%{%endraw%}` và `%}`.
- **Outputs (đầu ra)**. Output gồm một giá trị và danh sách các filter (tùy chọn), được bọc giữa `{%raw%}{{{%endraw%}` và `}}`.

{% note info Live Demo %}
Trước khi đi vào chi tiết, đây là một demo trực tiếp để bạn thử: <https://liquidjs.com/playground.html>.
{% endnote %}

## Outputs

**Outputs** được dùng để xuất (render) các biến, các biến này có thể được biến đổi bởi các filter trước khi đưa ra HTML. Template dưới đây sẽ chèn giá trị của `username` vào thuộc tính `value` của input:

```liquid
<input type="text" name="user" value="{{username}}">
```

Giá trị trong output có thể được biến đổi bằng **filter** trước khi xuất. Ví dụ để nối một chuỗi vào sau biến:

```liquid
{{ username | append: ", welcome to LiquidJS!" }}
```

Các filter có thể được xâu chuỗi (chained):

```liquid
{{ username | append: ", welcome to LiquidJS!" | capitalize }}
```

Danh sách đầy đủ các filter được LiquidJS hỗ trợ có thể tìm thấy [tại đây](../filters/overview.html).

## Tags

**Tags** được dùng để điều khiển quá trình kết xuất template, thao tác biến, tương tác với các template khác, v.v. Ví dụ `assign` được dùng để khai báo một biến có thể dùng sau đó trong template:

```liquid
{% assign foo = "FOO" %}
```

Thường các tag xuất hiện theo cặp gồm một tag bắt đầu và một tag kết thúc tương ứng. Ví dụ:

```liquid
{% if foo == "FOO" %}
    Biến `foo` bằng "FOO"
{% else %}
    Biến `foo` không bằng "FOO"
{% endif %}
```

Danh sách đầy đủ các tag được LiquidJS hỗ trợ có thể tìm thấy [tại đây](../tags/overview.html).

[shopify/liquid]: https://github.com/Shopify/liquid
[diff]: ./differences.html
