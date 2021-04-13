$(function () {

    // 상단 바로가기
    $(".btnTop").click(function (e) {
        window.scrollTo(0, 0);

        e.preventDefault();
    });

    // ignore 클래스 Validation 무시
    if ($('form')[0] != undefined && $.data($('form')[0], 'validator') != undefined) {
        var settngs = $.data($('form')[0], 'validator').settings;
        settngs.ignore = ".ignore";
    }

    // Textarea에 maxlength적용
    $("textarea[maxlength]").bind('input propertychange', function () {
        var maxLength = $(this).attr('maxlength');
        if ($(this).val().length > maxLength) {
            $(this).val($(this).val().substring(0, maxLength));
        }
    })

    // 이미지 업로드
    $('.singleUpload').fileupload({
        url: ImageServerUrl + '/Upload/UserFileUpload',
        crossdomain: true,
        dataType: 'json',
        async: false,
        add: function (e, data) {
            var uploadFile = data.files[0];
            var isValid = true;
            if (!(/png|jpe?g|gif/i).test(uploadFile.name.toLowerCase())) {
                alert('png, jpg, jpeg, gif 만 업로드 가능합니다');
                isValid = false;
            } else if (uploadFile.size > 1024 * 1024 * 5) {
                alert('5MB 이하의 이미지 파일만 등록 가능합니다.');
                isValid = false;
            }
            if (isValid) {
                data.submit();
            }
        },
        beforeSend: function () {
            $(".btnRegist").unbind("click");
            //$("#loading").show();
        },
        complete: function () {
            $(".btnRegist").bind("click");
            //$("#loading").hide();
        },
        done: function (e, data) {
            if (data.result.isUploaded) {
                var parent = $(this).closest(".uploadContainer");
                parent.find(".fidx").val(data.result.fidx);
                parent.find(".fileName").val(data.result.fileName);
                parent.find(".randName").val(data.result.randomFileName);
                parent.find(".file .fileLabel").text(data.result.fileName);
                parent.find(".upload").hide();
                parent.find(".file").show();
            }
            else {
                alert(data.result.message);
            }
        },
        fail: function (request, status, error) {
            if (request.readyState == 0 || request.status == 0)
                return
            else
                alert('에러가 발생하였습니다.');
        }
    }).prop('disabled', !$.support.fileInput).parent().addClass($.support.fileInput ? undefined : 'disabled');

    // 이미지 삭제
    $("body").on("click", ".btnImgDelete", function (e) {
        e.preventDefault();

        var parent = $(this).closest(".uploadContainer");
        parent.find(".fileName").val("");
        parent.find(".randName").val("");
        parent.find(".fidx").val("0");
        parent.find(".file").hide();
        parent.find(".upload").show();
    });

    // 게시글 팝업 버튼 이벤트
    $(".btnPopup").click(function () {
        var url = $(this).data("url");
        var width = $(this).data("width");
        var height = $(this).data("height");
        window.open(url, 'popup', 'width=' + width + ',height=' + height + ',top=0,left=0,scrollbars=no');
    });

    // 한글 입력 막기
    $(".blockKor").keyup(function (event) {
        $(this).val($(this).val().replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, ''));
    });
});

function fileDownload(idx) {
    location.href = ImageServerUrl + "/Upload/FileDownload/" + idx;
}

// 날짜 포맷 변경(20160513수정)
function dateFormat(date, format) {
    var year = date.getUTCFullYear();
    var month = date.getUTCMonth() + 1;
    var day = date.getUTCDate();
    var hour = date.getUTCHours();
    var minute = date.getUTCMinutes();
    var second = date.getUTCSeconds();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    format = format.replace("yy", year);
    format = format.replace("mm", month);
    format = format.replace("dd", day);
    format = format.replace("hh", hour);
    format = format.replace("MM", minute);
    format = format.replace("ss", second);

    return format;
}

// 3자리마다 콤마표시
function setComma(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// 태그 제거
function removeTag(html) {
    if (html != null) {
        return html.replace(/<[^>]+>/g, "");
    } else {
        return null;
    }
}

// 유튜브 동영상 URL에서 썸네일 이미지 추출
function getThumbnail(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[7].length == 11) {
        var thumbUrl = "http://img.youtube.com/vi/" + match[7] + "/0.jpg";
        return thumbUrl;
    } else {
        return false;
    }
}

// Byte로 글자수 자르기
function cutString(str, len) {
    var l = 0;
    for (var i = 0; i < str.length; i++) {
        l += (str.charCodeAt(i) > 128) ? 2 : 1;
        if (l > len) return str.substring(0, i) + "...";
    }
    return str;
}

function isValidKoreanEnglish(str) {
    //var pattern = /^[가-힣a-zA-Z]+$/;
    var pattern = /^[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z]+$/;
    return pattern.test(str);
};

//IDPopup 체크박스
$(document).ready(function () {
    $("input:checkbox").on('click', function () {
        if ($(this).prop('checked')) {
            $(".pop_back").hide();
            $(".pop_back1").show();
        } else {
            $(".pop_back").show();
            $(".pop_back1").hide();
        }
    });
});

function popupResize(a) {
    var divEl = document.createElement("div");
    divEl.style.position = "absolute";
    divEl.style.left = "0px";
    divEl.style.top = "0px";
    divEl.style.width = "100%";
    divEl.style.height = "100%";
    document.body.appendChild(divEl);
    var Dwidth = a;
    var Dheight = parseInt(document.body.offsetHeight);

    window.resizeBy(Dwidth - divEl.offsetWidth, Dheight - divEl.offsetHeight);
    document.body.removeChild(divEl);
}

//  문자열의 길이 체크
function jsCheckStringLength(strOriginal, strFind, strChange)
{
    var position, strOri_Length;
    position = strOriginal.indexOf(strFind);

    while (position != -1) {
        strOriginal = strOriginal.replace(strFind, strChange);
        position = strOriginal.indexOf(strFind);
    }

    strOri_Length = strOriginal.length;

    return strOri_Length;
}

//  Email 확인 정규식
function isEmail(strEmail) {
    var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if (strEmail.match(regExp) != null) {
        return true;
    }
    else {
        return false;
    }
}

//  휴대폰 번호 체크
function isMobileNumber(mobile1, mobile2, mobile3) {
    // 첫번째 자리가 010인경우 두번째 자리는 4자리여야 한다.
    if (mobile1 == "010" && mobile2.length != 4) {
        return false;
    }

    //  두번째 자리는 3자리 또는 4자리 여야 한다.(010은 4자리)
    if (mobile2.length < 3 && mobile2.length > 4)
    {
        return false;
    }

    // 두번째 자리는 0으로 시작하면 안된다.
    var mobile2_first = mobile2.substring(0, 1);
    if (mobile2_first == "0") {
        return false;
    }

    // 전화번호 가운데자리, 마지막자리가 같아서는 안된다.
    if (mobile2 == mobile3) {
        return false;
    }

    //세번째 자리가 4자리가 아니면 안된다.
    if (mobile3.length != 4) {
        return false;
    }

    return true;
}

//  약관 동의 여부 체크
//  termsData Object Key
//  1. returnCode
//  2. returnMessage
//  3. termsActionUrlPageName
function isTerms(termsData)
{
    if (termsData.hasOwnProperty("returnCode"))
    {
        if (termsData.returnCode == 0) {
            if (termsData.termsActionUrlPageName != "")
            {
                var rawUrl = termsData.hasOwnProperty("rawUrl") ? termsData.rawUrl : "/";
                var returnURL = "/SSL/" + termsData.termsActionUrlPageName;

                if (rawUrl != "") {
                    returnURL += "?return=" + encodeURIComponent(rawUrl);
                }

                location.href = returnURL;
            }
            else
            {
                alert("사이트 이용 약관 동의 여부에 관련된 고객님의 정보 조회가 정상적으로 이루어지지 않았습니다.");

            }
        }
    }
    else
    {
        alert("사이트 이용 약관 동의 여부에 관련된 고객님의 정보 조회가 정상적으로 이루어지지 않았습니다.");
    }
}


function setNumberBtn(event) {
    event = event || window.event;
    var eventKey = (event.which) ? event.which : event.keyCode;

    if ((eventKey >= 48 && eventKey <= 57) || (eventKey >= 96 && eventKey <= 105) || (eventKey == 8 || eventKey == 46) || (eventKey == 37 || eventKey == 39) || eventKey == 9) {
        return true;
    }
    else {
        return false;
    }
}
