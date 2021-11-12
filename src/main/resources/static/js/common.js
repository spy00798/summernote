$(document).ready(function () {
    $("#summernote").summernote({
        width: '100%',
        height: 300,
        minHeight: 300,
        maxHeight: 500,
        focus: true,
        lang: "ko-KR",
        placeholder: '내용을 입력해주세요.',
        justifyLeft: true
    });
});

function insertRow() {
    let data = {
        title: $('#title_slot').val(),
        content: $('#summernote').summernote('code')
    }
    console.log(data);
    $.ajax({
        url: "insert.do",
        type: "POST",
        data: data,
        success: function () {
            alert("등록 완료");
            location.replace("/");
        },
        error: function () {
            alert("통신실패");
        }
    })
}

function updateRow() {
    alert("미완성 기능입니다.")
}
function deleteRow() {
    let param = {
      idx: $('#idx').val()
    };
    $.ajax({
        url:"delete.do",
        type: "POST",
        data: param,
        success: function () {
            alert("삭제완료");
            location.replace("/");
        },
        error: function () {
            alert("통신실패");
        }
    })
}