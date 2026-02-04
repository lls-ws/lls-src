/* =========================================================
 * animateIcon.js
 * 
 * Autor: Leandro Luiz
 * email: lls.homeoffice@gmail.com
 * ========================================================= */

function animateIcon({
	animation = '' ,
	iconButton = '',
	iconAnimation = '',
	imageButtonID = '',
	isAnimate = false
} = {}) {
	
	var animationArray = ['fa-spin', 'fa-spin-pulse'];
	
	var iconArray = ['fa-spinner', 'fa-circle-notch', 'fa-gear', 'fa-rotate', 'fa-fan'];
	
	if (isAnimate) {
		
		var animationNumber = 0 + Math.floor(Math.random() * 2);
		
		var iconNumber = 0 + Math.floor(Math.random() * 5);
		
		animation = animationArray[animationNumber];
		iconAnimation = iconArray[iconNumber];
		
		$("#" + imageButtonID)
			.removeClass(iconButton)
			.addClass(iconAnimation)
			.addClass(animation);
			
	}
	else {

		$("#" + imageButtonID)
			.removeClass(iconAnimation)
			.removeClass(animation)
			.addClass(iconButton);
			
	}
	
	return {
		animation: animation,
		iconAnimation: iconAnimation
	};
	
}
