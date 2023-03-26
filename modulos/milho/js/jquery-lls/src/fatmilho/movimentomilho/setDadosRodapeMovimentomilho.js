/* =========================================================
 * setDadosRodapeMovimentomilho.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosRodapeMovimentomilho(rodape) {
	
	var colspan = {
		inicio: 3,
		fim: 0
	};
	
	var $trRodape = tr('nomeRodapeMovimentomilho', '');
	
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
	
	$paragrafo1.append(formataNumero(rodape[0].anterior, 2, false, true, "", " kg"));
	$paragrafo2.append(formataNumero(rodape[0].entradas, 2, false, true, "", " kg"));
	$paragrafo3.append(formataNumero(rodape[0].saidas, 2, false, true, "", " kg"));
	$paragrafo4.append(formataNumero(rodape[0].saldo, 2, true, true, "", " kg"));
	
	$paragrafo5.append(formataNumero(rodape[0].armazenagem, 2, true, true, "R$ ", ""));
	$paragrafo6.append(formataNumero(rodape[0].limpeza, 2, false, true, "R$ ", ""));
	$paragrafo7.append(formataNumero(rodape[0].secagem, 2, false, true, "R$ ", ""));
	$paragrafo8.append(formataNumero(rodape[0].carga, 2, false, true, "R$ ", ""));
	$paragrafo9.append(formataNumero(rodape[0].recepcao, 2, false, true, "R$ ", ""));

	$paragrafo10.append(formataNumero(rodape[0].total, 2, true, true, "R$ ", ""));
	
	$th2.append($paragrafo1);
	$th3.append($paragrafo2);
	$th4.append($paragrafo3);
	$th5.append($paragrafo4);
	$th6.append($paragrafo5);
	$th7.append($paragrafo6);
	$th8.append($paragrafo7);
	$th9.append($paragrafo8);
	$th10.append($paragrafo9);
	$th11.append($paragrafo10);
	
	setDadosRodapeHide("Movimentomilho", colspan, $th1);
	
	$trRodape.append($th1);
	$trRodape.append($th2);
	$trRodape.append($th3);
	$trRodape.append($th4);
	$trRodape.append($th5);
	$trRodape.append($th6);
	$trRodape.append($th7);
	$trRodape.append($th8);
	$trRodape.append($th9);
	$trRodape.append($th10);
	$trRodape.append($th11);
	
	return $trRodape;
	
}
