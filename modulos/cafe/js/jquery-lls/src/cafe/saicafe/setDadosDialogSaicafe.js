/* =========================================================
 * setDadosDialogSaicafe.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosDialogSaicafe(dados) {
	
	carregaCssJs("js/jquery-lls/jquery-lls-sailote.js", "js");
	carregaCssJs("js/jquery-lls/jquery-lls-componente-cafe.js", "js");
	
	eval ('formataDados' + dados.nomeTabela + '(dados.array)');
	
	var textoProdutor = juntaTituloTexto('Produtor', dados.array.produtor);
	var textoFazenda = juntaTituloTexto('Fazenda', dados.array.fazenda);
	var textoData = juntaTituloTexto('Data', dados.array.data);
	var textoDestino = juntaTituloTexto('Destino', dados.array.destino);
	var textoUsuario = juntaTituloTexto('Usuário', dados.array.usuario);
	
	var textoLote = juntaTituloTexto('Lote', dados.array.lote);
	var textoSacas = juntaTituloTexto('Sacas', formataNumeroSacasCafe(dados.array.sacas));
	var textoPeso = juntaTituloTexto('Peso', dados.array.peso);
	var textoStatus = juntaTituloTexto('Status', dados.array.statusCafe);
	var textoCobrar = juntaTituloTexto('Cobrar Carga', dados.array.textoCobrar);
	
	var nomesColunas = {
		"coluna1": "Dados da Saída",
		"coluna2": "Dados do Lote"
	};
	
	var colunaDadosSaida = {
		"coluna1": textoProdutor,
		"coluna2": textoFazenda,
		"coluna3": textoData,
		"coluna4": textoDestino,
		"coluna5": textoUsuario
	};
	
	var colunaDadosLote = {
		lote: textoLote,
		sacas: textoSacas,
		peso: textoPeso,
		status: textoStatus,
		cobrar: textoCobrar
	};
	
	var idLinha = 'tr' + dados.nomeTabela + 'Dialog_' + dados.array.id;
	
	var trDados = tr(idLinha, '');
	
	trDados.append(juntaColunas(colunaDadosSaida, 'text-left', 'texto', 'tdDadosSaida'))
		   .append(juntaColunas(colunaDadosLote, 'text-left', 'texto', 'tdDadosLote'));
		   
	if (dados.array.indexStatus == 2) {
		
		nomesColunas["coluna3"] = "Resultado da Saída";
		
		var textoTicket = juntaTituloTexto('Ticket', dados.array.ticket);
		var textoSacasSaida = juntaTituloTexto('Sacas Saída', formataNumeroSacasCafe(dados.array.sacasSaida));
		var textoPesoSaida = juntaTituloTexto('Peso Saída', dados.array.pesoSaida);
		
		var colunaResultadoSaida = {
			ticket: textoTicket,
			sacasSaida: textoSacasSaida,
			pesoSaida: textoPesoSaida,
		};
		
		trDados.append(juntaColunas(colunaResultadoSaida, 'text-left', 'texto', 'tdResultadoSaida'));
		
	}
	
	setDadosDialogImprimirCore(dados, nomesColunas, trDados);
	
	setBotoesExcluirDialogCafe(dados);

}
