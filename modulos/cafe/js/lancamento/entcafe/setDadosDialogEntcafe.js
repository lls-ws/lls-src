/* =========================================================
 * setDadosDialogEntcafe.js
 * http://lls.net.br/
 * ========================================================= */

function setDadosDialogEntcafe(dados) {
	
	formataDadosEntcafe(dados.array);
	
	var textoProdutor = juntaTituloTexto('Produtor', dados.array.produtor);
	var textoFazenda = juntaTituloTexto('Fazenda', dados.array.fazenda);
	
	var textoData = juntaTituloTexto('Data', dados.array.data);
	var textoTiket = juntaTituloTexto('Ticket', dados.array.ticket);
	var textoPlaca = juntaTituloTexto('Placa', dados.array.placa);
	var textoUsuario = juntaTituloTexto('Usuário', dados.array.usuario);
	
	var textoNota = juntaTituloTexto('Número Nota', dados.array.nota);
	var textoValor = juntaTituloTexto('Valor Nota', dados.array.valor);
	var textoSacasNota = juntaTituloTexto('Sacas Nota', formataNumeroSacasCafe(dados.array.sacasNota));
	var textoPesoNota = juntaTituloTexto('Peso Nota', dados.array.pesoNota);
	
	var textoLote = juntaTituloTexto('Lote', dados.array.lote);
	var textoStatus = juntaTituloTexto('Status', dados.array.fechado);
	var textoCobrar = juntaTituloTexto('Cobrar Descarga', dados.array.textoCobrar);
	var textoSacas = juntaTituloTexto('Sacas Recebidas', formataNumeroSacasCafe(dados.array.sacas));
	var textoPeso = juntaTituloTexto('Peso Recebido', dados.array.peso);
	var textoDesdobras = juntaTituloTexto('Desdobras', dados.array.desdobras);
	
	var nomesColunas = {
		"coluna1": "Dados da Entrada",
		"coluna2": "Dados da Nota",
		"coluna3": "Dados do Lote"
	};
	
	var colunaDadosEntrada = {
		"coluna1": textoProdutor,
		"coluna2": textoFazenda,
		"coluna3": textoData,
		"coluna4": textoTiket,
		"coluna5": textoPlaca,
		"coluna6": textoUsuario
	};
	
	var colunaDadosNota = {
		"coluna1": textoNota,
		"coluna2": textoValor,
		"coluna3": textoSacasNota,
		"coluna4": textoPesoNota
	};
	
	var colunaDadosLote = {
		lote: textoLote,
		status: textoStatus,
		cobrar: textoCobrar
	};
	
	if (dados.array.indexStatus == 1) {
	
		colunaDadosLote["sacas"] = textoSacas;
		colunaDadosLote["peso"] = textoPeso;
		colunaDadosLote["desdobras"] = textoDesdobras;
		
	}
	
	var idLinha = 'tr' + dados.nomeTabela + 'Dialog_' + dados.array.id;
	
	var trDados = tr(idLinha, '');
	
	trDados.append(juntaColunas(colunaDadosEntrada, 'text-left', 'texto', 'tdDadosEntrada'))
		   .append(juntaColunas(colunaDadosNota, 'text-left', 'texto', 'tdDadosNota'))
		   .append(juntaColunas(colunaDadosLote, 'text-left', 'texto', 'tdDadosLote'));
	
	setDadosDialogImprimirCore(dados, nomesColunas, trDados);
	
	setBotoesExcluirDialogCafe(dados);
	
}
