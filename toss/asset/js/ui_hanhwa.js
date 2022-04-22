$(function () {
    $(document).on ('click','a',function(e){
        var $href = $(this).attr('href');
        if($href == '#' || $href == '#none'){
            e.preventDefault();
        }
    });

    inpFocus(); //input focus form-row.on
    almCnt(); //알람 카운트
    popType.init(); //popup role추가 
    tab(); //tab기능
    allChk.init(); //전체선택
    inputDel(); //검색 input 삭제
    tabStickys() //tab고정
});

//인풋 포커스
var inpFocus = function(){
    $('.srchBox .ipt').wrap('<div ></div>');
    $('.srchBox .iptBlock').append('<button type="button"  aria-label="해당 필드 입력값 삭제" tabindex="-1"></button></div>');

    var inpt = $('.ipt'),
        fr = $('.form-row'),
        len = $('.ipt[data-len="1"]');
    
    if(len){
        len.wrap('<div ></div');
    }
    inpt.on('mouseover focusin', function(){
        fr.removeClass('on');
        $(this).closest('.form-row').addClass('on');
    }).on('mouseout focusout', function(){
        fr.removeClass('on');
    });
}

//검색 val 삭제 버튼
var inputDel = function(){  
    $(document).on('keyup change focus', '.srchBox > .iptBlock > .ipt', function(){
        var thVal = $(this).val();
        if(thVal){
            $(this).parent().addClass('on');
        }else{
            $('.srchBox > .iptBlock').removeClass('on');
        }
        if($(this).prop('readonly') || $(this).prop('disabled') || $(this).hasClass('no_del')){
            return false;
        }

        // delFocus.removeClass('on');
    });
    $('.btnIco-del').on('click', function(){
        $(this).prev().val('');
        $(this).parent().removeClass('on');
    });
}

//알람 카운트
var almCnt = function(){
    var alm = $('.btnIco-noti'),
        cnt = alm.attr("data-almct");
        
    if(cnt >= 1){
        alm.attr("aria-label", "알림 새로운 " + cnt);
        alm.append('<span>'+ cnt +'</div>');
    }
}

//팝업
var popType = {
    basic:function(ths){
        popup = ths,
        lock = $('html'),
        popupW = $('.popWrap'),
        popupClose = $('.btnIco-close'),
        popupId = $(ths),
        wrap = $('.wrapper'),
        btnThis = $(this),
        popupfocus = $(ths);

    },
    open:function(ths){
        popType.basic(ths);
        $(popupId).addClass('nowOpen').attr('tabindex', "0").focus();
        wrap.attr('aria-hidden','true');
        lock.addClass('lock');
        var btnOn = $(popupId).find('.popup .btnArea');
        if(btnOn.length <= 0){
            $(popupId).addClass('noneBtn');
        }else{
            $(popupId).removeClass('noneBtn');
        }
    },
    close:function(tar){
        if(tar.hasClass('nowOpen')){
            $(popupId).removeClass('nowOpen').removeAttr().focus();
            lock.removeClass('lock');
            wrap.attr('aria-hidden','false');
        }
    },
    init:function(ths){
        $('.popWrap').find('.popup').attr('role','dialog');
        $('.popWrap.alert').find('.popup').attr('role','alertdialog');

        $(document).on('click', '.dialog-close',function(e){
            e.preventDefault();
            var pop = $(this).attr('href');
            if (pop == '#' || pop == '#none' || pop == undefined)pop = $(this).closest('.popWrap');
            popType.close(pop);
        })
    }
}

//텝
var tab = function(){
    var tabWidget = $('.tabWrap');

    tabWidget.each(function () {
        var ths = $(this),
            tab1 = ths.find('.tabList'),
            tabListItems = tab1.find('.tab-btn'),
            tabListHref = tabListItems.attr('href'),
            tabListItemActive = tab1.find('.tab-btn.on'),
            tabPanels = ths.find('.tab-panel'),
            tabPanelsActive = ths.find('.tab-panel.on')
            panId= tabPanelsActive.attr('id'),
            tabPanels.removeClass('on'),
            tab1.attr('role','tablist');
            
            var tabListItemID = tabListItemActive.attr('aria-controls'),
            tabPanelActive = $(tabListItemID);
            

        //기본 tab
        tabListItems.attr({
            'aria-selected':'false',
            'role':'tab'
        });
        
        //ON tab
        tabListItemActive.attr({
            'aria-selected':'true'
        });
        
        //기본 패널
        tabPanels.attr({
            'aria-expanded':'false',
            'role':'tabpanel'
        });
        
        //기본 on 패널
        tabPanelsActive.attr({
            'aria-expanded':'true',
            'aria-labelledby':panId
        });
        
        tabPanelsActive.attr('aria-expanded','true').addClass('on');
        
        if(tabListHref){
            var inx = tabListItemActive.index();
            tabPanelsActive.removeClass('on').attr('aria-expanded', 'false');;
            tabPanels.eq(inx).addClass('on').attr('aria-expanded', 'true');
            var tabTitle = tabListItemActive.text();
            tabPanels.eq(inx).append('<h1>'+ tabTitle +'</h1>');
        }
        
    });

    var tabWidgetBtn = tabWidget.find('.tab-btn');
    tabWidgetBtn.each(function (index){
        var ths = $(this),
            panId = ths.attr('aria-controls');

        tabWidget.find('.tabContents .tab-panel').eq(index).attr('aria-labelledby', panId);
    });



    $('.tabList .tab-btn').on('click', function(e) {
        e.preventDefault();


        var ths = $(this),
            tabPanId = ths.attr('aria-controls'),
            tabPan = $('#' + tabPanId),
            tagA = ths.attr('href');
            tabTitle = ths.text();

        if(tagA){
            window.location = tagA;
            tabPan.append('<h1>'+ tabTitle +'</h1>');
        }

        ths.closest('.tabList').find('.tab-btn').removeClass('on').attr('aria-selected', 'false');
        ths.addClass('on').attr('aria-selected','true');

        if (tabPan.length > 0) {
            tabPan.attr({
                'aria-expanded':'true',
                'aria-labelledby': tabPanId
            }).addClass('on').siblings().attr('aria-expanded', 'false').removeClass('on');
        } else {
            ths.closest('.tabList').find('.tabContents > .tab_panel').attr('aria-hidden','true').removeClass('on');
        }
    });

}
var tabStickys = function(){
    var tabNav = $('.tabWrap').children().first('.tabList'),
        sticky = $('.tabWrap > .tabList.tab-sticky');
        // isTab = $('.content').children(),
        // isPopUpTab = $('.popup > .popBody').children().first();
        
        $(window).on('scroll', function(){
            var nowTop =  $(window).scrollTop(),
            headerHt = $('.header').height(),
            tabOff = $('.tabWrap').offset().top;
    
            if (nowTop > tabOff) {
                tabNav.css('top', headerHt).addClass('tab-sticky');
            }else{
                tabNav.removeClass('tab-sticky');
            }
        });
    
        $('.popBody').on('scroll', function(){
            var nowTop =  $(window).scrollTop(),
            popHead = $('.wrapper .header').height();
            if (nowTop > 0) {
                sticky.css('top', popHead).addClass('tab-sticky');
            }else{
                sticky.css('top', 0).removeClass('tab-sticky');
            }
        });

    // if(isTab.hasClass('tab-wrap') || isPopUpTab.hasClass('tab-wrap')){
    //     isTab.children('.tab-nav').wrap('<div ></div>');
    //     isPopUpTab.children('.tab-nav').wrap('<div ></div>');
    //     isTab.children('.tab-basic').find('.tab-nav').addClass('tab-sticky');
    //     isPopUpTab.find('.tab-nav').addClass('tab-sticky');
    //     headerHt = $('.header').height();
    //     isPopUpTab.find('.tab-nav').css('top', headerHt).parent('.tab-basic').css('height', '56px');
    // }else{
    // }
}
var allChk = {
    cked:function(){
        $('.chkGroup input[type=checkbox]').on('click', function(){
            var chkTotal = $(this).closest('.chkGroup').find('li .chk').length;
            var checked = $(this).closest('.chkGroup').find('li .chk:checked').length;
            if(chkTotal != checked){
                $(this).closest('.termsArea').find('.allChk .chk').prop("checked", false);
                $(this).closest('.chkGroup').slideDown();
            }else{
                $(this).closest('.termsArea').find('.allChk .chk').prop("checked", true);
                $(this).closest('.chkGroup ').slideUp();
            }
        });
    },
    allCk:function(){
        $('.allChk input[type=checkbox]').on('click', function(){
            if($(this).is(":checked")){
                 $(this).closest('.termsArea').find(".chkGroup input[type=checkbox]").prop("checked", true);
                 $(this).closest('.termsArea').find(".chkGroup").slideUp();
            }else{
                $(this).closest('.termsArea').find(".chkGroup input[type=checkbox]").prop("checked", false);
                $(this).closest('.termsArea').find(".chkGroup").slideDown();
            }
        });
    },
    init:function(){
        allChk.cked();
        allChk.allCk();
    }
}
