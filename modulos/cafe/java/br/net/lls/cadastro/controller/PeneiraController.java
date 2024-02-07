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
import javax.json.Json;

import br.net.lls.componentes.Id;
import br.net.lls.componentes.Consulta;
import br.net.lls.componentes.ControllerUtil;
import br.net.lls.cadastro.Peneira;
import br.net.lls.cadastro.dao.PeneiraDao;

import java.util.List;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.core.JsonGenerationException;

import org.json.JSONArray;
import org.json.JSONObject;

@Transactional
@Controller
public class PeneiraController {
 
	@Autowired
	PeneiraDao peneiraDao;
	
	@Autowired
	SmartValidator validator;
	
	@RequestMapping("salvaPeneira")
	public @ResponseBody String adiciona(@RequestBody String json,
										 BindingResult result) {
		
		String status = "";
		String mensagem = "";
		
		try {
			
			ObjectMapper mapper = new ObjectMapper();
			
			JsonNode node = mapper.readTree(json);
			
			Peneira peneira = mapper.convertValue(node.get("peneira"), Peneira.class);
			
			validator.validate(peneira, result, Peneira.PeneiraValida.class);
			
			if(result.hasFieldErrors()) {
				return ControllerUtil.getMessageError(result.getFieldError());
			}
			else {
				
				peneiraDao.urlDecoder(peneira);
				
				boolean verificaExisteNome = peneiraDao.verificaExiste("nome", peneira.getNome());
				
				mensagem = " em uso!\n";
				
				if (verificaExisteNome) {
					
					status = "400";
					
					mensagem = "Nome" + mensagem;
					
				}
				
				if (peneira.getId() == 0) {
					
					if (!verificaExisteNome) {
						
						peneiraDao.adiciona(peneira);
						
						status = "200";
						
						mensagem = "Salvo com sucesso!";
						
					}
					
				}
				else {
					
					Peneira peneiraAtual = peneiraDao.buscaPorId(peneira.getId());
					
					if (peneiraAtual.getNome().equals(peneira.getNome())) {
					
						peneiraDao.altera(peneira);
					
						status = "200";
					
						mensagem = "Alterado com sucesso!";
					
					}
					else if (!peneiraAtual.getNome().equals(peneira.getNome()) && !verificaExisteNome) {
					
						peneiraDao.altera(peneira);
					
						status = "200";
					
						mensagem = "Alterado com sucesso!";
					
					}
					
				}
				
			}
			
			return ControllerUtil.getMessage(status, mensagem);
			
		} catch (JsonGenerationException e) {
			return ControllerUtil.getMessageError(e.toString());
			
		} catch (IOException e) {
			return ControllerUtil.getMessageError(e.toString());
		}
		
	}
	
	@RequestMapping("listaPeneira")
	public @ResponseBody String lista(@RequestBody @Valid Id id,
									  BindingResult result) {
		
		if(result.hasFieldErrors()) {
			return ControllerUtil.getMessageError(result.getFieldError());
		}
		else {
			
			int pageSize = 8;
			
			List peneiraList = peneiraDao.lista(id.getId(),id.getNome(), pageSize);
			
			JSONArray peneirasArray = new JSONArray();
			
			for (Iterator iterator = peneiraList.iterator(); iterator.hasNext();) {
				
				Peneira peneira = (Peneira) iterator.next();
				
				JSONObject peneiraJSON = new JSONObject();
				
				peneiraJSON.put("id", peneira.getId());
				peneiraJSON.put("nome", peneira.getNome());
				
				peneirasArray.put(peneiraJSON);
				
			}
			
			int[] array = peneiraDao.getQuantidadePaginas(id.getNome(), pageSize);
			
			JSONObject totalJSONObject = new JSONObject();
			
			totalJSONObject.put("paginas", array[0]);
			totalJSONObject.put("qtd", array[1]);
			
			return Consulta.getJson(peneirasArray, totalJSONObject);
			
		}
		
	}
	
	@RequestMapping("achaPeneira")
	public @ResponseBody String acha(@RequestBody @Valid Id id,
									 BindingResult result) {
		
		if(result.hasFieldErrors()) {
			return ControllerUtil.getMessageError(result.getFieldError());
		}
		
		Peneira peneira = peneiraDao.buscaPorId(id.getId());
		
		JSONObject peneiraJSON = getPeneiraJSON(peneira);
		
		peneiraJSON.put("status", "200");
		
		return peneiraJSON.toString();
		
	}
	
	@RequestMapping("removePeneira")
	public @ResponseBody String remove(@RequestBody @Valid Id id,
									   BindingResult result) {
		
		if(result.hasFieldErrors()) {
			return ControllerUtil.getMessageError(result.getFieldError());
		}
		
		peneiraDao.remove(id.getId());
		
		return ControllerUtil.getMessageSuccess("2");
		
	}
	
	private JSONObject getPeneiraJSON(Peneira peneira) {
		
		JSONObject peneiraJSON = new JSONObject();
			
		peneiraJSON.put("id", peneira.getId());
		peneiraJSON.put("nome", peneira.getNome());
		
		return peneiraJSON;

	}
	
	@RequestMapping("listaProcuraPeneira")
	public @ResponseBody String listaProcura(@RequestBody @Valid Id id,
											 BindingResult result) {
		
		if(result.hasFieldErrors()) {
			return ControllerUtil.getMessageError(result.getFieldError());
		}
		else {
			
			List peneiraList = peneiraDao.lista(1, id.getNome(), 0);
			
			JSONArray peneirasArray = new JSONArray(peneiraList);
						
			JSONObject jsonList = new JSONObject();
			
			jsonList.put("cadastros", peneirasArray);
			
			jsonList.put("status", "200");
			
			return jsonList.toString();
			
		}
		
	}
	
}
