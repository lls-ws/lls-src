/* =========================================================
 * loginEvent.js
 * 
 * Autor: Leandro Luiz
 * email: lls.homeoffice@gmail.com
 * ========================================================= */

function loginEvent({
	id = '',
	url= '',
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
							url: url,
							iconButton: iconButton
						});
		
		if (status == "200") {
			
			$("#inputPassword" + id).val('');
			
			//window.location.href = 'greeting';
			
		}
		
	});
	
}
