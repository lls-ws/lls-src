/* =========================================================
 * setEventosCamposBaixacafe.js
 * http://lls.net.br/
 * ========================================================= */

function setEventosCamposBaixacafe(dados, formulario) {
	
	var valores = {
		total: formataNumeroSql(formulario.find('#total' + dados.nomeTabela).val()),
		pago: formataNumeroSql(formulario.find('#pago' + dados.nomeTabela).val())
	}
	
	var valorRestante = valores.total - valores.pago;
	
	var input = formulario.find('#valor' + dados.nomeTabela);
	
	input.css("font-weight", "Bold").css("font-size", "15px");
	
	input.bind("propertychange change click keyup input paste", function(event) {
		
		input.valid();
		
	});

	var texto = {
		min: formataNumero(0.01, 2, false, true, "R$ ", ""),
		max: formataNumero(valorRestante, 2, false, true, "R$ ", "")
	};
	
	input.rules('add', {
		required: true,
		number: true,
		min: 0.01,
		max: formataNumeroSql(texto.max),
		messages: { 
			required: "É necessário informar o valor!",
			min: "Valor menor que " + texto.min,
			max: "Valor maior que " + texto.max
		}
	});
	
}
