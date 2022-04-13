/**
* worklist.include
* --------------------------------------
* @version 2.0.0
*/


/**
* include
* --------------------------------------
*/

function inc_linkInfo(){
	var isDev = (window.location.hostname.substr(0,3) === 'dev') ? true : false;
	var goURL = {}
		, HI_PATH = './'
		, PS_PATH = '../../src_PS/app/_guide/'
		, B2B_PATH = '../../../src_b2b/'
		, ADMIN_PATH = '../../../src_admin/'
		, localURL = {
			// 개인
			HI : HI_PATH+'worklist.html'
			, KC : HI_PATH+'worklist.KC.html'
			, GC : HI_PATH+'worklist.GC.html'
			, HP : HI_PATH+'worklist.HP.html'
			, DM : HI_PATH+'worklist.DM.html'
			, PS : PS_PATH+'worklist.PS.html' // else

			//기업
			, BB : B2B_PATH+'index.BB.html'
			, CG : B2B_PATH+'index.CG.html'
			, CE : B2B_PATH+'index.CE.html'
			, BB_GUIDE : B2B_PATH+'guide.html'
			, BB_TODO : B2B_PATH+'todo.html'

			//관리자
			, HA : ADMIN_PATH + 'index.HA.html'
			, CA : ADMIN_PATH + 'index.CA.html'
			, BA : ADMIN_PATH + 'index.BA.html'
			, HAMO : HI_PATH+'worklist.HAMO.html' //else

			, HA_GUIDE : ADMIN_PATH + 'guide.html'
			, HA_TODO : ADMIN_PATH + 'todo.html'

			//GUIDE
			, HI_GUIDE : HI_PATH+'worklist.guide.html'
			, HI_TODO: HI_PATH+'worklist.todo.html'
			, HI_DATA: HI_PATH+'worklist.addon/data-converter/index.html'
			, HI_SVG: HI_PATH+'worklist.addon/url-encoder-SVG/index.html'
		}

		, devURL = {
			// 개인
			HI : 'http://dev.hi.co.kr/pub/_guide/worklist.html'
			, KC : 'http://dev.hi.co.kr/pub/_guide/worklist.KC.html'
			, GC : 'http://dev.hi.co.kr/pub/_guide/worklist.GC.html'
			, HP : 'http://dev.hi.co.kr/pub/_guide/worklist.HP.html'
			, DM : 'http://dev.hi.co.kr/pub/_guide/worklist.DM.html'
			, PS : 'http://dev.hi.co.kr/pension/pub/_guide/worklist.html' // else

			//기업
			, BB : 'http://dev.hi.co.kr/b2b/pub/_pub_guide/worklist.BB.html'
			, CG : 'http://dev.hi.co.kr/cargo/pub/_pub_guide/worklist.CG.html'
			, CE : 'http://dev.hi.co.kr/cargo/pub/_pub_guide/worklist.CE.html'
			, BB_GUIDE : 'http://dev.hi.co.kr/cargo/pub/_pub_guide/worklist.guide.html'
			, BB_TODO : 'http://dev.hi.co.kr/cargo/pub/_pub_guide/worklist.todo.html'

			//관리자
			, HA : 'https://devadmin.hi.co.kr/pub/_pub_guide/worklist.HA.html'
			, CA : 'http://devadmin.hi.co.kr/cargo/pub/_pub_guide/worklist.CA.html'//적하
			, BA : 'http://devadmin.hi.co.kr/b2b/pub/_pub_guide/worklist.BA.html'//b2b
			, HAMO : 'http://dev.hi.co.kr/pub/_guide/worklist.HAMO.html' //else
			, HA_GUIDE : 'https://devadmin.hi.co.kr/pub/_pub_guide/worklist.guide.html'
			, HA_TODO : 'https://devadmin.hi.co.kr/pub/_pub_guide/worklist.todo.html'

			//GUIDE
			, HI_GUIDE : 'http://dev.hi.co.kr/pub/_guide/worklist.guide.html'
			, HI_TODO: 'http://dev.hi.co.kr/pub/_guide/worklist.todo.html'
			, HI_DATA: 'http://dev.hi.co.kr/pub/_guide/worklist.addon/data-converter/index.html'
			, HI_SVG: 'http://dev.hi.co.kr/pub/_guide/worklist.addon/url-encoder-SVG/index.html'
		}
	;

	if(isDev) goURL = devURL;
	else goURL = localURL;

	var str='';
	str+='<table>';
	str+='<caption>Link info</caption>';
	str+='<colgroup>';
	str+='	<col width="100px" />';
	str+='	<col width="auto" />';
	str+='</colgroup>';
	str+='<tbody>';
	str+='	<tr>';
	str+='		<th scope="row" >개인</th>';
	str+='		<td class="tobe_section">';
	str+='			<div>';
	str+='				<a href="'+goURL.HI+'" class="btn aa01"><span>대표</span></a>';
	str+='				<a href="'+goURL.KC+'" class="btn aa02"><span>회사소개</span></a>';
	str+='				<a href="'+goURL.GC+'" class="btn aa03"><span>회사EN</span></a>';
	str+='				<a href="'+goURL.HP+'" class="btn aa04"><span>하이플래너</span></a>';
	str+='				<a href="'+goURL.DM+'" class="btn aa05"><span>직영</span></a>';
	str+='				<a href="'+goURL.PS+'" class="btn bb04"><span>퇴직연금</span></a>';// else
	str+='			</div>';
	str+='		</td>';
	str+='	</tr>';

	// str+='	<tr>';
	// str+='		<th scope="row" >기업</th>';
	// str+='		<td class="tobe_section">';
	// str+='			<div>';
	// str+='				<a href="'+goURL.BB+'" class="btn bb01"><span>B2B</span></a>';
	// str+='				<a href="'+goURL.CG+'" class="btn bb02"><span>적하</span></a>';
	// str+='				<a href="'+goURL.CE+'" class="btn bb03"><span>적하EN</span></a>';
	// str+='				<a href="'+goURL.BB_GUIDE+'" class="btn b2b_guide_btn"><span>Guide</span></a>';
	// str+='				<a href="'+goURL.BB_TODO+'" class="btn b2b_todo_btn"><span>Todo</span></a>';
	// str+='			</div>';
	// str+='		</td>';
	// str+='	</tr>';

	str+='	<tr>';
	str+='		<th scope="row" >관리자</th>';
	str+='		<td class="tobe_section">';
	str+='			<div>';
	// str+='				<a href="'+goURL.HA+'" class="btn cc01"><span>대표</span></a>';
	// str+='				<a href="'+goURL.CA+'" class="btn cc02"><span>적하</span></a>';
	// str+='				<a href="'+goURL.BA+'" class="btn cc03"><span>B2B</span></a>';
	str+='				<a href="'+goURL.HAMO+'" class="btn bb05"><span>장애대응</span></a>';// else
	// str+='				<a href="'+goURL.HA_GUIDE+'" class="btn admin_btn"><span>Guide</span></a>';
	// str+='				<a href="'+goURL.HA_TODO+'" class="btn admin_todo_btn"><span>Todo</span></a>';
	str+='			</div>';
	str+='		</td>';
	str+='	</tr>';

	str+='	<tr>';
	str+='		<th scope="row">Guide</th>';
	str+='		<td class="etc_section">';
	str+='			<div>';
	str+='				<a href="'+goURL.HI_GUIDE+'" class="btn"><span>Guide</span></a>';
	str+='				<a href="'+goURL.HI_TODO+'" class="btn todo_btn"><span>Todo</span></a>';
	str+='				<a href="'+goURL.HI_DATA+'" class="btn" target="_blank"><span>Data</span></a>';
	str+='				<a href="'+goURL.HI_SVG+'" class="btn" target="_blank"><span>Svg</span></a>';
	str+='				<a href="javascript:void(0);" class="log_btn btn"><span>Log</span></a>';
	str+='			</div>';
	str+='		</td>';
	str+='	</tr>';

	str+='</tbody>';
	str+='</table>';
	document.write(str);
}


function inc_filter(){
	var str='';
	str+='		<table width="" summary="퍼블리싱 문서 규격 및 크로스브라우징 관련">';
	str+='		<caption>문서 정보</caption>';
	str+='		<colgroup><col width="100px" /><col width="atuo" /></colgroup>';
	str+='		<tbody>';
	str+='			<tr>';
	str+='				<th rowspan="2"><span class="total_rate">&nbsp;<span></th>';
	str+='				<td class="filterOption">';
	str+='					<p><strong>* Delete :</strong>';
	str+='						<label><input type="radio" name="ch_del" id=del01 value="true"  /> 포함</label>';
	str+='						<label><input type="radio" name="ch_del" id="del02" value="false" checked /> 제외</label>';
	str+='					</p>';
	str+='					<p class="ml10"><strong>* Group :</strong>';
	str+='						<label><input type="radio" name="ch_group" id="gropu01" value="true" checked /> Yes</label>';
	str+='						<label><input type="radio" name="ch_group" id=gropu02 value="false" /> No</label>';
	str+='					</p>';
	str+='					<p class="ml10"><strong>* Child :</strong>';
	str+='						<label><input type="radio" name="ch_child" id="child01" value="true" checked /> Yes</label>';
	str+='						<label><input type="radio" name="ch_child" id=child02 value="false" /> No</label>';
	str+='					</p>';
	str+='				</td>';
	str+='			</tr>';
	str+='			<tr>';
	str+='				<td class="filter_btn">';
	str+='					<div><a href="javascript:void(0);" class="equal btn bullet" title="equal"><span>동일</span></a>';
	// str+='					<a href="javascript:void(0);" class="hold btn bullet" title="hold"><span>보류</span></a>';
	// str+='					<a href="javascript:void(0);" class="rework btn bullet" title="rework"><span>재확인</span></a>';
	str+='					<a href="javascript:void(0);" class="popup btn bullet" title="popup"><span>팝업</span></a>';
	// str+='					<a href="javascript:void(0);" class="new btn bullet" title="new"><span>우선</span></a></div>';
	str+='					<a href="javascript:void(0);" class="del btn bullet" title="del"><span>삭제</span></a>';
	str+='					<a href="javascript:void(0);" class="result btn bullet" title="result"><span>완료</span></a>';
	str+='					<a href="javascript:void(0);" class="result_ex btn bullet" title="result_ex"><span>미완</span></a>';
	str+='					<a href="javascript:void(0);" class="total btn bullet on" title="total"><span>Total</span></a>';
	str+='				</td>';
	str+='			</tr>';

	str+='			<tr>';
	str+='				<th rowspan="2"><label for="id_search">Search</label></th>';
	str+='				<td class="search">';
	str+='					<input type="text" name="search" value="" id="id_search" placeholder="Search" />';
	str+='				</td>';
	str+='			</tr>';

	str+='		</tbody>';
	str+='		</table>';
	document.write(str);
}


function inc_IAHead(){
	var str='';
	str+='<caption>작업 리스트</caption>';
	str+='<colgroup>';
	str+='	<col width="35px" /><!-- 번호 -->';
	str+='	<col class="depth2" style="width:8%" /><!-- 2Depth -->';
	str+='	<col class="depth3" style="width:8%" /><!-- 3Depth -->';
	str+='	<col class="depth4" style="width:10%" /><!-- 4Depth -->';
	str+='	<col class="depth5" style="width:10%" /><!-- 5Depth -->';
	str+='	<col class="depth6" style="width:9%" /><!-- 6Depth -->';
	str+='	<col class="page" style="width:12%" /><!-- 화면명 -->';
	str+='	<col class="path" style="width:110px" /><!-- 화면 ID -->';
	str+='	<col class="corder" style="width:60px" /><!-- 담당자 -->';
	str+='	<col class="ddate" style="width:60px" /><!-- 예정일 -->';
	str+='	<col class="rdate" style="width:60px" /><!-- 완료일 -->';
	str+='	<col class="pdate" style="width:60px" /><!-- 검수대상 -->';
	str+='	<col class="mdate" style="width:60px" /><!-- 수정일 -->';
	str+='	<col class="info" style="width:12%" /><!-- 요약 -->';
	str+='	<col class="etc" style="width:auto" /><!-- 비고 -->';
	str+='</colgroup>';
	str+='<thead>';
	str+='	<tr>';
	str+='		<th scope="col" class="num">No</th>';
	str+='		<th scope="col" class="depth2">2Depth</th>';
	str+='		<th scope="col" class="depth3">3Depth</th>';
	str+='		<th scope="col" class="depth4">4Depth</th>';
	str+='		<th scope="col" class="depth5">5Depth</th>';
	str+='		<th scope="col" class="depth6">6Depth</th>';
	str+='		<th scope="col" class="page">Page</th>';
	str+='		<th scope="col" class="path">Path</th>';
	str+='		<th scope="col" class="corder">담당자</th>';
	str+='		<th scope="col" class="ddate">예정</th>';
	str+='		<th scope="col" class="rdate">완료</th>';
	str+='		<th scope="col" class="pdate">검수대상</th>';
	str+='		<th scope="col" class="mdate">고객검수</th>';
	str+='		<th scope="col" class="info">Etc</th>';
	str+='		<th scope="col" class="etc">Log</th>';
	str+='	</tr>';
	str+='</thead>';
	document.write(str);
}



// ---------------------
// worklist.guide
//---------------------
function inc_IAHead_guide(){
	var str='';
	str+='<caption>작업 리스트</caption>';
	str+='<colgroup>';
	str+='	<col width="3%" /><!-- 번호 -->';
	str+='	<col class="depth2" style="width:9%" /><!-- 2Depth -->';
	str+='	<col class="depth3" style="width:9%" /><!-- 3Depth -->';
	str+='	<col class="depth4" style="width:9%" /><!-- 4Depth -->';
	str+='	<col class="page" style="width:18%" /><!-- Page -->';
	str+='	<col class="path" style="width:10%" /><!-- 경로 -->';
	str+='	<col class="rdate" style="width:4%" /><!-- 완료일 -->';
	str+='	<col class="etc" style="width:auto" /><!-- 비고 -->';
	str+='</colgroup>';
	str+='<thead>';
	str+='	<tr>';
	str+='		<th scope="col" class="num">No</th>';
	str+='		<th scope="col" class="depth2">2Depth</th>';
	str+='		<th scope="col" class="depth3">3Depth</th>';
	str+='		<th scope="col" class="depth4">4Depth</th>';
	str+='		<th scope="col" class="depth5">Page</th>';
	str+='		<th scope="col" class="path">Path</th>';
	str+='		<th scope="col" class="rdate">End</th>';
	str+='		<th scope="col" class="etc">Etc</th>';
	str+='	</tr>';
	str+='</thead>';
	document.write(str);
}

// ---------------------
// worklist.history
//---------------------
function inc_IAHead_modify(){
	var str='';
	str+='<caption>작업 리스트</caption>';
	str+='<colgroup>';
	str+='	<col width="35px" /><!-- 번호 -->';
	str+='	<col class="id" style="width:54px" /><!-- index -->';
	str+='	<col class="depth2" style="width:10%" /><!-- Page -->';
	str+='	<col class="depth3" style="width:33%" /><!-- 내용 -->';
	str+='	<col class="path" style="width:125px" /><!-- 경로 -->';
	str+='	<col class="plan" style="width:50px" /><!-- 요청자 -->';
	str+='	<col class="corder" style="width:50px" /><!-- 담당자 -->';
	str+='	<col class="ddate" style="width:50px" /><!-- 요청일 -->';
	str+='	<col class="rdate" style="width:50px" /><!-- 완료일 -->';
	str+='	<col class="info" style="width:16%" /><!-- Etc -->';
	str+='	<col class="etc" style="width:auto" /><!-- Log -->';
	str+='</colgroup>';
	str+='<thead>';
	str+='	<tr>';
	str+='		<th scope="col" class="num">No</th>';
	str+='		<th scope="col" class="id">ID</th>';
	str+='		<th scope="col" class="depth2">Page</th>';
	str+='		<th scope="col" class="depth3">내용</th>';
	str+='		<th scope="col" class="path">Path</th>';
	str+='		<th scope="col" class="plan">요청자</th>';
	str+='		<th scope="col" class="corder">담당자</th>';
	str+='		<th scope="col" class="ddate">요청일</th>';
	str+='		<th scope="col" class="rdate">완료일</th>';
	str+='		<th scope="col" class="info">Etc</th>';
	str+='		<th scope="col" class="etc">Log</th>';
	str+='	</tr>';
	str+='</thead>';
	document.write(str);
}



