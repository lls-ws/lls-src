/* =========================================================
 * pegaValoresBaixapeso.js
 * http://lls.net.br/
 * ========================================================= */

function pegaValoresBaixapeso(dados) {
	
	var tipoPeso = $("input[name='tipo" + dados.nomeTabela + "']:checked").val();
	
	var peso = {};
	
	if (tipoPeso == "TARA") {
		
		peso.tara = formataNumeroSql($("#peso2" + dados.nomeTabela).val());
		peso.bruto = formataNumeroSql($("#peso" + dados.nomeTabela).val());
		
	}
	else {
		
		peso.tara = formataNumeroSql($("#peso" + dados.nomeTabela).val());
		peso.bruto = formataNumeroSql($("#peso2" + dados.nomeTabela).val());
		
	}
	
	peso.liquido = peso.bruto - peso.tara;
	
	return peso;
	
}
