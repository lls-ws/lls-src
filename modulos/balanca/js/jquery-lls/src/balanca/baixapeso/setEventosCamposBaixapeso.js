/* =========================================================
 * setEventosCamposBaixapeso.js
 * http://lls.net.br/
 * ========================================================= */

function setEventosCamposBaixapeso(dados, formulario) {
	
	eval ('setEventosCampos' + dados.nomeTabelaCadastro + '(dados, formulario)');
	
	formulario.find('#tipo' + dados.nomeTabela + 'Radio')
		.rules('remove', "checkTipo" + dados.nomeTabela);
	
	var input = formulario.find('#peso' + dados.nomeTabela);
	
	input.bind("propertychange change click keyup input paste", function(event) {
				
		calculaLiquidoBaixapeso(dados);
		
	});
	
}
