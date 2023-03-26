/* =========================================================
 * setDadosDialogOscafe.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosDialogOscafe(dados) {
	
	carregaCssJs("js/jquery-lls/jquery-lls-oslote.js", "js");
	carregaCssJs("js/jquery-lls/jquery-lls-componente-cafe.js", "js");
	
	eval ('formataDados' + dados.nomeTabela + '(dados.array)');
	
	var textoProdutor = juntaTituloTexto('Produtor', dados.array.produtor);
	var textoFazenda = juntaTituloTexto('Fazenda', dados.array.fazenda);
	var textoData = juntaTituloTexto('Data', dados.array.data);
	var textoUsuario = juntaTituloTexto('Usuário', dados.array.usuario);
	
	var textoLote = juntaTituloTexto('Lote', dados.array.lote);
	var textoSacas = juntaTituloTexto('Sacas', formataNumeroSacasCafe(dados.array.sacas));
	var textoPeso = juntaTituloTexto('Peso', dados.array.peso);
	var textoStatus = juntaTituloTexto('Status', dados.array.statusCafe);
	
	var nomesColunas = {
		"coluna1": "Dados do Serviço",
		"coluna2": "Dados do Lote"
	};
	
	var colunaDadosServico = {
		"coluna1": textoProdutor,
		"coluna2": textoFazenda,
		"coluna3": textoData,
		"coluna4": textoUsuario
	};
	
	var colunaDadosLote = {
		lote: textoLote,
		sacas: textoSacas,
		peso: textoPeso,
		status: textoStatus
	};
	
	var idLinha = 'tr' + dados.nomeTabela + 'Dialog_' + dados.array.id;
	
	var trDados = tr(idLinha, '');
	
	trDados.append(juntaColunas(colunaDadosServico, 'text-left', 'texto', 'tdDadosServico'))
		   .append(juntaColunas(colunaDadosLote, 'text-left', 'texto', 'tdDadosLote'));
	
	if (dados.array.indexStatus == 2) {
		
		nomesColunas["coluna3"] = "Resultado do Serviço";
		
		var textoDesdobras = juntaTituloTexto('Desdobras', dados.array.desdobras);
		var textoSacasQuebra = juntaTituloTexto('Sacas Quebra', formataNumeroSacasCafe(dados.array.sacasQuebra));
		var textoPesoQuebra = juntaTituloTexto('Peso Quebra', dados.array.pesoQuebra);
		var textoSacasAcrescimo = juntaTituloTexto('Sacas Acrescimo', formataNumeroSacasCafe(dados.array.sacasAcrescimo));
		var textoPesoAcrescimo = juntaTituloTexto('Peso Acrescimo', dados.array.pesoAcrescimo);
		var textoSacasResultado = juntaTituloTexto('Sacas Resultado', formataNumeroSacasCafe(dados.array.sacasResultado));
		var textoPesoResultado = juntaTituloTexto('Peso Resultado', dados.array.pesoResultado);
		
		var colunaResultadoServico = {
			desdobras: textoDesdobras,
			sacasQuebra: textoSacasQuebra,
			pesoQuebra: textoPesoQuebra,
			sacasAcrescimo: textoSacasAcrescimo,
			pesoAcrescimo: textoPesoAcrescimo,
			sacasResultado: textoSacasResultado,
			pesoResultado: textoPesoResultado
		};
		
		trDados.append(juntaColunas(colunaResultadoServico, 'text-left', 'texto', 'tdResultadoServico'));
		
	}
	
	setDadosDialogImprimirCore(dados, nomesColunas, trDados);
	
	if (dados.array.instrucoes != '' && dados.array.instrucoes != null) {
		
		tbodyCadastro = $('#tbodyDialog' + dados.nomeTabela);
		
		trObservacao = tbodyCadastro.find('#trObservacao' + dados.nomeTabela);
		
		if (dados.array.observacao != '' && dados.array.observacao != null) {
			
			trObservacao.remove();
			
			var trInstrucoes = tr('', '')
				.append(tabelaCelula(dados.array.observacao, 'text-left', 'texto', 'tdObservacao'))
				.append(tabelaCelula(dados.array.instrucoes, 'text-left', 'texto', 'tdInstrucoes')
					.attr('colspan', 2));
			
			tbodyCadastro.append(trInstrucoes);
			
		}
		else {
			
			var trInstrucoes = tr('', '')
				.append(tabelaCelula(dados.array.instrucoes, 'text-left', 'texto', 'tdInstrucoes')
					.attr('colspan', 3));
			
			tbodyCadastro.append(trInstrucoes);
			
		}
		
	}
	
	setBotoesExcluirDialogCafe(dados);
	
}
