/* =========================================================
 * eventoImprimir.js
 * http://lls.net.br/
 * ========================================================= */

function eventoImprimir(urlImprimir, dados) {
	
	$.ajax({
		url: urlImprimir,
		type: "POST",
		dataType: 'json',
		contentType: 'application/json',
		data: JSON.stringify(dados),
		success: function (response, status, xh) {
			
			var fileModel = response;
			var blob = base64toBlob(fileModel.content, fileModel.mimeType);
			var url = window.URL.createObjectURL(blob);
			var win = window.open(url, '_blank');
			
			if(win){
				win.focus();
			}else{
				alert('Favor permitir janelas popups para esse site');
			}
    
		},
		cache: false,
		processData: false,
		error: function(jqXHR, exception) {
			
			mostraAjaxErro(
				exception + ": " + jqXHR.status + " - " + jqXHR.responseText,
				jqXHR.status
			);
		
		}
		
	})
	
}

function base64toBlob(base64Data, contentType, sliceSize) {
  contentType = contentType || '';
  sliceSize = sliceSize || 512;

  var byteCharacters = atob(base64Data);
  var byteArrays = [];

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize);

    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    var byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  var blob = new Blob(byteArrays, {
    type : contentType
  });
  return blob;
}
