---
title: array_to_sentence_string
---

Chuyển mảng thành chuỗi câu, sử dụng dấu phẩy và từ nối (ví dụ `and`) ở cuối.

Ví dụ:
```liquid
{{ ["apple", "banana", "cherry"] | array_to_sentence_string }} => "apple, banana and cherry"
```
