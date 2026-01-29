package br.net.lls.cadastro.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.SmartValidator;

import java.io.IOException;
import javax.validation.Valid;
import javax.json.JsonObject;

import br.net.lls.componentes.Id;
import br.net.lls.componentes.ControllerUtil;
import br.net.lls.componentes.Data;
import br.net.lls.cadastro.Laudo;
import br.net.lls.cadastro.dao.LaudoDao;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.core.JsonGenerationException;

import org.json.JSONObject;

@Transactional
@Controller
public class LaudoController {
 
	@Autowired
	LaudoDao laudoDao;
	
	@Autowired
	SmartValidator validator;
	
	@RequestMapping("salvaLaudo")
	public @ResponseBody String adiciona(@RequestBody String json,
										 BindingResult result) {
		
		try {
			
			ObjectMapper mapper = new ObjectMapper();
			
			JsonNode node = mapper.readTree(json);
			
			Laudo laudo = mapper.convertValue(node.get("laudo"), Laudo.class);
			
			validator.validate(laudo, result, Laudo.LaudoValida.class);
			
			if(result.hasFieldErrors()) {
				return ControllerUtil.getMessageError(result.getFieldError());
			}
			else {
				
				laudoDao.altera(laudo);
				
				return ControllerUtil.getMessageSuccess("1");
				
			}
			
		} catch (JsonGenerationException e) {
			return ControllerUtil.getMessageError(e.toString());
			
		} catch (IOException e) {
			return ControllerUtil.getMessageError(e.toString());
		}
		
	}
	
	@RequestMapping("achaLaudo")
	public @ResponseBody String acha() {
		
		Laudo laudo = laudoDao.buscaPorId(1);
		
		if (laudo != null) {
			return getLaudoJSON(laudo).toString();
		}
		else {
			return ControllerUtil.getMessageError("Laudo inexistente!");
		}
		
	}
	
	private JSONObject getLaudoJSON(Laudo laudo) {
		
		JSONObject laudoJSON = new JSONObject();
		
		laudoJSON.put("status", "200");
		laudoJSON.put("id", laudo.getId());
		laudoJSON.put("laudo", laudo.getLaudo());
		laudoJSON.put("data", Data.DataAtual());
		
		return laudoJSON;

	}
	
}
