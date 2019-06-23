// ==UserScript==
// @name         阅读-bookset-添加书籍到书单
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  添加书籍到本地的书籍清单中
// @author       yankj12
// @require      https://code.jquery.com/jquery-3.3.1.min.js
// @match        *://bookset.me/*.html
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    console.log('添加书籍到书单');

    // 书籍信息
    document.querySelectorAll('div.mbm-book-details-outer');
    document.querySelectorAll('div.mbm-book-details');

    // 书籍摘录引用等内容等信息
    var bookExcerptDiv = document.querySelectorAll('div.mbm-book-excerpt');
    var bookExcerptSpan = document.querySelectorAll('div.mbm-book-excerpt>span.mbm-book-excerpt-text');
    var bookExcerpt = bookExcerptSpan[0].innerText;
    console.log(bookExcerpt);
    // 书籍信息
    // 时间（添加到网站的时间)
    // 书名
    // 作者
})();