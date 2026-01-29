/* =========================================================
 * loginEvent.js
 * 
 * Autor: Leandro Luiz
 * email: lls.homeoffice@gmail.com
 * ========================================================= */

function loginEvent(data){

	$('#loginForm').submit(function(event) {
		
		$("#loginButton").prop('disabled', true);
		
		event.preventDefault();
		
		data["url"] = 'efetuaLogin';
		data["email"] = $('#inputText').val();
		data["senha"] = $('#inputPassword').val();
		
		ajaxMethod(data);
		
		$("#inputPassword").val('');
		
		if (data.status == "200") {
			
			window.location.href = 'login';
			
		}
		
	});
	
	$(".togglePassword").click(function (event) {
		
		event.preventDefault();
		
		var type = $(this).parent().parent().find(".password").attr("type");
		
		if(type == "password"){
			$(this).find(".fa-regular").removeClass('fa-eye').addClass('fa-eye-slash');
			$(this).parent().parent().find(".password").attr("type","text");
		}
		else if(type == "text"){
			$(this).find(".fa-regular").removeClass('fa-eye-slash').addClass('fa-eye');
			$(this).parent().parent().find(".password").attr("type","password");
		}
		
	}).hover(function(){
		$(this).find(".fa-regular").addClass("fa-beat-fade fa-lg");
	}, function() {
		$(this).find(".fa-regular").removeClass("fa-beat-fade fa-lg");
	});

}
