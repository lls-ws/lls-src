/* =========================================================
 * botao.js
 * http://lls.net.br/
 * ========================================================= */

function botao(id, label, icone, tamanhoBotao, tipoBotao, type, onClick) {
	
	var iconImage = $("<i/>").attr('id', 'image' + id)
		.attr('aria-hidden', true)
		.addClass('fa fa-fw fa-lg fa-' + icone);
	
	tamanhoBotao = 'col-md-' + tamanhoBotao;
		
	var button = $("<button/>")
		.attr('id', id)
		.attr('name', id)
		.attr('type', type)
		.addClass(tipoBotao)
		.append(label)
		.append(' ')
		.append(iconImage)
		.addClass(tamanhoBotao)
		.click(function() {
				  
			eval(onClick);
			  
		});
	
	return button;
	
}
