/* =========================================================
 * formataDadosEntmilho.js
 * http://lls.net.br/
 * ========================================================= */

function formataDadosEntmilho(entmilho) {
	
	carregaCssJs("js/jquery-lls/jquery-lls-componente-campos.js", "js");
	carregaCssJs("js/jquery-lls/jquery-lls-componente-placa.js", "js");
	
	entmilho.data = formataData(entmilho.data);
	
	entmilho.produtor = decodeURIComponent(entmilho.produtor);
	entmilho.fazenda = decodeURIComponent(entmilho.fazenda);
	entmilho.tiket = entmilho.tiket;
	entmilho.placa = pegaPlacaMascara(entmilho.placa);
	entmilho.bruto = formataNumero(entmilho.bruto, 2, false, false, "", " kg");
	entmilho.impureza = formataNumero(entmilho.impureza, 2, false, false, "", " %");
	entmilho.valorImpureza = formataNumero(entmilho.valorImpureza, 2, true, false, "", " kg");
	entmilho.umidade = formataNumero(entmilho.umidade, 2, false, false, "", " %");
	entmilho.descontoUmidade = formataNumero(entmilho.descontoUmidade, 2, false, false, "", " %");
	entmilho.valorUmidade = formataNumero(entmilho.valorUmidade, 2, false, false, "", " kg");
	entmilho.quirela = formataNumero(entmilho.quirela, 2, false, false, "", " %");
	entmilho.valorQuirela = formataNumero(entmilho.valorQuirela, 2, false, false, "", " kg");
	entmilho.chocho = formataNumero(entmilho.chocho, 2, false, false, "", " %");
	entmilho.valorChocho = formataNumero(entmilho.valorChocho, 2, false, false, "", " kg");
	entmilho.liquido = formataNumero(entmilho.liquido, 2, false, false, "", " kg");
	entmilho.limpeza = formataNumero(entmilho.limpeza, 2, false, false, "R$ ", "");
	entmilho.secagem = formataNumero(entmilho.secagem, 2, false, false, "R$ ", "");
	entmilho.carga = formataNumero(entmilho.carga, 2, false, false, "R$ ", "");
	entmilho.recepcao = formataNumero(entmilho.recepcao, 2, false, false, "R$ ", "");
	entmilho.total = formataNumero(entmilho.total, 2, false, false, "R$ ", "");
	entmilho.obs = decodeURIComponent(entmilho.obs);
	entmilho.cilo = entmilho.cilo;
	
	if (entmilho.laudo == null) entmilho.laudo = "";
	
	entmilho["nome"] = "Laudo: " + entmilho.laudo;
	
	entmilho["alterar"] = 1;
	entmilho["remover"] = 0;
	
}
