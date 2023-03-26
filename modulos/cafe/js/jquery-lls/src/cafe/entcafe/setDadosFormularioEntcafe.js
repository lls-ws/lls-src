/* =========================================================
 * setDadosFormularioEntcafe.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosFormularioEntcafe(dados) {
	
	setDadosFormularioCafe(dados);
	
	var formulario = $('#' + dados.nomeTabela.toLowerCase() + 'Form');
	
	if ($('#ticket' + dados.nomeTabela).val() > 0) {
	
		formulario.find("#spanGroupSearch" + dados.nomeTabela + "FazendaProdutor")
			.unbind();
		
	}
	
	$('#sacas' + dados.nomeTabela).val(dados.array.sacasNota);
	$('#peso' + dados.nomeTabela).val(dados.array.pesoNota);
	
}
