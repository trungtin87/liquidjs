---
title: register-filters-tags
---

Hướng dẫn cách đăng ký filter và tag tuỳ chỉnh vào instance của Liquid.

Ví dụ:
```javascript
engine.registerFilter('myfilter', (v) => v + '!')
engine.registerTag('mytag', MyTagClass)
```
