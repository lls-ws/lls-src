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
import br.net.lls.cadastro.Umidade;
import br.net.lls.cadastro.dao.UmidadeDao;

import java.math.BigDecimal;
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
public class UmidadeController {
 
	@Autowired
	UmidadeDao umidadeDao;
	
	@Autowired
	SmartValidator validator;
	
	@RequestMapping("salvaUmidade")
	public @ResponseBody String adiciona(@RequestBody String json,
										 BindingResult result) {
		
		String status = "";
		String mensagem = "";
		
		try {
			
			ObjectMapper mapper = new ObjectMapper();
			
			JsonNode node = mapper.readTree(json);
			
			Umidade umidade = mapper.convertValue(node.get("umidade"), Umidade.class);
			
			validator.validate(umidade, result, Umidade.UmidadeValida.class);
			
			if(result.hasFieldErrors()) {
				return ControllerUtil.getMessageError(result.getFieldError());
			}
			else {
			
				boolean verificaExisteValor = umidadeDao.verificaExiste("codigo", umidade.getCodigo());
				
				if (verificaExisteValor) {
					
					status = "400";
					
					mensagem = "Codigo em uso!";
					
				}
				
				if (umidade.getId() == 0) {
					
					if (!verificaExisteValor) {
						
						umidadeDao.adiciona(umidade);
						
						status = "200";
						
						mensagem = "Salvo com sucesso!";
						
					}
					
				}
				else {
					
					Umidade umidadeAtual = umidadeDao.buscaPorId(umidade.getId());
						
					if (umidadeAtual.getCodigo().compareTo(umidade.getCodigo()) == 0) {
					
						umidadeDao.altera(umidade);
					
						status = "200";
					
						mensagem = " Alterado com sucesso!";
					
					}
					else if (umidadeAtual.getCodigo().compareTo(umidade.getCodigo()) != 0 && !verificaExisteValor) {
					
						umidadeDao.altera(umidade);
					
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
	
	@RequestMapping("listaUmidade")
	public @ResponseBody String lista(@RequestBody @Valid Id id,
									  BindingResult result) {
		
		if(result.hasFieldErrors()) {
			return ControllerUtil.getMessageError(result.getFieldError());
		}
		else {
			
			int pageSize = 8;
			
			BigDecimal codigo = new BigDecimal(id.getNome().replaceAll(",", ""));
			
			List umidadeList = umidadeDao.lista(id.getId(), codigo, pageSize);
			
			JSONArray umidadesArray = new JSONArray();
			
			for (Iterator iterator = umidadeList.iterator(); iterator.hasNext();) {
				
				Umidade umidade = (Umidade) iterator.next();
				
				JSONObject umidadeJSON = new JSONObject();
				
				umidadeJSON.put("id", umidade.getId());
				umidadeJSON.put("codigo", umidade.getCodigo());
				umidadeJSON.put("desconto", umidade.getDesconto());
				umidadeJSON.put("valor", umidade.getValor());
				
				umidadesArray.put(umidadeJSON);
				
			}
			
			int[] array = umidadeDao.getQuantidadePaginas(pageSize, codigo);
			
			JSONObject totalJSONObject = new JSONObject();
			
			totalJSONObject.put("paginas", array[0]);
			totalJSONObject.put("qtd", array[1]);
			
			return Consulta.getJson(umidadesArray, totalJSONObject);
			
		}
		
	}
	
	@RequestMapping("achaUmidade")
	public @ResponseBody String acha(@RequestBody @Valid Id id,
									 BindingResult result) {
		
		if(result.hasFieldErrors()) {
			return ControllerUtil.getMessageError(result.getFieldError());
		}
		
		Umidade umidade = umidadeDao.buscaPorId(id.getId());
		
		JSONObject umidadeJSON = getUmidadeJSON(umidade);
		
		umidadeJSON.put("status", "200");
		
		return umidadeJSON.toString();
		
	}
	
	@RequestMapping("removeUmidade")
	public @ResponseBody String remove(@RequestBody @Valid Id id,
									   BindingResult result) {
		
		if(result.hasFieldErrors()) {
			return ControllerUtil.getMessageError(result.getFieldError());
		}
		
		umidadeDao.remove(id.getId());
		
		return ControllerUtil.getMessageSuccess("2");
		
	}
	
	private JSONObject getUmidadeJSON(Umidade umidade) {
		
		JSONObject umidadeJSON = new JSONObject();
		
		umidadeJSON.put("id", umidade.getId());
		umidadeJSON.put("codigo", umidade.getCodigo());
		umidadeJSON.put("desconto", umidade.getDesconto());
		umidadeJSON.put("valor", umidade.getValor());
		
		return umidadeJSON;

	}

	@RequestMapping("listaProcuraUmidade")
	public @ResponseBody String listaProcura(@RequestBody @Valid Id id,
									  BindingResult result) {
		
		if(result.hasFieldErrors()) {
			return ControllerUtil.getMessageError(result.getFieldError());
		}
		else {
			
			BigDecimal codigo = new BigDecimal(id.getNome().replaceAll(",", ""));
			
			List umidadeList = umidadeDao.lista(codigo);
			
			JSONArray umidadesArray = new JSONArray(umidadeList);
						
			JSONObject jsonList = new JSONObject();
			
			jsonList.put("cadastros", umidadesArray);
			
			jsonList.put("status", "200");
			
			return jsonList.toString();
			
		}
		
	}
	
}
