$(function () {
    var clipboard = new Clipboard('.clipboard');

    clipboard.on('success', function (e) {
        alert("클립보드에 복사되었습니다.");
    });

    clipboard.on('error', function (e) {
        console.log(e);
    });
});