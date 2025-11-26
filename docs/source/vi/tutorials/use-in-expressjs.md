---
title: Sử dụng trong Express.js
---

LiquidJS tương thích với [các công cụ mẫu express](https://expressjs.com/en/resources/template-engines.html). Bạn có thể đặt phiên bản liquidjs cho tùy chọn [công cụ xem][express-views]:

```javascript
var { Liquid } = require('liquidjs');
var engine = new Liquid();

// đăng ký công cụ liquid
app.engine('liquid', engine.express()); 
app.set('views', './views');            // chỉ định thư mục views
app.set('view engine', 'liquid');       // đặt liquid làm mặc định
```

{% note info Working Demo %} Đây là một bản demo hoạt động cho việc sử dụng LiquidJS trong Express.js: <a href="https://github.com/harttle/liquidjs/blob/master/demo/express/" target="_blank">liquidjs/demo/express/</a>.{% endnote %}

## Tra cứu mẫu

Tùy chọn [root][root] sẽ tiếp tục hoạt động như là gốc của các mẫu, như bạn có thể thấy trong [Hiển thị một tệp mẫu][render-a-file]. Ngoài ra, tùy chọn [`views`][express-views] trong express.js (như được hiển thị ở trên) cũng sẽ được tôn trọng. Giả sử bạn có một thư mục mẫu như:

```
.
├── views1/
│ └── hello.liquid
└── views2/
  └── world.liquid
```

Và bạn đang đặt thư mục gốc của mẫu cho liquidjs là `views1` và cho expressjs là `views2`:

```javascript
var { Liquid } = require('liquidjs');
var engine = new Liquid({
    root: './views1/'
});

app.engine('liquid', engine.express()); 
app.set('views', './views2');            // chỉ định thư mục views
app.set('view engine', 'liquid');       // đặt liquid làm mặc định
```

Cả `hello.liquid` và `world.liquid` đều có thể được giải quyết và hiển thị:

```javascript
res.render('hello')
res.render('world')
```

## Bộ nhớ đệm

Chỉ cần đặt [tùy chọn bộ đệm][cache] thành true sẽ bật bộ nhớ đệm mẫu, như được giải thích trong [Bộ nhớ đệm][Caching]. Nên bật bộ nhớ đệm trong môi trường sản xuất, có thể được thực hiện bằng cách:

```javascript
var { Liquid } = require('liquidjs');
var engine = new Liquid({
    cache: process.env.NODE_ENV === 'production'
});
```

[cache]: /api/interfaces/LiquidOptions.html#cache
[express-views]: https://expressjs.com/en/guide/using-template-engines.html
[parseFile]: /api/classes/Liquid.html#parseFile
[parseFileSync]: /api/classes/Liquid.html#parseFileSync
[layout]: https://help.shopify.com/en/themes/liquid/tags/theme-tags#layout
[include]: https://help.shopify.com/themes/liquid/tags/theme-tags#include
[root]: /api/interfaces/LiquidOptions.html#root
[render-a-file]: ./render-file.html
[Caching]: ./caching.html
