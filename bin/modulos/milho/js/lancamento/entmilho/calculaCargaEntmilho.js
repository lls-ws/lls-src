/* =========================================================
 * calculaCargaEntmilho.js
 * http://lls.net.br/
 * ========================================================= */

function calculaCargaEntmilho(nomeTabela) {
	
	var valorBruto = formataNumeroSql($('#bruto' + nomeTabela).val());
	
	var textoUmidade = $('#numeroProcuraCadastro' + nomeTabela + 'UmidadeDivInput span').text();
	
	var textoUmidadeArray = textoUmidade.split('|');
	
	if ( textoUmidadeArray.length === 2 ) {
		
		var valorUmidade = textoUmidadeArray[1].replace(' R$ ', '');
		
		var valorSecagem = formataNumeroSql(valorUmidade);
		
		var totalSecagem = (valorBruto / 1000 ) * valorSecagem;
		
	} else {
	
		var totalSecagem = 0;
		
	}	
	
	$('#secagem' + nomeTabela).val(formataNumero(totalSecagem, 2, false, true, "R$ ", ""));
	
}
