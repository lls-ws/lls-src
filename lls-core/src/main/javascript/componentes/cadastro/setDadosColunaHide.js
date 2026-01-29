/* =========================================================
 * setDadosColunaHide.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosColunaHide(nomeTabela, dados, tr) {
	
	var idFazenda = $('#idnomeProcura' + nomeTabela + 'FazendaProdutor').val();
		
	if (idFazenda == 0) {
	
		tr.append(tabelaCelula(dados.produtor, "text-left", "texto", "tdProdutor"));
		tr.append(tabelaCelula(dados.fazenda, "text-left", "texto", "tdFazenda"));
		
	}
	else {
		
		if ($('#spanIconClear' + nomeTabela + 'FazendaProdutor').hasClass("glyphicon-star-empty")) {
		
			tr.append(tabelaCelula(dados.fazenda, "text-left", "texto", "tdFazenda"));
			
		}
		
	}
	
}
