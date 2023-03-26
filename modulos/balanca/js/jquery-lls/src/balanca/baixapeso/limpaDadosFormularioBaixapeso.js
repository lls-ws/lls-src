/* =========================================================
 * limpaDadosFormularioBaixapeso.js
 * http://lls.net.br/
 * ========================================================= */

function limpaDadosFormularioBaixapeso(dados) {
	
	eval ('limpaDadosFormulario' + dados.nomeTabelaCadastro + '(dados)');
	
	var formulario = $('#' + dados.nomeTabela.toLowerCase() + 'Form');
	
	formulario.find('#peso2' + dados.nomeTabela).val('');
	formulario.find('#liquido' + dados.nomeTabela).val('');
	
}
