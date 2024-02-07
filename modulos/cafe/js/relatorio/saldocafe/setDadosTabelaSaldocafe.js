/* =========================================================
 * setDadosTabelaSaldocafe.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosTabelaSaldocafe(dados, trTabela, botaoVisualizar) {
	
	setDadosColunaHideCore(dados, trTabela);
	
	trTabela.append(tabelaCelula(dados.sacas, "text-right", "texto", "tdSacas"))
			.append(tabelaCelula(dados.peso, "text-right", "texto", "tdPeso"))
			.append(tabelaCelula(dados.media, "text-right", "texto", "tdMedia"))
			.append(tabelaCelula(dados.servico, "text-right", "texto", "tdServico"))
			.append(tabelaCelula(dados.saida, "text-right", "texto", "tdSaida"))
			.append(tabelaCelula(dados.transferida, "text-right", "texto", "tdTransferida"))
			.append(tabelaCelula(dados.total, "text-right", "texto", "tdTotal"))
	
}
