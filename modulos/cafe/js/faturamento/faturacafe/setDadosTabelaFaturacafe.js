/* =========================================================
 * setDadosTabelaFaturacafe.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosTabelaFaturacafe(dados, trTabela, botaoVisualizar) {
	
	setDadosColunaHideCore(dados, trTabela);
	
	trTabela.append(tabelaCelula(dados.data, "text-center", "texto", "tdData"))
			.append(tabelaCelula(dados.anterior, "text-right", "texto", "tdAnterior"))
			.append(tabelaCelula(dados.entradas, "text-right", "texto", "tdEntradas"))
			.append(tabelaCelula(dados.saidas, "text-right", "texto", "tdSaidas"))
			.append(tabelaCelula(dados.quebras, "text-right", "texto", "tdQuebras"))
			.append(tabelaCelula(dados.acrescimos, "text-right", "texto", "tdAcrescimos"))
			.append(tabelaCelula(dados.recebidas, "text-right", "texto", "tdRecebidas"))
			.append(tabelaCelula(dados.emitidas, "text-right", "texto", "tdEmitidas"))
			.append(tabelaCelula(dados.saldo, "text-right", "texto", "tdSaldo"))
			.append(tabelaCelula(dados.armazenagem, "text-right", "texto", "tdArmazenagem"))
			.append(tabelaCelula(dados.servicos, "text-right", "texto", "tdServicos"))
			.append(tabelaCelula(dados.total, "text-right", "texto", "tdTotal"))
	
}
