<%@ taglib uri="http://htmlcompressor.googlecode.com/taglib/compressor" prefix="compress" %>

<compress:html removeIntertagSpaces="true">

	<!doctype html>
	
		<head>
		
			<%@include file="core/header.jsp"%>
			<%@include file="core/jquery.jsp"%>
			<%@include file="core/menuHeader.jsp"%>
			<%@include file="core/menuBootstrap.jsp"%>
			
			<script src="js/jquery-lls/jquery-lls-login.js" type="text/javascript"></script>
			<script src="js/jquery-lls/jquery-lls-menu.js" type="text/javascript"></script>
		
		</head>
		
		<body>
			
			<script>
				
				menu('1');
				
			</script>
			
		</body>
		
	</html>

</compress:html>
