;(function(win, doc, undefined) {

	'use strict';	
	
	var $WIN = $(window);		
	var $DOC = $(document);	
	//var pageInfo = { title: '', prev: true, menu: true, login: false, main:false };
	
	var Body = {
		scrollTop :'',
		lock: function(){
			if ($('html').is(".lock")) return;	
					
			Body.scrollTop = window.pageYOffset;
			$('#wrap').css({ top: - (Body.scrollTop)});	
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
	
	KAUI.common = {
		init : function(){		
			KAUI.common.pageDefault.info();		
			KAUI.common.gnbNav.init();	
			KAUI.common.rollTab.init();	
			KAUI.common.fnSubSch();
			KAUI.form.init();			
			KAUI.tooltip.init();
			// KAUI.datepicker.init({
			// 	id: 'input id name',
			// 	date: 'YYYY.MM.DD',
			// 	min: 'YYYY.MM.DD',
			// 	max: 'YYYY.MM.DD',
			// 	title: 'title name',
			// 	isFooter : false,				
			// 	callback: function(){
			// 		console.log('callback init');
			// 	}
			// });


			// 모달 호출
			KAUI.common.modalEvent();
			scrollItem.init();
			KAUI.common.inView();
			setTimeout(function() {
				KAUI.common.floatingTop();
			},300);
			KAUI.common.topBnr.init();
			KAUI.common.scrlTabFixed.init();
			listItemChk();
			
		},
		modalEvent () {
			const btns = document.querySelectorAll('.btn-modal');

			for (const btn of btns) {
				btn.removeEventListener('click', KAUI.common.modalOpen);
				btn.addEventListener('click', KAUI.common.modalOpen);
			}
		},
		modalOpen (e) {
			const el = e.currentTarget;
			const id = el.dataset.id;
			const src = el.dataset.src;
			const ps = el.dataset.ps;
			const full = el.dataset.full;

			// callback 함수 필요할경우
			if (id === 'sampleModal') {
				KAUI.modal.show({ 
					id:id, 
					src: src,
					ps : !!ps ? ps : 'center', 
					full : !!full ? full : false, 
					callback: () => {
						KAUI.common.modalEvent();
					}
				});
			} else {
				KAUI.modal.show({ 
					id:id, 
					ps : !!ps ? ps : 'center', 
					full : !!full ? full : false, 
					src: src, 
					callback: () => {
						KAUI.common.modalEvent();
					}
				});
			}
		},
		pageDefault : {		
			info : function() {					
				var $gnbWrap = $('.gnb-wrap'),
					$footerWrap = $('.foot-wrap');

				if(!$gnbWrap.length) return;
				
				if (pageInfo.main == true) {
				
					$gnbWrap.find('.btn-prev').remove();
					$gnbWrap.find('.title').remove();
					$footerWrap.css({ display : 'block'});					
				} else {
					$gnbWrap.find('.logo').remove(); 
				}

				if (pageInfo.bgFund == true) $gnbWrap.addClass('bg-fund');
				if (pageInfo.bgTv == true) $gnbWrap.addClass('bg-tv');
				if (pageInfo.bgNews == true) $gnbWrap.addClass('bg-news'); 
				if (pageInfo.bgMagazine == true) $gnbWrap.addClass('bg-magazine'); 		

				$gnbWrap.find('.title').text(pageInfo.title);
			}
		},
		gnbNav : {			
			init : function() { 		
				var $gnb = $('.gnb-wrap');
				var $gnbNav = $gnb.find('.gnb-nav');
				var target = $gnb.find('.btn-gnb');
				var el = $gnb.find('.menu > li > a');
				var closeBtn = $gnbNav.find('.btn-close');	
				var gnbOpen = false;
				$('#gnb').attr('aria-hidden',true);	

				target.off('click.gnbNav').on('click.gnbNav', function (e) {
					if (!!!gnbOpen) {
						KAUI.common.gnbNav.open();
					} 
				});
				closeBtn.off('click.gnbNavClose').on('click.gnbNavClose', function (e) {
					KAUI.common.gnbNav.close();
				});

				el.off('click.gnbMenu').on('click.gnbMenu', function (e) {
					KAUI.common.gnbNav.acco(this);
				});

				// if($('.sub-wrap').hasClass('magazine-detail-wrap') || $('.sub-wrap').hasClass('news-detail-wrap')){
				// 	KAUI.common.gnbNav.subBg();
				// }
			},
			open : function () {			 				
				Body.lock();
				$('#gnb').addClass('on');				
				$('#gnb').attr('tabindex',0).focus();
				$('#gnb').attr('aria-hidden',false);
				KAUI.common.focusMove('#gnb');			
			},
			close : function () {
				Body.unlock();
				$('#gnb').removeClass('on');
				$('#gnb').attr('aria-hidden',true);
				$('#gnb').attr('tabindex','-1').focus();
				$('.gnb-wrap').find('.btn-gnb').focus();		
			},
			acco : function (target) {
				var $parent = $(target).parent();
				var $slideSpeed = 300;
				var gnbSubOpenTxt = '하위메뉴 펼치기';
				var gnbSubCloseTxt ='하위메뉴 접기';				

				if($parent.hasClass('on')){					
					$parent.removeClass('on').find('> a').attr('title',gnbSubOpenTxt);
					$(target).next().stop(true,false).slideUp($slideSpeed);
					
				}else{
					$parent.addClass('on').find('> a').attr('title',gnbSubCloseTxt);
					$parent.siblings().removeClass('on').find('.on').removeClass('on');
					$parent.siblings().children('.sub').stop(true,false).slideUp($slideSpeed).siblings().find('> a').attr('title',gnbSubOpenTxt);
					$(target).next().stop(true,false).slideDown($slideSpeed);
				}
			}
		},
		toggleGroup : function(opt) { 
			var el = $('#' + opt.id).find('.btn-toggle');
			el.on('click', function(e) {
				e.preventDefault();							
				var $this = $(this);				
				$this.closest('.ui-toggle-wrap').addClass('on');
				
			});
		},
		toggleMenu : {	
			open : function(v){
				var el = $(v);
				var target = el.closest('.fund-check');
				var infoText = '<span class="toggle-info hide">완료</span>';
				var btn = el.find('span').append(infoText);

				if(!target.hasClass('on')) target.addClass('on');

			},
			hide : function(v){
				var el = $(v);
				var target = el.closest('.fund-check');
				target.removeClass('on');
				target.find('.toggle-info').remove();				
			}
		},
		dropMenu : function(opt) { 
			var el = $('#' + opt.id).find('.ui-drop-btn');

			el.on('click', function(e) {
				e.preventDefault();	
				var gTarget = $('.ui-drop-wrap');
				var $this = $(this);
				if(!$this.closest('.ui-drop-wrap').hasClass('on')){
					$this.find('span').text('닫기').closest('.ui-drop-wrap').addClass('on');
					
				} else {
					$this.find('span').text('열기').closest('.ui-drop-wrap').removeClass('on');
				}
			});

			$(document).on('click', function(e) {
				if ($(e.target).closest('.ui-drop-wrap').length == 0) $('.ui-drop-wrap').removeClass('on');
			});
		},
		findFund : function() {
			if ($('.fund-find-wrap').length > 0) { 
				var gTarget = $('.fund-find-wrap');
				var el = $('.find-bar').find('.btn-option');			
				var fundMore = false; 

				el.off('click.findFund').on('click.findFund', function (e) {
					e.preventDefault();	
					var $this = $(this);		
					if(!!!fundMore){
						$this.find('span').text('검색옵션 닫기').closest(gTarget).addClass('on');
						fundMore = true; 
					} else {
						$this.find('span').text('검색옵션 열기').closest(gTarget).removeClass('on');
						fundMore = false; 
					}
				});
			}
		},
		rollTab : {
			init : function() {
				var $target = $('.ui-tab.scroll'),
					$parent = $target.find('li'),
					$btns = $parent.find('.ui-tab-btn'),
					$onText = '현재선택';

				$target.each(function () {

					var el = $(this).find('.ui-tab-btn'),
						elSelected = el.closest('.selected').find('.ui-tab-btn');
						
						el.attr('aria-selected', false).removeAttr('title');
						el.parent().removeClass('selected');
						
						elSelected.attr({
							'title': $onText,
							'aria-selected': true
						}).parent().addClass('selected');
					
					
					el.off('click.rollTab').on('click.rollTab', function (e) {
						e.preventDefault();						
						var $this = $(this);
							
						el.attr('aria-selected', false).removeAttr('title');
						el.parent().removeClass('selected');
						
						$this.attr({
							'title': $onText,
							'aria-selected': true
						}).parent().addClass('selected');

						KAUI.common.rollTab.scroll($(this).parent());		
					});
				});				
			},
			scroll : function(el) {
				var $parent = $(el).parent(),
					$parentWidth = $parent.outerWidth(),
					$parentScrollW = $parent.get(0).scrollWidth,
					$thisLeft = $(el).position().left,
					$thisWidth = $(el).outerWidth(),
					$scrollLeft = $thisLeft - ($parentWidth/2) + ($thisWidth/2),
					$speed = Math.max(300,Math.abs($scrollLeft * 2));
				if($parentWidth < $parentScrollW)$parent.animate({'scrollLeft':'+='+$scrollLeft},$speed);
			}
		},
		fnSubSch : function() {			
			var $target = $('.info-top');

			$target.each(function(){
				var target = $(this),
					$btn = $(this).find('.btn-sch');
					
				$btn.off('click.schBtn').on('click.schBtn', function(e) {
					e.preventDefault();
					if(!!!target.hasClass('active')){
						target.addClass('active');
					} else {
						target.removeClass('active');
					}
				});
			});
			// $(document).on('click', function(e) {
			// 	if ($(e.target).closest('.info-top').length == 0) $('.info-top').removeClass('active');
			// });

		},
		focusMove:function(tar){
			if(!$(tar).is(':visible'))return;
			var $focusEl = 'a[href], area[href], input:not([disabled]), input:not([readonly]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex=0]';
			var $focusable = $(tar).find($focusEl);
			var $focusLength = $focusable.length;
			$focusable.first().on('keydown',function(e){
				var $keyCode = (e.keyCode?e.keyCode:e.which);
				if($keyCode == 9){
					if(e.shiftKey){
						$focusable.eq($focusLength-1).focus();
						e.preventDefault();
					};
				};
			});
			$focusable.last().on('keydown',function(e){
				var $keyCode = (e.keyCode?e.keyCode:e.which);
				if ($keyCode == 9){
					if(e.shiftKey){
					} else{
						$focusable.eq(0).focus();
						e.preventDefault();
					};
				};
			});
		},
		selectSubTab:function() {
			console.log('test');
			var target = $('.type-invest-wrap');
			var el = target.find('.sel-sub');
			var pnl = target.find('.select-pnls > div');
			
			pnl.attr({'aria-selected': false });
			pnl.eq(0).css({ display : 'block'}).attr({'aria-selected': true });
			
			
			el.on('change', function() {
				pnl.css({ display : 'none'}).attr({'aria-selected': false });
				pnl.eq(this.value).css({ display : 'block'}).attr({'aria-selected': true });				

			});
		},
		inView:function() {
			var inView = window.inView || false;
			if (!document.querySelector('[data-component="inview"]')) { // inview 객체
																		// 없을 시
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
		},		
		floatingTop:function(){			
			var $window = $(window), $wrap = $('.kiam-wrap'), $footer = $('.foot-wrap'), $content = $('#content');			
			var topHtml = '<div class="ui-floating-top"><button class="btn-top"><span class="hide">컨텐츠 상단으로 이동</span></button></div>';			
			
			$content.after(topHtml);	
			
			var goTop = $('.btn-top'); 

			$WIN.on('scroll', function () {
				var $wrap = $('.kiam-wrap');
				var winH = $WIN.height();	
				var footer = $('.foot-wrap');
				var winScT = $WIN.scrollTop();
				var overScreenT = winScT + winH;
				var $conts = $wrap.find('.contents');
				if($('.foot-wrap').length) var footerT = footer.offset().top;

				if (goTop.length > 0) {
					var goTop_B = 38;
					var goTop_F = 90; // 펀드상품 하단 고정영역 있을경우
	
					if (winScT == 0) {						
						goTop.stop().animate({ 'opacity': '0' }, 100, function () { goTop.hide(); });
					} else {						
						goTop.show();
						goTop.stop().animate({ 'opacity': '1' }, 100);
					}	
					
										
					if($('#footer').is(':visible')) {
						if (overScreenT > footerT) goTop_B = overScreenT - footerT + goTop_B;
					}
					
					if($conts.is(".fixed-btn")) goTop.css('bottom', goTop_F + 'px');
					else goTop.css('bottom', goTop_B + 'px');						

				}
			}).scroll();

			goTop.on('click', function(e) {
				e.preventDefault();			
				$('html, body').animate({scrollTop:0}, 300);	
				window.location.href='#wrap';			
			});

		},
		topBnr: {			
			isActive:false,  	
			init: function (){				
				var $topBnr = $('.top-bnr-group');
				var $topBnrBtn = $topBnr.find('.btn-close');	
				
				$topBnrBtn.on('click', function() {
					KAUI.common.topBnr.hide();					
				});
			},
			show: function (){			
				if(!!!KAUI.common.topBnr.isActive) {
					$('.top-bnr-group').addClass('active');
					KAUI.common.topBnr.isActive = true;
				}				
			},
			hide : function () {
				if(KAUI.common.topBnr.isActive) {				
					$('.top-bnr-group').removeClass('active');
					KAUI.common.topBnr.isActive = false;
				}	
			}
		},
		scrlTabFixed : {
            init : function() {
                var config = null;

				console.log('test');
                
                KAUI.common.scrlTabFixed.config = {
                    winH : $WIN.height(),
                    target : $('.scroll-fixed').find('.ui-tab-list'),
                    cont : $('.scroll-fixed').find('.ui-tab-list').siblings('.ui-tab-content').find('.ui-tab-pnl'),
                    offsetTop : 0
                };
				
                config = KAUI.common.scrlTabFixed.config;  

				console.log(config.cont.length);
                if(config.target.length > 0) {
                    KAUI.common.scrlTabFixed.bindEvents();
                }
            },
            
            bindEvents : function() {
                var config = KAUI.common.scrlTabFixed.config;
                
                config.offsetTop = config.target.offset().top;
                
                $(window).off('scroll.scrollFixed');
                $(window).on('scroll.scrollFixed', function() {
                    var targetHeight = config.target.innerHeight();
                    
                    if(config.target.css('position') !== 'fixed' && config.offsetTop !== config.target.offset().top){
                        config.offsetTop = config.target.offset().top;
                    }
                    
                    if($(window).scrollTop() > config.offsetTop) {
                        config.target.parent().css({
                            paddingTop: config.target.innerHeight()+'px'
                        });
                        
                        config.target.css({
                            position : 'fixed',
                            top: 0,
                            left: 0,
							margin:'0',
                            width: '100%',
                            zIndex: 100,
                            background: '#fff'
                        });                       
                      
                        var $offsetCont = config.target.siblings('.ui-tab-content').find('.ui-tab-pnl');
                        var $menu = config.target.find('> li');
                        
                        $offsetCont.each(function() {
                           
                            var offsetTop = $(this).offset().top - (targetHeight),
                                offsetHeight = offsetTop + parseInt($(this).innerHeight(), 10),
                                winTop = $(window).scrollTop();                            
                          
                            if(winTop + config.winH >= parseInt($(document).innerHeight(), 10) - 5) {
                                var idx = $('.ui-tab-pnl').length-1;
                                $menu.removeClass('selected');
                                $menu.eq(idx).addClass('selected');

                                
                            } else if(winTop >= offsetTop && winTop < offsetHeight) {
                                var idx = $(this).index('.ui-tab-pnl');
                                $menu.removeClass('selected');
                                $menu.eq(idx).addClass('selected');
                            }
                        });                        
                        
                    } else {
                        config.target.removeAttr('style');
                        config.target.parent().css('padding-top', 0);                        
                       
                    }
                });                
                 
                config.target.off('click.scrollFixed');
                config.target.on('click.scrollFixed', 'a', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    var getHref = $(this).attr('href'),
                        $contTarget = $(getHref),
                        contOffsetTop = $contTarget.offset().top,
                        fixedTop = config.target.innerHeight() - 1,
                        result = contOffsetTop - fixedTop;
                    
                    $('html, body').stop(true, false).animate({
                        scrollTop : result+'px'
                    });
                    
                });
                
            }       
        }	
	}

	//기본실행
	doc.addEventListener("DOMContentLoaded", function(){
		KAUI.common.init();

	});	
	
})(window, document);

//data-animation
var scrollItem ={
	checkInView: function(target){
		var $window = $(window);
			$wHeight = $window.height(),
			$scrollTop = $window.scrollTop(),
			$winBottom = ($scrollTop + $wHeight);

		$.each(target, function(){
			var $el = $(this),
				$elHeight = $($el).outerHeight(),
				//$elTop = $($el).offset().top,
				$elTop = $($el).offset().top + 50,
				//$elCenter = $elTop + ($elHeight/2),
				$elCenter = $elTop + ($elHeight/5),
				//$elBottom = $elTop + $elHeight,
				//$elBottom = $elTop + ($elHeight/5)*4,
				$elBottom = $elTop + $elHeight - 50,
				$animationClass = $el.data('animation'),
				$delay = $el.data('delay'),
				$duration = $el.data('duration'),
				$animationIn = $el.data('animation-in'),
				$addClassAry = ['on','active'];

			if(!$el.hasClass('animated') && $addClassAry.indexOf($animationClass) == -1){
				if($delay>0){
					$el.css({
						'-webkit-animation-delay':$delay+'ms',
						'animation-delay':$delay+'ms'
					});
				}
				if($duration>0){
					$el.css({
						'-webkit-animation-duration':$duration+'ms',
						'animation-duration':$duration+'ms'
					});
				}
				$el.addClass('animated paused '+$animationClass);
			}

			if($animationIn){
				if(($elTop >= ($scrollTop - ($wHeight/2))) && ($elBottom <= ($winBottom + ($wHeight/2)))){
					if($el.hasClass('animated')){
						$el.addClass('paused '+$animationClass);
					}
				}else{
					if($el.hasClass('animated')){
						$el.removeClass($animationClass);
					}else{
						$el.removeClass($animationClass);
					}
				}
			}
			//if(($elCenter >= $scrollTop) && ($elCenter <= $winBottom)){
			if(($elBottom >= $scrollTop) && ($elTop <= $winBottom)){
				if($el.hasClass('animated')){
					if($el.closest('.tab_panel').length && !$el.closest('.tab_panel').hasClass('active'))return;
					$el.removeClass('paused');
				}else{
					$el.addClass($animationClass);
				}
			}
		});
	},
	scrollChk: function(target){
		var $scrollTop = $(window).scrollTop();
		//console.log($scrollTop)
		$.each(target, function(){
			var $el = $(this),
				$Data = $el.data('scrollchk').split(','),
				$Start = $Data[0],
				$End = $Data[1],
				$type = $Data[2].split(' ');

			switch($Start){
				case 'in':
					$Start = $el.parent().offset().top - $(window).height();
				break;
				case 'top':
					$Start = $el.parent().offset().top - 50;
				break;
				case 'bottom':
					$Start = $el.parent().offset().top - $el.parent().outerHeight();
				break;
				default:
					$Start = parseInt($Start)
				break;
			}

			switch($End){
				case 'out':
					$End = $el.parent().offset().top + $el.parent().outerHeight();
				break;
				case 'top':
					$End = $el.parent().offset().top - 50;
				break;
				case 'bottom':
					$End = $el.parent().offset().top - $el.parent().outerHeight();
				break;
				default:
					$End = parseInt($End);
				break;
			}

			var isFadeOut = false,
				isFadeIn = false,
				isTopDown = false,
				isSclDown = false,
				isSclUp = false;
			if($.inArray('fadeOut',$type) != -1)isFadeOut = true;
			if($.inArray('fadeIn',$type) != -1)isFadeIn = true;
			if($.inArray('topDown',$type) != -1)isTopDown = true;
			if($.inArray('sclDown',$type) != -1)isSclDown = true;
			if($.inArray('sclUp',$type) != -1)isSclUp = true;

			var $min = $el.parent().outerHeight()-$el.outerHeight(),
				$rate = ($el.outerHeight()-$el.parent().outerHeight())/($End-$Start),
				$move = -($scrollTop-$Start)*($rate),
				$opacity = Math.max(0,Math.min(1,($scrollTop-$Start)/$End));

			if($Start > $scrollTop){
				if(isFadeOut)$el.css('opacity',1);
				if(isFadeIn)$el.css('opacity',0);
				if(isTopDown)$el.css('top',0);
				if(isSclDown)$el.css('top',0);
				if(isSclUp)$el.css('bottom',0);
			}else if($scrollTop > $End){
				if(isFadeOut)$el.css('opacity',0);
				if(isFadeIn)$el.css('opacity',1);
				if(isSclDown)$el.css('top',$min);
				if(isSclUp)$el.css('bottom',$min);
			}else{
				if(isFadeOut)$el.css('opacity',1-$opacity);
				if(isFadeIn)$el.css('opacity',$opacity);
				if(isTopDown)$el.css('top',($scrollTop-$Start)/2);
				if(isSclDown)$el.css('top',Math.max($min,$move));
				if(isSclUp)$el.css('bottom',Math.max($min,$move));
			}
		});
	},
	init: function(){
		var $animations = $.find('*[data-animation]');		
		
		if($animations.length > 0){
			$(window).on('scroll resize',function(){
				scrollItem.checkInView($animations);
			});
		}
	}
};
// slider
var reitsSubSlide = function () {
	$('#reits-slider').slick({		
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		fade: true,
		asNavFor: '#reits-slider-nav'
	});
	$('#reits-slider-nav').slick({
		infinite: false,
		slidesToShow: 3,
		slidesToScroll: 1,
		asNavFor:'#reits-slider',                        
		focusOnSelect: true,
		accessibility: false
	});	
}

var mainNotiSlide = function () { 
	if(!$('.main-noice-slide').length) return;

	var sliderTitle = $('.slide-title');

	$('#mainNoticeSlider').on("init", function(event, slick){                     
		var notiTitle= $('#mainNoticeSlider .slick-active').attr('data-title');
		sliderTitle.text(notiTitle);		
	}); 

	$('#mainNoticeSlider').slick({		
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: true,
		autoplay: true,                   
		autoplaySpeed:6000,
		speed:1000,
		appendDots:$('.noti-slide-info .page'),
		arrows:false,
		customPaging: function(slider, i) {
			return $('<button type="button" data-role="none" role="button" tabindex="0" />').text(i + 1 + '번째 서비스');
		}
	});

	$('#mainNoticeSlider').on('afterChange', function(event, slick, currentSlide, nextSlide){
        var notiTitle= $('#mainNoticeSlider .slick-active').attr('data-title');
		sliderTitle.text(notiTitle);  
	});
}

// 메인 슬라이드 
var mainVisualSlide = function () {
	$('#mainVisual').on('init', function(event, slick, slideCount) {
		var slidesCount = slick.slideCount;	
		if (slidesCount == 1) {$('.main-visual .slick-control').hide();}
	});
	
	var $mVSlide = $('#mainVisual').slick({
		infinite: true,
		autoplay: true,                   
		autoplaySpeed:6000,   
		speed:1000,                
		appendDots:$('.visual-utils .slick-info .page'),
		dots: true,   
		arrows:false,   
		accessibility:true,        
		focusOnChange:false,          
		pauseOnFocus:false,
    	pauseOnHover:true,                  
		customPaging: function (slider, i) {
			return '<button type="button"><svg class="spinner on" width="14px" height="14px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">' +
				'<circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle></svg><span class="text">' + (i + 1) + '번째' + '</span></button>';
		}
	});	
	
	$('.main-visual .slick-control .pause').on('click',function(){		
		$mVSlide.slick('slickPause');
		$('.slick-control .play').show().focus();
		$(this).hide();
		$('.main-visual .page .slick-dots li.slick-active').addClass('on');
		$('.main-visual .page .slick-dots li').removeClass('slick-active');
	});
	$('.main-visual .slick-control .play').on('click',function(){
		$mVSlide.slick('slickPlay');
		$('.main-visual .slick-control .pause').show().focus();
		$(this).hide();
		$('.main-visual .page .slick-dots .on').addClass('slick-active');
	});
} 

//투자자산
var reitsSlide = function () {	
	var $reitsSlide = $('#reitsSlide');
	
	$reitsSlide.slick({ 
		dots: true,              
		slidesToShow: 1,
		variableWidth:true,
		slidesToScroll:1,                 
		arrows:false,
	}).on("setPosition", function () {
		resizeSlider();
	});

	$(window).on("resize", function (e) {
		resizeSlider();
	});

	var $reitsTrack = $reitsSlide.find('.slick-list');
	var slickHeight = $reitsTrack.outerHeight();
	var slickItemH = slickHeight - 48;
	function resizeSlider() {
		$reitsTrack.find(".slick-slide > a").css("height", slickItemH + "px");
	}


}

// 펀드 상세 체크인풋 선택시 
var listItemChk = function () {
	var $target = $('.list-item-chk .list-item');
	var el = $target.find('input');

	el.on('change',function(){		
		var $this = $(this);
		if($this.prop('checked')){
			if(!$this.hasClass('on')) {
				$(this).closest('.list-item').addClass('on');
			}
		}else{
			$(this).closest('.list-item').removeClass('on');
		}
	});	
}





