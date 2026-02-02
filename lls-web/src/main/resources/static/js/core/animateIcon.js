/* =========================================================
 * animateIcon.js
 * 
 * Autor: Leandro Luiz
 * email: lls.homeoffice@gmail.com
 * ========================================================= */

function animateIcon(data) {
	
	var animation = ['fa-spin', 'fa-spin-pulse'];
	
	var icon = ['fa-spinner', 'fa-circle-notch', 'fa-gear', 'fa-rotate', 'fa-fan'];
	
	if (data.animateIcon) {
		
		var animationNumber = 0 + Math.floor(Math.random() * 2);
		
		var iconNumber = 0 + Math.floor(Math.random() * 5);
		
		data["animation"] = animation[animationNumber];
		data["iconAnimation"] = icon[iconNumber];
		
		$("#imageButton")
			.removeClass(data.icon)
			.addClass(data.iconAnimation)
			.addClass(data.animation);
			
	}
	else {

		$("#imageButton")
			.removeClass(data.iconAnimation)
			.removeClass(data.animation)
			.addClass(data.icon);
			
	}
	
}
