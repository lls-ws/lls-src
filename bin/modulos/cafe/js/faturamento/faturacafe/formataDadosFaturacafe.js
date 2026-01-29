/* =========================================================
 * formataDadosFaturacafe.js
 * http://lls.net.br/
 * ========================================================= */

function formataDadosFaturacafe(dados) {
	
	dados.data = formataData(dados.data);
	dados.produtor = decodeURIComponent(dados.produtor);
	dados.fazenda = decodeURIComponent(dados.fazenda);
	dados.anterior = formataNumeroSacasCafe(dados.anterior);
	dados.entradas = formataNumeroSacasCafe(dados.entradas);
	dados.saidas = formataNumeroSacasCafe(dados.saidas);
	dados.quebras = formataNumeroSacasCafe(dados.quebras);
	dados.acrescimos = formataNumeroSacasCafe(dados.acrescimos);
	dados.recebidas = formataNumeroSacasCafe(dados.recebidas);
	dados.emitidas = formataNumeroSacasCafe(dados.emitidas);
	dados.saldo = formataNumeroSacasCafe(dados.saldo);
	dados.armazenagem = formataNumero(dados.armazenagem, 2, false, true, "R$ ", "");
	dados.servicos = formataNumero(dados.servicos, 2, false, true, "R$ ", "");
	dados.total = formataNumero(dados.total, 2, false, true, "R$ ", "");

}
