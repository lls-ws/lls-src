<%@ taglib uri="http://htmlcompressor.googlecode.com/taglib/compressor" prefix="compress" %>

<compress:html removeIntertagSpaces="true">

	<!doctype html>
		
		<head>
		
			<%@include file="core/header.jsp"%>
			<%@include file="core/jquery.jsp"%>
			<%@include file="core/bootstrap.jsp"%>
			
			<script src="js/login.js" type="text/javascript"></script>
			<script src="js/loginForm.js" type="text/javascript"></script>
			<script src="js/loginEvent.js" type="text/javascript"></script>
			
			<script src="js/ajaxMethod.js" type="text/javascript"></script>
			<script src="js/alertMessage.js" type="text/javascript"></script>
			<script src="js/animateIcon.js" type="text/javascript"></script>
			
			<script src="js/jquery-lls/jquery-lls-login.js" type="text/javascript"></script>
			<script src="js/jquery-lls/jquery-lls-menu.js" type="text/javascript"></script>
			
			<link href="css/login.css" rel="stylesheet">
		
		</head>
		
		<body>
	
			<div id="alertMessage"></div>
			
			<main class="form-signin text-center">
			  
			  <form id="loginForm">
				
				<img id="loginImage">
				
				<h1 id="loginTitle"></h1>
				
				<%@include file="component/inputText.html"%>
				
				<div class="mb-2"></div>
				
				<%@include file="component/inputPassword.html"%>

				<div class="mb-3"></div>

				<button id="loginButton">
					<i id="imageButton"></i>
				</button>
				
				<div class="mb-4"></div>
				
				<div id="passwordForgot">
					<a></a>
				</div>
				
				<p id="yearText"></p>
				
			  </form>
			  
			</main>
			
		</body>
		
	</html>
	
</compress:html>
