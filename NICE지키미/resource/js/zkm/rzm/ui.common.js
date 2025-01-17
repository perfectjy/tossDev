$(function () {

	$(document).on ('click','a',function(e){
		var $href = $(this).attr('href');
		if($href == '#' || $href == '#none'){
			e.preventDefault();
		}
	});

	deviceCheck();
	accordion();
	uiTab();  
	rollTabUI();
	modal.init();
	formUI.inputDel(); 
	formUI.etc();
	$.fn.hToggle();
	$('#agreeAllChk1').uiCheckAll();
	$('.btnTooltip').uiToolTip();
	$('.ui-check-group .all_chk').allCheck();
	range();
	mailAutoList();

	
	if(isMobile) {   
		// mobile title set
		mbCommon.setHeader();
		mbCommon.init();

		// 대상 고정
		$('[data-fixed-target=tabBox]').fixedTarget(['.headerMob']);
		
		// input focus 시 화면 input 상단으로 스크롤
		$('[data-input-focus=scrolltop]').pageScrollTop(['.headerMob']);
	} else {
		setHeader();
		GnbNav.init();
		// pc web breadcrumb top fix
		$.fn.breadcrumbsFixed();

		// header 검색 돋보기 클릭
		btnSearchFn.init();

		// 20220905 추가, 대상 고정
		$('[data-fixed-target=tabBox]').fixedTarget(['.breadcrumbsConts']);

		// 소개페이지 PC 하단버튼 Fixed
		createFloating()
	}

	// roll links
	$('.ui-scrollLinks').scrollLinksUI();

	// scroll 시 rolllinks 활성화
	setTimeout(function() { // 20220905 조건 추가
		if(isMobile) { 
			$('.ui-scrollLinks').scrollActive(['.headerMob','.ui-scrollLinks']); // 메인 RZMMCLMEP10, RZMMFCMDC20
		} else {
			$('.ui-scrollLinks').scrollActive(['.breadcrumbsConts','.ui-scrollLinks']); // RZMMCLMEP10
		}
	},300)

	// page loading
	//loadingFn();

	// page scroll top
	setTimeout(function() {
		pageTopFn.init();
	},300)
});

$(document).on('ready', function(){
	// [added] inview
	function runInView(){
		var inView = window.inView || false;
		if (!document.querySelector('[data-component="inview"]')) { // inview 객체 없을 시
			return;
		}
		if (!inView) { // js load 불가 시, 전체적으로 isIn 클래스 추가
			$('[data-component="inview"]').addClass('isIn');
			console.error('inview 객체는 있지만 inview js파일이 없습니다. in-view.min.js 파일을 import해주세요.');
			return;
		}
		inView.offset({
			top: 0,
			bottom: window.innerHeight * 0.2,
		});
		inView('[data-component="inview"]')
			.on('enter', function(el){ // inview 시 callback
				el.classList.add('isIn');
			})
			.on('exit', function(el){ // outview 시 callback

		});
	}
	runInView();
})

function createFloating() {
    var $window = $(window), 
        $wrap = $('#wrap'), 
        $footer = $('#footer');
    
    if($('.bottomActiveBtns.floating').length){
        var $floatBtn = $('.bottomActiveBtns.floating').find('.btns');
        $window.scroll(function() {
            var y = $(this).scrollTop();
            if(y > $wrap.height() - $window.height() - $footer.height()){
                // $floatBtn.css({'position':'absolute', 'bottom':$footer.outerHeight() + 30 });
                $floatBtn.removeClass('fixed');
            } else {
                // $floatBtn.removeAttr('style');
                $floatBtn.addClass('fixed');
            }
        });
    }
}


var isMobile = false;
var deviceCheck = function() { 
	var ua = navigator.userAgent,
		ie = ua.match(/(?:msie ([0-9]+)|rv:([0-9\.]+)\) like gecko)/i),
		deviceInfo = ['android', 'iphone', 'ipod', 'ipad', 'blackberry', 'windows ce', 'samsung', 'lg', 'mot', 'sonyericsson', 'nokia', 'opeara mini', 'opera mobi', 'webos', 'iemobile', 'kfapwi', 'rim', 'bb10'],
		filter = "win16|win32|win64|mac|macintel",
		uAgent = ua.toLowerCase(),
		deviceInfo_len = deviceInfo.length;

	var browser = {},
		support = {},
		version,
		device;

	for (var i = 0; i < deviceInfo_len; i++) {
		if (uAgent.match(deviceInfo[i]) != null) {
			device = deviceInfo[i];
			isMobile = true;
			console.log(device,isMobile)
			break;
		}
	}

	browser.local = (/^http:\/\//).test(location.href);
	browser.firefox = (/firefox/i).test(ua);
	browser.webkit = (/applewebkit/i).test(ua);
	browser.chrome = (/chrome/i).test(ua);
	browser.opera = (/opera/i).test(ua);
	browser.ios = (/ip(ad|hone|od)/i).test(ua);
	browser.android = (/android/i).test(ua);
	browser.safari = browser.webkit && !browser.chrome;
	browser.app = ua.indexOf('appname') > -1 ? true : false;

	//touch, mobile
	support.touch = browser.ios || browser.android || (document.ontouchstart !== undefined && document.ontouchstart !== null);
	browser.mobile = support.touch && (browser.ios || browser.android);

	//os
	browser.os = (navigator.appVersion).match(/(mac|win|linux)/i);
	browser.os = browser.os ? browser.os[1].toLowerCase() : '';

	//version 
	if (browser.ios || browser.android) {
		version = ua.match(/applewebkit\/([0-9.]+)/i);
		version && version.length > 1 ? browser.webkitversion = version[1] : '';
		if (browser.ios) {
			version = ua.match(/version\/([0-9.]+)/i);
			version && version.length > 1 ? browser.ios = version[1] : '';
		} else if (browser.android) {
			version = ua.match(/android ([0-9.]+)/i);
			version && version.length > 1 ? browser.android = parseInt(version[1].replace(/\./g, '')) : '';
		}
	}

	if (ie) {
		browser.ie = ie = parseInt(ie[1] || ie[2]);
		(11 > ie) ? support.pointerevents = false : '';
		(9 > ie) ? support.svgimage = false : '';
	} else {
		browser.ie = false;
	}

	var clsBrowser = browser.chrome ? 'chrome' : browser.firefox ? 'firefox' : browser.opera ? 'opera' : browser.safari ? 'safari' : browser.ie ? 'ie ie' + browser.ie : 'other';
	var clsMobileSystem = browser.ios ? "ios" : browser.android ? "android" : 'etc';
	var clsMobile = browser.mobile ? browser.app ? 'app mobile' : 'mobile' : 'pweb';
	// var clsMobile = browser.mobile ? browser.app ? 'ui-a ui-m' : 'ui-m' : 'ui-d';
	// var $html = doc.querySelector('html');

	// $html.classList.add(browser.os);
	// $html.classList.add(clsBrowser);
	// $html.classList.add(clsMobileSystem);
	// $html.classList.add(clsMobile);
	$('html').addClass(browser.os);
	$('html').addClass(clsBrowser);
	$('html').addClass(clsMobileSystem);
	$('html').addClass(clsMobile);

	// 20220714 점검용 소스 삽입
	var gHref = document.location.href,
		gMode = gHref.split('?mode=')[1];
	if(gMode !== undefined && gMode === 'mobile') {
		$('html').removeClass();
		$('html').addClass('linux');
		$('html').addClass('chrome');
		$('html').addClass('android');
		$('html').addClass('mobile');
		isMobile = true;
	}
}
var setHeader = function() {
	if($('.headerHome').length) {
		if(mbHeader.login == true) {
			$('.util.loginBefore').hide();
			$('.util.loginAfter').show();
		} else {
			$('.util.loginBefore').show();
			$('.util.loginAfter').hide();
		}
	}
}

var mailAutoList = function() {
	$('[data-input-focus=scrolltop]').on('keyup focus',function(e){
        var $val = $(this).val();

        if($val != ''){
          $('.mailList').show();
        }else{
          $('.mailList').hide();
        }
  });
  
  $(document).on('touchend, mousedown',function(e){
    $('.mailList').hide();
  }).on('touchend, mousedown',$('.formItem'),function(e){
    e.stopPropagation();
  });
}

var mbHeader = { title: '', prev: true, menu: true, login: false };
var mbCommon = {
	setHeader: function() {
		if($('.headerMob').length) {

			if (mbHeader.prev == false) {
				$('.headerMob .btnPrev').remove()
			} else if (mbHeader.menu == false) {
				$('.headerMob .btnGnb').remove()
			}

			if (mbHeader.home == true) {
				$('.headerMob .gnbNice').show();
				$('.headerMob .btnLogin').show();
			} else {
				$('.headerMob .gnbNice').remove();
				$('.headerMob .btnLogin').remove();
			}

			$('.headerMob .gnbTitle').text(mbHeader.title);

			if(mbHeader.login == false) {
				$('.mbGnbTop .loginBefore').show();
				$('.mbGnbTop .loginAfter').hide();
			} else {
				$('.mbGnbTop .loginBefore').hide();
				$('.mbGnbTop .loginAfter').show();
			}
		}
	},
	gnbSubOpenTxt:'하위메뉴 펼치기',
	gnbSubCloseTxt:'하위메뉴 접기',
	gnbBgClass:'.mbGnbBg',
	gnbBg:'<div class="mbGnbBg" aria-hidden="true"></div>',
	gnbOutCont:'#skipNavi,#header,#container,#footer',
	winScrollTop: null,
	gnb: function() {
		$('.mbGnbMenu').attr('aria-hidden',true);
		$(document).on('click','.btnGnb',function(e){
			e.preventDefault();
			if($('.mbGnbMenu').hasClass('show')){
				mbCommon.gnbClose();
			}else{
				mbCommon.gnbOpen();
	
				// mobile 전체메뉴 스크롤시 고정
				$('[data-fixed-target=menuScroll]').fixedTarget([], '.mbGnbMenu .innerScroll');
				$('.rollLinksMenu').scrollLinksUI();
				setTimeout(function() {
					$('.rollLinksMenu').scrollActive.destroy();
					$('.rollLinksMenu').scrollActive([],'.mbGnbMenu .innerScroll');
				},300)
			}
		});
		$(document).on('click','.btnGnbClose',function(e){
			e.preventDefault();
			mbCommon.gnbClose();
		});
		$(document).on('click','.mbMenuList .inSub',function(e){
			e.preventDefault();
			mbCommon.gnbActive(this,true);
		});
	},
	gnbOpen: function() {
		Body.lock();
			$('.mbGnbMenu').attr('tabindex',0).focus();
			$('.mbGnbMenu').attr('aria-hidden',false);
		$(mbCommon.gnbOutCont).attr('aria-hidden',true);
			$('.mbGnbMenu').addClass('show');
			$('.mbGnbMenu').before(mbCommon.gnbBg);
			$(mbCommon.gnbBgClass).addClass('show');
		$('.btnGnb span').text('전체메뉴 닫기');

		// mobile 전체메뉴 활성화 경우 부모 페이지를 scrollTop 을 0으로, 전체메뉴 비활성화 경우 이전 scrollTop 으로 조정
		mbCommon.winScrollTop = $(window).scrollTop();
		$(window).scrollTop(0)
	},
	gnbClose: function() {
		Body.unlock();
		$('.btnGnb').focus();
		$('.mbGnbMenu').attr('aria-hidden',true);
		$(mbCommon.gnbOutCont).removeAttr('aria-hidden');
		$('.mbGnbMenu').removeClass('show');
		$(mbCommon.gnbBgClass).removeClass('show');
		$('.mbGnbMenu').removeAttr('tabindex style');
		$('.btnGnb span').text('전체메뉴 열기');

		setTimeout(function(){
			$(mbCommon.gnbBgClass).remove();
			$('.innerScroll').scrollTop(0);

			$('.depth2, .depth3').removeClass('open');
			$('.mbGnbDep, .mbGnbDepLast').hide();
		},610);
	},
	// fixed: function(target) {
	// var $target = $(target),
	// 		isHeader = false;
	// 	if($target.attr('id') == 'header') isHeader = true;

	// 	$(window).on('scroll',function(){
	// 		var $scrollTop = $(this).scrollTop();
	// 		$target.each(function(){
	// 			if($(this).hasClass('noFixed') || $(this).closest('.modal').length) return;
	// 			var $top = $(this).offset().top;
	// 			if($scrollTop > $top){
	// 				if(!$(this).hasClass('fixed')){
	// 					$(this).addClass('fixed');
	// 				}
	// 			}else{
	// 				$(this).removeClass('fixed');
	// 			}
	// 		})
	// 	});
	// },
	init: function() {
		mbCommon.gnb();
		// mbCommon.fixed('#header');
	},
	gnbActiveIng: false,
	gnbActive:function(target,isToggle){
		var $parent = $(target).parent(),
			$slideSpeed = 300;
		//클릭시 메뉴 활성화
		if(isToggle){
			//뎁스2,3
			if(mbCommon.gnbActiveIng == false){
				mbCommon.gnbActiveIng = true;
				if($parent.hasClass('open')){
					$parent.removeClass('open').find('.inSub').attr('title',mbCommon.gnbSubOpenTxt);
					$(target).parent().next().stop(true,false).slideUp($slideSpeed,function(){
						mbCommon.gnbActiveIng = false;

						// 하위 메뉴 열고 닫힐때 위치가 바뀜, 재실행
						$('.rollLinksMenu').scrollActive.destroy();
						$('.rollLinksMenu').scrollActive([],'.mbGnbMenu .innerScroll');
					});
				}else{
					$parent.addClass('open').find('.inSub').attr('title',mbCommon.gnbSubCloseTxt);
					$parent.parent().siblings().find('.depth2').removeClass('open');
					$parent.parent().siblings().children('.mbGnbDep').stop(true,false).slideUp($slideSpeed,function(){
						$(this).removeAttr('style').find('.mbGnbDep').removeAttr('style');
					}).siblings('.inSub').attr('title',mbCommon.gnbSubOpenTxt);
					$(target).parent().next().stop(true,false).slideDown($slideSpeed,function(){
						mbCommon.gnbActiveIng = false;

						// 하위 메뉴 열고 닫힐때 위치가 바뀜, 재실행
						$('.rollLinksMenu').scrollActive.destroy();
						$('.rollLinksMenu').scrollActive([],'.mbGnbMenu .innerScroll');
					});
				}
			}
		}else{
			//뎁스1
			// if($parent.find('.active').length){
			// 	$parent.find('.active').addClass('open').children('div').show();
			// }else{
			// 	$parent.find('.gnb_dep2>ul>li').first().addClass('open').children('div').show();
			// }
			// $parent.addClass('open').children('a').attr('title','현재선택');
			// $parent.siblings().removeClass('open').children('a').removeAttr('title').siblings('div').removeAttr('style').find('.open').removeClass('open').children('div').removeAttr('style');
			// $isScroll = true;
			// common.gnbInScroll(target);
		}
	}
}

var GnbNav = {
	bg: $('.gnb_bg'),
	menuSpeed: 200,
	bgSpeed: 200,
	// barSpeed: 200,
	tabTimeout: '',
	openTimeout: '',
	closeTimeout: '',  
	//서브 열림
	open : function(target,time){
		clearTimeout(GnbNav.closeTimeout);
		var openInit = function(){
			var $subMenu = $(target).find('.subMenu'), $subMenuHeight = $subMenu.outerHeight();
			$(target).children('a').attr('aria-expanded','true').addClass('active').closest('li').siblings().find('a').attr('aria-expanded','false').removeClass('active');
			// $(target).find('.cell').css({'height':$subMenuHeight-80});
			$('.gnbBg').css({'height':$subMenuHeight}).closest('#header').addClass('show');
			$(target).siblings().find('.subMenu').removeAttr('style').removeClass('active');
			GnbNav.tabTimeout = setTimeout(function(){
				$subMenu.stop(true,false).fadeIn(200).addClass('active');
			},100);
			// GnbNav.barActive(target);
		};

		if(!!time){
			GnbNav.openTimeout = setTimeout(function() {
				openInit();
			}, time);
		}else{
			openInit();
		}
	},
	//서브 닫힘
	close: function (time) {
		clearTimeout(GnbNav.openTimeout);
		clearTimeout(GnbNav.tabTimeout);
		var closeInit = function(){
			$('.gnb>ul>li').children('a').attr('aria-expanded','false').removeClass('active');
			$('.gnb .subMenu').removeClass('active').removeAttr('style');
			$('.gnbBg').css({'height':'0'}).closest('#header').removeClass('show');
			var $current = $('.gnb').find('.current');
		};
		if(!!time){
			GnbNav.closeTimeout = setTimeout(function(){
				closeInit();
			},time)
		}else{
			closeInit();
		}
	},	
	//실행
	init: function () {
		var nav= $('.gnb'),
		menu= $('.gnb>ul>li'),
		subMenu= $('.gnb .subMenu'),  
		header= $('#header');

		menu.children('a').attr('aria-expanded','false');
		var $current = nav.find('.current');
		var $openDep1 = '';
		if ($current.length){
			// 
		}
		menu.on('mouseover focusin', function (e){
			var $this = $(this);
			if(e.type == 'mouseover'){
				GnbNav.open($this,100);
			}else{
				GnbNav.open($this);
			}
			$openDep1 = $this;

			// header 검색 돋보기 닫기
			btnSearchFn.init('close');
		}).on('mouseout focusout', function (e){
			if(e.type == 'mouseout'){
				GnbNav.close(100);
			}else{
				GnbNav.close(10);
			}
		});

		//gnb_bg에 mouseover해도 하위뎁스 사라지지않게~
		$('.gnb_bg').on('mouseover', function (e){
			GnbNav.open($openDep1);
		}).on('mouseout', function(e){
			GnbNav.close(100);
		});
	}
}

$.fn.breadcrumbsFixed = function() {
	var $window = $(window),
		$wrap = $('#wrap'),
		$header = $('#header'),
		$target = $('.breadcrumbsConts');
	
	$target.prev('.breadcrumbFixedTarget').remove();
	$target.before('<div class="breadcrumbFixedTarget" style="display:none; height:'+$target.innerHeight()+'px;">');
	
	$window.on('scroll', function() {
		var scrollPos = $(this).scrollTop(), headerHeight = $header.outerHeight();
		if(!$('html.lock').length){
			if (headerHeight < scrollPos) {
				$wrap.addClass('fixed');
				$target.prev().show();
			} else {
				$wrap.removeClass('fixed');
				$target.prev().hide();
			}
		}
	});
	$.fn.dropMenu('.breadcrumbs>ul>li.d1>a', '.breadcrumbs>ul>li>.sub>ul>li>a');
}

$.fn.dropMenu = function(m1, m2){
	var $breadcrumbs = {
		menu: $(m1),
		subMenu: $(m2)
	};
	var menuopen = '메뉴펼치기', menuclose = '메뉴접기'

	$breadcrumbs.menu.attr('title',menuopen);
	$breadcrumbs.menu.on('click', function (e) {	
		e.preventDefault();
		var $this = $(this);
		if($this.hasClass('active')){
			$this.removeClass('active').attr('title',menuopen).closest('li.d1').find('.sub').slideUp();
			$('.breadcrumbsIn').removeClass('active');
		} else {
			$this.closest('li.d1').find('.sub').slideDown().closest('li.d1').siblings().find('.sub').slideUp();
			$this.addClass('active').attr('title',menuclose).closest('li.d1').siblings('li.d1').find('a').removeClass('active').attr('title',menuopen);
			$('.breadcrumbsIn').addClass('active');
		}
		$this.next('.sub').css('min-width',$this.innerWidth() + 37);
	});
	$breadcrumbs.subMenu.on('focusout', function (e) {
		var $this = $(this), focus_num = $this.closest('ul').find('li').length, focus_index = $this.closest('li').index()+1;
		if(focus_num == focus_index){
			$this.closest('li.d1').find('a').removeClass('active').attr('title',menuopen).closest('li.d1').find('.sub').slideUp();
			$('.breadcrumbsIn').removeClass('active');
		}
	});
	$(document).click(function(e) {
		var a = e.target;
		if($(a).closest('.breadcrumbs').length === 0) {
			$breadcrumbs.menu.closest('li.d1').find('a').removeClass('active').attr('title','메뉴펼치기').closest('li.d1').find('.sub').slideUp();
			$('.breadcrumbsIn').removeClass('active');
		}
	});
}

var formUI = {
	etc: function() {
	var $swichBtn = $('.btnSwitch input');
		$swichBtn.each(function(){
			var $txt = $(this).next('label').find('.hidden').text();
			if($(this).prop('checked')){
				$txt = $txt.replace('해제','등록');
				$(this).next('label').find('.hidden').text($txt);
			}else{
				$txt = $txt.replace('등록','해제');
				$(this).next('label').find('.hidden').text($txt);
			}
		});
		$swichBtn.on('change',function(){
			var $txt = $(this).next('label').find('.hidden').text();
			if($(this).prop('checked')){
				$txt = $txt.replace('해제','등록');
				$(this).next('label').find('.hidden').text($txt);
			}else{
				$txt = $txt.replace('등록','해제');
				$(this).next('label').find('.hidden').text($txt);
			}
		});
	},
	inputDel: function() {
		$(document).on('keyup change focus','.inpTxt', function(){
			var $val = $(this).val();
				if($(this).prop('readonly') || $(this).prop('disabled')){
				return false;
			}
			if($val != ''){
				if(!$(this).next('.typeClear').length){
					$(this).after('<button type="button" class="ui-btn typeClear"><span class="hidden">삭제</span></button>');
				}
			}else{
				$(this).next('.typeClear').remove();
			}		
			
		});
		$(document).on('click','.typeClear',function(){
			var $inp = $(this).prev('.inpTxt');
			$inp.val('').change().focus();
			$(this).remove();	
		});
	}
}

$.fn.allCheck = function() {
	var $this = this,
		$chkItem = $this.closest('.ui-check-group').find('.chk_type'),
		isAllChecked;

	function fncCheck() {
		if($chkItem.length == $chkItem.filter(":checked").length){
			$this.prop("checked", true);
		} else {
			$this.prop("checked", false);
		}
	}

	$this.on('change', function() {
		if (this.checked) {
			$chkItem.each(function() {
				this.checked = true;
			})
		} else {
			$chkItem.each(function() {
				this.checked = false;
			})
		}
	});
	$chkItem.on('click', function() {
		if ($(this).is(":checked")) {
			isAllChecked = 0; 
			fncCheck();
		} else {
			$this.prop("checked", false);
		}
	});
};

var Body = {
	scrollTop :'',
	lock: function(){
	if ($('html').is(".lock")) {
			return;
		}
		Body.scrollTop = window.pageYOffset;
		$('#wrap').css({
			top: - (Body.scrollTop)
		});
		$('html').addClass('lock');
	},
	unlock: function(){
		if( $("html").hasClass("lock") ){
			$('html').removeClass('lock');
			$('#wrap').removeAttr('style');
			window.scrollTo(0, Body.scrollTop);
		}
	}
}

var modal = {
	focusClass:'openFocus',
	focusTarget: null,
	openModal:function(tar, v, callback){
		var $select_id = $(tar),
			$body = $('body'),
			$lastCloseBtn = '<a href="#" class="dialog_close last_focus" role="button"><span class="hidden">팝업창 닫기</span></a>';
			
		Body.lock();

		if($(v).is('[data-focus-target]')) {
			modal.focusTarget = $(v).parent().find('[data-focus-target]').attr('data-focus-target');
		}
		if($(v).is('[data-focus-return]')) {
			modal.focusTarget = $(v).parent().find('[data-focus-return]').attr('data-focus-return');
		}

		//원래 포커스에 클래스 부여
		var $focus = $(':focus');
		if ($focus.length) {
			$($focus).addClass(modal.focusClass + $('.uiModal.active').length);
		}

		//팝업 마지막 포커스 버튼 적용
		$select_id.find('.modalWrap').append($lastCloseBtn);
		

		//열기
		$select_id.attr({'aria-hidden':'false'}).fadeIn(100,function(){
			if(!!callback){
				callback();
			}
			$select_id.find('.modalWrap').attr({'tabindex':'0'});
		}).addClass('active').find('.modalWrap').focus();
		$select_id.find('.modalWrap').on('blur', function(){ $(this).removeAttr('tabindex'); });

		var zIndex = 300 + 10 * $('.uiModal.active').length;
		$select_id.css('z-index', zIndex);

		var $bottom =  $select_id.find('.modalBottom'),
			$header = $select_id.find('.modalHeader');

		if (!isMobile && $select_id.hasClass('full')) {
			// console.log($('.modalHeader').outerHeight() + ' / ' + $bottom.height())
			var $conHeight = 720 - $header.outerHeight() - $bottom.height() - 40; 
            $select_id.find('.inner').css('max-height', $conHeight);
			
			// if ($bottom.length > 0) {
			// 	if ($(tar).height() > 720) {
			// 		var $conHeight = 720 - $('.modalHeader').outerHeight() - $bottom.height() - 40; 
			// 		$select_id.find('.inner').css('max-height', $conHeight);
			// 	}        
				
			// }
		} else if($select_id.hasClass('bottom') || $select_id.hasClass('modal')) {
			var $height = $(tar).height(),			
				$popHeader = $(tar).find('.modalHeader').outerHeight(),
				$popConts = $(tar).find('.modalContent').outerHeight(),
				$popBtn = $(tar).find('.btns').outerHeight();

			if(isMobile) {
				if($select_id.hasClass('modal')) {
					$select_id.find('.inner').css('max-height',$height - $popHeader - $popBtn - 110);
				} else {
					$select_id.find('.modalContent').css('max-height',$height - $popHeader);
				}				
			
				if($select_id.find('.terms').length) {
					$select_id.find('.uiAccoContent').css('max-height',$height - $popHeader - $popConts);
				}
				
			} else {
				var $inCont = $select_id.find('.inner').outerHeight();
				
				if($select_id.find('.terms').length) {
					$select_id.find('.uiAccoContent').css('max-height',350 - $inCont);
				}
			}
			
		}

		//팝업 안에서만 포커스 이동
		modal.focusMove(tar);
	},
	focusMove: function (tar) {
		if (!$(tar).is(':visible')) return false;
		var $tar = $(tar),
			$focusaEl = '[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"])',
			$focusaEls = $tar.find($focusaEl);

		var $isFirstBackTab = false;
		$focusaEls.on('keydown', function (e) {
			var $keyCode = (e.keyCode ? e.keyCode : e.which),
			$focusable = $tar.find(':focusable').not('.last_focus'),
			$focusLength = $focusable.length,
			$firstFocus = $focusable.first(),
			$lastFocus = $focusable.last(),
			$index = $focusable.index(this);

			// console.log($index)

			$isFirstBackTab = false;
			if ($index == ($focusLength - 1)) { //last
				if ($keyCode == 9) {
					if (!e.shiftKey) {
					$firstFocus.focus();
					e.preventDefault();
					};
				};
			} else if ($index == 0) {	//first
				if ($keyCode == 9) {
					if (e.shiftKey) {
					$isFirstBackTab = true;
					$lastFocus.focus();
					e.preventDefault();
					};
				};
			}
		});

		$tar.on('keydown', function (e) {
			var $keyCode = (e.keyCode ? e.keyCode : e.which),
			$focusable = $tar.find(':focusable').not('.last_focus'),
			$lastFocus = $focusable.last();

			if (e.target == this && $keyCode == 9) {
				if (e.shiftKey) {
					$lastFocus.focus();
					e.preventDefault();
				};
			}
		});

		$(document).on('focusin', $tar.selector + ' .last_focus', function (e) {
			var $focusable = $tar.find(':focusable').not('.last_focus'),
				$firstFocus = $focusable.first(),
				$lastFocus = $focusable.last();
			if ($isFirstBackTab) {
				$lastFocus.focus();
			} else {
				$firstFocus.focus();
			}
		});
	},
	hideModal: function (tar) {

		if($('.uiModal.active').length == 1){
			Body.unlock();
		}  

		if (!isMobile) {
			// if ($bottom.length > 0) {
			$(tar).find('.inner').removeAttr('style');
			// }
		}
		//포커스 되돌려주기
		var $focusLength = $('.uiModal.active').length - 1;
		// console.log(modal.focusTarget)
		if(modal.focusTarget === null) {
			// if ($focusLength) {
			$('.' + modal.focusClass + $focusLength).focus();
			// }
		} else {
			$('[data-focus-target]').focus();
			modal.focusTarget = null;
		}
		setTimeout(function () {
			$('.' + modal.focusClass + $focusLength).removeClass(modal.focusClass + $focusLength);
		}, 50);

		$(tar).find('.last_focus').remove();
		$(tar).attr({'aria-hidden': 'true'});
		$(tar).removeClass('active').removeAttr('style');//.fadeOut(300);;
	},
	init:function(){
		$('.uiModal').attr({'aria-hidden':'true','aria-live':'polit','tabindex':-1});
		//열기
		$(document).on('click','.modalOpen',function(e){
			e.preventDefault();
			var $pop = $(this).attr('href');
			modal.openModal($pop, this);
		});

		$(document).on('click', '.typeModalClose',function(e){
			e.preventDefault();
			var $pop = $(this).attr('href');
			if ($pop == '#' || $pop == '#none' || $pop == undefined)$pop = $(this).closest('.uiModal');
			modal.hideModal($pop);
		});
	}
};

$.fn.uiCheckAll = function() {
	return this.each(function() {
		var uiCheckAll = {
			gTarget: null,
			gChkAllObj: null,
			gChkListObj: null,
			gChkListItemObj: null,
			gChkListSubObj: null,
			sData: {},
			strAll: '[data-chk-item=all]',
			strList: '[data-chk-item=list]',
			strListItem: '[data-chk-item=list-item]',
			strListSub: '[data-chk-item=list-sub]',
			len: 0,
			checkAllFn: function(v) { // 20220905 수정 'checkAllFn'
				var o = this,
				$t = $(v),
				$boolean = $t.is(':checked');

				if($boolean) {
					o.sData.count = o.len;

					// sData 적용
					o.sData.list.forEach(function(obj, index) {
						obj.item = $boolean;

						if(obj.sub !== undefined) {
							obj.sub.forEach(function(objSub) {
								objSub.item = $boolean;
							});
							obj.count = obj.sub.length + 1;
						}
					});
				} else {
					o.sData.count = 0;

					// sData 적용
					o.sData.list.forEach(function(obj, index) {
						obj.item = $boolean;

						if(obj.sub !== undefined) {
							obj.sub.forEach(function(objSub) {
								objSub.item = $boolean;
							});
							obj.count = 0;
						}
					});
				}
				o.sData.all = $boolean;
				o.gChkListItemObj.prop('checked', $boolean);
				o.gChkListSubObj.prop('checked', $boolean);
				// console.log('전체 카운트 : ' + o.sData.count)
				// console.log(o.sData);
			},

			checkListItemFn: function(v) {
				var o = this,
					$t = $(v),
					$boolean = $t.is(':checked'),
					idx = o.gChkListItemObj.index($t),
					$sub = $t.closest(o.strList).find(o.strListSub),
					len = 0; // 체크되지 않은 갯수
				
				o.sData.list.forEach(function(obj, index) {
					if($boolean) {
						if(idx === index) {
							obj.item = true;
							if(obj.sub !== undefined) {
								obj.sub.forEach(function(objSub,i) {
									objSub.item = true;
								});

								$sub.each(function(i) {
									if($sub.eq(i).is(':not(:checked)')) {
										len = len + 1;
									}
								});
								o.sData.count = o.sData.count + len + 1;
								obj.count = obj.sub.length + 1
								$sub.prop('checked', true);
							} else {
								o.sData.count = o.sData.count + 1;
							}
						}
					} else {
						if(idx === index) {
							obj.item = false;
							if(obj.sub !== undefined) {
								obj.sub.forEach(function(objSub) {
									objSub.item = false;
								});
								obj.count = 0;
								$sub.prop('checked', false);
								o.sData.count = o.sData.count - (obj.sub.length + 1);
							} else {
								o.sData.count = o.sData.count - 1;
							}
						}
					}
				});
				o.activeAllFn();
				console.log('전체 카운트 : ' + o.sData.count)
				console.log(o.sData);
			},
			checkListSubFn: function(v) {
				var o = this,
					$t = $(v),
					$boolean = $t.is(':checked'),
					idx = o.gChkListSubObj.index($t),
					$item = $t.closest(o.strList).find(o.strListItem),
					$booleanItem = $item.is(':checked'),
					idxItem = o.gChkListItemObj.index($item),
					subCount = o.sData.list[idxItem].count,
					len = o.sData.list[idxItem].sub.length;
			
				o.sData.list[idxItem].sub.forEach(function(obj, index) {
					if(idx%len === index) {
						if($boolean) {
							obj.item = true;
							o.sData.list[idxItem].count = subCount + 1;
							o.sData.count = o.sData.count + 1;
							subCount = o.sData.list[idxItem].count;

							if(len === subCount) {
								o.sData.list[idxItem].count = subCount + 1;
								o.sData.list[idxItem].item = true;
								o.sData.count = o.sData.count + 1;
								subCount = o.sData.list[idxItem].count;
								$item.prop('checked', true);
							}
							console.log('전체 카운트 : ' + o.sData.count , ' / 부분 카운트 : ' + subCount)
						} else {
							obj.item = false;
							o.sData.list[idxItem].count = subCount - 1;
							o.sData.count = o.sData.count - 1;
							subCount = o.sData.list[idxItem].count;
							
							if(len === subCount) { //
								o.sData.list[idxItem].count = subCount - 1;
								o.sData.list[idxItem].item = false;
								o.sData.count = o.sData.count - 1;
								subCount = o.sData.list[idxItem].count;
								$item.prop('checked', false);
							}
							console.log('전체 카운트 : ' + o.sData.count , ' / 부분 카운트 : ' + subCount)
						}
					}
				});
				o.activeAllFn();
				console.log(o.sData);
			},
			activeAllFn: function() { // 동일 레벨 체크박스 전체 체크시 전체동의 체크
				var o = this;
				if(o.sData.count === o.len) {
					o.sData.all = true;
					o.gChkAllObj.prop('checked', true);
				} else {
					o.sData.all = false;
					o.gChkAllObj.prop('checked', false);
				}
			},
			init: function(v) {
				var o = this;
					o.gTarget = $(v);
					o.gChkAllObj = o.gTarget.find(o.strAll);
					o.gChkListObj = o.gTarget.find(o.strList);
					o.gChkListItemObj = o.gChkListObj.find(o.strListItem);
					o.gChkListSubObj = o.gChkListObj.find(o.strListSub);
					o.len = o.gChkListItemObj.length + o.gChkListSubObj.length;
				/*
					[data-chk-item=all] // 최상위 전체 동의
					[data-chk-item=list] // 리스트 영역
					[data-chk-item=list-item] // 리스트 상위 동의 라디오
					[data-chk-item=list-sub]  // 리스트 하위 동의 라디오
					// 구조
					{
						all: false,
						count: 0,
						list: [
						{
							item: false,
							count: 0, // 하위 동의 있을 경우
							sub: [ // 하위 동의 있을 경우
							{item: false},
							{item: false}
							]
						},
						...
						]
					}
				*/
				o.sData.all = o.gChkAllObj.is(':checked');
				o.sData.count = 0;
				o.sData.list = [];
				o.gChkListObj.each(function(i) {
					var $sub = $(this).find(o.strListSub);
					if($sub.length) {
						o.sData.list.push({
							'item' : $(this).eq(i).is(':checked'),
							'count': 0,
							'sub' : []
						});
						$sub.each(function(j) {
							o.sData.list[i].sub.push({ 'item' : $(this).eq(j).is(':checked') });
						});
					} else {
						o.sData.list.push({ 'item' : $(this).eq(i).is(':checked') });
					}
				});

				// 전체 체크(all), 체크 해제
				o.gChkAllObj.off('click.allChk').on('click.allChk', function() {
				o.checkAllFn(this);
				});
			
				// 개별(list-item) 체크
				o.gChkListItemObj.off('click.itemChk').on('click.itemChk', function() {
				o.checkListItemFn(this);
				});
			
				// 개별(list-sub) 체크
				o.gChkListSubObj.off('click.subChk').on('click.subChk', function() {
				o.checkListSubFn(this);
				});
			}
		}
		uiCheckAll.init(this);
	});
}

$.fn.hToggle = function(){
	var $target = $('.infoToggle');
	$target.each(function () {
		var $this = $(this),
			$btnToggle = $this.find('.infoTogBtn'), 
			$contentsToggle = $this.find('.infoTogConts');
		$btnToggle.attr('aria-expanded','false').find('.hidden').text('내용열기');
		$contentsToggle.attr('aria-hidden','true');

		$btnToggle.on('click', function (e) {
			e.preventDefault();
			var $this = $(this), $panel = $($this.attr('href'));
			if ($this.attr('aria-expanded') == 'false'){
			$this.attr('aria-expanded','true').addClass('active').find('.hidden').text('내용닫기');
			$panel.attr('aria-hidden','false').slideDown(300);
			} else {
			$this.attr('aria-expanded','false').removeClass('active').find('.hidden').text('내용열기');
			$panel.attr('aria-hidden','true').slideUp(300);
			}
		});
	});
}

var accordion = function (callback) {
	var $acco = '.uiAcco',
		$acPanel = $($acco).find('.uiAccoContent'),
		$acHead = $($acco).find('.uiAccoHeader'),
		$acBtn = $($acHead).find('.uiBtn');

	$acPanel.hide();

	$($acco).attr({
		role: 'tablist',
		multiselectable: 'true'
	});

	$($acPanel).attr('id', function (IDcount) {
		return 'panel-' + IDcount;
	});
	$($acPanel).attr('aria-labelledby', function (IDcount) {
		return 'control-panel-' + IDcount;
	});
	$($acPanel).attr('aria-hidden', 'true');
	$($acPanel).attr('role', 'tabpanel');

	$($acHead).each(function (i) {
		var $this = $(this),
			$target = $this.next('.uiAccoContent')[0].id;

		$this.find('.uiBtn').attr({
			'href': '#' + $target,
			'aria-expanded': 'false',
			'aria-controls': $target,
			'id': 'control-' + $target
		});

		if ($this.hasClass('open')) {
			$this.find('button').attr('aria-expanded', true).addClass('active').parent().next('.uiAccoContent').addClass('active').attr('aria-hidden', false).slideDown(200);
			$this.find('button').find('.hidden').text('접기');
		}
	});

	$($acBtn).on('click', function (e) {
		e.preventDefault();
		var $this = $(this);

		if ($this.attr('aria-expanded') == 'false') {
			if (!$this.closest('.uiAcco').hasClass('open')) {
				$this.parents('.uiAcco').find('[aria-expanded=true]').attr('aria-expanded', false).removeClass('active').parent().next('.uiAccoContent').removeClass('active').attr('aria-hidden', 'true').slideUp(200);
			}
			$this.attr('aria-expanded', true).addClass('active').find('.hidden').text('접기').parents('.uiAccoHeader').next('.uiAccoContent').addClass('active').attr('aria-hidden', false).slideDown(200);
			// $this.parent().siblings().find('.hidden').text('펼치기');

		} else {
			$this.attr('aria-expanded', false).removeClass('active').find('.hidden').text('펼치기').parents('.uiAccoHeader').next('.uiAccoContent').removeClass('active').attr('aria-hidden', true).slideUp(200);
		}
	});

	if (typeof callback === 'function') {
		callback();
	}
};

var uiTab = function () {
	var $target = $('.tabWrap');

	$target.each(function () {
		var $this = $(this),
			$tab = $this.find('.tabList'),
			$tabItemActive = $tab.find('li.active a'),
			$tabPanels = $this.find('.tabPanel');

		var $tabItemID = $tabItemActive.attr("href"),
			$tabPanelActive = $($tabItemID);
			
		$tabPanels.attr({
			'aria-hidden': 'true'
		});
		$tabItemActive.attr('title', '현재선택');
		$tabPanelActive.attr('aria-hidden', 'false').addClass('active');
	});

	$('.tabList .tab a').on('click', function (e) {
		e.preventDefault();
		$(this).closest('.tabList').find('li').removeClass('active').find('a').removeAttr('title');
		$(this).closest('li').addClass('active').find('a').attr('title', '현재선택');
		var tabPanId = $(this).attr('href');
		var tabPanel = $(tabPanId);
		tabPanel.attr('aria-hidden', 'false').addClass('active').siblings().attr('aria-hidden', 'true').removeClass('active');
	
		// 인터렉션
		var $this = $(this);
		this.closest('.tabList').dispatchEvent(new CustomEvent('endTabChange', {
			detail: {
				currentIdx: $this.closest('.tabList').find('a').index($this),
				currentPanel: tabPanel[0]
			}
		}));
	});
}

var rollTabUI = function (callback) { // 단순 탭 기능(활성화, 접근성), 버튼 클릭시 센터 적용
	// var $target = $('.tabBox'),
	var $target = $('.ui-tab'),
		$parent = $target.find('li'),
		$links = $parent.find('a'),
		$onText = '현재선택',
		$tabPanels = $target.find('.tabPanel');

	// console.log($tabPanels.length)
	$links.attr('aria-selected', false);
	$tabPanels.attr('aria-hidden', true);

	$parent.each(function () {
		if ($(this).hasClass('active')) {
			$(this).find('a').attr({
				'title': $onText,
				'aria-selected': true
			});
			var $tabItemID = $(this).find('a').attr("href");
			$tabPanelActive = $($tabItemID);
			$tabPanelActive.attr('aria-hidden', 'false').addClass('active');
		}
	});

	// $(document).on('click', '.rollTab a', function (e) {
	if($links.closest('.rollTab')){
		$links.off('click.rollTab').on('click.rollTab', function (e) {
			e.preventDefault();
			var $this = $(this),
				$closest = $this.closest('.rollTab'),
				$href = $this.attr('href');

			$parent.removeClass('active');
			$links.attr('aria-selected', false).removeAttr('title');
			$this.attr({
				'title': $onText,
				'aria-selected': true
			}).parent().addClass('active');
			var tabPanel = $($href);
			tabPanel.attr('aria-hidden', 'false').addClass('active').siblings().attr('aria-hidden', 'true').removeClass('active');

			if(typeof callback === 'function') {
				callback();
			}
			
			if (isMobile) {
				scrollUI.center($(this).parent());
			}
		});
		$target.each(function () {
			var $active = $(this).find('.active');
			if($active.length) {
				scrollUI.center($active);
			}
		});
	}
};

var scrollUI = {
	center: function(el){
    // console.log('1 : ' + el)
		var $parent = $(el).parent(),
			$parentWidth = $parent.outerWidth(),
			$parentScrollW = $parent.get(0).scrollWidth,
			$thisLeft = $(el).position().left,
			$thisWidth = $(el).outerWidth(),
			$scrollLeft = $thisLeft - ($parentWidth/2) + ($thisWidth/2),
			$speed = Math.max(300,Math.abs($scrollLeft * 2));
		if($parentWidth < $parentScrollW)$parent.animate({'scrollLeft':'+='+$scrollLeft},$speed);
	}
};

var activeEle, activeEleTarget = [$('.btnTooltip'), $('.active .btnTooltipClose')];
$(document).on('click', function(e){
	if(activeEle !== undefined) {
		if (e.target !== activeEle) {
			var $t1 = $(activeEle);
			$t1.closest('.tooltipWrap').removeClass('active');
			setTimeout(function() {
				$t1.closest('.tooltipWrap').find('.toolTip').removeAttr('style'); 
				$t1.closest('.tooltipWrap').find('.toolTip > i').removeAttr('style');
			},100);
		}
	}
});

$.fn.uiToolTip = function() {
	return this.each(function() {
		var $t = $(this),
			_parent = '.tooltipWrap',
			_tooltip = '.toolTip',
			_edge = '.toolTip > i',
			_closeBtn = '.btnTooltipClose',
			$parent = $t.closest(_parent),
			$tootip = $t.closest(_parent).find(_tooltip),
			$edge = $t.closest(_parent).find(_edge),
			$closeBtn = $tootip.find(_closeBtn),
			$mob = $('html').hasClass('mobile'),
			edgePos = '30px',
			$winW = $(window).width(),
			whiteSpace = 20, // 모바일에서 툴팁의 좌우 여백
			flag = $(_parent).index($parent);

		$t.attr('aria-describedby','tooltiprules' + flag);
		$tootip.attr({
			'role': 'tooltip',
			'id': 'tooltiprules' + flag
		});
    
		$t.off('click').on('click', function() {
			if( activeEle != undefined && activeEle != document.activeElement) {
				var $t1 = $(activeEle);
				$t1.closest(_parent).removeClass('active');
				setTimeout(function() {
					$t1.closest(_parent).find(_tooltip).removeAttr('style'); 
					$t1.closest(_parent).find(_edge).removeAttr('style');
				},100);
			}
			activeEle = document.activeElement;
			
			if($tootip.is(':visible')) return;
			
			$tootip.show();
			
			if($tootip.offset().left + $tootip.innerWidth() > $(window).width()) { // 툴팁의 offset left 값 + 가로값이 브라우자 가로폭보도 큰경우, 즉 화면을 넘어간 경우
				$tootip.css('right', '-' + edgePos);
				$edge.css('right', edgePos);
			} else {
				if($mob) {
					console.log($winW, $tootip.offset().left, Math.floor($tootip.offset().left) + whiteSpace);
					$tootip.css({
						'width': $winW - (whiteSpace * 2),
						'left': Math.floor(whiteSpace - $tootip.offset().left) + 'px',
					});
					$edge.css('left', $t.offset().left - $tootip.offset().left);
				} else {
					$tootip.css('left', '-' + edgePos);
					$edge.css('left', edgePos);
				}
			}
			setTimeout(function() {
				$parent.addClass('active');
			},100);

			$closeBtn.off().on('click', function() {
				$parent.removeClass('active');
				setTimeout(function() {
					$tootip.removeAttr('style');
					$edge.removeAttr('style');
					$t.focus();
				},100);
			});
		});
	});
}

// 객체의 offset().top 구하기
$.fn.positionInfo = function() {
	return $(this).offset().top;
}
// fixed
$.fn.fixedTarget = function(exc, scrollTarget) {
	return this.each(function() {
		var $win = (scrollTarget === undefined) ? $win = $(window) :  $win = $(scrollTarget),
			$wT = $win.scrollTop(),
			$wH = $win.height(),
			$t = $(this),
			$tW = $t.innerWidth(),
			$tH = $t.innerHeight(),
			$tMB = parseInt($t.css('margin-bottom')),
			$tMT = parseInt($t.css('margin-top')),
			// $space = $tH + $tMB,
			$top = $t.positionInfo(),
			$sT,
			$excH = 0;

		exc.forEach(function(obj, index) {
			$excH += $(obj).innerHeight();
		});

		$t.prev('.tempFixedTarget').remove();
		$t.before('<div class="tempFixedTarget" style="display:none; height:'+$tH+'px; margin-top:'+$tMT+'px; margin-bottom:'+$tMB+'px;">');

		$win.off('scroll.fixedTarget').on('scroll.fixedTarget', function() {
			$sT = $win.scrollTop();
			// console.log($sT, $excH, $top, $t.offset().top)
			if($sT + $excH >= $top) {
				$t.addClass('fixed');
				$t.css({'position': 'fixed', top: $excH, 'z-index': 10, 'width': $tW + 'px'});
				$t.prev().show();

				// if($t.data().fixedTarget === 'menuScroll') { // 전체메뉴 고정 tabBox 위로 흰 배경을 만들어 줌
				// 	$t.css({ 'padding-top': '50px', 'padding-bottom': '10px','margin-top': '-50px' });
				// }
			} else {
				$t.removeClass('fixed');
				$t.css({'position': 'static', top: 'auto'});
				$t.prev().hide();
			}
		});
	});
}

var scrollStatus = {
	clickTarget: null,
	pageEndClick: false,
	pageEndScroll: false
}

// page scroll
var pageScroll = function(v,exc,scrollTarget) {
	var $win = (scrollTarget === undefined) ? $win = $('html, body') :  $win = $(scrollTarget),
		str = v.split('#')[1],
		$top = $(v).positionInfo(),
		$excH = 0,
		$wH = $(window).height(),
		$sT = 0,
		$dH = $(document).innerHeight(),
		$dH = (scrollTarget === undefined) ? $dH = $(document).innerHeight() :  $dH = $(scrollTarget).prop('scrollHeight'),
		status = false;

	exc.forEach(function(obj, index) {
		$excH += $(obj).innerHeight();
	});

	if(scrollTarget === undefined) {
		$win.animate({ scrollTop: $top - $excH }, 300, function() {
			$sT = $(window).scrollTop();
			status = $wH + $sT == $dH;
			scrollStatus.pageEndClick = status;
			scrollStatus.clickTarget = v;
			// console.log('click1 : ' + scrollStatus.pageEndClick, scrollStatus.clickTarget);

			if(scrollStatus.pageEndClick) {
				$('.ui-scrollLinks').find('li').removeClass('active').find('a').attr('aria-selected',false).removeAttr('title');
				$('[href='+scrollStatus.clickTarget+']').parent().addClass('active').find('a').attr({ 'title': '현재선택', 'aria-selected': true });
			}
		});
	} else if(scrollTarget === '.mbGnbMenu .innerScroll') {
		$sT = $(scrollTarget).scrollTop();
		var $currentT = $top - $excH - 25;
		
		$win.animate({ scrollTop: $currentT + $sT }, 300, function() {
			status = $wH + $sT == $dH;
			scrollStatus.pageEndClick = status;
			scrollStatus.clickTarget = v;
			// console.log('click1 : ' + scrollStatus.pageEndClick, scrollStatus.clickTarget);

			if(scrollStatus.pageEndClick) {
				$('.rollLinksMenu').find('li').removeClass('active').find('a').attr('aria-selected',false).removeAttr('title');
				$('[href='+scrollStatus.clickTarget+']').parent().addClass('active').find('a').attr({ 'title': '현재선택', 'aria-selected': true });
			}
		});

	} else {
		console.log('else.....')
	}
}

// roll links - 링크 클릭시 화면 스크롤(해당 id)
$.fn.scrollLinksUI = function(){ // 20220905 수정
	return this.each(function() {
		var $t = $(this),
			$parent = $t.find('li'),
			$links = $parent.find('a'),
			$onText = '현재선택';

		// 초기 웹접근성 관련 설정
		$links.attr('aria-selected',false);
		$parent.each(function() {
			if($(this).hasClass('active')) {
				$(this).find('a').attr({ 'title': $onText, 'aria-selected': true })
			}
		});

		$links.off('click.scrollLinks').on('click.scrollLinks', function(e){
			e.preventDefault();
			var $this = $(this);
			// scrollUI.center($(this).parent());

			if(isMobile) {
				if($t.hasClass('rollLinksMenu')){ // 전체메뉴
					pageScroll($this.attr('href'), ['.quickLinks .tabBox'],'.mbGnbMenu .innerScroll');
					// console.log('click====================');
				} else {
					pageScroll($this.attr('href'), ['.headerMob', '.ui-scrollLinks']); // '.ui-scrollLinks' 유니크해야 함
					// console.log('click--------------------');
				}
			} else {
				pageScroll($this.attr('href'), ['.breadcrumbsConts', '.ui-scrollLinks']);
			}
		});
	});
};

// scroll active
$.fn.scrollActive = function(exc, v) { // v : 스크롤 대상(바닥화면 or 모달?)
	var defaults = {
		$excH: 0,
		scrollTarget: [],
		scrollTargetTop: []
	}
	// destory
	$.fn.scrollActive.destroy = function() {
		var $win = (v === undefined) ? $win = $(window) :  $win = $(v);
		defaults.$excH = 0;
		defaults.scrollTarget = [];
		defaults.scrollTargetTop = [];
		$win.off('scroll.scActive');
	}
	return this.each(function() {
		var $win = (v === undefined) ? $win = $(window) :  $win = $(v),
			$t = $(this),
			$classTarget = $t.find('li'),
			$onText = '현재선택',
			status = false,
			$sT = 0;
		// defaults.$excH = 0;
		// defaults.scrollTarget = [];
		// defaults.scrollTargetTop = [];
		
		// destory
		// $.fn.scrollActive.destroy = function() {
		// 	$excH = 0;
		// 	scrollTarget = [];
		// 	scrollTargetTop = [];
		// 	$win.off('scroll.scActive');
		// }

		exc.forEach(function(obj, index) {
			defaults.$excH += $(obj).innerHeight();
		});

		
		$t.find('a').each(function() {
			defaults.scrollTarget.push($(this).attr('href'))
		});

		defaults.scrollTarget.forEach(function(obj, index) {
			if(v === undefined) {
				defaults.scrollTargetTop.push($(defaults.scrollTarget[index]).positionInfo());
			} else {
				defaults.scrollTargetTop.push($(defaults.scrollTarget[index]).positionInfo() + $win.scrollTop());
			}
		});

		$win.off('scroll.scActive').on('scroll.scActive', function() {
			$sT = $win.scrollTop();
			var $wH = $(window).height(),
				$dH = (v !== '.mbGnbMenu .innerScroll') ? $dH = $(document).innerHeight() : $dH = $(v).prop('scrollHeight');

			status = $wH + $sT == $dH;
			scrollStatus.pageEndScroll = status;
			scrollStatus.pageEndClick = status;
			// console.log($wH, $sT, $dH)

			var $_sT = $sT,
				activeIdx = null, activedIdx = null;

			setTimeout(function() {

				if($sT === $_sT) { // 스크롤 멈춘 경우
					// console.log('click2 : ' + scrollStatus.pageEndClick, scrollStatus.pageEndScroll, scrollStatus.clickTarget)
					// console.log(scrollStatus.pageEndScroll)
					// console.log(scrollStatus.pageEndClick)

					defaults.scrollTargetTop.forEach(function(obj, index) {
						if(scrollStatus.pageEndClick || scrollStatus.pageEndScroll) {
							$($classTarget[index]).removeClass('active').find('a').attr('aria-selected',false).removeAttr('title');
							if(scrollStatus.clickTarget !== null) {
								// console.log('++++++++++++++++++++++++')
								$('[href=' + scrollStatus.clickTarget + ']').parent().addClass('active').find('a').attr({ 'title': $onText, 'aria-selected': true });
								
								activeIdx = $t.find('a').index($('[href=' + scrollStatus.clickTarget + ']'));
								activedIdx = activeIdx;
							} else {
								// console.log('-------------------------------------------')
								$($classTarget[defaults.scrollTargetTop.length-1]).addClass('active').find('a').attr({ 'title': $onText, 'aria-selected': true });

								activeIdx = index;
								activedIdx = activeIdx;
							}
						} else {
							if($sT + defaults.$excH  >= obj || $sT + ($wH * 0.4) >= obj) {
								$($classTarget).removeClass('active').find('a').attr('aria-selected',false).removeAttr('title');
								$($classTarget[index]).addClass('active').find('a').attr({ 'title': $onText, 'aria-selected': true });
								scrollStatus.clickTarget = $($classTarget[index]).addClass('active').find('a').attr('href');
								activeIdx = index;
								activedIdx = activeIdx;
							} else {
								$($classTarget[index]).removeClass('active').find('a').attr('aria-selected',false).removeAttr('title');
								scrollStatus.clickTarget = null;
								activeIdx = null;
							}
						}
					});

					if(activedIdx === null && activeIdx === null) {
						scrollUI.center($($classTarget[0]));
						// console.log('모두 비활성 ---- ' + activedIdx, activeIdx);
					} else {
						scrollUI.center($($classTarget[activedIdx]));
						// console.log('하나 활성 ---- ' + activedIdx, activeIdx);
					}
				}
			},300);
		});
	});
}

var range = function(){
	if($('.rangeSlider').length){
		$('.rangeSlider').each(function(){
			var $slider = $(this).find('.slider'),
				$inp = $(this).find('input[type=hidden]'),                
				$setVal = $(this).find('.selVal'),
				//$sel = $(this).find('.i_val'),
				$min = parseInt($slider.data('min')),
				$max = parseInt($slider.data('max')),
				$val = parseInt($slider.data('value')),
				$step = parseInt($slider.data('step')),
				$unit = $slider.data('unit');

			if(!$min)$min = 0;
			if(!$max)$max = 5;
			if(!$step)$step = 1;
			if(!$val)$val = $min;

			if($inp.length)$inp.val($val);
			var range = $slider.slider({
				min:$min,
				max:$max,
				value:$val,
				step:$step,
				range:'min',
				create:function(e){
					$slider.find('.ui-slider-handle').attr({'tabindex':0}).html('<span class="hidden">선택한 값은</span><i>'+$val+'</i><span class="hidden">'+$unit+'입니다.</span>');
					//$sel.val($val).change();
				},
				stop:function(event,ui){
					$(ui.handle).find('i').html(ui.value);
					if($inp.length)$inp.val(ui.value).change();
					if($setVal.length)$setVal.html(ui.value + $unit);
					$slider.data('value',ui.value);
				}
			});

		});
	}
}

// chart scroll 
$.fn.scrollLeftChart = function() {
	return this.each(function() {
		var o = $(this),
			sum = 0;
			o.find('.item').each(function(i) {
			sum += o.find('.item').eq(i).width()
		});
		// console.log(sum)
		o.scrollLeft(sum);
	});
}

// header 검색 돋보기 클릭
var btnSearchFn = {
	$t: null,
	$parent: null,
	$target: null,
	$bg: null,
	className: null,
	openFn: function() {
		var o = this;
		o.$parent.addClass('active');
		o.$bg.css({'height': o.$target.innerHeight()}).closest('.headerHome').addClass('show');
		o.$target.show();
		setTimeout(function() {
			o.$target.css('opacity',1);
		},10);
	},
	closeFn: function() {
		var o = this;
		o.$parent.removeClass('active');
		o.$target.css('opacity','0');
		o.$target.hide();
		o.$bg.css({'height': 0});
		setTimeout(function() {
			o.$bg.closest('.headerHome').removeClass('show');
		},200);
	},
	activeFn: function() {
		var o = this;
		if(!o.$parent.hasClass(o.className)) {
			o.openFn();
		} else {
			o.closeFn();
		}
	},
	init: function(v) {
		var o = this;
		o.$t = $('.headerHome .btnSearch');
		o.$parent = o.$t.parent(),
		o.$target = $('.headerHome .menuSearh'),
		o.$bg = $('.searchBg');
		o.className = 'active';

		o.$t.off().on('click', function() {
			o.activeFn();
		});

		if(v === 'open') {
			o.openFn();
		}
		if(v === 'close') {
			o.closeFn();
		}
	}
}

// page scroll top
var pageTopFn = {
	$window: $(window),
	$winT: null,
	$sumH: null,
	showPoint: 200,
	$appendTarget: null,
	btn: null,
	$btn:null,
	$className: null,
	$footer: false,
	$footerT: null,
	$pos: null,
	$bottomNavi: null,
	$bottomNaviT: null,
	$bottomNaviH: null,
	setPos: function() {
		var o = this;
		if(o.$window.scrollTop() > o.showPoint) {
			if(isMobile) {
				o.$btn.addClass(o.$className).show().stop().animate({ 'opacity': 1 }, 10);
			} else {
				o.$btn.addClass(o.$className).show().stop().animate({ 'opacity': 1 }, 10);
			}
		} else {
			o.$btn.removeClass(o.$className).stop().animate({ 'opacity': 0 }, 10, function() { $(this).hide() });
		}

		if(o.$footer) { // footer 있는 경우
			if(isMobile && o.$bottomNavi) {
				if(o.$sumH >= o.$footerT + o.$bottomNaviH) {
					o.$btn.css({
						'bottom': o.$pos + 20,
					});
				} else {
					o.$btn.css({ 'bottom': o.$bottomNaviH + 20 });
				}
			} else {
				if(o.$sumH >= o.$footerT) {
					o.$btn.css({
						'bottom': o.$pos + 30,
					});
				}
			}
		}
	},
	activeTop: function(e,v) {
		e.preventDefault();
		var id = v.attr('href').split('#')[1];
		$('html, body').animate({
			scrollTop: 0
		}, 300, function() {
			console.log($('#' + id))
			$('#' + id).attr('tabindex',0).focus();
		});
	},
	init: function() {
		var o = this;
		o.$appendTarget = $('#content');
		o.btn = '<div class="pageTop"><a href="#skipNavi"><span class="hidden">페이지 처음으로 이동</span></a></div>';
		o.$appendTarget.append(o.btn);
		o.$btn = $('.pageTop');
		o.$className = 'active';
		o.$footer = $('#footer').is(':visible');
		o.$footerT = (o.$footer === true) ? $('#footer').offset().top : 0;
		o.$bottomNavi = $('.bottomNavi').is(':visible');
		o.$bottomNaviT = o.$bottomNavi ? $('.bottomNavi').offset().top : 0;
		o.$bottomNaviH = o.$bottomNavi ? $('.bottomNavi').innerHeight() : 0
		
		if(isMobile) { // 최초 위치 설정
			if($('div').hasClass('bottomActiveBtns')) { // 하단 고정 버튼 있는 경우
				o.$btn.css({ 'bottom': $('.bottomActiveBtns .btns').innerHeight() + 20 });
			} else if(o.$bottomNavi) { // 하단 bottomNavi 있는 경우
				o.$btn.css({ 'bottom': o.$bottomNaviH + 20 });
			} else {
				o.$btn.css({ 'bottom': 20 });
			}
		} else {
			o.$btn.css({ 'bottom': 30 });
		}

		// 페이지 스크롤 이후 새로고침의 경우
		o.setPos();

		o.$window.off('scroll.pageTop').on('scroll.pageTop', function() {
			o.$winT = o.$window.scrollTop();
			o.$sumH = o.$winT + o.$window.height();
			o.$pos = o.$sumH - o.$footerT;
			o.setPos();
		}).scroll();

		o.$btn.find('a').off('click.pageTop').on('click.pageTop', function(e) {
			o.activeTop(e, $(this));
		});
	}
}

// swiper play stop
var swiperPlayStop = function(v) {
	var swp = v,
		wrap = '[data-swiper-autoplay]',
		$wrap = $(swp.$el.find(wrap)),
		$val = $wrap.data('swiperAutoplay'),
		$len = $wrap.length,
		$btn,
		text1 = '배너 자동 실행',
		text2 = '배너 일시 정지',
		status = $val;
	
	if(swp.autoplay.running && $len) {
		status = swp.autoplay.running
		if($val) {
			$wrap.append('<button type="button" class="btnStop"><span class="hidden">'+ text2 +'</span></button>');
		} else {
			$wrap.append('<button type="button" class="btnPlay"><span class="hidden">'+ text1 +'</span></button>');
		}
	}
	$btn = $wrap.find('button');
	$btn.on('click', function() {
		// console.log(swiper.autoplay.running)
		if(swp.autoplay.running) {
			$(this).removeClass().addClass('btnPlay').children('span').text(text1);
			swp.autoplay.stop();
			status = false;
		} else {
			$(this).removeClass().addClass('btnStop').children('span').text(text2);
			swp.autoplay.start();
			status = true;
		}
	});
	var overFn = function() {
		if(status) {
			$btn.removeClass().addClass('btnPlay').children('span').text(text1);
			swp.autoplay.stop();
		}
	}
	var outFn = function() {
		if(status) {
			$btn.removeClass().addClass('btnStop').children('span').text(text2);
			swp.autoplay.start();
		}
	}
	$(swp.$wrapperEl).on('focusin mouseover', function() {
		overFn(status)
	});
	$(swp.$wrapperEl).on('focusout mouseout', function() {
		outFn(status)
	});
}

// circle chart
$.fn.chartCircle = function(opts) {
	var defaults = $.extend({
		chart: 'circle',
		value: 0
	}, opts);
	return this.each(function() {
		var $t = $(this),
			$tW = $t.innerWidth(),
			$svg = $t.find('svg circle'),
			$strokeW = parseInt($svg.css('stroke-width')),
			$r = ($tW/2) - ($strokeW/2),
			$pieR2 = $r * 2 * 3.14,
			$realNum = (($pieR2 * defaults.value) / 100),
			sum;

		if(defaults.chart == 'circle') {
			sum = $pieR2 - $realNum;
		}
		if(defaults.chart == 'half') {
			sum = $pieR2 - ($realNum / 2)
		}

		$svg.attr({
			'r': $r, // 반지름 값 셋팅
			'stroke-dasharray': $pieR2,
			'stroke-dashoffset': $pieR2,
		});
		setTimeout(function() {
			$svg.css({
				'transition': 'stroke-dashoffset 0.8s ease-in-out',
				'-ms-transition': 'stroke-dashoffset 0.8s ease-in-out',
				'stroke-dashoffset': sum
			});
		}, 100);
	});
}

// loading
var loadingFn = function() {
	var html;
	if($('div').hasClass('mainPage')) {
		html = '<div class="loading main"><div style="width: 50%;"></div></div>';
	} else {
		html = '<div class="loading"><div style="width: 50%;"></div></div>';
	}
	$('body').append(html);
}

var dotLoading = {
	start: function() {
		var loader = '';
			loader += '<div class="dotLoading">';
			loader += '<div class="loader">';
			loader += '<span class="dot"></span>';
			loader += '<span class="dot"></span>';
			loader += '<span class="dot"></span>';
			loader += '</div>';
			loader += '<p>잠시만 기다려주세요</p>';
			loader += '</div>';

		$('body').append(loader);
	},
	end: function() {
		if ($('.dotLoading').length > 0) {
			$('.dotLoading').remove();
		}
	}
}

var loading = {
	start: function(_srt, _name, _txt) {
		var sortClass = !!!_srt ? '' : _srt;
		var loadingTxt = '',
			loadingObj = '';
			loadingObj += '<div id="Loading" class="loading2 '+ sortClass +'">';
			// loadingObj += '<div class="loadingImg"><span class="glass"></span></div>';		// loading image
			loadingObj += '<div class="loader">';
			loadingObj += '<span class="dot"></span>';
			loadingObj += '<span class="dot"></span>';
			loadingObj += '<span class="dot"></span>';
			loadingObj += '</div>';
			loadingObj += '<div class="loadingMsg"></div>';
			loadingObj += '</div>';

		if (_srt === 'loan') {// 맞춤대출
			loadingTxt += '<div class="msg">';
			loadingTxt += _name + '님에게 꼭 맞는<br>대출상품을 찾고 있어요.</div>';
			loadingTxt += '<div class="msg" style="display:none;">최대 3분 정도 걸릴 수 있어요.<br>조금만 기다려 주세요.</div>';
			loadingTxt += '<div class="msg" style="display:none;">심사 중 다른 서비스를 이용해도<br>한도 조회는 계속 진행돼요.</div>';
			loadingTxt += '<p><a href="#none"><strong>기다리지 않고 다른 서비스 이용할래요.</strong></a><span>(완료되면 앱 푸시/알림톡으로 알려드립니다.)</span></p>';
		} else if (_srt === 'credit') {// 신용점수 올리기
			loadingTxt += '<div class="msg">선택하신 기관의 납부내역을<br>가져오고 있어요.</div>';
			loadingTxt += '<div class="msg" style="display:none;">거의 다 끝나가요.</div>';
			loadingTxt += '<p><strong>신용점수 올리기가 진행 중이에요.</strong><span>결과가 올 때까지 잠시만 기다려 주세요.</span></p>';
		} else if (_srt === 'profit') {// 모으다
			loadingTxt += '<div class="msg">';
			loadingTxt += _name + '님의 '+ _txt +'를<br>열심히 모으고 있어요.</div>';
			loadingTxt += '<div class="msg" style="display:none;">최대 3분 정도 걸릴 수 있어요.<br>조금만 기다려 주세요.</div>';
		} else if (_srt === 'mydata') { // 마이데이터 연결
			loadingTxt += '<div class="msg">자산정보를 가져오고 있어요.<br>종료하지 말고 잠시만 기다려 주세요.</div>';
		} else {
			loadingTxt += '<div class="msg">정보를 조회하고 있어요.<br>잠시만 기다려 주세요.</div>';
		}		

		// body에 loading 추가
		$('body').append(loadingObj);

		// loading 문구 추가
		$('#Loading').find('.loadingMsg').html(loadingTxt);

		// loading text animation
		if (_srt === 'loan') {
			var loadingMsg = $('.loadingMsg'),
				msgObj = loadingMsg.find('.msg'),
				cnt = 0;

			var rolling = setInterval(function() {
				cnt ++;

				if (cnt === 30) {
					msgObj.eq(0).fadeOut(200);
				} else if (cnt === 32) {
					msgObj.eq(1).fadeIn(200);
				} else if (cnt === 62) {
					msgObj.eq(1).fadeOut(200);
				} else if (cnt === 64) {
					msgObj.eq(2).fadeIn(200);
				} else if (cnt === 94) {
					msgObj.eq(2).fadeOut(200);
				} else if (cnt === 96) {
					msgObj.eq(0).fadeIn(200);
					cnt = 0;
				}
			}, 100);
		} else if (_srt === 'profit' || _srt === 'credit') {
			var loadingMsg = $('.loadingMsg'),
				msgObj = loadingMsg.find('.msg'),
				cnt = 0;

			var rolling = setInterval(function() {
				cnt ++;

				if (cnt === 30) {
					msgObj.eq(0).fadeOut(200);
				} else if (cnt === 32) {
					msgObj.eq(1).fadeIn(200);
				} else if (cnt === 62) {
					msgObj.eq(1).fadeOut(200);
				} else if (cnt === 64) {
					msgObj.eq(0).fadeIn(200);
					cnt = 0;
				}
			}, 100);
		}
	},
	end: function() {
		if ($('#Loading').length > 0) {
			$('#Loading').remove();
		}
	}
};

// toast popup
var toastPop = function(v, callback) {
	var html = '<div class="toastPop"><div class="inner">' + v + '</div></div>', $target;

	$('body').append(html);
	$target = $('.toastPop');

	setTimeout(function() { $target.addClass('active'); }, 100);
	setTimeout(function() { $target.removeClass('active'); }, 2500);
	setTimeout(function() { $target.remove(); }, 3000);

	if(typeof callback === 'function') {
		callback();
	}
}

// input focus 시 화면 input 상단으로 스크롤
$.fn.pageScrollTop = function(exc,scrollTarget) {
	return this.each(function() {
		var $win = (scrollTarget === undefined) ? $win = $('html, body') :  $win = $(scrollTarget),
			$t = $(this),
			$top = $t.positionInfo(),
			$excH = 0;

		exc.forEach(function(obj, index) {
			$excH += $(obj).innerHeight();
		});

		$t.off('focus.pageScroll').on('focus.pageScroll', function() {
			$win.animate({ scrollTop: $top - $excH }, 300);
		});
	});
}


var niceUI = {};

niceUI.throttle = function(_callback, _limit) {
	var callback = _callback;
	var limit = _limit || 100;
	var waiting = false
	return function() {
		if(!waiting) {
			callback.apply(this, arguments)
			waiting = true
			setTimeout(function() {
				waiting = false
			}, limit)
		}
	}
}

niceUI.CounterNumber = function(elCounter, _opt){
	var opt = jQuery.extend({
		duration: 60,
		speed: 20,
		value: elCounter.getAttribute('data-value')
	}, _opt)
	elCounter.counter = this;

	this.run = function(value){
		opt.value = value || opt.value;
		elCounter.innerText = 0;
		// animate();
		
		$({ val : 0 }).animate({ val : opt.value }, {
			duration: 1500,
			step: function() {
				var num = numberWithCommas(Math.floor(this.val));
				elCounter.innerText = num;
			},
			complete: function() {
				var num = numberWithCommas(Math.floor(this.val));
				elCounter.innerText = num;
			}
		});
	}
	function numberWithCommas(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
}

