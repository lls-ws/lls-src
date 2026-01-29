/* =========================================================
 * core.js
 * http://lls.net.br/
 * ========================================================= */

function core(dados) {
	
	if (dados.tipo == '1') loginInicio();
	
	clearHtml();
	
	$('.autocomplete-suggestions').remove();
	
	$('.container').empty();
	
	painel('container_center');
	
	eval ('formulario' + dados.formulario + '(dados)');
	
	window.history.replaceState('', '', "/");
	
}
