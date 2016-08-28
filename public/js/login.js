$(function () {
    $('.loginbox').css({ 'position': 'absolute', 'left': ($(window).width() - 692) / 2 });
    $(window).resize(function () {
        $('.loginbox').css({ 'position': 'absolute', 'left': ($(window).width() - 692) / 2 });
    })
});  