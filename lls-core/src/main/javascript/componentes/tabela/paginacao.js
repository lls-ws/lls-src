/* =========================================================
 * paginacao.js
 * http://lls.net.br/
 * ========================================================= */

function paginacao(idPaginacao, url, qtdPaginas, pagina, nomeTabela) {
	
	if (pagina > 0) {
		
		var $paginacao = $('#' + idPaginacao);
		
		$paginacao.unbind('page');
		
		if (qtdPaginas > 0) {
			
			$paginacao.bootpag({
				total: Number(qtdPaginas),
				page: pagina,
				maxVisible: 5,
				leaps: true,
				firstLastUse: true,
				first: '←',
				last: '→',
				wrapClass: 'pagination',
				activeClass: 'active',
				disabledClass: 'disabled',
				nextClass: 'next',
				prevClass: 'prev',
				lastClass: 'last',
				firstClass: 'first'
			}).on("page", function(event, num){
				
				eval(url + '("' + num + '", "' + nomeTabela + '")');
				
			});
			
			$paginacao.show();
			
		}
		else {
			
			$paginacao.hide();
			
		}
		
	}
	else {
		
		var $paginacao = $('<div />').attr('id', idPaginacao).addClass('text-center texto');
		
		$paginacao.unbind('page');
		
		return $paginacao;
		
	}
	
}
