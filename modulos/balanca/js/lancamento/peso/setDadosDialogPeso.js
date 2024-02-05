/* =========================================================
 * setDadosDialogPeso.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosDialogPeso(dados) {
	
	//carregaCssJs("js/jquery-lls/jquery-lls-componente-cafe.js", "js");
	//carregaCssJs("js/jquery-lls/jquery-lls-componente-formulario-cafe.js", "js");
	
	eval ("formataDados" + dados.nomeTabela + "(dados.array)");
	
	var textoProdutor = juntaTituloTexto('Produtor', dados.array.produtor);
	var textoFazenda = juntaTituloTexto('Fazenda', dados.array.fazenda);
	var textoProduto = juntaTituloTexto('Produto', dados.array.descricao);
	var textoData = juntaTituloTexto('Data', dados.array.data);
	var textoHora = juntaTituloTexto('Hora', dados.array.hora);
	var textoPlaca = juntaTituloTexto('Placa', dados.array.placa);
	var textoDestino = juntaTituloTexto('Destino', dados.array.destino);
	var textoMotorista = juntaTituloTexto('Motorista', dados.array.motorista);
	var textoUsuario = juntaTituloTexto('Usuário', dados.array.usuario);
	
	var textoDataFinalizado = juntaTituloTexto('Data Finalizado', dados.array.dataFinalizado);
	var textoHoraFinalizado = juntaTituloTexto('Hora Finalizado', dados.array.horaFinalizado);
	var textoTicket = juntaTituloTexto('Ticket', dados.array.ticket);
	var textoTipo = juntaTituloTexto('Tipo', dados.array.tipoPeso);
	var textoQtd = juntaTituloTexto('Quantidade', dados.array.qtd);
	var textoTara = juntaTituloTexto('Tara', dados.array.tara);
	var textoBruto = juntaTituloTexto('Bruto', dados.array.bruto);
	var textoLiquido = juntaTituloTexto('Líquido', dados.array.liquido);
	var textoFechado = juntaTituloTexto('Fechado', dados.array.fechado);
	var textoAutomatico = juntaTituloTexto('Automático', dados.array.automatico);
	
	var nomesColunas = {
		"coluna1": "Dados da Pesagem",
		"coluna2": "Valores da Pesagem"
	};
	
	var colunaDados = {
		"coluna1": textoProdutor,
		"coluna2": textoFazenda,
		"coluna3": textoProduto,
		"coluna4": textoData,
		"coluna5": textoHora,
		"coluna6": textoPlaca,
		"coluna7": textoDestino,
		"coluna8": textoMotorista,
		"coluna9": textoUsuario
	};
	
	var colunaValores = {
		"coluna1": textoDataFinalizado,
		"coluna2": textoHoraFinalizado,
		"coluna3": textoTicket,
		"coluna4": textoTipo,
		"coluna5": textoQtd,
		"coluna6": textoTara,
		"coluna7": textoBruto,
		"coluna8": textoLiquido,
		"coluna9": textoFechado,
		"coluna10": textoAutomatico
	};
	
	var idLinha = 'tr' + dados.nomeTabela + 'Dialog_' + dados.array.id;
	
	var trDados = tr(idLinha, '');
	
	trDados.append(juntaColunas(colunaDados, 'text-left', 'texto', 'tdDados'))
		   .append(juntaColunas(colunaValores, 'text-left', 'texto', 'tdValores'));
	
	if (dados.array.sacas > 0) {
		
		nomesColunas.coluna3 = "Dados do Café";
		
		var textoLote = juntaTituloTexto('Lote', dados.array.lote);
		var textoSacas = juntaTituloTexto('Sacas', formataNumeroSacasCafe(dados.array.sacas));
		var textoPeso = juntaTituloTexto('Peso', dados.array.pesoNota);
		var textoNota = juntaTituloTexto('Nota', dados.array.nota);
		var textoValor = juntaTituloTexto('Valor', dados.array.valor);
		
		var colunaCafe = {
			"coluna1": textoLote,
			"coluna2": textoSacas,
			"coluna3": textoPeso,
			"coluna4": textoNota,
			"coluna5": textoValor
		};
		
		trDados.append(juntaColunas(colunaCafe, 'text-left', 'texto', 'tdCafe'));
		
	}
	
	setDadosDialogLancamentoCore(dados, nomesColunas, trDados);
	
	if (dados.array.imprimir == 0) {
		
		var idBotaoPrint = 'botaoPrint' + dados.nomeTabela;
		
		var urlBotaoPrint = "";
		
		if ($('#botaoAlterar' + dados.nomeTabela).is(':visible')) {
			
			dados.array.titulo = dados.array.lote;
			urlBotaoPrint = 'imprimirGuiaCafe(' + JSON.stringify(dados) + ')';
			
		}
		else {
			
			dados.tituloImprimi = "Ticket de Peso";
			dados.titulo = dados.array.ticket;
			urlBotaoPrint = 'imprimirPeso(' + JSON.stringify(dados) + ')';
			
		}
		
		var botaoPrint = botaoHorizontal(
			idBotaoPrint,
			"Imprimir",
			'print', 4, 0,
			'btn  btn-primary',
			'button',
			urlBotaoPrint
		).addClass('col-xs-3');
		
		botaoPrint.find('#botaoPrint' + dados.nomeTabela)
			.attr('title', "Imprimir " + dados.tituloImprimi + ': ' + dados.array.titulo);
		
		if ($('#botaoAlterar' + dados.nomeTabela).is(':visible')) {
			
			if (dados.array.sacas > 0) {
				
				$('#botaoRemover' + dados.nomeTabela + 'FormGroup')
					.removeClass('col-xs-4').addClass('col-xs-3');
				$('#botaoAlterar' + dados.nomeTabela + 'FormGroup')
					.removeClass('col-xs-4').addClass('col-xs-3');
				$('#botaoLancamento' + dados.nomeTabela + 'FormGroup')
					.removeClass('col-xs-4').addClass('col-xs-3');
				
				$("#botaoAlterar" + dados.nomeTabela + "FormGroup")
					.after(botaoPrint);
				
			}
			
		}
		else {
			
			botaoPrint.removeClass('col-xs-3').addClass('col-xs-offset-5');
			
			$('#botaoRemover' + dados.nomeTabela + 'FormGroup').remove();
			$('#botaoAlterar' + dados.nomeTabela + 'FormGroup').remove();
			$('#botaoLancamento' + dados.nomeTabela + 'FormGroup').remove();
			
			$("#divBotoes" + dados.nomeTabela).append(botaoPrint);
			
		}
		
	}
	
}
