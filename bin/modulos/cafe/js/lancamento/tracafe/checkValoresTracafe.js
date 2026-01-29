/* =========================================================
 * checkValoresTracafe.js
 * http://lls.net.br/
 * ========================================================= */

function checkValoresTracafe(dados, formulario) {
	
	var campo = {
		sacas: $('#sacas' + dados.nomeTabela).val(),
		idOrigem: $('#idnomeProcuraCadastro' + dados.nomeTabela + dados.campoProcura).val(),
		idDestino: $('#idnomeProcuraCadastro' + dados.nomeTabela + "Destino" + dados.campoProcura).val()
	}
	
	if (campo.idOrigem == 0 || campo.idDestino == 0 || campo.sacas == 0) {
		
		$('#theadtable' + dados.nomeTabelaCadastro[0] + ' tr th:nth-child(1)').hide();
		$('#tbody' + dados.nomeTabelaCadastro[0] + ' tr td:nth-child(1)').hide();
		$('#tfoottable' + dados.nomeTabelaCadastro[0] + ' tr th:nth-child(1)').attr('colspan','4');
		
		formulario.find('#botaoNovo' + dados.nomeTabelaCadastro[0]).hide();
		
	}
	else if (campo.idOrigem == campo.idDestino) {
		
		mostraDialog(
			'Produtor de destino igual ao produtor de origem!',
			'texto_cor_vermelho',
			'table',
			tituloPainelCadastro(0, eval('pegaNomeColunas' + dados.nomeTabela + '(3)'))
		);
		
		$('#spanGroupSearch' + dados.nomeTabela + "Destino" + dados.campoProcura).click();
		
		$('#theadtable' + dados.nomeTabelaCadastro[0] + ' tr th:nth-child(1)').hide();
		$('#tbody' + dados.nomeTabelaCadastro[0] + ' tr td:nth-child(1)').hide();
		$('#tfoottable' + dados.nomeTabelaCadastro[0] + ' tr th:nth-child(1)').attr('colspan','4');
		
		formulario.find('#botaoNovo' + dados.nomeTabelaCadastro[0]).hide();
		
	}
	else {
		
		$('#theadtable' + dados.nomeTabelaCadastro[0] + ' tr th:nth-child(1)').show();
		$('#tbody' + dados.nomeTabelaCadastro[0] + ' tr td:nth-child(1)').show();
		$('#tfoottable' + dados.nomeTabelaCadastro[0] + ' tr th:nth-child(1)').attr('colspan','5');
		
		formulario.find('#botaoNovo' + dados.nomeTabelaCadastro[0]).show();
	}
	
}
