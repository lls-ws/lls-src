/* =========================================================
 * setDadosRodapeSaldoMilho.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosRodapeSaldoMilho(nomeTabela, rodape, colspan, th1) {
	
	setDadosRodapeHide(nomeTabela, colspan, th1);
	
	var idFazenda = $('#idnomeProcura' + nomeTabela + 'FazendaProdutor').val();
	
	if (idFazenda > 0) {
		
		var $trSaldo = tr('saldoRodape' + nomeTabela, '');
			
		var $thTextoEntradas = th();
		var $thTextoSaidas = th();
		var $thTextoSaldo = th();
		
		var $thEntradas = th();
		var $thSaidas = th();
		var $thSaldo = th();
		var $thFim = th();
		
		var colunaEntradas = 0;
		var colunaSaldo = 0;
		
		if ($('#spanIconClear' + nomeTabela + 'FazendaProdutor').hasClass("glyphicon-star-empty")) {
			
			if ( colspan.fim > 0 ) {
				
				colunaEntradas = colspan.inicio - 1;
				colunaSaldo = colunaEntradas - 2;
				
			}
			else {
				
				colunaEntradas = 2;
				
			}
			
		}
		else {
			
			if ( colspan.fim > 0 ) {
				
				colunaEntradas = colspan.inicio - 2;
				colunaSaldo = colunaEntradas - 1;
				
			}
			
		}
		
		$thTextoEntradas.attr('colspan', colunaEntradas);
		$thTextoSaldo.attr('colspan', colunaSaldo);
		
		var $paragrafoTextoEntradas = paragrafo('text-center texto', 'texto');
		var $paragrafoTextoSaidas = paragrafo('text-center texto', 'texto');
		var $paragrafoTextoSaldo = paragrafo('text-center texto', 'texto');
		
		var $paragrafoEntradas = paragrafo('text-right texto', 'texto');
		var $paragrafoSaidas = paragrafo('text-right texto', 'texto');
		var $paragrafoSaldo = paragrafo('text-right texto', 'texto');
		
		$paragrafoTextoEntradas.append("Entradas");
		$paragrafoTextoSaidas.append("Saídas");
		$paragrafoTextoSaldo.append("Saldo Atual");
		
		$paragrafoEntradas.append(formataNumero(rodape[0].entradas, 2, false, false, "", " kg"));
		$paragrafoSaidas.append(formataNumero(rodape[0].saidas, 2, false, false, "", " kg"));
		$paragrafoSaldo.append(formataNumero(rodape[0].saldo, 2, false, false, "", " kg"));
		
		$thTextoEntradas.append($paragrafoTextoEntradas).attr('id', 'textoEntradas');
		$thTextoSaidas.append($paragrafoTextoSaidas).attr('id', 'textoSaidas');
		$thTextoSaldo.append($paragrafoTextoSaldo).attr('id', 'textoSaldo');
		
		$thEntradas.append($paragrafoEntradas).attr('id', 'totalEntradas');
		$thSaidas.append($paragrafoSaidas).attr('id', 'totalSaidas');
		$thSaldo.append($paragrafoSaldo).attr('id', 'totalSaldo');
		
		$trSaldo.append($thTextoEntradas);
		$trSaldo.append($thEntradas);
		
		$trSaldo.append($thTextoSaidas);
		$trSaldo.append($thSaidas);
		
		$trSaldo.append($thTextoSaldo);
		$trSaldo.append($thSaldo);
		
		if ( colspan.fim > 0 ) {
			
			$thFim.attr('colspan', colspan.fim);
			
			$trSaldo.append($thFim);
			
		}
		
		$('#tfoottableLista' + nomeTabela).append($trSaldo);
		
	}
		
}
