/* =========================================================
 * setDadosRodapeSintetizamilho.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosRodapeSintetizamilho(rodape) {
	
	var colspan = {
		inicio: 2,
		fim: 0
	};
	
	var $trRodape = tr('nomeRodapeSintetizamilho', '');
	
	var $th1 = th();
	var $th2 = th();
	var $th3 = th();
	var $th4 = th();
	var $th5 = th();
	var $th6 = th();
	var $th7 = th();
	
	var $paragrafo1 = paragrafo('text-right texto', 'texto');
	var $paragrafo2 = paragrafo('text-right texto', 'texto');
	var $paragrafo3 = paragrafo('text-right texto', 'texto');
	var $paragrafo4 = paragrafo('text-right texto', 'texto');
	var $paragrafo5 = paragrafo('text-right texto', 'texto');
	var $paragrafo6 = paragrafo('text-right texto', 'texto');
	
	$paragrafo1.append(formataNumero(rodape[0].armazenagem, 2, true, true, "R$ ", ""));
	$paragrafo2.append(formataNumero(rodape[0].recepcao, 2, false, true, "R$ ", ""));
	$paragrafo3.append(formataNumero(rodape[0].limpeza, 2, false, true, "R$ ", ""));
	$paragrafo4.append(formataNumero(rodape[0].secagem, 2, false, true, "R$ ", ""));
	$paragrafo5.append(formataNumero(rodape[0].carga, 2, false, true, "R$ ", ""));

	$paragrafo6.append(formataNumero(rodape[0].total, 2, true, true, "R$ ", ""));
	
	$th2.append($paragrafo1);
	$th3.append($paragrafo2);
	$th4.append($paragrafo3);
	$th5.append($paragrafo4);
	$th6.append($paragrafo5);
	$th7.append($paragrafo6);
	
	setDadosRodapeHide("Sintetizamilho", colspan, $th1);
	
	var idFazenda = $('#idnomeProcuraSintetizamilhoFazendaProdutor').val();
	
	if (idFazenda == 0) {
	
		$trRodape.append($th1);
		
	}
	else {
	
		if ($('#spanIconClearSintetizamilhoFazendaProdutor').hasClass("glyphicon-star-empty")) {
		
			$trRodape.append($th1);
			
		}
	
	}
	
	$trRodape.append($th2);
	$trRodape.append($th3);
	$trRodape.append($th4);
	$trRodape.append($th5);
	$trRodape.append($th6);
	$trRodape.append($th7);
	
	return $trRodape;
	
}
