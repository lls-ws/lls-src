/* =========================================================
 * setDadosDialogPeneira.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosDialogPeneira(peneira) {
	
	formataDadosPeneira(peneira);
	
	var $idLinha = "trPeneiraDialog_" + peneira.id;
	
	var $trPeneira = tr($idLinha, "");
	
	$trPeneira.append(tabelaCelula(peneira.nome, "text-left", "texto", "tdNome"));	
	
	setDadosDialogCadastro(peneira, null, $trPeneira);
	
}
