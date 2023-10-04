<%@ taglib uri="http://htmlcompressor.googlecode.com/taglib/compressor" prefix="compress" %>

<compress:html removeIntertagSpaces="true">

	<!doctype html>
		
		<head>
		
			<%@include file="header.jsp"%>
			
			<!--LLS MENU CDN
			<script src="//lls-ws.github.io/jquery-lls/2.0.0/js/jquery-lls-menu.js" type="text/javascript"></script>
			<link rel="stylesheet" href="//lls-ws.github.io/jquery-lls/2.0.0/css/jquery-lls-menu.css"/>
			-->
			
			<!--LLS MENU Local-->
			<script src="/js/jquery-lls-menu.js" type="text/javascript"></script>
			<link rel="stylesheet" href="/css/jquery-lls-menu.css"/>
			
		</head>
		
		<body>
			
			<script>
				
				$(document).ready(function(){
    
					menu('1');
					
				});
				
			</script>
			
		</body>
		
	</html>

</compress:html>
