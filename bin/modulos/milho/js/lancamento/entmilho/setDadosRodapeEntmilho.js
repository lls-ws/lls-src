/* =========================================================
 * setDadosRodapeEntmilho.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosRodapeEntmilho(rodape) {
	
	var colspan = {
		inicio: 5,
		fim: 16
	};
	
	var $trRodape = tr('nomeRodapeEntmilho', '');
	
	var $th1 = th();
	var $th2 = th();
	var $th3 = th();
	var $th4 = th();
	var $th5 = th();
	var $th6 = th();
	var $th7 = th();
	var $th8 = th();
	var $th9 = th();
	var $th10 = th();
	var $th11 = th();
	var $th12 = th();
	var $th13 = th();
	var $th14 = th();
	var $th15 = th();
	var $th16 = th();
	
	var $paragrafo1 = paragrafo('text-right texto', 'texto');
	var $paragrafo2 = paragrafo('text-right texto', 'texto');
	var $paragrafo3 = paragrafo('text-right texto', 'texto');
	var $paragrafo4 = paragrafo('text-right texto', 'texto');
	var $paragrafo5 = paragrafo('text-right texto', 'texto');
	var $paragrafo6 = paragrafo('text-right texto', 'texto');
	var $paragrafo7 = paragrafo('text-right texto', 'texto');
	var $paragrafo8 = paragrafo('text-right texto', 'texto');
	var $paragrafo9 = paragrafo('text-right texto', 'texto');
	var $paragrafo10 = paragrafo('text-right texto', 'texto');
	var $paragrafo11 = paragrafo('text-right texto', 'texto');
	
	$paragrafo1.append(formataNumero(rodape[0].bruto, 2, false, false, "", " kg"));
	$paragrafo2.append(formataNumero(rodape[0].impureza, 2, false, false, "", " kg"));
	$paragrafo3.append(formataNumero(rodape[0].umidade, 2, false, false, "", " kg"));
	$paragrafo4.append(formataNumero(rodape[0].quirela, 2, false, false, "", " kg"));
	$paragrafo5.append(formataNumero(rodape[0].chocho, 2, false, false, "", " kg"));
	$paragrafo6.append(formataNumero(rodape[0].liquido, 2, false, false, "", " kg"));
	$paragrafo7.append(formataNumero(rodape[0].recepcao, 2, false, false, "R$ ", ""));
	$paragrafo8.append(formataNumero(rodape[0].limpeza, 2, false, false, "R$ ", ""));
	$paragrafo9.append(formataNumero(rodape[0].secagem, 2, false, false, "R$ ", ""));
	$paragrafo10.append(formataNumero(rodape[0].carga, 2, false, false, "R$ ", ""));
	$paragrafo11.append(formataNumero(rodape[0].total, 2, false, false, "R$ ", ""));
	
	$th2.append($paragrafo1).attr('id', 'totalBruto');
	$th3.attr('colspan', 1);
	$th4.append($paragrafo2).attr('id', 'totalImpureza');
	$th5.attr('colspan', 2);
	$th6.append($paragrafo3).attr('id', 'totalUmidade');
	$th7.attr('colspan', 1);
	$th8.append($paragrafo4).attr('id', 'totalQuirela');
	$th9.attr('colspan', 1);
	$th10.append($paragrafo5).attr('id', 'totalChocho');
	$th11.append($paragrafo6).attr('id', 'totalLiquido');
	$th12.append($paragrafo7).attr('id', 'totalRecepcao');
	$th13.append($paragrafo8).attr('id', 'totalLimpeza');
	$th14.append($paragrafo9).attr('id', 'totalSecagem');
	$th15.append($paragrafo10).attr('id', 'totalCarga');
	$th16.append($paragrafo11).attr('id', 'totalTotal');
		
	$trRodape.append($th1);
	$trRodape.append($th2);
	
	var idFazenda = $('#idnomeProcuraEntmilhoFazendaProdutor').val();
	
	if (idFazenda > 0) {
	
		$trRodape.append($th3);
		$trRodape.append($th4);
		$trRodape.append($th5);
		$trRodape.append($th6);
		$trRodape.append($th7);
		$trRodape.append($th8);
		$trRodape.append($th9);
		$trRodape.append($th10);

	}
		
	$trRodape.append($th11);
	
	if (idFazenda > 0) {
	
		$trRodape.append($th12);
		$trRodape.append($th13);
		$trRodape.append($th14);
		$trRodape.append($th15);

	}
		
	$trRodape.append($th16);
	
	$("#tfoottableListaEntmilho").append($trRodape);
	
	setDadosRodapeSaldoMilho("Entmilho", rodape, colspan, $th1);
	
	return null;
	
}
