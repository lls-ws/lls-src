package br.net.lls.fatmilho.controller;

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
import javax.servlet.http.HttpSession;

import br.net.lls.componentes.Id;
import br.net.lls.componentes.Data;
import br.net.lls.componentes.Relatorio;
import br.net.lls.componentes.Consulta;
import br.net.lls.componentes.ControllerUtil;
import br.net.lls.cadastro.FazendaProdutor;
import br.net.lls.cadastro.dao.FazendaProdutorDao;
import br.net.lls.cadastro.Usuario;
import br.net.lls.cadastro.Preco;
import br.net.lls.cadastro.dao.PrecoDao;
import br.net.lls.fatmilho.Servmilho;
import br.net.lls.fatmilho.dao.ServmilhoDao;

import java.util.List;
import java.util.Iterator;
import java.lang.Object;
import java.math.BigDecimal;
import java.math.BigInteger;

import org.json.JSONArray;
import org.json.JSONObject;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.core.JsonGenerationException;

@Transactional
@Controller
public class ServmilhoController {
 
	@Autowired
	ServmilhoDao servmilhoDao;
	
	@Autowired
	PrecoDao precoDao;
	
	@Autowired
	FazendaProdutorDao fazendaProdutorDao;
	
	@Autowired
	SmartValidator validator;
	
	@RequestMapping("listaServicomilho")
	public @ResponseBody String servico(@RequestBody @Valid Relatorio relatorio,
										  BindingResult result) {
		
		if(result.hasFieldErrors()) {
			return ControllerUtil.getMessageError(result.getFieldError());
		}
		else {
			
			return Consulta.getJson(servmilhoDao.getListaJSONArray(relatorio),
									servmilhoDao.getTotalJSONObject(relatorio));
			
		}
		
	}
	
	@RequestMapping("salvaServicomilho")
	public @ResponseBody String adiciona(@RequestBody String json,
										 BindingResult result,
										 HttpSession session) {
		
		String status = "";
		String mensagem = "";
		
		try {
			
			ObjectMapper mapper = new ObjectMapper();
			
			JsonNode node = mapper.readTree(json);
			
			Servmilho servmilho = mapper.convertValue(node.get("servicomilho"), Servmilho.class);
			
			validator.validate(servmilho, result, Servmilho.ServmilhoValida.class);
			
			Id idPreco = mapper.convertValue(node.get("preco"), Id.class);
			
			validator.validate(idPreco, result, Id.IdValida.class);
			
			if(result.hasFieldErrors()) {
				return ControllerUtil.getMessageError(result.getFieldError());
			}
			else {
				
				Preco preco = precoDao.buscaPorId(idPreco.getId());
				
				servmilho.setPreco(preco);
				
				Id idFazendaProdutor = mapper.convertValue(node.get("fazendaProdutor"), Id.class);
				
				validator.validate(idFazendaProdutor, result, Id.IdValida.class);
				
				if(result.hasFieldErrors()) {
					return ControllerUtil.getMessageError(result.getFieldError());
				}
				else {
				
					FazendaProdutor fazendaProdutor = fazendaProdutorDao.buscaPorId(idFazendaProdutor.getId());
				
					servmilho.setFazendaProdutor(fazendaProdutor);
					
					if (servmilho.getId() == 0) {
						
						servmilhoDao.adiciona(servmilho);
						
						return ControllerUtil.getMessageSuccess("0");
						
					}
					else {
						
						servmilho.setAutomatico(false);
						
						servmilhoDao.altera(servmilho);
						
						return ControllerUtil.getMessageSuccess("1");
						
					}
				
				}
				
			}
			
		} catch (JsonGenerationException e) {
			return ControllerUtil.getMessageError(e.toString());
			
		} catch (IOException e) {
			return ControllerUtil.getMessageError(e.toString());
		}
	}

	@RequestMapping("achaServicomilho")
	public @ResponseBody String acha(@RequestBody @Valid Id id,
									 BindingResult result) {
		
		if(result.hasFieldErrors()) {
			return ControllerUtil.getMessageError(result.getFieldError());
		}
		
		JSONObject obj = servmilhoDao.getJSONById(id.getId());
		
		obj.put("status", "200");
		
		return obj.toString();
		
	}
	
	@RequestMapping("removeServicomilho")
	public @ResponseBody String remove(@RequestBody @Valid Id id,
									   BindingResult result) {
		
		if(result.hasFieldErrors()) {
			return ControllerUtil.getMessageError(result.getFieldError());
		}
		
		String status = "";
		String mensagem = "";
		
		if (servmilhoDao.remover(id.getId())) {
			status = "200";
			mensagem = "Removido com sucesso!";
		}
		else {
			status = "400";
			mensagem = "Proibido remover!";
		}
		
		return ControllerUtil.getMessage(status, mensagem);
		
	}

	@RequestMapping("listaSintetizamilho")
	public @ResponseBody String sintetiza(@RequestBody @Valid Relatorio relatorio,
										  BindingResult result) {
		
		if(result.hasFieldErrors()) {
			return ControllerUtil.getMessageError(result.getFieldError());
		}
		else {
			
			return Consulta.getJson(servmilhoDao.getListaSintetizadoJSONArray(relatorio),
									servmilhoDao.getTotalSintetizadoJSONObject(relatorio));
			
		}
		
	}

	@RequestMapping("baixaServicomilho")
	public @ResponseBody String baixa(@RequestBody @Valid Id id,
									  BindingResult result,
									  HttpSession session) {
		
		if(result.hasFieldErrors()) {
			return ControllerUtil.getMessageError(result.getFieldError());
		}
		else {
		
			Usuario usuario = (Usuario) session.getAttribute("usuarioLogado");
        
			String emailUsuario = usuario.getEmail();
		
			List servmilhoList = servmilhoDao.getListById(id.getId());
			
			JSONObject servmilhoJSON = new JSONObject();
			
			for (Iterator iterator = servmilhoList.iterator(); iterator.hasNext();) {
				
				Object[] list = (Object[]) iterator.next();
				
				servmilhoJSON.put("produtor", list[0]);
				servmilhoJSON.put("fazenda", list[1]);
				servmilhoJSON.put("servico", list[2]);
				servmilhoJSON.put("liquido", list[3]);
				servmilhoJSON.put("total", list[4]);
				servmilhoJSON.put("pago", list[5]);
				servmilhoJSON.put("valor", list[6]);
				servmilhoJSON.put("obs", list[7]);
				servmilhoJSON.put("data", Data.DataAtual());
				servmilhoJSON.put("usuario", emailUsuario);
				
			}
			
			servmilhoJSON.put("status", "200");
			
			return servmilhoJSON.toString();
		
		}
	}
	
}
