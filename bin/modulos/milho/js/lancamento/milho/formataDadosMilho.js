/* =========================================================
 * formataDadosMilho.js
 * http://lls.net.br/
 * ========================================================= */

function formataDadosMilho(milho) {
	
	milho.produtor = decodeURIComponent(milho.produtor);
	milho.fazenda = decodeURIComponent(milho.fazenda);
	milho.entrada = formataNumero(milho.entrada, 2, false, true, "", " kg");
	milho.dataEntrada = formataData(milho.dataEntrada);
	milho.saida = formataNumero(milho.saida, 2, false, true, "", " kg");
	milho.dataSaida = formataData(milho.dataSaida);
	milho.saldo = formataNumero(milho.saldo, 2, false, true, "", " kg");
	milho.dataFaturamento = formataData(milho.dataFaturamento);

}
