<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path  ;
%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Download Demo</title>

        <link href="css/style.css" rel="stylesheet" type="text/css"/>
        <script src="js/jquery/jquery-2.1.1.min.js" type="text/javascript"></script>
        <script>
            var fullPath = '<%=  basePath  %>/DownloadServlet';
        </script>
        <script src="js/download.js" type="text/javascript"></script>
    </head>
    <body>
        <h1>File Download Demonstration</h1>

        <p><a href="<%= request.getContextPath()%>/DownloadServlet">Download via servlet</a></p>




        <p><button onClick="doDownloadXHR()">Do AJAX Download</button> <span id="loader" class="loading"></span>    </p>
    </body>
</html>
