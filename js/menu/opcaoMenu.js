/* =========================================================
 * opcaoMenu.js
 * http://lls.net.br/
 * ========================================================= */

function opcaoMenu(nomeMenu, icone, localizacao, posicaoMenu, nomesItens) {
	
	nomeMenu = nomeMenu + " ";
	
	var opcaoMenu = itemMenu(nomeMenu, 'marcarMenu()', icone, localizacao, posicaoMenu);
	
	var bMenu = b('caret');
	
	var ulMenu = ul('dropdown-menu inverse-dropdown', 'menu');
	
	opcaoMenu.find( '#itemMenu' + posicaoMenu ).addClass('dropdown');
	opcaoMenu.find( '#itemMenu' + posicaoMenu ).append(ulMenu);
	
	opcaoMenu.find( '#linkMenu' + posicaoMenu ).append(bMenu);
	opcaoMenu.find( '#linkMenu' + posicaoMenu ).addClass('dropdown-toggle');
	opcaoMenu.find( '#linkMenu' + posicaoMenu ).attr('data-toggle', 'dropdown');
	opcaoMenu.find( '#linkMenu' + posicaoMenu ).attr('role', 'button');
	opcaoMenu.find( '#linkMenu' + posicaoMenu ).prop('aria-expanded', false);
	
	jQuery.each( nomesItens, function( index, nomeItem ) {
			
		var iconeMenu = 'glyphicon glyphicon-' + nomeItem.icone;
		
		var spanMenu = span(iconeMenu);
		
		var aMenu = a(nomeItem.url, 'javascript:void(0);')
			.append(spanMenu)
			.append(' ')
			.append(nomeItem.texto);
		
		var liMenu = li().append(aMenu);
		
		if (nomeItem.separator) {
			
			var headerMenu = li("", "dropdown-header");
			
			headerMenu.append(nomeItem.titulo);
			
			ulMenu.append(headerMenu);
			
		}
		
		ulMenu.append(liMenu);
		
	});
	
	return opcaoMenu;
	
}
