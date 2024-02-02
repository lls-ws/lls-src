/* =========================================================
 * setDadosTabelaPreco.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosTabelaPreco(preco) {
	
	formataDadosPreco(preco);
	
	var $idLinha = "preco_" + preco.id;
	
	var $urlBotao = 'mostraCadastro("' + preco.id + '" , "Preco")';
	
	var $botaoVisualizar = botao(
		"botaoVisualizar" + preco.id, "", "fa-eye", "0", "btn btn-primary btn-xs", "button", $urlBotao
	);
	
	var $tbody = $("#listaPrecoForm #tableListaPreco #tbodyListaPreco");
	
	if (preco.tipoOperacao == 0) {
		
		var $tr = tr($idLinha, "");
		
		$tr.append(tabelaCelula($botaoVisualizar, "text-center", "texto", "tdBotao"));
		$tr.append(tabelaCelula(preco.nome, "text-left", "texto", "tdNome"));
		$tr.append(tabelaCelula(preco.valor, "text-right", "texto", "tdValor"));
		
		$tbody.append($tr);
		
	}
	else {
		
		var $tr = $tbody.find("#" + $idLinha);
		
		$tr.find("#tdBotao").replaceWith(tabelaCelula($botaoVisualizar, "text-center", "texto", "tdBotao"));
		$tr.find("#tdNome").replaceWith(tabelaCelula(preco.nome, "text-left", "texto", "tdNome"));
		$tr.find("#tdValor").replaceWith(tabelaCelula(preco.valor, "text-right", "texto", "tdValor"));
	
	}
	
}
