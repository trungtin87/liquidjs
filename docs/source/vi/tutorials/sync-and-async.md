---
title: sync-and-async
---

Giải thích cách LiquidJS xử lý các filter, tag và render có thể là đồng bộ hoặc bất đồng bộ.

LiquidJS hỗ trợ cả sync và async: bạn có thể trả về `Promise` trong filter hoặc tag, hoặc sử dụng `async` function.

Ví dụ:
```javascript
// filter async
engine.registerFilter('fetch', async (url) => {
  const res = await fetch(url)
  return res.text()
})
```

Khi render, LiquidJS sẽ chờ các Promise tương ứng và trả về kết quả hoàn chỉnh.
