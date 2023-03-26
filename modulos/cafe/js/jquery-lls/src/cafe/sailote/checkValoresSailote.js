/* =========================================================
 * checkValoresSailote.js
 * http://lls.net.br/
 * ========================================================= */

function checkValoresSailote(dados, formulario) {
	
	var valores = {
		sacas: Number($('#sacas' + dados.nomeTabela).val()),
		peso: formataNumeroSql($('#peso' + dados.nomeTabela).val()),
		sacasDespejo: Number($('#sacasDespejo' + dados.nomeTabela).val()),
		pesoDespejo: formataNumeroSql($('#pesoDespejo' + dados.nomeTabela).val())
	}
	
	valores.peso = valores.sacas * (valores.pesoDespejo / valores.sacasDespejo);
	
	arredondaPesoCafe(valores);
	
	$('#peso' + dados.nomeTabela).val(formataNumero(valores.peso, 2, false, false, "", " kg"));

	$('#sacas' + dados.nomeTabela).rules('remove', 'min');
	$('#sacas' + dados.nomeTabela).rules('remove', 'max');
	$('#sacas' + dados.nomeTabela)
		.rules('add', {
			min: valores.sacasDespejo,
			max: valores.sacasDespejo,
			messages: {
				min: "Quantidade de sacas menor que {0}",
				max: "Quantidade de sacas maior que {0}"
			}
		});
	
}
