/* =========================================================
 * setDadosDialogServicocafe.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosDialogServicocafe(dados) {
	
	carregaCssJs("js/jquery-lls/jquery-lls-baixacafe.js", "js");
	carregaCssJs("js/jquery-lls/jquery-lls-componente-cafe.js", "js");
	carregaCssJs("js/jquery-lls/jquery-lls-componente-formulario-cafe.js", "js");
	carregaCssJs("js/jquery-lls/jquery-lls-componente-formulario-cafe-formacao.js", "js");
	
	eval ("formataDados" + dados.nomeTabela + "(dados.array)");
	
	dados.array.sacas = formataNumeroSacasCafe(dados.array.sacas);
	
	var textoProdutor = juntaTituloTexto('Produtor', dados.array.produtor);
	var textoFazenda = juntaTituloTexto('Fazenda', dados.array.fazenda);
	var textoServico = juntaTituloTexto('Serviço', dados.array.servico);
	var textoData = juntaTituloTexto('Data', dados.array.data);
	var textoAutomatico = juntaTituloTexto('Automático', dados.array.automatico);
	var textoFechado = juntaTituloTexto('Pago', dados.array.fechado);
	
	var textoLote = juntaTituloTexto('Lote', dados.array.lote);
	var textoSacas = juntaTituloTexto('Sacas', dados.array.sacas);
	var textoTotal = juntaTituloTexto('Total', dados.array.total);
	var textoPago = juntaTituloTexto('Pago', dados.array.pago);
	var textoValor = juntaTituloTexto('Valor', dados.array.valor);
	
	var nomesColunas = {
		"coluna1": "Dados do Serviço",
		"coluna2": "Valores"
	};
	
	var colunaDadosServico = {
		"coluna1": textoProdutor,
		"coluna2": textoFazenda,
		"coluna3": textoServico,
		"coluna4": textoData,
		"coluna5": textoAutomatico,
		"coluna6": textoFechado
	};
	
	var colunaValoresServico = {
		"coluna1": textoLote,
		"coluna2": textoSacas,
		"coluna3": textoTotal,
		"coluna4": textoPago,
		"coluna5": textoValor
	};
	
	var idLinha = 'tr' + dados.nomeTabela + 'Dialog_' + dados.array.id;
	
	var trDados = tr(idLinha, '');
	
	trDados.append(juntaColunas(colunaDadosServico, 'text-left', 'texto', 'tdDadosServico'))
		   .append(juntaColunas(colunaValoresServico, 'text-left', 'texto', 'tdValoresServico'));
	
	setDadosDialogLancamentoCore(dados, nomesColunas, trDados);
	
}
