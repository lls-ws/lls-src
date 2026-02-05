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
		
		const alertType = 'alert-danger';
		
		if (status == '200') alertType = 'alert-success';
		
		$("#alertMessageText").append(message);
		
		//$("#alertMessage").remove(".alert").append(alertDiv);
		$("#alertMessage")
			.remove(".alert")
			.addClass(alertType)
			.show();
		
		$(".alert").delay(2000).slideUp(200, function() {
			
			//$(this).alert('close');
			
			$('#button' + id).prop('disabled', isAnimate);
			
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
