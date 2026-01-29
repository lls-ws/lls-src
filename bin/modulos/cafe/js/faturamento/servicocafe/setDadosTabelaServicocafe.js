/* =========================================================
 * setDadosTabelaServicocafe.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosTabelaServicocafe(dados, trTabela, botaoVisualizar) {
	
	trTabela.append(tabelaCelula(botaoVisualizar, "text-center", "texto", "tdBotaoVisualizar"));
	
	setDadosColunaHideCore(dados, trTabela);
	
	trTabela.append(tabelaCelula(dados.data, "text-center", "texto", "tdData"))
			.append(tabelaCelula(dados.servico, "text-left", "texto", "tdServico"))
			.append(tabelaCelula(dados.total, "text-right", "texto", "tdTotal"));
	
	if (dados.valorPago > 0) trTabela.append(tabelaCelula(dados.pago, "text-right", "texto_cor_verde", "tdPago"));
	else trTabela.append(tabelaCelula(dados.pago, "text-right", "texto", "tdPago"));
	if (dados.valorRestante > 0) trTabela.append(tabelaCelula(dados.valor, "text-right", "texto_cor_vermelho", "tdValor"));
	else trTabela.append(tabelaCelula(dados.valor, "text-right", "texto", "tdValor"));
	
}
