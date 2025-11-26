---
title: Liquid Drops
---

LiquidJS cũng cung cấp một cơ chế tương tự [Shopify Drops][shopify-drops], cho phép tác giả template tích hợp chức năng tuỳ chỉnh khi giải quyết giá trị biến.

{% note info Drop for JavaScript %}
Giao diện <em>Drop</em> được triển khai khác so với các filter hay chức năng template tích hợp. Vì LiquidJS chạy trên JavaScript, các Drop tuỳ chỉnh phải được hiện thực lại bằng JavaScript. Không có tương thích trực tiếp giữa lớp JavaScript và lớp Ruby.
{% endnote %}

## Sử dụng cơ bản

```javascript
import { Liquid, Drop } from 'liquidjs'

class SettingsDrop extends Drop {
  constructor() {
    super()
    this.foo = 'FOO'
  }
  bar() {
    return 'BAR'
  }
}

const engine = new Liquid()
const template = `foo: {{settings.foo}}, bar: {{settings.bar}}`
const context = { settings: new SettingsDrop() }
// Kết quả: "foo: FOO, bar: BAR"
engine.parseAndRender(template, context).then(html => console.log(html))
```

[Runkit link](https://runkit.com/embed/2is7di4mc7kk)

Như ví dụ trên, ngoài việc đọc thuộc tính từ context, bạn cũng có thể gọi phương thức. Bạn chỉ cần tạo một lớp kế thừa từ `Drop`.

{% note tip Async Methods %}
LiquidJS hoàn toàn hỗ trợ async. Bạn có thể trả về một `Promise` trong các phương thức Drop hoặc đánh dấu phương thức là `async`.
{% endnote %}

## liquidMethodMissing

Khi không có một tập thuộc tính cố định, bạn có thể dùng `liquidMethodMissing` để giải quyết giá trị một tên biến một cách động.

```javascript
import { Liquid, Drop } from 'liquidjs'

class SettingsDrop extends Drop {
  liquidMethodMissing(key) {
    return key.toUpperCase()
  }
}

const engine = new Liquid()
// Kết quả: "COO"
engine.parseAndRender("{{settings.coo}}", { settings: new SettingsDrop() })
  .then(html => console.log(html))
```

`liquidMethodMissing` hỗ trợ Promise, nghĩa là bạn có thể gọi async bên trong nó (ví dụ lấy dữ liệu từ DB). Sử dụng Drops giúp không phải cứng mã từng thuộc tính vào context.

```javascript
import { Liquid, Drop } from 'liquidjs'

class DBDrop extends Drop {
  async liquidMethodMissing(key) {
    const record = await db.getRecordByKey(key)
    return record.value
  }
}

const engine = new Liquid()
const context = { db: new DBDrop() }
engine.parseAndRender("{{db.coo}}", context).then(html => console.log(html))
```

## valueOf

Drops có thể triển khai `valueOf()`; giá trị trả về sẽ được dùng để thay thế chính Drop khi render. Ví dụ:

```javascript
import { Liquid, Drop } from 'liquidjs'

class ColorDrop extends Drop {
  valueOf() {
    return 'red'
  }
}

const engine = new Liquid()
const context = { color: new ColorDrop() }
// Kết quả: "red"
engine.parseAndRender("{{color}}", context).then(html => console.log(html))
```

## toLiquid

`toLiquid()` không phải là phương thức của `Drop`, nhưng nó có thể trả về một `Drop`. Khi bạn có một cấu trúc cố định trong `context` mà không thể thay đổi giá trị, bạn có thể triển khai `toLiquid()` để LiquidJS sử dụng giá trị trả về thay cho chính object đó khi render.

```javascript
import { Liquid, Drop } from 'liquidjs'

const context = {
  person: {
    firstName: "Jun",
    lastName: "Yang",
    name: "Jun Yang",
    toLiquid: () => ({
      firstName: this.firstName,
      lastName: this.lastName,
      // dùng một `name` khác
      name: "Yang, Jun"
    })
  }
}

const engine = new Liquid()
// Kết quả: "Yang, Jun"
engine.parseAndRender("{{person.name}}", context).then(html => console.log(html))
```

Bạn cũng có thể trả về một instance `PersonDrop` trong `toLiquid()` và triển khai chức năng trong `PersonDrop`:

```javascript
import { Liquid, Drop } from 'liquidjs'

class PersonDrop extends Drop {
  constructor(person) {
    super()
    this.person = person
  }
  name() {
    return this.person.lastName + ", " + this.person.firstName
  }
}

const context = {
  person: {
    firstName: "Jun",
    lastName: "Yang",
    name: "Jun Yang",
    toLiquid: function () { return new PersonDrop(this) }
  }
}

const engine = new Liquid()
// Kết quả: "Yang, Jun"
engine.parseAndRender("{{person.name}}", context).then(html => console.log(html))
```

{% note info <code>toLiquid()</code> vs. <code>valueOf()</code> Difference %}
<ul>
  <li><code>valueOf()</code> thường dùng để định nghĩa cách một biến được render, trong khi <code>toLiquid()</code> thường dùng để chuyển một object thành Drop hoặc một scope khác cung cấp cho template.</li>
  <li><code>valueOf()</code> là phương thức dành riêng cho Drops; còn <code>toLiquid()</code> có thể dùng trên bất kỳ object scope nào.</li>
  <li><code>valueOf()</code> được gọi khi chính biến sắp được render, thay thế bản thân; còn <code>toLiquid()</code> được gọi khi các thuộc tính của object sắp được đọc.</li>
</ul>
{% endnote %}

## Drops đặc biệt

LiquidJS có một số Drop tích hợp sẵn để hỗ trợ việc viết template. Phần này tương thích với Shopify Liquid để đảm bảo tính di động của template.

### blank

Dùng để kiểm tra xem một biến chuỗi có phải là `false`, `null`, `undefined`, chuỗi rỗng, hoặc chỉ chứa ký tự trắng.

```liquid
{% unless author == blank %}
    {{author}}
{% endif %}
```

### empty

Dùng để kiểm tra xem mảng, chuỗi, hoặc object có rỗng hay không.

```liquid
{% if authors == empty %}
    Danh sách tác giả rỗng
{% endif %}
```

{% note info <code>empty</code> implementation %}
Với mảng và chuỗi, LiquidJS kiểm tra thuộc tính `.length`. Với object, LiquidJS dùng `Object.keys()` để kiểm tra có khóa hay không.
{% endnote %}

### nil

`nil` Drop dùng để kiểm tra biến không được định nghĩa hoặc được định nghĩa là `null`/`undefined` (tương đương kiểm tra `== null` trong JavaScript).

```liquid
{% if nonexistent == nil %}
    null variable
{% endif %}
```

### Các Drop khác

Vẫn còn một số Drop phục vụ các tag cụ thể như `forloop`, `tablerowloop`, `block`, được mô tả trong tài liệu các tag tương ứng.

[shopify-drops]: https://github.com/Shopify/liquid/wiki/Introduction-to-Drops
