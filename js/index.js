$(function() {
    function resize() {
        // 屏幕宽度
        var windowWidth = $(window).width();
        // 是否为小于768的屏幕
        // console.log(windowWidth)
        var smallScreen = windowWidth < 768;
        // 轮播图板块适应
        var $itemImages = $('#main_lb>#carousel-generic>.carousel-inner>.item');
        // console.log(1);
        $itemImages.each(function(i, item) {
            // console.log(1)
            var $item = $(item);
            var imgSrc = $item.data(smallScreen ? 'image-small' : 'image-large');
            $item.css('backgroundImage', 'url(' + imgSrc + ')');

            if (smallScreen) {
                $item.html('<img src="' + imgSrc + '" alt="">')
            } else {
                $item.empty();
            }
        });

        // tab导航栏横向滚动效果
        // 获取总长度
        var $tabs = $('.nav-tabs');
        $tabs.each(function(i, item) {
            var $tab = $(this);
            var width = 0;
            $tab.children().each(function(ci, citem) {
                width += $(citem).outerWidth(true);
            });

            if (width > $tab.parent().outerWidth(true)) {
                $tab.css('width', width);
                $tab.parent().css('overflow-x', 'scroll');
            } else {
                $tab.css('width', 'auto');
                $tab.parent().css('overflow-x', 'hidden');
            }
        });
    }


    $(window).on('resize', resize).trigger('resize');

    var $colLi = $('#header>nav>.container>.collapse>.nav>li');
    var $hideLi = $('#header>nav>.container>.collapse');
    $colLi.click(function() {
        $hideLi.collapse('hide');
    });

    // tooltip浮动效果
    $('[data-toggle="tooltip"]').tooltip();


    $('#news .news-btn li>a').on('click', function() {
        var tit = $(this).data('title');
        console.log(tit);
        $('#news .news-title p').text(tit);
    })

    // 轮播图touch
    var OFFSET = 50;
    // 轮播图触摸
    // 获取轮播图元素
    $('.carousel').each(function(i, item) {

        var startX, endX;
        //  注册事件
        item.addEventListener('touchstart', function(e) {

            startX = e.touches[0].clientX;
            e.preventDefault();
        });
        item.addEventListener('touchmove', function(e) {
            endX = e.touches[0].clientX;
            e.preventDefault();
        });
        item.addEventListener('touchend', function(e) {
            var offsetX = endX - startX;
            // 当距离大于一定值时有变化
            if (offsetX > OFFSET) {
                // 上一张
                $(this).carousel('prev');
            } else if (offsetX < -OFFSET) {
                // 上一张
                $(this).carousel('next');
            }
            e.preventDefault();
        });
    });

    new WOW().init();

});