<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" trimDirectiveWhitespaces="true"	isELIgnored="false"%>
<!doctype html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="format-detection" content="telephone=no">
    <title>头条详情</title>
    <link href="../../css/yytt/style.css" rel="stylesheet" type="text/css">
</head>

<body>
    <div class="clear"></div>
    <div class="particle adetail">
        <div class="p15">
            <h1>${detail.mainTitle}</h1>
            <span class="info_data">${detail.uptime}</span>
            <div class="clear"></div>
            <div class="adetailinfo">
                ${detail.content}
            </div>
            <div class="yunline yunline2"></div>
        </div>
        <div class="blank1"></div>
        <div class="pl15">
            <div class="title">评论（${detail.commentNums}）</div>
            <div class="commentlist ">
                <ul>
                    <c:forEach items="${detail.commentEntityList}" var="ce">
                        <li>
                            <div class="info pr15"><span class="author">
                                <img src="${ce.avatarImg}">${ce.authorName}<span class="tag tag1">${ce.identity}</span></span>
                                <span class="touchgood"><i class="goodicon"></i>${ce.likeNums}</span>
                            </div>
                            <p class="normal pr15">${ce.content}</p>
                            <span class="date pr15">${ce.time}</span>
                        </li>
                    </c:forEach>
                </ul>
            </div>
        </div>
    </div>

    <script src="../../js/yytt/jquery.js"></script>
    <script src="../../js/yytt/js.js"></script>
</body>

</html>
