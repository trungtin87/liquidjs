---
title: Truthy và Falsy
---

Mặc dù [Liquid][sl] độc lập với nền tảng, nhưng có [một số khác biệt nhất định][diff] với [phiên bản Ruby][ruby], một trong số đó là giá trị `truthy`.

## Bảng chân lý

Theo [tài liệu của Shopify](https://shopify.github.io/liquid/basics/truthy-and-falsy/), mọi thứ khác ngoài `false` và `nil` đều là truthy. Nhưng trong JavaScript, chúng ta có một hệ thống kiểu hoàn toàn khác, chúng ta có các kiểu như `undefined` và chúng ta không phân biệt `integer` và `float`, do đó mọi thứ hơi khác một chút:

giá trị | truthy | falsy
--- | --- | ---
`true` | ✔️ | 
`false` | | ✔️
`null` | | ✔️
`undefined` | | ✔️
`string` | ✔️ |	 
`empty string` | ✔️ |
`0` | ✔️ |
`integer` | ✔️ |
`float`	 | ✔️ |
`array` | ✔️ |
`empty array` | ✔️ |

## Sử dụng JavaScript Truthy

Lưu ý rằng liquidjs sử dụng tính đúng sai của Shopify theo mặc định. Nhưng nó có thể được chuyển đổi để sử dụng tính đúng sai của JavaScript tiêu chuẩn bằng cách đặt tùy chọn **jsTruthy** thành `true`.

giá trị | truthy | falsy
--- | --- | ---
`true` | ✔️ | 
`false` | | ✔️
`null` | | ✔️
`undefined` | | ✔️
`string` | ✔️ |	 
`empty string` | | ✔️
`0` | | ✔️
`integer` | ✔️ |
`float` | ✔️ |
`array` | ✔️ |
`empty array` | ✔️ |


[ruby]: https://shopify.github.io/liquid
[sl]: https://www.npmjs.com/package/liquidjs
[diff]: https://github.com/harttle/liquidjs#differences-and-limitations
