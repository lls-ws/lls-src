/* =========================================================
 * setDadosFormularioBaixacafe.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosFormularioBaixacafe(dados) {

	setDadosFormularioCore(dados);
	
	var formulario = $('#' + dados.nomeTabela.toLowerCase() + 'Form');
	
	eval ("setEventosCampos" + dados.nomeTabela + "(dados, formulario)");
	
	$('#valor' + dados.nomeTabela).focus();
	
}
