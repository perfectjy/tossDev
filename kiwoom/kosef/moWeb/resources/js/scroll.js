var lastSTeop = 0;

$(window).scroll(function(event) {

    // if($('.etf-point-wrap').length > 0){
    //     var st = $(this).scrollTop();
    //     $('.market-base-wrap').removeClass('on');
    //     if (st >= lastSTeop) {
    //         $('.etf-card-list .card-item').removeClass('bak');
    //         if(st >= 800 && st <= 1100){
    //             $('.etf-point-wrap').css('height', 2400);
    //             $('.etf-point-wrap').addClass('on');
    //         }else if(st >= 1101 && st <= 1700){
    //             $('.etf-card-list .list_01').addClass('ing');
    //             $('.etf-point-wrap.on').css('height', 2400);
    //         }else if(st >= 1701 && st <= 2300){
    //             $('.etf-card-list .list_02').addClass('ing');
    //             $('.etf-point-wrap.on').css('height', 2600);
    //         }else if(st >= 2301 && st <= 2900){
    //             $('.etf-card-list .list_03').addClass('ing');
    //             $('.etf-point-wrap.on').css('height', 2800);
    //         }else if(st >= 2901 && st <= 3000){
    //             $('.etf-card-list .list_04').addClass('ing');
    //             $('.etf-point-wrap.on').css('height', 2800);
    //             $('.etf-point-wrap').addClass('end');
    //         }
    //     }else{
    //         $('.etf-card-list .card-item').removeClass('ing');
    //         if(st >= 2601 && st <= 2900){
    //             $('.etf-card-list .list_04').addClass('bak');
    //             $('.etf-point-wrap.on').css('height', 2800);
    //             $('.etf-point-wrap').addClass('end');
    //         }else if(st >= 2161 && st <= 2600){
    //             $('.etf-card-list .list_03').addClass('bak');
    //             $('.etf-point-wrap.on').css('height', 2800);
    //         }else if(st >= 1721 && st <= 2160){
    //             $('.etf-card-list .list_02').addClass('bak');
    //             $('.etf-point-wrap.on').css('height', 2600);
    //         }else if(st >= 1281 && st <= 1720){
    //             $('.etf-card-list .list_01').addClass('bak');
    //             $('.etf-point-wrap.on').css('height', 2400);
    //         }else if(st >= 701 && st <= 1280){
    //             $('.etf-point-wrap').css('height', 2400);
    //             $('.etf-point-wrap').addClass('on');
    //         }else if(st <= 700){
    //             $('.etf-point-wrap').removeClass('on');
    //             $('.etf-point-wrap').removeClass('end');
    //         }
    //     }
    //     lastSTeop = st

    // }
    
    if($('.kosef-main').length > 0){
        var st = $(this).scrollTop(),
            gH = $('.gnb-wrap').height(),
            hh = $(window).height() - $('.foot-wrap').height() - $('.gnb-wrap').height() - $('.tab-nav').height(),
            fh = $('main.main-wrap').height() + $('#foot-wrap').height() - 324;


        if(gH <=  st){
            $('.gnb-wrap').addClass('on')
        }else{
            $('.gnb-wrap').removeClass('on')
        }
        if (st > lastSTeop) {
            $('.tab-nav').stop().animate({bottom: '0'}, 200)
        }else{
            $('.tab-nav').stop().animate({bottom: '-77px'}, 200, "swing");
        }
        if(st === fh){
            $('.tab-nav').stop().animate({bottom: '0'}, 100)
        }

        lastSTeop = st
        

        if(st >= hh){
            $('.tab-nav').addClass('pb');
        }else{
            $('.tab-nav').removeClass('pb');
        }
    }
});

