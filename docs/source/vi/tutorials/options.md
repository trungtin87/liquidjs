---
title: Tùy chọn
---

Hàm khởi tạo [Liquid][liquid] chấp nhận một đối tượng thuần túy làm tùy chọn để xác định hành vi của LiquidJS. Tất cả các tùy chọn này là tùy chọn, do đó chúng ta có thể chỉ định bất kỳ tùy chọn nào trong số chúng, ví dụ như tùy chọn `cache`:

```javascript
const { Liquid } = require('liquidjs')
const engine = new Liquid({
    cache: true
})
```

{% note info API Document %}
Sau đây là tổng quan về tất cả các tùy chọn, để biết các loại và chữ ký chính xác, vui lòng tham khảo <a href="https://liquidjs.com/api/interfaces/LiquidOptions.html" target="_self">LiquidOptions | API</a>.
{% endnote %}

## cache

**cache** được sử dụng để cải thiện hiệu suất bằng cách lưu vào bộ nhớ đệm các cấu trúc mẫu đã được phân tích cú pháp trước đó, đặc biệt là trong các trường hợp chúng ta phân tích cú pháp hoặc hiển thị tệp nhiều lần.

Giá trị mặc định là `false`. Khi đặt thành `true`, một bộ đệm LRU mặc định có kích thước 1024 sẽ được bật. Và chắc chắn nó có thể là một số cho biết kích thước của bộ đệm bạn muốn.

Ngoài ra, nó cũng có thể là một triển khai bộ đệm tùy chỉnh. Xem [Caching][caching] để biết chi tiết.

## Partials/Layouts

**root** được sử dụng để chỉ định các thư mục mẫu để LiquidJS tra cứu và đọc các tệp mẫu. Có thể là một chuỗi đơn và một mảng các chuỗi. Xem [Render Files][render-file] để biết chi tiết.

**layouts** được sử dụng để chỉ định các thư mục mẫu để LiquidJS tra cứu các tệp cho `{% layout %}`. Cùng định dạng với `root` và sẽ mặc định là `root` nếu không được chỉ định.

**partials** được sử dụng để chỉ định các thư mục mẫu để LiquidJS tra cứu các tệp cho `{% render %}` và `{% include %}`. Cùng định dạng với `root` và sẽ mặc định là `root` nếu không được chỉ định.

**relativeReference** được đặt thành `true` theo mặc định để cho phép tên tệp tương đối. Lưu ý rằng các tệp được tham chiếu tương đối cũng cần phải nằm trong thư mục gốc tương ứng. Ví dụ: bạn có thể tham chiếu một tệp khác như `{% render ../foo/bar %}` miễn là `../foo/bar` cũng nằm trong thư mục `partials`.

## dynamicPartials

> Lưu ý: vì lý do lịch sử, nó được đặt tên là dynamicPartials nhưng nó cũng hoạt động cho các layout.

**dynamicPartials** cho biết có nên coi các đối số tên tệp trong các thẻ [include][include], [render][render], [layout][layout] như một biến hay không. Mặc định là `true`. Ví dụ, hiển thị đoạn mã sau với phạm vi `{ file: 'foo.html' }` sẽ bao gồm `foo.html`:

```liquid
{% include file %}
```

Đặt `dynamicPartials: false`, LiquidJS sẽ cố gắng bao gồm tệp có tên `file`, điều này hơi lạ nhưng cho phép cú pháp đơn giản hơn nếu các mối quan hệ mẫu của bạn là tĩnh:

```liquid
{% liquid foo.html %}
```

{% note warn Common Pitfall %}
LiquidJS mặc định tùy chọn này thành `true` để tương thích với shopify/liquid, nhưng nếu bạn đến từ <a href="https://github.com/11ty/eleventy" target="_blank">eleventy</a>, nó được đặt thành `false` theo mặc định (xem <a href="https://www.11ty.dev/docs/languages/liquid/#quoted-include-paths" target="_blank">Quoted Include Paths</a>) mà tôi tin rằng đang cố gắng tương thích với Jekyll.{% endnote %}

## Jekyll include

{% since %}v9.33.0{% endsince %}

[jekyllInclude][jekyllInclude] được sử dụng để bật cú pháp bao gồm giống như Jekyll. Mặc định là `false`, khi được đặt thành `true`:

- Tên tệp sẽ là tĩnh: `dynamicPartials` hiện mặc định là `false` (thay vì `true`). Và bạn có thể đặt lại `dynamicPartials` thành `true`.
- Sử dụng `=` thay vì `:` để phân tách các cặp khóa-giá trị tham số.
- Các tham số nằm dưới biến `include` thay vì phạm vi hiện tại.

Ví dụ trong mẫu sau, `name.html` không được trích dẫn, `header` và `"HEADER"` được phân tách bằng `=`, và tham số `header` được tham chiếu bởi `include.header`. Để biết thêm chi tiết, vui lòng xem [include][include].

```liquid
// entry template
{% include article.html header="HEADER" content="CONTENT" %}

// article.html
<article>
  <header>{{include.header}}</header>
  {{include.content}}
</article>
```

## extname

**extname** xác định tên phần mở rộng mặc định sẽ được nối vào tên tệp nếu tên tệp không có tên phần mở rộng. Mặc định là `''`, có nghĩa là nó bị tắt theo mặc định. Bằng cách đặt nó thành `.liquid`:

```liquid
{% render "foo" %}  không có extname, thêm `.liquid` và tải foo.liquid
{% render "foo.html" %}  đã có extname, tải trực tiếp foo.html
```

{% note info Legacy Versions %}
Trước phiên bản 2.0.1, `extname` được đặt thành `.liquid` theo mặc định. Để thay đổi điều đó, bạn cần đặt `extname: ''` một cách rõ ràng. Xem <a href="https://github.com/harttle/liquidjs/issues/41" target="_blank">#41</a> để biết chi tiết.
{% endnote %}

## fs

**fs** được sử dụng để xác định một triển khai hệ thống tệp tùy chỉnh sẽ được LiquidJS sử dụng để tra cứu và đọc các tệp mẫu. Xem [Abstract File System][abstract-fs] để biết chi tiết.

## globals

**globals** được sử dụng để xác định các biến toàn cục có sẵn cho tất cả các mẫu ngay cả trong trường hợp của [thẻ render][render]. Xem [3185][185] để biết chi tiết.

## jsTruthy

**jsTruthy** được sử dụng để sử dụng tính đúng sai của JavaScript tiêu chuẩn thay vì của Shopify.

nó mặc định là false. Ví dụ, khi được đặt thành true, một chuỗi trống sẽ được đánh giá là false với jsTruthy. Với tính đúng sai của Shopify, một chuỗi trống là true.

## outputEscape

[outputEscape][outputEscape] có thể được sử dụng để tự động thoát các chuỗi đầu ra. Nó có thể là một trong `"escape"`, `"json"`, hoặc `(val: unknown) => string`, mặc định là `undefined`.

- Đối với các biến đầu ra không đáng tin cậy, hãy đặt `outputEscape: "escape"` để chúng được thoát HTML theo mặc định. Bạn sẽ cần bộ lọc [raw][raw] để có đầu ra trực tiếp.
- `"json"` hữu ích khi bạn đang sử dụng LiquidJS để tạo các tệp JSON hợp lệ.
- Nó thậm chí có thể là một hàm cho phép bạn kiểm soát những biến nào được xuất ra trong LiquidJS. Xin lưu ý rằng đầu vào có thể là bất kỳ loại nào khác ngoài chuỗi, ví dụ: một bộ lọc đã trả về một giá trị không phải là chuỗi.

## Date

**timezoneOffset** được sử dụng để chỉ định một múi giờ khác để xuất ngày, múi giờ địa phương của bạn sẽ được sử dụng nếu không được chỉ định. Ví dụ, đặt `timezoneOffset: 0` để xuất tất cả các ngày ở định dạng UTC/GMT 00:00.

**preserveTimezones** là một hiệu ứng boolean chỉ ảnh hưởng đến các dấu thời gian bằng chữ. Khi được đặt thành `true`, tất cả các dấu thời gian bằng chữ sẽ giữ nguyên khi xuất ra. Đây là một tùy chọn của trình phân tích cú pháp, vì vậy các đối tượng Date được truyền cho LiquidJS dưới dạng dữ liệu sẽ không bị ảnh hưởng. Lưu ý rằng `preserveTimezones` có mức độ ưu tiên cao hơn `timezoneOffset`.

**dateFormat** được sử dụng để chỉ định một định dạng mặc định để xuất ngày. `%A, %B %-e, %Y at %-l:%M %P %z` sẽ được sử dụng nếu không được chỉ định. Ví dụ, đặt `dateFormat: %Y-%m-%dT%H:%M:%S:%LZ` để xuất tất cả các ngày ở định dạng [JavaScript Date.toJson()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toJSON).

## Trimming

Các tùy chọn **greedy**, **trimOutputLeft**, **trimOutputRight**, **trimTagLeft**, **trimTagRight** được sử dụng để loại bỏ các dòng mới và thụt lề thừa trong các mẫu xung quanh Liquid Constructs. Xem [Whitespace Control][wc] để biết chi tiết.

## Delimiter

**outputDelimiterLeft**, **outputDelimiterRight**, **tagDelimiterLeft**, **tagDelimiterRight** được sử dụng để tùy chỉnh các dấu phân cách cho [Thẻ và Bộ lọc][intro] của LiquidJS. Ví dụ với `outputDelimiterLeft: <%=, outputDelimiterRight: %>` chúng ta có thể tránh xung đột với các ngôn ngữ khác:

```ejs
<%= username | append: ", welcome to LiquidJS!" %>
```

## Strict

**strictFilters** được sử dụng để xác nhận sự tồn tại của bộ lọc. Nếu được đặt thành `false`, các bộ lọc không xác định sẽ bị bỏ qua. Ngược lại, các bộ lọc không xác định sẽ gây ra một ngoại lệ phân tích cú pháp. Mặc định là `false`.

**strictVariables** được sử dụng để xác nhận sự tồn tại của biến. Nếu được đặt thành `false`, các biến không xác định sẽ được hiển thị dưới dạng chuỗi rỗng. Ngược lại, các biến không xác định sẽ gây ra một ngoại lệ hiển thị. Mặc định là `false`.

**lenientIf** sửa đổi hành vi của `strictVariables` để cho phép xử lý các biến tùy chọn. Nếu được đặt thành `true`, một biến không xác định sẽ *không* gây ra một ngoại lệ trong hai tình huống sau: a) nó là điều kiện cho một thẻ `if`, `elsif`, hoặc `unless`; b) nó xuất hiện ngay trước một bộ lọc `default`. Không liên quan nếu `strictVariables` không được đặt. Mặc định là `false`.

**ownPropertyOnly** ẩn các biến phạm vi khỏi các nguyên mẫu, hữu ích khi bạn đang truyền một đối tượng chưa được khử trùng vào LiquidJS hoặc cần ẩn các nguyên mẫu khỏi các mẫu. Mặc định là `true`.

{% note info Nonexistent Tags %}
Các thẻ không tồn tại luôn gây ra lỗi trong quá trình phân tích cú pháp và hành vi này không thể được tùy chỉnh.
{% endnote %}

## Parameter Order

Thứ tự tham số bị bỏ qua theo mặc định, ví dụ `{% for i in (1..8) reversed limit:3 %}` sẽ luôn thực hiện `limit` trước `reversed`, ngay cả khi `reversed` xuất hiện trước `limit`. Để làm cho thứ tự tham số được tôn trọng, hãy đặt **orderedFilterParameters** thành `true`. Giá trị mặc định của nó là `false`.

[liquid]: /api/classes/Liquid.html
[caching]: ./caching.html
[abstract-fs]: ./render-file.html#Abstract-File-System
[render-file]: ./render-file.html
[185]: https://github.com/harttle/liquidjs/issues/185
[render]: ../tags/render.html
[include]: ../tags/include.html
[layout]: ../tags/layout.html
[wc]: ./whitespace-control.html
[intro]: ./intro-to-liquid.html
[jekyllInclude]: /api/interfaces/LiquidOptions.html#jekyllInclude
[raw]: ../filters/raw.html
[outputEscape]: /api/interfaces/LiquidOptions.html#outputEscape
