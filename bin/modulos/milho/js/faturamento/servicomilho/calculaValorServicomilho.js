/* =========================================================
 * calculaValorServicomilho.js
 * http://lls.net.br/
 * ========================================================= */

function calculaValorServicomilho(nomeTabela) {
	
	var valorLiquido = formataNumeroSql($('#liquido' + nomeTabela).val());
	
	var idServicomilho = $('#idnomeProcuraCadastro' + nomeTabela + 'Preco').val();
	
	if (idServicomilho > 0 && valorLiquido > 0) {
		
		var textoServicomilho = $('#nomeProcuraCadastro' + nomeTabela + 'PrecoDivInput span').text();
		
		var textoServicomilhoArray = textoServicomilho.split(' ');
		
		var precoServicomilho = textoServicomilhoArray[1];
		
		precoServicomilho = formataNumeroSql(precoServicomilho);
		
	}
	else {
		
		var precoServicomilho = 0;
		
	}
	
	var valorServicomilho = precoServicomilho * (valorLiquido / 1000);
	
	$('#valor' + nomeTabela).val(formataNumero(valorServicomilho, 2, false, false, "R$ ", ""));
	
}
