/* =========================================================
 * setDadosFormularioOslote.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosFormularioOslote(dados) {
	
	carregaCssJs("js/jquery-lls/jquery-lls-servcafe.js", "js");
	
	setDadosFormularioCore(dados);
	
	$('#desdobras' + dados.nomeTabela).focus();
	
}
