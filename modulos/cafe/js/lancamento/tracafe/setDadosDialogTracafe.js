/* =========================================================
 * setDadosDialogTracafe.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosDialogTracafe(dados) {
	
	eval ('formataDados' + dados.nomeTabela + '(dados.array)');
	
	var textoData = juntaTituloTexto('Data', dados.array.data);
	var textoProdutor = juntaTituloTexto('Produtor Origem', dados.array.produtor);
	var textoFazenda = juntaTituloTexto('Fazenda Origem', dados.array.fazenda);
	var textoProdutorDestino = juntaTituloTexto('Produtor Destino', dados.array.produtorDestino);
	var textoFazendaDestino = juntaTituloTexto('Fazenda Destino', dados.array.fazendaDestino);
	var textoUsuario = juntaTituloTexto('Usuário', dados.array.usuario);
	
	var textoLote = juntaTituloTexto('Lote', dados.array.lote);
	var textoSacas = juntaTituloTexto('Sacas', formataNumeroSacasCafe(dados.array.sacas));
	var textoPeso = juntaTituloTexto('Peso', dados.array.peso);
	var textoStatus = juntaTituloTexto('Status', dados.array.statusCafe);
	
	var textoDesdobras = juntaTituloTexto('Desdobras', dados.array.desdobras);
	var textoSacasResultado = juntaTituloTexto('Sacas Resultado', formataNumeroSacasCafe(dados.array.sacasResultado));
	var textoPesoResultado = juntaTituloTexto('Peso Resultado', dados.array.pesoResultado);
	
	var nomesColunas = {
		"coluna1": "Dados da Transferência",
		"coluna2": "Dados do Lote"
	};
	
	var colunaDadosTransferencia = {
		data: textoData,
		textoProdutor: textoProdutor,
		textoFazenda: textoFazenda,
		textoProdutorDestino: textoProdutorDestino,
		textoFazendaDestino: textoFazendaDestino,
		textoUsuario: textoUsuario
	};
	
	var colunaDadosLote = {
		lote: textoLote,
		sacas: textoSacas,
		peso: textoPeso,
		status: textoStatus
	};
	
	var idLinha = 'tr' + dados.nomeTabela + 'Dialog_' + dados.array.id;
	
	var trDados = tr(idLinha, '');
	
	trDados.append(juntaColunas(colunaDadosTransferencia, 'text-left', 'texto', 'tdDadosTransferencia'))
		   .append(juntaColunas(colunaDadosLote, 'text-left', 'texto', 'tdDadosLote'));
	
	if (dados.array.indexStatus == 2) {
		
		nomesColunas["coluna3"] = "Resultado da Transferência"
		
		var textoTicket = juntaTituloTexto('Ticket', dados.array.ticket);
		var textoSacasSaida = juntaTituloTexto('Sacas Saída', formataNumeroSacasCafe(dados.array.sacasSaida));
		var textoPesoSaida = juntaTituloTexto('Peso Saída', dados.array.pesoSaida);
		
		var colunaResultadoTransferencia = {
			desdobras: textoDesdobras,
			sacasResultado: textoSacasResultado,
			pesoResultado: textoPesoResultado
		};
		
		trDados.append(juntaColunas(colunaResultadoTransferencia, 'text-left', 'texto', 'tdResultadoTransferencia'));
		
	}
	
	setDadosDialogImprimirCore(dados, nomesColunas, trDados);
	
	setBotoesExcluirDialogCafe(dados);
	
}
