/* =========================================================
 * footerEvent.js
 * 
 * Autor: Leandro Luiz
 * email: lls.homeoffice@gmail.com
 * ========================================================= */

function footerEvent() {

	toggleThemeEvent();
	
	$(".dropdown-item")
		.hover(function(){
			$(this).addClass("fa-beat-fade");
			$(this).find(".text-center").addClass("fa-beat-fade");
			$(this).find(".flag").addClass("fa-beat-fade");
		}, function() {
			$(this).removeClass("fa-beat-fade");
			$(this).find(".text-center").removeClass("fa-beat-fade");
			$(this).find(".flag").removeClass("fa-beat-fade");
		});
	
	$(".dropdown-toggle")
		.hover(function(){
			$(this).addClass("fa-beat-fade");
			$(this).find(".fa-language").addClass("fa-beat-fade");
		}, function() {
			$(this).removeClass("fa-beat-fade");
			$(this).find(".fa-language").removeClass("fa-beat-fade");
		});
		
	$("#copyRight")
		.hover(function(){
			$(this).addClass("fa-bounce");
		}, function() {
			$(this).removeClass("fa-bounce");
		});
	
}
