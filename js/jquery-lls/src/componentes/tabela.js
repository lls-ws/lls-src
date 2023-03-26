/* =========================================================
 * tabela.js
 * http://lls.net.br/
 * ========================================================= */

function tabela(idTabela, nomesColunas) {
	
	carregaCssJs("js/jquery.bootpag.min.js", "js");
	
	var $tabela = table('table table-hover table-striped table-bordered table-curved table-condensed');
	
	$tabela.attr('id', idTabela);
	
	var $thead = thead('thead').attr('id', 'thead' + idTabela);
	
	var $trColunas = tr('nomeColunas' + idTabela, '');
	
	var tamanhoTitulo = 0;
	
	jQuery.each( nomesColunas, function( i, tituloColuna ) {
		
		tamanhoTitulo++;
		
		var $paragrafo = paragrafo('text-center texto_grande', 'texto_label');
	
		$paragrafo.append(tituloColuna);
		
		var $th = th().attr('id', 'th' + i).append($paragrafo);
		
		$trColunas.append($th);
		
	});
	
	$thead.append($trColunas);
	
	var $tfoot = $('<tfoot/>').attr('id', 'tfoot' + idTabela);
	
	$tabela.append($thead).append($tfoot);
	
	return $tabela;
	
}
