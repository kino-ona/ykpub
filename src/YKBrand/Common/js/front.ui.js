$(document).ready(function () {

  var dheight = $(document).height();

  //footer slide
  // $("footer .footerCont .shortcut").children("ul").bxSlider({
  //     pager: false,
  //     slideWidth: 180,
  //     minSlides: 5,
  //     maxSlides: 5
  // });
  $("footer .footerCont").css({ 'position': 'relative', 'top': 'auto', 'left': 'auto' });

  //통합 메인 slide
  $(".combiMain .banner .mainBanner").bxSlider({
      auto: true,
      autoControls: true,
      autoControlsCombine: true
  });

  //브랜드 메인 slide
  $(".brandMain .banner .mainBanner").bxSlider({
      auto: true,
      autoControls: true,
      autoControlsCombine: true
  });

  //하기스 이른둥의 희망찾기 slide
  $(".hope .banner .hopeBanner").bxSlider({
      auto: true,
      autoControls: true,
      autoControlsCombine: true
  });

  //전체 브랜드 레이어
  $("header .headerCont").children(".allBrand").bind("click", function (e) {
      var dheight = $(document).height();
      $("header").children(".mask").css("height", dheight).show();
      $("#allBrandlayer").attr("tabindex", "0").show().focus();

      e.preventDefault();
  });

  $("#allBrandlayer .layerCont").children(".close").bind("click", function (e) {
      $("header").children(".mask").hide();
      $("#allBrandlayer").removeAttr("tabindex").hide();
      $("header .headerCont").children(".allBrand").focus();

      e.preventDefault();
  });

  //전체 메뉴 레이어
  $("header .headerCont").children(".allMenu").bind("click", function (e) {
      var dheight = $(document).height();
      $("header").children(".mask").css("height", dheight).show();
      $("#allmenu_layer").attr("tabindex", "0").show().focus();

      e.preventDefault();
  });

  $("#allmenu_layer .layerCont").children(".close").bind("click", function (e) {
      $("header").children(".mask").hide();
      $("#allmenu_layer").removeAttr("tabindex").hide();
      $("header .headerCont").children(".allMenu").focus();

      e.preventDefault();
  });

  //통합메인 전체 브랜드 레이어
  $("#combiMain header .headerCont .utilMenu li").children(".allBrand").bind("click", function (e) {
      var dheight = $(document).height();
      $("header").children(".mask").css("height", dheight).show();
      $("#allBrandlayer").attr("tabindex", "0").show().focus();

      e.preventDefault();
  });

  $("#combiMain #allBrandlayer .layerCont").children(".close").bind("click", function (e) {
      $("header").children(".mask").hide();
      $("#allBrandlayer").removeAttr("tabindex").hide();
      $("#combiMain header .headerCont .utilMenu li").children(".allBrand").focus();

      e.preventDefault();
  });

  //제품 리스트 높이값
  //var productListHeight = $(".productList ul.type1").children("li").height();
  //$(".productList ul.type1").children(".nolist").css("height",productListHeight);
  var productListHeight = $(".productList ul.type2").children("li").height();
  $(".productList ul.type2").children(".nolist").css("height", productListHeight);

  //제품상세 상단 설명
  $(".productView").each(function () {
      $(".productView .topSec .topSecCont .sec2 dl").children("dt:first-child").addClass("pd");
      $(".productView .topSec .topSecCont .sec2 dl").children("dd:nth-of-type(1)").addClass("pd");
  });

  //gnb
  $("#gnb").children("li").bind("mouseover", function () {
      $(this).children("a").addClass("on");
      $(this).children(".depth").show();
  });
  $("#gnb").children("li").bind("mouseout", function () {
      $(this).children("a").removeClass("on");
      $(this).children(".depth").hide();
  });

  $("#gnb li").children("a").bind("focus", function () {
      var index = $(this).parent().index();
      $("#gnb li").children("a").removeClass("on");
      $(this).addClass("on");
      $("#gnb li").children(".depth").hide();
      $(this).parent().children(".depth").show();
  });
  $("#gnb li ul li").children("a").unbind("focus");

  //	$("#gnb li .depth").children("li:last-child").children("a").bind("focusout",function(){
  //		$(this).parent().parent().parent().children("a").removeClass("on");
  //		$(this).parent().parent().hide();
  //	});

  $("header").find(".allMenu").bind("focus", function () {
      $("#gnb li").children("a").removeClass("on");
      $("#gnb li").children(".depth").hide();
  });

  $("#container").bind("focusin", function () {
      $("#gnb li").children("a").removeClass("on");
      $("#gnb li").children(".depth").hide();
  });

  //FAQ
  $(document).on("click", ".faq .faqList .list dl dt a", function () {
      if ($(this).parent().next("dd").css("display") == "none") {
          $(".faq .faqList .list dl dt").children("a").removeClass("on");
          $(".faq .faqList .list dl dd").hide();
          $(this).addClass("on");
          $(this).parent().next("dd").show();
      } else {
          $(this).removeClass("on");
          $(this).parent().next("dd").hide();
      }
  });

  //회원가입 > 본인인증 > 이용 가능 사이트 안내
  $(".siteInfo .stit").children("a").click(function () {
      if ($(this).parent().next("div").css("display") == "none") {
          $(this).parent().next("div").show();
          var img = $(this).children("img").attr("src").replace("_on", "_off");
          $(this).children("img").attr("src", img);
          $(this).children("img").attr("alt", "이용 가능 사이트 닫기");
      } else {
          $(this).parent().next("div").hide();
          var img = $(this).children("img").attr("src").replace("_off", "_on");
          $(this).children("img").attr("src", img);
          $(this).children("img").attr("alt", "이용 가능 사이트 열기");
      }
  });

  //회원가입 > 회원정보입력 > 아이정보 입력  라디오선택
  /*
$(".sso .inputInfo").find(".childinfoSel").hide();
$("#childinfoChk").children(".ui_radio").click(function(){
	var index = $(this).index();
	if (index == 1)
	{
		$(this).parent().parent().parent().children("tr.childinfoSel").show();
	} else {
		$(this).parent().parent().parent().children("tr.childinfoSel").hide();
	}
});

//회원가입 > 회원정보입력 > 아이추가 출산여부 라디오선택
$(".childinfoInput").each(function(){
	$(this).find("tr.birthsel2").hide();
	$(this).find(".birthsel").children(".ui_radio").click(function(){
		var index = $(this).index();
		if (index == 0)
		{
			$(this).parent().parent().parent().children("tr.birthsel1").show();
			$(this).parent().parent().parent().children("tr.birthsel2").hide();
		} else {
			$(this).parent().parent().parent().children("tr.birthsel1").hide();
			$(this).parent().parent().parent().children("tr.birthsel2").show();
		}
	});
});
  */

  //마이비데 > 마이비데 보고서 > 설문 > 구입 라디오선택
  $("#mysel li").children(".ui_radio").bind("click", function () {
      var id = $(this).children("input").attr("id");
      if (id = "q6_2") {
          $("#mysel li").children("ul").hide();
          $(this).parent().children("ul").show();
      }
  });
  $("#mysel li ul li").children(".ui_radio").unbind();

  //우편번호 찾기 팝업 tab
  $(".zipcodePop").find(".tab li").children("a").click(function () {
      $(".zipcodePop").find(".tab").children("li").children("a").removeClass("on");
      $(".zipcodePop").find(".tab").children("li").children(".tabCont").hide();
      $(this).addClass("on");
      $(this).parent().children(".tabCont").show();
  });

  //통합메인 > 참여이벤트 팝업 > 기간조회 버튼 이벤트
  $("#period").children("button").bind("click", function () {
      $("#period").children("button").removeClass("on");
      $(this).addClass("on");
  });

  //디펜드 설문조사
  $("#deq4 li").children(".ui_radio").bind("click", function () {
      var $id = $(this).children("input").attr("id");
      if ($(this).children("input").attr("id") == "q4_2") {
          $("#q4sel").show();
      } else {
          $("#q4sel").hide();
      }
  });

  //티엔 매장찾기
  var $storesel = $(".tn").find(".store");
  $storesel.find(".selRegion").children("ul").children("li").bind("click", function () {
      var seltxt = $(this).text();
      $storesel.find(".listArea").children("h3.hdt").text(seltxt);
  });


	// 201805 : main renewal ui script
	if($(".remain .main_visu_rolling").length > 0){
		$(".main_visu_rolling > ul").bxSlider({
	      auto: true,
				controls: false,
	  });
	}
	if($(".remain .brand").length > 0){
		$(".brand_rolling > ul").bxSlider({
	      auto: true,
				controls: false,
				pagerCustom: '.brand_rolling #bx-pager'
	  });
	}
	if($(".remain .vod_rolling").length > 0){
		$(".vod_rolling ul").bxSlider({
	      auto: false,
				controls: true,
				adaptiveHeight: true,
				pagerType: 'short',
				pagerCustom: '.vod_rolling #bx-pager'
	  });
	}

  $("footer.renewfoo .footerCont .shortcut").children("ul").bxSlider({
      pager: false,
      slideWidth: 230,
      minSlides: 5,
      maxSlides: 5
  });

});
