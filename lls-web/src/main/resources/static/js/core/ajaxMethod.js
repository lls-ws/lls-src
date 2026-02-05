/* =========================================================
 * ajaxMethod.js
 * 
 * Autor: Leandro Luiz
 * email: lls.homeoffice@gmail.com
 * ========================================================= */

function ajaxMethod({
	id = '',
	url = '',
	data = '',
	iconButton = ''
} = {}) {
	
	var status = '';
	var message = '';
	
	let alertAnimation = alertMessage({
							id: id,
							isAnimate: true,
							iconButton: iconButton
						});
	
	$.ajaxSettings.mimeType="*/*; charset=iso-8859-1";
	
	$.ajax({
		type: "POST",
		url: url,
		contentType: "application/x-www-form-urlencoded;charset=iso-8859-1",
		dataType: "json",
		data : JSON.stringify(data),
		timeout: 2000,
		beforeSend : function(xhr) {
			xhr.setRequestHeader('Accept', "text/html; charset=iso-8859-1");
		},
		success: function(result) {
			
			status = result.status;
			
			message = decodeURIComponent(unescape(result.message));
			
		},
		error: function(jqXHR, textStatus, errorThrown) {
			
			status = textStatus;
			
			message = decodeURIComponent(unescape(jqXHR + errorThrown));
			
		}
 
	});
	
	alertMessage({
		id: id,
		status: status,
		message: message,
		isAnimate: false,
		iconButton: iconButton,
		animation: alertAnimation.animation,
		iconAnimation: alertAnimation.iconAnimation
	});
	
	return status;
	
}
