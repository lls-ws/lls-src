/* =========================================================
 * formularioRelatorioData.js
 * http://lls.net.br/
 * ========================================================= */

function formularioRelatorioData(nomeTabela, urlAdd, urlSearch) {
	
	var $campoDataProcura = campoDataProcura(
		"Data",
		nomeTabela,
		urlSearch,
		urlAdd,
		2
	);
		
	var $divProcuraData = $('<div/>')
		.addClass('input-group form-control formulario_cor')
		.append($campoDataProcura);
	
	return $divProcuraData;
	
}
