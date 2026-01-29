<%@ taglib uri="http://htmlcompressor.googlecode.com/taglib/compressor" prefix="compress" %>

<compress:html removeIntertagSpaces="true">

	<!doctype html>
		
		<head>
		
			<%@include file="header.jsp"%>

			<!--LLS MENU cdn-->
			<script src="//lls-ws.github.io/jquery-lls/js/jquery-lls-menu.js" type="text/javascript"></script>
			<script src="//lls-ws.github.io/jquery-lls/js/jquery-lls-milho.js" type="text/javascript"></script>
			<script src="//lls-ws.github.io/jquery-lls/js/jquery-lls-cafe.js" type="text/javascript"></script>
			<script src="//lls-ws.github.io/jquery-lls/js/jquery-lls-balanca.js" type="text/javascript"></script>
			<link rel="stylesheet" href="//lls-ws.github.io/jquery-lls/css/jquery-lls-menu.css"/>

		<body>

            <script>
				
				$(document).ready(function(){
    
					menu('1');
					
				});
				
			</script>
			
		</body>
		
	</html>

</compress:html>
