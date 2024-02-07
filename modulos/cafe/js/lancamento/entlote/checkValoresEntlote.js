/* =========================================================
 * checkValoresEntlote.js
 * http://lls.net.br/
 * ========================================================= */

function checkValoresEntlote(dados, formulario) {
	
	var valores = {
		sacas: Number($('#sacas' + dados.nomeTabela).val()),
		peso: formataNumeroSql($('#peso' + dados.nomeTabela).val()),
		desdobras: Number($('#desdobras' + dados.nomeTabela).val())
	}
	
	if (valores.sacas == 0 || valores.peso == 0 || valores.desdobras == 0) {
		formulario.find('#botaoNovo' + dados.nomeTabelaLancamento[0]).hide();
	}
	else formulario.find('#botaoNovo' + dados.nomeTabelaLancamento[0]).show();
	
}
