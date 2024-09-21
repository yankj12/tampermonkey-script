// ==UserScript==
// @name         知乎-复制为markdown
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       yankj12
// @require      https://code.jquery.com/jquery-3.3.1.min.js
// @match        *://zhihu.com/question/*
// @grant        none
// ==/UserScript==
// ==/UserScript==

(function() {
    'use strict';

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

})();
