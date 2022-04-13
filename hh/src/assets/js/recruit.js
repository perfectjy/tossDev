/**********************************************************************************************************
 * imports
 **********************************************************************************************************/
document.write('<script type="text/javascript" charset="utf-8" src="/src/assets/js/modernizr-latest.js"><'+'/script>'); // common-gnb

/***********************************************************************************************************
 *
 * COMMON-HEADER
 *
 ***********************************************************************************************************/
var CommonHeader=function(){
	this._gnb=null;
	this._flyout=null;
	this._focus=(typeof(_focus)!='undefined')?_focus:-1;

	this.init.apply(this, arguments);
};


CommonHeader.prototype={
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// INITIALIZE
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	init:function(){
		this.build();
	},

	build:function(){
		switch(_type_gnb){
			case 'HI-PLANER':
				this.buildGNB();
				break;

			case 'ENG':
				this.buildGNB();
				break;

			default:
				this.buildGNB();
				this.buildFlyout();
				break;
		}
	},


	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// METHOD:GNB
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	buildGNB:function(){
		var properties={'focus':this._focus};
		var gnb=new CommonGNB($('*[data-role=container-gnb]'), properties); this._gnb=gnb;
	},


	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// METHOD:FLYOUT
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	buildFlyout:function(){
		var flyout=new CommonFlyout($('div[data-role=container-gnb-all]'), $('span[data-role=btn-gnb-all]')); this._flyout=flyout;

		flyout._cb_open=Delegate.create(this, function(){this._gnb.close();});
	}
};









/***********************************************************************************************************
 *
 * COMMON-GNB
 * @param {Object} scope
 *
 ***********************************************************************************************************/
var CommonGNB=function(scope, properties){
	this._scope=scope;

	this._properties=properties;
	this._focus={'save':null, 'current':null};
	this._mouse={'x':null, 'y':null};
	this._isopen=false;

	this.init.apply(this, arguments);
};


CommonGNB.prototype={
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// INITIALIZE
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	init:function(){
		this._focus.save=this._focus.current=this._properties.focus;

		this.build();
		this.focus(this._focus.save);
	},


	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// METHOD:PARAMS
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	get_innerarea:function(e){
		try{
			var x=e.pageX
			var y=e.pageY;
			var miny=$(this._scope).offset().top;
			var target;//=(this._focus.current!=-1)?$(this._scope).find('div.lay-gnb:eq('+this._focus.current+')'):$(this._scope);

			switch(_type_gnb){
				case '':
					target=$(this._scope).find('div.lay-gnb:eq('+this._focus.current+')');
					break;

				default:
					target=$(this._scope).parent().find('div.lay-gnb');
					break;
			}
			target=(this._focus.current==-1)?$(this._scope):target;

			var maxy=$(target).offset().top+$(target).height();

			return (y>=miny && y<=maxy)?true:false;
		}catch(e){
			return false;
		}
	},

	set_mouse_position:function(e){
		this._mouse.x=e.pageX;
		this._mouse.y=e.pageY;
	},


	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// METHOD:BUILD
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	build:function(){
		var owner=this;
		var cname=(_type_gnb=='HI-PLANER')?'>dl':'>li';
		var atotal=$(this._scope).find(cname).length;

		$(this._scope).find(cname).each(function(a){
			var alasta=$(this).find('a:last');

			// 한화면에 모든 메뉴가 보이는 것들에 대한 추가 이벤트
			if(_type_gnb!=''){
				$(alasta)
				.data('n', a)
				.bind('keyup', function(e){
					if(e.shiftKey && e.keyCode===9){
						owner.open($(this).data('n'));
					}
				});
			}

			$(this).find('a:eq(0)')
			.data('n', a)
			.data('isfirst', (a==0)?true:false)
			.data('islast', (a==atotal-1)?true:false)
			.data('lasta', alasta)
			.bind({
				'mouseenter':function(e){
					var n=$(this).data('n');
					owner.open(n);
				},

				'keydown':function(e){
					if($(this).data('isfirst') && e.shiftKey && e.keyCode===9){
						owner.close();
					}
				},

				'keyup':function(e){
					if(e.keyCode===9){
						var n=$(this).data('n');
						var isshow=(owner._focus.current!=n)?false:true;
						owner.open(n);

						if(e.shiftKey && !isshow){
							//$($(this).data('lasta')).focus(); // 대메뉴변경시 해당 마지막 메뉴에 포커스
						}
					}
				}
			});
		});

		// 마지막링크가 끊기는 순간 창 닫기(tab)
		var lasta;
		lasta=$(this._scope).find('a:last');
		$(lasta).bind('keydown', function(e){
			setTimeout(function(){
				if(!e.shiftKey && e.keyCode===9) owner.close(); // ie-browser-focus-missing 방지
			}, 10);
		});

		$(document).bind('mousemove', function(e){
			if(!owner.get_innerarea(e) && owner._focus.current!=-1 && owner._isopen){
				if(owner._mouse.x!=e.pageX || owner._mouse.y!=e.pageY){ // ie-event-bug : 탭이동시 mousemove 이벤트 발생되는 오류
					owner.close();
				}
			}
			owner.set_mouse_position(e);
		});
	},


	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// METHOD:OPERATION
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	focus:function(n){
		var cname=(_type_gnb=='HI-PLANER')?'>dl':'>li';

		$(this._scope).find(cname).each(function(a){
			var bool=(a==n)?true:false;

			// 1. change-image
			var url=String($(this).find('img:eq(0)').attr('src'));
			url=(bool)?url.replace('_off.', '_on.'):url.replace('_on.', '_off.');
			$(this).find('img:eq(0)').attr('src', url);

			// 2. change-class
			if(bool) $(this).addClass('on'); else $(this).removeAttr('class');

			// 3. change-class(not-main)
			if(_type_gnb!=''){
				if(bool) $(this).find('dt').attr('class', 'on'); else $(this).find('dt').removeAttr('class');
			}
		});
	},

	open:function(n){
		this._isopen=true;
		this._focus.current=n;

		this.focus(n);
		this.show(true, n);
	},

	close:function(){
		this._isopen=false;
		this._focus.current=-1;

		this.focus(this._focus.save);
		this.show(false, -1);
	},

	show:function(bool, n){
		switch(_type_gnb){
			case '':
				$(this._scope).find('div.lay-gnb').each(function(a){
					if(a==n) $(this).show(); else $(this).hide();
				});
				break;

			case 'HI-PLANER':
				if(bool){
					$(this._scope).parent().find('div.lay-gnb').show();
				}else{
					$(this._scope).parent().find('div.lay-gnb').hide();
				}

				$(this._scope).find('>dl').each(function(a){
					if(bool) $(this).find('dd').show(); else $(this).find('dd').hide();
				});
				break;

			default:
				if(bool){
					$(this._scope).parent().find('div.lay-gnb').show();
				}else{
					$(this._scope).parent().find('div.lay-gnb').hide();
				}

				$(this._scope).find('>li').each(function(a){
					if(bool) $(this).find('dl').show(); else $(this).find('dl').hide();
				});
				break;
		}
	}
};









/***********************************************************************************************************
 *
 * COMMON-FLYOUT
 * @param {Object} scope
 *
 ***********************************************************************************************************/
var CommonFlyout=function(scope, btn){
	this._scope=scope;
	this._btn=btn;
	this._contents=null;

	this._focus=null;
	this._cb_open;

	this.init.apply(this, arguments);
};


CommonFlyout.prototype={
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// INITIALIZE
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	init:function(){
		this._contents=$(this._scope).find('div[data-role=contents-gnb-all]');

		this.build();
	},


	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// METHOD:PARAMS
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	get_focus_position:function(){
		var n=0;
		$(this._contents).find('h2').each(function(a){
			var pos=$(this).position();
			if(pos.top<220) n=a;
		});

		// 스크롤이 바닥에 닿았을 때 마지막 항목으로 강제 변경
		if(this.is_end_scroll()) n=$(this._contents).find('h2').length-1;
		return n;
	},

	is_end_scroll:function(){
		var total=Number($(this._contents)[0].scrollHeight);
		var current=Number($(this._contents).height())+Number($(this._contents).scrollTop());

		return (total<=current)?true:false;
	},


	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// METHOD:BUILD
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	build:function(){
		var owner=this;
		// 1. menu
		$(this._scope).find('span').each(function(a){
			$(this).find('a')
			.data('n', a)
			.bind('click focusin', function(e){
				var n=$(this).data('n');
				//owner.focus(n);
				owner.transition(n, 'slow');
			});

			if(a==0){
				$(this).find('a:first').bind('keydown', function(e){
					if(e.shiftKey && e.keyCode===9){
						//owner.close();
						setTimeout(function(){
							$('a.close')
							//.css({'border':'1px solid #00ff00'})
							.focus();
						}, 10);
					}
				});
			}
		});

		// 2. btn-open
		$(this._btn).bind({
			'click':function(e){
				owner._cb_open();
				owner.open(e);
				$(owner._scope).find('span:eq(0) a:eq(0)').focus();
			}
		});

		// 3. btn-close
		$(this._scope).find('a.close').bind({
			'mousedown':function(e){
				owner.close();
			},

			'keydown':function(e){
				if(e.keyCode===13){
					owner.close();
						setTimeout(function(){
						// $(owner._btn).focus();
						$('.bt-all>a.open').focus(); // GNB 닫히면 GNB열림 버튼으로 포커스(접근성 /1906)
						}, 10);
					}
				}
		});

		// 4. event-scroll
		$(this._contents).bind('scroll', function(e){
			owner.focus(owner.get_focus_position());
		});
	},


	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// METHOD:TRANSITION
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	transition:function(n, time){
		if(this._focus!=n){
			this._focus=n;

			$(this._contents).stop();

			var pos=$(this._contents).find('h2:eq('+n+')').position();
			var ty=pos.top+$(this._contents).scrollTop()-(38)-((n==0)?25:0);//+37);
			$(this._contents).animate({'scrollTop':ty}, time);
		}
	},


	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// METHOD:OPERATION
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	focus:function(n){
		$(this._scope).find('span').each(function(a){
			var bool=(a==n)?true:false;

			// 1. change-image
			var url=String($(this).find('img:eq(0)').attr('src'));
			url=(bool)?url.replace('off.gif', 'on.gif'):url.replace('on.gif', 'off.gif');
			$(this).find('img:eq(0)').attr('src', url);

			// 2. change-class
			if(bool) $(this).addClass('on'); else $(this).removeAttr('class');
		});
	},

	open:function(e){
		this.focus(0);
		this.transition(0);
		this.show(true);
	},

	close:function(){
		this._focus=null;
		this.show(false);
	},

	show:function(bool){
		if(bool) $(this._scope).show(); else $(this._scope).hide();
	}
};










//document.write('<script type="text/javascript" charset="utf-8" src="/js/common.footer.js?cb='+get_random()+'" ><'+'/script>'); // common-gnb

/***********************************************************************************************************
 *
 * COMMON-FOOTER
 *
 ***********************************************************************************************************/
var CommonFooter=function(){
	this._scope=null;
	this._isopen=false;

	this.init.apply(this, arguments);
};


CommonFooter.prototype={
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// INITIALIZE
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	init:function(){
		if(_type_gnb=='') this.build();
	},


	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// METHOD:BUILD
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	build:function(){
		var owner=this;

		this._scope=$('div[data-role=footer]');

		// 1. toggle
		$(this._scope).find('dt a').each(function(a){
			$(this).bind('click', function(e){
				owner.toggle();
			});
		});
	},


	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// METHOD:TRANSFORM
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	move:function(){
		var h=$(document).height()-$(window).height();
		h=(h<=0)?0:h;

		$(document).scrollTop(h);
	},


	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// METHOD:OPERATION
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	toggle:function(){
		this._isopen=!this._isopen;

		if(this._isopen){
			this.show(true);
			this.move();
		}else{
			this.show(false);
		}
	},

	show:function(bool){
		$(this._scope).attr('class', (bool)?'open':'close');

		if(bool) $(this._scope).find('dt').attr('class', 'on'); else $(this._scope).find('dt').removeAttr('class');

		$(this._scope).find('dd').each(function(a){
			if(bool) $(this).show(); else $(this).hide();
		});
	}
};



/*
var CommonFooter=function(){
	this._scope=null;

	this._mouse={'x':null, 'y':null};
	this._isenter=false;
	this._isshow=false;

	this.init.apply(this, arguments);
};

CommonFooter.prototype={
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// INITIALIZE
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	init:function(){
		if(_type_gnb==''){
			this._scope=$('div[data-role=footer]');

			this.build();
		}
	},


	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// METHOD:PARAMS
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	is_collision:function(e){
		var bool;
		try{
			var cx=e.pageX;
			var sx=$(this._scope).find('dl').offset().left;
			var w=$(this._scope).find('dl').width();

			var cy=e.pageY;
			var sy=$(this._scope).offset().top-30;
			var h=$(this._scope).height()+30 || 0; h=(h==0)?30:h;

			bool=((cx>=sx && cx<=(sx+w)) && (cy>=sy && cy<=sy+h))?true:false;
		}catch(e){
			bool=false;
		}
		return bool;
	},

	set_mouse_position:function(e){
		this._mouse.x=e.pageX;
		this._mouse.y=e.pageY;
	},


	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// METHOD:BUILD
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	build:function(){
		var owner=this;

		// 1-1. event-focus-in (first)
		$(this._scope).find('a:first').bind({
			'focusin':function(e){
				owner.show(true);
				owner.move_bottom();
			},

			'keydown':function(e){
				if(e.shiftKey && e.keyCode===9) owner.show(false);
			}
		});

		// 1-2. event-focus-in (last)
		$(this._scope).find('dt:last a').bind('focusin', function(e){
			if(!owner._isshow){
				owner.show(true);
				owner.move_bottom();

				$(owner._scope).find('a:last').focus();
			}
		});

		// 2. event-focus-out
		$(this._scope).find('a:last').bind({
			'focusout':function(e){
				//owner.show(false);
			}
			'keydown':function(e){
				if(e.keyCode===9 && !e.shiftKey) owner.show(false);
			}
		});


		// 3. event-mouse-enter
		$(document).bind('mousemove', function(e){
			if(owner._mouse.x!=e.pageX || owner._mouse.y!=e.pageY){
				var bool=owner.is_collision(e);

				if(bool){
					owner._isenter=true;
					owner.show(true);
					owner.move_offset();
				}else{
					if(owner._isenter){
						owner._isenter=false;
						owner.show(false);
					}
				}
			}
			owner.set_mouse_position(e);
		});
	},


	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// METHOD:TRANSFORM
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	move_offset:function(){
		var sct=$(document).scrollTop()+$(this._scope).height()+30;
		$(document).scrollTop(sct);
	},

	move_bottom:function(){
		var h=$(document).height()-$(window).height();
		h=(h<=0)?0:h;

		$(document).scrollTop(h);
	},


	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// METHOD:OPERATION
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	show:function(bool){
		$(this._scope).attr('class', (bool)?'open':'close');

		$(this._scope).find('dd').each(function(a){
			if(bool) $(this).show(); else $(this).hide();
		});
		this._isshow=bool;
	}
};
*/









//document.write('<script type="text/javascript" charset="utf-8" src="/js/common.select.js?cb='+get_random()+'"><'+'/script>'); // common-select

/**********************************************************************************************************
 *	common-select
 * css 적용된 <select>에 대한 common-layer
 **********************************************************************************************************/
var CommonSelect=function(){
	this._scope=null;
	this._container=null;
	this._target=null;
	this._listeners=new Array();
	this._focus=null;
	this._isshow=false;
	this._timer=null;

	this.init.apply(this, arguments);
};

CommonSelect.prototype={
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// INITIALIZE
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/**
	 * 초기화
	 */
	init:function(){
		this.build();
		this.close();
	},


	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// METHOD:PARAMS
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/**
	 * 선택되어진 항목 순서 취득
 	 * @param {Object} isoption - 검색형태가 true:<select><option>...</option></select>, false:<ul><li>...</li></ul>
 	 * @return {Number} n (0~)
	 */
	get_position_focus:function(isoption){
		var n=0;

		if(isoption){	// find-select-option
			$(this._target).find('option').each(function(a){
				if($(this).attr('selected')){
					n=a;
				}
			});
		}else{	// find-ul-li
			$(this._container).find('li a').each(function(b){
				if($(this).hasClass('focus')){
					n=b;
				}
			});
		}
		return n;
	},

	/**
	 * 적용 <select> 객체 저장
	 * @param {DOM-select} scope
	 */
	add_listeners:function(scope){
		this._listeners.push(scope);
	},

	/**
	 * <select> 객체에 포커스 여부 판별
	 * document-keyup-event에 대응하기 위해
	 */
	isfocus_listeners:function(){
		var bool=false;
		for(var a in this._listeners){
			if($(this._listeners[a]).is(':focus')){
				 bool=true; break;
			}
		}
		return bool;
	},


	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// METHOD:BUILD
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/**
	 * 구성시작
	 */
	build:function(){
		this.buildScope();
		this.buildContainer();
		this.buildEvent();
	},


	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// METHOD:SCOPE
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/**
	 * 표시객체 구성
	 */
	buildScope:function(){
		var scope=document.createElement('div'); this._scope=scope;

		$(scope)
		.addClass('select-list')
		.css({
			'position':'absolute',
			'left':'0px', 'top':'0px',
			'z-index':'11000',
			'background-color':'#fff'
		})
		.appendTo(document.body);
	},

	/**
	 * 표시객체 사이즈 변경
	 */
	resizeScope:function(){
		var atotal=Math.min($(this._target).find('select option').length || 0, 10);
		var h=(24-3)*atotal+((atotal<=4)?3:1);

		$(this._scope).css({
			'height':h+'px'
		});
	},


	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// METHOD:CONTAINER
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/**
	 * 컨테이너 객체 구성
	 */
	buildContainer:function(){
		var container=document.createElement('ul'); this._container=container;

		$(container).css({
			'position':'relative'
		}).appendTo($(this._scope));
	},


	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// METHOD:LIST
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/**
	 * 컨테이너내 리스트 구성
	 */
	buildLists:function(){
		var owner=this;

		$(this._target).find('select option').each(function(a){
			var ali=document.createElement('li');
			$(ali)
			.data('n', a)
			.data('value', $(this).val())
			.html('<a>'+$(this).text()+'</a>')
			.css({'cursor':'pointer'})
			.bind('click', function(e){
				owner.select($(this).data('n'));
				owner.close(e);
				return false;
			})
			.appendTo($(owner._container));
		});
	},

	/**
	 * 컨테이너내 리스트 삭제
	 */
	removeLists:function(){
		$(this._container).empty();
	},

	/**
	 * 컨테이너내 리스트 포커스
	 * @param {Number} n - 항목 순서 (0~)
	 * @param {Number, String} time - 애나메이션 시간 (0~, 'slow')
	 */
	focusLists:function(n, isfirst){//time){
		$(this._container).find('li a').each(function(a){
			if(n==a)	{$(this).addClass('focus');}
			else			{$(this).removeAttr('class');}
		});

		var owner=this;
		var ty=21*n;
		$(this._scope).scrollTop(ty);
	},

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// METHOD:EVENT
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/**
	 * 이벤트 구성
	 */
	buildEvent:function(){
		var owner=this;
		$(document).bind({
			// 1. 마우스 클릭 시 (영역 밖일 경우 화면 감춤)
			'mousedown':function(e){
				if(owner._isshow){
					var pos=$(owner._scope).offset();
					var w=$(owner._scope).width()+(7+1)*2;
					var h=$(owner._scope).height()+(4+1)*2;
					var x=e.pageX;
					var y=e.pageY;

					if((x>=pos.left && x<=pos.left+w) && (y>=pos.top-30 && y<=pos.top+h)){
						// 영역내 클릭 간주
						$(owner).blur();
					}else{
						owner.close();
					}
				}
			}
		});

		$(this._scope).bind({
			'mousewheel':function(e){ // safari-bug로 인한 mouse-wheel 제한
				if(navigator.userAgent.indexOf('safari') != -1){
					return false;
				}
			}
		})
	},

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// METHOD:TRANSFORM
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/**
	 * 위치 변경
	 */
	position:function(){
		var tx=$(this._target).offset().left;
		var ty=($(this._target).offset().top+$(this._target).height())-($(this._target).data('istable')?2:0);
		var tw=$(this._target).find('.select-box').width();

		$(this._scope)
		.css({
			'left':tx+'px',
			'top':ty+'px',
			'width':tw+'px'
		});
	},

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// METHOD:OPERATION
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/**
	 * 항목 선택
 	 * @param {Object} n - 선택된 항목 순서 (0~)
	 */
	select:function(n){
		$(this._target).find('select option').each(function(a){
			if(n==a)	{$(this).attr('selected', 'selected');}
			else		{$(this).removeAttr('selected');}
		});
		//$(this._target).find('select').focus().trigger('change').blur();
		$(this._target).find('select').trigger('change');
	},

	focus:function(n){
		this.focusLists(n, false);//0);
	},

	/**
	 * 열기
 	 * @param {Object} target - css 적용된 select-container
	 */
	open:function(target){
		if(this._target!=target){
			this._target=target;

			this.removeLists();

			this.show(true);
			this.buildLists();
			this.focusLists(this.get_position_focus(true), true);//'slow');
			this.resizeScope();
			this.position();
		}
	},

	/**
	 * 닫기
	 */
	close:function(e){
		if(e!=null && e.type=='click') $(this._target).blur(); // 마우스 클릭일때만 적용
		this._target=null;

		this.removeLists();
		this.show(false);
	},

	/**
	 * 노출
 	 * @param {Object} bool - true:노출, false:감춤
	 */
	show:function(bool){
		if(bool) $(this._scope).show(); else $(this._scope).hide();
		this._isshow=bool;
	}
};










//document.write('<script type="text/javascript" charset="utf-8" src="/js/common.slider.js?cb='+get_random()+'"><'+'/script>'); // common-slider

/**
 * common-slider
 *
 * data-role : slider
 * data-func ; function(){} - callback 함수지정
 * data-view : 화면에 보이는 갯수(기본값 1)
 * data-step : 슬라이드되는 갯수(기본값 1)
 *
 * @param {Object} scope
 */
var CommonSlider=function(scope){
	this._scope=scope;
	this._container=null;
	this._contents=null;

	this._view=null;
	this._step=null; // 한 번에 이동할 갯수
	this._selects={'max':null, 'focus':null};
	this._counts={'max':null, 'focus':null};

	this._widths={'container':null, 'contents':null, 'step':null};
	this._callback=null;
	this._cb_focus=null;

	this.init.apply(this, arguments);
};

CommonSlider.prototype={
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// INITIALIZE
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/**
	 * 초기화
	 */
	init:function(){
		this._view=$(this._scope).attr('data-view') || 1;
		this._step=$(this._scope).attr('data-step') || 1;
		this._callback=$(this._scope).attr('data-func') || null;

		this._selects.max=$(this._scope).find('ul li').length || 0;
		this._selects.focus=-1;

		var cmax=Math.ceil((this._selects.max-this._view)/this._step); cmax=(cmax<=0)?0:cmax; cmax+=1;
		this._counts.max=cmax;
		this._counts.focus=0;

		this.build();
		this.focus(0);
	},


	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// METHOD:PARAMS
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	get_width:function(scope){
		var w=0;
		w+=Number($(scope).width());
		w+=Number($(scope).css('margin-left').replace(/[^0-9]/g, ''));
		w+=Number($(scope).css('margin-right').replace(/[^0-9]/g, ''));
		w+=Number($(scope).css('border-width').replace(/[^0-9]/g, ''))*2;
		return w;
	},

	get_width_step:function(){
		var child=$(this._contents).find('li:eq(0)');
		var w=this.get_width($(child));
		return w;
	},

	get_height:function(scope){
		var h=0;
		h+=Number($(scope).height());
		h+=Number($(scope).css('margin-top').replace(/[^0-9]/g, ''));
		h+=Number($(scope).css('margin-bottom').replace(/[^0-9]/g, ''));
		h+=Number($(scope).css('border-width').replace(/[^0-9]/g, ''))*2;
		return h;
	},

	get_height_step:function(){
		var child=$(this._contents).find('li:eq(0)');
		var h=this.get_height($(child));
		return w;
	},

	get_distance:function(){
		var d=(this._view-this._selects.max)*this._widths.step;

		return (d>0)?0:d;
		/*
		var w=0;
		w+=this._widths.container;
		w-=this._widths.contents;
		w-=Number($(this._contents).css('margin-left').replace(/[^0-9]/g, ''));
		w-=Number($(this._contents).css('margin-right').replace(/[^0-9]/g, ''));
		return w;*/
	},

	get_total_count:function(){
		return 2;
	},


	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// METHOD:BUILD
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/**
	 * 구성시작
	 */
	build:function(){
		this.buildContainer();
		this.buildContent();
		this.buildNavigation();
	},


	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// METHOD:CONTAINER
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/**
	 * 슬라이드를 위한 컨테이너 생성
	 */
	buildContainer:function(){
		var container=document.createElement('div'); this._container=container;
		var contents=$(this._scope).find('ul'); this._contents=contents;

		var w=this.get_width($(contents)); this._widths.container=w;
		var h=this.get_height_step;//$(contents).height();

		$(container).css({
			'position':'relative',
			'float':'left',
			'width':w+'px',
			'height':h+'px',
			'overflow':'hidden'/*,
			'background-color':'#000099'*/
		})
		.insertBefore($(contents));
	},


	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// METHOD:CONTENT
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/**
	 * 컨텐츠 설정 변경
	 */
	buildContent:function(){
		var owner=this;
		var container=this._container;
		var contents=this._contents;

		$(contents).appendTo($(container));

		var child=$(contents).find('li:eq(0)');
		//var sw=this.get_width($(child))+2; this._widths.step=sw;
		var sw=this.get_width_step(); this._widths.step=sw;
		var tw=(this._selects.max*(sw+2)); this._widths.contents=tw;

		if(this._selects.max>0){
			$(contents).css({
				'position':'relative',
				'width':tw+'px'
			});

			$(contents).find('li').each(function(a){
				$(this).removeClass('on').show();

				if(!$(this).hasClass('blank') && $(this).children().length>0){
					$(this)
					.data('n', a)
					.bind({
						'click':function(e){
							owner.focus($(this).data('n'));
						},

						'focusin':function(e){
							owner.transition(Math.floor($(this).data('n')/owner._step), 0);
							$(this).addClass('on');
						},

						'focusout':function(e){
							if(owner._selects.focus!=$(this).data('n')){
								$(this).removeClass('on');
							}
						}
					});
				}
			});
		}
	},


	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// METHOD:NAVIGATION
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/**
	 * 네비게이션 구성
	 */
	buildNavigation:function(){
		var owner=this;

		$(this._scope).find('.prev').bind('click', function(e){
			owner.navigate(-1);
		});

		$(this._scope).find('.next').bind('click', function(e){
			owner.navigate(1);
		});
	},


	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// METHOD:TRANSFORM
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/**
	 * 슬라이드 모션
	 */
	transition:function(n, time){
		//if(this._counts.focus!=n){
			this._counts.focus=n;

			var dw=this.get_distance();
			var tx=this._widths.step*this._step*n*-1;
			tx=(tx<=dw)?dw:tx; // 보정

			$(this._contents).stop().stop().animate({'left':tx+'px'}, time);
		//}
	},


	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// METHOD:OPERATION
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/**
	 * 네비게이터 이동
 	 * @param {Object} dir - 방향 -1(left), 1(right)
	 */
	navigate:function(dir){
		var c=this._counts.focus; c+=dir;
		var t=this._counts.max;

		if(c<0){
			alert('처음입니다.');
		}else if(c>t-1){
			alert('마지막입니다.');
		}

		c=(c<=0)?0:c;
		c=(c>=t-1)?t-1:c;

		this.transition(c, 'slow');
	},

	/**
	 * 포커스
 	 * @param {Object} n - 선택 순서 (0~)
	 */
	focus:function(n){
		if(this._selects.focus!=n){
			this._selects.focus=n;

			$(this._contents).find('li').each(function(a){
				if(a==n)	$(this).addClass('on');
				else			$(this).removeClass('on');
			});

			this._counts.focus=Math.floor(n/this._step);
			this.navigate(0); // this._count로 이동하므로 방향은 '0'

			if(this._callback!=null) window[this._callback](n);
			if(this._cb_focus!=null) this._cb_focus(n);
		}
	}
};










/**
 * common-block-slider
 *
 * @param {Object} scope
 */
var CommonBlockSlider=function(scope, n){
	this._scope=scope;
	this._slider=null;
	this._navigation=null;

	this._step=null;
	this._focus=-1;
	this._total=null;

	this._n=n;
	this._delaysec=4000+100*n;
	this._interval=null;

	this._isauto=true;
	this._isover=false;
	this._istab=false;

	this.init.apply(this, arguments);
};


CommonBlockSlider.prototype={
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// INITIALIZE
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	init:function(){
		this._step=$(this._scope).width();

		this.initScope();
		this.initSlider();
		this.initNavigation();

		this.focus(0, 0);

		var isauto=($(this._scope).attr('data-autoplay')=='N')?false:true;
		if(isauto) this.buildAuto(); else this.toggleAuto();
	},


	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// METHOD:SCOPE
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	initScope:function(){
		var owner=this;

		$(this._scope).css({
			'overflow':'hidden',
			'position':'relative'
		})
		.bind({
			'mouseenter':function(){
				owner._isover=true; owner.removeAuto();
			},

			'mouseleave':function(){
				owner._isover=false; 	owner.buildAuto();
			}
		});
	},


	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// METHOD:SLIDER
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	initSlider:function(){
		var owner=this;
		var slider=$(this._scope).find('ul:eq(1)'); this._slider=slider;
		var atotal=$(slider).find('li').length; this._total=atotal;

		$(slider).css({
			'position':'relative',
			'width':(atotal*this._step)+'px'
		})
		.find('li').each(function(a){
			$(this).css({
				'position':'relative',
				'float':'left'
			})
			.find('a')
			.data('n', a)
			.bind({
				'focusin':function(e){
					owner._istab=true; owner.removeAuto();
					owner.focus($(this).data('n'), 0);
					e.preventDefault();
				},

				'keydown':function(e){
					if(e.keyCode==9){
						if(($(this).is(':first-child') && e.shiftKey) || $(this).is(':last-child')){
							owner._istab=false; owner.buildAuto();
						}
					}
				}
			});
		});
	},

	focusSlider:function(n, time){
		var owner=this;
		var tx=this._step*n*-1;
		var time=(time==undefined)?'slow':time;

		// Visual Background Fade 1508
		var vNum=$('.main-block .toggle li.on').index();
		//$('.main-block').css('background-image', 'url(images/main/bg_visual'+vNum+'.jpg)');
		//$('.main-block').fadeOut(time, function(){
		//	$(this).css('background-image','url(images/main/bg_visual'+vNum+'.jpg)').stop().fadeIn(1000);
		//});

		$(this._slider).stop().stop();
		if(time===0){
			$(this._slider).css({'left':tx+'px'});
		}else{
			$(this._slider).animate({'left':tx+'px'}, time, function(){
				owner.buildAuto();
			});
		}
	},

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// METHOD:NAVIGATION
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	initNavigation:function(){
		var owner=this;
		var navigation=$(this._scope).find('ul:eq(0)'); this._navigation=navigation;

		$(navigation).find('li').each(function(a){
			if(!$(this).is(':last-child')){
				$(this)
				.data('n', a)
				.find('a').bind({
					'click':function(e){
						owner.focus($(this).parent().data('n'));
					}
				});
			}else{
				/*
				$(this).toggle(
					function(){
						owner._isauto=false; owner.removeAuto();
						$(this).attr('class', 'play');

					},
					function(){
						owner._isauto=true; owner.buildAuto();
						$(this).attr('class', 'pause');
					}
				);
				*/
				$(this).bind('click', function(e){
					owner.toggleAuto();
				});
			}
		});
	},

	focusNavigation:function(n){
		$(this._navigation).find('li').each(function(a){
//			console.log(this.className);
//			console.log($(this).parent().attr('class')); // toggle
//			console.log($(this).parent().parent().find('ul:eq(2)').attr('class')); // vMenu

			// 보험상품 배너 /Design1812
			var btnA=$('#bannerTypeA .toggle li');
			var numA=$('#bannerTypeA .toggle li.on').index();

			$('#bannerTypeA .banner-nav li.on').removeClass('on');
			$('#bannerTypeA .banner-nav li').eq(numA).addClass('on');

//			console.log(this.data('main-block-slider')); // .data('main-block-slider')
			if(!$(this).is(':last-child')){
//				console.log(this);
				if(a===n) $(this).attr('class', 'on'); else $(this).removeAttr('class');
			}
//			console.log($(this).parent().parent().find('ul:eq(2)').attr('class'));

			if($(this).parent().parent().find('ul:eq(2)').attr('class')=='vMenu') {
//				console.log("a:n "+a+":"+n);

				if(a===n) {
					$($("li[name=main_prom]")[n]).addClass('on');
				} else {
					$($("li[name=main_prom]")[a]).removeClass('on');
				}

				var newleft = 0;

			}
		});
	},

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// METHOD:AUTO
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	toggleAuto:function(){
		var scope=$(this._navigation).find('li:last-child');
		var bool=this._isauto;
		var txtScope=$(this._navigation).find('a:last-child');

		if(bool){
			this._isauto=false; this.removeAuto();
			$(scope).attr('class', 'play');
			$(txtScope).text("슬라이드 시작하기");
		}else{
			this._isauto=true; this.buildAuto();
			$(scope).attr('class', 'pause');
			$(txtScope).text("슬라이드 정지하기");
		}
	},

	buildAuto:function(){
		this.removeAuto();

		if(this._isauto && !this._isover && !this._istab){
			var owner=this;
			this._interval=setInterval(function(){
				owner.count();
			}, owner._delaysec);
		}
	},

	removeAuto:function(){
		if(this._interval!=null){
			clearInterval(this._interval); this._interval=null;
		}
	},


	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// METHOD:OPERATION
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	count:function(){
		if(this._isauto && !this._isover){
			this.removeAuto();

			var c=this._focus; c++; c=(c>=this._total)?0:c;
			this.focus(c);
		}else{
			this.buildAuto();
		}
	},

	focus:function(n, time){
		if(this._focus!=n){
			this._focus=n;

			this.removeAuto();
			this.focusNavigation(n);
			this.focusSlider(n, time);
		}
	}
};










//document.write('<script type="text/javascript" charset="utf-8" src="/js/common.media.js?cb='+get_random()+'"><'+'/script>'); // common-video

function get_video(id, w, h, src){
	var shtml='';

	if(navigator.userAgent.indexOf('msie') == -1 && Modernizr.video){
		shtml+='<video id="'+id+'" width="'+w+'" height="'+h+'" controls autoplay>\n';
  		shtml+='<source src="'+src+'.mp4" type="video/mp4">\n';
  		shtml+='<source src="'+src+'.ogg" type="video/ogg">\n';
		shtml+='Your browser does not support the video tag.\n';
		shtml+='</video>\n';
	}else{
		if(navigator.userAgent.indexOf('msie') != -1){
			shtml+='<object id="'+id+'" width="'+w+'" height="'+h+'" classid="CLSID:6BF52A52-394A-11d3-B153-00C04F79FAA6" codebase="http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=5,1,52,701" standby="Loading Microsoft Windows Media Player components..." type="video/x-ms-wmv">\n';
			shtml+='<param name="filename" value="'+src+'.wmv" />\n';
			shtml+='<param name="url" value="'+src+'.wmv" />\n';
			shtml+='<param name="animationatstart" value="1" />\n';
			shtml+='<param name="autostart" value="1" />\n';
			shtml+='<param name="balance" value="0" />\n';
			shtml+='<param name="currentmarker" value="0" />\n';
			shtml+='<param name="currentPosition" value="0" />\n';
			shtml+='<param name="displaymode" value="4" />\n';
			shtml+='<param name="enablecontextmenu" value="0" />\n';
			shtml+='<param name="enabled" value="1" />\n';
			shtml+='<param name="fullscreen" value="0" />\n';
			shtml+='<param name="invokeurls" value="1" />\n';
			shtml+='<param name="PlayCount" value="1" />\n';
			shtml+='<param name="rate" value="1" />\n';
			shtml+='<param name="showcontrols" value="1" />\n';
			shtml+='<param name="showstatusbar" value="1" />\n';
			shtml+='<param name="stretchtofit" value="1" />\n';
			shtml+='<param name="transparentatstart" value="1" />\n';
			shtml+='<param name="captioningID" value="captions" />\n';
			shtml+='<param name="displaybackcolor" value="0" />\n';
			shtml+='</object>\n';
		}else if(navigator.userAgent.indexOf('safari') != -1){
			shtml+='<object id="'+id+'" height="'+w+'" width="'+h+'" classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" codebase="http://www.apple.com/qtactivex/qtplugin.cab">\n';
			shtml+='<param name="src" value="'+src+'.mp4">\n';
			shtml+='<span style="display:block;text-align:center;padding-top:150px"><a href="http://www.apple.com/quicktime/download/">QuickTime 플레이어 다운로드</a></span>\n';
			shtml+='</object>\n';
		}else{
			shtml+='<object type="video/x-ms-asf-plugin" id="'+id+'" data="'+src+'" width="'+w+'" height="'+h+'"></object>';
		}
	}
	return shtml;
}

function get_audio(id, w, h, src){
	var shtml='';

	if($.browser.msie){
		shtml+='<embed id="'+id+'" src="'+src+'.mp3" width="'+w+'" height="'+h+'" autostart="1" ';
		shtml+='pluginspage="http://www.microsoft.com/Windows/Downloads/Contents/Products/MediaPlayer/" ';
		shtml+='type="application/x-mplayer2"></embed>';
	}else{
		shtml+='<audio style="width:'+w+';height:'+h+';" controls autoplay>\n';
		shtml+='<source src="'+src+'.wav" type="audio/wav">\n';
		shtml+='<source src="'+src+'.ogg" type="audio/ogg">\n';
		shtml+='<source src="'+src+'.mp3" type="audio/mpeg">\n';
		shtml+='Your browser does not support the audio tag.';
		shtml+='</audio>\n';
	}
	return shtml;
}












/**********************************************************************************************************
 * UTIL-DELEGATE
 **********************************************************************************************************/
var Delegate={};
Delegate.create=function(delegateInstance, pointingMethod){
	return function(){
		return pointingMethod.apply(delegateInstance, arguments);
	}
};

/**********************************************************************************************************
 *	initialize-document
 **********************************************************************************************************/
$(document).ready(function(e){
	//initFavicon();
	// initBody();

	setTimeout(function(){
		initHeader();
		initFooter();

		if(typeof(initPage)!='undefined') initPage();

		initElement();
	}, 10);
});

/**
 * dom-object-style
 */
function initElement(){
	initAlink();
	initTable();
	initSelect();
	resizeSelect();
	initCheckbox();
	initRadio();
	initFaq();
	initHelp();
	initSlider();
	initEvents();
}

/**********************************************************************************************************
 *	utils-params
 **********************************************************************************************************/
function get_width(scope){
	var w=0;
	w+=$(scope).width();
	w+=Number($(scope).css('margin-left').replace(/[^0-9]/g, ''));
	w+=Number($(scope).css('margin-right').replace(/[^0-9]/g, ''));
	w+=Number($(scope).css('padding-left').replace(/[^0-9]/g, ''));
	w+=Number($(scope).css('padding-right').replace(/[^0-9]/g, ''));
	//w+=Number($(scope).css('border-width').replace(/[^0-9]/g, ''))*2;
	return w;
}

function get_height(scope){
	var h=0;
	h+=$(scope).height();
	h+=Number($(scope).css('margin-top').replace(/[^0-9]/g, ''));
	h+=Number($(scope).css('margin-bottom').replace(/[^0-9]/g, ''));
	h+=Number($(scope).css('padding-top').replace(/[^0-9]/g, ''));
	h+=Number($(scope).css('padding-bottom').replace(/[^0-9]/g, ''));
	//h+=Number($(scope).css('border-width').replace(/[^0-9]/g, ''))*2;
	return h;
}

function get_random(){
	return new Date().getTime();
}


/**********************************************************************************************************
 *	common-params
 **********************************************************************************************************/
/**
 * 익스플로어 버전 정보 취득
 */
function get_msie_version(){
	var version='';
	var trident=navigator.userAgent.match(/Trident\/(\d.\d)/i);
	if(trident!=null){
		switch(trident[1]){
			case '3.0': version='7'; break;
			case '4.0': version='8'; break;
			case '5.0': version='9'; break;
			case '6.0': version='10'; break;
		}
	}else{
		version=String(parseInt($.browser.version, 10));
	}
	return version;
}


/**********************************************************************************************************
 *	initialize-head
 **********************************************************************************************************/
//function initFavicon(){
//	var link=document.createElement('link');

//	$(link)
//	.attr({'rel':'shortcut icon', 'href':'/images/common/favicon.ico'})
//	.appendTo($(document.head));
//}


/**********************************************************************************************************
 *	initialize-body-class
 **********************************************************************************************************/
/**
 *  browser에 따른 body-tag-class 부여
 */
// function initBody(){
// 	var name='';

// 	if($.browser.msie){
// 		name='msie'+get_msie_version();
// 	}else if($.browser.chrome){
// 		name='chrome';
// 	}else if($.browser.safari){
// 		name='safari';
// 	}else if($.browser.opera){
// 		name='opera';
// 	}else if($.browser.mozilla){
// 		name='firefox';
// 	}
// 	//$(document.body).addClass(name);
// 	$('body').addClass(name);
// }


/**********************************************************************************************************
 *	initialize-header
 **********************************************************************************************************/
var _header=null;

function initHeader(){
	if(typeof(_type_gnb)!='undefined'){
		try{
			_header=new CommonHeader();
		}catch(e){}
	}
}


/**********************************************************************************************************
 *	initialize-footer
 **********************************************************************************************************/
var _footer=null;
function initFooter(){
	try{
		_footer=new CommonFooter();
	}catch(e){}
}


/**********************************************************************************************************
 *	initialize-event
 **********************************************************************************************************/
/**
 * document-event 구성
 */
var _isinitEvents=false;
function initEvents(){
	if(!_isinitEvents){
		_isinitEvents=true;

		var owner=this;
		$(document).bind({
			'mousedown':function(e){
				owner.collisionCheckbox(e);
				owner.collisionRadio(e);
			},

			'keyup':function(e){
				if(e.keyCode==9){
					owner.focusCheckbox(e);
					owner.focusRadio(e);
				}
			}
		});
	}else{
		focusCheckbox();
		focusRadio();
	}
}


/**********************************************************************************************************
 *	initialize-a-link
 **********************************************************************************************************/
function initAlink(){
	$(document).find('a').each(function(a){
		if($(this).attr('href')=='#' || $(this).attr('href')=='#none'){
			$(this).attr('href', 'javascript:nothing();');
		}
	});
}

function nothing(){
	// do-nothing
}


/**********************************************************************************************************
 *	initialize-table
 **********************************************************************************************************/
/**
 * 접근성관련 table-tag 정보 자동완성
 */
function initTable(){
	$(document).find('body table').each(function(a){
		if($(this).attr('summary')=='' || $(this).attr('summary')==undefined){
			// search-element-th
			var msg='';
			$(this).find('th').each(function(b){
				var bth=($(this).contents()[0]!=undefined)?$.trim($(this).contents()[0].nodeValue):'';
				if($.trim(bth)!=''){
					msg+=((msg=='')?'':',')+bth;
				}
			});

			if(msg!=''){
				// defind-language
				var iseng=$('body').hasClass('eng');
				// search-element-caption
				var caption=$.trim($(this).find('caption').text()) || '';

				// add-message
				if(iseng){
					msg='Table include '+msg;
					if($.trim(caption)!='') msg=caption+' '+msg;
				}else{
					msg+='(으)로 이루어진';
					if($.trim(caption)!='') msg+=' '+caption;
					msg+=' 테이블입니다.';
				}

				// add-attribute
				$(this).attr('summary',msg);
			}
		}
	});
}


/**********************************************************************************************************
 *	initialize-select
 **********************************************************************************************************/
var _common_select=null;  // object-CommonSelect

/**
 * <select> css 적용
 */
function initSelect(){
	// 1. create-layer
	if(_common_select==null) _common_select=new CommonSelect();

	// 2. convert-select-tag
	var owner=this;
	$(document.body).find('select').each(function(a){
		if(!$(this).data('iscustom') && String($(this).attr('data-custom')).toUpperCase()!='N'){
			// 2-1. create-container-all
			var istable=($(this).parent().is('td') || $(this).parent().parent().is('td') || $(this).parent().parent().parent().is('td'))?true:false;
			var acontainer=document.createElement('div');

			var m=13+10;
			m=(navigator.userAgent.indexOf('safari') != -1)?38:m;
			m=(navigator.userAgent.indexOf('opera'))?18:m;

			var w=$(this).width()+m, h=30;

			$(acontainer)
			.attr('data-role', 'custom-select-container-all')
			.css({
				'position':'relative',//'position':($.browser.msie && get_msie_version()=='7')?'none':'relative',
				'display':(navigator.userAgent.indexOf('msie') != -1 && get_msie_version()=='7')?'inline':'inline-block',
				'vertical-align':'middle',
				'zoom':'1',
				'width':w+'px',
				'height':h+'px',
				'background-color':'#fff',
				'cursor':'pointer'
			})
			.data('istable', istable)
			.data('width', w)
			.bind('click', function(e){
				if(!$(this).find('select').is(':disabled')){
					//owner._common_select.open($(this)); // 아래와 동일
					$(this).find('select').focus();
				}
			})
			.insertBefore($(this));

			// 2-2. modify-select-tag & append-to-container
			$(this)
			.data('iscustom', true)
			.css({'opacity':'0'})
			.bind({
				'change':function(e){
					$(this).parent().find('span').text($(this).find('option:checked').text());
					owner._common_select.focus($(this).find(':checked')[0].index);
				},

				'keyup':function(e){
					var code=e.keyCode;

					if(code==13){
						owner._common_select.close();
					}else if((code>=8 && code<=11) || (code>=37 && code<=40)){ // safari에서 클릭시 key 이벤트도 같이 발생(중복 방지 처리)
						if(!$.browser.chrome) $(this).trigger('change'); // chrome은 자동으로 change-event 생성(중복 방지 처리)
					}
				},

				'keydown':function(e){
					if(e.keyCode==9){
						if($(this).is(':focus')) owner._common_select.close();
					}
				},

				'focusin':function(e){
					if(!$(this).is(':disabled')) owner._common_select.open($(this).parent());
					//$(document.body).blur();
				}/*,

				'focusout':function(e){
					owner._common_select.close();
				}*/
			})
			.appendTo($(acontainer));

			// 3. create-design-container & append-to-container
			var iseng=$('body').hasClass('eng');
			var bcontainer=document.createElement('div');
			$(bcontainer)
			.attr('data-role', 'custom-select-container-dummy')
			.html('<div class="select-box"><span>선택</span><a title="'+((iseng)?'Open Layer':'리스트 레이어 열림')+'"><img src="/images/common/btn/bt_select.png" alt="'+((iseng)?'View List':'리스트 보기')+'" /></a></div>')
			.css({
				'position':'absolute',
				'top':'0px', 'left':'0px',
				'width':w+'px',
				'height':h+'px',
				'background-color':'#fff',
				'margin-top':((istable)?'-2':'0')+'px',
				'z-index':'1'
			})
			.appendTo($(acontainer));

			// 4. show-first-value
			$(bcontainer).find('span').text($(this).find('option:checked').text());

			// 5. add-listener
			_common_select.add_listeners($(this));
		}else{
			if(String($(this).attr('data-custom')).toUpperCase()!='N'){
				$(this).parent().find('span').text($(this).find('option:checked').text());
			}
		}
	});
}

var _interval_resize_select=null;

function resizeSelect(){
	if(_interval_resize_select==null){
		//var sec=($.browser.msie && get_msie_version()=='7')?100:10;

		_interval_resize_select=setInterval(function(){
			var m=13;
			m=(navigator.userAgent.indexOf('safari') != -1)?38:m;
			m=(navigator.userAgent.indexOf('opera') != -1)?18:m;

			$(document.body).find('select').each(function(a){
				if(String($(this).attr('data-custom')).toUpperCase()!='N'){
					var pw=$(this).parent().width();
					var cw=$(this).width()+m;

					if(pw!=cw){
						$(this).parent().css({'width':cw+'px'});
						$(this).parent().find('div[data-role=custom-select-container-dummy]').css({'width':cw+'px'});
					}
				}
			});
		}, 100);
	}
}


/**********************************************************************************************************
 *	initialize-input-checkbox
 **********************************************************************************************************/
/**
 * <input type="checkbox"> css 적용
 */
function initCheckbox(){
	var owner=this;
	$(document.body).find('input[type=checkbox]').each(function(a){
		if(!$(this).data('iscustom')){
			var m=-2; // 수정 /20201026
			m=(navigator.userAgent.indexOf('msie') != -1)?-2:m; // 수정 /20201026
			m=(navigator.userAgent.indexOf('safari') != -1)?-3:m;
			m=(navigator.userAgent.indexOf('opera') != -1)?1:m;
			m=(navigator.userAgent.indexOf('chrome') != -1)?-1:m; // 추가 /20201026

			var acontainer=document.createElement('div');
			$(acontainer).css({
				'position':(navigator.userAgent.indexOf('msie') != -1 && get_msie_version()=='7')?'none':'relative',
				'display':(navigator.userAgent.indexOf('msie') != -1 && get_msie_version()=='7')?'inline':'inline-block',
				'vertical-align':'middle',
				'zoom':'1',
				'margin-top':m+'px',  // 수정 /1903
				'width':'13px', // 추가 /1903
				'height':'13px' // 추가 /20201026
			})
			.insertBefore($(this));

			$(this)
			.data('iscustom', true)
			.css({'opacity':'0'})
			.bind({
				'click focusin focusout':function(e){
					owner.toggleCheckbox(e);
				}
			})
			.appendTo($(acontainer))
			.trigger('focusout');
		}
	});
}

/**
 * 배경이미지 변경
 */
function toggleCheckbox(e){
	var scope=e.currentTarget;
	var ischeck=($(scope).is(':checked'))?true:false;
	var isout=(e.type=='focusout')?true:false;


	if(!$(scope).is(':disabled')){
		$(scope).parent().css({
			'background':'url(/images/common/ico/ic_check_'+((ischeck)?'on':'off')+((isout)?'':'2')+'.png) no-repeat'
		});
	}else{
		$(scope).parent().css({
			'background':'url(/images/common/ico/ic_check_disabled'+((ischeck)?'2':'')+'.png) no-repeat'
		});
	}
}

/**
 * document-mousedown-event에 대응
 */
function collisionCheckbox(e){
	$(document.body).find('input[type=checkbox]').each(function(a){
		if(!$(e.currentTarget).is($(this))) $(this).trigger('focusout');
	});
}

/**
 * document-keyup-event에 대응
 */
function focusCheckbox(e){
	$(document.body).find('input[type=checkbox]').each(function(a){
		if(!$(this).is(':focus')) $(this).trigger('focusout');
	});
}

/**********************************************************************************************************
 *	initialize-input-radio
 **********************************************************************************************************/
/**
 * <input type="radio"> css 적용
 */
function initRadio(){
	var owner=this;
	$(document.body).find('input[type=radio]').each(function(a){
		if(!$(this).data('iscustom')){
			var m=0;
			m=(navigator.userAgent.indexOf('msie') != -1)?5:m;
			m=(navigator.userAgent.indexOf('safari') != -1)?-3:m;
			m=(navigator.userAgent.indexOf('opera') != -1)?1:m;

			var acontainer=document.createElement('div');
			$(acontainer).css({
				'position':(navigator.userAgent.indexOf('msie') != -1 && get_msie_version()=='7')?'none':'relative',
				'display':(navigator.userAgent.indexOf('msie') != -1 && get_msie_version()=='7')?'inline':'inline-block',
				'vertical-align':'middle',
				'zoom':'1',
				'margin-top':m+'px', // 수정 /1903
				'width':'13px' // 추가 /1903
			})
			.insertBefore($(this));

			$(this)
			.data('iscustom', true)
			.css({'opacity':'0'})
			.bind({
				'click':function(e){
					owner.selectRadio(e.currentTarget);
				},

				'focusin focusout':function(e){
					owner.toggleRadio(e);
				}
			})
			.appendTo($(acontainer))
			.trigger('focusout');
		}
	});
}

/**
 * groupping-<input type="radio">-checked 변경
 */
function selectRadio(scope){
	var owner=this;
	var name=$(scope).attr('name') || '';

	$(document.body).find('input[type=radio][name='+name+']').each(function(a){
		$(this).trigger(($(this).is(':checked'))?'focusin':'focusout');
	});
}

/**
 * 배경이미지 변경
 */
function toggleRadio(e){
	var scope=e.currentTarget;
	var ischeck=($(scope).is(':checked'))?true:false;
	var isout=(e.type=='focusout')?true:false;



	if(!$(scope).is(':disabled')){
		$(scope).parent().css({
			'background':'url(/images/common/ico/ic_radio_'+((ischeck)?'on':'off')+((isout)?'':'2')+'.png) no-repeat'
		});
	}else{
		$(scope).parent().css({
			'background':'url(/images/common/ico/ic_radio_disabled'+((ischeck)?'2':'')+'.png) no-repeat'
		});
	}
}

/**
 * document-mousedown-event 대응
 */
function collisionRadio(e){
	$(document.body).find('input[type=radio]').each(function(a){
		if(!$(e.currentTarget).is($(this))) $(this).trigger('focusout');
	});
}

/**
 * document-keyup-event 대응
 */
function focusRadio(e){
	$(document.body).find('input[type=radio]').each(function(a){
		if(!$(this).is(':focus')) $(this).trigger('focusout');
	});
}


/**********************************************************************************************************
 *	initialize-class-faq
 **********************************************************************************************************/
function initFaq(){
	/*
	$('.faq dt a').click(function(){
		if(!$(this).data('iscustom')){
			$(this).data('iscustom', true);

			if($(this).parent().hasClass('')){
				$(this).parent().addClass('on').siblings().removeClass('on');
				$(this).parent().next().show().siblings('dd').hide();
			}else{
				$(this).parent().removeClass('on')
				$(this).parent().next().hide();
			}
			return false;
		}
	});*/
}


/**********************************************************************************************************
 *	initialize-class-help
 **********************************************************************************************************/
/**
 * tool-tip 초기화
 */
function initHelp(){
	var owner=this;

	$('.lay-help').each(function(a){
		if(!$(this).data('iscustom')){
			var container=$(this);

			// 1. hide-content
			$(this).find('.txt-help').hide();

			// 2. event-open
			$(this).find('a:eq(0)')
			.bind('click', function(e){
				owner.clearHelp();

				$(this).parent()
				.css({'z-index':'999'})
				.find('.txt-help').show();
			});

			// 3. event-close
			$(this).find('.lay-close')
			.bind('click', function(e){
				owner.clearHelp();
			});
		}
	});
}

/**
 * tool-tip 화면 초기화
 */
function clearHelp(){
	$('.lay-help').each(function(a){
		$(this).css({'z-index':'0'});
		$(this).find('.txt-help').hide();
	});
}

/***
FAQ Placeholder /1808
***/
$(function(){
$('#q').on({
	focus:function(){
		$(this).addClass('on');
	},
	focusout:function(){
		if(!$(this).val()){
			$(this).removeClass('on');
		}
	}
});
});

/**********************************************************************************************************
 *	initialize-data-role-slider
 **********************************************************************************************************/
function initSlider(){
	$(document).find('*[data-role=slider]').each(function(a){
		if(!$(this).data('iscustom')){
			$(this)
			.data('iscustom', true)
			.data('scope', new CommonSlider($(this)));
		}
	});

	$(document).find('*[data-role=block-slider]').each(function(b){
		if(!$(this).data('iscustom')){
			$(this)
			.data('iscustom', true)
			.data('scope', new CommonBlockSlider($(this), b));
		}
	});

	$(document).find('*[data-role=main-block-slider]').each(function(b){
		if(!$(this).data('iscustom')){
//			console.log("$(this)", $(this));
			commonBlockSlider = new CommonBlockSlider($(this), b);
			$(this)
			.data('iscustom', true)
			.data('scope', commonBlockSlider);
		}
	});
}

var commonBlockSlider;








