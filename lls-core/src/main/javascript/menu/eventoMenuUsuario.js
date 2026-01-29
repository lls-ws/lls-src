/* =========================================================
 * eventoMenuUsuario.js
 * http://lls.net.br/
 * ========================================================= */

function eventoMenuUsuario(posicaoMenu) {
	
	$.ajax({
		type: "POST",
		url: "pegaUsuario",
		dataType: "json",
		success: function(resposta) {
			
			var $b = b('caret');
			
			var $span = span('glyphicon glyphicon-user');
			
			$('#linkMenu' + posicaoMenu).empty();
			
			$('#linkMenu' + posicaoMenu).append($span);
			
			$('#linkMenu' + posicaoMenu).append(' ');
			
			$('#linkMenu' + posicaoMenu).append(resposta.usuario + ' ');
			
			$('#linkMenu' + posicaoMenu).append($b);
			
			if (resposta.status == '201') {
			
				esconderMenu(posicaoMenu);
				
				alert('Sua senha expirou, clique OK para alterá-la!');
				
				novoCadastro("Usuario", "click-off", posicaoMenu);
				
			}
			else {
				
				mostrarMenu();
				
			}
			
		},
		error: function(jqXHR, exception) {
			
			mostraAjaxErro(
				exception + ': ' + jqXHR.status + ' - ' + jqXHR.responseText,
				jqXHR.status
			);
			
		}
	 
	})
    
}
