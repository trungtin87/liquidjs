---
title: date
---
{% since %}v1.9.1{% endsince %}

Bộ lọc `date` dùng để chuyển một timestamp thành định dạng mong muốn.

- LiquidJS cố gắng tương thích với Shopify/Liquid, vốn sử dụng `Time#strftime` của Ruby. Có một số khác biệt với [các flag định dạng của Ruby](https://ruby-doc.org/core/strftime_formatting_rdoc.html):
  - `%Z` (kể từ v10.11.1) được thay bằng tên timezone truyền vào qua `LiquidOption` hoặc giá trị tại chỗ (xem phần TimeZone bên dưới). Nếu timezone truyền vào là một số offset thay vì chuỗi, nó hoạt động giống `%z`. Nếu không có timezone nào được cung cấp, nó trả về [múi giờ mặc định của runtime](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/resolvedOptions#timezone).
  - LiquidJS cung cấp thêm flag `%q` cho số thứ tự ngày (ordinal). ví dụ `{{ '2023/02/02' | date: '%d%q of %b'}}` => `02nd of Feb`
- Giá trị ngày (literal) sẽ được chuyển thành đối tượng `Date` bằng [new Date()][jsDate], nghĩa là các literal được coi là theo múi giờ runtime theo mặc định.
- Tham số định dạng là tuỳ chọn:
    - Nếu không cung cấp, giá trị mặc định là `%A, %B %-e, %Y at %-l:%M %P %z`.
    - Mặc định trên có thể được ghi đè thông qua tuỳ chọn `dateFormat` trong `LiquidOptions`.
- LiquidJS `date` hỗ trợ tên thứ trong tuần và tháng theo locale; sẽ fallback về tiếng Anh nếu `Intl` không được hỗ trợ.
    - Ordinals (`%q`) và các bộ lọc ngày đặc thù Jekyll là chỉ bằng tiếng Anh.
    - `locale` có thể được đặt khi tạo instance `Liquid`. Mặc định là `Intl.DateTimeFormat().resolvedOptions.locale`.

### Ví dụ
```liquid
{{ article.published_at | date: '%a, %b %d, %y' }} => Fri, Jul 17, 15
{{ "now" | date: "%Y-%m-%d %H:%M" }} => 2020-03-25 15:57

// tương đương với thiết lập options.dateFormat = %d%q of %b %Y at %I:%M %P %Z
{{ '1990-12-31T23:30:28Z' | date: '%d%q of %b %Y at %I:%M %P %Z', -330 }} => 01st of Jan 1991 at 05:00 am +0530;
```

# TimeZone
- Khi xuất ra, LiquidJS sử dụng múi giờ cục bộ nhưng có thể ghi đè bằng:
    - đặt timezone trực tiếp khi gọi bộ lọc `date`, hoặc
    - đặt tuỳ chọn `timezoneOffset` trong `LiquidOptions`
        - Mặc định là múi giờ của runtime.
        - Offset có thể được đặt bằng:
            - phút: `-360` nghĩa là `'+06:00'` và `360` nghĩa là `'-06:00'`
            - ID timeZone: `Asia/Colombo` hoặc `America/New_York`
    - Xem [danh sách múi giờ TZ](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)

### Ví dụ
```liquid
// tương đương với đặt `options.timezoneOffset` = `360`
{{ "1990-12-31T23:00:00Z" | date: "%Y-%m-%dT%H:%M:%S", 360 }} => 1990-12-31T17:00:00
{{ "1990-12-31T23:00:00Z" | date: "%Y-%m-%dT%H:%M:%S", "Asia/Colombo" }} => 1991-01-01T04:30:00
```

# Input
- `date` hoạt động với chuỗi nếu chúng chứa các ngày có định dạng hợp lệ.
- Lưu ý rằng LiquidJS dùng [JavaScript Date][jsDate] để phân tích chuỗi đầu vào, do đó các timestamp chuẩn IETF RFC 2822 và các chuỗi theo ISO8601 được hỗ trợ.

### Ví dụ
```liquid
{{ "1990-12-31T23:00:00Z" | date: "%Y-%m-%dT%H:%M:%S", 360 }} => 1990-12-31T17:00:00
{{ "March 14, 2016" | date: "%b %d, %y" }} => Mar 14, 16
```

# Current Date
- Để lấy thời gian hiện tại, truyền từ khoá đặc biệt `"now"` hoặc `"today"` làm đầu vào.
- Lưu ý: giá trị là thời điểm khi trang được sinh ra (build) chứ không phải thời điểm trình duyệt truy cập nếu sử dụng cache hoặc static site generation.

### Ví dụ
```liquid
Last updated on: {{ "now" | date: "%Y-%m-%d %H:%M" }} => Last updated on: 2020-03-25 15:57
Last updated on: {{ "today" | date: "%Y-%m-%d %H:%M" }} => Last updated on: 2020-03-25 15:57
```

[jsDate]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
