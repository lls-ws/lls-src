/* =========================================================
 * formataDadosSaimilho.js
 * http://lls.net.br/
 * ========================================================= */

function formataDadosSaimilho(saimilho) {
	
	carregaCssJs("js/jquery-lls/jquery-lls-componente-campos.js", "js");
	carregaCssJs("js/jquery-lls/jquery-lls-componente-placa.js", "js");
	
	saimilho.data = formataData(saimilho.data);
	saimilho.laudo = saimilho.laudo;
	saimilho.produtor = decodeURIComponent(saimilho.produtor);
	saimilho.fazenda = decodeURIComponent(saimilho.fazenda);
	saimilho.tiket = saimilho.tiket;
	saimilho.placa = pegaPlacaMascara(saimilho.placa);
	saimilho.liquido = formataNumero(saimilho.liquido, 2, false, false, "", " kg");
	saimilho.obs = decodeURIComponent(saimilho.obs);
	saimilho.cilo = saimilho.cilo;
	saimilho.destino = decodeURIComponent(saimilho.destino);
	
	if (saimilho.laudo == null) saimilho.laudo = "";
	
	saimilho["nome"] = "";
	
	saimilho["alterar"] = 1;
	saimilho["remover"] = 0;
	
}
