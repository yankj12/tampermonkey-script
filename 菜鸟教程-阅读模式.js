// ==UserScript==
// @name         菜鸟教程-阅读模式
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       yankj12
// @match        *://www.runoob.com/w3cnote/*
// @grant        none
// ==/UserScript==

// 将右侧教程列表隐藏，这样ctrl-p打印成pdf的时候就不会有多余的内容了
(function() {
    'use strict';

    // 移除右侧教程列表
    //sidebar-box cate-list
    var rightColumn = document.querySelectorAll('div.right-column');
    if(rightColumn !== null && rightColumn.length > 0){
        rightColumn[0].innerHTML='';
    }
    console.log('移除右侧教程列表');

    // 移除右侧回到顶部等功能按钮
    var toolBtn = document.querySelector('div.fixed-btn');
    if(toolBtn !== null){
        toolBtn.innerHTML = '';
    }
    console.log('移除右侧回到顶部等功能按钮');

    // 顶部导航栏
    // class="container navigation"
    var navigation = document.querySelector('div.navigation');
    if(navigation !== null){
        navigation.innerHTML = '';
    }
    console.log('移除顶部导航栏');

    // 顶部logo及搜索框
    // class="container logo-search"
    var logoSearch = document.querySelector('div.logo-search');
    if(logoSearch !== null){
        logoSearch.innerHTML = '';
    }
    console.log('移除顶部logo及搜索框');

    // 底部分享
    // id="respond" class='no_webshot'
    var shareBox = document.querySelector('#respond');
    if(shareBox !== null){
        shareBox.innerHTML = '';
    }
    console.log('移除底部分享');

    // 底部广告
    // article-heading-ad
    var bottomAD = document.querySelector('div.article-heading-ad');
    if(bottomAD !== null){
        bottomAD.innerHTML = '';
    }
    console.log('移除底部广告');

    // 底部备案号等信息
    // id="footer"
    var copyrightBox = document.querySelector('#footer');
    if(copyrightBox !== null){
        copyrightBox.innerHTML = '';
    }
    console.log('移除底部备案号等信息');

    // 改变样式
    // class="col middle-column big-middle-column"
    var middleColumn = document.querySelector('div.big-middle-column');
    if(middleColumn !== null){
        middleColumn.className='col big-middle-column';
    }
    console.log('更改中间列为更宽的样式，以便于阅读');
})();