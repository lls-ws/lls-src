package br.net.lls.cafe.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.validation.SmartValidator;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import javax.validation.Valid;
import javax.json.JsonObject;
import java.util.List;
import java.util.Iterator;
import java.lang.Object;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.core.JsonGenerationException;
import org.json.JSONArray;
import org.json.JSONObject;
import javax.json.JsonObject;
import javax.json.Json;
import java.math.BigDecimal;

import br.net.lls.componentes.Id;
import br.net.lls.componentes.Data;
import br.net.lls.componentes.Relatorio;
import br.net.lls.componentes.Consulta;
import br.net.lls.componentes.ControllerUtil;
import br.net.lls.cadastro.FazendaProdutor;
import br.net.lls.cadastro.dao.FazendaProdutorDao;
import br.net.lls.cafe.Guia;
import br.net.lls.cafe.Status;
import br.net.lls.cafe.Tracafe;
import br.net.lls.cafe.dao.GuiaDao;
import br.net.lls.cafe.dao.TracafeDao;
import br.net.lls.cafe.dao.TracafeDespejoDao;
import br.net.lls.cafe.dao.LoteDao;

@Transactional
@Controller
public class TracafeController {
 
	@Autowired
	TracafeDao tracafeDao;
	
	@Autowired
	TracafeDespejoDao tracafeDespejoDao;
	
	@Autowired
	LoteDao loteDao;
	
	@Autowired
	FazendaProdutorDao fazendaProdutorDao;
	
	@Autowired
	GuiaDao guiaDao;
	
	@Autowired
	SmartValidator validator;
	
	@RequestMapping("salvaTracafe")
	public @ResponseBody String adiciona(@RequestBody String json,
										 BindingResult result,
										 HttpSession session) {
		
		try {
			
			ObjectMapper mapper = new ObjectMapper();
			
			JsonNode node = mapper.readTree(json);
			
			Tracafe tracafeJson = mapper.convertValue(node.get("cadastro"), Tracafe.class);
			
			validator.validate(tracafeJson, result, Tracafe.TracafeValida.class);
			
			if(result.hasFieldErrors()) {
				return ControllerUtil.getMessageError(result.getFieldError());
			}
			else {
			
				Id idFazendaDestino = mapper.convertValue(node.get("idFazendaDestino"), Id.class);
					
				validator.validate(idFazendaDestino, result, Id.IdValida.class);
				
				if(result.hasFieldErrors()) {
					return ControllerUtil.getMessageError(result.getFieldError());
				}
				else {
		
					String mensagem = "";
					
					FazendaProdutor fazendaDestino = fazendaProdutorDao.buscaPorId(idFazendaDestino.getId());
					
					if (tracafeJson.getId() > 0) {
						
						Tracafe tracafe = tracafeDao.buscaPorId(tracafeJson.getId());
						
						tracafe.setFazendaDestino(fazendaDestino);
						tracafe.setData(tracafeJson.getData());
						tracafe.setSacas(tracafeJson.getSacas());
						tracafe.setPeso(tracafeJson.getPeso());
						tracafe.setObservacao(tracafeJson.getObservacao());
						
						tracafeDao.checkStatusDespejado(tracafe, null, session);
						
						mensagem = "Despejo salvo com sucesso!\n" + tracafe.getLote();
						
						JsonObject resposta = Json.createObjectBuilder()
									.add("status", "200")
									.add("mensagem", mensagem)
									.add("id", tracafe.getId())
									.add("indexStatus", Status.getStatusIndex(tracafe.getStatus()))
									.build();
						
						return resposta.toString();
						
					}
					else return ControllerUtil.getMessageError("Erro ao salvar, ID igual a zero!");
					
				}
				
			}
				
		} catch (JsonGenerationException e) {
			return ControllerUtil.getMessageError(e.toString());
			
		} catch (IOException e) {
			return ControllerUtil.getMessageError(e.toString());
		}
		
	}
	
	@RequestMapping("listaTracafe")
	public @ResponseBody String lista(@RequestBody @Valid Relatorio relatorio,
									  BindingResult result) {
		
		if(result.hasFieldErrors()) {
			return ControllerUtil.getMessageError(result.getFieldError());
		}
		else {
			
			return Consulta.getJson(tracafeDao.getListaJSONArray(relatorio),
									tracafeDao.getTotalJSONObject(relatorio));
		
		}
		
	}
	
	@RequestMapping("achaTracafe")
	public @ResponseBody String acha(@RequestBody @Valid Id id,
									 BindingResult result) {
		
		if(result.hasFieldErrors()) {
			return ControllerUtil.getMessageError(result.getFieldError());
		}
		
		Tracafe tracafe = tracafeDao.buscaPorId(id.getId());
		
		JSONObject loteJSONObject = new JSONObject();
		JSONObject tracafeJSONObject = new JSONObject();
			
		int sacasDespejo = tracafeDespejoDao.getSacasDespejo(tracafe.getTracafeDespejos(), tracafeJSONObject);
		
		if (sacasDespejo == tracafe.getSacas()) {
			
			sacasDespejo = loteDao.getSacasDesdobras(tracafe.getLotes(), loteJSONObject);
			
			tracafeJSONObject = loteDao.juntaJSONObject(new JSONObject[]{tracafeJSONObject, loteJSONObject});
			
		}
		
		JSONObject jsonObject = tracafeDao.getJSONById(tracafe, tracafeJSONObject, sacasDespejo);
		
		jsonObject.put("status", "200");
		
		return jsonObject.toString();
		
	}
	
	@RequestMapping("removeTracafe")
	public @ResponseBody String remove(@RequestBody @Valid Id id,
									   BindingResult result) {
		
		if(result.hasFieldErrors()) {
			return ControllerUtil.getMessageError(result.getFieldError());
		}
		
		String status = "400";
		String mensagem = "Proibido remover!";
		
		Tracafe tracafe = tracafeDao.buscaPorId(id.getId());
		
		int dias = Data.getDaysDiff(tracafe.getData().getTime(),
			Data.StringToDate(Data.DataAtual()));
		
		if (dias <= 1 && tracafe.getTracafeDespejos() == null ||
			dias <= 1 && tracafe.getTracafeDespejos().isEmpty()) {
			
			tracafeDao.remove(id.getId());
			
			status = "200";
			mensagem = "Removido com sucesso!";
			
		}
		else {
					
			if (!tracafe.getTracafeDespejos().isEmpty() ||
				tracafe.getTracafeDespejos() != null) {
					
				mensagem += "\nPrimeiro remova os despejos!";
					
			}
			else mensagem += "\nFora da data permitida!";
			
		}
		
		return ControllerUtil.getMessage(status, mensagem);
		
	}
	
	@RequestMapping("getGuiaTracafe")
	public @ResponseBody String getGuiaTracafe() {
		
		Guia guia = guiaDao.buscaPorId(4);
						
		JSONObject dataJSON = new JSONObject();
		
		dataJSON.put("status", "200");
		dataJSON.put("data", Data.DataAtual());
		dataJSON.put("lote", guia.getGuia(guia.getId()));
		
		return dataJSON.toString();
		
	}
	
}
