/* =========================================================
 * setFormularioCafe.js
 * http://lls.net.br/
 * ========================================================= */

function setFormularioCafe(dados, formulario) {
	
	formulario.find('#lote' + dados.nomeTabela)
		.css("font-weight", "Bold")
		.css("font-size", "15px");
		
	if (dados.lote != null) formulario.find('#lote' + dados.nomeTabela).val(dados.lote);
	
	formulario.find('#peso' + dados.nomeTabela)
		.css("font-weight", "Bold")
		.css("font-style", "italic")
		.css("font-size", "15px");
	
	formulario.find('#sacas' + dados.nomeTabela)
		.css("font-weight", "Bold")
		.css("font-style", "italic")
		.css("font-size", "15px")
		.bind("propertychange change click keyup input paste", function(event) {
		
			calculaLiquidoCafe(dados.nomeTabela);
		
	});
	
	eval ("setEventosCampos" + dados.nomeTabela + "(dados, formulario)");
	
}
