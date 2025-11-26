---
title: Plugins
---

Một số thẻ và bộ lọc có thể được đóng gói thành một **plugin**, thường sẽ được cài đặt qua npm. Bài viết này cung cấp thông tin về cách tạo và sử dụng plugin.

## Viết một Plugin

Một plugin liquidjs là một hàm đơn giản nhận [Lớp Liquid][liquid] làm tham số đầu tiên và phiên bản Liquid cho `this`. Chúng ta có thể gọi các API liquidjs trên `this` để thực hiện một số thay đổi nhất định, đặc biệt là [đăng ký bộ lọc và thẻ][register].

Bây giờ chúng ta sẽ tạo một plugin để viết hoa mọi chữ cái của đầu vào, lưu đoạn mã sau vào `upup.js`:

```javascript
/**
 * Bên trong hàm plugin, `this` đề cập đến phiên bản Liquid.
 *
 * @param Liquid: cung cấp các phương tiện để triển khai các thẻ và bộ lọc.
 */
module.exports = function (Liquid) {
    this.registerFilter('upup', x => x.toUpperCase());
}
```

## Sử dụng một Plugin

Chỉ cần truyền hàm plugin vào phương thức `.plugin()`:

```javascript
const engine = new Liquid()

engine.plugin(require('./upup.js'));
engine
    .parseAndRender('{{ "foo" | upup }}')
    .then(console.log)  // xuất ra "FOO"
```

## Danh sách Plugin

Vì thư viện này loại trừ một số tính năng có sẵn trên nền tảng Shopify nhưng không có trên repo [Shopify/liquid](https://github.com/Shopify/liquid/), hãy xem [Sự khác biệt với Shopify/liquid][differences].

Đây là danh sách các plugin bổ sung các tính năng đó. Vui lòng thêm plugin của bạn, tệp này có thể được chỉnh sửa công khai.

* Thẻ Sections (WIP): https://github.com/harttle/liquidjs-section-tags
* Bộ lọc màu: https://github.com/harttle/liquidjs-color-filters

[liquid]: /api/classes/Liquid.html
[register]: /tutorials/register-filters-tags.html
[differences]: /tutorials/differences.html
