/* =========================================================
 * formataDadosSintetizamilho.js
 * http://lls.net.br/
 * ========================================================= */

function formataDadosSintetizamilho(sintetizamilho) {
	
	carregaCssJs("js/jquery-lls/jquery-lls-componente-campos.js", "js");
	
	sintetizamilho.produtor = decodeURIComponent(sintetizamilho.produtor);
	sintetizamilho.fazenda = decodeURIComponent(sintetizamilho.fazenda);
	
	sintetizamilho.armazenagem = formataNumero(sintetizamilho.armazenagem, 2, true, true, "R$ ", "");
	sintetizamilho.recepcao = formataNumero(sintetizamilho.recepcao, 2, true, true, "R$ ", "");
	sintetizamilho.limpeza = formataNumero(sintetizamilho.limpeza, 2, true, true, "R$ ", "");
	sintetizamilho.secagem = formataNumero(sintetizamilho.secagem, 2, true, true, "R$ ", "");
	sintetizamilho.carga = formataNumero(sintetizamilho.carga, 2, true, true, "R$ ", "");
	
	sintetizamilho.total = formataNumero(sintetizamilho.total, 2, true, true, "R$ ", "");
	
}
