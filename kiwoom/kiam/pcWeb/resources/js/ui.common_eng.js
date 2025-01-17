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
			KAUI.common.gnb();
		},
		gnb : function(){
			var target = $('.gnb-wrap');	
			var gnbMenu = target.find('.menu');
			
			$WIN.scroll(function() { 
				var scrlTop = $(window).scrollTop();

				if(scrlTop > 0) {
					if(!target.hasClass('on')) {
						target.addClass('on');
					}
				} else if(scrlTop == 0){
					target.removeClass('on');
				}				
		   });	
		   KAUI.common.scrollLinks(gnbMenu);	   
		},
		scrollLinks : function(v){
			var $t = v,
				$parent = $t.find('li'),
				$links = $parent.find('a'),
				$onText = '현재선택';		
			
			// $links.attr('aria-selected',false);
			// $parent.each(function() {
			// 	if($(this).hasClass('active')) {
			// 		$(this).find('a').attr({ 'title': $onText, 'aria-selected': true })
			// 	}
			// });			

			$links.off('click.scrollLinks').on('click.scrollLinks', function(e){
				e.preventDefault();
				var $this = $(this);
				// $links.removeClass('active').find('a').attr({'aria-selected': false });
				// $this.removeAttr('title');
				// if(!$this.hasClass('active')) {						
				// 	$this.addClass('active').find('a').attr({ 'title': $onText, 'aria-selected': true });
				// } else {
				// 	$this.removeClass('active').find('a').attr({'aria-selected': false });
				// 	$this.removeAttr('title');
				// }
				pageScroll($this.attr('href'), ['.gnb .menu']);	
			
			});
		}
	}

	//기본실행
	doc.addEventListener("DOMContentLoaded", function(){
		KAUI.common.init();

		
	});	
	
})(window, document);

var scrollStatus = {
	clickTarget: null,
	pageEndClick: false,
	pageEndScroll: false
}

// 객체의 offset().top 구하기
$.fn.positionInfo = function() {
	return $(this).offset().top;
}

// page scroll
var pageScroll = function(v,exc) {	
	var $win = $win = $('html, body'),
		str = v.split('#')[1],
		$top = $(v).positionInfo(),
		//$top,	
		$excH = 0,
		$wH = $(window).height(),
		$sT = 0,
		$dH = $(document).innerHeight(),		
		status = false;

	exc.forEach(function(obj, index) {
		$excH += $(obj).innerHeight();
	});

	//console.log($top);
	
	$win.animate({ scrollTop: $top - $excH }, 300);	
	
}






