/* =========================================================
 * formataDadosEntcafe.js
 * http://lls.net.br/
 * ========================================================= */

function formataDadosEntcafe(entcafe) {
	
	entcafe.data = formataData(entcafe.data);
	entcafe.placa = pegaPlacaMascara(entcafe.placa);
	entcafe.valor = formataNumero(entcafe.valor, 2, false, false, "R$ ", "");
	entcafe.peso = formataNumero(entcafe.peso, 2, false, false, "", " kg");
	entcafe.pesoNota = formataNumero(entcafe.pesoNota, 2, false, false, "", " kg");
	entcafe.produtor = decodeURIComponent(entcafe.produtor);
	entcafe.fazenda = decodeURIComponent(entcafe.fazenda);
	entcafe.observacao = decodeURIComponent(entcafe.observacao);
	entcafe.usuario = decodeURIComponent(entcafe.usuario);

	var status = "Aberta";
	
	entcafe["textoCobrar"] = "Não";
	
	entcafe["indexStatus"] = 0;
	
	if (entcafe.fechado) {
		
		status = "Fechada";
		
		entcafe.indexStatus = 1;
	
	}
	
	if (entcafe.cobrar) entcafe["textoCobrar"] = "Sim";
	
	entcafe.fechado = status;
	
	entcafe["titulo"] = entcafe.lote;
	
	entcafe["alterar"] = 0;
	entcafe["lancamento"] = 0;
	entcafe["imprimir"] = 0;
	entcafe["remover"] = 0;
	
}
