/* =========================================================
 * animateIcon.js
 * 
 * Autor: Leandro Luiz
 * email: lls.homeoffice@gmail.com
 * ========================================================= */

function animateIcon({
	id = id,
	iconButton = iconButton,
	isAnimateIcon = isAnimateIcon
} = {}) {
	
	var animation = ['fa-spin', 'fa-spin-pulse'];
	
	var icon = ['fa-spinner', 'fa-circle-notch', 'fa-gear', 'fa-rotate', 'fa-fan'];
	
	if (isAnimateIcon) {
		
		var animationNumber = 0 + Math.floor(Math.random() * 2);
		
		var iconNumber = 0 + Math.floor(Math.random() * 5);
		
		data["animation"] = animation[animationNumber];
		data["iconAnimation"] = icon[iconNumber];
		
		$("#imageButton" + id)
			.removeClass(iconButton)
			.addClass(data.iconAnimation)
			.addClass(data.animation);
			
	}
	else {

		$("#imageButton" + id)
			.removeClass(data.iconAnimation)
			.removeClass(data.animation)
			.addClass(iconButton);
			
	}
	
}
