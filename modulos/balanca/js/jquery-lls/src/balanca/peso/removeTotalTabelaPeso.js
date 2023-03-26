/* =========================================================
 * removeTotalTabelaPeso.js
 * http://lls.net.br/
 * ========================================================= */

function removeTotalTabelaPeso(idLinha, nomeTabela) {
	
	var paragrafos = {
		qtd: $('#tfoottableLista' + nomeTabela).find('#totalRodape' + nomeTabela).find("#qtd").find('p'),
		tara: $('#tfoottableLista' + nomeTabela).find('#totalRodape' + nomeTabela).find("#tara").find('p'),
		bruto: $('#tfoottableLista' + nomeTabela).find('#totalRodape' + nomeTabela).find("#bruto").find('p'),
		liquido: $('#tfoottableLista' + nomeTabela).find('#totalRodape' + nomeTabela).find("#liquido").find('p')
	}
	
	var valores = {
		valorTara: $('#tbodyLista' + nomeTabela).find(idLinha).find("#tdTara").find('p').text(),
		valorBruto: $('#tbodyLista' + nomeTabela).find(idLinha).find("#tdBruto").find('p').text(),
		valorLiquido: $('#tbodyLista' + nomeTabela).find(idLinha).find("#tdLiquido").find('p').text(),
		qtd: paragrafos.qtd.text(),
		tara: paragrafos.tara.text(),
		bruto: paragrafos.bruto.text(),
		liquido: paragrafos.liquido.text()
	}
	
	var textoQtd = valores.qtd.split(':'); 
	
	valores.qtd = Number(textoQtd[1]) - 1;
	
	valores.valorTara = formataNumeroSql(valores.valorTara);
	valores.valorBruto = formataNumeroSql(valores.valorBruto);
	valores.valorLiquido = formataNumeroSql(valores.valorLiquido);
	
	valores.tara = formataNumeroSql(valores.tara);
	valores.bruto = formataNumeroSql(valores.bruto);
	valores.liquido = formataNumeroSql(valores.liquido);
	
	valores.tara = valores.tara - valores.valorTara;
	valores.bruto = valores.bruto - valores.valorBruto;
	valores.liquido = valores.liquido - valores.valorLiquido;
	
	if (valores.tara + valores.bruto + valores.liquido > 0) {
	
		paragrafos.qtd.empty();
		paragrafos.tara.empty();
		paragrafos.bruto.empty();
		paragrafos.liquido.empty();
		
		paragrafos.qtd.text(textoQtd[0] + ": " + valores.qtd);
		paragrafos.tara.text(formataNumero(valores.tara, 2, false, false, "", " kg"));
		paragrafos.bruto.text(formataNumero(valores.bruto, 2, false, false, "", " kg"));
		paragrafos.liquido.text(formataNumero(valores.liquido, 2, false, false, "", " kg"));
		
	}
	else {
		
		$('#tfoottableLista' + nomeTabela).empty();
		
		$('#paginaLista' + nomeTabela).hide();
		
		$('#nomeProcura' + nomeTabela).find('#spanGroupPrint' + nomeTabela + 'FazendaProdutor').hide();
		
	}
		
}
