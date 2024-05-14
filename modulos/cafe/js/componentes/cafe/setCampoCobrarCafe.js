/* =========================================================
 * setCampoCobrarCafe.js
 * http://lls.net.br/
 * ========================================================= */

function setCampoCobrarCafe(dados) {
	
	var textoCampoCobrar = "Descarga";
	
	if (dados.nomeTabela == "Sailote") textoCampoCobrar = "Carga";
	
	var campoCobrar = caixaVerificacaoHorizontal(
		'cobrar' + dados.nomeTabela,
		'Cobrar ' + textoCampoCobrar
	);
	
	$('#botao' + dados.nomeTabela + 'FormGroup').before(campoCobrar);
	
	$('#cobrar' + dados.nomeTabela).prop('checked', true);
	
}
