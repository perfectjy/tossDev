$(function () {

	if($('.g_project').length){
		var $current = $('.g_project .current').text();
		$('.g_project li').each(function(){
			var $txt = $(this).text();
			if($current == $txt)$(this).addClass('active');
		})
	}
	
	var $projectSelect = $('.g_project .current'), 
		$document = $(document),
		$currentName = $('nav a[href^="' + location.pathname.split("/")[5] + '"]');
		$currentTile = $currentName.text(),
		$codeView = $('.g_guide_info .code_view'),
		$codeViewTarget = $('.g_guide_info .code_view h4 a');

    $currentName.closest('li').addClass('active').parents('li').addClass('active');// 현재 메뉴 활성화
	//$('.g_content>h2').text($currentTile);// 현재 타이틀
	$projectSelect.on('click', function(e) {
		e.preventDefault();
		$(this).toggleClass('active').next('.g_list').toggle();
	});
	$document.on('click', function(e) {
		var a = e.target;
		if($(a).closest('.g_project').length === 0) {
			$('.g_project .current').removeClass('active').next('.g_list').hide();
		 }
	});
	if($('.code').length > 0){
		SyntaxHighlighter.all();
	}
	$codeViewTarget.on('click', function() {
		var $this = $(this).closest('.code_view');
		if (!$this.hasClass('active')){
			$codeView.removeClass('active');
			$this.addClass('active');
		} else {
			$this.removeClass('active');
		}
	});

	// Status Count	
	$('.g_content tbody .c_date').each(function(){
		if(!$.trim($(this).html())==''){
			$(this).parent('tr').addClass('complete');
		}
	})
	$('.g_content tbody .m_date').each(function(){
		if(!$.trim($(this).html())==''){
			$(this).parent('tr').addClass('modify');
		}
	});
	$('.g_board_panel').each(function(){
		var $this = $(this),
			$no = $this.find('table .no'),
			$delNo = $this.find('table .delete'),
			pageNum = $no.length - $delNo.length;			
		
		var $noIdx = 1;
		$this.find('tbody tr').each(function(){
			if($(this).find('.no').length){
				$(this).find('.no').text($noIdx);
				$noIdx++;
			}
		});
		
		var completeNum = $this.find('.complete').length - $this.find('.delete.complete').length,
			per;
			
		if (completeNum > 0) {
			per = Math.round((100/pageNum)*completeNum);
		} else {
			per = '0';
		}			
			
		$this.find('.total .num').text(pageNum);
		$this.find('.cp_num .num').text(completeNum);
		$this.find('.ing .num').text(per);
	});

	var totalPageNum = $('table .no').length - $('table .delete').length,
		completeTotalNum = $('table .complete').length - $('table .delete.complete').length,
		perTotal = Math.round((100/totalPageNum)*completeTotalNum);

	$('.g_project_status .total .num').text(totalPageNum);
	$('.g_project_status .cp_num .num').text(completeTotalNum);
	$('.g_project_status .ing .num').text(perTotal);

	// Tab
	var g_board_tab = function(){
		var $tab = $('.g_board_tab ul li'), $tabCurrent = $('.g_board_tab ul li.active'), $panel = $('.g_board_panel');
		$('#'+$tabCurrent.attr('rel')).addClass('active')
		$tab.on('click', function(e){
			e.preventDefault();
			var $this = $(this), panelID = $this.attr('rel'), $scrollTop = $(window).scrollTop();
			$this.addClass('active').siblings('li').removeClass('active');
			$('#'+panelID).addClass('active').siblings('.g_board_panel').removeClass('active');

			location.hash = panelID;
			$(window).scrollTop($scrollTop);
		});
		var $hash = location.hash;
		if(!!$hash){
			$tab.each(function(){
				var $rel = $(this).attr('rel');
				if($rel == $hash.substring(1)){
					$(this).addClass('active').siblings().removeClass('active');
					$('#'+$rel).addClass('active').siblings('.g_board_panel').removeClass('active');
				}
			});
		}else{
			$tab.eq(0).addClass('active');
			$panel.eq(0).addClass('active');
		};
	}
	g_board_tab();
	
	// swiper Tab
	var tabSwiper = '';
	var tabSlide = function(){
		var $tab = $('.g_board_tab');
		if($tab.length > 0){
			tabSwiper = new Swiper('.g_board_tab', {
				slidesPerView: 'auto',
				freeMode: true
			});
			$('.g_board_tab .swiper-slide').on('click', function(e){
				var $this = $(this),
					gnbWidth = $tab.width(),
					offset = $this.width()+$this.offset().left,
					$slideItems = $this,
					myIndex = $this.index();
				if(gnbWidth < offset){
					tabSwiper.slideNext();
				} else {
					tabSwiper.slideTo(myIndex-1);
				}
			});
			
			$(window).on('load',function(){
				tabSwiper.update();
			});
		}
	}
	tabSlide();

	//id랑 주소가 같으면 알아서 붙게
	$('.g_board td.id').each(function(){
		var _a = $(this).find('a'),
			_href = _a.attr('href'),
			_txt = _a.text();
		
		if(!!_href && _href != '#'){
			if(_href.indexOf('.html') == -1){
				_a.attr('href',_href+_txt+'.html');
			}
		}else{
			console.log(_href);
			_a.css({'text-decoration':'none'});
		}
	});

	//작업일자 셀렉트
	$('.g_board').each(function(){
		var _this = $(this);
		var dayArry = [];
		var dayArry2 = [];
		$(this).find('tbody td.c_date').each(function(){
			var _txt = $(this).text();
			if(!!_txt){
				var _txt2 = parseInt(_txt.split('-').join(''));
				var _class = 'c_'+_txt2;
				$(this).closest('tr').addClass(_class);
				if(dayArry.indexOf(_txt2) == -1){
					dayArry.push(_txt2);
				}
			}
		});
		dayArry.sort(function(a,b){
			return a - b;
		})

		$(this).find('tbody td.m_date').each(function(){
			var _txt3 = $(this).text();
			if(!!_txt3){
				var _txt4 = parseInt(_txt3.split('-').join(''));
				var _class2 = 'm_'+_txt4;
				$(this).closest('tr').addClass(_class2);
				if(dayArry2.indexOf(_txt4) == -1){
					dayArry2.push(_txt4);
				}
			}
		});		
		dayArry2.sort(function(a,b){
			return a - b;
		})

		var $select = $(this).find('thead th.c_date select');
		if($select.length){
			for(var i in dayArry){
				var opt = dayArry[i];
				//var optTxt = opt.substr(0, 4) + '-' + opt.substr(4, 2) + '-' + opt.substr(6, 2);
				$select.append('<option val="'+opt+'">'+opt+'</option>')
			}
		}
		var $select2 = $(this).find('thead th.m_date select');
		if($select2.length){
			for(var j in dayArry2){
				var opt2 = dayArry2[j];				
				//var optTxt = opt.substr(0, 4) + '-' + opt.substr(4, 2) + '-' + opt.substr(6, 2);
				$select2.append('<option val="'+opt2+'">'+opt2+'</option>')
			}
		}
		
		var _isMouseDown = false,
			_startX = '',
			_scrollLeft = '',
			_scrollChkHtml = '<div class="g_board_scroll"><div></div></div>';
		if(!_this.next('.g_board_scroll').length)_this.after(_scrollChkHtml);
		_this.on('mousedown',function(e){
			var _scrollWidth = _this.get(0).scrollWidth,
				_thisWidth = _this.width();
			if((_scrollWidth-_thisWidth) > 0){
				_isMouseDown = true;
				_this.addClass('catching');
				_startX = e.pageX - _this.offset().left;
				_scrollLeft = _this.scrollLeft();
			}
		});
		_this.on('mouseup',function(e){
			_isMouseDown = false;
			_this.removeClass('catching');
		});
		_this.on('mouseeleave',function(e){
			_isMouseDown = false;
			_this.removeClass('catching');
		});
		_this.on('mousemove',function(e){
			if(!_isMouseDown) return;
			e.preventDefault();
			var _x = e.pageX - _this.offset().left;
			var _walk = (_x - _startX);
			var _scroll = _scrollLeft - _walk; 
			_this.scrollLeft(_scroll);
		});
		
		var catchChk = function(){
			var _sclWid = _this.get(0).scrollWidth - _this.width(),
				_thisLeft = _this.scrollLeft();
			if(_sclWid > 0){
				_this.addClass('catch');
			}else{
				_this.removeClass('catch');
			}
			
			return (_thisLeft/_sclWid)*100;
		}
		catchChk();
		_this.on('scroll resize',function(e){
			var _tar = _this.next('.g_board_scroll').find('>div');
			var _per = catchChk();
			_tar.css('width',_per+'%');
		});
	});
	$('.g_board thead th select').change(function(){
		var $thead = $(this).closest('thead'),
			$cVal = $thead.find('.c_date select').val(),
			$mVal = $thead.find('.m_date select').val(),
			$tbody = $(this).closest('.g_board').find('tbody');
		if($cVal == '' && $mVal==''){
			$tbody.find('tr').removeAttr('style');
		}else if($cVal != '' && $mVal !=''){
			$tbody.find('tr').not('.hr').hide();
			$tbody.find('.c_'+ $cVal+'.m_'+ $mVal).show();
		}else{
			$tbody.find('tr').not('.hr').hide();
			if($cVal != '')$tbody.find('.c_'+ $cVal).show();
			if($mVal != '')$tbody.find('.m_'+ $mVal).show();
		}
	});
	$(window).resize();
});
	
$.extend($.expr[":"], {
	"containsIN" : function(elem, i, match, array) {
		return (elem.textContent || elem.innerText || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
	}
});

jQuery.fn.highlight = function(pat) {
 function innerHighlight(node, pat) {
  var skip = 0;
  if (node.nodeType == 3) {
   var pos = node.data.toUpperCase().indexOf(pat);
   if (pos >= 0) {
	var spannode = document.createElement('span');
	spannode.className = 'highlight';
	var middlebit = node.splitText(pos);
	var endbit = middlebit.splitText(pat.length);
	var middleclone = middlebit.cloneNode(true);
	spannode.appendChild(middleclone);
	middlebit.parentNode.replaceChild(spannode, middlebit);
	skip = 1;
   }
  }
  else if (node.nodeType == 1 && node.childNodes && !/(script|style)/i.test(node.tagName)) {
   for (var i = 0; i < node.childNodes.length; ++i) {
	i += innerHighlight(node.childNodes[i], pat);
   }
  }
  return skip;
 }
 return this.each(function() {
  innerHighlight(this, pat.toUpperCase());
 });
};

jQuery.fn.removeHighlight = function() {
	function newNormalize(node) {
		for (var i = 0, children = node.childNodes, nodeCount = children.length; i < nodeCount; i++) {
			var child = children[i];
			if (child.nodeType == 1) {
				newNormalize(child);
				continue;
			}
			if (child.nodeType != 3) { continue; }
			var next = child.nextSibling;
			if (next == null || next.nodeType != 3) { continue; }
			var combined_text = child.nodeValue + next.nodeValue;
			new_node = node.ownerDocument.createTextNode(combined_text);
			node.insertBefore(new_node, child);
			node.removeChild(child);
			node.removeChild(next);
			i--;
			nodeCount--;
		}
	}
	return this.find("span.highlight").each(function() {
		var thisParent = this.parentNode;
		thisParent.replaceChild(this.firstChild, this);
		newNormalize(thisParent);
	}).end();
};