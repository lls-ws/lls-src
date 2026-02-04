/* =========================================================
 * loginForm.js
 * 
 * Autor: Leandro Luiz
 * email: lls.homeoffice@gmail.com
 * ========================================================= */

function loginForm({
	id = id,
	iconButton = 'fa-right-to-bracket'
} = {}) {
    
    $("#image" + id)
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
    
    $("#title" + id)
		.addClass("h3 mb-3 fw-normal")
		.text($("#projectTitle").text())
		.hover(function(){
			$(this).addClass("fa-bounce");
		}, function() {
			$(this).removeClass("fa-bounce");
		});
    
	$("#button" + id)
		.attr('type', 'submit')
		.addClass("w-100 btn btn-lg btn-primary login_btn")
		.hover(function(){
			$("#imageButton" + id).addClass("fa-beat-fade");
		}, function() {
			$("#imageButton" + id).removeClass("fa-beat-fade");
		});
	
	$("#imageButton" + id)
		.addClass("fa-solid fa-lg " + iconButton)
		.before(id + ' ');
		
	$("#passwordForgot" + id)
		.addClass("d-flex justify-content-center");
	
	$("#passwordForgot" + id+ " a")
		.append("Esqueci minha senha")
		.attr('href', 'passwordForgot')
		.hover(function(){
			$(this).addClass("fa-beat-fade");
		}, function() {
			$(this).removeClass("fa-beat-fade");
		});
    
	loginEvent({
		id: id,
		iconButton: iconButton
	});
	
}
