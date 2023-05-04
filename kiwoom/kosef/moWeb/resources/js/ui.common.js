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
			KAUI.form.init();			
			KAUI.tooltip.init();
			KAUI.common.topBnr.init();
			// KAUI.datepicker.init({
			// 	id: 'input id name',
			// 	date: 'YYYY.MM.DD',
			// 	min: 'YYYY.MM.DD',
			// 	max: 'YYYY.MM.DD',
			// 	title: 'title name',
			// 	//period: 'start' or 'end',
			// 	// callback: function(){
			// 	// 	console.log('callback init');
			// 	// }
			// });	

			// 모달 호출
			KAUI.common.modalEvent();
			KAUI.common.fnSubSch();
			KAUI.common.fullView();
			setTimeout(function() {
				KAUI.common.floatingTop();
			},300);
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
			const gap = el.dataset.gap;
			const callback = el.dataset.callback;

			if (!!callback) {
				KAUI.modal.show({ 
					id:id, 
					gap : !!gap ? gap : 84,
					src: src,
					ps : !!ps ? ps : 'center', 
					full : !!full ? full : false, 
					callback: () => {
						KAUI.callback[callback]();
						KAUI.common.modalEvent();
					}
				});
			} else {
				KAUI.modal.show({ 
					id:id, 
					gap : !!gap ? gap : 84,
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
					$footerWrap = $('.foot-wrap'),
					$gnbInner = $gnbWrap.find('.gnb-inner');

				if(!$gnbWrap.length) return;

				$gnbInner.css({ display : 'block'});
				
				if (pageInfo.main == true) {
					$gnbWrap.find('.logo').remove();
					$gnbWrap.find('.btn-prev').remove();
					$gnbWrap.find('.title').remove();
					$footerWrap.css({ display : 'block'});
					
				} else if (pageInfo.eng == true) {
					$gnbWrap.find('.logo').remove();
					$footerWrap.css({ display : 'block'});
				}
				else {
					$gnbWrap.find('.logo').remove(); 

				}

				if (pageInfo.bgFund == true) $gnbWrap.addClass('bg-fund');
				if (pageInfo.bgTv == true) $gnbWrap.addClass('bg-tv');
				if (pageInfo.bgNews == true) $gnbWrap.addClass('bg-News'); 


				$gnbWrap.find('.title').text(pageInfo.title);
			},	
			header : function() { 
				if ($('.gnb-wrap').length > 0) { 
					$('.gnb-wrap').load('/kosef/pcWeb/pub_include/header.html', function() {
						KAUI.common.gnbNav.init();
					});
				}
			},
			footer : function() { 
				if ($('.foot-wrap').length > 0) $('.foot-wrap').load('/kiam/pcWeb/pub_include/footer.html');			
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
			},
			open : function () {			 				
				Body.lock();
				$('.gnb-nav').addClass('on');				
				$('.gnb-nav').attr('tabindex',0).focus();
				$('.gnb-nav').attr('aria-hidden',false);
				KAUI.common.focusMove('.gnb-nav');

				var $lastCloseBtn = '<a href="#" class="btn-gnb-close last-focus" role="button"><i class="hide">전체메뉴 닫기</i></a>';
				if(!$('.gnb-nav').find('.btn-gnb-close.last-focus').length) $('.gnb-nav').append($lastCloseBtn);
			},
			close : function () {
				Body.unlock();
				$('.gnb-nav').removeClass('on');
				$('.gnb-nav').attr('aria-hidden',true);
				$('.gnb-nav').removeAttr('tabindex style');
				setTimeout(function(){					
					if($('.gnb-nav').find('.btn-gnb-close.last-focus').length)$('.gnb-nav').find('.btn-gnb-close.last-focus').remove();
				},610);
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
				console.log('111');				
				var $this = $(this);				
				$this.closest('.ui-toggle-wrap').addClass('on');
				
			});
		},
		openFunc : function(opt) { 
			var el = $('#' + opt.id).find('.btn-toggle');
			el.on('click', function(e) {
				console.log('test');
				e.preventDefault();					
				var $this = $(this);
				if(!$this.closest('.ui-toggle-wrap').hasClass('on')){
					$this.closest('.ui-toggle-wrap').addClass('on');
				} 
			});
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
					$onText = '현재선택',
					$selS = $('.ui-tab-sec'),
					$starget = $('.ui-tab-list.sub')


				
					
				$target.each(function () {

					var el = $(this).find('.ui-tab-btn'),
						liT = el.closest('.ui-tab-list.sub .selected').find('.ui-tab-btn span').text(),
						target = $('.ui-tab-sec .info-top');

					el.closest('.selected').find('.ui-tab-btn').attr({
						'title': $onText,
						'aria-selected': true
					})
					$('.ui-tab-sec h1').text(liT);

					el.off('click.rollTab').on('click.rollTab', function (e) {
						e.preventDefault();
						var $this = $(this);
						el.attr('aria-selected', false).removeAttr('title');
						el.parent().removeClass('selected');
						$this.attr({
							'title': $onText,
							'aria-selected': true
						}).parent().addClass('selected');
						
						var $thTxt = $this.parents('.ui-tab-list').find('.selected .ui-tab-btn span').text();
						$('.ui-tab-sec h1').text($thTxt);
					
						if(!!target.hasClass('active')){
							target.removeClass('active');
						} 

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
		rollTab1 : {
			init : function() {
				var $target = $('#ui-tab01'),
					$parent = $target.find('li'),
					$btns = $parent.find('.ui-hash-btn'),
					$onText = '현재선택';

				$target.each(function () {

					var el = $(this).find('.ui-hash-btn');

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
		rollTab2 : {
			init : function() {
				var $target = $('#ui-tab02'),
					$parent = $target.find('li'),
					$btns = $parent.find('.ui-hash-btn'),
					$onText = '현재선택';

				$target.each(function () {

					var el = $(this).find('.ui-hash-btn');

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
					$btn = $(this).find('.btn-sch-con');
					
				$btn.off('click.schBtn').on('click.schBtn', function(e) {
					e.preventDefault();
					if(!!!target.hasClass('active')){
						target.addClass('active');
						$('.sch-top .inp-base').focus();
					} else {
						target.removeClass('active');
					}
				});
			});

			$('.info-top .btn-sch').on('click', function() {
				$('.info-top').removeClass('active');
				$('.btn-sch-con').focus();
			})
			// $(document).on('click', function(e) {
			// 	console.log("aaa");
			// 	if ($(e.target).closest('.info-top').length == 0) $('.info-top').removeClass('active');
			// });
		},
		mainRandom : function(){
			var classes = ["main-bg01", "main-bg02", "main-bg03", "main-bg04"];
			var currentClassIndex = 0;
			$('.kosef-main').addClass(classes[currentClassIndex]);

			setInterval(function() {
			$('.kosef-main').removeClass(classes[currentClassIndex]);
			currentClassIndex = (currentClassIndex + 1) % classes.length;
			$('.kosef-main').addClass(classes[currentClassIndex]).stop().animate({
				opacity: 1
			}, {
				easing: "linear",
				queue: false
			});
			}, 10000);
			
		},
		fullView : function() {
			// console.log('test');
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
		fieldsetDisable: () => {
			const el_inputs = document.querySelectorAll('input[data-fieldset]');
			let current = null;

			const act = (e) => {
				const that = e.currentTarget;
				const id = that.dataset.fieldset;
				const v = that.dataset.disabled;
				const fieldset = document.querySelector('fieldset[data-fieldset="'+id+'"]');
				const inputs = fieldset.querySelectorAll('input');

				if (v === 'true') {
					fieldset.disabled = true;
					for (let inp of inputs) {
						if(!!inp.checked) {
							current = inp;
						}
						inp.checked = false;
						inp.disabled = true;
					}
				} else {
					fieldset.disabled = false;
					for (let inp of inputs) {
						inp.disabled = false;
						inputs[1].checked = true;
					}
					!!current ? current.checked = true : '';
				}
			}
			
			for (let el_input of el_inputs) {
				el_input.addEventListener('change', act);
			}
		},
		subTab : function(){
			var subTarget = $('.ui-sub-tab .ui-tab-list li'),
				el = subTarget.find('button'),
				btns =  $('.ui-select'),
				subLink =  btns.attr('aria-hidden', 'true');

			el.off('click.el').on('click.el', function(e){
				el.removeClass('on');
				$('.ui-tab').removeClass('on');
				e.preventDefault();	
				var $this = $(this),
					tabFirst = $this.attr('data-tab');
					$this.addClass('on');

				$('.tbl-info').removeClass('on');
				if (btns.length > 0){
					
					subLink.each(function(i){
						var ths = $(this),
							tabSecond = ths.attr('data-subtab');
							
							if(tabFirst == tabSecond){
								ths.addClass('on').attr('aria-hidden', 'false').show();
								ths.closest('.ui-tab ').addClass('on');
							}else{
								
								ths.removeClass('on').attr('aria-hidden', 'true').hide();
							}
					})
				}
			});
		},
		floatingTop:function(){			
			var $window = $(window), $wrap = $('.kiam-wrap'), $footer = $('.foot-wrap'), $content = $('#content');			
			var topHtml = '<div class="ui-floating-top"><button class="btn-top"><span class="hide">컨텐츠 상단으로 이동</span></button></div>';			
			
			$content.after(topHtml);	
			
			var goTop = $('.btn-top'); 

			$WIN.on('scroll', function () {
				var winH = $WIN.height();	
				var footer = $('.foot-wrap');
				var winScT = $WIN.scrollTop();
				var overScreenT = winScT + winH;
				if($('.foot-wrap').length) var footerT = footer.offset().top;
				var $wrap = $('.kosef-wrap'); 		
			
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
					
					if($wrap.is(".fixed-btm")) goTop.css('bottom', goTop_F + 'px');
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
					$('.contents-top').addClass('active');
					KAUI.common.topBnr.isActive = true;
				}				
			},
			hide : function () {
				if(KAUI.common.topBnr.isActive) {
					console.log("aaaa");
					$('.top-bnr-group').removeClass('active');
					$('.contents-top').removeClass('active');
					KAUI.common.topBnr.isActive = false;
				}	
			}
		},
		loadImg:function() {
			var images = [
				"/kosef/moWeb/resources/images/main/main_01.png",
				"/kosef/moWeb/resources/images/main/main_02.png",
				"/kosef/moWeb/resources/images/main/main_03.png"
			];
			
			
			var preload = (imageArray, index) => {
				index = index || 0;
				if (imageArray && imageArray.length > index) {
					var img = new Image();
					img.onload = () => {
						preload(imageArray, index + 1);
					}
					img.src = imageArray[index];
				}
			}
			preload(images);
		}

	}

	//기본실행
	doc.addEventListener("DOMContentLoaded", function(){
		KAUI.common.init();

	});	
	
})(window, document);


var mainSlide = function (){
	var status = $('.paging'),
		slide = $('#mainSlide ul');
	
	slide.on('init reInit afterChange', function(event, slick, currentSlide, nextSlide){
		var i = (currentSlide ? currentSlide : 0) + 1;
		status.text(i + '/' + slick.slideCount);
	});

	slide.slick({
		centerMode: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: true,
		arrow: false,
		focusOnSelect: true,
		centerPadding: '15px'
	});
}


var mainNav = function (){
	setTimeout (function(){
		$('.tab-nav').stop().animate({bottom: '-77px'}, 500);
	}, 1500);
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
		autoplay: false,                   
		autoplaySpeed:6000,
		speed:1000,
		appendDots:$('.slick-info .page'),
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