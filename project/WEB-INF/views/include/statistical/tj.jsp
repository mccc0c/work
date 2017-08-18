<%@ include file="cs.jsp" %>
<%CS cs = new CS(1259628408);cs.setHttpServlet(request,response);
    String imgurl = cs.trackPageView();%>
<img src="<%= imgurl %>" width="0" height="0"  />
<script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-81404419-1', 'auto');
    ga('send', 'pageview');

</script>