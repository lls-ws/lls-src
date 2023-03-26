/* =========================================================
 * formularioRelatorioTipo.js
 * http://lls.net.br/
 * ========================================================= */

function formularioRelatorioTipo(nomeTabela, urlSearch, tipo) {
	
	var campoTipo = campoTipoProcura(nomeTabela, urlSearch, tipo);
	
	var divProcuraTipo = $('<div/>')
		.addClass('input-group form-control formulario_cor')
		.append(campoTipo);
	
	return divProcuraTipo;
	
}
