/* =========================================================
 * setDadosTabelaExtratocafe.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosTabelaExtratocafe(dados, trTabela, botaoVisualizar) {
	
	trTabela.append(tabelaCelula(dados.data, "text-center", "texto", "tdData"))
			.append(tabelaCelula(dados.lote, "text-center", "texto", "tdLote"));
		
	setDadosColunaHideCore(dados, trTabela);
	
	trTabela.append(tabelaCelula(dados.peneira, "text-left", "texto", "tdPeneira"))
			.append(tabelaCelula(dados.pilha, "text-center", "texto", "tdPilha"))
			.append(tabelaCelula(dados.observacao, "text-center", "texto", "tdObservacao"))
			.append(tabelaCelula(dados.sacas, "text-right", "texto", "tdSacas"))
			.append(tabelaCelula(dados.peso, "text-right", "texto", "tdPeso"));
	
}
