// ==UserScript==
// @name         bing搜索-日历增强
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  当bing搜索‘日历’相关内容时，在搜索结果集最顶端显示日历
// @author       yankj12
// @match        *://cn.bing.com/search*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 定位到搜索框，获取到搜索框中的值，如果包含“日历”，则使用日历增强功能
    var searchbox = document.querySelector('.b_searchbox');
    var keyword = searchbox.value;
    //console.log(keyword);

    if(keyword.indexOf('日历') > -1){
        // 判断关键字是否包含“日历”
        console.log('搜索关键词包含“日历”二字');
        // 定位到搜索结果集，在搜索结果集最顶端显示日历
        var resultBox = document.getElementById('b_results');
        var topItem = resultBox.firstChild;

        // 通过iframe的方式引入其他网页的日历
        // 目前日历引用自https://www.hao123.com/rili
        var iframe = document.createElement('iframe');
        iframe.id = 'fileUploaderEmptyHole';
        iframe.src = 'https://www.hao123.com/rili';
        iframe.width = 1000;
        iframe.height = 800;
        resultBox.insertBefore(iframe, topItem)

        // 移除侧边栏，否则会挡着日历
        var as = document.querySelector('aside');
        as.innerHTML = ''
    }
})();