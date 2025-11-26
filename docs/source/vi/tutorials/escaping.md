---
title: Thoát ký tự (Escaping)
---

Escaping (thoát ký tự) quan trọng trong mọi ngôn ngữ, bao gồm cả LiquidJS. Trong engine template, escaping có hai ý nghĩa khác nhau:

1. Escaping cho đầu ra (output), tức là thoát HTML. Dùng để thoát các ký tự đặc biệt của HTML để đầu ra không phá vỡ cấu trúc HTML (HTML safe).
2. Escaping cho chính ngôn ngữ (Liquid), tức là thoát các chuỗi có ký tự đặc biệt trong Liquid. Điều này hữu ích khi bạn viết một bài hướng dẫn trong template Liquid và cần hiển thị ký hiệu Liquid như `{{` hoặc `{%`.

## Thoát HTML

Mặc định output không được thoát. Bạn có thể dùng filter [escape][escape] để thoát:

Input
```liquid
{{ "1 < 2" | escape }}
```

Output
```text
1 &lt; 2
```

Còn có các filter như [escape_once][escape_once], [newline_to_br][newline_to_br], [strip_html][strip_html] để điều chỉnh đầu ra.

Trong trường hợp giá trị biến không đáng tin cậy, `outputEscape` có thể được đặt thành `"escape"` để bật thoát mặc định. Khi cần một đầu ra không bị thoát, dùng filter [raw][raw]:

Input
```liquid
{{ "1 < 2" }}
{{ "<button>OK</button>" | raw }}
```

Output
```text
1 &lt; 2
<button>OK</button>
```

## Thoát trong Liquid (Liquid Escape)

Để tắt parsing của ngôn ngữ Liquid và xuất các chuỗi như `{{` và `{%`, dùng tag [raw][raw].

Input
```liquid
{% raw %}
  In LiquidJS, {{ this | escape }} will be HTML-escaped, but
  {{{ that }}} will not.
{% endraw %}
```

Output
```text
In LiquidJS, {{ this | escape }} will be HTML-escaped, but
{{{ that }}} will not.
```

Trong literal string của template LiquidJS, `\` có thể dùng để thoát các ký tự đặc biệt trong cú pháp chuỗi. Ví dụ:

Input
```liquid
{{ "\"" }}
```

Output
```liquid
"
```

[outputEscape]: ./options.html#outputEscape
[escape]: ../filters/escape.html
[raw]: ../filters/raw.html
[escape_once]: ../filters/escape.html
[strip_html]: ../filters/strip_html.html
[newline_to_br]: ../filters/newline_to_br.html
[raw]: ../tags/raw.html
