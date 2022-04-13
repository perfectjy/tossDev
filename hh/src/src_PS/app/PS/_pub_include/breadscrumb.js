/**
* 기업 : 퇴직연금 
* ------------------
* breadscrumb.js
*/

(function(){
	var str='';
	str+='<div class="breadcrumbs_wrap">';
	str+='	<div class="breadcrumbs_cont">';
	str+='		<div class="breadcrumbs_in">';
	str+='			<div class="breadcrumbs_simple">';
	str+='				<ul>';
	str+='					<li><a href="#none" class="home"><span class="offscr">메인화면으로 이동</span></a></li>';
	str+='					<li>퇴직연금가이드</li>';
	str+='					<li>제도소개</li>';
	str+='					<li>제도안내</li>';
	str+='				</ul>';
	str+='			</div>';
	str+='	      <div class="breadcrumbs_fix">';
	str+='			<div class="breadcrumbs">';
	str+='				<ul>';
	str+='					<li><a href="#" class="home"><em class="offscr">메인화면으로 이동</em></a></li>';
	str+='					<li class="d1"><a href="#"><span>퇴직연금가이드</span></a>';
	str+='						<div class="sub">';
	str+='							<ul>';
	str+='								<li><a href="#" class="current">퇴직연금가이드</a></li>';
	str+='								<li><a href="#">가입자서비스</a></li>';
	str+='								<li><a href="#">스마트발급센터</a></li>';
	str+='								<li><a href="#">고객지원센터</a></li>';
	str+='							</ul>';
	str+='						</div>';
	str+='					</li>';
	str+='					<li class="d1"><a href="#"><span>제도소개</span></a>';
	str+='						<div class="sub">';
	str+='							<ul>';
	str+='								<li><a href="#" class="current">제도안내</a></li>';
	str+='								<li><a href="#">연금가이드</a></li>';
	str+='								<li><a href="#">연금설계 시뮬레이션</a></li>';
	str+='								<li><a href="#">가입자교육안내</a></li>';
	str+='								<li><a href="#">Hi~My 현대해상</a></li>';
	str+='								<li><a href="#">국제회계기준안내</a></li>';
	str+='							</ul>';
	str+='						</div>';
	str+='					</li>';
	str+='				</ul>';
	str+='			</div>';
	str+='	      </div>';
	str+='		</div>';
	str+='	</div>';
	str+='</div>';
	document.write(str);
})();

