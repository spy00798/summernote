<%--
  Created by IntelliJ IDEA.
  User: spy00
  Date: 2021-11-11
  Time: 오후 2:23
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<html>
<head>
    <title>Title</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <script src="/resources/js/summernote-lite.js"></script>
    <script src="/resources/js/common.js?a=123"></script>
    <link rel="stylesheet" href="/resources/css/summernote-lite.css?a=123">
    <link rel="stylesheet" href="/resources/css/style.css?a=123">
    <script>
        let content = `${board.content}`
        $(document).ready(function () {
            $('#summernote').summernote('insertText', conetent);
        })
    </script>
</head>
<body>
<%@ include file="./static/header.jsp" %>
<div id="wrap">
    <input type="hidden" id="idx" value="${board.idx}">
    <form id="update-form" enctype="multipart/form-data">
        <fieldset>
            <p class="form-element">제목 : <input type="text" id="title_slot" value="${board.title}"></p>
            <p class="form-element">첨부파일 : <input type="file" accept="image/*" id="ins_file" multiple></p>
            <ul id="file-list">

            </ul>
            <div id="summernote">${board.content}</div>
        </fieldset>
        <div class="btn_area">
            <input type="button" onclick="history.back();" value="뒤로" class="replace_btn"/>
            <input type="button" onclick="deleteRow()" class="del_btn" value="삭제" />
            <input type="button" onclick="updateRow()" value="완료" class="ins_btn"/>
        </div>
    </form>
</div>
</body>
</html>
