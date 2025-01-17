var $headerHtml = ''
    +'<div class="g_util">'
        +'<h1><a href="/pub_guide/index.html"><img src="../resource/images/logo.jpg" alt="키움자산운용 가이드" /></a></h1>'
        +'<div class="g_project">'
            // +'<a target="_blank" href="https://www.figma.com/proto/QSJoSmOJKtmFCkHv1NTN47/%5B%EC%A0%9C%EC%95%88%5D-%ED%82%A4%EC%9B%80%ED%88%AC%EC%9E%90%EC%9E%90%EC%82%B0%EC%9A%B4%EC%9A%A9?node-id=55%3A4885&scaling=min-zoom" class="btn_fig">피그마 바로가기</a>'
            +'<a target="_blank" href="https://www.figma.com" class="btn_fig">피그마 바로가기</a>'
            +'<a target="_blank" href="https://flow.team/" class="btn_flow">플로우 바로가기</a>'
        +'</div>'
        +'<button type="button" class="btn_nav"><span>메뉴</span></button>'
    +'</div>'
    +'<nav><div class="g_nav"></div></nav>';

    var $naviHtmlPC = ''
    +'<ul>'
        +'<li><a href="../../../pub_guide/pc/kiam_pc.html"><span>Status Board</span></a>'
            +'<div class="subMenu">'
                +'<ul>'
                    +'<li><a href="../../../pub_guide/pc/kiam_pc.html">자산운용 PC</a></li>'    
                    +'<li><a href="../../../pub_guide/pc/kiam_mo.html">자산운용 MO</a></li>'
                    +'<li><a href="../../../pub_guide/pc/kosef_pc.html">KOSEF PC</a></li>'
                    +'<li><a href="../../../pub_guide/pc/kosef_mo.html">KOSEF MO</a></li>'
                    +'<li><a href="../../../pub_guide/pc/admin_list.html">관리자</a></li>'
                +'</ul>'
            +'</div>'
            +'</li>'        
        +'<li><a href="#"><span>Rules</span></a>'
            +'<div class="subMenu">'
                +'<ul>'
                    +'<li><a href="../../../pub_guide/pc/html.html">HTML</a></li>'    
                    +'<li><a href="../../../pub_guide/pc/font.html">Font</a></li>'
                    +'<li><a href="../../../pub_guide/pc/color.html">Color</a></li>'
                +'</ul>'
            +'</div>'
        +'</li>'
        +'<li><a href="../pc/layout.html"><span>Layout</span></a></li>'
        +'<li><a href="../pc/directory.html"><span>Directory</span></a></li>'
        +'<li><a href="#"><span>Patterns</span></a>'
            +'<div class="subMenu">'
                +'<ul>'                   
                    +'<li><a href="../../../pub_guide/pc/Flag.html">Flag</a></li>'
                    +'<li><a href="../../../pub_guide/pc/button.html">Button</a></li>'
                    +'<li><a href="../../../pub_guide/pc/form.html">Form</a></li>'
                    +'<li><a href="../../../pub_guide/pc/table.html">Table</a></li>'
                    +'<li><a href="../../../pub_guide/pc/tab.html">Tab</a></li>'
                    +'<li><a href="../../../pub_guide/pc/list.html">List</a></li>'
                    +'<li><a href="../../../pub_guide/pc/modal.html">Modal</a></li>'
                    +'<li><a href="../../../pub_guide/pc/accordion.html">Accordion</a></li>'
                    // +'<li><a href="../../../pub_guide/pc/tooltip.html">ToolTip</a></li>'
                    +'<li><a href="../../../pub_guide/pc/etc.html">Etc</a></li>'
                +'</ul>'
            +'</div>'
        +'</li>'
        +'<li><a href="../pc/wha.html">WAH가이드라인</a></li>'
    +'</ul>';

    var $naviHtmlMO = ''
    +'<ul>'
        +'<li><a href="../pc/www.html"><span>Status Board</span></a>'
            +'<div class="subMenu">'
                +'<ul>'
                    +'<li><a href="../../../pub_guide/pc/kiam_pc.html">자산운용 PC</a></li>'    
                    +'<li><a href="../../../pub_guide/mobile/kiam_mo.html">자산운용 MO</a></li>'
                    +'<li><a href="../../../pub_guide/pc/kosef_pc.html">KOSEF PC</a></li>'
                    +'<li><a href="../../../pub_guide/mobile/kosef_mo.html">KOSEF MO</a></li>'
                    +'<li><a href="../../../pub_guide/pc/admin_list.html">관리자</a></li>'
                +'</ul>'
            +'</div>'
            +'</li>'        
        +'<li><a href="#"><span>Rules</span></a>'
            +'<div class="subMenu">'
                +'<ul>'
                    +'<li><a href="../../../pub_guide/pc/html.html">HTML</a></li>'    
                    +'<li><a href="../../../pub_guide/pc/font.html">Font</a></li>'
                    +'<li><a href="../../../pub_guide/pc/color.html">Color</a></li>'
                +'</ul>'
            +'</div>'
        +'</li>'
        +'<li><a href="../pc/layout.html"><span>Layout</span></a></li>'
        +'<li><a href="../pc/directory.html"><span>Directory</span></a></li>'
        +'<li><a href="#"><span>Patterns</span></a>'
        +'<div class="subMenu">'
        +'<ul>'                   
            +'<li><a href="../../../pub_guide/mobile/Flag.html">Flag</a></li>'
            +'<li><a href="../../../pub_guide/mobile/button.html">Button</a></li>'
            +'<li><a href="../../../pub_guide/mobile/form.html">Form</a></li>'
            +'<li><a href="../../../pub_guide/mobile/table.html">Table</a></li>'
            +'<li><a href="../../../pub_guide/mobile/tab.html">Tab</a></li>'
            +'<li><a href="../../../pub_guide/mobile/list.html">List</a></li>'
            +'<li><a href="../../../pub_guide/mobile/modal.html">Modal</a></li>'
            +'<li><a href="../../../pub_guide/mobile/accordion.html">Accordion</a></li>'
            // +'<li><a href="../../../pub_guide/mobile/tooltip.html">ToolTip</a></li>'
            +'<li><a href="../../../pub_guide/mobile/etc.html">Etc</a></li>'
        +'</ul>'
    +'</div>'
        +'</li>'
        +'<li><a href="../pc/wha.html">WAH가이드라인</a></li>'
    +'</ul>';

   

$(function () {
    gnb.init();
    gnbNav.init();
    gnbNav.scroll();
    
    if($('#patternCategory').length) { 
        $("#patternCategory").on("change", function(){  
            var pathname = location.pathname;       
            var link = $(this).val();    
            if(pathname.indexOf('/pc/') > 0){
                location.replace('/pub_guide/mo/' + link + '.html'); 
            } else if(pathname.indexOf('/mobile/') > 0){ 
                location.replace('/pub_guide/pc/' + link + '.html'); 
            }
        });
    }

});

var gnb = {
    init: function () {
        if($('#gHeader').length) $('#gHeader').html($headerHtml);
        if($('.g_nav').length){
            gnb.type();
            gnb.current();     
        }          
    },
    current: function () {
        $('.g_nav a').each(function(){
            var $pathname = location.pathname,
                $urlName = $pathname.split('/').pop();
            var $this = $(this),
                $href = $this.attr('href').split('/').pop();
            if($urlName == $href)$(this).parents('li').addClass('current');
        }); 
    },
    type:function() {
        var $pathname = location.pathname;
        if($pathname.indexOf('/pc/') > 0){
            $('.g_nav').html($naviHtmlPC);
            if($('.g_project').length)$('.g_project .current').text('PC');
        }else if($pathname.indexOf('/mobile/') > 0){
            $('.g_nav').html($naviHtmlMO);
            if($('.g_project').length)$('.g_project .current').text('Mobile');
        }else if($pathname.indexOf('/admin/') > 0){
            $('.g_nav').html($naviHtmlAdmin);
            if($('.g_project').length)$('.g_project .current').text('Admin');
        }else{
            $('.g_nav').remove();
        }
        
        if($('.g_project').length){
            var $current = $('.g_project .current').text();
            $('.g_project li').each(function(){
                var $txt = $(this).text();
                if($current == $txt)$(this).addClass('active');
            })
        }     
    }
}


var gnbNav = {
    init: function () {
		var nav= $('.g_nav'),
		menu= $('.g_nav>ul>li'),
		subMenu= $('.g_nav .subMenu');

		var $current = nav.find('.current');
		var $openDep1 = '';
		
		menu.on('mouseover focusin', function (e){
			var $this = $(this);
			if(e.type == 'mouseover'){
				gnbNav.open($this,100);
			}else{
				gnbNav.open($this);
			}
			$openDep1 = $this;
			
		}).on('mouseout focusout', function (e){
			if(e.type == 'mouseout'){
				gnbNav.close(100);
			}else{
				gnbNav.close(10);
			}
		});
    },
    open : function(target,time){
		clearTimeout(gnbNav.closeTimeout);
		var openInit = function(){
			var $subMenu = $(target).find('.subMenu');
			$(target).children('a').addClass('active').closest('li').siblings().find('a').removeClass('active');
			$(target).siblings().find('.subMenu').removeAttr('style').removeClass('active');
			gnbNav.tabTimeout = setTimeout(function(){
				$subMenu.stop(true,false).fadeIn(200).addClass('active');
			},100);			
		};

		if(!!time){
			gnbNav.openTimeout = setTimeout(function() {
				openInit();
			}, time);
		}else{
			openInit();
		}
	},
    close: function (time) {
		clearTimeout(gnbNav.openTimeout);
		var closeInit = function(){
			$('.g_nav>ul>li').children('a').attr('aria-expanded','false').removeClass('active');
			$('.g_nav .subMenu').removeClass('active').removeAttr('style');
			var $current = $('.g_nav').find('.current');
		};
		if(!!time){
			gnbNav.closeTimeout = setTimeout(function(){
				closeInit();
			},time)
		}else{
			closeInit();
		}
	},
    scroll: function() {
        var $window = $(window),
		$wrap = $('#gWrap'),
		$header = $('#gHeader'),
		$target = $('.g_content');
        
        $window.on('scroll', function() {
            var scrollPos = $(this).scrollTop(), headerHeight = $header.outerHeight();
            
            if (headerHeight < scrollPos) {
                $wrap.addClass('fixed');           
            } else {
                $wrap.removeClass('fixed');           
            }
            
        });
    }
}

