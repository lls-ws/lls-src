/* =========================================================
 * ajaxMethod.js
 * 
 * Autor: Leandro Luiz
 * email: lls.homeoffice@gmail.com
 * ========================================================= */

function ajaxMethod({
	url = '',
	data = '',
	iconButton = '',
	imageButtonID = ''
} = {}) {
	
	var status = 0;
	
	const { animation, iconAnimation } = alertMessage({
											isAnimate: true,
											iconButton: iconButton,
											imageButtonID: imageButtonID
										});
	
	$.ajaxSettings.mimeType="*/*; charset=iso-8859-1";
	
	$.ajax({
		type: "POST",
		url: url,
		contentType: "application/x-www-form-urlencoded;charset=iso-8859-1",
		dataType: "json",
		data : data,
		async: false,
		timeout: 2000,
		beforeSend : function(xhr) {
			xhr.setRequestHeader('Accept', "text/html; charset=iso-8859-1");
		},
		success: function(result) {
			
			status = result.status;
			
			if (status != "200") {
				
				alertMessage({
					isAnimate = false,
					animation: animation,
					iconButton: iconButton,
					iconAnimation: iconAnimation,
					imageButtonID: imageButtonID,
					mensagem: decodeURIComponent(unescape(result.mensagem))
				});
				
			}
			
		},
		error: function(jqXHR, textStatus, errorThrown) {
			
			data["status"] = textStatus;
			data["mensagem"] = jqXHR + textStatus + errorThrown;
			
			alertMessage(data, false);
			
		}
 
	});
	
	return status;
	
}
