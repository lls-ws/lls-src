/* =========================================================
 * setBotoesExcluirDialogCafe.js
 * http://lls.net.br/
 * ========================================================= */

function setBotoesExcluirDialogCafe(dados) {
	
	for(var i = 0; i < dados.array.lancamentos.length - 1; i++) {
	
		var posicaoAba = i + 3;
	
		if($('#linha_tab' + dados.nomeTabela + posicaoAba).is(":visible")) {
		
			$('#theadtable' + dados.nomeTabelaLancamento[i] + ' tr th:nth-child(1)').hide();
			$('#tbody' + dados.nomeTabelaLancamento[i] + ' tr td:nth-child(1)').hide();
			$('#tfoottable' + dados.nomeTabelaLancamento[i] + ' tr th:nth-child(1)').attr('colspan','4');
			
		}
		else {
			
			var posicaoAba = i + 2;
			
			var titulo = $('#linha_tab' + dados.nomeTabela + posicaoAba + ' a').text();
			
			if (titulo == "Despejo" && dados.nomeTabela != "Saicafe") {
				
				$('#theadtable' + dados.nomeTabelaLancamento[i] + ' tr th:nth-child(1)').hide();
				$('#tbody' + dados.nomeTabelaLancamento[i] + ' tr td:nth-child(1)').hide();
				$('#tfoottable' + dados.nomeTabelaLancamento[i] + ' tr th:nth-child(1)').attr('colspan','4');
				
			}
			
		}

	}
	
}
