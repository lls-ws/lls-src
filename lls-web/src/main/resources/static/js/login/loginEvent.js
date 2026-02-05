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

	$('#form' + id).submit(function(event) {
		
		$("#button" + id).prop('disabled', true);
		
		event.preventDefault();
		
		const data = {
			email: $('#inputEmail' + id).val(),
			password: $('#inputPassword' + id).val()
		}
		
		const status = ajaxMethod({
							id: id,
							data: data,
							url: 'efetuaLogin',
							iconButton: iconButton
						});
		
		$("#inputPassword" + id).val('');
		
		if (status == "200") {
			
			window.location.href = 'index';
			
		}
		
	});
	
}
