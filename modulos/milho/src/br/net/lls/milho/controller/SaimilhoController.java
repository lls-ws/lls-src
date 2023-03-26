package br.net.lls.milho.controller;

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
import br.net.lls.componentes.Data;
import br.net.lls.componentes.Relatorio;
import br.net.lls.componentes.Consulta;
import br.net.lls.componentes.ControllerUtil;
import br.net.lls.cadastro.FazendaProdutor;
import br.net.lls.cadastro.dao.FazendaProdutorDao;
import br.net.lls.milho.Saimilho;
import br.net.lls.milho.dao.SaimilhoDao;
import br.net.lls.milho.dao.MilhoDao;

import java.util.List;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;
import java.lang.Object;
import java.math.BigDecimal;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.core.JsonGenerationException;

import org.json.JSONArray;
import org.json.JSONObject;

@Transactional
@Controller
public class SaimilhoController {
 
	@Autowired
	SaimilhoDao saimilhoDao;
	
	@Autowired
	MilhoDao milhoDao;
	
	@Autowired
	FazendaProdutorDao fazendaProdutorDao;
	
	@Autowired
	SmartValidator validator;
	
	@RequestMapping("salvaSaimilho")
	public @ResponseBody String adiciona(@RequestBody String json,
										 BindingResult result) {
		
		String status = "";
		String mensagem = "";
		
		try {
			
			ObjectMapper mapper = new ObjectMapper();
			
			JsonNode node = mapper.readTree(json);
			
			Saimilho saimilho = mapper.convertValue(node.get("saimilho"), Saimilho.class);
			
			validator.validate(saimilho, result, Saimilho.SaimilhoValida.class);
			
			Id idFazendaProdutor = mapper.convertValue(node.get("fazendaProdutor"), Id.class);
				
			validator.validate(idFazendaProdutor, result, Id.IdValida.class);
			
			if(result.hasFieldErrors()) {
				return ControllerUtil.getMessageError(result.getFieldError());
			}
			else {
				
				FazendaProdutor fazendaProdutor = fazendaProdutorDao.buscaPorId(idFazendaProdutor.getId());
			
				saimilho.setFazendaProdutor(fazendaProdutor);
				
				if (saimilho.getId() == 0) {
					
					saimilhoDao.adiciona(saimilho);
					
					milhoDao.setSaldoSaida(saimilho, idFazendaProdutor.getId());
					
					return ControllerUtil.getMessageSuccess("0");
					
				}
				
			}
			
			return ControllerUtil.getMessageError("Erro ao salvar!");
			
		} catch (JsonGenerationException e) {
			return ControllerUtil.getMessageError(e.toString());
			
		} catch (IOException e) {
			return ControllerUtil.getMessageError(e.toString());
		}
		
	}
	
	@RequestMapping("listaSaimilho")
	public @ResponseBody String lista(@RequestBody @Valid Relatorio relatorio,
									  BindingResult result) {
		
		if(result.hasFieldErrors()) {
			return ControllerUtil.getMessageError(result.getFieldError());
		}
		else {
			
			List saldoList = milhoDao.getSaldo(relatorio);
			
			return Consulta.getJson(saimilhoDao.getListaJSONArray(relatorio),
									saimilhoDao.getTotalSaldoJSONObject(relatorio, saldoList));
			
		}
		
	}
	
	@RequestMapping("achaSaimilho")
	public @ResponseBody String acha(@RequestBody @Valid Id id,
									 BindingResult result) {
		
		if(result.hasFieldErrors()) {
			return ControllerUtil.getMessageError(result.getFieldError());
		}
		
		List saimilhoList = saimilhoDao.getListById(id.getId());
		
		JSONObject saimilhoJSON = new JSONObject();
		
		for (Iterator iterator = saimilhoList.iterator(); iterator.hasNext();) {
			
			Object[] list = (Object[]) iterator.next();
			
			saimilhoJSON.put("status", "200");
			saimilhoJSON.put("id", list[0]);
			saimilhoJSON.put("data", list[1]);
			saimilhoJSON.put("laudo", list[2]);
			saimilhoJSON.put("produtor", list[3]);
			saimilhoJSON.put("fazenda", list[4]);
			saimilhoJSON.put("tiket", list[5]);
			saimilhoJSON.put("placa", list[6]);
			saimilhoJSON.put("liquido", list[7]);
			saimilhoJSON.put("obs", list[8]);
			saimilhoJSON.put("cilo", list[9]);
			saimilhoJSON.put("destino", list[10]);
			
		}
		
		return saimilhoJSON.toString();
		
	}
	
	@RequestMapping("removeSaimilho")
	public @ResponseBody String remove(@RequestBody @Valid Id id,
									   BindingResult result) {
		
		if(result.hasFieldErrors()) {
			return ControllerUtil.getMessageError(result.getFieldError());
		}
		
		String status = "";
		String mensagem = "";
		
		Saimilho saimilho = saimilhoDao.buscaPorId(id.getId());
		
		int dias = Data.getDaysDiff(saimilho.getData().getTime(), Data.StringToDate(Data.DataAtual()));
		
		if (dias == 0) {
		
			FazendaProdutor fazendaProdutor = saimilho.getFazendaProdutor();
			
			milhoDao.removeSaldoSaida(saimilho, fazendaProdutor.getId());
			
			saimilhoDao.remove(id.getId());
			
			status = "200";
			mensagem = "Removido com sucesso!";
		
		}
		else {
			
			status = "400";
			mensagem = "Proibido remover!";
			
		}
		
		return ControllerUtil.getMessage(status, mensagem);
		
	}
	
}
