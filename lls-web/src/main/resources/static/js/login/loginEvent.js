/* =========================================================
 * loginEvent.js
 * 
 * Autor: Leandro Luiz
 * email: lls.homeoffice@gmail.com
 * ========================================================= */

function loginEvent({
	id = '',
	url = '',
	iconButton = ''
} = {}) {

	console.log("loginEvent");
	
	$('#form' + id).submit(function(event) {
		
		console.log('#form' + id);
		
		//let alertAnimation = alertMessage({
		//						id: id,
		//						isAnimate: true,
		//						iconButton: iconButton
		//					});
		
		$("#button" + id).prop('disabled', true);
		
		event.preventDefault();
		
		const data = {
			email: $('#inputEmail' + id).val(),
			password: $('#inputPassword' + id).val()
		}
		
		console.log(data);
		
		const status = ajaxMethod({
							id: id,
							url: url,
							data: data,
							iconButton: iconButton
						});
		
		if (status == "200") {
			
			$("#inputPassword" + id).val('');
			
			window.location.href = 'greeting';
			
		}
		
	});
	
}
