/* =========================================================
 * checkValoresCafeFormacao.js
 * http://lls.net.br/
 * ========================================================= */

function checkValoresCafeFormacao(dados, formulario) {
	
	var campo = {
		id: $("#idnomeProcuraCadastro" + dados.nomeTabela + "FazendaProdutor").val(),
		sacas: $('#sacas' + dados.nomeTabela).val()
	}
	
	if (campo.id == 0 || campo.sacas == 0) {
		formulario.find('#botaoNovo' + dados.nomeTabelaCadastro[0]).hide();
	}
	else formulario.find('#botaoNovo' + dados.nomeTabelaCadastro[0]).show();
	
}
