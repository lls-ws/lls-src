/* =========================================================
 * menuOpcoesBalanca.js
 * http://lls.net.br/
 * ========================================================= */

function menuOpcoesBalanca(posicaoMenu, tipo) {
	
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
			dados.tipo = "Baixa";
			dados.tituloImprimi = "Guia de Recebimento";
			dados.nomeTabela = "Peso";
			dados.nomeTabelaCadastro = [];
			dados.nomeTabelaLancamento = ["Baixapeso", "Baixapeso"];
			dados.nomeBotaoLancamento = "Finalizar";
			break;
	}
	
	return dados;
	
}
