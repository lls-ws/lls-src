/* =========================================================
 * paginacaoCore.js
 * http://lls.net.br/
 * ========================================================= */

function paginacaoCore(dados, qtdPaginas) {
	
	var idPaginacao = 'paginaLista' + dados.nomeTabela;
	
	if (dados.pagina > 0) {
		
		var paginacao = $('#' + idPaginacao).unbind('page');
		
		if (qtdPaginas > 0) {
			
			paginacao.bootpag({
				total: Number(qtdPaginas),
				page: dados.pagina,
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
				
				dados.pagina = num;
				
				eventoListaCadastroCore(dados);
				
			}).show();
			
		}
		else paginacao.hide();
		
	}
	else {
		
		var paginacao = $('<div />')
			.attr('id', idPaginacao)
			.addClass('text-center texto')
			.unbind('page');
		
		return paginacao;
		
	}
	
}
