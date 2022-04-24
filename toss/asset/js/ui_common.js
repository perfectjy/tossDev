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
                $(this).siblings().removeClass('selected').attr('aria-selected', false);
            });
            firstSelect($menuItem, $panelItem);
    });
    
    function firstSelect($menu, $cont) {
      $menu.first().addClass('selected').attr('aria-selected', true);
      $cont.first().addClass('selected').attr('aria-selected', true);
    }

    function setSelectItem($item, $pnl) {
        if($selectItem) {
            $selectItem.removeClass('selected').attr('aria-selected', false);
            $pnl.removeClass('selected').attr('aria-selected', false);
        }
        $selectItem = $item;
        $selectItem.addClass('selected').attr('aria-selected', true);
        $pnl.removeClass('selected').attr('aria-selected', false);

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
          $dialog.attr('role', 'dialog');
        }

        function event() {
          $dialogBtn.on('click', function() {   
            btnName = $(this).data('modalBtn');
            $dialog.data('modal', btnName);

            $(this).attr('data-actived', true).focus();
            
            open(btnName);   
          });

          $closeBtn.on('click', function() {  
            close($(this));
          });
        };
        
        function open(target) {
          $('[data-modal='+target+']').addClass('show');
          $('[data-modal='+target+']').find('.dialog_wrap').attr('tabindex', 0).focus();
        }

        function close(target) {
          var $dialogBody = target.closest($dialog);
              dialogName = $dialogBody.data('modal');
              $dialogBody.removeClass('show');

          if($dialogBtn.data('actived') === true) {
            $('[data-modal-btn='+dialogName+']').removeAttr('data-actived').focus();
          }
        }
        init();
        event(); 
  }
}