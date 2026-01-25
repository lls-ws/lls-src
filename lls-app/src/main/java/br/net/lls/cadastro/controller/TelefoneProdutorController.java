package br.net.lls.cadastro.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
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
import br.net.lls.cadastro.Produtor;
import br.net.lls.cadastro.TelefoneProdutor;
import br.net.lls.cadastro.dao.ProdutorDao;
import br.net.lls.cadastro.dao.TelefoneProdutorDao;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.core.JsonGenerationException;

@Transactional
@Controller
public class TelefoneProdutorController {
	
	@Autowired
	ProdutorDao produtorDao;
 
	@Autowired
	TelefoneProdutorDao telefoneProdutorDao;
	
	@Autowired
	SmartValidator validator;
	
	@RequestMapping("adicionaTelefoneProdutor")
	public @ResponseBody String adiciona(@RequestBody String json,
										 BindingResult result) {
		
		String mensagem = "";
		String idTelefoneProdutor = "";
		
		try {
			
			ObjectMapper mapper = new ObjectMapper();
			
			JsonNode node = mapper.readTree(json);
			
			TelefoneProdutor telefoneProdutor = mapper.convertValue(node.get("cadastro"), TelefoneProdutor.class);
			
			validator.validate(telefoneProdutor, result, TelefoneProdutor.TelefoneProdutorValida.class);
			
			if(result.hasFieldErrors()) {
				return ControllerUtil.getMessageError(result.getFieldError());
			}
			else {
				
				Id id = mapper.convertValue(node.get("id"), Id.class);
				
				validator.validate(id, result, Id.IdValida.class);
				
				if(result.hasFieldErrors()) {
					return ControllerUtil.getMessageError(result.getFieldError());
				}
				else {
				
					Produtor produtor = produtorDao.buscaPorId(id.getId());
					
					telefoneProdutor.setProdutor(produtor);
					
					telefoneProdutorDao.adiciona(telefoneProdutor);
					
					idTelefoneProdutor = String.valueOf(telefoneProdutor.getId());
					
					mensagem = "Telefone do Produtor adicionado com sucesso!";
					
				}
				
			}
			
			return ControllerUtil.getMessageSuccess(mensagem, idTelefoneProdutor);
			
		} catch (JsonGenerationException e) {
			return ControllerUtil.getMessageError(e.toString());
			
		} catch (IOException e) {
			return ControllerUtil.getMessageError(e.toString());
		}
		
	}
	
	@RequestMapping("removeTelefone")
	public @ResponseBody String remove(@RequestBody @Valid Id id,
									   BindingResult result) {
		
		if(result.hasFieldErrors()) {
			return ControllerUtil.getMessageError(result.getFieldError());
		}
		
		telefoneProdutorDao.remove(id.getId());
		
		return ControllerUtil.getMessageSuccess("2");
		
	}
	
}
