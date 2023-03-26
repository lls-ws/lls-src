/* =========================================================
 * setDadosDialogPreco.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosDialogPreco(preco) {
	
	formataDadosPreco(preco);
	
	var $idLinha = "trPrecoDialog_" + preco.id;
	
	var $trPreco = tr($idLinha, "");
	
	$trPreco.append(tabelaCelula(preco.nome, "text-left", "texto", "tdNome"));	
	$trPreco.append(tabelaCelula(preco.valor, "text-right", "texto", "tdValor"));
	
	setDadosDialogCadastro(preco, null, $trPreco);
	
}
