/* =========================================================
 * setDadosFormularioOslote.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosFormularioOslote(dados) {
	
	setDadosFormularioCore(dados);
	
	$('#desdobras' + dados.nomeTabela).focus();
	
}
