;(function(win, doc, undefined) {

	'use strict';	
	
	var $WIN = $(window);		
	var $DOC = $(document);		
	
	KAUI.common = {
		init : function(){		
			KAUI.common.subNav();	
			KAUI.table.scroll();
			
			// 모달 호출
			const btns = document.querySelectorAll('.btn-modal');

			KAUI.scrollBar.init({
				callback: function(){
					console.log('end');
				}
			});

			for (const btn of btns) {
				btn.addEventListener('click', (e) => {
					const el = e.currentTarget;
					const id = el.dataset.id;
					const src = el.dataset.src;

					// callback 함수 필요할경우
					if (id === 'sampleModal') {
						KAUI.modal.show({ 
							id:id, 
							src: src,
							callback: () => {
								//alert(111);
								alert(11)
								setTimeout(()=>{
									KAUI.datepicker.init();
								},0)
								
							}
						});
					} else {
						KAUI.modal.show({ 
							id:id, 
							src: src,
							callback: () => {
								KAUI.datepicker.init();
								
							}
						});
					}
				});
			}	

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
			
			KAUI.form.fileUpload(); 
		},		
		subNav : function() {
			if ($('.sub-nav').length > 0) {  
				var lnbObj = $('.sub-nav');		
				$('.sub-nav').html($adminNav);
				
				var mid = pageInfo.mid
					, sid = !!pageInfo.sid ? pageInfo.sid : ''
					, mMenuObj = $('#menu' + mid)
					, sMenuObj = mMenuObj.next('.sub').find('li').eq(sid - 1);
					mMenuObj.addClass('on');
					mMenuObj.next('.sub').addClass('on');
					sMenuObj.addClass('current');		

				$('.sub-nav').find('.mMenu').on('click', function(e) {
					e.preventDefault();			
					var subMenu = $(this).closest('li').find('.sub');
					if (subMenu.length > 0 && !!!subMenu.hasClass('on')) {
						$('.nav > li').find('.mMenu').removeClass('on');
						$('.sub').removeClass('on').slideUp(200);

						if (!!!$(this).closest('li').find('.sub').hasClass('on')) {
							$(this).addClass('on');
							subMenu.addClass('on').slideDown(200);
						}
					}
				});
			}
		}
	}

	//기본실행
	doc.addEventListener("DOMContentLoaded", function(){
		KAUI.common.init();
	});	
	
})(window, document);


var $adminNav = ''
+ '<ul class="nav"> '
    + '<li><a href="#" id="menu1">자사메인관리</a> '    // 하단 메뉴 없을시 a 클래스 mMenu 삭제
     +'<li><a href="#" id="menu2" class="mMenu">KOSEF 메인 관리</a> '
     +'<ul class="sub">'
     +'<li><a href="#"><span>ESG Trend Monitoring<span></a></li>'
     +'<li><a href="#"><span>배너관리<span></a></li>'
     +'<li><a href="#"><span>팝업관리<span></a></li>'
     +'<li><a href="#"><span>추천검색어관리<span></a></li>'
     +'</ul> '
     +'</li>'
     +'<li><a href="#" id="menu3" class="mMenu">상품정보 관리</a>'
     +'<ul class="sub">'
     +'<li><a href="#"><span>대표펀드관리<span></a></li>'
     +'<li><a href="#"><span>배너관리<span></a></li>'
     +'<li><a href="#"><span>팝업관리<span></a></li>'
     +'<li><a href="#"><span>추천검색어관리<span></a></li>'
     +'</ul>'
     +'</li>'
	 +'<li><a href="#" id="menu3" class="mMenu">상품정보 관리</a>'
     +'<ul class="sub">'
     +'<li><a href="#"><span>대표펀드관리<span></a></li>'
     +'<li><a href="#"><span>배너관리<span></a></li>'
     +'<li><a href="#"><span>팝업관리<span></a></li>'
     +'<li><a href="#"><span>추천검색어관리<span></a></li>'
     +'</ul>'
     +'</li>'
	 +'<li><a href="#" id="menu3" class="mMenu">상품정보 관리</a>'
     +'<ul class="sub">'
     +'<li><a href="#"><span>대표펀드관리<span></a></li>'
     +'<li><a href="#"><span>배너관리<span></a></li>'
     +'<li><a href="#"><span>팝업관리<span></a></li>'
     +'<li><a href="#"><span>추천검색어관리<span></a></li>'
     +'</ul>'
     +'</li>'
	 +'<li><a href="#" id="menu3" class="mMenu">상품정보 관리</a>'
     +'<ul class="sub">'
     +'<li><a href="#"><span>대표펀드관리<span></a></li>'
     +'<li><a href="#"><span>배너관리<span></a></li>'
     +'<li><a href="#"><span>팝업관리<span></a></li>'
     +'<li><a href="#"><span>추천검색어관리<span></a></li>'
     +'</ul>'
     +'</li>'
	 +'<li><a href="#" id="menu3" class="mMenu">상품정보 관리</a>'
     +'<ul class="sub">'
     +'<li><a href="#"><span>대표펀드관리<span></a></li>'
     +'<li><a href="#"><span>배너관리<span></a></li>'
     +'<li><a href="#"><span>팝업관리<span></a></li>'
     +'<li><a href="#"><span>추천검색어관리<span></a></li>'
     +'</ul>'
     +'</li>'
	 +'<li><a href="#" id="menu3" class="mMenu">상품정보 관리</a>'
     +'<ul class="sub">'
     +'<li><a href="#"><span>대표펀드관리<span></a></li>'
     +'<li><a href="#"><span>배너관리<span></a></li>'
     +'<li><a href="#"><span>팝업관리<span></a></li>'
     +'<li><a href="#"><span>추천검색어관리<span></a></li>'
     +'</ul>'
     +'</li>'
	 +'<li><a href="#" id="menu3" class="mMenu">상품정보 관리</a>'
     +'<ul class="sub">'
     +'<li><a href="#"><span>대표펀드관리<span></a></li>'
     +'<li><a href="#"><span>배너관리<span></a></li>'
     +'<li><a href="#"><span>팝업관리<span></a></li>'
     +'<li><a href="#"><span>추천검색어관리<span></a></li>'
     +'</ul>'
     +'</li>'
	 +'<li><a href="#" id="menu3" class="mMenu">상품정보 관리</a>'
     +'<ul class="sub">'
     +'<li><a href="#"><span>대표펀드관리<span></a></li>'
     +'<li><a href="#"><span>배너관리<span></a></li>'
     +'<li><a href="#"><span>팝업관리<span></a></li>'
     +'<li><a href="#"><span>추천검색어관리<span></a></li>'
     +'</ul>'
     +'</li>'
	 +'<li><a href="#" id="menu3" class="mMenu">상품정보 관리</a>'
     +'<ul class="sub">'
     +'<li><a href="#"><span>대표펀드관리<span></a></li>'
     +'<li><a href="#"><span>배너관리<span></a></li>'
     +'<li><a href="#"><span>팝업관리<span></a></li>'
     +'<li><a href="#"><span>추천검색어관리<span></a></li>'
     +'</ul>'
     +'</li>'
	 +'<li><a href="#" id="menu4">대체투자 관리</a>'     
     +'</li>'
	 +'<li><a href="#" id="menu5" class="mMenu">책임투자 관리</a>'
     +'<ul class="sub">'
     +'<li><a href="#"><span>대표펀드관리<span></a></li>'
     +'<li><a href="#"><span>배너관리<span></a></li>'
     +'<li><a href="#"><span>팝업관리<span></a></li>'
     +'<li><a href="#"><span>추천검색어관리<span></a></li>'
     +'</ul>'
     +'</li>'
	 +'<li><a href="#" id="menu6" class="mMenu">공시정보 관리</a>'
     +'<ul class="sub">'
     +'<li><a href="#"><span>대표펀드관리<span></a></li>'
     +'<li><a href="#"><span>배너관리<span></a></li>'
     +'<li><a href="#"><span>팝업관리<span></a></li>'
     +'<li><a href="#"><span>추천검색어관리<span></a></li>'
     +'</ul>'
     +'</li>'
	 +'<li><a href="#" id="menu7" class="mMenu">ETF자료실 관리</a>'
     +'<ul class="sub">'
     +'<li><a href="#"><span>대표펀드관리<span></a></li>'
     +'<li><a href="#"><span>배너관리<span></a></li>'
     +'<li><a href="#"><span>팝업관리<span></a></li>'
     +'<li><a href="#"><span>추천검색어관리<span></a></li>'
     +'</ul>'
     +'</li>'
	 +'<li><a href="#" id="menu8" class="mMenu">라운지 관리</a>'
     +'<ul class="sub">'
     +'<li><a href="#"><span>대표펀드관리<span></a></li>'
     +'<li><a href="#"><span>배너관리<span></a></li>'
     +'<li><a href="#"><span>팝업관리<span></a></li>'
     +'<li><a href="#"><span>추천검색어관리<span></a></li>'
     +'</ul>'
     +'</li>'
	 +'<li><a href="#" id="menu9" class="mMenu">채용공고</a>'
     +'<ul class="sub">'
     +'<li><a href="#"><span>대표펀드관리<span></a></li>'
     +'<li><a href="#"><span>배너관리<span></a></li>'
     +'<li><a href="#"><span>팝업관리<span></a></li>'
     +'<li><a href="#"><span>추천검색어관리<span></a></li>'
     +'</ul>'
     +'</li>'
	 +'<li><a href="#" id="menu10" class="mMenu">영문홈페이지 관리</a>'
     +'<ul class="sub">'
     +'<li><a href="#"><span>대표펀드관리<span></a></li>'
     +'<li><a href="#"><span>배너관리<span></a></li>'
     +'<li><a href="#"><span>팝업관리<span></a></li>'
     +'<li><a href="#"><span>추천검색어관리<span></a></li>'
     +'</ul>'
     +'</li>'
	 +'<li><a href="#" id="menu11" class="mMenu">권한 관리</a>'
     +'<ul class="sub">'
     +'<li><a href="#"><span>대표펀드관리<span></a></li>'
     +'<li><a href="#"><span>배너관리<span></a></li>'
     +'<li><a href="#"><span>팝업관리<span></a></li>'
     +'<li><a href="#"><span>추천검색어관리<span></a></li>'
     +'</ul>'
     +'</li>'
 +'</ul>'


