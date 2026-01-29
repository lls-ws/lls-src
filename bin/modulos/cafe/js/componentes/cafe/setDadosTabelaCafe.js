/* =========================================================
 * setDadosTabelaCafe.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosTabelaCafe(dados, trTabela, botaoVisualizar) {
	
	if (trTabela == null) {
		
		$("#id" + dados.nomeTabelaCadastro).val(dados.idCadastro);
		
		setTipoRelatorioCafe(dados);
		eventoListaCadastroCore(menuOpcoesCafe(dados.posicaoItemMenu, dados.posicaoItem));
		
	}
	else {
	
		trTabela.append(tabelaCelula(botaoVisualizar, "text-center", "texto", "tdBotao"))
				.append(tabelaCelula(dados.data, "text-center", "texto", "tdData"))
				.append(tabelaCelula(dados.lote, "text-center", "texto", "tdLote"));
			
		setDadosColunaHideCore(dados, trTabela);
		
		trTabela.append(tabelaCelula(formataNumeroSacasCafe(dados.sacas), "text-right", "texto", "tdSacas"))
				.append(tabelaCelula(dados.peso, "text-right", "texto", "tdPeso"));
				
	}
	
}
