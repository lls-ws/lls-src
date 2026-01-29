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
import br.net.lls.cafe.Oscafe;
import br.net.lls.cafe.dao.GuiaDao;
import br.net.lls.cafe.dao.OscafeDao;
import br.net.lls.cafe.dao.OscafeDespejoDao;
import br.net.lls.cafe.dao.LoteDao;
import br.net.lls.fatcafe.dao.ServcafeDao;

@Transactional
@Controller
public class OscafeController {
 
	@Autowired
	OscafeDao oscafeDao;
	
	@Autowired
	OscafeDespejoDao oscafeDespejoDao;
	
	@Autowired
	LoteDao loteDao;
	
	@Autowired
	ServcafeDao servcafeDao;
	
	@Autowired
	FazendaProdutorDao fazendaProdutorDao;
	
	@Autowired
	GuiaDao guiaDao;
	
	@Autowired
	SmartValidator validator;
	
	@RequestMapping("salvaOscafe")
	public @ResponseBody String adiciona(@RequestBody String json,
										 BindingResult result,
										 HttpSession session) {
		
		try {
			
			ObjectMapper mapper = new ObjectMapper();
			
			JsonNode node = mapper.readTree(json);
			
			Oscafe oscafeJson = mapper.convertValue(node.get("cadastro"), Oscafe.class);
			
			validator.validate(oscafeJson, result, Oscafe.OscafeValida.class);
			
			if(result.hasFieldErrors()) {
				return ControllerUtil.getMessageError(result.getFieldError());
			}
			else {
			
				String mensagem = "";
				
				if (oscafeJson.getId() > 0) {
					
					Oscafe oscafe = oscafeDao.buscaPorId(oscafeJson.getId());
					
					oscafe.setData(oscafeJson.getData());
					oscafe.setSacas(oscafeJson.getSacas());
					oscafe.setPeso(oscafeJson.getPeso());
					oscafe.setInstrucoes(oscafeJson.getInstrucoes());
					oscafe.setObservacao(oscafeJson.getObservacao());
					
					oscafeDao.checkStatusDespejado(oscafe, null, session);
					
					mensagem = "Despejo salvo com sucesso!\n" + oscafe.getLote();
					
					JsonObject resposta = Json.createObjectBuilder()
								.add("status", "200")
								.add("mensagem", mensagem)
								.add("id", oscafe.getId())
								.add("indexStatus", Status.getStatusIndex(oscafe.getStatus()))
								.build();
					
					return resposta.toString();
					
				}
				else return ControllerUtil.getMessageError("Erro ao salvar, ID igual a zero!");
				
			}
				
		} catch (JsonGenerationException e) {
			return ControllerUtil.getMessageError(e.toString());
			
		} catch (IOException e) {
			return ControllerUtil.getMessageError(e.toString());
		}
		
	}
	
	@RequestMapping("listaOscafe")
	public @ResponseBody String lista(@RequestBody @Valid Relatorio relatorio,
									  BindingResult result) {
		
		if(result.hasFieldErrors()) {
			return ControllerUtil.getMessageError(result.getFieldError());
		}
		else {
			
			return Consulta.getJson(oscafeDao.getListaJSONArray(relatorio),
									oscafeDao.getTotalJSONObject(relatorio));
		
		}
		
	}
	
	@RequestMapping("achaOscafe")
	public @ResponseBody String acha(@RequestBody @Valid Id id,
									 BindingResult result) {
		
		if(result.hasFieldErrors()) {
			return ControllerUtil.getMessageError(result.getFieldError());
		}
		
		Oscafe oscafe = oscafeDao.buscaPorId(id.getId());
		
		JSONObject oscafeJSONObject = new JSONObject();
			
		int sacasDespejo = oscafeDespejoDao.getSacasDespejo(oscafe.getOscafeDespejos(), oscafeJSONObject);
		
		if (sacasDespejo == oscafe.getSacas()) {
			
			JSONObject loteJSONObject = new JSONObject();
			
			sacasDespejo = loteDao.getSacasDesdobras(oscafe.getLotes(), loteJSONObject);
			
			oscafeJSONObject = loteDao.juntaJSONObject(new JSONObject[]{oscafeJSONObject, loteJSONObject});
			
			if (sacasDespejo > 0) {
				
				JSONObject servcafeJSONObject = servcafeDao.getServcafeJSONObject(oscafe.getServcafes());
				
				oscafeJSONObject = loteDao.juntaJSONObject(new JSONObject[]{oscafeJSONObject, servcafeJSONObject});
				
			}
			
		}
		
		JSONObject jsonObject = oscafeDao.getJSONById(oscafe, oscafeJSONObject, sacasDespejo);
		
		jsonObject.put("status", "200");
		
		return jsonObject.toString();
		
	}
	
	@RequestMapping("removeOscafe")
	public @ResponseBody String remove(@RequestBody @Valid Id id,
									   BindingResult result) {
		
		if(result.hasFieldErrors()) {
			return ControllerUtil.getMessageError(result.getFieldError());
		}
		
		String status = "400";
		String mensagem = "Proibido remover!";
		
		Oscafe oscafe = oscafeDao.buscaPorId(id.getId());
		
		int dias = Data.getDaysDiff(oscafe.getData().getTime(),
			Data.StringToDate(Data.DataAtual()));
		
		if (dias <= 1 && oscafe.getOscafeDespejos() == null ||
			dias <= 1 && oscafe.getOscafeDespejos().isEmpty()) {
			
			oscafeDao.remove(id.getId());
			
			status = "200";
			mensagem = "Removido com sucesso!";
			
		}
		else {
					
			if (!oscafe.getOscafeDespejos().isEmpty() ||
				oscafe.getOscafeDespejos() != null) {
					
				mensagem += "\nPrimeiro remova os despejos!";
					
			}
			else mensagem += "\nFora da data permitida!";
			
		}
		
		return ControllerUtil.getMessage(status, mensagem);
		
	}

	@RequestMapping("getGuiaOscafe")
	public @ResponseBody String getGuiaOscafe() {
		
		Guia guia = guiaDao.buscaPorId(2);
						
		JSONObject dataJSON = new JSONObject();
		
		dataJSON.put("status", "200");
		dataJSON.put("data", Data.DataAtual());
		dataJSON.put("lote", guia.getGuia(guia.getId()));
		
		return dataJSON.toString();
		
	}
	
}
