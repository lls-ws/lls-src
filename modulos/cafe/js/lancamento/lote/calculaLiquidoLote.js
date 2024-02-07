/* =========================================================
 * calculaLiquidoLote.js
 * http://lls.net.br/
 * ========================================================= */

function calculaLiquidoLote(dados) {
	
	var valores = {
		media: 0,
		peso: 0.00,
		sacasTabela: 0,
		pesoTabela: 0.00,
		sacas: Number($('#sacas' + dados.nomeTabela).val()),
		sacasDesdobras: Number($('#sacas' + dados.nomeTabelaCadastro).val()),
		pesoDesdobras: formataNumeroSql($('#peso' + dados.nomeTabelaCadastro).val())
	}
	
	valores.media = valores.pesoDesdobras / valores.sacasDesdobras;
	
	var trLote = $('#nomeRodape' + dados.nomeTabela);
	
	if (trLote != null) {
		valores.sacasTabela = formataNumeroSacasSql(trLote.find('#totalSacas').find('p').text());
		valores.pesoTabela = formataNumeroSql(trLote.find('#totalPeso').find('p').text());
	}
	
	if (valores.sacas == (valores.sacasDesdobras - valores.sacasTabela)) {
		valores.peso = valores.pesoDesdobras - valores.pesoTabela;
	}
	else {
		
		valores.peso = valores.sacas * valores.media;
		
		arredondaPesoCafe(valores);
		
	}
	
	$('#peso' + dados.nomeTabela).val(formataNumero(valores.peso, 2, false, false, "", " kg"));

}
