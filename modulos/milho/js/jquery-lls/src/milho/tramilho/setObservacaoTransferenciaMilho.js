/* =========================================================
 * setObservacaoTransferenciaMilho.js
 * http://lls.net.br/
 * ========================================================= */

function setObservacaoTransferenciaMilho(nomeTabela) {

	var dados = pegaDadosFormularioTramilho(nomeTabela, 1);

	var texto = "Transferência de " + dados.liquido +
		" do produtor " + dados.produtorSaida +
		" para o produtor " + dados.produtorEntrada + ".";

	$("#observacao" + nomeTabela).val('').val(texto);
	
}
