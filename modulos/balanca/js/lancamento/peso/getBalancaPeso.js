/* =========================================================
 * getBalancaPeso.js
 * http://lls.net.br/
 * ========================================================= */

function getBalancaPeso() {
	
	var textoMensagem = "";
	
	if ("serial" in navigator) {
		
		textoMensagem = "The Web Serial API is supported.";
		
	}
	
	var titulo = $("<div/>")
		.addClass('titulo_tabela')
		.attr('id', 'textoPeso')
		.text(textoMensagem);
	
	var tituloTabela = $('<div/>')
		.addClass('input-group form-control formulario_cor')
		.append(titulo);
	
	var botao = botaoHorizontal(
		'button',
		'Selecionar Porta',
		'fa-check',
		2,
		4,
		'btn btn-block btn-success',
		'submit',
		''
	);
	
	var iconImage = $("<i/>").attr('id', 'image')
		.attr('aria-hidden', true)
		.addClass('fa fa-fw fa-lg fa-check');
	
	let port = null;
	
	var button = $("<button/>")
		.addClass('col-md-2')
		.addClass('btn btn-block btn-success')
		.attr('type', 'submit')
		.append("Selecionar Porta")
		.click(function() {
			
			if (port == null) {
				
				port = getPeso();
				
				$('#textoPeso').text("Porta Aberta!");
				
			}
			else {
				
				closePeso();
				
				$('#textoPeso').text("Porta Fechada!");
				
			}
			
		});
	
	var formulario = $("<div/>")
		.addClass("form-horizontal")
		.append(tituloTabela)
		.append(button);
		
	return formulario;
	
}
