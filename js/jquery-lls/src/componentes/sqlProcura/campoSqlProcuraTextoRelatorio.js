/* =========================================================
 * campoSqlProcuraTextoRelatorio.js
 * http://lls.net.br/
 * ========================================================= */

function campoSqlProcuraTextoRelatorio(textoLabel, nomeTabela, nomeTabelaProcura, placeholder, tamanhoLabel) {
	
	var nomeTabelas = nomeTabela + nomeTabelaProcura;
	
	var id = 'nomeProcura' + nomeTabelas;
	
	var idIconClear = 'spanIconClear' + nomeTabelas;
	var idGroupClear = 'spanGroupClear' + nomeTabelas;
	
	var idIconPrint = 'spanIconPrint' + nomeTabelas;
	var idGroupPrint = 'spanGroupPrint' + nomeTabelas;
	
	var $input = input(id, "text", "form-control", placeholder, false, 50)
					.css("font-weight","Bold")
					.css("font-size","15px");
	
	var $spanGroupClear = span('input-group-addon')
		.attr('id', idGroupClear)
		.attr('title', "Todas as Fazendas");
	
	var $spanIconClear = span('glyphicon-star glyphicon').attr('id', idIconClear);
	
	$spanGroupClear.append($spanIconClear);
	
	var $spanGroupPrint = span('input-group-addon')
		.attr('id', idGroupPrint)
		.attr('title', "Imprimir")
		.hide();
	
	var $spanIconPrint = span('glyphicon-print glyphicon').attr('id', idIconPrint);
	
	$spanGroupPrint.append($spanIconPrint);
	
	var $campoSqlProcura = campoSqlProcura(
		"Nome",
		nomeTabela,
		nomeTabelaProcura,
		"col-xs-10 col-md-10",
		tamanhoLabel,
		$input,
		id,
		3
	)
	
	$spanGroupClear.click(function(){
		
		var $campoMensagem = $campoSqlProcura.find('#nome' + nomeTabelas + 'Mensagem');
		
		if ($campoSqlProcura.find('.limpa').is(":visible")) {
		
			$campoSqlProcura.find('.limpa').hide().trigger('change');
			
			$spanIconClear.removeClass('glyphicon-star').addClass('glyphicon-star-empty');
			
			$spanGroupClear.attr('title', "1 Fazenda");
			
		}
		else {
			
			if ($campoSqlProcura.find('#idnomeProcura' + nomeTabelas).val() > 0) {
			
				$campoSqlProcura.find('.limpa').show().trigger('change');
				
			}
			
			$spanIconClear.removeClass('glyphicon-star-empty').addClass('glyphicon-star');
			
			$spanGroupClear.attr('title', "Todas as Fazendas");
			
		}
		
    });
	
	$spanGroupPrint.click(function(){
		
		var dados = eval('pegaProcura' + nomeTabela + '("' + 0 + '", "' + nomeTabela + '")');
		
		var url = "relatorio" + nomeTabela;
		
		eval("eventoImprimir('" + url + "', dados)");
		
	});
	
	$campoSqlProcura.find('#' + idGroupClear).click(function(){
		
		$spanIconClear.removeClass('glyphicon-star-empty').addClass('glyphicon-star');
		
    });
	
	$campoSqlProcura.find('#' + nomeTabelas + 'DivGroup').append($spanGroupClear);
	$campoSqlProcura.find('#' + nomeTabelas + 'DivGroup').append($spanGroupPrint);
	
	return $campoSqlProcura;
	
}
