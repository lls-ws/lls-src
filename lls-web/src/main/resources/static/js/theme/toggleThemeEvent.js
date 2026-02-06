/* =========================================================
 * toggleThemeEvent.js
 * 
 * Autor: Leandro Luiz
 * email: lls.homeoffice@gmail.com
 * ========================================================= */

function toggleThemeEvent() {

	$("#toggleTheme span").click(function (event) {
		
		event.preventDefault();
		
		toggleTheme();
		
	}).hover(function(){
		$(this).addClass("fa-beat-fade fa-lg");
	}, function() {
		$(this).removeClass("fa-beat-fade fa-lg");
	});
  
}
