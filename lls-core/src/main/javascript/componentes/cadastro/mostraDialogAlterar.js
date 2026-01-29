/* =========================================================
 * mostraDialogAlterar.js
 * http://lls.net.br/
 * ========================================================= */

function mostraDialogAlterar(formulario, titulo, idDialog) {
	
	idDialog = 'divDialog' + idDialog;
	
	$('#' + idDialog.replace("Altera", "Visualiza")).empty();
	$('#' + idDialog.replace("Altera", "Visualiza")).remove();
	$('#' + idDialog.replace("Altera", "Visualiza")).dialog( "close" );
	
	var divDialog = $("<div/>")
		.attr('id', idDialog)
		.append(formulario)
		.dialog({
			title: titulo,
			autoOpen: false,
			position: 'center',
			width: "100%",
			height: "auto",
			modal: true,
			close: function (ev, ui) {
				$(this).dialog('destroy').remove();
			}
		}).dialog('open');
	
	$("body").scrollTop('0');

}
