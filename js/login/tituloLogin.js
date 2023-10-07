/* =========================================================
 * tituloLogin.js
 * http://lls.net.br/
 * ========================================================= */

function tituloLogin(tipo) {
	
	var $tituloLogin = $('<h3>');
	
	$tituloLogin.addClass('form-signin-heading text-center texto_label');
	
	if (tipo == null) {
		$tituloLogin.text(nomeProjeto());
	}
	else {
		$tituloLogin.text(tipo);
	}
	
	return $tituloLogin;
	
}
