/* =========================================================
 * formataDadosTracafe.js
 * http://lls.net.br/
 * ========================================================= */

function formataDadosTracafe(tracafe) {
	
	tracafe.data = formataData(tracafe.data);
	tracafe.peso = formataNumero(tracafe.peso, 2, false, true, "", " kg");
	tracafe.pesoResultado = formataNumero(tracafe.pesoResultado, 2, false, true, "", " kg");
	tracafe.produtor = decodeURIComponent(tracafe.produtor);
	tracafe.fazenda = decodeURIComponent(tracafe.fazenda);
	tracafe.produtorDestino = decodeURIComponent(tracafe.produtorDestino);
	tracafe.fazendaDestino = decodeURIComponent(tracafe.fazendaDestino);
	tracafe.observacao = decodeURIComponent(tracafe.observacao);
	tracafe.usuario = decodeURIComponent(tracafe.usuario);
	
	tracafe["titulo"] = tracafe.lote;
	
	tracafe["alterar"] = 0;
	tracafe["lancamento"] = 0;
	tracafe["imprimir"] = 0;
	tracafe["remover"] = 0;
	
}
