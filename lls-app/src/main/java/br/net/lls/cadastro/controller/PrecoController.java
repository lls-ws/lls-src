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
import br.net.lls.componentes.Consulta;
import br.net.lls.componentes.ControllerUtil;
import br.net.lls.cadastro.Preco;
import br.net.lls.cadastro.dao.PrecoDao;

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
public class PrecoController {
 
	@Autowired
	PrecoDao precoDao;
	
	@Autowired
	SmartValidator validator;
	
	@RequestMapping("salvaPreco")
	public @ResponseBody String adiciona(@RequestBody String json,
										 BindingResult result) {
		
		String status = "";
		String mensagem = "";
		
		try {
			
			ObjectMapper mapper = new ObjectMapper();
			
			JsonNode node = mapper.readTree(json);
			
			Preco preco = mapper.convertValue(node.get("preco"), Preco.class);
			
			validator.validate(preco, result, Preco.PrecoValida.class);
			
			if(result.hasFieldErrors()) {
				return ControllerUtil.getMessageError(result.getFieldError());
			}
			else {
				
				precoDao.urlDecoder(preco);
				
				boolean verificaExisteNome = precoDao.verificaExiste("nome", preco.getNome());
				
				mensagem = " em uso!\n";
				
				if (verificaExisteNome) {
					
					status = "400";
					
					mensagem = "Nome" + mensagem;
					
				}
				
				if (preco.getId() == 0) {
					
					if (!verificaExisteNome) {
						
						precoDao.adiciona(preco);
						
						status = "200";
						
						mensagem = "Salvo com sucesso!";
						
					}
					
				}
				else {
					
					Preco precoAtual = precoDao.buscaPorId(preco.getId());
					
					if (precoAtual.getNome().equals(preco.getNome())) {
					
						precoDao.altera(preco);
					
						status = "200";
					
						mensagem = "Alterado com sucesso!";
					
					}
					else if (!precoAtual.getNome().equals(preco.getNome()) && !verificaExisteNome) {
					
						precoDao.altera(preco);
					
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
	
	@RequestMapping("listaPreco")
	public @ResponseBody String lista(@RequestBody @Valid Id id,
									  BindingResult result) {
		
		if(result.hasFieldErrors()) {
			return ControllerUtil.getMessageError(result.getFieldError());
		}
		else {
			
			int pageSize = 8;
			
			List precoList = precoDao.lista(id.getId(), id, pageSize);
			
			JSONArray precosArray = new JSONArray();
			
			for (Iterator iterator = precoList.iterator(); iterator.hasNext();) {
				
				Preco preco = (Preco) iterator.next();
				
				JSONObject precoJSON = new JSONObject();
				
				precoJSON.put("id", preco.getId());
				precoJSON.put("nome", preco.getNome());
				precoJSON.put("valor", preco.getValor());
				
				precosArray.put(precoJSON);
				
			}
			
			int[] array = precoDao.getQuantidadePaginas(id.getNome(), pageSize);
			
			JSONObject totalJSONObject = new JSONObject();
			
			totalJSONObject.put("paginas", array[0]);
			totalJSONObject.put("qtd", array[1]);
			
			return Consulta.getJson(precosArray, totalJSONObject);
						
		}
		
	}
	
	@RequestMapping("achaPreco")
	public @ResponseBody String acha(@RequestBody @Valid Id id,
									 BindingResult result) {
		
		if(result.hasFieldErrors()) {
			return ControllerUtil.getMessageError(result.getFieldError());
		}
		
		Preco preco = precoDao.buscaPorId(id.getId());
		
		JSONObject precoJSON = getPrecoJSON(preco);
		
		precoJSON.put("status", "200");
		
		return precoJSON.toString();
		
	}
	
	@RequestMapping("removePreco")
	public @ResponseBody String remove(@RequestBody @Valid Id id,
									   BindingResult result) {
		
		if(result.hasFieldErrors()) {
			return ControllerUtil.getMessageError(result.getFieldError());
		}
		
		precoDao.remove(id.getId());
		
		return ControllerUtil.getMessageSuccess("2");
		
	}
	
	private JSONObject getPrecoJSON(Preco preco) {
		
		JSONObject precoJSON = new JSONObject();
			
		precoJSON.put("id", preco.getId());
		precoJSON.put("nome", preco.getNome());
		precoJSON.put("valor", preco.getValor());
		
		return precoJSON;

	}
	
	@RequestMapping("listaPrecoEntmilho")
	public @ResponseBody String listaEntmilho() {
		
		List precoList = precoDao.listaEntmilho();
		
		JSONArray precosArray = new JSONArray(precoList);
					
		JSONObject jsonList = new JSONObject();
		
		jsonList.put("cadastros", precosArray);
		
		jsonList.put("status", "200");
		
		return jsonList.toString();
		
	}
	
	@RequestMapping("listaProcuraPreco")
	public @ResponseBody String listaProcura(@RequestBody @Valid Id id,
									  BindingResult result) {
		
		if(result.hasFieldErrors()) {
			return ControllerUtil.getMessageError(result.getFieldError());
		}
		else {
			
			List precoList = precoDao.lista(1, id, 0);
			
			JSONArray precosArray = new JSONArray(precoList);
						
			JSONObject jsonList = new JSONObject();
			
			jsonList.put("cadastros", precosArray);
			
			jsonList.put("status", "200");
			
			return jsonList.toString();
			
		}
		
	}
	
}
