let fileTemp = [];
let imgExt = /(.*?)\.(jpg|jpeg|png|gif|bmp)$/;
let url = $(location).attr('href');
let maxfile = 5;
let cnt = 0;



$(document).ready(function () {
    /**
     * FUNCTION:: Summernote라이브러리 사용해서 문서 에디터 설정
     */
    $("#summernote").summernote({
        width: 1000,
        height: 300,
        minHeight: 300,
        maxHeight: 300,
        focus: true,
        lang: "ko-KR",
        placeholder: '내용을 입력해주세요.',
    });

    /**
     * FUNCTION:: id가 ins_file인 input[type=file]태그에 파일을 선택 시 실행되는 함수
     */
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

                    fileTemp.push({
                        filename: result[i].filename,
                        filesize: result[i].filesize,
                        uuid:result[i].uuid,
                        ext:result[i].ext
                    });
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
    let itemList = document.querySelectorAll("#file-list > li");
    [].forEach.call(itemList, item => {
        data.append('file', fileTemp[item.id])
    })

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
            success: function (data) {
                console.log(data);
                if(data == "request error") {
                    alert("요청하는 도중 오류가 발생하였습니다.");
                    return;
                } else if(data == "File error") {
                    alert("파일을 업로드하는 도중 오류가 발생하였습니다.");
                    return;
                } else {
                    alert("등록 완료");
                    location.replace("/");
                }
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
    let fileindex = 1;
    let ordList = [];
    console.log(fileTemp);
    [].forEach.call(itemList, item =>{
        if (typeof fileTemp[item.id].filename === 'undefined') { //파일정보를 조회한데이터에서 파일이름이 정의되었는지를 기준으로 기존 파일과 신규 파일을 분류함 
            formdata.append('fileList', fileTemp[item.id]);
            fileindex++;
        } else {
            formdata.append('filenameList', fileTemp[item.id].filename);
            formdata.append('filesizeList', fileTemp[item.id].filesize);
            formdata.append('uuidList', fileTemp[item.id].uuid);
            formdata.append('extList', fileTemp[item.id].ext);
            ordList.push(fileindex);
            fileindex++;
        }
    });

    //[2,4] => [2,4,1,3,5]
    for(let i = 1; i <= itemList.length; i++) {
        if(ordList.indexOf(i) == -1) {
            ordList.push(i);
        }
    }

    [].forEach.call(ordList, ord => {
        formdata.append('ordList', ord);
    });

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
            success: function (data) {
                console.log(data);
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

    $('#file-list > li:eq('+ index +')').remove();
}