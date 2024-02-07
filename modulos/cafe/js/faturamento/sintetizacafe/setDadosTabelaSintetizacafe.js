/* =========================================================
 * setDadosTabelaSintetizacafe.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosTabelaSintetizacafe(dados, trTabela, botaoVisualizar) {
	
	setDadosColunaHideCore(dados, trTabela);
	
	trTabela.append(tabelaCelula(dados.data, "text-center", "texto", "tdData"))
			.append(tabelaCelula(dados.armazenagem, "text-right", "texto", "tdArmazenagem"))
			.append(tabelaCelula(dados.servicos, "text-right", "texto", "tdServicos"))
			.append(tabelaCelula(dados.total, "text-right", "texto", "tdTotal"))
	
}
