// ==UserScript==
// @name         知乎-复制markdown链接
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  复制为markdown链接
// @author       yankj12
// @require      https://code.jquery.com/jquery-3.3.1.min.js
// @match        *://zhuanlan.zhihu.com/*
// @grant        none
// ==/UserScript==
// ==/UserScript==

(function() {
    'use strict';
/*
    var items = document.querySelectorAll('div[class^="ContentItem-actions"]');
    // <button aria-live="polite" type="button" class="Button ContentItem-action" clip-rule="evenodd"></path></svg></span>复制</button>
    for(var i=0;i<items.length;i++){
        // div[text()="Hello World"]
        var likeBtn = items[i].querySelector('button[text()="喜欢"]');
        var copyBtn = document.createElement('<button aria-live="polite" type="button" class="Button ContentItem-action" clip-rule="evenodd"></path></svg></span>复制</button>');
        likeBtn.appendAfter(copyBtn);
        console.log(likeBtn)
    }
    console.log('')
*/
    var url = window.location.href;
    var articalName = $("h1.Post-Title").text();
    var authorName = $("span[class='UserLink AuthorInfo-name']").text();
    var mdLinkStr = '[' + articalName + ' - ' + authorName + ' - 知乎](' + url + ')'
    //console.log(mdLinkStr)
    // <button aria-live="polite" type="button" class="Button Button--plain Button--withIcon Button--withLabel">
    var iconHtml = '<span style="display:inline-flex;align-items:center">​<svg width="17" height="17" viewBox="0 0 24 24" class="Zi Zi--InsertLink ShareMenu-Icon--normal" color="#9FADC7" fill="currentColor"><path fill-rule="evenodd" d="M5.327 18.883a3.005 3.005 0 0 1 0-4.25l2.608-2.607a.75.75 0 1 0-1.06-1.06l-2.608 2.607a4.505 4.505 0 0 0 6.37 6.37l2.608-2.607a.75.75 0 0 0-1.06-1.06l-2.608 2.607a3.005 3.005 0 0 1-4.25 0Zm5.428-11.799a.75.75 0 0 0 1.06 1.06L14.48 5.48a3.005 3.005 0 0 1 4.25 4.25l-2.665 2.665a.75.75 0 0 0 1.061 1.06l2.665-2.664a4.505 4.505 0 0 0-6.371-6.372l-2.665 2.665Zm5.323 2.117a.75.75 0 1 0-1.06-1.06l-7.072 7.07a.75.75 0 0 0 1.061 1.06l7.071-7.07Z" clip-rule="evenodd"></path></svg></span>';
    var htmlStr = '<button id="copyMdLink" aria-live="polite" type="button" class="Button Button--plain Button--withIcon Button--withLabel">' + iconHtml + '复制md链接</button>';
    $("button:contains('喜欢')").before(htmlStr);
    $("#copyMdLink").on("click",function(){
	    $(this);
	    //console.log($(this).html());
        console.log(mdLinkStr)

        // 获取文本框中的文本内容
        var text = mdLinkStr;

        // 创建一个临时的textarea元素
        var $tempTextarea = $("<textarea>");

        // 将文本内容设置到临时的textarea元素中
        $tempTextarea.val(text);

        // 将临时的textarea元素添加到页面中
        $("body").append($tempTextarea);

        // 选中临时的textarea元素中的文本
        $tempTextarea.select();

        // 执行复制文本的操作
        document.execCommand("copy");

        // 移除临时的textarea元素
        $tempTextarea.remove();
    });


})();
