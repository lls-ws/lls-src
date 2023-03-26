/* =========================================================
 * pegaValoresTabelaCafeFormacao.js
 * http://lls.net.br/
 * ========================================================= */

function pegaValoresTabelaCafeFormacao(dados) {
	
	var tdSacas = $('#tbody' + dados.nomeTabela)
		.find("#" + dados.nomeTabela + "_" + dados.id)
		.find('#tdSacas').find('p');
	
	var tdPeso = $('#tbody' + dados.nomeTabela)
		.find("#" + dados.nomeTabela + "_" + dados.id)
		.find('#tdPeso').find('p');
	
	return {
		sacas: formataNumeroSacasSql(tdSacas.text()),
		peso: formataNumeroSql(tdPeso.text())
	}
	
}
