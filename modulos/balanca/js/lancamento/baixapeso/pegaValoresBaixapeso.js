/* =========================================================
 * pegaValoresBaixapeso.js
 * http://lls.net.br/
 * ========================================================= */

function pegaValoresBaixapeso(dados) {
	
	var tipoPeso = $("input[name='tipo" + dados.nomeTabela + "']:checked").val();
	
	var peso = {};
	
	if (tipoPeso == "TARA") {
		
		peso.tara = formataNumeroSql($("#peso2" + dados.nomeTabela).val());
		peso.bruto = parseInt($('#textoPeso').text());
		
		$('#peso' + dados.nomeTabela)
			.val(formataNumero(peso.bruto, 2, false, false, "", " kg"));
		
	}
	else {
		
		peso.tara = parseInt($('#textoPeso').text());
		peso.bruto = formataNumeroSql($("#peso2" + dados.nomeTabela).val());
		
		$('#peso' + dados.nomeTabela)
			.val(formataNumero(peso.tara, 2, false, false, "", " kg"));
		
	}
	
	peso.liquido = peso.bruto - peso.tara;
	
	return peso;
	
}
