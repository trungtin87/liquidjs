/**
 * File: main.js
 * Mục đích: Xử lý các tương tác JavaScript phía client cho trang web LiquidJS
 * Bao gồm: điều hướng mobile, mục lục bài viết, chuyển đổi ngôn ngữ, và playground
 */

// ============================================================================
// KHỐI 1: ĐIỀU HƯỚNG MOBILE (Mobile Navigation)
// ============================================================================
(function () {
  // Lấy các phần tử DOM cần thiết
  var html = document.getElementsByTagName('html')[0]; // Phần tử HTML gốc
  var navToggle = document.getElementById('mobile-nav-toggle'); // Nút toggle menu mobile
  var dimmer = document.getElementById('mobile-nav-dimmer'); // Lớp phủ tối khi mở menu
  var CLASS_NAME = 'mobile-nav-on'; // Tên class để bật/tắt menu mobile

  // Nếu không tìm thấy nút toggle, thoát khỏi function
  if (!navToggle) return;

  // Xử lý sự kiện click vào nút toggle menu
  navToggle.addEventListener('click', function (e) {
    e.preventDefault(); // Ngăn hành vi mặc định
    e.stopPropagation(); // Ngăn sự kiện lan truyền lên các phần tử cha
    // Bật/tắt class 'mobile-nav-on' trên phần tử HTML để hiển thị/ẩn menu
    html.classList.toggle(CLASS_NAME);
  });

  // Xử lý sự kiện click vào lớp phủ tối (dimmer) để đóng menu
  dimmer.addEventListener('click', function (e) {
    // Nếu menu không mở, không làm gì cả
    if (!html.classList.contains(CLASS_NAME)) return;

    e.preventDefault(); // Ngăn hành vi mặc định
    // Xóa class 'mobile-nav-on' để đóng menu
    html.classList.remove(CLASS_NAME);
  });
}());

// ============================================================================
// KHỐI 2: MỤC LỤC BÀI VIẾT (Article Table of Contents)
// ============================================================================
(function () {
  // Lấy phần tử chứa danh sách mục lục
  var tocList = document.getElementById('article-toc-inner-list');
  // Nếu không có mục lục trong trang, thoát khỏi function
  if (!tocList) return;

  // Lắng nghe sự kiện thay đổi kích thước cửa sổ
  window.addEventListener('resize', setMaxHeight);
  // Thiết lập chiều cao tối đa ban đầu
  setMaxHeight();

  /**
   * Thiết lập chiều cao tối đa cho mục lục dựa trên chiều cao cửa sổ
   * Đảm bảo mục lục không chiếm quá nhiều không gian màn hình
   */
  function setMaxHeight() {
    // Chiều cao tối đa = chiều cao cửa sổ - 45px (để có khoảng trống)
    var maxHeight = window.innerHeight - 45;
    tocList.style['max-height'] = maxHeight + 'px';
  }
}());

// ============================================================================
// KHỐI 3: CHUYỂN ĐỔI NGÔN NGỮ (Language Switcher)
// ============================================================================
(function () {
  /**
   * Hàm xử lý khi người dùng chọn ngôn ngữ mới
   * Chuyển hướng đến trang tương ứng với ngôn ngữ được chọn
   */
  function changeLang() {
    // Lấy mã ngôn ngữ được chọn (vi, en, zh-cn, v.v.)
    var lang = this.value;
    // Lấy đường dẫn canonical (đường dẫn tương đối của trang hiện tại)
    var canonical = this.dataset.canonical;
    // Lấy đường dẫn gốc từ config (ví dụ: /liquidjs/)
    var root = this.dataset.root;

    // Xây dựng đường dẫn mới
    var path = root; // Bắt đầu với root
    // Nếu không phải tiếng Anh, thêm mã ngôn ngữ vào đường dẫn
    if (lang !== 'en') path += lang + '/';

    // Lưu ngôn ngữ đã chọn vào cookie để ghi nhớ lựa chọn của người dùng
    var expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1); // Cookie hết hạn sau 1 năm
    document.cookie = 'nf_lang=' + lang + ';path=/;expires=' + expires.toGMTString();

    // Chuyển hướng đến trang mới với ngôn ngữ đã chọn
    location.href = path + canonical;
  }

  // Gắn sự kiện change cho dropdown ngôn ngữ trên desktop
  document.getElementById('lang-select').addEventListener('change', changeLang);
  // Gắn sự kiện change cho dropdown ngôn ngữ trên mobile
  document.getElementById('mobile-lang-select').addEventListener('change', changeLang);
}());

// ============================================================================
// KHỐI 4: PLAYGROUND - TRÌNH CHỈNH SỬA LIQUID TRỰC TUYẾN
// ============================================================================
(function () {
  /* global liquidjs, ace */

  // Chỉ chạy code này nếu đang ở trang playground
  if (!location.pathname.match(/playground.html$/)) return;

  // Hiển thị phiên bản LiquidJS hiện tại
  updateVersion(liquidjs.version);

  // Khởi tạo engine LiquidJS với giới hạn bộ nhớ và render
  const engine = new liquidjs.Liquid({
    memoryLimit: 1e5,  // Giới hạn 100KB bộ nhớ
    renderLimit: 1e5   // Giới hạn 100KB output
  });

  // Tạo 3 trình chỉnh sửa code (editors)
  const editor = createEditor('editorEl', 'liquid');      // Editor cho template Liquid
  const dataEditor = createEditor('dataEl', 'json');      // Editor cho dữ liệu JSON
  const preview = createEditor('previewEl', 'html');      // Preview kết quả HTML

  // Cấu hình preview editor là read-only
  preview.setReadOnly(true);
  preview.renderer.setShowGutter(false);  // Ẩn số dòng
  preview.renderer.setPadding(20);        // Thêm padding

  // Đọc dữ liệu từ URL hash (nếu có) để khôi phục trạng thái trước đó
  const init = parseArgs(location.hash.slice(1));
  if (init) {
    editor.setValue(init.tpl, 1);      // Đặt template
    dataEditor.setValue(init.data, 1); // Đặt dữ liệu
  }

  // Lắng nghe sự kiện thay đổi trong editors và cập nhật preview
  editor.on('change', update);
  dataEditor.on('change', update);

  // Render lần đầu
  update();
  // Ẩn loader và hiển thị editors
  ready();

  /**
   * Ẩn loader và hiển thị các editors khi đã sẵn sàng
   */
  function ready() {
    const loader = document.querySelector('.loader');
    loader.classList.add('hide');
    loader.setAttribute('aria-busy', false);

    const editors = document.querySelector('#editors');
    editors.classList.remove('hide');
    editors.setAttribute('aria-hide', false);
  }

  /**
   * Tạo một ACE editor với cấu hình cho ngôn ngữ cụ thể
   * @param {string} id - ID của phần tử DOM
   * @param {string} lang - Ngôn ngữ (liquid, json, html)
   * @returns {Object} ACE editor instance
   */
  function createEditor(id, lang) {
    const editor = ace.edit(id);
    editor.setTheme('ace/theme/tomorrow_night');           // Theme tối
    editor.getSession().setMode('ace/mode/' + lang);       // Chế độ ngôn ngữ
    editor.getSession().setOptions({
      tabSize: 2,          // Kích thước tab = 2 spaces
      useSoftTabs: true    // Dùng spaces thay vì tab
    });
    editor.renderer.setScrollMargin(15);  // Margin khi scroll
    return editor;
  }

  /**
   * Parse tham số từ URL hash
   * @param {string} hash - Chuỗi hash từ URL
   * @returns {Object|undefined} Object chứa template và data, hoặc undefined nếu lỗi
   */
  function parseArgs(hash) {
    if (!hash) return;
    try {
      // Hash format: base64(template),base64(data)
      let [tpl, data] = hash.split(',').map(atou);
      data = data || '{}';  // Mặc định là object rỗng nếu không có data
      return { tpl, data };
    } catch (e) { }
  }

  /**
   * Serialize template và data thành chuỗi hash cho URL
   * @param {Object} obj - Object chứa tpl và data
   * @returns {string} Chuỗi hash đã encode
   */
  function serializeArgs(obj) {
    return utoa(obj.tpl) + ',' + utoa(obj.data);
  }

  /**
   * Cập nhật preview khi template hoặc data thay đổi
   * Hàm async để xử lý render bất đồng bộ
   */
  async function update() {
    const tpl = editor.getValue();       // Lấy template từ editor
    const data = dataEditor.getValue();  // Lấy data từ editor

    // Cập nhật URL hash để có thể chia sẻ/bookmark
    history.replaceState({}, '', '#' + serializeArgs({ tpl, data }));

    try {
      // Parse và render template với data
      const html = await engine.parseAndRender(tpl, JSON.parse(data));
      preview.setValue(html, 1);  // Hiển thị kết quả
      document.getElementById('renderEl').innerHTML = html; // Hiển thị render thực tế
    } catch (err) {
      // Nếu có lỗi, hiển thị stack trace
      preview.setValue(err.stack, 1);
      document.getElementById('renderEl').innerHTML = err.message;
      throw err;
    }
  }

  /**
   * Decode chuỗi base64 thành UTF-8
   * @param {string} str - Chuỗi base64
   * @returns {string} Chuỗi UTF-8 đã decode
   */
  function atou(str) {
    return decodeURIComponent(escape(atob(str)));
  }

  /**
   * Encode chuỗi UTF-8 thành base64
   * @param {string} str - Chuỗi UTF-8
   * @returns {string} Chuỗi base64 đã encode
   */
  function utoa(str) {
    return btoa(unescape(encodeURIComponent(str)));
  }

  /**
   * Cập nhật hiển thị phiên bản LiquidJS
   * @param {string} version - Số phiên bản
   */
  function updateVersion(version) {
    document.querySelector('.version').innerHTML = `
      liquidjs@<a target="_blank" href="https://www.npmjs.com/package/liquidjs/v/${version}">${version}</a>
    `;
  }
}());

// ============================================================================
// KHỐI 5: SERVICE WORKER - CACHE TRANG WEB ĐỂ HOẠT ĐỘNG OFFLINE
// ============================================================================
if ('serviceWorker' in navigator) {
  // Đăng ký service worker khi trang đã load xong
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/sw.js').then(function (reg) {
      console.log('ServiceWorker registration successful with scope: ', reg.scope);
    }).catch(function (err) {
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}
