/* =========================================================
 * setDadosTabelaSaimilho.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosTabelaSaimilho(saimilho) {
	
	formataDadosSaimilho(saimilho);
	
	var $idLinha = "saimilho_" + saimilho.id;
	
	var $urlBotao = 'mostraCadastro("' + saimilho.id + '" , "Saimilho")';
	
	var $botaoVisualizar = botao(
		"botaoVisualizar"+ saimilho.id, "", "fa-eye", "0", "btn btn-primary btn-xs", "button", $urlBotao
	);
	
	var $tbody = $("#listaSaimilhoForm #tableListaSaimilho #tbodyListaSaimilho");
	
	var $tr = tr($idLinha, "");
	
	$tr.append(tabelaCelula($botaoVisualizar, "text-center", "texto", "tdBotao"));
	$tr.append(tabelaCelula(saimilho.data, "text-center", "texto", "tdData"));
	$tr.append(tabelaCelula(saimilho.laudo, "text-center", "texto", "tdLaudo"));
	
	setDadosColunaHide("Saimilho", saimilho, $tr);
	
	$tr.append(tabelaCelula(saimilho.placa, "text-center", "texto", "tdPlaca"));
	$tr.append(tabelaCelula(saimilho.destino, "text-left", "texto", "tdDestino"));
	$tr.append(tabelaCelula(saimilho.liquido, "text-right", "texto", "tdLiquido"));
	
	$tbody.append($tr);
	
}
