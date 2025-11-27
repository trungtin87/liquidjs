/**
 * File: helpers.js
 * Mục đích: Định nghĩa các helper function cho Hexo để tạo HTML động
 * Các helper này được sử dụng trong các template Swig để tạo menu, sidebar, navigation, v.v.
 */

/* global hexo */

'use strict'

// Import các module cần thiết
const { resolve, basename } = require('path')
const { readFileSync } = require('fs')
const cheerio = require('cheerio')
const fullUrlFor = hexo.extend.helper.get('full_url_for').bind(hexo)

// ============================================================================
// DANH SÁCH CÁC ĐƯỜNG DẪN CẦN HỖ TRỢ ĐA NGÔN NGỮ
// ============================================================================
/**
 * Các đường dẫn này sẽ có phiên bản cho từng ngôn ngữ
 * Ví dụ: /tutorials -> /vi/tutorials (tiếng Việt), /zh-cn/tutorials (tiếng Trung)
 */
const localizedPath = ['/tutorials', '/filters', '/tags', '/playground']

// ============================================================================
// HELPER 1: page_nav - TẠO NAVIGATION TRƯỚC/SAU CHO BÀI VIẾT
// ============================================================================
/**
 * Tạo các nút "Trang trước" và "Trang sau" ở cuối mỗi bài viết
 * Dựa trên thứ tự trong sidebar để xác định trang trước/sau
 */
hexo.extend.helper.register('page_nav', function () {
  // Lấy loại trang (tutorials, filters, tags, v.v.) từ đường dẫn
  const type = this.page.canonical_path.split('/')[0]
  // Lấy cấu trúc sidebar tương ứng từ file _data/sidebar.yml
  const sidebar = this.site.data.sidebar[type]
  // Lấy tên file hiện tại
  const path = basename(this.path)
  // Object để map từ filename -> title
  const list = {}
  // Prefix cho key translation
  const prefix = 'sidebar.' + type + '.'

  // Duyệt qua sidebar để xây dựng danh sách các trang
  for (const i in sidebar) {
    if (typeof sidebar[i] === 'string') {
      // Nếu là string đơn giản, thêm vào list
      list[sidebar[i]] = i
    } else {
      // Nếu là object (section), duyệt qua các item bên trong
      for (const j in sidebar[i]) list[sidebar[i][j]] = j
    }
  }

  // Lấy danh sách các filename theo thứ tự
  const keys = Object.keys(list)
  // Tìm vị trí của trang hiện tại
  const index = keys.indexOf(path)
  let result = ''

  // Nếu không phải trang đầu tiên, tạo link "Trang trước"
  if (index > 0) {
    result += `<a href="${keys[index - 1]}" class="article-footer-prev" title="${this.__(prefix + list[keys[index - 1]])}"><i class="icon-chevron-left"></i><span>${this.__('page.prev')}</span></a>`
  }

  // Nếu không phải trang cuối cùng, tạo link "Trang sau"
  if (index < keys.length - 1) {
    result += `<a href="${keys[index + 1]}" class="article-footer-next" title="${this.__(prefix + list[keys[index + 1]])}"><span>${this.__('page.next')}</span><i class="icon-chevron-right"></i></a>`
  }

  return result
})

// ============================================================================
// HELPER 2: raw - ĐỌC VÀ ESCAPE NỘI DUNG FILE
// ============================================================================
/**
 * Đọc nội dung file và escape các ký tự HTML đặc biệt
 * Dùng để hiển thị code example mà không bị render
 */
hexo.extend.helper.register('raw', function (filepath) {
  const content = readFileSync(resolve(this.view_dir, filepath), 'utf8')
    .replace(/&/g, '&amp;')   // Escape &
    .replace(/</g, '&lt;')    // Escape <
    .replace(/>/g, '&gt;')    // Escape >
    .replace(/"/g, '&quot;')  // Escape "
    .replace(/'/g, '&#39;')   // Escape '
  return content
})

// ============================================================================
// HELPER 3: doc_sidebar - TẠO SIDEBAR CHO TRANG TÀI LIỆU
// ============================================================================
/**
 * Tạo HTML cho sidebar bên trái của trang tài liệu
 * Hiển thị danh sách các bài viết được nhóm theo section
 */
hexo.extend.helper.register('doc_sidebar', function (className) {
  // Lấy loại trang từ đường dẫn
  const type = this.page.canonical_path.split('/')[0]
  // Lấy cấu trúc sidebar từ config
  const sidebar = this.site.data.sidebar[type]
  // Lấy tên file hiện tại
  const path = basename(this.path)
  let result = ''
  const { __ } = this  // Function dịch ngôn ngữ
  const prefix = 'sidebar.' + type + '.'

  // Nếu không có sidebar cho loại trang này, return rỗng
  if (typeof sidebar === 'undefined') {
    return ''
  }

  // Duyệt qua các section trong sidebar
  for (const [title, menu] of Object.entries(sidebar)) {
    if (typeof menu === 'string') {
      // Nếu là link đơn giản (không có section)
      renderLink(title, menu)
    } else {
      // Nếu là section chứa nhiều link
      renderSection(title, menu)
    }
  }

  return result

  /**
   * Render một link trong sidebar
   * @param {string} text - Text hiển thị
   * @param {string} link - Đường dẫn
   */
  function renderLink(text, link) {
    let itemClass = className + '-link'
    // Thêm class 'current' nếu đang ở trang này
    if (link === path) itemClass += ' current'

    // Dịch text nếu có translation, nếu không giữ nguyên
    const localized = __(prefix + text) === prefix + text ? text : __(prefix + text)
    result += '<a href="' + link + '" class="' + itemClass + '">' + localized + '</a>'
  }

  /**
   * Render một section trong sidebar
   * @param {string} title - Tiêu đề section
   * @param {Object} menu - Object chứa các link trong section
   */
  function renderSection(title, menu) {
    // Render tiêu đề section
    result += '<strong class="' + className + '-title">' + __(prefix + title) + '</strong>'
    // Render các link trong section
    for (const [text, link] of Object.entries(menu)) renderLink(text, link)
  }
})

// ============================================================================
// HELPER 4: header_menu - TẠO MENU HEADER CHÍNH
// ============================================================================
/**
 * Tạo HTML cho menu chính ở header
 * Tự động thêm prefix ngôn ngữ cho các trang được localize
 */
hexo.extend.helper.register('header_menu', function (className) {
  // Lấy cấu trúc menu từ file _data/menu.yml
  const menu = this.site.data.menu
  let result = ''
  // Lấy ngôn ngữ của trang hiện tại
  const lang = this.page.lang
  const isEnglish = lang === 'en'

  // Duyệt qua từng item trong menu
  for (const [title, path] of Object.entries(menu)) {
    let langPath = path

    // Kiểm tra xem path có trong danh sách cần localize không
    // Sử dụng startsWith để kiểm tra prefix (ví dụ: /tutorials/intro.html bắt đầu với /tutorials)
    const isLocalized = localizedPath.some(prefix => path.startsWith(prefix))

    // Nếu không phải tiếng Anh và path cần localize, thêm prefix ngôn ngữ
    // Ví dụ: /tutorials/intro.html -> /vi/tutorials/intro.html
    if (!isEnglish && isLocalized) langPath = '/' + lang + path

    // Tạo URL đầy đủ (bao gồm config.root nếu có)
    const url = this.url_for(langPath)

    // Kiểm tra xem có phải menu item đang active không
    const active = ('/' + this.page.canonical_path).slice(0, path.length) === path ? ' active' : ''

    // Tạo HTML cho menu item
    result += `<a href="${url}" class="${className}-link${active}">${this.__('menu.' + title)}</a>`
  }

  return result
})

// ============================================================================
// HELPER 5: canonical_url - TẠO URL CANONICAL ĐẦY ĐỦ
// ============================================================================
/**
 * Tạo URL canonical đầy đủ (bao gồm domain) cho SEO
 * @param {string} lang - Mã ngôn ngữ (optional)
 */
hexo.extend.helper.register('canonical_url', function (lang) {
  let path = this.page.path
  // Nếu có ngôn ngữ và không phải tiếng Anh, thêm prefix ngôn ngữ
  if (lang && lang !== 'en') path = lang + '/' + path

  // Tạo URL đầy đủ với domain
  return fullUrlFor(path)
})

// ============================================================================
// HELPER 6: url_for_lang - TẠO URL VỚI HỖ TRỢ NGÔN NGỮ
// ============================================================================
/**
 * Tạo URL có hỗ trợ đa ngôn ngữ
 * Tự động thêm prefix ngôn ngữ nếu cần
 * @param {string} path - Đường dẫn gốc
 */
hexo.extend.helper.register('url_for_lang', function (path) {
  // Lấy ngôn ngữ của trang hiện tại
  const lang = this.page.lang
  // Tạo URL cơ bản
  let url = this.url_for(path)

  // Nếu không phải tiếng Anh và path bắt đầu với /
  if (lang !== 'en' && path[0] === '/') {
    // Lấy root path từ config (ví dụ: /liquidjs/)
    const root = this.config.root
    // Tạo URL với format: root + lang + path
    // Ví dụ: /liquidjs/ + vi + /tutorials -> /liquidjs/vi/tutorials
    url = root + lang + path
  }

  return url
})

// ============================================================================
// HELPER 7: raw_link - TẠO LINK ĐẾN FILE NGUỒN TRÊN GITHUB
// ============================================================================
/**
 * Tạo link "Edit on GitHub" để người dùng có thể đóng góp
 * @param {string} path - Đường dẫn file trong thư mục source
 */
hexo.extend.helper.register('raw_link', path => `https://github.com/harttle/liquidjs/edit/master/docs/source/${path}`)

// ============================================================================
// HELPER 8: page_anchor - THÊM ANCHOR LINK CHO CÁC HEADING
// ============================================================================
/**
 * Thêm anchor link (#) cho tất cả các heading (h1-h6) trong nội dung
 * Cho phép người dùng link trực tiếp đến một section cụ thể
 * @param {string} str - HTML content
 */
hexo.extend.helper.register('page_anchor', str => {
  // Parse HTML bằng cheerio (jQuery-like library)
  const $ = cheerio.load(str, { decodeEntities: false })
  // Tìm tất cả các heading
  const headings = $('h1, h2, h3, h4, h5, h6')

  // Nếu không có heading, return nguyên content
  if (!headings.length) return str

  // Duyệt qua từng heading
  headings.each(function () {
    const id = $(this).attr('id')  // Lấy ID của heading

    // Thêm class và anchor link vào heading
    $(this)
      .addClass('article-heading')
      .append(`<a class="article-anchor" href="#${id}" aria-hidden="true"></a>`)
  })

  // Return HTML đã được modify
  return $.html()
})

// ============================================================================
// HELPER 9: canonical_path_for_nav - LẤY CANONICAL PATH CHO NAVIGATION
// ============================================================================
/**
 * Lấy canonical path của trang nếu nó thuộc các trang được localize
 * Dùng để xác định path khi chuyển đổi ngôn ngữ
 */
hexo.extend.helper.register('canonical_path_for_nav', function () {
  const path = this.page.canonical_path
  // Kiểm tra xem path có bắt đầu với một trong các prefix được localize không
  for (const slug of localizedPath) if (path.startsWith(slug)) return path
  // Nếu không, return rỗng
  return ''
})

// ============================================================================
// HELPER 10: lang_name - LẤY TÊN NGÔN NGỮ
// ============================================================================
/**
 * Lấy tên hiển thị của ngôn ngữ
 * @param {string} lang - Mã ngôn ngữ (en, vi, zh-cn)
 * @returns {string} Tên ngôn ngữ (English, Tiếng Việt, 中文)
 */
hexo.extend.helper.register('lang_name', function (lang) {
  const data = this.site.data.languages[lang]
  return data.name || data
})

// ============================================================================
// HELPER 11: hexo_version - LẤY PHIÊN BẢN HEXO
// ============================================================================
/**
 * Lấy phiên bản Hexo đang sử dụng
 * @returns {string} Số phiên bản
 */
hexo.extend.helper.register('hexo_version', function () {
  return this.env.version
})
