// ==UserScript==
// @name         百度百科|搜狐|网易号-复制为markdown
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  复制为markdown
// @author       yankj12
// @require      https://code.jquery.com/jquery-3.3.1.min.js
// @require      https://cdn.bootcdn.net/ajax/libs/turndown/7.2.0/turndown.min.js
// @match        *://baike.baidu.com/*
// @match        *://www.sohu.com/*
// @match        *://www.163.com/*
// @grant        none
// ==/UserScript==
// ==/UserScript==

/**
* 复制百度百科内容为markdown格式，并且将内容复制道粘贴板
*/
function copyBaikeToMarkdown(){

    /*
    try {
        // 优化页面展示
        optimizeBaikeDisplay();
    }catch(err) {
        console.log(err.message);
    }
    */

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
    markdownStr += '\n***\n';

    // 获取文本框中的文本内容
    var text = markdownStr;
    // 复制到粘贴板
    copyToClipboard(text);

}

function copySouHuToMarkdown(){

    var url = window.location.href;
    var title = $('div.text-title>h1').text().trim();
    title = title.replace('\n', '');
    if(title.indexOf('原创') > -1){
        title = $('span.title-info-title').text();
    }

    var mdLinkStr = '[' + title + '](' + url + ')'

    console.log(mdLinkStr)

    // 获取html内容
    var htmlContent = $('article.article').html();
    // html转换为markdown
    var turndownService = new TurndownService();
    // 使用 Turndown 进行转换
    var souHuMarkdown = turndownService.turndown(htmlContent);

    // 输出 Markdown
    //console.log(baikeMarkdown);

    // markdown文本内容
    var markdownStr = '';
    markdownStr += '# ' + mdLinkStr + '\n\n';
    markdownStr += souHuMarkdown + '\n';
    markdownStr += '\n# 参考资料\n\n- ' + mdLinkStr + '\n';
    markdownStr += '\n***\n';

    // 获取文本框中的文本内容
    var text = markdownStr;
    // 复制到粘贴板
    copyToClipboard(text);

}


function copy163ToMarkdown(){

    var url = window.location.href;
    var title = $('h1.post_title').text();

    var mdLinkStr = '[' + title + '](' + url + ')'

    console.log(mdLinkStr)

    // 获取html内容
    var htmlContent = $('div.post_body').html();
    // html转换为markdown
    var turndownService = new TurndownService();
    // 使用 Turndown 进行转换
    var souHuMarkdown = turndownService.turndown(htmlContent);

    // 输出 Markdown
    //console.log(baikeMarkdown);

    // markdown文本内容
    var markdownStr = '';
    markdownStr += '# ' + mdLinkStr + '\n\n';
    markdownStr += souHuMarkdown + '\n';
    markdownStr += '\n# 参考资料\n\n- ' + mdLinkStr + '\n';
    markdownStr += '\n***\n';

    // 获取文本框中的文本内容
    var text = markdownStr;
    // 复制到粘贴板
    copyToClipboard(text);

}

function copyToClipboard(text){
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
function optimizeBaikeDisplay(){
    // 调整页面展示内容
    // 将topTool移动到内容div之前
    var topTools = $('div[class^="topToolsWrap"').detach(); //删除元素;
    var mainContent = $('div[class^="mainContent"]');
    mainContent.prepend(topTools);
    $('div[class^="titleLine"]').remove();
    // 移除播报、编辑按钮
    $('span[class^="ttsBtn"]').remove();
    $('div[class^="editLemma"]').remove();
    // 移除标题后面的按钮列表
    $('div[class^="btnList"]').remove();

    // 他说
    try{
        $('div[class^="tashuoWrap"]').remove();
    }catch(err) {
        console.log('移除他说出错\n' + err.message);
    }
    try {
        // 本词条缺少概述图，补充相关内容使词条更完整
        $('div[class^="editPrompt"]').remove();
    }catch(err) {
        console.log(err.message);
    }
    try {
        //class="authorityListPrompt
        // 本词条由“科普中国”科学百科词条编写与应用工作项目 审核 。
        $('div[class^="authorityListPrompt"]').remove();
    }catch(err) {
        console.log(err.message);
    }
    // 相关星图
    try{
        $('div#J-lemma-structured').remove();
    }catch(err) {
        console.log('移除相关星图出错\n' + err.message);
    }
    // 词条图册
    try{
        $('div[class^="albumList"]').remove();
    }catch(err) {
        console.log('移除词条图册出错\n' + err.message);
    }

    // 将参考资料中引用链接中的上箭头替换为空格
    try{
        $('div[class^="gotopWrapper"]').replaceWith('&nbsp;');
    }catch(err) {
        console.log('将参考资料中引用链接中的上箭头替换为空格出错\n' + err.message);
    }
    transDlToTable();
}

/**
* 将dl转换为table
*/
function transDlToTable(){
    var $table = $('<table  border="1" cellspacing="0"></table>');
    $table.append($('<tr><td>|</td><td>条目</td><td>|</td><td>说明</td><td>|</td></tr>'));
    $table.append($('<tr><td>|</td><td>---</td><td>|</td><td>---</td><td>|</td></tr>'));

    var codeBlock = $('<pre><code></code></pre>');
    var codeText = '';
    codeText += '| 条目 | 说明 |\n';
    codeText += '|---|---|\n';

	$('dl[class^="basicInfoBlock"]').each(function(index){
		var rowItems = $(this).children();
		//console.log(rowItems);
		for(var i=0;i<rowItems.length;i++){
			//console.log(rowItems[i]);
			var $tr = $('<tr></tr>');
			var currRow = rowItems[i];
			var colItems = $(currRow).children();
			//console.log(colItems.length)
            var colAry = [];
            $tr.append($('<td>|</td>'));
            codeText += '|';
			$.each($(currRow).children(), function(index, data){
                //colAry.push($(data).text());
				var $td = $('<td>' + $(data).text() + '</td>');
				$tr.append($td);
                $tr.append($('<td>|</td>'));
                codeText += $(data).text().trim().replace('\n','');
                codeText += '|';
			});
            codeText += '\n';

			$table.append($tr);
		}
        codeBlock.html(codeText);
		//$(this).before($table);
		//$(this).remove();
	});
    //$('dl[class^="basicInfoBlock"]').parent().before($table);
    $('dl[class^="basicInfoBlock"]').parent().before(codeBlock);
    $('dl[class^="basicInfoBlock"]').parent().remove();
}

(function() {
    'use strict';
    var url = window.location.href;

    setTimeout(() => {
        if(url.indexOf('baike.baidu.com/item/') > -1){

            // https://baike.baidu.com/item/%E8%8B%B1%E5%9B%BD%E6%96%87%E5%AE%98%E5%88%B6%E5%BA%A6/4837370
            console.log('百度百科')

            // href=”javascript:void(0);” οnclick=”js_method()”
            // onclick="copyBaikeToMarkdown()"
            //var htmlStr = '<div class="topCollect_s3qcq topToolsBox__item_YX2sS"><span><a id="copyBaiduBaikeMd" href="javascript:void(0);" >复制为md</a></span></div>';
            var htmlStr = '<span><a id="copyBaiduBaikeMd" href="javascript:void(0);" >复制为md</a></span>';
            //$('div[class^="topToolsBox"]').prepend(htmlStr);
            $('h1[class^="lemmaTitle"]').after(htmlStr);
            console.log('添加"复制为md"链接完成.');
            $("#copyBaiduBaikeMd").on("click",copyBaikeToMarkdown);
            console.log('为"复制为md"绑定click事件完成.');

            // 优化页面展示
            optimizeBaikeDisplay();
        }else if(url.indexOf('www.sohu.com/a/') > -1){
            // https://www.sohu.com/a/316394254_758744
            console.log('搜狐')
            var souHuHtmlStr = '<span class="original-logo"><a id="copySouHuMd" style="color:#333;border:none;border-radius:2px;" href="javascript:void(0);" >复制为md</a></span>';
            $('#news-time').after(souHuHtmlStr);
            console.log('添加"复制为md"链接完成.');
            $("#copySouHuMd").on("click",copySouHuToMarkdown);
            console.log('为"复制为md"绑定click事件完成.');
        }else if(url.indexOf('www.163.com/dy/article/') > -1){
            // https://www.163.com/dy/article/GATU60GT052384UI.html
            console.log('网易号')
            // <input id="netease_search_btn" class="netease_search_btn" type="submit" value="搜索">
            var neteasyHtmlStr = '<input id="copy163Md" style="width:70px;height:25px;color:#fff;background-color:#ff3333;font-size:14px;border:none;border-radius:5px;" type="button" value="复制为md">';
            $('div[class="post_info"]').append(neteasyHtmlStr);
            console.log('添加"复制为md"链接完成.');
            $("#copy163Md").on("click",copy163ToMarkdown);
            console.log('为"复制为md"绑定click事件完成.');
        }

    }, 5000);

    // 等待几秒之后，调整页面展示内容
    /*
    setTimeout(() => {
        // 优化页面展示
        optimizeBaikeDisplay();
    }, 5000);
    */

})();
