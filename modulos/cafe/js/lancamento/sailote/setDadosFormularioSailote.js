/* =========================================================
 * setDadosFormularioSailote.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosFormularioSailote(dados) {
	
	setDadosFormularioCore(dados);
	
	var campoCobrar = caixaVerificacaoHorizontal(
		'cobrar' + dados.nomeTabela,
		'Cobrar Carga'
	);
	
	$('#botaoFormGroup').before(campoCobrar);
	
	$('#cobrar' + dados.nomeTabela).prop('checked', true);
	
	$('#sacas' + dados.nomeTabela)
		.val($('#sacasDespejo' + dados.nomeTabela).val());
		
	$('#peso' + dados.nomeTabela)
		.val($('#pesoDespejo' + dados.nomeTabela).val());
	
	$('#ticket' + dados.nomeTabela).focus();
	
}
