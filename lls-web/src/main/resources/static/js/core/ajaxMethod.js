/* =========================================================
 * ajaxMethod.js
 * 
 * Autor: Leandro Luiz
 * email: lls.homeoffice@gmail.com
 * ========================================================= */

function ajaxMethod(data) {
	
	alertMessage(data, true);
	
	$.ajaxSettings.mimeType="*/*; charset=iso-8859-1";
	
	$.ajax({
		type: "GET",
		url: data.url,
		contentType: "application/x-www-form-urlencoded;charset=iso-8859-1",
		dataType: "json",
		data : data,
		async: false,
		timeout: 2000,
		beforeSend : function(xhr) {
			xhr.setRequestHeader('Accept', "text/html; charset=iso-8859-1");
		},
		success: function(result) {
			
			data["status"] = result.status;
			data["mensagem"] = decodeURIComponent(unescape(result.mensagem));
			
			if (data.status != "200") {
				
				alertMessage(data, false);
				
			}
			
		},
		error: function(jqXHR, textStatus, errorThrown) {
			
			data["status"] = textStatus;
			data["mensagem"] = jqXHR + textStatus + errorThrown;
			
			alertMessage(data, false);
			
		}
 
	});
	
}
