/* =========================================================
 * getBalancaPeso.js
 * http://lls.net.br/
 * ========================================================= */

function getBalancaPeso() {
	
	var textoPeso = $("<div/>")
		.addClass('texto_enorme')
		.attr('id', 'textoPeso');
	
	checkStatusBalanca(textoPeso);
	
	var textoCampo = $('<div/>')
		.addClass('input-group form-control formulario_cor')
		.append(textoPeso);
	
	var iconConectar = $("<i/>").attr('id', 'iconConectar')
		.attr('aria-hidden', true)
		.addClass('fa fa-fw fa-lg fa-plug');
		
	var iconDesconectar = $("<i/>").attr('id', 'iconDesconectar')
		.attr('aria-hidden', true)
		.addClass('fa fa-fw fa-lg fa-unlink');
		
	var iconLeitura = $("<i/>").attr('id', 'iconLeitura')
		.attr('aria-hidden', true)
		.addClass('fa fa-fw fa-lg fa-balance-scale');
	
	var botaoConectar = $("<button/>")
		.addClass('col-sm-4')
		.addClass('btn btn-success')
		.attr('type', 'submit')
		.append("Conectar ")
		.append(iconConectar)
		.click(async function() {
			
			try {
			
				const port = await navigator.serial.requestPort();
				
				checkStatusBalanca(textoPeso);
				
			} catch (error) {}
			
		});
	
	var botaoDesconectar = $("<button/>")
		.addClass('col-sm-4')
		.addClass('btn btn-danger')
		.attr('type', 'submit')
		.append("Desconectar ")
		.append(iconDesconectar)
		.click(async function() {
			
			try {
			
				const ports = await navigator.serial.getPorts();
	
				const port = ports[0];
				
				await port.forget();
				
				checkStatusBalanca(textoPeso);
				
			} catch (error) {}
			
		});
	
	var botaoIniciarLeitura = $("<button/>")
		.addClass('col-sm-4')
		.addClass('btn btn-primary')
		.attr('id', 'botaoIniciarLeitura')
		.attr('type', 'submit')
		.append("Iniciar Leitura ")
		.append(iconLeitura)
		.click(function() {
			
			// retirar evento duplicado
			
			checkStatusBalanca(textoPeso);
			
		});
		
	var botaoPararLeitura = $("<button/>")
		.addClass('col-sm-4')
		.addClass('btn btn-warning')
		.attr('id', 'botaoPararLeitura')
		.attr('type', 'submit')
		.append("Parar Leitura ")
		.append(iconLeitura);
	
	var campoBotoes = $("<div/>")
		.attr('id', 'campoBotoes')
		.addClass('row')
		.append(botaoConectar)
		.append(botaoIniciarLeitura)
		.append(botaoPararLeitura)
		.append(botaoDesconectar);
	
	var formulario = $("<div/>")
		.addClass("form-horizontal")
		.append(textoCampo)
		.append(campoBotoes);
		
	return formulario;
	
}
