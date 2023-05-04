;(function(win, doc, undefined) {

	'use strict';

	var $WIN = $(window);
	var $DOC = $(document);

	var Body = {
		scrollTop :'',
		lock: function(){
		if ($('body').is(".scroll-no")) {
				return;
			}
			Body.scrollTop = window.pageYOffset;
			$('#wrap').css({
				top: - (Body.scrollTop)
			});
			$('body').addClass('scroll-no');
		},
		unlock: function(){
			if( $("body").hasClass("scroll-no") ){
				$('body').removeClass('scroll-no');
				$('#wrap').removeAttr('style');
				window.scrollTo(0, Body.scrollTop);
			}
		}
	}


	KAUI.common = {
		init : function(){
			KAUI.common.gnbNav.init();
			KAUI.select.init();
			KAUI.form.init();
			KAUI.tooltip.init();
			KAUI.table.scroll();
			KAUI.scrollBar.init({
				callback: function(){
				}
			});
			KAUI.datepicker.init({
				id: 'input id name',
				date: 'YYYY.MM.DD',
				min: 'YYYY.MM.DD',
				max: 'YYYY.MM.DD',
				title: 'title name',
				//period: 'start' or 'end',
				// callback: function(){
				// 	console.log('callback init');
				// }
			});
			KAUI.common.totalSch.init();
			//KAUI.common.findFund();
			KAUI.common.findFundFunc.toggle();
			KAUI.common.fundComp.fixed();
			KAUI.common.fundComp.toggle();
			KAUI.common.windowScroll();
			KAUI.common.snsTips();
			KAUI.common.subTab();
			//KAUI.common.headerSlide();
			KAUI.common.topBnr.init();
			KAUI.common.skipNav();
			setTimeout(function() {
				KAUI.common.floatingTop();
			},300);

			// 모달 호출
			const btns = document.querySelectorAll('.btn-modal');

			for (const btn of btns) {
				btn.addEventListener('click', (e) => {
					const el = e.currentTarget;
					const id = el.dataset.id;
					const src = el.dataset.src;
					const callback = el.dataset.callback;

					if (!!callback) {
						KAUI.modal.show({
							id:id,
							src: src,
							callback: () => {
								KAUI.callback[callback]();
							}
						});
					} else {
						KAUI.modal.show({
							id:id,
							src: src
						});
					}
				});
			}
		},
		// pageDefault : {
		// 	header : function() {
		// 		if ($('.gnb-wrap').length > 0) {
		// 			$('.gnb-wrap').load('/kiam/pcWeb/pub_include/header.html', function() {
		// 				KAUI.common.gnbNav.init();
		// 			});
		// 		}
		// 	},
		// 	footer : function() {
		// 		if ($('.foot-wrap').length > 0) $('.foot-wrap').load('/kiam/pcWeb/pub_include/footer.html');
		// 	}
		// },
		skipNav : function() {
			$('#skipNavi > a').on('click', function(e) {
				var containerTop = $('#content').offset().top,
					fixedH = $('.gnb-wrap').find('.gnb-nav').innerHeight();

				$('html, body').stop(true, false).animate({
					scrollTop : containerTop-fixedH
				});
			});
		},
		gnbNav : {
			gnb : $('.gnb'),
			gnbMenu : $('.gnb nav > ul.menu'),
			gnbMenuLi : $('.gnb nav > ul > li'),
			menuSpeed: 200,
			bgSpeed: 200,
			tabTimeout: '',
			openTimeout: '',
			closeTimeout: '',
			// 서브 열림
			open : function(target,time){
				clearTimeout(KAUI.common.gnbNav.closeTimeout);
				var openInit = function(){
					var $subMenu = $('.gnb .sub');
					var $gnbBg = $('.gnb-bg');
					$('.gnb-wrap').addClass('show');
					// $('.gnb nav > ul > li').children('a').attr('aria-expanded','true');
					$('.gnb nav > ul > li').removeClass('hover');
					$(target).addClass('hover');
					KAUI.common.gnbNav.tabTimeout = setTimeout(function(){
						$subMenu.stop(true,false).fadeIn(100);
						var subMenuH = $('.gnb').outerHeight() - 88;
						$gnbBg.css({'height':subMenuH});
					},100);
				};

				if(!!time){
					KAUI.common.gnbNav.openTimeout = setTimeout(function() {
						openInit();
					}, time);
				}else{
					openInit();
				}
			},
			// 서브 닫힘
			close: function (time) {
				clearTimeout(KAUI.common.gnbNav.openTimeout);
				clearTimeout(KAUI.common.gnbNav.tabTimeout);
				var closeInit = function(){
					$('.gnb-wrap').removeClass('show');
					// $('.gnb nav > ul > li').children('a').attr('aria-expanded','false');
					$('.gnb nav > ul > li').removeClass('hover');
					$('.gnb .sub').removeClass('active').removeAttr('style');
				};
				if(!!time){
					KAUI.common.gnbNav.closeTimeout = setTimeout(function(){
						closeInit();
					},time)
				}else{
					closeInit();
				}
			},
			scroll : function (){
				if(!$('.gnb-wrap').length) return;

				var $topBnr = $('.top-bnr-group');
				var $gnb = $('.gnb-wrap');

				$WIN.scroll(function() {
					var scrlTop = $WIN.scrollTop();


					if(scrlTop > 0) {
						if(!!!$gnb.hasClass('scroll')) $gnb.addClass('scroll');
					} else {
						$gnb.removeClass('scroll');
					}
				});
			},
			// 실행
			init : function () {
				var menu = $('.gnb nav > ul > li');
				// menu.children('a').attr('aria-expanded','false');
				//var $current = KAUI.common.gnbNav.find('.current');
				var $openDep1 = '';
				// if ($current.length){
				// 	//
				// }
				menu.on('mouseover focusin', function (e){
					var $this = $(this);
					if(e.type == 'mouseover'){
						KAUI.common.gnbNav.open($this,100);
					}else{
						KAUI.common.gnbNav.open($this);
					}
					$openDep1 = $this;
				}).on('mouseout focusout', function (e){
					if(e.type == 'mouseout'){
						KAUI.common.gnbNav.close(100);
					}else{
						KAUI.common.gnbNav.close(10);
					}
				});
				KAUI.common.gnbNav.scroll();
			}
		},
		totalSch : {
			$t: null,
			$parent: null,
			$target: null,
			className: null,
			openFn: function() {
				Body.lock();
				var o = this;
				o.$parent.addClass('active');
				o.$target.css({'height':'312px'});
				o.$target.show();
				setTimeout(function() {
					o.$target.css('opacity',1);
				},10);
				KAUI.common.focusMove('.gnb-wrap .sch-cont');
			},
			closeFn: function() {
				Body.unlock();
				var o = this;
				o.$parent.removeClass('active');
				o.$target.css('opacity','0');
				o.$target.hide();
				o.$target.css({'height': 0});
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
				o.$t = $('.gnb-wrap .btn-sch');
				o.$parent = o.$t.parent(),
				o.$target = $('.gnb-wrap .sch-cont'),
				o.$CloseBtn = $('.gnb-wrap .btn-close');
				o.className = 'active';

				o.$t.off().on('click', function() {
					o.activeFn();
				});

				o.$CloseBtn.off().on('click', function() {
					o.closeFn();
				});

				if(v === 'open') {
					o.openFn();
				}
				if(v === 'close') {
					o.closeFn();
				}
			}
		},
		toggleMenu : function(opt) {
			var target = $('#' + opt.id),
				el = target.find('.btn-toggle'),
				closeBtn = target.find('.btn-close'),
				togOpen = false;

			el.on('click', function(e) {
				e.preventDefault();
				if(!!!togOpen){
					target.addClass('on');
					togOpen = true;
				}
			});

			closeBtn.on('click', function(e) {
				e.preventDefault();
				if(togOpen){
					target.removeClass('on');
					togOpen = false;
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
					$this.closest('.ui-drop-wrap').addClass('on');
				} else {
					$this.closest('.ui-drop-wrap').removeClass('on');
				}
			});

			$(document).on('click', function(e) {
				if ($(e.target).closest('.ui-drop-wrap').length == 0) $('.ui-drop-wrap').removeClass('on');
			});
		},
		schTabs : function(opt) {
			var el = $('#' + opt.id).find('.ui-tab-btn'),
				idx = opt.current,
				$gTarget = $('#' + opt.id);


			$gTarget.find('.ui-tab-btn').removeClass('selected').attr('aria-seleted', false);
			el.eq(idx).addClass('selected').attr('aria-seleted', true);

			el.on('click', function(e) {
				e.preventDefault();
				var $this = $(this);
				$gTarget.find('.ui-tab-btn').removeClass('selected').attr('aria-seleted', false);
				if (!!!$this.hasClass('selected')) {
					$this.addClass('selected').attr('aria-seleted', true);
				}
			});
		},
		findFundFunc : {
			speed: 200,
			tabTimeout: '',
			openTimeout: '',
			closeTimeout: '',
			state:false,
			show : function(target,time){
				clearTimeout(KAUI.common.findFundFunc.closeTimeout);
				var $this = target;
				var el_pnl = $this.closest('.fund-sch-wrap').find('.find-more');

				var openInit = function(){
					var el_pnl_height = el_pnl.find('.find-more').outerHeight();
					$this.find('span').text('검색옵션 닫기').closest('.fund-sch-wrap').addClass('on');

					el_pnl.css({'height':'375'});
					KAUI.common.findFundFunc.state = true;
				}

				if(!!time){
					KAUI.common.findFundFunc.openTimeout = setTimeout(function() {
						openInit();
					}, time);
				}else{
					openInit();
				}
			},
			// 서브 닫힘
			hide:function (target,time) {
				clearTimeout(KAUI.common.findFundFunc.openTimeout);
				clearTimeout(KAUI.common.findFundFunc.tabTimeout);
				var $this = target;
				var el_pnl = $this.closest('.fund-sch-wrap').find('.find-more');
				var el_pnl_height = el_pnl.outerHeight();

				var closeInit = function(){
					var el_pnl_height = el_pnl.find('.find-more').outerHeight();
					$this.find('span').text('검색옵션 열기').closest('.fund-sch-wrap').removeClass('on');
					el_pnl.css({'height':0});
					KAUI.common.findFundFunc.state = false;
				}

				if(!!time){
					KAUI.common.gnbNav.closeTimeout = setTimeout(function(){
						closeInit();
					},time)
				}else{
					closeInit();
				}
			},

			// 실행
			toggle : function () {
				var el = $('.find-bar').find('.btn-option');
				el.on('click', function (e){
					e.preventDefault();
					var $this = $(this);

					if(!!!KAUI.common.findFundFunc.state){
						KAUI.common.findFundFunc.show($this,50);
					} else {
						KAUI.common.findFundFunc.hide($this,50);
					}

				});
			}
			// init : function () {
			// 	var target = $('.fund-sch-wrap'),
			// 		$this = target.find('.btn-option');

			// 	if (target.hasClass('on')) {
			// 		KAUI.common.findFundFunc.show($this,50);
			// 		KAUI.common.findFundFunc.state = true;
			// 	}
			// 	KAUI.common.findFundFunc.toggle();
			// }
		},
		windowScroll : function() {
			$WIN.scroll(function() {
				KAUI.common.fundComp.fixed();
		});
		},
		fundComp : {
			fcWrap : $('.fund-compare'),
			speed: 200,
			tabTimeout: '',
			openTimeout: '',
			closeTimeout: '',
			state:false,
			fixed : function(){
				if (!$('.fund-find-wrap').length > 0) return;
				var $fundcp = $('.fund-compare'),
					$container = $('.sub-wrap'),
					winH = $WIN.height(),
					winScrollTop = $WIN.scrollTop(),
					containerTop = $container.offset().top,
					footTop = $('.foot-wrap').offset().top;

				var topMg = Math.max(((winScrollTop + winH) - footTop), 0);
				var isCpFix = containerTop+topMg < winScrollTop && footTop-winH > winScrollTop;
				if(isCpFix) !$fundcp.is(".fixed") && $fundcp.addClass("fixed");
				else $fundcp.is(".fixed") && $fundcp.removeClass("fixed");

			},
			hide : function(){
				var $fundcp = $('.fund-compare'),
					el = $fundcp.find('.btn-toggle');

				KAUI.common.fundComp.state = false;
				Body.unlock();
				el.find('span').text('열기');
				$fundcp.find('.result').removeClass('active');
				$fundcp.find('.summary').removeClass('active');
			},
			toggle : function() {
				if (!$('.fund-find-wrap').length > 0) return;

				var $fundcp = $('.fund-compare'),
				el = $fundcp.find('.btn-toggle');

				el.off('click.findCompareDetail').on('click.findCompareDetail', function (e) {
					e.preventDefault();
					if(!!!KAUI.common.fundComp.state) {
						Body.lock();
						el.find('span').text('닫기');
						$fundcp.find('.result').addClass('active');
						$fundcp.find('.summary').addClass('active');
						KAUI.common.fundComp.state = true;
					} else {
						Body.unlock();
						el.find('span').text('열기');
						$fundcp.find('.result').removeClass('active');
						$fundcp.find('.summary').removeClass('active');
						KAUI.common.fundComp.state = false;
					}
				});
			}
		},
		snsTips : function(opt) {
			var $target = $('.share-sns');
			$target.each(function(){
				var target = $(this),
				$btn = $(this).find('.btn-share'),
				$tipConts = target.find('.tip-sns'),
				tipCloseBtn = '<button type="button" class="icon-close" aria-label="close"><span class="hide">공유하기 닫기</span></button>';

				!$tipConts.find('.icon-close').length && $tipConts.append(tipCloseBtn);
				var $closeBtn = $tipConts.find('.icon-close');

				$btn.attr('title','내용열기');
				$btn.off('click.snsTips').on('click.snsTips', function(e) {
					e.preventDefault();
					if(!!!target.hasClass('active')){
						target.addClass('active');
						$tipConts.attr({'tabindex':'0'});
						$(this).attr('title','내용닫기');
					} else {
						target.removeClass('active');
						$tipConts.attr({'tabindex':'-1'});
						$(this).attr('title','내용열기');
					}
				});

				$closeBtn.off('click.snsClose').on('click.snsClose', function(e) {
					target.removeClass('active');
					$tipConts.attr({'tabindex':'-1'});
					$btn.attr('title','내용열기');
				});
			});

			$(document).on('click', function(e) {
				if ($(e.target).closest('.share-sns').length == 0) {
					var target = $('.share-sns');
					target.removeClass('active');
					target.find('.tip-sns').attr({'tabindex':'-1'});
					$('.share-sns .btn-share').attr('title','내용열기');
}
			});

		},
		subTab : function(){
			var subTarget = $('.ui-tab-btns'),
				el = subTarget.find('button'),
				btns =  $('.ui-tab-sub-btns'),
				subLink =  btns.find('ul').attr('aria-hidden', 'true');


			el.off('click.el').on('click.el', function(e){				
				el.attr('title', '').removeClass('on');
				e.preventDefault();
				var $this = $(this),
				tabFirst = $this.attr('data-tab'),
				tabTitle = $this.attr('data-title');
				$this.attr('title', '선택됨').addClass('on');
				var tabSubTitle = btns.find('.tab-title');
			
				$('.tbl-info').removeClass('on');
				tabSubTitle.text(tabTitle);
				
				if (btns.length > 0){
					subLink.each(function(i){
						var ths = $(this),
							tabSecond = ths.attr('data-subtab');						

							if(tabFirst == tabSecond){
								ths.attr('title', '선택됨').addClass('on').attr('aria-hidden', 'false').show();								
								ths.closest('.ui-tab-content').find('.tbl-info').addClass('on');																							
							}else{
								ths.attr('title', '').removeClass('on').attr('aria-hidden', 'true').hide();
							}
					})
				}
			});
		},
		// mainRandom : function(){
		// 	var classes = ["main-bg01", "main-bg02", "main-bg03"];
		// 	var currentClassIndex = 0;
		// 	$('.kosef-main').addClass(classes[currentClassIndex]);

		// 	setInterval(function() {
		// 	$('.kosef-main').removeClass(classes[currentClassIndex]);
		// 	currentClassIndex = (currentClassIndex + 1) % classes.length;
		// 	$('.kosef-main').addClass(classes[currentClassIndex]).stop().animate({
		// 		opacity: 1
		// 	}, {
		// 		duration: 8000,
		// 		easing: "easeInOutQuart",
		// 		queue: false
		// 	});
		// 	}, 8000);
		// },

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
				duration: 8000,
				easing: "linear",
				queue: false
			});
			}, 8000);

		},

		mainTab : function(){
			var main = $('.tab-nav'),
			mainTarget = main.find('ul li'),
			el = mainTarget.find('button'),
			att = $('.kosef-main [data-type$="main"]'),
			close = $('.kosef-main .main-close');
			att.attr('aria-hidden','true');

			var actE;


			$('.kosef-main main').attr('aria-hidden','false');
			$('.tab-nav > ul > li:eq(0) > button').attr('title', '선택됨');
			el.off('click.el').on('click.el', function(e){
				e.preventDefault();
				actE = document.activeElement.getAttribute('data-maintab');
				$('.tab-nav > ul > li > button').removeClass('on').attr('title', '');
				att.attr({
					'aria-hidden':'true',
				});

				var thBt = $(this).attr('data-mainTab');

				$(this).addClass('on');
				$(this).attr('title', '선택됨');

				$("#guide-ifm").attr("src", "https://www.youtube.com/embed/DommppaF9Uc");
                if($(this).attr('data-mainTab') == "0"){
                    $("#guide-ifm").attr("src", "");
                    $('.kosef-main').removeClass('fix');
                } else {
                    $('.kosef-main').addClass('fix');
                    if ($(this).attr('data-mainTab') !== "2") { // 2: 투자가이드
                        $("#guide-ifm").attr("src", "");
                    }
                }

				mainTarget.each(function(i){
					var ths = $(this),
						btn = ths.find('button').attr('aria-controls', 'mainAria-' + i);
				})

				att.each(function(i){
					var ths = $(this),
					panel = ths.attr('data-mainTab');
					ths.attr('tabindex', '0').attr('aria-labelledby', 'mainAria-' + i);

				if(thBt === panel){
					att.removeClass('selected');
					ths.addClass('selected');
					ths.attr({
						'aria-hidden': false,

					});

					if(thBt == 1){
						KAUI.tab.init({
							id:'mainTab',
							current:0
						});
					}
				}
				});
				$('section.selected').focus();
				KAUI.common.focusMove('section.selected');
			});
			close.off('click.main-close').on('click.main-close', function(e){
				att.removeClass('selected').attr('aria-hidden', false);
				mainTarget.find('button').removeClass('on');
				mainTarget.eq(0).find('button').addClass('on').attr('title', '선택됨');
				mainTarget.eq(actE).find('button').focus();
				$("#guide-ifm").attr("src", ""); // 영상 종료
				$('.kosef-main').removeClass('fix');
				$('.hash-radio #hashM00').prop("checked", true);
				$('.hash-radio #hashT00').prop("checked", true);
			});

			KAUI.callback.gnbCallback1 = () => {
				const isSlide = document.querySelector('.main-horizontal-slide.type01 .slick-initialized ');
				!isSlide && srSlidety01();
            }
			KAUI.callback.gnbCallback2 = () => {
				const isSlide = document.querySelector('.main-horizontal-slide.type02 .slick-initialized ');
				!isSlide && srSlidety02();
            }


			$(window).resize( function() {
				// const isSlide1 = document.querySelector('.main-horizontal-slide.type01 .slick-initialized ');
				// srSlidety01();
				// srSlidety02();
				// const isSlide2 = document.querySelector('.main-horizontal-slide.type02 .slick-initialized ');
				// 	console.log("bbbb");
				// 	isSlide2.slick();

			})
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
		// headerSlide : function() {
		// 	$(window).scroll(function () {
		// 		var kosefSub = $('.kosef-wrap'),
		// 			scrollValue = $(document).scrollTop(),
		// 			headerH = $('.gnb-wrap').height();
		// 		if(kosefSub.length > 0){
		// 			if( scrollValue > headerH ){
		// 				$('.gnb-wrap').addClass('scroll');
		// 			}else{
		// 				$('.gnb-wrap').removeClass('scroll');
		// 			}
		// 		}
		// 	});
		// },
		floatingTop:function(){
			var $window = $(window), $wrap = $('.kosef-wrap'), $main = $('kosef-main'), $footer = $('.foot-wrap'), $content = $('#content');
			var topHtml = '<div class="ui-floating-top"><button class="btn-top"><span class="hide">컨텐츠 상단으로 이동</span></button></div>';

			$content.after(topHtml);

			var goTop = $('.btn-top');
			$WIN.on('scroll', function () {
				var winH = $WIN.height();
				var winScT = $WIN.scrollTop();
				var overScreenT = winScT + winH;
				var footer = $('.foot-wrap');

				if(footer.length) var footerT = footer.offset().top;

				var $wrap = $('.kosef-wrap');

				if (goTop.length > 0) {
					var goTop_B = 38;
					var goTop_F = 125; // 펀드상품 하단 고정영역 있을경우

					if (winScT == 0) {
						goTop.stop().animate({ 'opacity': '0' }, 100, function () { goTop.hide(); });
					} else {
						goTop.show();
						goTop.stop().animate({ 'opacity': '1' }, 100);
					}
					if(footer.length) {
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
			init() {
				!(KAUI.cookie.get('topBnrTodayChk')) && KAUI.common.topBnr.show();
			},
			show(){
				const el_topBnr = document.querySelector('.top-bnr-group');
				if (!el_topBnr){
					return false;
				}
				const el_topBnrBtn = el_topBnr.querySelector('.btn-close');
				const el_body = document.querySelector('body');
				const el_txt = document.querySelector('.contents-top');

				el_topBnr.classList.add('active');
				el_txt.classList.add('active');

				el_body.classList.add('is-topbanner');
				!!el_topBnrBtn && el_topBnrBtn.addEventListener('click', KAUI.common.topBnr.hide);
			},
			hide() {
				const el_gnbheader = document.querySelector('.gnb-wrap');
				const el_topBnr = document.querySelector('.top-bnr-group');
				const notToday = document.querySelector('#topBnrTodayChk');
				const el_body = document.querySelector('body');
				const el_txt = document.querySelector('.contents-top');

				if (notToday.checked) {
					KAUI.cookie.set({
						name: 'topBnrTodayChk',
						value: 'topbanner',
						term: 1
					});
				}

				el_body.classList.remove('is-topbanner');
				el_topBnr.classList.remove('active');
				el_txt.classList.remove('active');
				el_gnbheader.style.zIndex = 201;
			}
		},
		loadImg:function() {
			var images = [
				"/kosef/pcWeb/resources/images/main/main_01.jpg",
				"/kosef/pcWeb/resources/images/main/main_02.jpg",
				"/kosef/pcWeb/resources/images/main/main_03.jpg",
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

var reitsSlide = function () {

	var rtSlide = $('#reits-slider').slick({
		infinite: false,
		slidesToShow: 4,
		slidesToScroll: 4,
		arrows: true,
		dots: true,
		autoplay: false,
		variableWidth: true,
		accessibility: true,

	});
	$('.slick-dots li').eq(0).addClass('active');
	rtSlide.on('beforeChange', function (e, s, c, n) {
		$('.slick-dots li').each(function(index, value){
			if (index + 2 < n){
				$(value).addClass('active')
			}
		});

		$('.history-contents .slick-prev').on('click', function(){
			$('.slick-dots li').removeClass('active');
			// $('.slick-dots li').eq(0).addClass('active');
			$('.slick-dots li').addClass('stop');
1
		});
		$('.history-contents .slick-next').on('click', function(){
			$('.slick-dots li').removeClass('stop').next();
		});
	})
	$('.history-contents .slick-dots li button').attr("disabled", true);
}

function mainSlide() {
	$('.play').hide();
	$('#mainSlide ul').on('init', function(event, slick, slideCount) {
        var slidesCount = slick.slideCount;
        if (slidesCount == 1) {
			$('#mainSlide .control .pause').hide();
		}
    });
	var $mainSlide = $('#mainSlide ul').slick({
		infinite: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		dots: true,
		autoplay: true,
		autoplaySpeed: 6000,
		//accessibility: false,
		appendDots: $('#mainSlide .page'),
		customPaging: function (slider, i) {
			return '<button type="button"><svg class="spinner on" width="14px" height="14px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">' +
				'<circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle></svg><span class="text">' + (i + 1) + '번째' + '</span></button>';
		},
	});



	$('#mainSlide .control .play').on('click', function () {
		$(this).hide();
		$('.pause').show().focus();
		$mainSlide.slick('slickPlay');
		$('.page .slick-dots .on').addClass('slick-active');
	});

	$('#mainSlide .control .pause').on('click', function () {
		$(this).hide();
		$('.play').show().focus();
		$mainSlide.slick('slickPause');
		$('.page .slick-dots li.slick-active').addClass('on');
		$('.page .slick-dots li').removeClass('slick-active');
	});
	$(window).scroll(function () {
		var kosefMain = $('.kosef-main'),
			scrollValue = $(document).scrollTop(),
			headerH = $('.gnb-wrap').height();
		if(kosefMain.length > 0){
			if( scrollValue > headerH ){
				$('.gnb-wrap').addClass('scroll');
			}else{
				$('.gnb-wrap').removeClass('scroll');
			}
		}
	});
}

function srSlide() {
	var srSlide = $('.main-horizontal-slide ul');
		len = srSlide.find('li').length;

	$('.indicator-box .txt').text(len);
	srSlide.slick({
		infinite: false,
		slidesToShow: 4,
		slidesToScroll: 3,
		arrows: false,
		dots: true,
		appendDots: $('.indicator-box .bar'),
		accessibility: true
	});

	$('.slick-dots li').eq(0).addClass('active');
	srSlide.on('beforeChange', function (e, s, c, n) {
		$('.slick-dots li').each(function(index, value){
			if (index + 1 < n){
				$(value).addClass('active')
			} else if( index  == 0) {
				$(value).addClass('active')
			}else{
				$(value).removeClass('active')
			}
		})
	})
}

function srSlidety01() {
	var srSlide01 = $('.main-horizontal-slide.type01 ul');
		len = srSlide01.find('li').length;

	$('.type01 .indicator-box .txt').text(len);
	srSlide01.slick({
		infinite: false,
		slidesToShow: 4,
		slidesToScroll: 3,
		arrows: true,
		dots: true,
		variableWidth: true,
		appendDots: $('.type01 .indicator-box .bar'),
		accessibility: false
	});

	$('.type01 .slick-dots li').eq(0).addClass('active');
	srSlide01.on('beforeChange', function (e, s, c, n) {
		$('.type01 .slick-dots li').each(function(index, value){
			if (index + 1 < n){
				$(value).addClass('active')
			} else if( index  == 0) {
				$(value).addClass('active')
			}else{
				$(value).removeClass('active')
			}
		})
	})
}


function srSlidety02() {
	var srSlide02 = $('.main-horizontal-slide.type02 ul');
	len = srSlide02.find('li').length;

	$('.type02 .indicator-box .txt').text(len);
	srSlide02.slick({
		infinite: false,
		slidesToShow: 4,
		slidesToScroll: 3,
		arrows: true,
		dots: true,
		variableWidth: true,
		appendDots: $('.type02 .indicator-box .bar'),
		accessibility: false
	});



	$('.type02 .slick-dots li').eq(0).addClass('active');
	srSlide02.on('beforeChange', function (e, s, c, n) {
		$('.type02 .slick-dots li').each(function(index, value){
			if (index + 1 < n){
				$(value).addClass('active')
			} else if( index  == 0) {
				$(value).addClass('active')
			}else{
				$(value).removeClass('active')
			}
		})
	})
}

// 메인 공지팝업 슬라이드
var mainNotiSlide = function () {
	if(!$('.main-noice-slide').length) return;

	var sliderTitle = $('.slide-title');

	$('#mainNoticeSlider').on("init", function(event, slick, slideCount){
		var notiTitle= $('#mainNoticeSlider .slick-active').attr('data-title');
		var slidesCount = slick.slideCount;
		sliderTitle.text(notiTitle);
		if (slidesCount == 1) {$('.main-noice-slide .slick-control').hide();}
	});

	$('#mainNoticeSlider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: true,
		autoplay: true,
		autoplaySpeed:6000,
		speed:1000,
		appendDots:$('.slick-info .page'),
		arrows:false,
		customPaging: function(slider, i) {
			return $('<button type="button" data-role="none" role="button" tabindex="0" />').text(i + 1 + '번째 서비스');
		}
	});

	$('.noti-slide-info .slick-control .pause').on('click',function(){
        $('#mainNoticeSlider').slick('slickPause');
        $('.noti-slide-info .slick-control .play').show().focus();
        $(this).hide();
        $('.noti-slide-info .page .slick-dots li.slick-active').addClass('on');
        $('.noti-slide-info .page .slick-dots li').removeClass('slick-active');
    });
    $('.noti-slide-info .slick-control .play').on('click',function(){
        $('#mainNoticeSlider').slick('slickPlay');
        $('.noti-slide-info .slick-control .pause').show().focus();
        $(this).hide();
        $('.noti-slide-info .page .slick-dots .on').addClass('slick-active');
    });

	$('#mainNoticeSlider').on('afterChange', function(event, slick, currentSlide, nextSlide){
        var notiTitle= $('#mainNoticeSlider .slick-active').attr('data-title');
		sliderTitle.text(notiTitle);
	});

	$('#mainNoticeSlider').on('afterChange', function(event, slick, currentSlide, nextSlide){
        var notiTitle= $('#mainNoticeSlider .slick-active').attr('data-title');
		sliderTitle.text(notiTitle);
	});
}