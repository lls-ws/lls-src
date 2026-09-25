/* =========================================================
 * alertMessage.js
 * 
 * Autor: Leandro Luiz
 * email: lls.homeoffice@gmail.com
 * ========================================================= */

function alertMessage({
	id = '',
	status = '',
	message = '',
	animation = '',
	iconButton = '',
	iconAnimation = '',
	isAnimate = false
} = {}) {
	
	if (!isAnimate) {
		
		let alertType = 'alert-danger';
		if (status == '200') alertType = 'alert-success';
		
		$("#alertMessage")
			.removeClass("alert-danger alert-success")
			.addClass(alertType)
			.addClass('show') 
			.fadeIn(200); // Usar fadeIn combina melhor com a classe 'fade' do Bootstrap
		
		$(".alert").delay(3000).slideUp(200, function() {
			
			$(this).removeClass('show');
			$('#button' + id).prop('disabled', false);
			
			// Força o ícone a resetar para o original
			animateIcon({
				id: id,
				isAnimate: false,
				iconButton: iconButton,
				animation: animation,
				iconAnimation: iconAnimation
			});
			
		});
		
	}
	
	let alertAnimation = animateIcon({
							id: id,
							animation: animation,
							isAnimate: isAnimate,
							iconButton: iconButton,
							iconAnimation: iconAnimation
						});
	
	return {
		animation: alertAnimation.animation,
		iconAnimation: alertAnimation.iconAnimation
	};
	
}
