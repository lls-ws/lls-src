/* =========================================================
 * alertMessage.js
 * 
 * Autor: Leandro Luiz
 * email: lls.homeoffice@gmail.com
 * ========================================================= */

function alertMessage({
	id = id,
	mensagem = mensagem,
	iconButton = iconButton,
	isAnimateIcon = isAnimateIcon
} = {}) {
	
	if (isAnimateIcon) {
		
		animateIcon(data);
		
	}
	else {
		
		$("#alertMessageText").append(mensagem);
		
		$(".alert").delay(2000).slideUp(200, function() {
			
			$(this).alert('close');
			
			animateIcon(data);
			
			$('#button' + id).prop('disabled', false);
			
		});
		
	}
	
}
