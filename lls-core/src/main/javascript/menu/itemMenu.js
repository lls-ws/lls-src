/* =========================================================
 * itemMenu.js
 * http://lls.net.br/
 * ========================================================= */

function itemMenu(nome, url, icone, localizacao, numero) {
	
	var $listaId = 'itemMenu' + numero;
	var $linkId = 'linkMenu' + numero;
	var $icone = 'glyphicon glyphicon-' + icone;
	var $classeMenu = 'nav navbar-nav navbar-' + localizacao;
	
	var id = "";
	
	if ( localizacao == "right" ) {
		
		id = "menuUsuario";
		
	}
	
	var $itemMenu = ul($classeMenu).attr('id', id);
	
	var $li = li($listaId);
	
	var $a = a(url, 'javascript:void(0);', '', $linkId);
	
	var $span = span($icone);
	
	$a.append($span);
	$a.append(' ');
	$a.append(nome);
	
	$li.append($a);
	
	$itemMenu.append($li);
	
	return $itemMenu;
	
}
