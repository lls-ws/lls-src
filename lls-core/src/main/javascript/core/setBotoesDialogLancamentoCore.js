/* =========================================================
 * setBotoesDialogLancamentoCore.js
 * http://lls.net.br/
 * ========================================================= */

function setBotoesDialogLancamentoCore(dados) {
	
	$("#botaoRemover" + dados.nomeTabela).hide();
	$("#botaoAlterar" + dados.nomeTabela).hide();
	$("#botaoLancamento" + dados.nomeTabela).hide();
	
	var qtdTipo = $('#tipo' + dados.nomeTabela).find("option").length;
	
	if (dados.array.indexStatus < qtdTipo - 2) {
		
		if (dados.array.remover == 0 && dados.array.indexStatus == 0) {
			
			if (dados.tipo == "Baixa") {
				if (dados.array.valorPago == 0) $("#botaoRemover" + dados.nomeTabela).show();
			}
			else {
			  if (dados.array.sacasDesdobras == 0) $("#botaoRemover" + dados.nomeTabela).show();
			 }
			 
		 }
		
		if (dados.array.alterar == 0) {
		
			if (dados.tipo == "GR") {
				if (dados.array.sacasDesdobras == 0) $("#botaoAlterar" + dados.nomeTabela).show();
			}
			else {
				if (dados.array.indexStatus < 2) {
					
					if (dados.tipo == "Baixa") {
						
						if (dados.array.valorPago == 0) $("#botaoAlterar" + dados.nomeTabela).show();
						
					}
					else {
						
						if (dados.array.lancamentos[1] == null) {
							$("#botaoAlterar" + dados.nomeTabela).show();
						}
						else {
							if (dados.array.lancamentos[1].length == 0) {
								$("#botaoAlterar" + dados.nomeTabela).show();
							}
						}
						
					}
					
				}
			}
			
		}
		
		if (dados.array.lancamento == 0) {
			
			if (dados.tipo == "GR") $("#botaoLancamento" + dados.nomeTabela).show();
			else {
				if (dados.tipo == "GE") {
					if (dados.array.indexStatus == 1 && dados.array.sacasRestantes == 0) {
						$("#botaoLancamento" + dados.nomeTabela).show();
					}
				}
				else {
					if (dados.tipo == "Baixa") {
						
						if (dados.array.valorRestante > 0) {
							$("#botaoLancamento" + dados.nomeTabela).show();
						}
						
					}
					else {
					
						if (dados.array.indexStatus == 1 && dados.array.sacasRestantes > 0) {
							$("#botaoLancamento" + dados.nomeTabela).show();
						}
						
					}
					
				}
				
			}
			
		}
		
	}
	else {
		
		if (dados.tipo == "OS") {
			
			var data = new Date( dados.array.data.replace( /(\d{2})[-/](\d{2})[-/](\d{4})/, "$3/$2/$1") )
			
			var dias = Math.floor(( new Date() - data ) / 86400000);
			
			if (dias <= 3 ) {
			
				var spanIcone = span('glyphicon glyphicon-usd');
				
				$("#botaoLancamento" + dados.nomeTabela)
					.text('')
					.append(spanIcone)
					.append(' Cobrar')
					.show();
					
			}
				
		}
		
	}
	
}
