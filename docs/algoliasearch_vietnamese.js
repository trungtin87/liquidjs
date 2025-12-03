/*! algoliasearch 3.35.1 | © 2014, 2015 Algolia SAS | github.com/algolia/algoliasearch-client-js */
(function (f) { var g; if (typeof window !== 'undefined') { g = window } else if (typeof self !== 'undefined') { g = self } g.ALGOLIA_MIGRATION_LAYER = f() })(function () {
    var define, module, exports; return (function e(t, n, r) { function s(o, u) { if (!n[o]) { if (!t[o]) { var a = typeof require == "function" && require; if (!u && a) return a(o, !0); if (i) return i(o, !0); var f = new Error("Cannot find module '" + o + "'"); throw f.code = "MODULE_NOT_FOUND", f } var l = n[o] = { exports: {} }; t[o][0].call(l.exports, function (e) { var n = t[o][1][e]; return s(n ? n : e) }, l, l.exports, e, t, n, r) } return n[o].exports } var i = typeof require == "function" && require; for (var o = 0; o < r.length; o++)s(r[o]); return s })({
        1: [function (require, module, exports) {

            // Hàm này dùng để tải một script từ URL (src)
            // Nhiệm vụ: Tạo thẻ <script>, cấu hình các thuộc tính (async, charset...), và gắn vào <head>
            module.exports = function load(src, opts, cb) {
                var head = document.head || document.getElementsByTagName('head')[0]
                var script = document.createElement('script')

                if (typeof opts === 'function') {
                    cb = opts
                    opts = {}
                }

                opts = opts || {}
                cb = cb || function () { }

                script.type = opts.type || 'text/javascript'
                script.charset = opts.charset || 'utf8';
                script.async = 'async' in opts ? !!opts.async : true
                script.src = src

                if (opts.attrs) {
                    setAttributes(script, opts.attrs)
                }

                if (opts.text) {
                    script.text = '' + opts.text
                }

                var onend = 'onload' in script ? stdOnEnd : ieOnEnd
                onend(script, cb)

                // Một số trình duyệt cũ (firefox) gặp lỗi với việc phát hiện 'in' ở trên
                // nên để dự phòng, chúng ta luôn set onload
                // IE cũ sẽ bỏ qua cái này và IE mới sẽ set onload
                if (!script.onload) {
                    stdOnEnd(script, cb);
                }

                head.appendChild(script)
            }

            // Hàm thiết lập các thuộc tính cho thẻ script
            function setAttributes(script, attrs) {
                for (var attr in attrs) {
                    script.setAttribute(attr, attrs[attr]);
                }
            }

            // Hàm xử lý khi script tải xong (chuẩn)
            function stdOnEnd(script, cb) {
                script.onload = function () {
                    this.onerror = this.onload = null
                    cb(null, script)
                }
                script.onerror = function () {
                    // this.onload = null ở đây là cần thiết
                    // bởi vì ngay cả IE9 cũng hoạt động không giống các trình duyệt khác
                    this.onerror = this.onload = null
                    cb(new Error('Failed to load ' + this.src), script)
                }
            }

            // Hàm xử lý khi script tải xong cho IE (Internet Explorer)
            function ieOnEnd(script, cb) {
                script.onreadystatechange = function () {
                    if (this.readyState != 'complete' && this.readyState != 'loaded') return
                    this.onreadystatechange = null
                    cb(null, script) // không có cách nào để bắt lỗi tải trong IE8
                }
            }

        }, {}], 2: [function (require, module, exports) {
            'use strict';

            // Module này giúp tìm xem trang hiện tại có đang sử dụng
            // phiên bản cdn.jsdelivr.net/algoliasearch/latest/$BUILDNAME.min.js hay không
            // Nhiệm vụ: Kiểm tra các thẻ script trong trang để xem có cái nào khớp với pattern 'latest' không.

            module.exports = isUsingLatest;

            function isUsingLatest(buildName) {
                var toFind = new RegExp('cdn\\.jsdelivr\\.net/algoliasearch/latest/' +
                    buildName.replace('.', '\\.') + // algoliasearch, algoliasearch.angular
                    '(?:\\.min)?\\.js$'); // [.min].js

                var scripts = document.getElementsByTagName('script');
                var found = false;
                for (var currentScript = 0, nbScripts = scripts.length; currentScript < nbScripts; currentScript++) {
                    if (scripts[currentScript].src && toFind.test(scripts[currentScript].src)) {
                        found = true;
                        break;
                    }
                }

                return found;
            }

        }, {}], 3: [function (require, module, exports) {
            'use strict';

            module.exports = loadV2;

            // Hàm tải phiên bản V2 của thư viện
            // Nhiệm vụ: Hiển thị cảnh báo nếu người dùng đang dùng bản 'latest' (không khuyến khích),
            // và tải script V2 tương ứng.
            function loadV2(buildName) {
                var loadScript = require(1);
                var v2ScriptUrl = '//cdn.jsdelivr.net/algoliasearch/2/' + buildName + '.min.js';

                var message = '-- AlgoliaSearch `latest` warning --\n' +
                    'Cảnh báo, bạn đang sử dụng chuỗi phiên bản `latest` từ jsDelivr để tải thư viện AlgoliaSearch.\n' +
                    'Việc sử dụng `latest` không còn được khuyến khích, bạn nên tải //cdn.jsdelivr.net/algoliasearch/2/algoliasearch.min.js\n\n' +
                    'Ngoài ra, chúng tôi đã cập nhật AlgoliaSearch JavaScript client lên V3. Nếu bạn muốn nâng cấp,\n' +
                    'vui lòng đọc hướng dẫn di chuyển tại https://github.com/algolia/algoliasearch-client-js/wiki/Migration-guide-from-2.x.x-to-3.x.x\n' +
                    '-- /AlgoliaSearch  `latest` warning --';

                if (window.console) {
                    if (window.console.warn) {
                        window.console.warn(message);
                    } else if (window.console.log) {
                        window.console.log(message);
                    }
                }

                // Nếu script hiện tại được tải bất đồng bộ (async),
                // nó sẽ tải script bằng DOMElement
                // ngược lại, nó sẽ tải script bằng document.write
                try {
                    // tại sao \x3c? http://stackoverflow.com/a/236106/147079
                    document.write('\x3Cscript>window.ALGOLIA_SUPPORTS_DOCWRITE = true\x3C/script>');

                    if (window.ALGOLIA_SUPPORTS_DOCWRITE === true) {
                        document.write('\x3Cscript src="' + v2ScriptUrl + '">\x3C/script>');
                        scriptLoaded('document.write')();
                    } else {
                        loadScript(v2ScriptUrl, scriptLoaded('DOMElement'));
                    }
                } catch (e) {
                    loadScript(v2ScriptUrl, scriptLoaded('DOMElement'));
                }
            }

            function scriptLoaded(method) {
                return function log() {
                    var message = 'AlgoliaSearch: loaded V2 script using ' + method;

                    if (window.console && window.console.log) {
                        window.console.log(message);
                    }
                };
            }

        }, { "1": 1 }], 4: [function (require, module, exports) {
            'use strict';

            /* eslint no-unused-vars: [2, {"vars": "local"}] */

            module.exports = oldGlobals;

            // Đặt lại window.AlgoliaSearch.. cũ vào window. để
            // người dùng nâng cấp lên V3 mà không thay đổi code sẽ nhận được cảnh báo
            function oldGlobals() {
                var message = '-- AlgoliaSearch V2 => V3 error --\n' +
                    'Bạn đang cố gắng sử dụng phiên bản mới của AlgoliaSearch JavaScript client với ký hiệu cũ.\n' +
                    'Vui lòng đọc hướng dẫn di chuyển tại https://github.com/algolia/algoliasearch-client-js/wiki/Migration-guide-from-2.x.x-to-3.x.x\n' +
                    '-- /AlgoliaSearch V2 => V3 error --';

                window.AlgoliaSearch = function () {
                    throw new Error(message);
                };

                window.AlgoliaSearchHelper = function () {
                    throw new Error(message);
                };

                window.AlgoliaExplainResults = function () {
                    throw new Error(message);
                };
            }

        }, {}], 5: [function (require, module, exports) {
            'use strict';

            // Script này sẽ được browserified và thêm vào đầu bản build bình thường
            // trực tiếp trong window, không được bao bọc trong bất kỳ định nghĩa module nào
            // Để tránh các trường hợp chúng ta được tải cùng với /latest/
            migrationLayer("algoliasearch");

            // Bây giờ đến code liên quan đến V2:
            //  Nếu client đang sử dụng /latest/$BUILDNAME.min.js, tải V2 của thư viện
            //
            //  Ngược lại, thiết lập một lớp di chuyển (migration layer) sẽ ném lỗi trên các constructor cũ như
            //  new AlgoliaSearch().
            //  Để người dùng nâng cấp từ v2 lên v3 sẽ có thông tin rõ ràng
            //  về những gì cần làm nếu họ chưa đọc hướng dẫn di chuyển
            function migrationLayer(buildName) {
                var isUsingLatest = require(2);
                var loadV2 = require(3);
                var oldGlobals = require(4);

                if (isUsingLatest(buildName)) {
                    loadV2(buildName);
                } else {
                    oldGlobals();
                }
            }

        }, { "2": 2, "3": 3, "4": 4 }]
    }, {}, [5])(5)
});
// ... (Phần còn lại của file chứa các polyfill như Promise, debug, và code chính của AlgoliaSearch V3)
