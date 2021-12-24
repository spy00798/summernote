let fileTemp = [];
let imgExt = /(.*?)\.(jpg|jpeg|png|gif|bmp)$/;
let url = $(location).attr('href');
let maxfile = 5;
let cnt = 0;
let orgFile = [];



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
        let fileList = this.files;
        console.log(fileList);

        [].forEach.call(fileList, item => {
            let fileExt = item.name.substring(item.name.lastIndexOf("."), item.name.length);

            console.log(fileExt);

            if (!fileExt.toLowerCase().match(imgExt)) {
                alert("이미지 타입의 파일만 업로드 할 수 있습니다.")
            } else {

                let reader = new FileReader();

                reader.onload = function() {
                    var sizefmt = '';

                    if (item.size > (1024 ** 2)) {
                        sizefmt = (item.size / (1024 ** 2)).toFixed(2) + "MB";
                    } else if (item.size > (1024)) {
                        sizefmt = (item.size / 1024).toFixed(2) + "KB";
                    } else {
                        sizefmt = item.size.toFixed(2) + "B";

                    }

                    let str = '<li id="'+ cnt +'">' + item.name + ' (' + sizefmt + ')' + '<button type="button" class="del_file" onclick="deleteFile(this);">&#10005;</button></li>';

                    if(($('#file-list > li').length + 1) <= maxfile) {
                        console.log($('#file-list > li').length);
                        $('#file-list').append(str);
                        fileTemp.push(item);
                        cnt++;
                    } else {
                        alert("파일은 최대 5개까지만 업로드 할 수 있습니다.");
                    }
                }
                reader.readAsDataURL(item);

            };


        });
        $('#ins_file').val("");
    });

    if(url.indexOf("/view") != -1) {
        let param = {
            idx: $('#idx').val()
        };

        $.ajax({
            url: 'selectfile.do',
            type: 'POST',
            data: param,
            success: function (result) {
                for (var i = 0; i < result.length; i++) {
                    var sizefmt = '';
                    if (result[i].filesize > (1024 ** 2)) {
                        sizefmt = (result[i].filesize / (1024 ** 2)).toFixed(2) + "MB";
                    } else if (result[i].filesize > (1024)) {
                        sizefmt = (result[i].filesize / 1024).toFixed(2) + "KB";
                    } else {
                        sizefmt = result[i].filesize.toFixed(2) + "B";

                    }
                    let str = '<li>' + result[i].filename + "." + result[i].ext + ' (' + sizefmt + ')' + '</li>';
                    $('#file-view').append(str);
                }
            },
            error: function () {
                alert("통신실패");
            }
        })
    } else if(url.indexOf("/update") != -1) {
        let param = {
            idx: $('#idx').val()
        };
        $.ajax({
            url: 'selectfile.do',
            type: 'POST',
            data: param,
            success: function (result) {
                for (var i = 0; i < result.length; i++) {
                    var sizefmt = '';
                    if (result[i].filesize > (1024 ** 2)) {
                        sizefmt = (result[i].filesize / (1024 ** 2)).toFixed(2) + "MB";
                    } else if (result[i].filesize > (1024)) {
                        sizefmt = (result[i].filesize / 1024).toFixed(2) + "KB";
                    } else {
                        sizefmt = result[i].filesize.toFixed(2) + "B";

                    }
                    let str = '<li id="'+ cnt +'">' + result[i].filename + "." + result[i].ext + ' (' + sizefmt + ')' + '<button type="button" class="del_file" onclick="deleteFile(this);">&#10005;</button></li>';
                    $('#file-list').append(str);

                    cnt++;

                }
            },
            error: function () {
                alert("통신실패");
            }
        });
    }
});

function insertRow() {
    let form  = $('#insertForm')[0];
    let data = new FormData(form);
    data.append('title', $('#title_slot').val());
    data.append('content', $('#summernote').summernote('code'));
    for(var j = 0; j < fileTemp.length; j++) {
        data.append('file', fileTemp[j]);
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
    let updateForm = $('#update-form')[0];
    let formdata = new FormData(updateForm);
    formdata.append('idx', $('#idx').val());
    formdata.append('title', $('#title_slot').val());
    formdata.append('content', $('#summernote').summernote('code'));
    let itemList = document.querySelectorAll("#file-list > li");
    console.log(fileTemp);
    [].forEach.call(itemList, item =>{

    });

    console.log(fileTemp)
    var vaild_t = $('#title_slot').val().trim();
    var vaild_c = $('#summernote').summernote('code').trim();
    console.log(vaild_c);

    if (vaild_t == "") {
        alert("제목을 입력해주세요.")
    } else if (vaild_c == "") {
        alert("내용을 입력해주세요.")
    } else {

        $.ajax({
            url: "update.do",
            type: "post",
            data: formdata,
            cache: false,
            processData: false,
            contentType: false,
            success: function () {
                alert("수정 완료");
                location.replace("/view?idx=" + $('#idx').val());
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

    fileTemp.splice(index, 1);
    $('#file-list > li:eq('+ index +')').remove();

}