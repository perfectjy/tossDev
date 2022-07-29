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

  if(isMobile) {   
    // mobile title set
    mbCommon.setHeader();
    mbCommon.init();

    // 대상 고정
    $('[data-fixed-target=tabBox]').fixedTarget('.headerMob');
    
  } else {
    GnbNav.init();
    // pc web breadcrumb top fix
    $.fn.breadcrumbsFixed();
  }

  // roll links
  rollLinksUI();

  // scroll 시 rolllinks 활성화
  setTimeout(function() {
    $('.rollLinks').scrollActive();
  },300)

  
});



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

var mbHeader = { title: '', prev: true, menu: true };
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
      } else {
        $('.headerMob .gnbNice').remove();        
      }

      $('.headerMob .gnbTitle').text(mbHeader.title);
      
    }
  },
  gnbSubOpenTxt:'하위메뉴 펼치기',
	gnbSubCloseTxt:'하위메뉴 접기',
  gnbBgClass:'.mbGnbBg',
	gnbBg:'<div class="mbGnbBg" aria-hidden="true"></div>',
  gnbOutCont:'#skipNavi,#header h1,.btn_back,#container,#floatingNavi,#footer',
  gnb: function() {
    $('.mbGnbMenu').attr('aria-hidden',true);

    $(document).on('click','.btnGnb',function(e){
			e.preventDefault();
			if($('.mbGnbMenu').hasClass('show')){
				mbCommon.gnbClose();
			}else{
				mbCommon.gnbOpen();
			}
		});
		$(document).on('click','.btnGnbClose',function(e){
			e.preventDefault();
			mbCommon.gnbClose();
		});
    $(document).on('click','.mbMenuList a.inSub',function(e){
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
		},610);
  },
  fixed: function(target) {
    var $target = $(target),
			isHeader = false;
		if($target.attr('id') == 'header') isHeader = true;

		$(window).on('scroll',function(){
			var $scrollTop = $(this).scrollTop();
			$target.each(function(){
				if($(this).hasClass('noFixed') || $(this).closest('.modal').length) return;
				var $top = $(this).offset().top;
				if($scrollTop > $top){
					if(!$(this).hasClass('fixed')){
						$(this).addClass('fixed');
					}
				}else{
					$(this).removeClass('fixed');
				}
			})
		});
  },
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
          $(target).next().stop(true,false).slideUp($slideSpeed,function(){
            mbCommon.gnbActiveIng = false;
          });
				}else{
					if($parent.find('.active').length){
						$parent.find('.active').addClass('open').children('div').show().siblings('.inSub').attr('title',mbCommon.gnbSubCloseTxt);
					}
					$parent.addClass('open').find('.inSub').attr('title',mbCommon.gnbSubCloseTxt);
					$parent.siblings().removeClass('open').find('.open').removeClass('open');
					$isScroll = true;
					$parent.siblings().children('div').stop(true,false).slideUp($slideSpeed,function(){
						$(this).removeAttr('style').find('.mbGnbDep').removeAttr('style');
					}).siblings('.inSub').attr('title',mbCommon.gnbSubOpenTxt);
					$(target).next().stop(true,false).slideDown($slideSpeed,function(){
						mbCommon.gnbActiveIng = false;
					});
				}
			}
		}else{
			//뎁스1
			if($parent.find('.active').length){
				$parent.find('.active').addClass('open').children('div').show();
			}else{
				$parent.find('.gnb_dep2>ul>li').first().addClass('open').children('div').show();
			}
			$parent.addClass('open').children('a').attr('title','현재선택');
			$parent.siblings().removeClass('open').children('a').removeAttr('title').siblings('div').removeAttr('style').find('.open').removeClass('open').children('div').removeAttr('style');
			$isScroll = true;
			common.gnbInScroll(target);
		}
	}
}

var GnbNav = {
  bg: $('.gnb_bg'),
  menuSpeed: 200,
  bgSpeed: 200,
  // barSpeed: 200,
  openTimeout: '',
  closeTimeout: '',  
  //서브 열림
  open : function(target,time){
    clearTimeout(GnbNav.closeTimeout);
    var openInit = function(){
      var $subMenu = $(target).find('.subMenu'), $subMenuHeight = $subMenu.outerHeight();
      $(target).children('a').attr('aria-expanded','true').closest('li').siblings().find('a').attr('aria-expanded','false');
      // $(target).find('.cell').css({'height':$subMenuHeight-80});
      $('.gnbBg').css({'height':$subMenuHeight}).closest('#header').addClass('show');
      $(target).siblings().find('.subMenu').removeAttr('style').removeClass('active');
      setTimeout(function(){
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
    var closeInit = function(){
      $('.gnb>ul>li').children('a').attr('aria-expanded','false');
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
	var $window = $(window), $wrap = $('#wrap'), $header = $('#header');
	$window.on('scroll', function() {
		var scrollPos = $(this).scrollTop(), headerHeight = $header.outerHeight();
		if(!$('html.lock').length){
			if (headerHeight < scrollPos) {
				$wrap.addClass('fixed')
			} else {
				$wrap.removeClass('fixed');
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
	openModal:function(tar,callback){
		var $select_id = $(tar),
			$body = $('body'),
			$lastCloseBtn = '<a href="#" class="dialog_close last_focus" role="button"><span class="hidden">팝업창 닫기</span></a>';
			
      Body.lock();

		//원래 포커스에 클래스 부여
		var $focus = $(':focus');
    if ($focus.length) {
      $($focus).addClass(modal.focusClass + $('.uiModal.active').length);
    }
    	
		//팝업 마지막 포커스 버튼 적용
		$select_id.find('.modalWrap').append($lastCloseBtn);
    var $bottom =  $select_id.find('.modalBottom');

    if (!isMobile && $select_id.hasClass('full')) {
      if ($bottom.length > 0) {
        if ($(tar).height() > 720) {
          var $conHeight = 720 - $('.modalHeader').outerHeight() - $bottom.height() - 40; 
        }        
        $select_id.find('.inner').css('max-height', $conHeight);
      }
    }

		//열기
		$select_id.attr({'aria-hidden':'false','tabindex':'0'}).fadeIn(100,function(){
			if(!!callback){
				callback();
			}
		}).addClass('active').focus();
		$select_id.on('blur', function(){ $(this).removeAttr('tabindex'); });

    var zIndex = 300 + 10 * $('.uiModal.active').length;
    $select_id.css('z-index', zIndex);
    
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
    // if ($focusLength) {
      $('.' + modal.focusClass + $focusLength).focus();
      setTimeout(function () {
          $('.' + modal.focusClass + $focusLength).removeClass(modal.focusClass + $focusLength);
      }, 50);
    // }    
    $(tar).find('.last_focus').remove();
    $(tar).attr({ 'aria-hidden': 'true', 'tabindex': '-1' });
    $(tar).removeClass('active').removeAttr('style').fadeOut(300);;
      
  },
  init:function(){
		$('.uiModal').attr({'aria-hidden':'true','aria-live':'polit','tabindex':-1});
		//열기
		$(document).on('click','.modalOpen',function(e){
			e.preventDefault();
			var $pop = $(this).attr('href');
			modal.openModal($pop);
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
        checkAllFn: function(v) {
          var o = this,
            $t = $(v),
            $boolean = $t.is(':checked');

          // sData 적용
          o.sData.list.forEach(function(obj, index) {
            obj.item = $boolean;

            if(obj.sub !== undefined) {
              obj.sub.forEach(function(objSub) {
                objSub.item = $boolean;
              });
            };
          });
          
          if($boolean) {
            o.sData.count = o.len;
          } else {
            o.sData.count = 0;
          }
          o.sData.all = $boolean;
          o.gChkListItemObj.prop('checked', $boolean);
          o.gChkListSubObj.prop('checked', $boolean);
          // console.log('전체 카운트 : ' + o.sData.count)
          console.log(o.sData);
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
          // console.log(o.sData);

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
  var $target = $('.infoToggle')
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
  });

}

var rollTabUI = function(){
	var $target = $('.rollTab'),
    $parent = $target.find('li'),
    $links = $parent.find('a'),
    $onText = '현재선택';

  $links.attr('aria-selected',false);
  $parent.each(function() {
    if($(this).hasClass('active')) {
      $(this).find('a').attr({
        'title': $onText,
        'aria-selected': true
      })
    }
  });

	// $(document).on('click','.rollTab a',function(e){
	// 	e.preventDefault();
	// 	var $this = $(this),
	// 		// $idx = $this.closest('li').index(),
	// 		$closest = $this.closest('.rollTab'),
	// 		$isFirst = $closest.data('isFirst'),
	// 		$href = $this.attr('href'),
	// 		$target = $closest.data('target');   

  //   if($isFirst == true){
  //     $closest.data('isFirst', false) ;
  //   }

  //   if($target == undefined){
  //     $($href).addClass('active').attr('aria-expanded',true).siblings('.tab_panel').attr('aria-expanded',false).removeClass('active');;
  //   }else{
  //     $($target).attr('aria-expanded',false).removeClass('active');
  //     $($href).addClass('active').attr('aria-expanded',true);
  //   }
  //   $this.attr('title',$onText).parent().addClass('active').siblings().removeClass('active').find('a').removeAttr('title');
  //   $this.attr('aria-selected',true).closest('li').siblings().find('[role=tab]').attr('aria-selected',false);

	// });

	// // var $hash = location.hash;
	// if($tab.length){
	// 	$tab.each(function(e){
	// 		$(this).find('ul').attr('role','tablist');
	// 		var isHash =false;
	// 		var tarAry = [];
	// 		var isHashClk = '';
	// 		$(this).find('li').each(function(f){
	// 			$(this).attr('role','presentation');
	// 			var _a = $(this).find('a'),
	// 				_aId = _a.attr('id'),
	// 				_href = _a.attr('href'),
  //         _active = _a.attr('class');
	// 			if(!_aId) _aId = 'tab_btn_'+e+'_'+f;
	// 			tarAry.push(_href);
	// 			_a.attr({
	// 				'id' :_aId,
	// 				'role' :'tab',
	// 				'aria-controls': _href.substring(1),
	// 				'aria-selected':'false'
	// 			});
	// 			$(_href).attr({
	// 				'role':'tabpanel',
	// 				'aria-labelledby':_aId,
	// 				'aria-expanded':'false'
	// 			});
	// 		});
	// 		$(this).data('target',tarAry.join(','));
	// 		if(isHash == false){
	// 			$(this).data('isFirst',true);
	// 			$(this).find('li').eq(0).find('a').trigger('click');
	// 		}
	// 		if(isHash == true){
	// 			isHashClk.trigger('click');
	// 		}
	// 	});
	// }

  $(document).on('click','.rollTab a',function(e){
    e.preventDefault();
    var $this = $(this),
      $closest = $this.closest('.rollTab'),
      $href = $this.attr('href');
    
      $parent.removeClass('active');
      $links.attr('aria-selected',false).removeAttr('title');
      $this.attr({
        'title': $onText,
        'aria-selected': true
      }).parent().addClass('active');
    
  });

  if(isMobile) {
    if($('.tabmenu').length){
      $(document).on('click','.tabmenu.rollTab a',function(e){
        e.preventDefault();
        scrollUI.center($(this).parent());
      });
  
      $('.tabmenu').each(function(){
        var $active = $(this).find('.active');
        scrollUI.center($active);
      });
    }
  }	
};

var scrollUI = {
	center: function(el){
    console.log(el)
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
      whiteSpace = 20; // 모바일에서 툴팁의 좌우 여백

    $t.on('click', function() {
        
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
$.fn.fixedTarget = function(exc) {
  return this.each(function() {
    var $win = $(window),
      $wT = $win.scrollTop(),
      $wH = $win.height(),
      $t = $(this),
      $tW = $(this).innerWidth(),
      $tH = $t.innerHeight(),
      $tMB = parseInt($t.css('margin-bottom')),
      $space = $tH + $tMB,
      $top = $t.positionInfo(),
      $sT,
      $excH = $(exc).innerHeight();

    $t.before('<div style="display:none; height:'+$tH+'px; margin-bottom:'+$tMB+'px;">');
    $win.on('scroll.fixedTarget', function() {
      $sT = $win.scrollTop();
      // console.log($sT, $top, $excH, $space)
      if($sT + $excH >= $top) {
        $t.css({'position': 'fixed', top: $excH, 'z-index': 10, 'width': $tW + 'px'});
        $t.prev().show();
      } else {
        $t.css({'position': 'static', top: 'auto'});
        $t.prev().hide();
      }
    });
  });
}

// page scroll
var pageScroll = function(v,exc) {
  var $win = $(window),
    str = v.split('#')[1],
    $top = $(v).positionInfo(),
    $excH = 0;
  
  exc.forEach(function(obj, index) {
    $excH += $(obj).innerHeight();
  });

  // .innerHeight()
  $('html, body').animate({
    scrollTop: $top - $excH - 20
  }, 300);
}

// roll links
var rollLinksUI = function(){
  var $target = $('.rollLinks'),
    $parent = $target.find('li'),
    $links = $parent.find('a'),
    $onText = '현재선택';

  $links.attr('aria-selected',false);
  $parent.each(function() {
    if($(this).hasClass('active')) {
      $(this).find('a').attr({
        'title': $onText,
        'aria-selected': true
      })
    }
  });

  $(document).on('click','.rollLinks a',function(e){
    e.preventDefault();
    var $this = $(this),
      $closest = $this.closest('.rollTab'),
      $href = $this.attr('href');
    
    // $parent.removeClass('active');
    // $links.attr('aria-selected',false).removeAttr('title');
    // $this.attr({
    // 	'title': $onText,
    // 	'aria-selected': true
    // }).parent().addClass('active');

    // 링크 클릭 시 페이지 스크롤
    if(isMobile) {
      pageScroll($this.attr('href'),['.headerMob', '.tabBox']);
    }
  });

  if(isMobile) {
    if($target.length){
      $(document).on('click','.rollLinks a',function(e){
        e.preventDefault();
        scrollUI.center($(this).parent());
      });

      $('.tablinks').each(function(i){
        if($(this).find('.active').length) {
          var $active = $(this).find('.active');
          scrollUI.center($active);
        }
      });
    }
  }	
};

// scroll active
$.fn.scrollActive = function() {
  return this.each(function() {
    var $win = $(window),
      $t = $(this),
      $classTarget = $t.find('li'),
      scrollTarget = [],
      scrollTargetTop = [],
      $onText = '현재선택';

    $t.find('a').each(function() {
      scrollTarget.push($(this).attr('href'))
      // scrollTargetTop.push($($(this).attr('href')).positionInfo());
    });

    scrollTarget.forEach(function(obj, index) {
      scrollTargetTop.push($(scrollTarget[index]).positionInfo());
    });
    // console.log(scrollTarget)
    // console.log(scrollTargetTop)


    $win.on('scroll.scrollActive', function() {
      $sT = $win.scrollTop();
      
      setTimeout(function() {
        scrollTargetTop.forEach(function(obj, index) {
          // console.log($sT)
          if($sT + $($(scrollTarget)[index]).innerHeight()  >= obj) {
            $($classTarget).removeClass('active').find('a').attr('aria-selected',false).removeAttr('title');
            $($classTarget[index]).addClass('active').find('a').attr({
              'title': $onText,
              'aria-selected': true
            });
          } else {
            $($classTarget[index]).removeClass('active').find('a').attr('aria-selected',false).removeAttr('title');
          }
        });
      },300);
    });
  });
}

var range = function(){
	if($('.range_amount').length){
		$('.range_amount').each(function(){
			var $slider = $(this).find('.slider'),
				$inp = $(this).find('input[type=text]'),
				$unit = $slider.data('unit'),
				$list = $(this).find('.list'),
				$scope = $(this).find('.scope'),
				$min = parseInt($slider.data('min')),
				$max = parseInt($slider.data('max')),
				$val = parseInt($slider.data('value')),
				$step = parseInt($slider.data('step')),
				$dot = $slider.data('dot');
	
			if(!$min)$min = 0;
			if(!$max)$max = 5;
			if(!$step)$step = 1;
			if(!$val)$val = $min;
			$inp.attr('value', $val);

			if (!!$dot) {
				var dispVal;
				dispVal = $val/10 + '';
				dispVal = dispVal.indexOf('.') > 0 ? dispVal : dispVal + '.0';
				$inp.attr('value', dispVal);
			}

			if($list.length){
				$list.empty();
				$list.append('<ul></ul>');
				for(var i = $min;i <= ($max/$step);i++){
					$list.find('ul').append('<li><a href="#" role="button">'+i*$step+'<span class="offscr">'+$unit+'</span></a></li>');
				}
			}	
			
			// if($scope.length) {
			// 	$scope.find('.start').text($min);
			// 	$scope.find('.end').text('최대 ' + $max);
			// }
			
			var range = $slider.slider({
				min:$min,
				max:$max,
				value:$val,
				step:$step,
				range:'min',
				slide: function(e, ui) {
					var val;
					if (!!$dot) {
						val = ui.value/10 + '';
						val = val.indexOf('.') < 0 ? val + '.0' : val;
					} else {
						val = ui.value;
					}

					$inp.val(val);
				},
				create:function(e){
					$slider.find('.ui-slider-handle').html('<span class="offscr">선택한 값은</span><i>'+$val+'</i><span class="offscr">'+$unit+'입니다.</span>');
					if($list.length)$list.find('li').eq($val/$step).addClass('on').find('a').attr('title','현재선택');
				},
				stop:function(event,ui){
					$(ui.handle).find('i').html(ui.value);
					// $inp.val(ui.value);
					$inp.attr('value', ui.value);
					$slider.data('value',ui.value);
					if($list.length) {
						$list.find('li').eq(ui.value/$step).siblings().removeClass('on').removeAttr('title');
						$list.find('li').eq(ui.value/$step).addClass('on').find('a').attr('title','현재선택');
					}
				}
			});

			$inp.on("keyup", function(e) {
				var inpVal;

				// 소수점일 경우, 숫자 키와 소수점 키만 눌렀을 때
				if (!!$dot) {
					if (
						(e.keyCode > 95 && e.keyCode < 106) || e.keyCode === 110
						|| (e.keyCode > 47 && e.keyCode < 58) || e.keyCode === 190
						|| e.keyCode === 46 || e.keyCode === 8		// delete or backspace
					) {
						inpVal = Number(this.value).toFixed(1) * 10 + '';
					}
				} else {
					inpVal = this.value;
				}

				$slider.slider('value', inpVal);
				$(this).attr('value', inpVal);
				$slider.find('.ui-slider-handle').html('<span class="offscr">선택한 값은</span><i>'+inpVal+'</i><span class="offscr">'+$unit+'입니다.</span>');
				if($list.length) {
					$list.find('li').eq(inpVal/$step).siblings().removeClass('on').removeAttr('title');
					$list.find('li').eq(inpVal/$step).addClass('on').find('a').attr('title','현재선택');
				}
			})

			$list.find('a').click(function(e){
				e.preventDefault();
				var $txt = parseInt($(this).text());
				range.slider('value',$txt);
				$slider.find('.ui-slider-handle i').text($txt);
				$inp.attr('value', $txt);
				$(this).parent().addClass('on').attr('title','현재선택').siblings().removeClass('on').removeAttr('title');
			});
		});
	}
}
