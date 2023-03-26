/* =========================================================
 * animacao.js
 * http://lls.net.br/
 * ========================================================= */

function animacao(idBotao, iconeBotao, enable, number) {
	
	var animation = [
		{spinner: '', animated: 'spin'},
		{spinner: 'spinner', animated: 'spin'},
		{spinner: 'circle-notch', animated: 'spin'},
		{spinner: 'sync', animated: 'spin'},
		{spinner: 'cog', animated: 'spin'},
		{spinner: 'spinner', animated: 'pulse'},
		{spinner: 'stroopwafel', animated: 'spin'}
	]
	
	if (enable) {
		
		number = 0 + Math.floor(Math.random() * 7);
		
		if (number == 0) {
			
			$('#image' + idBotao)
				.addClass('fa-' + animation[number].spinner + ' fa-' + animation[number].animated);
				
		}
		else {
			
			$('#image' + idBotao)
				.removeClass('fa-' + iconeBotao)
				.addClass('fa-' + animation[number].spinner + ' fa-' + animation[number].animated);
			
		}
	}
	else {

		$('#image' + idBotao)
			.removeClass('fa-' + animation[number].spinner + ' fa-' + animation[number].animated)
			.addClass('fa-' + iconeBotao);
			
	}
	
	return number;

}
