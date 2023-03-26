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
import javax.servlet.http.HttpSession;

import br.net.lls.cadastro.Usuario;
import br.net.lls.componentes.Id;
import br.net.lls.componentes.Relatorio;
import br.net.lls.componentes.ControllerUtil;
import br.net.lls.fatmilho.dao.ServmilhoDao;
import br.net.lls.fatmilho.Servmilho;
import br.net.lls.fatmilho.dao.BaixamilhoDao;
import br.net.lls.fatmilho.Baixamilho;

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
public class BaixamilhoController {
	
	@Autowired
	ServmilhoDao servmilhoDao;
	
	@Autowired
	BaixamilhoDao baixamilhoDao;
	
	@Autowired
	SmartValidator validator;
	
	@RequestMapping("listaBaixamilho")
	public @ResponseBody String baixa(@RequestBody @Valid Relatorio relatorio,
									  BindingResult result) {
		
		if(result.hasFieldErrors()) {
			return ControllerUtil.getMessageError(result.getFieldError());
		}
		else {
			
			List milhoList = baixamilhoDao.getBaixas(relatorio.getTipo());
			
			List rodapeList = baixamilhoDao.getTotaisBaixas(relatorio.getTipo());
			
			int totalRegistros = 0;
			
			JSONArray milhoArray = new JSONArray();
			
			for (Iterator iterator = milhoList.iterator(); iterator.hasNext();) {
				
				Object[] list = (Object[]) iterator.next();
				
				JSONObject milhoJSON = new JSONObject();
				
				milhoJSON.put("id", list[0]);
				milhoJSON.put("data", list[1]);
				milhoJSON.put("valor", list[2]);
				milhoJSON.put("obs", list[3]);
				
				milhoArray.put(milhoJSON);
				
			}
			
			JSONArray rodapeArray = new JSONArray();
			
			for (Iterator iterator = rodapeList.iterator(); iterator.hasNext();) {
				
				Object[] list = (Object[]) iterator.next();
				
				JSONObject rodapeJSON = new JSONObject();
				
				BigInteger big = (BigInteger) list[0];
				
				totalRegistros = big.intValue();
				
				rodapeJSON.put("total", list[1]);
				
				rodapeArray.put(rodapeJSON);
				
			}
			
			int qtdPaginas = (totalRegistros + relatorio.getLinhas() - 1) / relatorio.getLinhas();
			
			JSONObject jsonList = new JSONObject();
			
			jsonList.put("cadastros", milhoArray);
			
			jsonList.put("paginas", qtdPaginas);
			
			jsonList.put("rodape", rodapeArray);
			
			jsonList.put("status", "200");
			
			return jsonList.toString();
			
		}
		
	}
	
	@RequestMapping("salvaBaixamilho")
	public @ResponseBody String adiciona(@RequestBody String json,
										 BindingResult result,
										 HttpSession session) {
		
		String status = "";
		String mensagem = "";
		
		try {
			
			ObjectMapper mapper = new ObjectMapper();
			
			JsonNode node = mapper.readTree(json);
			
			Baixamilho baixamilho = mapper.convertValue(node.get("baixamilho"), Baixamilho.class);
			
			validator.validate(baixamilho, result, Baixamilho.BaixamilhoValida.class);
			
			Id idServ = mapper.convertValue(node.get("servico"), Id.class);
			
			validator.validate(idServ, result, Id.IdValida.class);
			
			if(result.hasFieldErrors()) {
				return ControllerUtil.getMessageError(result.getFieldError());
			}
			else {
				
				Usuario usuario = (Usuario) session.getAttribute("usuarioLogado");
					
				String emailUsuario = usuario.getEmail();
				
				Servmilho servmilho = servmilhoDao.buscaPorId(idServ.getId());
				
				BigDecimal valorTotal = servmilho.getValor();
				
				BigDecimal valorPago = getTotalPago(idServ.getId()).add(baixamilho.getValor());
				
				BigDecimal valorRestante = valorTotal.subtract(valorPago);
				
				if (baixamilho.getId() == 0) {
					
					String obs = "";
					
					if (valorRestante.compareTo(BigDecimal.ZERO) == 0) {
					
						servmilho.setPago(true);
						
						servmilhoDao.altera(servmilho);
						
					}
					
					obs = baixamilho.getObs() +
						 System.lineSeparator() +
						 " Baixado por: " +
						 emailUsuario;
					
					baixamilho.setObs(obs);
					baixamilho.setServmilho(servmilho);
					
					baixamilhoDao.adiciona(baixamilho);
					
					status = "200";
					
					mensagem = "Baixado com sucesso!";
					
				}
			
			}
			
			return ControllerUtil.getMessage(status, mensagem);
			
		} catch (JsonGenerationException e) {
			return ControllerUtil.getMessageError(e.toString());
			
		} catch (IOException e) {
			return ControllerUtil.getMessageError(e.toString());
		}
	}

	@RequestMapping("achaBaixamilho")
	public @ResponseBody String acha(@RequestBody @Valid Id id,
									 BindingResult result) {
		
		if(result.hasFieldErrors()) {
			return ControllerUtil.getMessageError(result.getFieldError());
		}
		
		List baixamilhoList = baixamilhoDao.getListById(id.getId());
		
		JSONObject baixamilhoJSON = new JSONObject();
		
		for (Iterator iterator = baixamilhoList.iterator(); iterator.hasNext();) {
			
			Object[] list = (Object[]) iterator.next();
			
			baixamilhoJSON.put("status", "200");
			baixamilhoJSON.put("id", list[0]);
			baixamilhoJSON.put("data", list[1]);
			baixamilhoJSON.put("produtor", list[2]);
			baixamilhoJSON.put("fazenda", list[3]);
			baixamilhoJSON.put("servico", list[4]);
			baixamilhoJSON.put("total", list[5]);
			baixamilhoJSON.put("pago", list[6]);
			baixamilhoJSON.put("valor", list[7]);
			baixamilhoJSON.put("obs", list[8]);
		}
		
		return baixamilhoJSON.toString();
		
	}
	
	@RequestMapping("removeBaixamilho")
	public @ResponseBody String remove(@RequestBody @Valid Id id,
									   BindingResult result) {
		
		if(result.hasFieldErrors()) {
			return ControllerUtil.getMessageError(result.getFieldError());
		}
		
		String status = "";
		String mensagem = "";
		
		Baixamilho baixamilho = baixamilhoDao.buscaPorId(id.getId());
		
		Servmilho servmilho = baixamilho.getServmilho();
		
		servmilho.setPago(false);
		
		servmilhoDao.altera(servmilho);
		
		baixamilhoDao.remove(baixamilho);
		
		return ControllerUtil.getMessageSuccess("2");
		
	}

	private BigDecimal getTotalPago(int idServ) {
		
		List baixaList = baixamilhoDao.getTotaisBaixas(idServ);
		
		BigDecimal totalPago = new BigDecimal(0.00);
		
		for (Iterator iterator = baixaList.iterator(); iterator.hasNext();) {
				
			Object[] list = (Object[]) iterator.next();
			
			if (list[1] != null) {
			
				totalPago = (BigDecimal) list[1];
				
			}
			
		}
		
		return totalPago;
		
	}

}
