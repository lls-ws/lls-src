/* =========================================================
 * setDadosDialogUmidade.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosDialogUmidade(umidade) {
	
	formataDadosUmidade(umidade);
	
	var $idLinha = 'trUmidadeDialog_' + umidade.id;
	
	var $trUmidade = tr($idLinha, '');
	
	$trUmidade.append(tabelaCelula(umidade.codigo, 'text-right', 'texto', 'tdCodigo'));
	
	$trUmidade.append(tabelaCelula(umidade.desconto, 'text-right', 'texto', 'tdDesconto'));
	
	$trUmidade.append(tabelaCelula(umidade.valor, 'text-right', 'texto', 'tdValor'));
	
	umidade["nome"] = umidade.codigo;
	
	setDadosDialogCadastro(umidade, null, $trUmidade);
	
}
