/* =========================================================
 * formataDadosBaixamilho.js
 * http://lls.net.br/
 * ========================================================= */

function formataDadosBaixamilho(baixamilho) {
	
	baixamilho.obs = decodeURIComponent(baixamilho.obs);
	
	baixamilho.data = formataData(baixamilho.data);
	baixamilho.valor = formataNumero(baixamilho.valor, 2, true, true, "R$ ", "");
	
	baixamilho["nome"] = "Data " + baixamilho.data + " " + baixamilho.valor;
	
	baixamilho["texto"] = baixamilho.nome;
	
}
