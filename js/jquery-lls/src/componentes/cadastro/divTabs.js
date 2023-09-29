/* =========================================================
 * divTabs.js
 * http://lls.net.br/
 * ========================================================= */

function divTabs(id, nomesTabs) {
	
	var $idTabs = 'tab' + id;
	
	var $divTabs = $("<div/>").attr({id: $idTabs});
	
	var $ul = ul(
		'nav nav-tabs nav-condensed',
		'tablist'
	).attr('id', 'tabs');
	
	$ul.tabCollapse({
		tabsClass: 'hidden-sm',
		accordionClass: 'visible-sm'
	});
	
	var $divTabContent = $("<div/>").addClass('tab-content');
	
	$divTabs.append($ul);
	
	$divTabs.append($divTabContent);
	
	jQuery.each( nomesTabs, function( idTab, tituloTab ) {
			
		var $idLinha = 'linha_' + idTab;
		
		var $li = li($idLinha, '');
		
		var $hrefTab = '#' + idTab;
		
		var $a = a('', $hrefTab, 'texto_grande texto_cor_cinza', '', 'tab', '', '');
		
		$a.text(tituloTab);
		
		$li.append($a);
		
		$ul.append($li);
		
		var $divTab = $("<div/>").attr({id: idTab});
		
		$divTab.addClass('tab-pane fade');
		
		$divTabContent.append($divTab);
		
	});
	
	return $divTabs;
}
