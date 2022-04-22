$(function() {

  fn.horizonTable();
  fn.hrefReset();
  fn.tab();
  fn.popup();

});


const fn = {
  horizonTable : function() {
    var $tblName = $('.horizon_scrollbar');

    if(!!$tblName.length){
      $tblName.mCustomScrollbar({
        horizontalScroll:true,
        advanced:{
          autoScrollOnFocus:true,
          updateOnContentResize:true
        }
      });
    }
  },
  hrefReset : function() {
    $(document).on('click', 'a', function(e) {
      var $href = $(this).attr('href');
      if($href == "#" || $href == "#none") {
        e.preventDefault();
      }      
    });
  },
  accodian : function() {
    $(document).on('click', '.ui-acco-btn', function() {
        var $accoWrap = $(this).parents('.ui-acco-wrap');
        var $accoPanel = $(this).parent().next();
      
        if(!$accoWrap.hasClass('active')) {
            $accoWrap.addClass('active');    
            $accoPanel.slideDown(300);
            $accoPanel.attr('aria-hidden', false);
            $(this).attr('aria-expanded', true);

            if($(this).attr('href')) {
                $(this).attr('aria-expanded',false); 
                $accoWrap.removeClass('active');
            }
        } else{
            $accoWrap.removeClass('active');
            $accoPanel.slideUp(300);
            $accoPanel.attr('aria-hidden', true);
            $(this).attr('aria-expanded', false);
        }
    });
  },
  tab : function() {
    var $tabmenu = $('.ui-tab'),
        $selectItem = null;

    $tabmenu.each(function() {
        var $this = $(this),
            $menuItem = $this.find('> .ui-tab-btns').children(),
            $panelItem = $this.find('> .ui-tab-panels').children();

        $menuItem.on('click', function() {
            setSelectItem($(this), $panelItem);
         });
    });

    function setSelectItem($item, $pnl) {
        if($selectItem) {
            $selectItem.removeClass('selected').attr('aria-selected', false);
        }
        $selectItem = $item;
        $selectItem.addClass('selected').attr('aria-selected', true);

        $item.each(function() {
            var idx = $item.index();
            $pnl.eq(idx).attr('aria-hidden', false);
            $pnl.eq(idx).siblings().attr('aria-hidden', true);    
        });
    }
  },
  popup : function() {
      var $dialogBtn, 
          $dialog,
          $closeBtn, 
          btnName, 
          dialogName = null;

        function init() {
          $dialogBtn = $('[data-modal-btn]');
          $dialog = $('.dialog');
          $closeBtn = $('.dialog_close');
        }

        function event() {
          $dialogBtn.on('click', function() {   
            btnName = $(this).data('modalBtn');
            $dialog.data('modal', btnName);
         
            $(this).siblings().attr('tabindex', -1);
            $(this).removeAttr('tabindex'); 

            open(btnName, dialogName);   
          });

          $closeBtn.on('click', function() {
            
            close($(this));
          });
        };
        
        function open(target) {
          dialogName = $dialog.data('modal');
          $('[data-modal='+target+']').addClass('show');
          $('[data-modal='+target+']').focus();
        }

        function close(target) {
          target.closest($dialog).removeClass('show');
          $dialogBtn.removeAttr('tabindex');
        
            
        }
        init();
        event(); 
  }
}


// var target = document.querySelectorAll('.btn_open'); // 클릭할 버튼요소를 변수 처리

// // 팝업 열기
// for(var i = 0; i < target.length; i++){
//   target[i].addEventListener('click', function(){
//     targetID = this.getAttribute('href');
//     document.querySelector(targetID).style.display = 'block';
//   });
// }


// $.fn.uiPopup = function() {
// 	return this.each(function() { 

//   }
// }


// var Dialog ={
// 	focusClass:'dialog_focused',
// 	open:function(tar, callback){
// 		var $select_id = $(tar),
// 			$body = $('body'),
// 			$lastCloseBtn = '<a href="#" class="dialog_close last_focus" role="button"><span class="offscr">팝업창 닫기</span></a>';

// 		if($('body').hasScrollBar()){ //스크롤유무 체크
// 			Body.lock();
// 		}
			
// 		//원래 포커스에 클래스 부여
// 		var $focus = $(':focus');
// 		if($focus.length){
// 			$($focus).addClass(Dialog.focusClass);
// 		}		
		
// 		//팝업 마지막 포커스 버튼 적용
// 		// $select_id.find('.dialog_wrap').append($lastCloseBtn);

// 		//열기
// 		$select_id.attr({'aria-hidden':'false','tabindex':'0'}).fadeIn(100,function(){
// 			if(!!callback){
// 				callback();
// 			}
// 		}).addClass('n' + $('.dialog.show').length + ' show').focus();
// 		if (!!!isMobile) $select_id.css({ display:'flex' });

// 		$select_id.on('blur', function(){ $(this).removeAttr('tabindex'); });			
		
// 		if(!isMobile) {
// 			// Dialog.height($select_id);
// 			$select_id.find('.scrollbar').mCustomScrollbar({
// 				advanced:{
// 					autoScrollOnFocus:true,
// 					updateOnContentResize:true
// 				}
// 			});
// 		} 
// 		else {
// 			// $select_id.find('.dialog_content').scrollTop(0,0);
// 			var $height = $(tar).height(),
// 				$head = $(tar).find('.dialog_header').height(),
// 				$content = $(tar).find('.dialog_content');

// 			// if(!$(tar).hasClass('full'))$content.css('max-height',$height);
// 			if($(tar).hasClass('bottom')) {
// 				$content.css('max-height',$height - $head - 80);
// 			}
			
// 			// top button
// 			topButton(tar);
// 		}
		
// 		//팝업 안에서만 포커스 이동
// 		Dialog.focusMove(tar);

// 		// 가로스크롤바
// 		xScrInfo();
// 	}
// }

// fn.tooltip();
// fn.popup();
// fn.tabMenuActive();
// fn.thisFn();
// fn.selfService();
// fn.driveCheckBoxRadio();
// fn.descriptionShow();
// fn.paymenBranch()
// fn.designCheckBox()
// fn.personalInfo()
// fn.agreeBtnActive();
// fn.subMenuTab()
// fn.mobileHidingButton();
// fn.emailFn()

// var fn = {
//     tooltip : function() {
//         var btnOpen = null;
//         var btnClose = null;

//         function init() {
//             btnOpen = document.querySelectorAll('.popup__btn');
//             btnClose = document.querySelectorAll('.popup__close');
//         }

//         function event() {
//             btnOpen.length > 0 ? openFn(btnOpen) : '열수있는 툴팁이 존재하지않습니다.';
//             btnClose.length > 0 ? CloseFn(btnClose) : '닫을 수 있는 툴팁이 존재하지않습니다.';
//             function openFn(btn) {
//                 for(var i = 0; i < btn.length; i++){
//                     btn[i].addEventListener('click', function(e){
//                         e.preventDefault();
//                         var target = document.getElementById(this.getAttribute('data-popup-id'));
//                         var bool = !!target ;
//                         if(bool) target.setAttribute('data-on','active');
//                     });
//                 }
//             }
//             function CloseFn(btn) {
//                 for(var i = 0; i < btn.length; i++){
//                     btn[i].addEventListener('click', function(e){
//                         var target = document.getElementById(this.getAttribute('data-popup-id'));
//                         var bool = !!target
//                         e.preventDefault();
//                         if(bool) target.setAttribute('data-on','')
//                     });
//                 }
//             }
//         }
//         init(btnOpen, btnClose);
//         event();
//     },
//     popup : function() {
//         var btnOpen = null;
//         var btnClose = null;
        
//         function init() {
//             btnOpen = document.querySelectorAll('.openBtn');
//             btnClose = document.querySelectorAll('.closeBtn');
//         }
        
//         function event() {
//             btnOpen.length > 0 ? openFn(btnOpen) : '열수있는 툴팁이 존재하지않습니다.';
//             btnClose.length > 0 ? CloseFn(btnClose) : '닫을 수 있는 툴팁이 존재하지않습니다.';
//             function openFn(btn){
//                 // 팝업 인터렉션 들어올시 수정해야될부분
//                 for(var i = 0; i < btn.length; i++){
//                     btn[i].addEventListener('click', function(e){
//                         var target = document.getElementById(this.getAttribute('data-popup-id'));
//                         var bool = !!target
//                         e.preventDefault();
//                         bool ? target.setAttribute('data-on','active') : console.log(target, "target이 존재하지않습니다.");
//                     });
//                 }
//             }
//             function CloseFn(btn){
//                 // 팝업 인터렉션 들어올시 수정해야될부분
//                 for(var i = 0; i < btn.length; i++){
//                     btn[i].addEventListener('click', function(e){
//                         var target = document.getElementById(this.getAttribute('data-popup-id'));
//                         var bool = !!target
//                         e.preventDefault();
//                         bool ? target.setAttribute('data-on','') : console.log(target, "target이 존재하지않습니다.");
//                     });
//                 }
//             }
//         }
//         init();
//         event();
//     },
//     tabMenuActive :function() {
//         var target = null;
//         var targetArry = null;
//         var targetParents = null;
//         var targetParentSibling = null;
//         function init() {
//             targetParents =  document.querySelectorAll('.subMenu__active');
//             targetArry = [];
//         }
//         function event() {
//             for (var i = 0; i < targetParents.length; i++) {
//                 var tem = targetParents[i].children
//                 for (var j = 0; j < tem.length; j++) targetArry.push(tem[j]);
//                 clickEvent(targetArry);
//             }
//             function clickEvent(targetArry){
//                 for (var i = 0; i < targetArry.length; i++) {
//                     target = targetArry[i].children[0];
//                     target.addEventListener('click', function(e){
//                         e.preventDefault();
//                         targetParentSibling = this.parentNode.parentNode.children
//                         for (var j = 0; j < targetParentSibling.length; j++) {
//                             targetParentSibling[j].classList.toggle('active');
//                             targetParentSibling[j].setAttribute('data-on','');
//                             this.parentNode.setAttribute('data-on','active');
//                         }
//                     });
//                 }
//             }
//         }
//         init();
//         event();

//     },
//     thisFn : function(){
//         var target = null;
//         var targetArry = null;

//         function init() {
//             targetArry = document.querySelectorAll('.this__action');
//             target = document.querySelector('.this__action');
//         }
//         function event() {
//             !!target ? clickFn() : '';
//             function clickFn() {
//                 for (var i = 0; i < targetArry.length; i++) {
//                     targetArry[i].addEventListener('click', function(){
//                         // 속상값이 변경될 수 있는 형태이면 수정해야되는 영역입니다.
//                         this.setAttribute('data-on', 'active');
//                     });
//                 }
//             }
//         }
//         init();
//         event();
//     },
//     selfService : function(){
//         var target = null;
//         var targetValue = null;
//         var targetArry = null;
//         var targetParent = null;

//         function init() {
//             targetArry = document.querySelectorAll('.selfService__select');
//         }
//         function event() {
//             for (let i = 0; i < targetArry.length; i++) {
//                 target = targetArry[i];
//                 // 셀프입력 셀렉트 박스 값이 변경시 작동합니다.
//                 target.addEventListener('change', function(e){
//                     targetValue = e.target.value;
//                     targetValue == '9999' ? this.nextElementSibling.setAttribute('data-on', 'on') : this.nextElementSibling.setAttribute('data-on', 'off');
//                 });
                
//             }
//         }
//         init();
//         event();
//     },
//     // 운전차량선택
//     driveCheckBoxRadio : function(){
//         var btn = null;
//         var btnArray = null;
//         var bool = null;
//         var target = null;

//         function init() {
//             btnArray = document.querySelectorAll('.driveCheckBoxRadio');
//             bool = !!(document.querySelector('.driveCheckBoxRadio'));
//         }
//         function event() {
//             if(bool) {
//                 for (let i = 0; i < btnArray.length; i++) {
//                     btn = btnArray[i];
//                     target = document.getElementById(btn.getAttribute('data-popup-id'))
//                     btn.addEventListener('change', function(e){
//                         e.target.value == '1' ? target.setAttribute('data-on','active') : target.setAttribute('data-on','')
//                     })
                
//                 }
//             }
//         }
//         init();
//         event();
//     },
//     // 약관
//     descriptionShow : function(){
//         var btn = null;
//         var btnArray = null;
//         var bool = null;
//         var target = null;

//         function init() {
//             btnArray = document.querySelectorAll('.description__prev');
//             bool = !!(document.querySelector('.description__prev'));
//         }
//         function event() {
//             if(bool) {
//                 for (let i = 0; i < btnArray.length; i++) {
//                     btn = btnArray[i];
//                     target = btn.nextElementSibling
//                     btn.addEventListener('change', function(e){
//                         e.target.value == '1' ? target.setAttribute('data-on','active') : target.setAttribute('data-on','')
//                     });
//                 }
//             }
//         }
//         init();
//         event();
//     },
//     // 카드결제 분기 - 은행결제 분기
//     paymenBranch : function(){
//         var btnBox = null;
//         var btnArray = null;
//         var bool = null;
//         var btnValue = null;
//         var target = null;

//         function init() {
//             btnArray = document.querySelectorAll('.paymenBranch');
//             bool = !!(document.querySelector('.paymenBranch'));
//         }
//         function event() {
//             if(bool) {
//                 for (let i = 0; i < btnArray.length; i++) {
//                     btnBox = btnArray[i];
//                     btnBox.addEventListener('change', function(e){
//                         btnValue= e.target.value
//                         if(btnValue == '1') {
//                             document.querySelector('.point--gray.card').setAttribute('data-on','active');
//                             document.querySelector('.point--gray.bank').setAttribute('data-on','');
//                             document.getElementById('creditBox01').setAttribute('data-on','active');
//                             document.getElementById('creditBox02').setAttribute('data-on','');
//                             document.getElementById('creditBox03').setAttribute('data-on','');
//                         } else {
//                             document.querySelector('.point--gray.card').setAttribute('data-on','')
//                             document.querySelector('.point--gray.bank').setAttribute('data-on','active');
//                             document.getElementById('creditBox01').setAttribute('data-on','');
//                             document.getElementById('creditBox02').setAttribute('data-on','active');
//                             document.getElementById('creditBox03').setAttribute('data-on','active');
//                         }
//                     });
//                 }
//             }
//         }
//         init();
//         event();
//     },
//     // 국적
//     designCheckBox : function(){
//         var btnBox = null;
//         var btnArray = null;
//         var bool = null;
//         var btnValue = null;
//         var target = null;

//         function init() {
//             btnArray = document.querySelectorAll('.designCheckBox');
//             bool = !!(document.querySelector('.designCheckBox'));
//         }
//         function event() {
//             if(bool) {
//                 for (let i = 0; i < btnArray.length; i++) {
//                     btnBox = btnArray[i];
//                     btnBox.addEventListener('change', function(e){
//                         btnValue= e.target.value;
//                         target = this.parentNode.querySelector('.nationality__select');
//                         btnValue == '1' ? target.setAttribute('data-on','active') : target.setAttribute('data-on','')
//                     })
//                 }
//             }
//         }
//         init();
//         event();
//     },
//     // 모바일 약관
//     personalInfo : function() {
//         var btnArray = null;
//         var btnBox = null;
//         var bool = false;
//         var bool02 = false;
//         var target = null;
        
//         function init() {
//             btnArray = document.querySelectorAll('.personalInfo__button');
//             bool = !!(document.querySelector('.personalInfo__button'));
//         }
        
//         function event() {
//             if(bool) {
//                 for (let i = 0; i < btnArray.length; i++) {
//                     btnBox = btnArray[i];
//                     btnBox.addEventListener('change', function(){
//                         bool02 = this.querySelector('input[type="checkbox"]').checked;
//                         target = this.nextElementSibling
//                         if(bool02) {
//                             target.setAttribute('data-on','active');
//                             this.setAttribute('data-on','active');
//                         } else {
//                             target.setAttribute('data-on','');
//                             this.setAttribute('data-on','');
//                         }
//                     });
//                 }
//             }
//         }
//         init();
//         event();
//     },
//     agreeBtnActive : function() {
//         var btn = null;
//         var btns = null;
//         var target = null;
//         var box = null;
//         function init() {
//             btn = document.querySelectorAll('.agreeBtn');
//         }
//         function event() {
//             for (let i = 0; i < btn.length; i++) {
//                 btns = btn[i];
//                 btns.addEventListener('click', function(){
//                     target = this.parentNode.nextElementSibling;
//                     box = document.querySelectorAll('.agreeBox');
//                     this.classList.toggle('active');
//                     if(box.length > 0) {
//                         if(this.classList.contains('active')) {
//                             target.setAttribute('data-on','active');
//                         } else {
//                             target.setAttribute('data-on','');
//                         }
//                     }
//                 });
//             }
//         }
//         init();
//         event();
//     },
//     subMenuTab : function() {
//         var bool = false;
//         var btn = null;
//         var btnArray = null;
//         var targetBox = null;
//         var lengthText = null;

//         function init() {
//             targetBox = document.getElementById('tabArray');
//             bool = !!targetBox;
//             btnArray = document.querySelectorAll('.travelButton__button ');
//         }
//         function event() {
//             if (bool) {
//                 for (let i = 0; i < btnArray.length; i++) {
//                     btn = btnArray[i];
//                     lengthText = [i];
//                     btn.addEventListener('click', function() {
//                         lengthText = Array.from(this.parentNode.parentNode.children).indexOf(this.parentNode);
//                         for (let j = 0; j < targetBox.children.length; j++) {
//                             targetBox.children[j].setAttribute('data-on','');
//                             j == lengthText ?  targetBox.children[j].setAttribute('data-on','active') : '' ;
//                         }
//                     });
//                 }
//             }
//         }

//         init();
//         event();
//     },
//     mobileHidingButton : function() {
//         var bool = false;
//         var btnArray = null;
//         function init() {
//             btnArray = document.querySelectorAll('.mobileHidingButton')
//             bool = !!document.querySelector('.mobileHidingButton')
//         }
//         function event(){
//             if(bool) {
//                 for (let i = 0; i < btnArray.length; i++) {
//                     btnBox = btnArray[i];
//                     btnBox.addEventListener('change', function(e){
//                         e.target.value == '1' ? this.nextElementSibling.setAttribute('data-on','on') : this.nextElementSibling.setAttribute('data-on','')
//                     });
//                 }
//             }
//         }
//         init();
//         event();
//     }, 
//     emailFn : function() {
//         var bool = false;
//         var target = false;
//         var targetParent = null;
//         var inputBox = null;

//         function init() {
//             bool = !!document.querySelector('.emailAddressFn');
//             targetParent = document.querySelectorAll('.emailAddressFn');
//             bool ? event() : '' ;
//         }
//         function event(){
//             for (let i = 0; i < targetParent.length; i++) {
//                 target = targetParent[i];
//                 target.querySelector('select').style.color = '#757575';
//                 // placeholder 역활 / :invalid :required 작동 불가 찾기.
//                 target.querySelector('select').addEventListener('change', function(e) {
//                     target.querySelector('select').style.color = '#111';
//                     // placeholder 역활 제거 
//                     inputBox = e.target.previousElementSibling
//                     inputBox.disabled = true;
//                     inputBox.setAttribute('data-button', 'on');
//                     e.target.setAttribute('data-on', '');
//                     if(e.target.value == ' ') {
//                         inputBox.value = '';
//                         inputBox.setAttribute('placeholder', e.target.options[e.target.selectedIndex].text);
//                         inputBox.disabled = false;
//                         inputBox.setAttribute('data-button', '');
//                         e.target.setAttribute('data-on', 'active');
//                     }
//                 })
//             }
//         }
//         init();
//     }
// }
// var commonFn = {
//     classAdd : function (targrt) {
//         !commonFn.hasClass(targrt, 'active') ? targrt.setAttribute('class','active') : '';
//     }, 
//     hasClass : function (element, className) {
//         if (!!element) {
//             return (' ' + element.className + ' ').indexOf(' ' + className+ ' ') > -1;
//         } else {
//             return false
//         }
//     }
// }



// $(".set > a").on("click", function() {
//     if ($(this).hasClass("active")) {
//       $(this).removeClass("active");
//       $(this).siblings(".content").slideUp(200);
//       $(".set > a i").removeClass("fa-minus").addClass("fa-plus");
//     } else {
//       $(".set > a i").removeClass("fa-minus").addClass("fa-plus");
//       $(this).find("i").removeClass("fa-plus").addClass("fa-minus");
//       $(".set > a").removeClass("active");
//       $(this).addClass("active");
//       $(".content").slideUp(200);
//       $(this).siblings(".content").slideDown(200);
//     }
//   });


// easing
// !function(n){"function"==typeof define&&define.amd?define(["jquery"],function(e){return n(e)}):"object"==typeof module&&"object"==typeof module.exports?module.exports=n(require("jquery")):n(jQuery)}(function(n){function e(n){var e=7.5625,t=2.75;return n<1/t?e*n*n:n<2/t?e*(n-=1.5/t)*n+.75:n<2.5/t?e*(n-=2.25/t)*n+.9375:e*(n-=2.625/t)*n+.984375}void 0!==n.easing&&(n.easing.jswing=n.easing.swing);var t=Math.pow,u=Math.sqrt,r=Math.sin,i=Math.cos,a=Math.PI,o=1.70158,c=1.525*o,s=2*a/3,f=2*a/4.5;return n.extend(n.easing,{def:"easeOutQuad",swing:function(e){return n.easing[n.easing.def](e)},easeInQuad:function(n){return n*n},easeOutQuad:function(n){return 1-(1-n)*(1-n)},easeInOutQuad:function(n){return n<.5?2*n*n:1-t(-2*n+2,2)/2},easeInCubic:function(n){return n*n*n},easeOutCubic:function(n){return 1-t(1-n,3)},easeInOutCubic:function(n){return n<.5?4*n*n*n:1-t(-2*n+2,3)/2},easeInQuart:function(n){return n*n*n*n},easeOutQuart:function(n){return 1-t(1-n,4)},easeInOutQuart:function(n){return n<.5?8*n*n*n*n:1-t(-2*n+2,4)/2},easeInQuint:function(n){return n*n*n*n*n},easeOutQuint:function(n){return 1-t(1-n,5)},easeInOutQuint:function(n){return n<.5?16*n*n*n*n*n:1-t(-2*n+2,5)/2},easeInSine:function(n){return 1-i(n*a/2)},easeOutSine:function(n){return r(n*a/2)},easeInOutSine:function(n){return-(i(a*n)-1)/2},easeInExpo:function(n){return 0===n?0:t(2,10*n-10)},easeOutExpo:function(n){return 1===n?1:1-t(2,-10*n)},easeInOutExpo:function(n){return 0===n?0:1===n?1:n<.5?t(2,20*n-10)/2:(2-t(2,-20*n+10))/2},easeInCirc:function(n){return 1-u(1-t(n,2))},easeOutCirc:function(n){return u(1-t(n-1,2))},easeInOutCirc:function(n){return n<.5?(1-u(1-t(2*n,2)))/2:(u(1-t(-2*n+2,2))+1)/2},easeInElastic:function(n){return 0===n?0:1===n?1:-t(2,10*n-10)*r((10*n-10.75)*s)},easeOutElastic:function(n){return 0===n?0:1===n?1:t(2,-10*n)*r((10*n-.75)*s)+1},easeInOutElastic:function(n){return 0===n?0:1===n?1:n<.5?-t(2,20*n-10)*r((20*n-11.125)*f)/2:t(2,-20*n+10)*r((20*n-11.125)*f)/2+1},easeInBack:function(n){return 2.70158*n*n*n-o*n*n},easeOutBack:function(n){return 1+2.70158*t(n-1,3)+o*t(n-1,2)},easeInOutBack:function(n){return n<.5?t(2*n,2)*(7.189819*n-c)/2:(t(2*n-2,2)*((c+1)*(2*n-2)+c)+2)/2},easeInBounce:function(n){return 1-e(1-n)},easeOutBounce:e,easeInOutBounce:function(n){return n<.5?(1-e(1-2*n))/2:(1+e(2*n-1))/2}}),n});