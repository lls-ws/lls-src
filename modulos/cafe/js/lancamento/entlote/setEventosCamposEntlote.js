/* =========================================================
 * setEventosCamposEntlote.js
 * http://lls.net.br/
 * ========================================================= */

function setEventosCamposEntlote(dados, formulario) {
	
	setEventosCamposCafe(dados, formulario);
	
	setEventoDesdobrasCafeFormacao(dados, formulario);
	
	formulario.find('#sacas' + dados.nomeTabela)
		.bind("propertychange change click keyup input paste", function(event) {
			
			eval ('checkValores' + dados.nomeTabela + '(dados, formulario)');
		
	});
	
	formulario.find('#peso' + dados.nomeTabela)
		.bind("propertychange change click keyup input paste", function(event) {
			
			eval ('checkValores' + dados.nomeTabela + '(dados, formulario)');
		
	});
	
	formulario.find('#peso' + dados.nomeTabela)
		.on('focusout',function () {
			
			var valores = { peso: formataNumeroSql($('#peso' + dados.nomeTabela).val()) }
			
			arredondaPesoCafe(valores);
			
			formulario.find('#peso' + dados.nomeTabela)
				.val(formataNumero(valores.peso, 2, false, false, "", " kg"));
			
	});
	
	var rule = {checkLotesEntlote: true};
	
	formulario.find('#nomeTabela' + dados.nomeTabelaLancamento[0])
		.rules('add', rule);
	
}
