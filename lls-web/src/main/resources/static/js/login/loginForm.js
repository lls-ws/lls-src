/* =========================================================
 * loginForm.js
 * 
 * Autor: Leandro Luiz
 * email: lls.homeoffice@gmail.com
 * ========================================================= */

function loginForm({
	id = '',
	url= '',
	iconButton = ''
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
    
	$("#button" + id)
		.hover(function(){
			$(this).addClass("btn-success");
			$("#imageButton" + id).addClass("fa-beat-fade");
			
		}, function() {
			$("#imageButton" + id).removeClass("fa-beat-fade");
			$(this).removeClass("btn-success");
		});
	
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
