// ==UserScript==
// @name         百度百科-复制为markdown
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  复制为markdown
// @author       yankj12
// @require      https://code.jquery.com/jquery-3.3.1.min.js
// @require      https://cdn.bootcdn.net/ajax/libs/turndown/7.2.0/turndown.min.js
// @match        *://baike.baidu.com/*
// @grant        none
// ==/UserScript==
// ==/UserScript==


/**
* 复制百度百科内容为markdown格式，并且将内容复制道粘贴板
*/
function copyBaikeToMarkdown(){

    var url = window.location.href;
    var title = $('h1[class^="lemmaTitle"]').text();

    var mdLinkStr = '[' + title + '-百度百科](' + url + ')'

    console.log(mdLinkStr)

    // 获取百科html内容
    var htmlContent = $('div[class^="contentTab"]').html();
    // html转换为markdown
    var turndownService = new TurndownService();
    // 使用 Turndown 进行转换
    var baikeMarkdown = turndownService.turndown(htmlContent);

    // 输出 Markdown
    //console.log(baikeMarkdown);

    // markdown文本内容
    var markdownStr = '';
    markdownStr += '# ' + mdLinkStr + '\n\n';
    markdownStr += baikeMarkdown + '\n';
    markdownStr += '\n# 参考资料\n\n- ' + mdLinkStr + '\n';

    // 获取文本框中的文本内容
    var text = markdownStr;

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
}


/**
* 优化页面展示
*/
function optimizeDisplay(){
    // 调整页面展示内容
    // 将topTool移动到内容div之前
    var topTools = $('div[class^="topToolsWrap"');
    var mainContent = $('div[class^="mainContent"]');
    mainContent.prepend(topTools);
    $('div[class^="titleLine"]').remove();
    // 移除播报、编辑按钮
    $('span[class^="ttsBtn"]').remove();
    $('div[class^="editLemma"]').remove();
    // 移除标题后面的按钮列表
    $('div[class^="btnList"]').remove();

    // 他说
    $('div[class^="tashuoWrap"]').remove();

    try {
        // 本词条缺少概述图，补充相关内容使词条更完整
        $('div[class^="editPrompt"]').remove();
    }catch(err) {
        console.log(err.message);
    }

}

(function() {
    'use strict';
    //var url = window.location.href;

    console.log('百度百科')

    // <button aria-live="polite" type="button" class="Button Button--plain Button--withIcon Button--withLabel">
    var iconHtml = '<span style="display:inline-flex;align-items:center">​<svg width="17" height="17" viewBox="0 0 24 24" class="Zi Zi--InsertLink ShareMenu-Icon--normal" color="#9FADC7" fill="currentColor"><path fill-rule="evenodd" d="M5.327 18.883a3.005 3.005 0 0 1 0-4.25l2.608-2.607a.75.75 0 1 0-1.06-1.06l-2.608 2.607a4.505 4.505 0 0 0 6.37 6.37l2.608-2.607a.75.75 0 0 0-1.06-1.06l-2.608 2.607a3.005 3.005 0 0 1-4.25 0Zm5.428-11.799a.75.75 0 0 0 1.06 1.06L14.48 5.48a3.005 3.005 0 0 1 4.25 4.25l-2.665 2.665a.75.75 0 0 0 1.061 1.06l2.665-2.664a4.505 4.505 0 0 0-6.371-6.372l-2.665 2.665Zm5.323 2.117a.75.75 0 1 0-1.06-1.06l-7.072 7.07a.75.75 0 0 0 1.061 1.06l7.071-7.07Z" clip-rule="evenodd"></path></svg></span>';
    // href=”javascript:void(0);” οnclick=”js_method()”
    // onclick="copyBaikeToMarkdown()"
    var htmlStr = '<div class="topCollect_s3qcq topToolsBox__item_YX2sS"><span><a id="copyBaiduBaikeMd" href="javascript:void(0);" >复制为md</a></span></div>';
    // $('div[class^="topToolsBox"]')
    //$("button:contains('喜欢')").before(htmlStr);
    $('div[class^="topToolsBox"]').prepend(htmlStr);
    $("#copyBaiduBaikeMd").on("click",copyBaikeToMarkdown);

    // 等待几秒之后，调整页面展示内容
    setTimeout(() => {
        // 优化页面展示
        optimizeDisplay();
    }, 5000);

})();
