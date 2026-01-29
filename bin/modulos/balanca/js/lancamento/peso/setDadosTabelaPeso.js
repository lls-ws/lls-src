/* =========================================================
 * setDadosTabelaPeso.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosTabelaPeso(dados, trTabela, botaoVisualizar) {
	
	trTabela.append(tabelaCelula(botaoVisualizar, "text-center", "texto", "tdBotaoVisualizar"))
			.append(tabelaCelula(dados.data, "text-center", "texto", "tdData"))
			.append(tabelaCelula(dados.ticket, "text-center", "texto", "tdTicket"))
			.append(tabelaCelula(dados.placa, "text-center", "texto", "tdPlaca"));
	
	setDadosColunaHideCore(dados, trTabela);
	
	trTabela.append(tabelaCelula(dados.produto, "text-center", "texto", "tdProduto"))
			.append(tabelaCelula(dados.tipoPeso, "text-center", "texto", "tdTipoPeso"))
			.append(tabelaCelula(dados.tara, "text-right", "texto", "tdTara"))
			.append(tabelaCelula(dados.bruto, "text-right", "texto", "tdBruto"))
			.append(tabelaCelula(dados.liquido, "text-right", "texto", "tdLiquido"));
	
}
