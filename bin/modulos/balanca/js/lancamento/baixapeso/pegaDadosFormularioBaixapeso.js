/* =========================================================
 * pegaDadosFormularioBaixapeso.js
 * http://lls.net.br/
 * ========================================================= */

function pegaDadosFormularioBaixapeso(dados) {
	
	var cadastro = eval ('pegaDadosFormulario' + dados.nomeTabelaCadastro + '(dados.nomeTabela)');
	
	var peso = eval ('pegaValores' + dados.nomeTabela + '(dados)');
	
	cadastro.cadastro.dataFinalizado = $("#dataFinalizado" + dados.nomeTabela).datepicker("getDate");
	cadastro.cadastro.tara = peso.tara;
	cadastro.cadastro.bruto = peso.bruto;
	cadastro.cadastro.liquido = peso.liquido;
	
	return cadastro;
	
}
