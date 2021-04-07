$(document).ready(function () {
    var a = 0;
    $("#rightbox").click(function () {
        a -= 1;
        if (a < -4) {
            a = 0;
        }
        $("#back2-1").animate({
            left: (a * 100) + '%'
        }, 500);
    });
    $("#leftbox").click(function () {
        a += 1;
        if (a > 0) {
            a = -4;
        }
        $("#back2-1").animate({
            left: (a * 100) + '%'
        }, 500);
    });


    $(document).keydown(function (event) {
        var key = event.keyCode;

        if (key == 37) {
            a += 1;
            if (a > 0) {
                a = -4;
            }
            $("#back2-1").animate({
                left: (a * 100) + '%'
            }, 500);
        }

        if (key == 39) {
            a -= 1;
            if (a < -4) {
                a = 0;
            }
            $("#back2-1").animate({
                left: (a * 100) + '%'
            }, 500);
        }
    });
});
