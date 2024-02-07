/* =========================================================
 * setEventosCamposLote.js
 * http://lls.net.br/
 * ========================================================= */

function setEventosCamposLote(dados, formulario) {
	
	dados["campoProcura"] = "Peneira";
	
	setEventosCamposCafeFormacao(dados, formulario, 1);
	
	formulario.find('#sacas' + dados.nomeTabela)
		.bind("propertychange change click keyup input paste", function(event) {
		
			eval ('calculaLiquido' + dados.nomeTabela + '(dados)');
			
			formulario.find('#peso' + dados.nomeTabela).valid();
		
	});
	
}
