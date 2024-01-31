/* =========================================================
 * setDadosTabelaServicomilho.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosTabelaServicomilho(servicomilho) {
	
	var pago = servicomilho.pago;
	var valor = servicomilho.valor;
	
	formataDadosServicomilho(servicomilho);
	
	var $idLinha = "servicomilho_" + servicomilho.id;
	
	var $urlBotaoVisualizar = 'mostraCadastro("' + servicomilho.id + '" , "Servicomilho")';
	
	var $botaoVisualizar = botao(
		"botaoVisualizar"+ servicomilho.id, "", "eye", "0", "btn btn-primary btn-xs", "button", $urlBotaoVisualizar
	);
	
	var $tbody = $("#listaServicomilhoForm #tableListaServicomilho #tbodyListaServicomilho");
	
	if (servicomilho.tipoOperacao == 0) {
		
		var $tr = tr($idLinha, "");
		
		$tr.append(tabelaCelula($botaoVisualizar, "text-center", "texto", "tdBotaoVisualizar"));
		
		setDadosColunaHide("Servicomilho", servicomilho, $tr);
		
		$tr.append(tabelaCelula(servicomilho.data, "text-center", "texto", "tdData"));
		$tr.append(tabelaCelula(servicomilho.servico, "text-left", "texto", "tdServico"));
		$tr.append(tabelaCelula(servicomilho.total, "text-right", "texto", "tdTotal"));
		
		if (pago > 0) { 
		
			$tr.append(tabelaCelula(servicomilho.pago, "text-right", "texto_cor_verde", "tdPago"));
			
		}
		else {
			
			$tr.append(tabelaCelula(servicomilho.pago, "text-right", "texto", "tdPago"));
		
		}
		
		if (valor > 0) { 
		
			$tr.append(tabelaCelula(servicomilho.valor, "text-right", "texto_cor_vermelho", "tdValor"));
			
		}
		else {
			
			$tr.append(tabelaCelula(servicomilho.valor, "text-right", "texto", "tdValor"));
		
		}
		
		$tbody.append($tr);
		
	}
	
}
