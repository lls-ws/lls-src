/* =========================================================
 * campoTelefone.js
 * http://lls.net.br/
 * ========================================================= */

function campoTelefone(id, required, icon, textoLabel) {
	
	var maxlength = 15;
	
	if (icon == null) icon = 'whatsapp';
	if (textoLabel == null) textoLabel = '';
	
	var campoTelefone = campoTexto(
		id,
		'text',
		textoLabel,
		'(__) _____-____',
		required,
		'-1',
		maxlength,
		icon
	);
	
	campoTelefone.find('#' + id).mask("(99) 9999-9999?9");
	
	campoTelefone.find('#' + id).on("blur", function() {
		var last = $(this).val().substr( $(this).val().indexOf("-") + 1 );

		if( last.length == 5 ) {
			var move = $(this).val().substr( $(this).val().indexOf("-") + 1, 1 );

			var lastfour = last.substr(1,4);

			var first = $(this).val().substr( 0, 9 );

			$(this).val( first + move + '-' + lastfour );
			
		}
	})
	
	return campoTelefone;
	
}
