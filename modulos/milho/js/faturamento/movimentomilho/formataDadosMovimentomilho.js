/* =========================================================
 * formataDadosMovimentomilho.js
 * http://lls.net.br/
 * ========================================================= */

function formataDadosMovimentomilho(movimentomilho) {
	
	movimentomilho.produtor = decodeURIComponent(movimentomilho.produtor);
	movimentomilho.fazenda = decodeURIComponent(movimentomilho.fazenda);
	
	movimentomilho.anterior = formataNumero(movimentomilho.anterior, 2, true, true, "", " kg");
	movimentomilho.entradas = formataNumero(movimentomilho.entradas, 2, false, true, "", " kg");
	movimentomilho.saidas = formataNumero(movimentomilho.saidas, 2, false, true, "", " kg");
	movimentomilho.saldo = formataNumero(movimentomilho.saldo, 2, true, true, "", " kg");
	
	movimentomilho.armazenagem = formataNumero(movimentomilho.armazenagem, 2, true, true, "R$ ", "");
	movimentomilho.limpeza = formataNumero(movimentomilho.limpeza, 2, true, true, "R$ ", "");
	movimentomilho.secagem = formataNumero(movimentomilho.secagem, 2, true, true, "R$ ", "");
	movimentomilho.carga = formataNumero(movimentomilho.carga, 2, true, true, "R$ ", "");
	movimentomilho.recepcao = formataNumero(movimentomilho.recepcao, 2, true, true, "R$ ", "");
	
	movimentomilho.total = formataNumero(movimentomilho.total, 2, true, true, "R$ ", "");
	
	movimentomilho.data = formataData(movimentomilho.data);
	
}
