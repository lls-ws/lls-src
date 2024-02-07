/* =========================================================
 * pegaDadosFormularioPeso.js
 * http://lls.net.br/
 * ========================================================= */

function pegaDadosFormularioPeso(nomeTabela) {
	
	var tipo = $("input[name='tipo" + nomeTabela + "']:checked").val();
	
	var pesoBalanca = {
		value: $('#texto' + nomeTabela).text(),
		check: $('#texto' + nomeTabela).hasClass("texto_cor_verde")
	}
	
	pesoBalanca.value = 10000;
	
	var peso = {};
	
	if (tipo == "TARA") {
		
		//peso.tara = formataNumeroSql(pesoBalanca.value);
		peso.tara = pesoBalanca.value;
		peso.bruto = 0.00;
		peso.liquido = 0.00;
		peso.tipo = "SAIDA";
		
	}
	else {
		
		peso.tara = 0.00;
		//peso.bruto = formataNumeroSql(pesoBalanca.value);
		peso.bruto = pesoBalanca.value;
		peso.liquido = 0.00;
		peso.tipo = "ENTRADA";
		
	}
	
	peso.fazendaProdutorId = $("#idnomeProcuraCadastro" + nomeTabela + "FazendaProdutor").val();
	peso.tipoProduto = pegaValorCaixaCombinacao($('#produto' + nomeTabela).val());
	
	var cadastro = {
		id: $("#id" + nomeTabela).val(),
		fazendaProdutor_id: peso.fazendaProdutorId,
		automatico: 1,
		tara: peso.tara,
		bruto: peso.bruto,
		liquido: peso.liquido,
		tipoPeso: peso.tipo,
		data: $("#data" + nomeTabela).datepicker("getDate"),
		ticket: $("#ticket" + nomeTabela).val(),
		placa: pegaPlacaTexto($("#placa" + nomeTabela).val().toUpperCase()),
		tipoProduto: peso.tipoProduto,
		produto: encodeURIComponent( unescape($("#descricao" + nomeTabela).val())),
		produtor: encodeURIComponent( unescape($("#nomeProcuraCadastro" + nomeTabela + "FazendaProdutor").val())),
		destino: encodeURIComponent( unescape($("#destino" + nomeTabela).val())),
		motorista: encodeURIComponent( unescape($("#motorista" + nomeTabela).val())),
		observacao: encodeURIComponent( unescape($("#observacao" + nomeTabela).val()))
	}
	
	if (peso.tipoProduto == "CAFE" &&
		peso.fazendaProdutorId > 0 &&
		peso.tipo == "ENTRADA") {
		
		var pesocafe = {
			sacas: $("#sacas" + nomeTabela).val(),
			nota: $("#nota" + nomeTabela).val(),
			valor: formataNumeroSql($("#valor" + nomeTabela).val())
		}

		cadastro.qtd = 0;

		return {
			cadastro: cadastro,
			pesocafe: pesocafe
		};
		
	}
	else {
	
		if (peso.tipo == "SAIDA") cadastro.qtd = $("#sacas" + nomeTabela).val();
		else cadastro.qtd = 0;
		
		return {
			cadastro: cadastro
		};
		
	}
	
}
