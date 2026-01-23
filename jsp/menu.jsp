<%@ taglib uri="http://htmlcompressor.googlecode.com/taglib/compressor" prefix="compress" %>

<compress:html removeIntertagSpaces="true">

	<!doctype html>
		
		<head>
		
			<%@include file="header.jsp"%>

			<!--LLS MENU local-->
			<script src="/js/jquery-lls-menu.js" type="text/javascript"></script>
			<script src="/js/jquery-lls-cafe.js" type="text/javascript"></script>
			<link rel="stylesheet" href="/css/jquery-lls-menu.css"/>

		<body>
			
			<script>
				
				$(document).ready(function(){
    
					menu('1');
					
				});
				
			</script>
			
		</body>
		
	</html>

</compress:html>
