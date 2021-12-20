var fileTemp = [];


$(document).ready(function () {
    $("#summernote").summernote({
        width: 1000,
        height: 300,
        minHeight: 300,
        maxHeight: 300,
        focus: true,
        lang: "ko-KR",
        placeholder: '내용을 입력해주세요.',
    });

    $('#ins_file').change(function () {
        let fileList = $('#ins_file')[0].files;
        console.log(fileList);



        for (var i = 0; i < fileList.length; i++) {

            var sizefmt = '';

            if (fileList[i].size > (1024 ** 2)) {
                sizefmt = (fileList[i].size / (1024 ** 2)).toFixed(2) + "MB";
            } else if (fileList[i].size > (1024)) {
                sizefmt = (fileList[i].size / 1024).toFixed(2) + "KB";
            } else {
                sizefmt = fileList[i].size.toFixed(2) + "B";

            }

            let str = '<li>' + fileList[i].name + ' (' + sizefmt + ')' + '<button type="button" class="del_file" onclick="deleteFile(this);">&#10005;</button></li>';

            if(($('#file-list > li').length + 1) <= 5) {
                console.log($('#file-list > li').length);
                $('#file-list').append(str);
                fileTemp.push(fileList[i]);
            } else {
                alert("파일은 최대 5개까지만 업로드 할 수 있습니다.");

            }

        };

        $('#ins_file').val("");
    });
});

function insertRow() {
    let form  = $('#insertForm')[0];
    let data = new FormData(form);
    for(var j = 0; j < fileTemp.length; j++) {
        data.append('filename', fileTemp[j]);
    }
    console.log(data);

    if ($('#title_slot').val().trim() == "") {
        alert("제목을 입력해주세요.");
    } else if ($('#summernote').summernote('code').trim() == "") {
        alert("내용을 입력해주세요.");
    } else {
        $.ajax({
            url: "insert.do",
            type: "POST",
            data: data,
            cache: false,
            contentType: false,
            processData: false,
            success: function () {
                alert("등록 완료");
                location.replace("/");
            },
            error: function () {
                alert("통신실패");
            }
        })
    }

}

function updateRow() {
    let param = {
        idx: $('#idx').val(),
        title: $('#title_slot').val(),
        content: $('#summernote').summernote('code')
    }

    if (param.title.trim() == "") {
        alert("제목을 입력해주세요.")
    } else if (param.content.trim() == "") {
        alert("내용을 입력해주세요.")
    } else {

        $.ajax({
            url: "update.do",
            type: "post",
            data: param,
            success: function () {
                alert("수정 완료");
                location.replace("/view?idx=" + param.idx);
            },
            error: function () {
                alert("통신 실패");
            }
        })

    }

}

function deleteRow() {
    let param = {
        idx: $('#idx').val()
    };
    $.ajax({
        url: "delete.do",
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

function deleteFile(e) {
    var index = $(".del_file").index(e);

    $('#file-list > li:eq('+ index +')').remove();

}