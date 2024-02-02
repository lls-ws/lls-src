/* =========================================================
 * setDadosTabelaUmidade.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosTabelaUmidade(umidade) {
	
	formataDadosUmidade(umidade);
	
	var $idLinha = 'umidade_' + umidade.id;
	
	var $urlBotao = 'mostraCadastro("' + umidade.id + '" , "Umidade")';
	
	var $botaoVisualizar = botao(
		'botaoVisualizar' + umidade.id, '', 'fa-eye', '0', 'btn btn-primary btn-xs', 'button', $urlBotao
	);
	
	var $tbody = $('#listaUmidadeForm #tableListaUmidade #tbodyListaUmidade');
	
	if (umidade.tipoOperacao == 0) {
		
		var $tr = tr($idLinha, '');
		
		$tr.append(tabelaCelula($botaoVisualizar, 'text-center', 'texto', 'tdBotao'));
		$tr.append(tabelaCelula(umidade.codigo, 'text-right', 'texto', 'tdCodigo'));
		$tr.append(tabelaCelula(umidade.desconto, 'text-right', 'texto', 'tdDesconto'));
		$tr.append(tabelaCelula(umidade.valor, 'text-right', 'texto', 'tdValor'));
		
		$tbody.append($tr);
		
	}
	else {
		
		var $tr = $tbody.find('#' + $idLinha);
		
		$tr.find("#tdBotao")
			.replaceWith(tabelaCelula($botaoVisualizar, 'text-center', 'texto', 'tdBotao'));
		$tr.find("#tdCodigo")
			.replaceWith(tabelaCelula(umidade.codigo, 'text-right', 'texto', 'tdCodigo'));
		$tr.find("#tdDesconto")
			.replaceWith(tabelaCelula(umidade.desconto, 'text-right', 'texto', 'tdDesconto'));
		$tr.find("#tdValor")
			.replaceWith(tabelaCelula(umidade.valor, 'text-right', 'texto', 'tdValor'));
	}
	
}
