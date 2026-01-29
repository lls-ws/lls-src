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
import br.net.lls.cadastro.Usuario;
import br.net.lls.cadastro.FazendaProdutor;
import br.net.lls.cadastro.dao.FazendaProdutorDao;
import br.net.lls.cafe.Guia;
import br.net.lls.cafe.Status;
import br.net.lls.cafe.Saicafe;
import br.net.lls.cafe.dao.GuiaDao;
import br.net.lls.cafe.dao.SaicafeDao;
import br.net.lls.cafe.dao.SaicafeDespejoDao;
import br.net.lls.cafe.dao.LoteDao;
import br.net.lls.fatcafe.dao.ServcafeDao;
import br.net.lls.cafe.dao.ConsultaSql;

@Transactional
@Controller
public class SaicafeController {
 
	@Autowired
	SaicafeDao saicafeDao;
	
	@Autowired
	SaicafeDespejoDao saicafeDespejoDao;
	
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
	
	@RequestMapping("salvaSaicafe")
	public @ResponseBody String adiciona(@RequestBody String json,
										 BindingResult result,
										 HttpSession session) {
		
		try {
			
			ObjectMapper mapper = new ObjectMapper();
			
			JsonNode node = mapper.readTree(json);
			
			Saicafe saicafeJson = mapper.convertValue(node.get("cadastro"), Saicafe.class);
			
			validator.validate(saicafeJson, result, Saicafe.SaicafeValida.class);
			
			if(result.hasFieldErrors()) {
				return ControllerUtil.getMessageError(result.getFieldError());
			}
			else {
			
				String mensagem = "";
				
				if (saicafeJson.getId() > 0) {
					
					Saicafe saicafe = saicafeDao.buscaPorId(saicafeJson.getId());
					
					saicafe.setData(saicafeJson.getData());
					saicafe.setSacas(saicafeJson.getSacas());
					saicafe.setPeso(saicafeJson.getPeso());
					saicafe.setDestino(saicafeJson.getDestino());
					saicafe.setObservacao(saicafeJson.getObservacao());
					
					saicafeDao.checkStatusDespejado(saicafe, null, session);
					
					mensagem = "Salvo com sucesso!\n" + saicafe.getLote();
					
					JsonObject resposta = Json.createObjectBuilder()
								.add("status", "200")
								.add("mensagem", mensagem)
								.add("id", saicafe.getId())
								.add("indexStatus", Status.getStatusIndex(saicafe.getStatus()))
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
	
	@RequestMapping("listaSaicafe")
	public @ResponseBody String lista(@RequestBody @Valid Relatorio relatorio,
									  BindingResult result) {
		
		if(result.hasFieldErrors()) {
			return ControllerUtil.getMessageError(result.getFieldError());
		}
		else {
			
			return Consulta.getJson(saicafeDao.getListaJSONArray(relatorio),
									saicafeDao.getTotalJSONObject(relatorio));
		
		}
		
	}
	
	@RequestMapping("achaSaicafe")
	public @ResponseBody String acha(@RequestBody @Valid Id id,
									 BindingResult result) {
		
		if(result.hasFieldErrors()) {
			return ControllerUtil.getMessageError(result.getFieldError());
		}
		
		Saicafe saicafe = saicafeDao.buscaPorId(id.getId());
		
		JSONObject saicafeJSONObject = new JSONObject();
			
		int sacasDespejo = saicafeDespejoDao.getSacasDespejo(saicafe.getSaicafeDespejos(), saicafeJSONObject);
		
		if (sacasDespejo == saicafe.getSacas()) {
			
			JSONObject servcafeJSONObject = servcafeDao.getServcafeJSONObject(saicafe.getServcafes());
			
			saicafeJSONObject = loteDao.juntaJSONObject(new JSONObject[]{saicafeJSONObject, servcafeJSONObject});
			
		}
		
		JSONObject jsonObject = saicafeDao.getJSONById(saicafe, saicafeJSONObject, sacasDespejo);
		
		jsonObject.put("status", "200");
		
		return jsonObject.toString();
		
	}
	
	@RequestMapping("removeSaicafe")
	public @ResponseBody String remove(@RequestBody @Valid Id id,
									   BindingResult result) {
		
		if(result.hasFieldErrors()) {
			return ControllerUtil.getMessageError(result.getFieldError());
		}
		
		String status = "400";
		String mensagem = "Proibido remover!";
		
		Saicafe saicafe = saicafeDao.buscaPorId(id.getId());
		
		int dias = Data.getDaysDiff(saicafe.getData().getTime(),
			Data.StringToDate(Data.DataAtual()));
		
		if (dias <= ConsultaSql.getDiasPermitidos() && saicafe.getSaicafeDespejos() == null ||
			dias <= ConsultaSql.getDiasPermitidos() && saicafe.getSaicafeDespejos().isEmpty()) {
			
			saicafeDao.remove(id.getId());
			
			status = "200";
			mensagem = "Removido com sucesso!";
			
		}
		else {
					
			if (!saicafe.getSaicafeDespejos().isEmpty()) {
					
				mensagem += "\nPrimeiro remova os despejos!";
					
			}
			else mensagem += "\nFora da data permitida!";
			
		}
		
		return ControllerUtil.getMessage(status, mensagem);
		
	}
	
	@RequestMapping("getGuiaSaicafe")
	public @ResponseBody String getGuiaSaicafe() {
		
		Guia guia = guiaDao.buscaPorId(3);
						
		JSONObject dataJSON = new JSONObject();
		
		dataJSON.put("status", "200");
		dataJSON.put("data", Data.DataAtual());
		dataJSON.put("lote", guia.getGuia(guia.getId()));
		
		return dataJSON.toString();
		
	}
	
}
