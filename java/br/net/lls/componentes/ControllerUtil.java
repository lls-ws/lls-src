package br.net.lls.componentes;

import javax.json.JsonObject;
import javax.json.Json;
import org.springframework.validation.FieldError;

public class ControllerUtil {
	
	public static String getMessageError(FieldError error) {
		
		JsonObject resposta = Json.createObjectBuilder()
			.add("status", "400")
			.add("mensagem", "\nErro: " + error.getDefaultMessage())
			.build();
			
		return resposta.toString();
		
	}
	
	public static String getMessageError(String error) {
		
		JsonObject resposta = Json.createObjectBuilder()
			.add("status", "400")
			.add("mensagem", "\nErro: " + error)
			.build();
			
		return resposta.toString();
		
	}
	
	public static String getMessageSuccess(String message) {
		
		if (message.equals("0")) message = "Salvo com sucesso!";
		if (message.equals("1")) message = "Alterado com sucesso!";
		if (message.equals("2")) message = "Removido com sucesso!";
		
		JsonObject resposta = Json.createObjectBuilder()
			.add("status", "200")
			.add("mensagem", message)
			.build();
			
		return resposta.toString();
		
	}
	
	public static String getMessageSuccess(String message, String id) {
		
		JsonObject resposta = Json.createObjectBuilder()
			.add("status", "200")
			.add("mensagem", message)
			.add("id", id)
			.build();
			
		return resposta.toString();
		
	}
	
	public static String getMessage(String status, String message) {
		
		JsonObject resposta = Json.createObjectBuilder()
			.add("status", status)
			.add("mensagem", message)
			.build();
			
		return resposta.toString();
		
	}
	
}
