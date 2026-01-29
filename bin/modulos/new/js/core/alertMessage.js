/* =========================================================
 * alertMessage.js
 * 
 * Autor: Leandro Luiz
 * email: lls.homeoffice@gmail.com
 * ========================================================= */

function alertMessage(data, enable) {
	
	data["animateIcon"] = enable;
	
	if (data.animateIcon) {
		
		animateIcon(data);
		
	}
	else {
		
		var alertSpan = $("<span/>")
			.addClass("fa-solid fa-ban fa-beat-fade fa-xl");
		
		var alertSpanDiv = $("<div/>")
			.addClass("position-absolute top-0 start-0")
			.append(alertSpan);
		
		var alertText = $("<div/>")
			.addClass("text-center text-break fs-6 position-relative")
			.append(alertSpanDiv)
			.append(data.mensagem);
		
		var alertButton = $("<button/>")
				 .attr("type", "button")
				 .attr("data-bs-dismiss", "alert")
				 .attr("aria-label", "Close")
				 .attr("type", "button")
				 .addClass("btn-close btn-lg");
			
		var alertDiv = $("<div/>")
				 .attr("role", "alert")
				 .addClass("auto-close alert alert-danger alert-dismissible fade show")
				 .append(alertText)
				 .append(alertButton);
				 
		$("#alertMessage").remove(".alert").append(alertDiv);
					
		$(".alert").delay(2000).slideUp(200, function() {
			
			$(this).alert('close');
			
			animateIcon(data);
			
			$('#' + data.idButton + 'Button').prop('disabled', false);
			
		});
		
	}
	
}
