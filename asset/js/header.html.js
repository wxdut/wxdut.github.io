$(document).ready(function() {
    let activeMenu = location.pathname.split('/').pop()
    activeMenu = activeMenu.replace('.', '\\.')
    if (activeMenu.length > 0 && $('#' + activeMenu).length) {
        $('#' + activeMenu).addClass('blog-nav-item-active')
    } else {
        $('#\\/').addClass('blog-nav-item-active')
    }
});