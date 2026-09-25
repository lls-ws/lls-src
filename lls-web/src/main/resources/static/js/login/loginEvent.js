/* =========================================================
 * loginEvent.js
 * 
 * Autor: Leandro Luiz
 * email: lls.homeoffice@gmail.com
 * ========================================================= */

function loginEvent({
	id = '',
	iconButton = ''
} = {}) {

	// 1. VERIFICAÇÃO AO CARREGAR A PÁGINA: Se veio com erro do Spring Security
	const urlParams = new URLSearchParams(window.location.search);
	
	if (urlParams.has('error')) {
		
		let alertAnimation = alertMessage({
								id: id,
								isAnimate: true,
								iconButton: iconButton
							});
		
		alertMessage({
			id: id,
			status: '401',
			isAnimate: false,
			iconButton: iconButton,
			animation: alertAnimation.animation,
			iconAnimation: alertAnimation.iconAnimation
		});
		
	}

	$('#form' + id).submit(function(event) {
		
		$("#button" + id).prop('disabled', true);
		
		alertMessage({
			id: id,
			isAnimate: true,
			iconButton: iconButton
		});
							
	});
	
}
