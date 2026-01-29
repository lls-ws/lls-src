/* =========================================================
 * campoSqlProcuraTextoRelatorioCore.js
 * http://lls.net.br/
 * ========================================================= */

function campoSqlProcuraTextoRelatorioCore(dados, textoLabel, nomeTabelaProcura, placeholder, tamanhoLabel) {
	
	var nomeTabelas = dados.nomeTabela + nomeTabelaProcura;
	
	var id = 'nomeProcura' + nomeTabelas;
	
	var idIconClear = 'spanIconClear' + nomeTabelas;
	var idGroupClear = 'spanGroupClear' + nomeTabelas;
	
	var idIconPrint = 'spanIconPrint' + nomeTabelas;
	var idGroupPrint = 'spanGroupPrint' + nomeTabelas;
	
	var inputSql = input(id, "text", "form-control", placeholder, false, 50)
		.css("font-weight","Bold")
		.css("font-size","15px");
	
	var spanGroupClear = span('input-group-addon')
		.attr('id', idGroupClear)
		.attr('title', "Todas as Fazendas");
	
	var spanIconClear = span('glyphicon-star glyphicon').attr('id', idIconClear);
	
	spanGroupClear.append(spanIconClear);
	
	var spanGroupPrint = span('input-group-addon')
		.attr('id', idGroupPrint)
		.attr('title', "Imprimir")
		.hide();
	
	var spanIconPrint = span('glyphicon-print glyphicon').attr('id', idIconPrint);
	
	spanGroupPrint.append(spanIconPrint);
	
	var campoSql = campoSqlProcura(
		"Nome",
		dados.nomeTabela,
		nomeTabelaProcura,
		"col-xs-10 col-md-10",
		tamanhoLabel,
		inputSql,
		id,
		3
	)
	
	spanGroupClear.click(function(){
		
		var campoMensagem = campoSql.find('#nome' + nomeTabelas + 'Mensagem');
		
		if (campoSql.find('.limpa').is(":visible")) {
		
			campoSql.find('.limpa').hide().trigger('change');
			
			spanIconClear.removeClass('glyphicon-star').addClass('glyphicon-star-empty');
			
			spanGroupClear.attr('title', "1 Fazenda");
			
		}
		else {
			
			if (campoSql.find('#idnomeProcura' + nomeTabelas).val() > 0) {
			
				campoSql.find('.limpa').show().trigger('change');
				
			}
			
			spanIconClear.removeClass('glyphicon-star-empty').addClass('glyphicon-star');
			
			spanGroupClear.attr('title', "Todas as Fazendas");
			
		}
		
    });
	
	spanGroupPrint.click(function(){
		
		dados.pagina = 0;
		
		var relatorio = eval('pegaProcura' + dados.nomeTabela + '(dados)');
		
		var url = "relatorio" + dados.nomeTabela;
		
		eval("eventoImprimir('" + url + "', relatorio)");
		
	});
	
	campoSql.find('#' + idGroupClear).click(function(){
		
		spanIconClear.removeClass('glyphicon-star-empty').addClass('glyphicon-star');
		
    });
	
	campoSql.find('#' + nomeTabelas + 'DivGroup').append(spanGroupClear);
	campoSql.find('#' + nomeTabelas + 'DivGroup').append(spanGroupPrint);
	
	return campoSql;
	
}
