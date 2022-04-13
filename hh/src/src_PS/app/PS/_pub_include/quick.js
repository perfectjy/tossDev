/**
* 기업 : 퇴직연금 
* ------------------
* quick.js
*/


(function(){
	var str='';
	str+='<div id="quick">';
	str+='	<h1 class="offscr">바로가기 메뉴</h1>';
	str+='	<nav class="quick_gnb">';
	str+='		<ul>';
	str+='			<li>';
	str+='				<a href="#" class="qmenu_tit" title="제도소개 내용열기">제도소개</a>';
	str+='				<ul class="qmenu_sub">';
	str+='					<li class="current"><a href="#">제도안내</a></li>';
	str+='					<li><a href="#">연금가이드</a></li>';
	str+='					<li><a href="#">연금설계 시뮬레이션</a></li>';
	str+='					<li><a href="#">가입자교육안내</a></li>';
	str+='					<li><a href="#">Hi~ My 현대해상</a></li>';
	str+='					<li><a href="#">국제회계기준안내</a></li>';
	str+='				</ul>';
	str+='			</li>';
	str+='			<li>';
	str+='				<a href="#" class="qmenu_tit" title="상품정보 내용열기">상품정보</a>';
	str+='				<ul class="qmenu_sub">';
	str+='					<li><a href="#">상품안내</a></li>';
	str+='					<li><a href="#">투자성향진단</a></li>';
	str+='				</ul>';
	str+='			</li>';
	str+='			<li>';
	str+='				<a href="#" class="qmenu_tit" title="스마트발급센터 내용열기">스마트발급센터</a>';
	str+='				<ul class="qmenu_sub">';
	str+='					<li><a href="#">신청서 다운로드</a></li>';
	str+='					<li><a href="#">증명서 발급</a></li>';
	str+='				</ul>';
	str+='			</li>';
	str+='			<li>';
	str+='				<a href="#" class="qmenu_tit" title="고객지원센터 내용열기">고객지원센터</a>';
	str+='				<ul class="qmenu_sub">';
	str+='					<li><a href="#">공지사항</a></li>';
	str+='					<li><a href="#">자주 하는 질문</a></li>';
	str+='					<li><a href="#">상담신청</a></li>';
	str+='					<li><a href="#">나의 상담내역</a></li>';
	str+='					<li><a href="#">자료실</a></li>';
	str+='					<li><a href="#">인증센터</a></li>';
	str+='				</ul>';
	str+='			</li>';
	str+='		</ul>';
	str+='	</nav>';
	str+='</div>';

	document.write(str);

	$('#quick .qmenu_tit').on('click', function(e) {
		e.preventDefault();
		var $this = $(this);
		$this.addClass('active');
		$this.parent().siblings().find('.qmenu_tit').removeClass('active').next('.qmenu_sub').slideUp();
		$this.addClass('active').next('.qmenu_sub').slideDown();
	});
})();

