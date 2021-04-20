$(document).ready(function () {

    $('.call-menu').click(function(){
        $('.menu-xs').addClass('menu-show');
    });
    $('.close-menu').click(function(){
        $('.menu-xs').removeClass('menu-show');
    });


    //FULPAGE
    if ($(window).width() < 1224) {
        $('#fullpage').removeAttr('id');
    }

    $('#fullpage').fullpage({
        scrollingSpeed: 1000,
        autoScrolling: true,
        fitToSection: true,
        fitToSectionDelay: 2000,
        verticalCentered: false,
        responsiveWidth: 900,
        anchors:['main', 'about' ,'platforms', 'project-map', 'projects','contents','authors'],
    });

    var wow = new WOW({
        animateClass: 'animated',
        offset: 100
    });
    wow.init();


    if ($(window).width() < 1024) {
        $('.menu li a').on('click', function (e) {
            e.preventDefault();
            $('.menu-xs').removeClass('menu-show');
            $('.menu li a').removeClass('active').filter(this).addClass('active');
            var selector = $(this).attr('href'); // About stroka
            var h = $(selector); // Dom element zagalovka

            $('html, body').animate({
                scrollTop: h.offset().top -70
            }, 700);
        })
    }

});







