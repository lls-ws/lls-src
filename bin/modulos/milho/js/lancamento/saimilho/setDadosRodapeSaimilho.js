/* =========================================================
 * setDadosRodapeSaimilho.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosRodapeSaimilho(rodape) {
	
	var colspan = {
		inicio: 7,
		fim: 0
	};
	
	var $trRodape = tr('nomeRodapeSaimilho', '');
		
	var $th1 = th();
	var $th2 = th();
	
	var $paragrafo1 = paragrafo('text-right texto', 'texto');
	
	$paragrafo1.append(formataNumero(rodape[0].liquido, 2, false, false, "", " kg"));
	
	$th2.append($paragrafo1).attr('id', 'totalLiquido');
	
	$trRodape.append($th1);
	$trRodape.append($th2);
	
	$("#tfoottableListaSaimilho").append($trRodape);
	
	setDadosRodapeSaldoMilho("Saimilho", rodape, colspan, $th1);
		
	return null;
	
}
