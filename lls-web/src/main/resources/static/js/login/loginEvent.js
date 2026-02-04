/* =========================================================
 * loginEvent.js
 * 
 * Autor: Leandro Luiz
 * email: lls.homeoffice@gmail.com
 * ========================================================= */

function loginEvent({
	id = id,
	iconButton = iconButton
} = {}) {

	$('#form' + id).submit(function(event) {
		
		$("#button" + id).prop('disabled', true);
		
		event.preventDefault();
		
		ajaxMethod({
			id: id,
			url: 'efetuaLogin',
			iconButton: iconButton,
			email: $('#inputEmail' + id).val(),
			senha: $('#inputPassword' + id).val()
		});
		
		$("#inputPassword" + id).val('');
		
		if (data.status == "200") {
			
			window.location.href = 'index';
			
		}
		
	});

}
