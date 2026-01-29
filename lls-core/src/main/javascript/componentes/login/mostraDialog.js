/* =========================================================
 * mostraDialog.js
 * http://lls.net.br/
 * ========================================================= */

function mostraDialog(textoMensagem, corTexto, classe, titulo) {
	
	$('#divDialog').empty();
	$('#divDialog').remove();
	
	var $divDialog = divDialog(textoMensagem, corTexto);
	
	$divDialog.dialog({
		title: titulo,
		autoOpen: false,
		modal: true,
		position: { my: 'center', at: 'center', of: $("#painel"), within: $(classe) },
		buttons: {
			Ok: function() {
				$( this ).dialog( "close" );
			}
		},
		close: function (ev, ui) {
			$(this).dialog('destroy').remove();
        }
	});
	
	$divDialog.dialog("open");
	
	$("body").scrollTop('0');
	
}
