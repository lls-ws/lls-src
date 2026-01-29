/* =========================================================
 * setDadosFormularioDespejoCafe.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosFormularioDespejoCafe(dados) {
	
	setDadosFormularioCafe(dados);
	
	dados.tipoOperacao = 0;
	dados.nomeTabelaLancamento.splice(0, 1);
	
	for(var j = 0; j < dados.array.lancamentos.length; j++) {
		
		var count = 0;
		
		var lancamentosTabela = dados.array.lancamentos[j];
			
		for(var i = 0; i < lancamentosTabela.length; i++) {
		
			lancamentosTabela[i]["idCadastro"] = dados.id;
			
			count++;
			
		}
		
		if (count > 0) {
		
			$('#' + dados.nomeTabela.toLowerCase() + 'Form')
				.find("#spanGroupSearch" + dados.nomeTabela + "FazendaProdutor")
					.unbind();
			
		}
		
	}
	
	setDadosTabelaLancamentoCore(dados);
	
}
