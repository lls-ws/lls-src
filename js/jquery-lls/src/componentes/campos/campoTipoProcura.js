/* =========================================================
 * campoTipoProcura.js
 * http://lls.net.br/
 * ========================================================= */

function campoTipoProcura(nomeTabela, urlSearch, tipo) {
	
	var campoTipo = caixaCombinacaoHorizontal(
		'tipo' + nomeTabela,
		'Tipo',
		'col-xs-10 col-md-10', 'col-xs-2', false,
		nomesTipos(tipo)
	);
	
	campoTipo.on('change', function() {
		
		eval(urlSearch);
		
	});
	
	return campoTipo;
	
}
