---
title: Phân tích tham số
---

## Truy cập tham số thô

Như đã đề cập trong [Đăng ký bộ lọc/thẻ][register-tags], các tham số thẻ có sẵn trên `tagToken.args` dưới dạng một chuỗi thô. Ví dụ:

```javascript
// Sử dụng: {% random foo bar coo %}
// Đầu ra: "foo", "bar" hoặc "coo"
engine.registerTag('random', {
  parse(tagToken) {
    // tagToken.args === "foo bar coo"
    this.items = tagToken.args.split(' ')
  },
  render(context, emitter) {
    // lấy một chỉ mục ngẫu nhiên
    const index = Math.floor(this.items.length * Math.random())
    // xuất ra mục đó
    emitter.write(this.items[index])
  }
})
```

Đây là phiên bản JSFiddle: <https://jsfiddle.net/ctj364up/2/>

## Phân tích tham số dưới dạng giá trị

Đôi khi chúng ta cần các thẻ động hơn và muốn truyền giá trị cho thẻ tùy chỉnh thay vì các chuỗi tĩnh. Các biến trong LiquidJS có thể là ký tự (chuỗi, số, v.v.) hoặc một biến từ phạm vi ngữ cảnh hiện tại.

Mẫu đã sửa đổi sau đây cũng chứa 3 giá trị để chọn ngẫu nhiên, nhưng chúng là các giá trị thay vì các chuỗi tĩnh. Cái đầu tiên là chuỗi ký tự, cái thứ hai là một định danh, cái thứ ba là một chuỗi truy cập thuộc tính chứa hai định danh.

```liquid
{% random "foo" bar obj.coo %}
```

Việc phân tích tất cả các trường hợp này theo cách thủ công có thể khó khăn, nhưng có một lớp [Tokenizer][Tokenizer] trong LiquidJS mà bạn có thể sử dụng.

```javascript
const { Liquid, Tokenizer, evalToken } = require('liquidjs')
engine.registerTag('random', {
  parse(tagToken) {
    const tokenizer = new Tokenizer(tagToken.args)
    this.items = []
    while (!tokenizer.end()) {
      // ở đây readValue() trả về một LiteralToken hoặc PropertyAccessToken
      this.items.push(tokenizer.readValue())
    }
  },
  * render(context, emitter) {
    const index = Math.floor(this.items.length * Math.random())
    const token = this.items[index]
    // trong LiquidJS, chúng ta sử dụng yield để chờ cuộc gọi không đồng bộ
    const value = yield evalToken(token, context)
    emitter.write(value)
  }
})
```

Gọi thẻ này trong phạm vi `{ bar: "bar", obj: { coo: "coo" } }` cho kết quả hoàn toàn giống như ví dụ đầu tiên. Xem JSFiddle này: <https://jsfiddle.net/ctj364up/3/>

{% note info Async and Promises %}
Các cuộc gọi không đồng bộ trong LiquidJS được triển khai trực tiếp bằng các generator, vì chúng ta có thể gọi các generator một cách đồng bộ nên việc triển khai thẻ này cũng hợp lệ cho `renderSync()`, `parseAndRenderSync()`, `renderFileSync()`. Nếu bạn cần đợi một promise trong việc triển khai thẻ, chỉ cần thay thế `await somePromise` bằng `yield somePromise` và giữ `* render()` thay vì `async render()` sẽ thực hiện được. Xem <a href="/tutorials/sync-and-async.html">Sync and Async</a> để biết thêm chi tiết.
{% endnote %}

## Phân tích các cặp khóa-giá trị dưới dạng tham số được đặt tên

Các tham số được đặt tên trở nên rất hữu ích khi có các tham số tùy chọn hoặc nhiều tham số, trong trường hợp đó thứ tự của các tham số không quan trọng. Đây chính là lý do lớp [Hash][Hash] được phát minh.

```liquid
{% random from:2, to:max %}
```

Trong ví dụ trên, chúng ta đang cố gắng tạo một số ngẫu nhiên trong khoảng [2, max]. Chúng ta sẽ sử dụng `Hash` để phân tích các tham số `from` và `to`.

```javascript
const { Liquid, Hash } = require('liquidjs')

engine.registerTag('random', {
  parse(tagToken) {
    // phân tích cấu trúc tham số vào `this.args`
    this.args = new Hash(tagToken.args)
  },
  * render(context, emitter) {
    // đánh giá các tham số trong `context`
    const {from, to} = yield this.args.render(context)
    const length = to - from + 1
    const value = from + Math.floor(length * Math.random())
    emitter.write(value)
  }
})
```

Hiển thị `{% raw %}{% random from:2, to:max %}{% endraw %}` trong phạm vi `{ max: 10 }` sẽ tạo ra một số ngẫu nhiên trong khoảng [2, 10]. Xem JSFiddle này: <https://jsfiddle.net/ctj364up/4/>


[register-tags]: /tutorials/register-filters-tags.html
[Tokenizer]: /api/classes/Tokenizer.html
[Hash]: /api/classes/Hash.html
