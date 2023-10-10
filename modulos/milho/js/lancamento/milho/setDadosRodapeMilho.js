/* =========================================================
 * setDadosRodapeMilho.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosRodapeMilho(rodape) {
	
	var colspan = {
		inicio: 3,
		fim: 0
	};
	
	var $trRodape = tr('nomeRodapeMilho', '');
	
	var $th1 = th();
	var $th2 = th();
	var $th3 = th();
	var $th4 = th();
	
	var $paragrafo1 = paragrafo('text-right texto', 'texto');
	var $paragrafo2 = paragrafo('text-right texto', 'texto');
	var $paragrafo3 = paragrafo('text-right texto', 'texto');
	
	$paragrafo1.append(formataNumero(rodape[0].entrada, 2, false, false, "", " kg"));
	$paragrafo2.append(formataNumero(rodape[0].saida, 2, false, false, "", " kg"));
	$paragrafo3.append(formataNumero(rodape[0].saldo, 2, false, false, "", " kg"));
	
	$th2.append($paragrafo1);
	$th3.append($paragrafo2);
	$th4.append($paragrafo3);
	
	setDadosRodapeHide("Milho", colspan, $th1);
	
	$trRodape.append($th1);
	$trRodape.append($th2);
	$trRodape.append($th3);
	$trRodape.append($th4);

	return $trRodape;
	
}
