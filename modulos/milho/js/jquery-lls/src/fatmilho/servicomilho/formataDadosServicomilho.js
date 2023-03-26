/* =========================================================
 * formataDadosServicomilho.js
 * http://lls.net.br/
 * ========================================================= */

function formataDadosServicomilho(servicomilho) {
	
	carregaCssJs("js/jquery-lls/jquery-lls-componente-campos.js", "js");
	
	servicomilho.produtor = decodeURIComponent(servicomilho.produtor);
	servicomilho.fazenda = decodeURIComponent(servicomilho.fazenda);
	servicomilho.obs = decodeURIComponent(servicomilho.obs);
	
	var valorPago = servicomilho.pago;
	var valorRestante = servicomilho.valor;
	
	servicomilho.data = formataData(servicomilho.data);
	servicomilho.liquido = formataNumero(servicomilho.liquido, 2, false, true, "", " kg");
	servicomilho.total = formataNumero(servicomilho.total, 2, true, true, "R$ ", "");
	servicomilho.pago = formataNumero(servicomilho.pago, 2, true, true, "R$ ", "");
	servicomilho.valor = formataNumero(servicomilho.valor, 2, true, true, "R$ ", "");
	
	var $fechado = "Não";
	
	if (servicomilho.fechado) {
		
		$fechado = "Sim";
		
	}
	
	servicomilho.fechado = $fechado;
	
	var $automatico = "Não";
	
	if (servicomilho.automatico) {
		
		$automatico = "Sim";
		
	}
	
	servicomilho.automatico = $automatico;

	servicomilho["nome"] = "Serviço: " + servicomilho.servico + " " + servicomilho.valor;
	
	servicomilho["nomeTabela2"] = "Baixamilho";
	
	servicomilho["valorPago"] = valorPago;
	servicomilho["valorRestante"] = valorRestante;

	servicomilho["alterar"] = 0;
	servicomilho["baixar"] = 0;
	servicomilho["remover"] = 0;

}
