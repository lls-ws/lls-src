/* =========================================================
 * setDadosTabelaCadastroCore.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosTabelaCadastroCore(dados) {
	
	var arrayDados = dados.array;
	
	delete dados["array"];
	
	dados.id = arrayDados.id;
	
	eval ("formataDados" + dados.nomeTabela + "(arrayDados)");
	
	var idLinha = dados.nomeTabela.toLowerCase() + "_" + arrayDados.id;
	
	var urlBotao = 'eventoAcharCadastroCore(' + JSON.stringify(dados) + ')';
	
	var titulo = eval('pegaNomeColunas' + dados.nomeTabela + '(3)');
	
	var botaoVisualizar = botao(
		"botaoVisualizar", "", "eye-open", "0", "btn btn-primary btn-xs", "button", urlBotao
	).attr('title', "Mostrar " + titulo + ': ' + arrayDados.titulo);
	
	var trTabela = tr(idLinha, "");
	
	$("#lista" + dados.nomeTabela + "Form #tableLista" + dados.nomeTabela +
		" #tbodyLista" + dados.nomeTabela + "").append(trTabela);
	
	arrayDados["nomeTabela"] = dados.nomeTabela;
	
	eval ("setDadosTabela" + dados.nomeTabela + "(arrayDados, trTabela, botaoVisualizar)");
	
}
