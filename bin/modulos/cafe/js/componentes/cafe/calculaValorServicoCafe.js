/* =========================================================
 * calculaValorServicoCafe.js
 * http://lls.net.br/
 * ========================================================= */

function calculaValorServicoCafe(dados) {
	
	var valores = {
		preco: 0,
		valor: 0,
		sacas: Number($('#sacas' + dados.nomeTabela).val()),
		idPreco: $('#idnomeProcuraCadastro' + dados.nomeTabela + 'Preco').val()
	}
	
	if (valores.idPreco > 0 && valores.sacas > 0) {
		
		var textoServicocafe = $('#nomeProcuraCadastro' + dados.nomeTabela + 'PrecoDivInput span').text();
		
		var textoServicocafeArray = textoServicocafe.split(' ');
		
		valores.preco = formataNumeroSql(textoServicocafeArray[1]);
		
	}
	
	valores.valor = valores.preco * valores.sacas;
	
	$('#valor' + dados.nomeTabela).val(formataNumero(valores.valor, 2, false, false, "R$ ", "")).valid();
	
	$('#idnomeProcuraCadastro' + dados.nomeTabela + 'Preco2').val(1);
	
}
