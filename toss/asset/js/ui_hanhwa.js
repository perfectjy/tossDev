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
            console.log("return");
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
        if(!popupW.hasClass('nowOpen')){
            $(popupId).addClass('nowOpen').attr('tabindex', "0").focus();
            wrap.attr('aria-hidden','true');
            lock.addClass('lock');
        }

    },
    close:function(ths){
        popType.basic(ths);

        if(popupW.hasClass('nowOpen')){
            // $('.btn-p').attr('tabindex', "0").focus();
            popupW.removeClass('nowOpen').removeAttr().focus();
            lock.removeClass('lock');
            wrap.attr('aria-hidden','false');
        }
    },
    init:function(ths){
        var btnOn = $('.popWrap').find('.popup').hasClass('sticky');
        if(!btnOn){
            $('.popWrap').addClass('noneBtn');
        }

        $('.popWrap').find('.popup').attr('role','dialog');
        $('.popWrap.alert').find('.popup').attr('role','alertdialog');
    }
}

//텝
var tab = function(){
    var tabWidget = $('.tab-wrap');

    tabWidget.each(function () {
        var ths = $(this),
            tab1 = ths.find('.tab-nav'),
            tabListItems = tab1.find('.tab-btn'),
            tabListHref = tabListItems.attr('href'),
            //tabListItems = tab1.find('.tab-btn').attr('aria-controls'),
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
                    'aria-selected':'false'
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
            
            //기본 패널
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
                console.log("tabTitle", tabTitle);
                tabPanels.eq(inx).append('<h1>'+ tabTitle +'</h1>');
            }
            
        });


    $('.tab-nav .tab-btn').on('click', function(e) {
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

        ths.closest('.tab-nav').find('.tab-btn').removeClass('on').attr('aria-selected', 'false');
        ths.addClass('on').attr('aria-selected','true');

        if (tabPan.length > 0) {
            tabPan.attr({
                'aria-expanded':'true',
                'aria-labelledby': tabPanId
            }).addClass('on').siblings().attr('aria-expanded', 'false').removeClass('on');
        } else {
            ths.closest('.tab-nav').find('.tab-contents > .tab_panel').attr('aria-hidden','true').removeClass('on');
        }
    });

}
var tabStickys = function(){
    $(window).on('scroll', function(){
        var nowTop =  $(window).scrollTop(),
            headerHt = $('.header').height();
    
        if (nowTop > headerHt) {
            $('.tab-nav.tab-sticky').addClass('on');
        }else{
            $('.tab-nav.tab-sticky').removeClass('on');
        }
    });
    $('.popBody').on('scroll', function(){
        var nowTop =  $(this).scrollTop(),
            popHead = $('.popHead').height();
        if (nowTop > popHead) {
            $('.tab-nav.tab-sticky').addClass('on');
        }else{
            $('.tab-nav.tab-sticky').removeClass('on');
        }
    });
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