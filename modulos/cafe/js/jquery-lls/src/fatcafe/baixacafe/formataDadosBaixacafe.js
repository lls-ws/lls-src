/* =========================================================
 * formataDadosBaixacafe.js
 * http://lls.net.br/
 * ========================================================= */

function formataDadosBaixacafe(dados) {
	
	carregaCssJs("js/jquery-lls/jquery-lls-componente-campos.js", "js");
	
	if (dados.array != null) {
		
		dados.array.produtor = decodeURIComponent(dados.array.produtor);
		dados.array.fazenda = decodeURIComponent(dados.array.fazenda);
		dados.array.servico = decodeURIComponent(dados.array.servico);
		
		dados.array.data = formataData(dados.array.data);
		dados.array.total = formataNumero(dados.array.total, 2, true, true, "R$ ", "");
		dados.array.pago = formataNumero(dados.array.pago, 2, true, true, "R$ ", "");
		dados.array.valor = formataNumero(dados.array.valor, 2, true, true, "R$ ", "");
		
	}
	else {
		
		dados.observacao = decodeURIComponent(dados.observacao);
		
		dados.data = formataData(dados.data);
		dados.valor = formataNumero(dados.valor, 2, true, true, "R$ ", "");
		
		dados["titulo"] = "Baixa de Serviço: " + dados.valor;
				
	}
	
}
