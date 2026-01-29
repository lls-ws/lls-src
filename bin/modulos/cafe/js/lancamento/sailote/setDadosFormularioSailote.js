/* =========================================================
 * setDadosFormularioSailote.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosFormularioSailote(dados) {
	
	setDadosFormularioCore(dados);
	
	setCampoCobrarCafe(dados);
	
	$('#sacas' + dados.nomeTabela)
		.val($('#sacasDespejo' + dados.nomeTabela).val());
		
	$('#peso' + dados.nomeTabela)
		.val($('#pesoDespejo' + dados.nomeTabela).val());
	
	$('#ticket' + dados.nomeTabela).focus();
	
}
