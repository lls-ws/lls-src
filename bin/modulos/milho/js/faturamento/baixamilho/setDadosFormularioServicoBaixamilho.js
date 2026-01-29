/* =========================================================
 * setDadosFormularioServicoBaixamilho.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosFormularioServicoBaixamilho(servicoBaixamilho) {
	
	servicoBaixamilho.baixa.produtor = decodeURIComponent(servicoBaixamilho.baixa.produtor);
	servicoBaixamilho.baixa.fazenda = decodeURIComponent(servicoBaixamilho.baixa.fazenda);
	servicoBaixamilho.baixa.servico = decodeURIComponent(servicoBaixamilho.baixa.servico);
	servicoBaixamilho.baixa.obs = decodeURIComponent(servicoBaixamilho.baixa.obs);
	
	servicoBaixamilho.baixa.data = formataData(servicoBaixamilho.baixa.data);
	servicoBaixamilho.baixa.liquido = formataNumero(servicoBaixamilho.baixa.liquido, 2, true, true, "", " kg");
	servicoBaixamilho.baixa.total = formataNumero(servicoBaixamilho.baixa.total, 2, true, true, "R$ ", "");
	servicoBaixamilho.baixa.pago = formataNumero(servicoBaixamilho.baixa.pago, 2, true, true, "R$ ", "");
	servicoBaixamilho.baixa.valor = formataNumero(servicoBaixamilho.baixa.valor, 2, true, true, "R$ ", "");
	
	servicoBaixamilho.formulario.find("#data" + servicoBaixamilho.nomeTabela).datepicker('setDate', formataData(servicoBaixamilho.baixa.data));
	servicoBaixamilho.formulario.find('#produtor' + servicoBaixamilho.nomeTabela).val(servicoBaixamilho.baixa.produtor);
	servicoBaixamilho.formulario.find('#fazenda' + servicoBaixamilho.nomeTabela).val(servicoBaixamilho.baixa.fazenda);
	servicoBaixamilho.formulario.find('#servico' + servicoBaixamilho.nomeTabela).val(servicoBaixamilho.baixa.servico);
	servicoBaixamilho.formulario.find('#liquido' + servicoBaixamilho.nomeTabela).val(servicoBaixamilho.baixa.liquido);
	servicoBaixamilho.formulario.find('#total' + servicoBaixamilho.nomeTabela).val(servicoBaixamilho.baixa.total);
	servicoBaixamilho.formulario.find('#pago' + servicoBaixamilho.nomeTabela).val(servicoBaixamilho.baixa.pago);
	servicoBaixamilho.formulario.find('#valor' + servicoBaixamilho.nomeTabela).val(servicoBaixamilho.baixa.valor);
	servicoBaixamilho.formulario.find('#observacao' + servicoBaixamilho.nomeTabela).val(servicoBaixamilho.baixa.obs);
	
}
