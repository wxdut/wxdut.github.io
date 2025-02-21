$(function() {

	// 侧栏目录
	if ($.trim($('#toc').html()).length != 0) {
        return;
    }
    var postStr = $.trim($('#post-content').html());
    $('#toc').html(func(postStr));

    // 隐藏侧栏目录
    if ($.trim($('#toc').html()).length != 0) {
    	$('#sidebar-toc').show();
    	$('#sidebar-recent-article').hide();
    }

    // gitalk
    const gitalk = new Gitalk({
        clientID: 'daa058948ca320f0977f',
        clientSecret: '22e0792fd4f61a6d104d55451f4c02fc6034c4c3',
        repo: 'Gitalk-Issues-Wxdut',      // The repository of store comments,
        owner: 'wxdut',
        admin: ['wxdut'],
        distractionFreeMode: true  // Facebook-like distraction free mode
      })
      gitalk.render('gitalk-container')
});

/**
 * 将网页里的标题转成目录
 * @param {*} html 网页内容
 * @returns TOC 的 html，直接渲染即可
 */
function func(html) {
        // <h2><a id="XXX" class="anchor" aria-hidden="true"><span class="octicon octicon-link"></span></a>XXX</h2>
        let reg = /<h(\d)><a id="([^"]*)" class=\"anchor\".*?<\/a>(.*?)<\/h\d>/g
        var tocHtml = "", toc = "", preHn = 1, ulCount = 0
        while((toc = reg.exec(html)) !== null) {
            let hn = toc[1]
            let id = toc[2]
            let title = toc[3]
            var li = "<li><a href=\"#" + id + "\">" + title + "</a></li>";
            if (hn > preHn) {
                for (var i = 0; i < hn - preHn; i++) {
                    tocHtml += "<ul>"
                    ulCount++
                }
            } else if (hn < preHn) {
                for (var i = 0; i < preHn - hn; i++) {
                    tocHtml += "</ul>"
                    ulCount--
                }
            }
            tocHtml += li
            preHn = hn
        }
        while (ulCount-- > 0) {
            tocHtml += "</ul>"
        }
        return tocHtml
}