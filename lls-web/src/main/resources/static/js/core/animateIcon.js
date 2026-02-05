/* =========================================================
 * animateIcon.js
 * 
 * Autor: Leandro Luiz
 * email: lls.homeoffice@gmail.com
 * ========================================================= */

function animateIcon({
	id = '',
	animation = '',
	iconButton = '',
	iconAnimation = '',
	isAnimate = false
} = {}) {
	
	const animationArray = ['fa-spin', 'fa-spin-pulse'];
	
	const iconArray = ['fa-spinner', 'fa-circle-notch', 'fa-gear', 'fa-rotate', 'fa-fan'];
	
	if (isAnimate) {
		
		const animationNumber = 0 + Math.floor(Math.random() * 2);
		
		const iconNumber = 0 + Math.floor(Math.random() * 5);
		
		animation = animationArray[animationNumber];
		iconAnimation = iconArray[iconNumber];
		
		$("#imageButton" + id)
			.removeClass(iconButton)
			.addClass(iconAnimation)
			.addClass(animation);
			
	}
	else {

		$("#imageButton" + id)
			.removeClass(iconAnimation)
			.removeClass(animation)
			.addClass(iconButton);
			
	}
	
	return {
		animation: animation,
		iconAnimation: iconAnimation
	};
	
}
