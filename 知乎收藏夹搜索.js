// ==UserScript==
// @name         知乎收藏夹搜索
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  知乎收藏夹弹出界面中根据名称快速搜索收藏夹
// @author       yankj12
// @require      https://code.jquery.com/jquery-3.3.1.min.js
// @match        *://www.zhihu.com/*
// @grant        none
// ==/UserScript==

function collectionButtonOnClick(){
    console.log('collectionButtonOnClick');
    // 在收藏夹弹出窗口中增加输入框
    var innertext = document.querySelector('div.Modal-subtitle').innerHTML;
    innertext += '<input type="text">';
    document.querySelector('div.Modal-subtitle').innerHTML=innertext;

    // 输入框onchange后隐藏或者显示对应的收藏夹

    // 一种思路是设置div的隐藏或者显示属性，并且调整滚动条的长度
    // 不建议直接移除div，因为关掉收藏夹窗口后重新打开，应该展示所有的收藏夹
    var items = document.querySelectorAll('div.Favlists-item');
    console.log(items);
    for(var i=0;i<items.length;i++){
        //items[i].style.visibility="hidden";
        // style="visibility: none;"
        // document.getElementById("typediv1").style.visibility="hidden";//隐藏
        // document.getElementById("typediv1").style.visibility="visible";//显示
    }
    //$("div.right-column").remove();
    //console.log('移除右侧教程列表');
}

(function() {
    'use strict';
    // <button type="button" class="Button ContentItem-action Button--plain Button--withIcon Button--withLabel">
    var collectionBtns = document.querySelectorAll('button.ContentItem-action');
    console.log(collectionBtns);
    console.log(collectionBtns[0]);
    collectionBtns[0].addEventListener("click",collectionButtonOnClick,false);
})();