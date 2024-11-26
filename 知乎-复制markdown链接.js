// ==UserScript==
// @name         知乎-复制markdown链接
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  复制为markdown链接
// @author       yankj12
// @require      https://code.jquery.com/jquery-3.3.1.min.js
// @match        *://*.zhihu.com/*
// @grant        none
// ==/UserScript==
// ==/UserScript==

/**
icon的使用参考：https://icons.getbootstrap.com/icons/link-45deg/
*/

/**
* 复制链接为markdown格式的链接，并且将链接复制道粘贴板
*/
function copyMarkdownLink(url, title){

    var mdLinkStr = '[' + title + '](' + url + ')'
    //console.log(mdLinkStr)

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
}


function callback(mutationsList, observer) {
    console.log(13,mutationsList);
    console.log(14,observer);
    console.log(111111111);
}


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

    // https://zhuanlan.zhihu.com/p/1247188791
    if(url.indexOf('//zhuanlan.zhihu.com/p/') != -1){
        console.log('知乎专栏')

        // <button aria-live="polite" type="button" class="Button Button--plain Button--withIcon Button--withLabel">
        var linkIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-link-45deg" viewBox="0 0 16 16">\
            <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1 1 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z"/>\
            <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z"/>\
        </svg>';
        //var iconHtml = '<span style="display:inline-flex;align-items:center">​<svg width="17" height="17" viewBox="0 0 24 24" class="Zi Zi--InsertLink ShareMenu-Icon--normal" color="#9FADC7" fill="currentColor"><path fill-rule="evenodd" d="M5.327 18.883a3.005 3.005 0 0 1 0-4.25l2.608-2.607a.75.75 0 1 0-1.06-1.06l-2.608 2.607a4.505 4.505 0 0 0 6.37 6.37l2.608-2.607a.75.75 0 0 0-1.06-1.06l-2.608 2.607a3.005 3.005 0 0 1-4.25 0Zm5.428-11.799a.75.75 0 0 0 1.06 1.06L14.48 5.48a3.005 3.005 0 0 1 4.25 4.25l-2.665 2.665a.75.75 0 0 0 1.061 1.06l2.665-2.664a4.505 4.505 0 0 0-6.371-6.372l-2.665 2.665Zm5.323 2.117a.75.75 0 1 0-1.06-1.06l-7.072 7.07a.75.75 0 0 0 1.061 1.06l7.071-7.07Z" clip-rule="evenodd"></path></svg></span>';
        var iconHtml = linkIcon;
        //var htmlStr = '<button id="copyMdLink" aria-live="polite" type="button" class="Button Button--plain Button--withIcon Button--withLabel">' + iconHtml + '复制md链接</button>';
        var htmlStr = '<a href="javascript:void(0);" id="copyMdLink" style="display:inline-flex;align-items:center;font-size:14px;color:#8491A5;">' + iconHtml + '复制md链接</a>';
        $("button:contains('喜欢')").before(htmlStr);
        $("#copyMdLink").on("click",function(){

            $(this);
            //console.log($(this).html());

            var articalName = $("h1.Post-Title").text();
            var authorName = $("span[class='UserLink AuthorInfo-name']").text();
            var title = articalName + ' - ' + authorName + ' - 知乎';

            copyMarkdownLink(url, title)
            var checkCircleIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-circle" viewBox="0 0 16 16">\
                <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0"/>\
                <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>\
            </svg>';
            $('#copyMdLink').html(checkCircleIcon + '复制链接成功');
            setTimeout(() => {

                $('#copyMdLink').html(iconHtml + '复制md链接');
            }, 3000);

            /*
            var mdLinkStr = '[' + articalName + ' - ' + authorName + ' - 知乎](' + url + ')'
            //console.log(mdLinkStr)

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
            */
        });
    }else if(url.indexOf('//www.zhihu.com/question/') != -1){
        console.log('知乎问题')
        // 知乎问题的情况
        // https://www.zhihu.com/question/576381846

        /*
        $('div.Question-main').on('DOMAttrModified', function(event) {
          // 在DOM属性发生改变时触发的代码
          console.log('aaaaaaa');
        });
        */
        setTimeout(() => {

            // 目标元素
            //var targetElement = document.querySelector('div.Question-main');
            var targetElement = document.querySelector('div[class="Card MoreAnswers"]>div.List');
            console.log(targetElement)

            // 创建一个MutationObserver实例
            var observer = new MutationObserver((mutations) => {
                console.log(mutations);

                mutations.forEach((mutation) => {
                    if (mutation.type === 'childList') {


                        mutation.addedNodes.forEach((addedNode) => {
                            console.log(`添加了子元素：${addedNode.nodeName}`);
                            // 执行相应的处理逻辑
                        });

                        mutation.removedNodes.forEach((removedNode) => {
                            console.log(`移除了子元素：${removedNode.nodeName}`);
                            // 执行相应的处理逻辑
                        });
                    }
                });
            });

            // 配置观察器
            var config = { attributes: true, childList: true, subtree: true };

            // 启动观察器
            observer.observe(targetElement, config);
        }, 5000)
    }

})();
