/* =========================================================
 * setDadosFormularioTralote.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosFormularioTralote(dados) {
	
	setDadosFormularioCore(dados);
	
	$('#desdobras' + dados.nomeTabela).focus();
	
}
