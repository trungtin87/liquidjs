# Giải Thích Chi Tiết Dự Án LiquidJS

Tài liệu này cung cấp cái nhìn tổng quan và chi tiết về cấu trúc, công nghệ và các thành phần thư viện được sử dụng trong dự án **LiquidJS**.

## 1. Tổng Quan Dự Án

**LiquidJS** là một thư viện mã nguồn mở, cung cấp công cụ xử lý mẫu (template engine) tương thích với Shopify và GitHub Pages, được viết hoàn toàn bằng JavaScript (TypeScript). Nó có thể chạy trên cả môi trường Node.js và trình duyệt (Browser).

Dự án này bao gồm hai phần chính:

1. **Core Library**: Mã nguồn chính của thư viện LiquidJS.
2. **Documentation Website**: Trang web tài liệu hướng dẫn sử dụng (nằm trong thư mục `docs`).

## 2. Cấu Trúc Thư Mục

Dưới đây là giải thích chức năng của từng thư mục và tệp quan trọng trong dự án:

### Thư mục gốc (`/`)

* **`src/`**: Chứa mã nguồn gốc (source code) của thư viện, được viết bằng TypeScript. Đây là nơi logic chính của template engine được cài đặt.
* **`dist/`**: Chứa các file đã được biên dịch (build) ra JavaScript để sử dụng trong thực tế (CommonJS, ES Modules, UMD cho trình duyệt).
* **`test/`**: Chứa các bài kiểm thử (Unit Test và E2E Test) để đảm bảo chất lượng mã nguồn.
* **`benchmark/`**: Chứa các kịch bản kiểm tra hiệu năng so sánh với các thư viện khác.
* **`demo/`**: Chứa các ví dụ minh họa cách sử dụng LiquidJS trong các môi trường khác nhau (Node.js, Browser...).
* **`bin/`**: Chứa các file thực thi CLI (Command Line Interface), ví dụ lệnh `liquidjs` bạn có thể chạy trong terminal.
* **`docs/`**: Chứa mã nguồn của trang web tài liệu (sẽ giải thích chi tiết bên dưới).
* **`rollup.config.mjs`**: File cấu hình cho công cụ đóng gói Rollup.
* **`tsconfig.json`**: File cấu hình cho TypeScript compiler.
* **`package.json`**: File quản lý dependencies và các scripts của dự án chính.

### Thư mục `docs/` (Trang tài liệu)

* **`source/`**: Chứa nội dung bài viết, tài liệu định dạng Markdown hoặc HTML.
* **`themes/`**: Chứa giao diện (theme) của trang web. Dự án này sử dụng theme `navy`.
* **`public/`**: Thư mục chứa trang web tĩnh sau khi đã được build (Hexo generate).
* **`_config.yml`**: File cấu hình chính cho Hexo (cài đặt tiêu đề, ngôn ngữ, plugin...).
* **`package.json`**: Quản lý dependencies riêng cho phần trang web tài liệu.

## 3. Công Nghệ & Thư Viện Sử Dụng

### A. Core Library (Dự án chính)

Dự án chính là một thư viện TypeScript, sử dụng các công cụ sau để phát triển và đóng gói:

1. **TypeScript**: Ngôn ngữ chính, giúp code an toàn hơn với static typing.
2. **Rollup** (`rollup`, `rollup-plugin-*`):
    * **Chức năng**: Module bundler (công cụ đóng gói).
    * **Nhiệm vụ**: Gom các file TypeScript/JavaScript trong `src` thành các file đơn lẻ trong `dist` (như `liquid.min.js`, `liquid.node.js`) để người dùng có thể import hoặc gắn vào thẻ script.
3. **Jest** (`jest`, `ts-jest`):
    * **Chức năng**: Testing Framework.
    * **Nhiệm vụ**: Chạy các bài test để kiểm tra lỗi logic. `ts-jest` giúp Jest hiểu được code TypeScript.
4. **ESLint** (`eslint`):
    * **Chức năng**: Linter.
    * **Nhiệm vụ**: Kiểm tra lỗi cú pháp và đảm bảo phong cách code thống nhất.
5. **Commander** (`commander`):
    * **Chức năng**: Thư viện xây dựng CLI.
    * **Nhiệm vụ**: Xử lý các tham số dòng lệnh khi người dùng chạy lệnh `liquidjs` trong terminal.
6. **Benchmark.js** (`benchmark`):
    * **Chức năng**: Đo hiệu năng.
    * **Nhiệm vụ**: So sánh tốc độ render của LiquidJS với các thư viện khác.
7. **Semantic Release** (`semantic-release`):
    * **Chức năng**: Tự động hóa quy trình phát hành (release).
    * **Nhiệm vụ**: Tự động tăng version, tạo changelog và publish lên NPM dựa trên commit message.

### B. Documentation Website (Thư mục `docs`)

Trang tài liệu được xây dựng bằng **Hexo**, một Static Site Generator (trình tạo web tĩnh) mạnh mẽ.

1. **Hexo** (`hexo`):
    * **Chức năng**: Static Site Generator.
    * **Nhiệm vụ**: Biến các file Markdown trong `source` thành các file HTML tĩnh trong `public`.
2. **Hexo Server** (`hexo-server`):
    * **Chức năng**: Web server cục bộ.
    * **Nhiệm vụ**: Giúp bạn chạy web xem trước trên máy tính (`hexo serve`) tại `http://localhost:4000`.
3. **Hexo Renderers** (`hexo-renderer-marked`, `hexo-renderer-pug`, `hexo-renderer-stylus`):
    * **Chức năng**: Các bộ biên dịch.
    * **Nhiệm vụ**:
        * `marked`: Chuyển Markdown thành HTML.
        * `pug`: Chuyển file template `.pug` thành HTML (dùng trong theme).
        * `stylus`: Chuyển file style `.styl` thành CSS.
4. **Hexo Algolia** (`hexo-algolia`):
    * **Chức năng**: Tích hợp tìm kiếm.
    * **Nhiệm vụ**: Đẩy dữ liệu bài viết lên Algolia để tạo chức năng tìm kiếm nhanh trên trang web.
5. **Cheerio** (`cheerio`):
    * **Chức năng**: Xử lý HTML (giống jQuery nhưng ở server-side).
    * **Nhiệm vụ**: Dùng để thao tác DOM, trích xuất thông tin từ HTML khi build.

## 4. Loại Server Được Dùng

* **Development (Phát triển)**:
  * Đối với Core Library: Không có server chạy thường trực, chủ yếu là chạy các lệnh build và test.
  * Đối với Docs: Sử dụng **Hexo Server** (Node.js based) để serve file tĩnh tại localhost.
* **Production (Triển khai)**:
  * Trang tài liệu (`docs`) là **Static Site** (Web tĩnh). Nó không cần backend server (như PHP, Java, Python). Nó có thể được host trên bất kỳ static hosting nào như **GitHub Pages**, Vercel, Netlify. Hiện tại cấu hình cho thấy nó đang được deploy lên GitHub Pages.

## 5. Tóm Tắt Quy Trình Phát Triển

1. **Sửa code thư viện**: Sửa trong `src/` -> Chạy `npm run build` để tạo file mới trong `dist/`.
2. **Sửa tài liệu**: Sửa file Markdown trong `docs/source/` -> Chạy `cd docs && npm start` để xem trước -> Chạy `npm run build` để tạo HTML tĩnh.
