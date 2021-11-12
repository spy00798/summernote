<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%--
  Created by IntelliJ IDEA.
  User: spy00
  Date: 2021-11-12
  Time: 오전 10:22
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <link rel="stylesheet" href="/resources/css/style.css?a=123">
</head>
<body>
<%@ include file="./static/header.jsp" %>

<div id="wrap">
    <div>
        <table>
            <colgroup>
                <col width="10%">
                <col width="70%">
                <col width="20%">
            </colgroup>
            <thead>
            <tr>
                <th class="list_column">번호</th>
                <th class="list_column">제목</th>
                <th class="list_column">작성일</th>
            </tr>
            </thead>
            <tbody>
            <c:forEach var="list" items="${getList}">
                <tr>
                    <td class="list_data">${list.idx}</td>
                    <td class="list_data"><a href="/view?idx=${list.idx}" style="display: block;">${list.title}</a></td>
                    <td class="list_data"><fmt:formatDate value="${list.bdDate}" pattern="yyyy-MM-dd" /></td>
                </tr>
            </c:forEach>
            </tbody>
        </table>
        <div class="btn_area">
            <input type="button" onclick="location.href='/form'" value="등록" class="ins_btn"/>
        </div>
    </div>
</div>
</body>
</html>
