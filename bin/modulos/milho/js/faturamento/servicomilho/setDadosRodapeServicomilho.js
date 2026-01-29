/* =========================================================
 * setDadosRodapeServicomilho.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosRodapeServicomilho(rodape) {
	
	var colspan = {
		inicio: 5,
		fim: 0
	};
	
	var $trRodape = tr('nomeRodapeServicomilho', '');
	
	var $th1 = th();
	var $th2 = th();
	var $th3 = th();
	var $th4 = th();
	
	var $paragrafo1 = paragrafo('text-right', 'texto');
	var $paragrafo2 = paragrafo('text-right', 'texto_cor_verde');
	var $paragrafo3 = paragrafo('text-right', 'texto_cor_vermelho');
	
	$paragrafo1.append(formataNumero(rodape[0].total, 2, false, true, "R$ ", ""));
	$paragrafo2.append(formataNumero(rodape[0].pago, 2, false, true, "R$ ", ""));
	$paragrafo3.append(formataNumero(rodape[0].valor, 2, false, true, "R$ ", ""));
	
	$th2.append($paragrafo1).attr('id', 'total');
	$th3.append($paragrafo2).attr('id', 'pago');
	$th4.append($paragrafo3).attr('id', 'valor');
	
	setDadosRodapeHide("Servicomilho", colspan, $th1);
	
	$trRodape.append($th1);
	$trRodape.append($th2);
	$trRodape.append($th3);
	$trRodape.append($th4);
	
	return $trRodape;
	
}
