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
import java.util.List;

import br.net.lls.componentes.Id;
import br.net.lls.componentes.ControllerUtil;
import br.net.lls.cadastro.Produtor;
import br.net.lls.cadastro.FazendaProdutor;
import br.net.lls.cadastro.dao.ProdutorDao;
import br.net.lls.cadastro.dao.FazendaProdutorDao;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.core.JsonGenerationException;

import org.json.JSONArray;
import org.json.JSONObject;

@Transactional
@Controller
public class FazendaProdutorController {
	
	@Autowired
	ProdutorDao produtorDao;
 
	@Autowired
	FazendaProdutorDao fazendaDao;
	
	@Autowired
	SmartValidator validator;
	
	@RequestMapping("adicionaFazendaProdutor")
	public @ResponseBody String adiciona(@RequestBody String json,
										 BindingResult result) {
		
		String mensagem = "";
		String idFazendaProdutor = "";
		
		try {
			
			ObjectMapper mapper = new ObjectMapper();
			
			JsonNode node = mapper.readTree(json);
			
			FazendaProdutor fazenda = mapper.convertValue(node.get("cadastro"), FazendaProdutor.class);
			
			validator.validate(fazenda, result, FazendaProdutor.FazendaProdutorValida.class);
			
			if(result.hasFieldErrors()) {
				return ControllerUtil.getMessageError(result.getFieldError());
			}
			else {
				
				Id id = mapper.convertValue(node.get("id"), Id.class);
				
				validator.validate(id, result, Id.IdValida.class);
				
				if (result.hasFieldErrors()) {
					return ControllerUtil.getMessageError(result.getFieldError());
				}
				else {
				
					Produtor produtor = produtorDao.buscaPorId(id.getId());
					
					fazenda.setProdutor(produtor);
					
					fazendaDao.adiciona(fazenda);
					
					idFazendaProdutor = String.valueOf(fazenda.getId());
					
					mensagem = "Fazenda do Produtor adicionada com sucesso!";
					
				}
				
			}
			
			return ControllerUtil.getMessageSuccess(mensagem, idFazendaProdutor);
			
		} catch (JsonGenerationException e) {
			return ControllerUtil.getMessageError(e.toString());
			
		} catch (IOException e) {
			return ControllerUtil.getMessageError(e.toString());
		}
		
	}
	
	@RequestMapping("removeFazenda")
	public @ResponseBody String remove(@RequestBody @Valid Id id,
									   BindingResult result) {
		
		if(result.hasFieldErrors()) {
			return ControllerUtil.getMessageError(result.getFieldError());
		}
		
		//fazendaDao.remove(id.getId());
		
		//return ControllerUtil.getMessageSuccess("2");
		return ControllerUtil.getMessageError("Proibido remover!");
		
	}

	@RequestMapping("listaProcuraFazendaProdutor")
	public @ResponseBody String lista(@RequestBody @Valid Id id,
									  BindingResult result) {
		
		if(result.hasFieldErrors()) {
			return ControllerUtil.getMessageError(result.getFieldError());
		}
		else {
			
			List fazendaList = fazendaDao.lista(id.getNome());
			
			JSONArray fazendasArray = new JSONArray(fazendaList);
						
			JSONObject jsonList = new JSONObject();
			
			jsonList.put("cadastros", fazendasArray);
			
			jsonList.put("status", "200");
			
			return jsonList.toString();
			
		}
		
	}
	
}
