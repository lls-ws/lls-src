/* =========================================================
 * setDadosTabelaPeneira.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosTabelaPeneira(peneira) {
	
	formataDadosPeneira(peneira);
	
	var $idLinha = "peneira_" + peneira.id;
	
	var $urlBotao = 'mostraCadastro("' + peneira.id + '" , "Peneira")';
	
	var $botaoVisualizar = botao(
		"botaoVisualizar", "", "eye-open", "0", "btn btn-primary btn-xs", "button", $urlBotao
	);
	
	var $tbody = $("#listaPeneiraForm #tableListaPeneira #tbodyListaPeneira");
	
	if (peneira.tipoOperacao == 0) {
		
		var $tr = tr($idLinha, "");
		
		$tr.append(tabelaCelula($botaoVisualizar, "text-center", "texto", "tdBotao"));
		$tr.append(tabelaCelula(peneira.nome, "text-left", "texto", "tdNome"));
		
		$tbody.append($tr);
		
	}
	else {
		
		var $tr = $tbody.find("#" + $idLinha);
		
		$tr.find("#tdBotao").replaceWith(tabelaCelula($botaoVisualizar, "text-center", "texto", "tdBotao"));
		$tr.find("#tdNome").replaceWith(tabelaCelula(peneira.nome, "text-left", "texto", "tdNome"));
		
	}
	
}
