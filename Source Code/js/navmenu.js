
$('#imenu').click(function () {
    $('#routes').toggle();
});
$(window).on("resize", function (e) {
    checkScreenSize();
});

checkScreenSize();

function checkScreenSize() {
    var newWindowWidth = $(window).width();
    if (newWindowWidth > 980) {
        $('#routes').show();
    }
}
