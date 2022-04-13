;(function(factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports !== 'undefined') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }
}(function($) {
    'use strict';
    var Slick = window.Slick || {};

    Slick = (function() {

        var instanceUid = 0;

        function Slick(element, settings) {

            var _ = this, dataSettings;

            _.defaults = {
                accessibility: true,
                adaptiveHeight: false,
                appendArrows: $(element),
                appendDots: $(element),
                arrows: true,
                asNavFor: null,
                prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
                nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
                autoplay: false,
                autoplaySpeed: 3000,
                centerMode: false,
                centerPadding: '50px',
                cssEase: 'ease',
                customPaging: function(slider, i) {
                    return $('<button type="button" />').text(i + 1);
                },
                dots: false,
                dotsClass: 'slick-dots',
                draggable: true,
                easing: 'linear',
                edgeFriction: 0.35,
                fade: false,
                focusOnSelect: false,
                focusOnChange: false,
                infinite: true,
                initialSlide: 0,
                lazyLoad: 'ondemand',
                mobileFirst: false,
                pauseOnHover: true,
                pauseOnFocus: true,
                pauseOnDotsHover: false,
                respondTo: 'window',
                responsive: null,
                rows: 1,
                rtl: false,
                slide: '',
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: true,
                swipeToSlide: false,
                touchMove: true,
                touchThreshold: 5,
                useCSS: true,
                useTransform: true,
                variableWidth: false,
                vertical: false,
                verticalSwiping: false,
                waitForAnimate: true,
                zIndex: 1000
            };

            _.initials = {
                animating: false,
                dragging: false,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                scrolling: false,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: false,
                slideOffset: 0,
                swipeLeft: null,
                swiping: false,
                $list: null,
                touchObject: {},
                transformsEnabled: false,
                unslicked: false
            };

            $.extend(_, _.initials);

            _.activeBreakpoint = null;
            _.animType = null;
            _.animProp = null;
            _.breakpoints = [];
            _.breakpointSettings = [];
            _.cssTransitions = false;
            _.focussed = false;
            _.interrupted = false;
            _.hidden = 'hidden';
            _.paused = true;
            _.positionProp = null;
            _.respondTo = null;
            _.rowCount = 1;
            _.shouldClick = true;
            _.$slider = $(element);
            _.$slidesCache = null;
            _.transformType = null;
            _.transitionType = null;
            _.visibilityChange = 'visibilitychange';
            _.windowWidth = 0;
            _.windowTimer = null;

            dataSettings = $(element).data('slick') || {};

            _.options = $.extend({}, _.defaults, settings, dataSettings);

            _.currentSlide = _.options.initialSlide;

            _.originalSettings = _.options;

            if (typeof document.mozHidden !== 'undefined') {
                _.hidden = 'mozHidden';
                _.visibilityChange = 'mozvisibilitychange';
            } else if (typeof document.webkitHidden !== 'undefined') {
                _.hidden = 'webkitHidden';
                _.visibilityChange = 'webkitvisibilitychange';
            }

            _.autoPlay = $.proxy(_.autoPlay, _);
            _.autoPlayClear = $.proxy(_.autoPlayClear, _);
            _.autoPlayIterator = $.proxy(_.autoPlayIterator, _);
            _.changeSlide = $.proxy(_.changeSlide, _);
            _.clickHandler = $.proxy(_.clickHandler, _);
            _.selectHandler = $.proxy(_.selectHandler, _);
            _.setPosition = $.proxy(_.setPosition, _);
            _.swipeHandler = $.proxy(_.swipeHandler, _);
            _.dragHandler = $.proxy(_.dragHandler, _);
            _.keyHandler = $.proxy(_.keyHandler, _);

            _.instanceUid = instanceUid++;

            // A simple way to check for HTML strings
            // Strict HTML recognition (must start with <)
            // Extracted from jQuery v1.11 source
            _.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;


            _.registerBreakpoints();
            _.init(true);

        }

        return Slick;

    }());


Slick.prototype.autoPlay = function() {
    var _ = this;
    _.autoPlayClear();

    if ( _.slideCount > _.options.slidesToShow ) {
        _.autoPlayTimer = setInterval( _.autoPlayIterator, _.options.autoplaySpeed );
    }
};

Slick.prototype.autoPlayClear = function() {

    var _ = this;

    if (_.autoPlayTimer) {
        clearInterval(_.autoPlayTimer);
    }

};

Slick.prototype.buildOut = function() {

    var $this = this;

    $this.$slides = $this.$slider.children( $this.options.slide + ':not(.slick-cloned)').addClass('slick-slide');

    $this.slideCount = $this.$slides.length;

    $this.$slides.each(function(index, element) {
        $(element).attr('data-slick-index', index).data('originalStyling', $(element).attr('style') || '');
    });

    $this.$slider.addClass('slick-slider');

    $this.$slideTrack = ($this.slideCount === 0) ? $('<div class="slick-track"/>').appendTo($this.$slider) : $this.$slides.wrapAll('<div class="slick-track"/>').parent();

    $this.$list = $this.$slideTrack.wrap('<div class="slick-list"/>').parent();
    $this.$slideTrack.css('opacity', 0);

    if ($this.options.centerMode === true || $this.options.swipeToSlide === true) {
        $this.options.slidesToScroll = 1;
    }

    $('img[data-lazy]', _.$slider).not('[src]').addClass('slick-loading');

    _.setupInfinite();

    _.buildArrows();

    _.buildDots();

    _.updateDots();


    _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

    if (_.options.draggable === true) {
        _.$list.addClass('draggable');
    }

};


Slick.prototype.getLeft = function(slideIndex) {

    var _this = this,
        targetLeft,
        verticalHeight,
        verticalOffset = 0,
        targetSlide,
        coef;

    _this.slideOffset = 0;
    verticalHeight = _this.$slides.first().outerHeight(true);

    if (_this.options.infinite === true) {
        if (_this.slideCount > _this.options.slidesToShow) {
            _this.slideOffset = (_this.slideWidth * _this.options.slidesToShow) * -1;
            coef = -1

            if (_this.options.vertical === true && _this.options.centerMode === true) {
                if (_this.options.slidesToShow === 2) {
                    coef = -1.5;
                } else if (_this.options.slidesToShow === 1) {
                    coef = -2
                }
            }
            verticalOffset = (verticalHeight * _this.options.slidesToShow) * coef;
        }
        if (_this.slideCount % _this.options.slidesToScroll !== 0) {
            if (slideIndex + _this.options.slidesToScroll > _this.slideCount && _this.slideCount > _this.options.slidesToShow) {
                if (slideIndex > _this.slideCount) {
                    _this.slideOffset = ((_this.options.slidesToShow - (slideIndex - _this.slideCount)) * _this.slideWidth) * -1;
                    verticalOffset = ((_this.options.slidesToShow - (slideIndex - _this.slideCount)) * verticalHeight) * -1;
                } else {
                    _this.slideOffset = ((_this.slideCount % _this.options.slidesToScroll) * _this.slideWidth) * -1;
                    verticalOffset = ((_this.slideCount % _this.options.slidesToScroll) * verticalHeight) * -1;
                }
            }
        }
    } else {
        if (slideIndex + _this.options.slidesToShow > _this.slideCount) {
            _this.slideOffset = ((slideIndex + _this.options.slidesToShow) - _this.slideCount) * _this.slideWidth;
            verticalOffset = ((slideIndex + _this.options.slidesToShow) - _this.slideCount) * verticalHeight;
        }
    }

    if (_this.slideCount <= _this.options.slidesToShow) {
        _this.slideOffset = 0;
        verticalOffset = 0;
    }

    if (_this.options.centerMode === true && _this.slideCount <= _this.options.slidesToShow) {
        _this.slideOffset = ((_this.slideWidth * Math.floor(_this.options.slidesToShow)) / 2) - ((_this.slideWidth * _this.slideCount) / 2);
    } else if (_this.options.centerMode === true && _this.options.infinite === true) {
        _this.slideOffset += _this.slideWidth * Math.floor(_this.options.slidesToShow / 2) - _this.slideWidth;
    } else if (_this.options.centerMode === true) {
        _this.slideOffset = 0;
        _this.slideOffset += _this.slideWidth * Math.floor(_this.options.slidesToShow / 2);
    }

    if (_this.options.vertical === false) {
        targetLeft = ((slideIndex * _this.slideWidth) * -1) + _this.slideOffset;
    } else {
        targetLeft = ((slideIndex * verticalHeight) * -1) + verticalOffset;
    }

    if (_this.options.variableWidth === true) {

        if (_this.slideCount <= _this.options.slidesToShow || _this.options.infinite === false) {
            targetSlide = _this.$slideTrack.children('.slick-slide').eq(slideIndex);
        } else {
            targetSlide = _this.$slideTrack.children('.slick-slide').eq(slideIndex + _this.options.slidesToShow);
        }

        if (_this.options.rtl === true) {
            if (targetSlide[0]) {
                targetLeft = (_this.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
            } else {
                targetLeft =  0;
            }
        } else {
            targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
        }

        if (_this.options.centerMode === true) {
            if (_this.slideCount <= _this.options.slidesToShow || _this.options.infinite === false) {
                targetSlide = _this.$slideTrack.children('.slick-slide').eq(slideIndex);
            } else {
                targetSlide = _this.$slideTrack.children('.slick-slide').eq(slideIndex + _this.options.slidesToShow + 1);
            }

            if (_this.options.rtl === true) {
                if (targetSlide[0]) {
                    targetLeft = (_this.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
                } else {
                    targetLeft =  0;
                }
            } else {
                targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
            }

            targetLeft += (_this.$list.width() - targetSlide.outerWidth()) / 2;
        }
    }

    return targetLeft;

};


Slick.prototype.setupInfinite = function() {

    var $this = this, i, slideIndex, infiniteCount;

    if ($this.options.fade === true) {
        $this.options.centerMode = false;
    }

    if ($this.options.infinite === true && $this.options.fade === false) {

        slideIndex = null;

        if ($this.slideCount > $this.options.slidesToShow) {
                // 5 > 1  :: 총 개수는 6개의 이미지에서 3개씩 보여주는 슬라이드 ( * count는 0부터 )
            if ($this.options.centerMode === true) {
                infiniteCount = $this.options.slidesToShow + 1;
                // 2
            } else {
                infiniteCount = $this.options.slidesToShow;
                // 1
            }

            for (i = $this.slideCount; i > ($this.slideCount - infiniteCount); i -= 1) {
                // type 01 => 5 > (5 - 2); 5-=1
                // type 02 => 5 > (5 - 1); 5-=1

                slideIndex = i - 1;
                // 모든결과값 =>  3
    
                $($this.$slides[slideIndex]).clone(true).attr('id', '').attr('data-slick-index', slideIndex - $this.slideCount).prependTo($this.$slideTrack).addClass('slick-cloned');
                // slide, data-slick-index, -2
            }

            for (i = 0; i < infiniteCount  + $this.slideCount; i += 1) {
                // type 01 => 0 < 2 + 5; 5+=1
                // type 02 => 0 < 1 + 5; 5+=1

                slideIndex = i;
                // 모든결과값 => 6

                $($this.$slides[slideIndex]).clone(true).attr('id', '').attr('data-slick-index', slideIndex + $this.slideCount).appendTo($this.$slideTrack).addClass('slick-cloned');
                // slide, data-slick-index, 6
            }
            
            $this.$slideTrack.find('.slick-cloned').find('[id]').each(function() {
                $(this).attr('id', '');
            });

        }

    }

};




$(document).ready(function(){
    // 무한 반복 슬라이딩 //
    
    let current= 0;
    let show = 5;
    let container = $('.sliding-view .container');
    let length = container.find('>li').length;
    let view =  $('.sliding-view').width();
    let tt = view/show; //이동거리 -한칸씩 움직이기//
    let next = $('.sliding-box .right');
    let prev = $('.sliding-box .left');
    
    container.css('width','length*tt');//컨테이너 길이 초기화//
    
    next.on({
        click:function(){
            
            if(current == length) {//마지막 엘리먼트에 다다르면 current 초기화//
                current = 0;
            }
            
            if(current == 0){
                //먼저 복사된 엘리먼트 삭제하고 위치 초기화//
                container.find('>li').eq(length-1).nextAll().remove();
                container.css({left:0}).stop();
                
                //이동//
                current++;
                container.stop().animate({left:tt*current*-1},{duration:900});	
                
                //엘리먼트 복사 - 컨네이너의 자식 모두 복사//
                let cloneEl = container.children().clone();
                //복사된 엘리먼트 수 만큼 길이 늘리고 붙이기//
                container.css({width:container.innerWidth()+(tt*length)});
                cloneEl.appendTo(container);
            }
            else if(current >= 1){
            
                current++;
                container.stop().animate({left:tt*current*-1},{duration:900});	
            }			
            
        },
        mouseenter:function(){
            clearInterval(Sliding);
        },
        mouseleave:function(){
            slidingTimer();
        }
    });
    
    prev.on({
    click:function(){
    if(current == 0){
    //먼저 복사된 엘리먼트 삭제하고 위치 초기화//
    container.find('>li').eq(length-1).nextAll().remove();
    container.css({left:0}).stop();
        
    //인덱스 순서를 length로 치환해줌//
    current=length;
    
    //앞쪽으로 엘리먼트 복사해서 붙이기//
    //길이 & 위치 초기화 -앞쪽으로 붙었기 떄문에 늘어난 길이 만큼 left시작 위치가 -가 되어야함//
    let cloneEl = container.children().clone();
    
    container.css({left:tt*length*-1,width:container.innerWidth()+(tt*length)}).stop();
    cloneEl.prependTo(container);
    
    //붙이고 나서 바로 이동 되도록//
    current--;
    container.stop().animate({left:tt*current*-1},{duration:900});
    }
    else if(current > 0 ){
    current--;
    container.stop().animate({left:tt*current*-1},{duration:900});
    }
    
    },
    mouseenter:function(){
    clearInterval(Sliding);
    },
    mouseleave:function(){
    slidingTimer();
    }
    });
    
    
    //컨테이너에 hover 되면 타이머 일시정지//
    container.on({
    mouseenter:function(){
    clearInterval(Sliding);
    },
    mouseleave:function(){
    slidingTimer();
    }
    });
    
    slidingTimer();
    
    //자동 슬라이딩 타미머 함수 정의//
    function slidingTimer(){
    Sliding = setInterval(function(){
    
    next.trigger('click');
    
    },3000);
    }
    });