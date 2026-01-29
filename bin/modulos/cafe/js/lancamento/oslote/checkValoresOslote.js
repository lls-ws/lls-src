/* =========================================================
 * checkValoresOslote.js
 * http://lls.net.br/
 * ========================================================= */

function checkValoresOslote(dados, formulario) {
	
	var cadastro = eval ('pegaDadosFormulario' + dados.nomeTabela + '(dados.nomeTabela)');
	
	var campo = cadastro.cadastro;
	
	var valores = {
		sacas: Number(campo.sacasDespejo) - Number(campo.sacasQuebra) + Number(campo.sacasAcrescimo),
		peso: campo.pesoDespejo - campo.pesoQuebra + campo.pesoAcrescimo
	}
	
	arredondaPesoCafe(valores);
	
	$('#sacas' + dados.nomeTabela).val(valores.sacas);
	$('#peso' + dados.nomeTabela).val(formataNumero(valores.peso, 2, false, false, "", " kg"));
	
	if (campo.desdobras == 0) {
		formulario.find('#botaoNovo' + dados.nomeTabelaLancamento[0]).hide();
	}
	else formulario.find('#botaoNovo' + dados.nomeTabelaLancamento[0]).show();
	
}
