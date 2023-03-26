/* =========================================================
 * campoPlaca.js
 * http://lls.net.br/
 * ========================================================= */

function campoPlaca(id, required) {
	
	carregaCssJs("js/jquery.maskedinput.min.js", "js");
	
	var placa = input(id, 'text', 'form-control text-uppercase', '___-____', required, 8);
	
	placa.mask("aaa-9*99");
	
	return placa;
	
}
