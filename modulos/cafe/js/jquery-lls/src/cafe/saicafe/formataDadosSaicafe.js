/* =========================================================
 * formataDadosSaicafe.js
 * http://lls.net.br/
 * ========================================================= */

function formataDadosSaicafe(saicafe) {
	
	carregaCssJs("js/jquery-lls/jquery-lls-componente-campos.js", "js");
	
	saicafe.data = formataData(saicafe.data);
	saicafe.peso = formataNumero(saicafe.peso, 2, false, true, "", " kg");
	saicafe.pesoSaida = formataNumero(saicafe.pesoSaida, 2, false, true, "", " kg");
	saicafe.destino = decodeURIComponent(saicafe.destino);
	saicafe.produtor = decodeURIComponent(saicafe.produtor);
	saicafe.fazenda = decodeURIComponent(saicafe.fazenda);
	saicafe.observacao = decodeURIComponent(saicafe.observacao);
	saicafe.usuario = decodeURIComponent(saicafe.usuario);
	
	if (saicafe.cobrar) saicafe["textoCobrar"] = "Sim";
	else saicafe["textoCobrar"] = "Não";
	
	saicafe["titulo"] = saicafe.lote;
	
	saicafe["alterar"] = 0;
	saicafe["lancamento"] = 0;
	saicafe["imprimir"] = 0;
	saicafe["remover"] = 0;
	
}
