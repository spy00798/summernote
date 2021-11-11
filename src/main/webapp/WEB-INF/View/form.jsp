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
</head>
<body>
    <form>
        <table border="1">
            <thead>
                <tr>
                    <th class="board_column">작성일</th>
                    <th>2021-11-11</th>
                </tr>
                <tr>
                    <th class="board_column">제목</th>
                    <th>샘플 제목</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th class="board_column">내용</th>
                    <td><div id="summernote"></div></td>
                </tr>
            </tbody>
        </table>
        <div class="btn_area">
            <input type="button" onclick="alert('1')" value="등록" class="ins_btn" />
            <input type="button" onclick="location.replace('/')" value="뒤로" class="replace_btn" />
        </div>
    </form>
</body>
</html>
