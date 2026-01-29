package br.net.lls.fatcafe.controller;

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
import javax.json.Json;
import javax.json.JsonObject;
import javax.servlet.http.HttpSession;
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

import br.net.lls.componentes.Id;
import br.net.lls.componentes.Data;
import br.net.lls.componentes.Relatorio;
import br.net.lls.componentes.ControllerUtil;
import br.net.lls.cadastro.Usuario;
import br.net.lls.fatcafe.dao.ServcafeDao;
import br.net.lls.fatcafe.Servcafe;
import br.net.lls.fatcafe.dao.BaixacafeDao;
import br.net.lls.fatcafe.Baixacafe;

@Transactional
@Controller
public class BaixacafeController {
	
	@Autowired
	ServcafeDao servcafeDao;
	
	@Autowired
	BaixacafeDao baixacafeDao;
	
	@Autowired
	SmartValidator validator;
	
	
	@RequestMapping("salvaBaixacafe")
	public @ResponseBody String adiciona(@RequestBody String json,
										 BindingResult result,
										 HttpSession session) {
		
		try {
			
			ObjectMapper mapper = new ObjectMapper();
			
			JsonNode node = mapper.readTree(json);
			
			Baixacafe baixacafe = mapper.convertValue(node.get("cadastro"), Baixacafe.class);
			
			validator.validate(baixacafe, result, Baixacafe.BaixacafeValida.class);
			
			if(result.hasFieldErrors()) {
				return ControllerUtil.getMessageError(result.getFieldError());
			}
			else {
			
				Usuario usuario = (Usuario) session.getAttribute("usuarioLogado");
						
				Servcafe servcafe = servcafeDao.buscaPorId(baixacafe.getId());
				
				BigDecimal valorTotal = servcafe.getValor();
				
				BigDecimal valorPago = getTotalPago(baixacafe.getId()).add(baixacafe.getValor());
				
				BigDecimal valorRestante = valorTotal.subtract(valorPago);
				
				String obs = baixacafe.getObs();
				
				int indexStatus = 0;
				
				if (valorRestante.compareTo(BigDecimal.ZERO) >= 0) {
				
					if (valorRestante.compareTo(BigDecimal.ZERO) == 0) {
					
						servcafe.setPago(true);
						
						servcafeDao.altera(servcafe);
						
					}
					
					if (!obs.equals("")) obs += System.lineSeparator();
					
					obs += "Baixado por: " + usuario.getEmail();
					
					baixacafe.setId(0);
					baixacafe.setObs(obs);
					baixacafe.setServcafe(servcafe);
					
					baixacafeDao.adiciona(baixacafe);
					
				}
				
				if (servcafe.getPago()) indexStatus = 1;
				
				JsonObject resposta = Json.createObjectBuilder()
					.add("status", "200")
					.add("mensagem", "Baixado com sucesso!")
					.add("id", servcafe.getId())
					.add("indexStatus", indexStatus)
					.add("data", servcafe.getDataText())
					.build();
					
				return resposta.toString();
				
			}
			
		} catch (JsonGenerationException e) {
			return ControllerUtil.getMessageError(e.toString());
			
		} catch (IOException e) {
			return ControllerUtil.getMessageError(e.toString());
		}
	}
	
	@RequestMapping("listaBaixacafe")
	public @ResponseBody String baixa(@RequestBody @Valid Relatorio relatorio,
									  BindingResult result) {
		
		if(result.hasFieldErrors()) {
			return ControllerUtil.getMessageError(result.getFieldError());
		}
		else {
			
			List cafeList = baixacafeDao.getBaixas(relatorio.getTipo());
			
			List rodapeList = baixacafeDao.getTotaisBaixas(relatorio.getTipo());
			
			int totalRegistros = 0;
			
			JSONArray cafeArray = new JSONArray();
			
			for (Iterator iterator = cafeList.iterator(); iterator.hasNext();) {
				
				Object[] list = (Object[]) iterator.next();
				
				JSONObject cafeJSON = new JSONObject();
				
				cafeJSON.put("id", list[0]);
				cafeJSON.put("data", list[1]);
				cafeJSON.put("valor", list[2]);
				cafeJSON.put("obs", list[3]);
				
				cafeArray.put(cafeJSON);
				
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
			
			jsonList.put("cadastros", cafeArray);
			
			jsonList.put("paginas", qtdPaginas);
			
			jsonList.put("rodape", rodapeArray);
			
			jsonList.put("status", "200");
			
			return jsonList.toString();
			
		}
		
	}
	
	@RequestMapping("achaBaixacafe")
	public @ResponseBody String acha(@RequestBody @Valid Id id,
									 BindingResult result) {
		
		if(result.hasFieldErrors()) {
			return ControllerUtil.getMessageError(result.getFieldError());
		}
		
		List baixacafeList = baixacafeDao.getListById(id.getId());
		
		JSONObject baixacafeJSON = new JSONObject();
		
		for (Iterator iterator = baixacafeList.iterator(); iterator.hasNext();) {
			
			Object[] list = (Object[]) iterator.next();
			
			baixacafeJSON.put("status", "200");
			baixacafeJSON.put("id", list[0]);
			baixacafeJSON.put("data", list[1]);
			baixacafeJSON.put("produtor", list[2]);
			baixacafeJSON.put("fazenda", list[3]);
			baixacafeJSON.put("servico", list[4]);
			baixacafeJSON.put("sacas", list[5]);
			baixacafeJSON.put("total", list[6]);
			baixacafeJSON.put("pago", list[7]);
			baixacafeJSON.put("valor", list[8]);
		}
		
		return baixacafeJSON.toString();
		
	}
	
	@RequestMapping("removeBaixacafe")
	public @ResponseBody String remove(@RequestBody @Valid Id id,
									   BindingResult result) {
		
		if(result.hasFieldErrors()) {
			return ControllerUtil.getMessageError(result.getFieldError());
		}
		
		String status = "400";
		String mensagem = "Proibido remover!";
		
		Baixacafe baixacafe = baixacafeDao.buscaPorId(id.getId());
		
		int dias = Data.getDaysDiff(baixacafe.getData().getTime(), Data.StringToDate(Data.DataAtual()));
		
		if (dias <= 1) {
		
			Servcafe servcafe = baixacafe.getServcafe();
		
			servcafe.setPago(false);
			
			servcafeDao.altera(servcafe);
			
			baixacafeDao.remove(baixacafe);
			
			status = "200";
			mensagem = "Removido com sucesso!";
			
		}
		else mensagem += "\nFora da data permitida!";
		
		return ControllerUtil.getMessage(status, mensagem);
		
	}

	private BigDecimal getTotalPago(int idServ) {
		
		List baixaList = baixacafeDao.getTotaisBaixas(idServ);
		
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
