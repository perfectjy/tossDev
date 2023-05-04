$(window).scroll(function(event) {

    var st = $(this).scrollTop();

    var gnbHeight = $(".gnb").height(),
        height = $(".invest-top-wrap").height(),
        subHeadHeight = $(".sub-head-wrap ").outerHeight();
        // sum = gnbHeight + height + subHeadHeight;
    
    var start =  $(".etf-box").offset().top;


    if(st >= start || st >= 2000){
        $('.etf-point-wrap').addClass('on');
    }else{
        $('.etf-point-wrap').removeClass('on');
    }
    if(st >= 3000){
        $('.etf-point-wrap').removeClass('on');
    }// console.log('st', st);
    
});