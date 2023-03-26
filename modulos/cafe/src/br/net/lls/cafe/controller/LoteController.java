package br.net.lls.cafe.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.SmartValidator;
import java.util.List;
import java.util.Iterator;
import javax.validation.Valid;
import org.json.JSONArray;
import org.json.JSONObject;

import br.net.lls.componentes.Id;
import br.net.lls.componentes.Consulta;
import br.net.lls.componentes.Relatorio;
import br.net.lls.componentes.ControllerUtil;
import br.net.lls.cafe.dao.LoteDao;

@Transactional
@Controller
public class LoteController {
 
	@Autowired
	LoteDao loteDao;
	
	@RequestMapping("listaProcuraLote")
	public @ResponseBody String listaProcura(@RequestBody @Valid Id id,
											 BindingResult result) {
		
		if(result.hasFieldErrors()) {
			return ControllerUtil.getMessageError(result.getFieldError());
		}
		else {
			
			List loteList = loteDao.getListaProcura(1, id.getNome(), id.getId());
			
			JSONArray lotesArray = new JSONArray(loteList);
						
			JSONObject jsonList = new JSONObject();
			
			jsonList.put("cadastros", lotesArray);
			
			jsonList.put("status", "200");
			
			return jsonList.toString();
			
		}
		
	}
	
	@RequestMapping("achaLote")
	public @ResponseBody String acha(@RequestBody @Valid Id id,
									 BindingResult result) {
		
		if(result.hasFieldErrors()) {
			return ControllerUtil.getMessageError(result.getFieldError());
		}
		
		List loteList = loteDao.getListById(id.getId());
		
		JSONObject loteJSON = new JSONObject();
		
		for (Iterator iterator = loteList.iterator(); iterator.hasNext();) {
			
			Object[] list = (Object[]) iterator.next();
			
			loteJSON.put("status", "200");
			loteJSON.put("id", list[0]);
			loteJSON.put("lote", list[1]);
			loteJSON.put("sacas", list[2]);
			loteJSON.put("peso", list[3]);
			loteJSON.put("observacao", list[4]);
			loteJSON.put("pilha", list[5]);
			loteJSON.put("idPeneira", list[6]);
			loteJSON.put("peneira", list[7]);
			
		}
		
		return loteJSON.toString();
		
	}
	
	@RequestMapping("listaExtratocafe")
	public @ResponseBody String listaExtrato(@RequestBody @Valid Relatorio relatorio,
											 BindingResult result) {
		
		if(result.hasFieldErrors()) {
			return ControllerUtil.getMessageError(result.getFieldError());
		}
		else {
			
			if (relatorio.getIdFazenda() > 0 || relatorio.getIdProdutor() > 0) {
			
				return Consulta.getJson(loteDao.getListaJSONArray(relatorio),
										loteDao.getTotalJSONObject(relatorio));
										
			}
			else {
				
				JSONArray rodapeJSONArray = new JSONArray();
				
				JSONObject totalJSONObject = loteDao.getTotalJSONObject(relatorio);
				
				JSONArray cadastrosJSONArray = new JSONArray();
				
				JSONObject jsonObject = new JSONObject();
				
				jsonObject.put("id", 0);
				jsonObject.put("data", "");
				jsonObject.put("lote", "");
				jsonObject.put("observacao", "");
				jsonObject.put("pilha", "");
				jsonObject.put("sacas", totalJSONObject.get("sacas").toString());
				jsonObject.put("peso", totalJSONObject.get("peso"));
				jsonObject.put("peneira", "");
				jsonObject.put("produtor", "");
				jsonObject.put("fazenda", "");
				
				cadastrosJSONArray.put(jsonObject);
				
				rodapeJSONArray.put(totalJSONObject);
				
				JSONObject jsonList = new JSONObject();
				
				jsonList.put("cadastros", cadastrosJSONArray);
				
				jsonList.put("paginas", 1);
				
				jsonList.put("rodape", rodapeJSONArray);
				
				jsonList.put("status", "200");
				
				return jsonList.toString();
				
			}
			
		}
		
	}
	
	@RequestMapping("listaSaldocafe")
	public @ResponseBody String listaSaldo(@RequestBody @Valid Relatorio relatorio,
									  BindingResult result) {
		
		if(result.hasFieldErrors()) {
			return ControllerUtil.getMessageError(result.getFieldError());
		}
		else {
			
			return Consulta.getJson(loteDao.getSaldoJSONArray(relatorio),
									loteDao.getTotalSaldoJSONObject(relatorio));
			
		}
		
	}
	
}
