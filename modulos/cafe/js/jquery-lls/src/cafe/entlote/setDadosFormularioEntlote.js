/* =========================================================
 * setDadosFormularioEntlote.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosFormularioEntlote(dados) {
	
	setDadosFormularioCore(dados);
	
	var campoCobrar = caixaVerificacaoHorizontal(
		'cobrar' + dados.nomeTabela,
		'Cobrar Descarga'
	);
	
	$('#botaoFormGroup').before(campoCobrar);
	
	$('#cobrar' + dados.nomeTabela).prop('checked', dados.array.cobrar);
	
	$('#desdobras' + dados.nomeTabela).focus();
	
}
