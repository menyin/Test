/**
 * Created by Administrator on 2017/2/28.
 */
$(function () {

    //            $('.jump img').mouseenter(function(){
    //                var wValue=1.5 * $(this).width();
    //                var hValue=1.5 * $(this).height();
    //                $(this).animate({width: wValue,
    //                    height: hValue,
    //                    left:("-"+(0.5 * $(this).width())/2),
    //                    top:("-"+(0.5 * $(this).height())/2)}, 1000);
    //            }).mouseleave(function(){
    //                $(this).animate({width: "490",
    //                    height: "490",
    //                    left:"0px",
    //                    top:"0px"}, 1000 );
    //            });

//            setInterval(function () {
//                var wValue = 1.01 * $('.jump_litte_light').width();
//                var hValue = 1.01 * $('.jump_litte_light').height();
//                $('.jump_litte_light').animate({
//                    width: wValue,
//                    height: hValue,
//                    left: ("-" + (0.01 * $(this).width()) / 2),
//                    top: ("-" + (0.01 * $(this).height()) / 2)
//                }, 900);
//
//                $('.jump_litte_light').animate({
//                    width: "490",
//                    height: "490",
//                    left: "0px",
//                    top: "0px"
//                }, 1000);
//
//            }, 1000);

    setInterval(function () {
        $('.san').animate({
            width: 510,
            height: 510,
            left: -10,
            top: -10,
            opacity:1
        }, 500);

        $('.san').animate({
            width: "490",
            height: "490",
            left: "0",
            top: "0"
        }, 800);

    }, 1000);
    setInterval(function () {
        $('.er').animate({
            width: 590,
            height: 590,
            left: -50,
            top: -50,
            opacity:1
        }, 500);

        $('.er').animate({
            width: "490",
            height: "490",
            left: "0",
            top: "0"
        }, 800);

    }, 1000);

//            setInterval(function () {
//                $('.yi').animate({
//                    width: 484,
//                    height: 484,
//                    left: 3,
//                    top: 3
//                }, 500);
//
//                $('.yi').animate({
//                    width: "490",
//                    height: "490",
//                    left: "0",
//                    top: "0"
//                }, 800);
//
//            }, 1000);

    setInterval(function () {
        $('.si').animate({
            width: 500,
            height: 500,
            left: -5,
            top: -5
        }, 500);

        $('.si').animate({
            width: "490",
            height: "490",
            left: "0",
            top: "0"
        }, 800);

    }, 1000);

    setInterval(function () {
        $('.wu').animate({
            width: 500,
            height: 500,
            left: -5,
            top: -5,
            opacity:0.7
        }, 500);

        $('.wu').animate({
            width: "490",
            height: "490",
            left: "0",
            top: "0",
            opacity:0.2
        }, 800);

    }, 1000);



});