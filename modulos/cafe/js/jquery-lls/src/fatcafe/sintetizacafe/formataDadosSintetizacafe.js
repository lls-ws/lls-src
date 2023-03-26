/* =========================================================
 * formataDadosSintetizacafe.js
 * http://lls.net.br/
 * ========================================================= */

function formataDadosSintetizacafe(dados) {
	
	carregaCssJs("js/jquery-lls/jquery-lls-componente-campos.js", "js");
	
	dados.produtor = decodeURIComponent(dados.produtor);
	dados.fazenda = decodeURIComponent(dados.fazenda);
	dados.data = formataData(dados.data);
	dados.armazenagem = formataNumero(dados.armazenagem, 2, false, true, "R$ ", "");
	dados.servicos = formataNumero(dados.servicos, 2, false, true, "R$ ", "");
	dados.total = formataNumero(dados.total, 2, false, true, "R$ ", "");
	
}
