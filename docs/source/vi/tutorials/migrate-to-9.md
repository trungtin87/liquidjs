---
title: Chuyển sang LiquidJS 9
---

LiquidJS 9 có một số cải tiến cơ bản, bao gồm sửa lỗi, tính năng mới và cải thiện hiệu năng nhờ mục tiêu (target) cao hơn (xem #137). Cũng có một vài thay đổi phá vỡ tương thích (breaking changes).

## Tính năng

* Kết xuất đồng bộ (Sync): `renderSync`, `parseAndRenderSync`, `renderFileSync`
* Tiện ích mới: `Expression`

## Sửa lỗi

* Viết lại thứ tự đánh giá biểu thức boolean, [#130](https://github.com/harttle/liquidjs/issues/130);
* Thẻ `break` và `continue` bỏ sót output phía trước chúng, [#123](https://github.com/harttle/liquidjs/issues/123);
* Sửa lỗi trong demo React.js khi cài bằng yarn, [#145](https://github.com/harttle/liquidjs/issues/145);
* Drops kiểu Promise đôi khi không được `await` đúng.

## Hiệu năng

* Cải thiện hiệu năng nhờ nhắm tới Node.js 8, xem [#137](https://github.com/harttle/liquidjs/issues/137);
* Dung lượng bộ nhớ giảm 57.5%, xem [#202](https://github.com/harttle/liquidjs/pull/202);
* Hiệu năng render được cải thiện 100.3%, xem [#205](https://github.com/harttle/liquidjs/pull/205).

## THAY ĐỔI PHÁ VỠ TƯƠNG THÍCH (BREAKING CHANGES)

* LiquidJS không còn export mặc định, sử dụng `import {Liquid} from 'liquidjs'` thay thế. `window.Liquid` cho bundle UMD cũng đã đổi thành `window.liquidjs.Liquid`;
* Phương thức tĩnh trùng lặp `Liquid.evalValue` đã bị loại bỏ, sử dụng phương thức instance `liquid.evalValue` thay thế;
* Chỉ hỗ trợ Node.js 8 trở lên cho bundle CJS (entry chính trong Node.js) — không hỗ trợ Node.js ≤ 6. Các bundle ESM (`dist/liquid.node.esm.js`) và UMD (`dist/liquid.browser.umd.js`, `dist/liquid.browser.min.js`) không bị ảnh hưởng.

