/* =========================================================
 * menuOpcoesCafe.js
 * http://lls.net.br/
 * ========================================================= */

function menuOpcoesCafe(posicaoMenu, tipo) {
	
	var dados = {
		id: 0,
		pagina: 1,
		tipoOperacao: 0,
		posicaoItem: tipo,
		posicaoItemMenu: posicaoMenu,
		click: "click",
		textoLabel: "find"
	}
	
	switch (tipo) {
		case 1: 
			
			dados.tipo = "GR";
			dados.tituloImprimi = "Guia de Recebimento";
			dados.nomeTabela = "Entcafe";
			dados.nomeTabelaCadastro = [];
			dados.nomeTabelaLancamento = ["Entlote", "Lote", "Servcafe"];
			dados.nomeBotaoLancamento = "Desdobrar";
			
			break;
		case 2: 
			
			dados.tipo = "OS";
			dados.tituloImprimi = "Ordem de Serviço";
			dados.nomeTabela = "Oscafe";
			dados.nomeTabelaCadastro = ["Despejo"];
			dados.nomeTabelaLancamento = ["Oslote", "Despejo", "Lote", "Servcafe"];
			dados.nomeBotaoLancamento = "Finalizar";
			
			break;
		case 3: 
			
			dados.tipo = "GE";
			dados.tituloImprimi = "Guia de Embarque";
			dados.nomeTabela = "Saicafe";
			dados.nomeTabelaCadastro = ["Despejo"];
			dados.nomeTabelaLancamento = ["Sailote", "Despejo", "Servcafe"];
			dados.nomeBotaoLancamento = "Finalizar";
			
			break;
		case 4: 
			
			dados.tipo = "GT";
			dados.tituloImprimi = "Guia de Transferência";
			dados.nomeTabela = "Tracafe";
			dados.nomeTabelaCadastro = ["Despejo"];
			dados.nomeTabelaLancamento = ["Tralote", "Despejo", "Lote"];
			dados.nomeBotaoLancamento = "Finalizar";
			
			break;
		case 5: 
			
			dados.tipo = "Baixa";
			dados.nomeTabela = "Servicocafe";
			dados.nomeTabelaCadastro = [];
			dados.nomeTabelaLancamento = ["Baixacafe", "Baixacafe"];
			dados.nomeBotaoLancamento = "Baixar";
			
			break;	
		case 6: 
			dados.nomeTabela = "Faturacafe";
			break;
		case 7: 
			dados.nomeTabela = "Extratocafe";
			break;
		case 8: 
			dados.nomeTabela = "Saldocafe";
			break;
		case 9: 
			dados.nomeTabela = "Sintetizacafe";
			break;
	}
	
	return dados;
	
}
