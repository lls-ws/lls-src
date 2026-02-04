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
		
		var imageButtonID = "imagemButton" + id;
		
		var data = {
			email: $('#inputEmail' + id).val(),
			password: $('#inputPassword' + id).val()
		}
		
		const status = ajaxMethod({
							id: id,
							url: 'efetuaLogin',
							data: data,
							iconButton: iconButton
						});
		
		$("#inputPassword" + id).val('');
		
		if (status == "200") {
			
			window.location.href = 'index';
			
		}
		
	});

}
