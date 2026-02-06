/* =========================================================
 * loginForm.js
 * 
 * Autor: Leandro Luiz
 * email: lls.homeoffice@gmail.com
 * ========================================================= */

function loginForm({
	id = '',
	iconButton = 'fa-right-to-bracket'
} = {}) {
    
    $("#image" + id)
		.hover(function(){
			$(this).addClass("fa-flip");
		}, function() {
			$(this).removeClass("fa-flip");
		});
    
    $("#title" + id)
		.hover(function(){
			$(this).addClass("fa-bounce");
		}, function() {
			$(this).removeClass("fa-bounce");
		});
    
    // Criar HTML para separar funções e Retirar daqui
	$("#button" + id)
		.attr('type', 'submit')
		.addClass("w-100 btn btn-lg btn-primary login_btn")
		.hover(function(){
			$(this).addClass("btn-success");
			$("#imageButton" + id).addClass("fa-beat-fade");
			
		}, function() {
			$("#imageButton" + id).removeClass("fa-beat-fade");
			$(this).removeClass("btn-success");
		});
	
	// Criar HTML para separar funções e Retirar daqui
	$("#imageButton" + id)
		.addClass("fa-solid fa-lg " + iconButton)
		.before(id + ' ');
	
	$("#passwordForgot" + id + " a")
		.hover(function(){
			$(this).addClass("fa-beat-fade");
		}, function() {
			$(this).removeClass("fa-beat-fade");
		});
    
    $(".alert").removeClass("show");
    
	loginEvent({
		id: id,
		iconButton: iconButton
	});
	
}
