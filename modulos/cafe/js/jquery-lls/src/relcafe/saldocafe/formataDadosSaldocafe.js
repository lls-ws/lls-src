/* =========================================================
 * formataDadosSaldocafe.js
 * http://lls.net.br/
 * ========================================================= */

function formataDadosSaldocafe(dados) {
	
	carregaCssJs("js/jquery-lls/jquery-lls-componente-campos.js", "js");
	carregaCssJs("js/jquery-lls/jquery-lls-componente-formulario-cafe.js", "js");
	
	dados.produtor = decodeURIComponent(dados.produtor);
	dados.fazenda = decodeURIComponent(dados.fazenda);
	dados.sacas = formataNumeroSacasCafe(dados.sacas);
	dados.peso = formataNumero(dados.peso, 2, false, true, "", " kg");
	dados.media = formataNumero(dados.media, 2, false, true, "", " kg");
	dados.servico = formataNumeroSacasCafe(dados.servico);
	dados.saida = formataNumeroSacasCafe(dados.saida);
	dados.transferida = formataNumeroSacasCafe(dados.transferida);
	dados.total = formataNumeroSacasCafe(dados.total);
	
}
