/* =========================================================
 * loginForm.js
 * 
 * Autor: Leandro Luiz
 * email: lls.homeoffice@gmail.com
 * ========================================================= */

function loginForm(){
    
    var data = {
		'idButton': 'login',
		'icon': 'fa-right-to-bracket'
	}
    
    $("#loginImage")
		.attr({
			alt: '',
			width: '90',
			height: '90',
			className: 'mb-4',
			src: '//lls-ws.github.io/imagens/logo.png'
		})
		.hover(function(){
			$(this).addClass("fa-flip");
		}, function() {
			$(this).removeClass("fa-flip");
		});
    
    $("#loginTitle")
		.addClass("h3 mb-3 fw-normal")
		.text($("#projectTitle").text())
		.hover(function(){
			$(this).addClass("fa-shake");
		}, function() {
			$(this).removeClass("fa-shake");
		});
    
    $("#inputEmail")
		.attr('maxlength', '50')
		.prop('required', true)
		.hover(function(){
			$(this).addClass("fa-fade");
		}, function() {
			$(this).removeClass("fa-fade");
		});
    
    $("#inputPassword")
		.attr({
			maxlength: '10',
			minlength: '6'
		})
		.prop('required', true)
		.hover(function(){
			$(this).addClass("fa-fade");
		}, function() {
			$(this).removeClass("fa-fade");
		});
	
	$("#loginButton")
		.attr('type', 'submit')
		.addClass("w-100 btn btn-lg btn-primary login_btn")
		.hover(function(){
			$("#imageButton").addClass("fa-beat-fade");
		}, function() {
			$("#imageButton").removeClass("fa-beat-fade");
		});
	
	$("#imageButton")
		.addClass("fa-solid fa-lg " + data.icon)
		.before('Login ');
		
	$("#passwordForgot")
		.addClass("d-flex justify-content-center");
	
	$("#passwordForgot a")
		.append("Esqueci minha senha")
		.attr('href', 'passwordForgot')
		.hover(function(){
			$(this).addClass("fa-beat-fade");
		}, function() {
			$(this).removeClass("fa-beat-fade");
		});
    
    $("#yearText")
		.addClass("mt-5 mb-3 text-muted")
		.append("&copy; 2019–2026")
		.hover(function(){
			$(this).addClass("fa-bounce");
		}, function() {
			$(this).removeClass("fa-bounce");
		});
		
	$("#alertMessage")
		.addClass("alert-fixed");
	
	loginEvent(data);
	
}
