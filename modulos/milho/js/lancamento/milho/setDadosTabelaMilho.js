/* =========================================================
 * setDadosTabelaMilho.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosTabelaMilho(milho) {
	
	formataDadosMilho(milho);
	
	var $idLinha = "milho_" + milho.id;
	
	var $urlBotao = 'mostraCadastro("' + milho.id + '" , "Milho")';
	
	var $botaoVisualizar = botao(
		"botaoVisualizar" + milho.id, "", "fa-eye", "0", "btn btn-primary btn-xs", "button", $urlBotao
	);
	
	var $tbody = $("#listaMilhoForm #tableListaMilho #tbodyListaMilho");
	
	var $tr = tr($idLinha, "");
	
	$tr.append(tabelaCelula($botaoVisualizar, "text-center", "texto", "tdBotao"));
	
	setDadosColunaHide("Milho", milho, $tr);
	
	$tr.append(tabelaCelula(milho.entrada, "text-right", "texto", "tdEntrada"));
	$tr.append(tabelaCelula(milho.saida, "text-right", "texto", "tdSaida"));
	$tr.append(tabelaCelula(milho.saldo, "text-right", "texto", "tdSaldo"));
	
	$tbody.append($tr);
		
}
