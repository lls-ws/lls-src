/* =========================================================
 * setDadosColunaHideCore.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosColunaHideCore(dados, trTabela) {
	
	var idFazenda = $('#idnomeProcura' + dados.nomeTabela + 'FazendaProdutor').val();
		
	if (idFazenda == 0) {
	
		trTabela.append(tabelaCelula(dados.produtor, "text-left", "texto", "tdProdutor"))
				.append(tabelaCelula(dados.fazenda, "text-left", "texto", "tdFazenda"));
		
	}
	else {
		
		if ($('#spanIconClear' + dados.nomeTabela + 'FazendaProdutor').hasClass("glyphicon-star-empty")) {
		
			trTabela.append(tabelaCelula(dados.fazenda, "text-left", "texto", "tdFazenda"));
			
		}
		
	}
	
}
