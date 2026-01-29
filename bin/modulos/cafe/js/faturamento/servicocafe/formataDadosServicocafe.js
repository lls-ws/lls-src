/* =========================================================
 * formataDadosServicocafe.js
 * http://lls.net.br/
 * ========================================================= */

function formataDadosServicocafe(dados) {
	
	dados.produtor = decodeURIComponent(dados.produtor);
	dados.fazenda = decodeURIComponent(dados.fazenda);
	dados.servico = decodeURIComponent(dados.servico);
	dados.observacao = decodeURIComponent(dados.observacao);
	
	dados["valorPago"] = dados.pago;
	dados["valorRestante"] = dados.valor;
	
	dados.data = formataData(dados.data);
	dados.total = formataNumero(dados.total, 2, true, true, "R$ ", "");
	dados.pago = formataNumero(dados.pago, 2, true, true, "R$ ", "");
	dados.valor = formataNumero(dados.valor, 2, true, true, "R$ ", "");
	
	var fechado = "Não";
	var automatico = "Não";
	
	dados["indexStatus"] = 0;
	
	if (dados.fechado) {
		fechado = "Sim";
		dados.indexStatus = 1;
	}
	
	if (dados.automatico) automatico = "Sim";
	
	dados.automatico = automatico;
	dados.fechado = fechado;

	dados["titulo"] = dados.servico;
	
	dados["alterar"] = 0;
	dados["lancamento"] = 0;
	dados["remover"] = 0;
	
}
