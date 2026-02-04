/* =========================================================
 * alertMessage.js
 * 
 * Autor: Leandro Luiz
 * email: lls.homeoffice@gmail.com
 * ========================================================= */

function alertMessage({
	mensagem = '',
	animation = '',
	iconButton = '',
	iconAnimation = '',
	imageButtonID = '',
	isAnimate = false
} = {}) {
	
	if (!isAnimate) {
		
		$("#alertMessageText").append(mensagem);
		
		$(".alert").delay(2000).slideUp(200, function() {
			
			$(this).alert('close');
			
			$('#button' + id).prop('disabled', isAnimate);
			
		});
		
	}
	
	const { animation, iconAnimation } = animateIcon({
												animation: animation,
												isAnimate: isAnimate,
												iconButton: iconButton,
												iconAnimation: iconAnimation,
												imageButtonID: imageButtonID
											});
	
	return {
		animation: animation,
		iconAnimation: iconAnimation
	};
	
}
