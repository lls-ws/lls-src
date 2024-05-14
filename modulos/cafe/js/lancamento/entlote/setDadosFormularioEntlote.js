/* =========================================================
 * setDadosFormularioEntlote.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosFormularioEntlote(dados) {
	
	setDadosFormularioCore(dados);
	
	setCampoCobrarCafe(dados)
	
	$('#desdobras' + dados.nomeTabela).focus();
	
}
