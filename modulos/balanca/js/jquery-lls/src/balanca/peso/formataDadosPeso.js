/* =========================================================
 * formataDadosPeso.js
 * http://lls.net.br/
 * ========================================================= */

function formataDadosPeso(dados) {
	
	carregaCssJs("js/jquery-lls/jquery-lls-componente-campos.js", "js");
	carregaCssJs("js/jquery-lls/jquery-lls-componente-placa.js", "js");
	
	dados.produtor = decodeURIComponent(dados.produtor);
	dados.fazenda = decodeURIComponent(dados.fazenda);
	dados.destino = decodeURIComponent(dados.destino);
	dados.motorista = decodeURIComponent(dados.motorista);
	dados.produto = decodeURIComponent(dados.produto);
	dados.descricao = decodeURIComponent(dados.descricao);
	dados.observacao = decodeURIComponent(dados.observacao);
	
	var fechado = "Não";
	var automatico = "Não";
	
	dados["indexStatus"] = 0;
	
	if (dados.fechado) {
		
		fechado = "Sim";
		
		dados.indexStatus = 1;
		
		dados["valorRestante"] = 0;
		
	}
	else {
		
		if (dados.bruto == 0) {
			dados["peso"] = dados.tara;
			dados["valorRestante"] = dados.tara;
		}
		else {
			dados["peso"] = dados.bruto;
			dados["valorRestante"] = dados.bruto;
		}
		
	}
	
	if (dados.automatico) automatico = "Sim";
	
	if (dados.tipoPeso == "Saida") dados.tipoPeso = "Saída";
	
	dados["valorPago"] = dados.liquido;
	
	dados.automatico = automatico;
	dados.fechado = fechado;
	
	dados.data = formataData(dados.data);
	dados.dataFinalizado = formataData(dados.dataFinalizado);
	dados.placa = pegaPlacaMascara(dados.placa);
	
	dados.peso = formataNumero(dados.peso, 2, false, true, "", " kg");
	dados.tara = formataNumero(dados.tara, 2, false, true, "", " kg");
	dados.bruto = formataNumero(dados.bruto, 2, false, true, "", " kg");
	dados.liquido = formataNumero(dados.liquido, 2, false, true, "", " kg");
	
	dados.pesoNota = formataNumero(dados.pesoNota, 2, false, true, "", " kg");
	dados.valor = formataNumero(dados.valor, 2, false, true, "R$ ", "");
	
	dados["titulo"] = "Ticket: " + dados.ticket;
	
	dados["alterar"] = 0;
	dados["lancamento"] = 0;
	dados["imprimir"] = 0;
	dados["remover"] = 0;
	
}
