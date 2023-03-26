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
import javax.servlet.http.HttpSession;
import java.io.IOException;
import javax.validation.Valid;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.core.JsonGenerationException;
import org.json.JSONObject;

import br.net.lls.componentes.Id;
import br.net.lls.componentes.ControllerUtil;
import br.net.lls.cafe.Status;
import br.net.lls.cafe.Lote;
import br.net.lls.cafe.Oscafe;
import br.net.lls.cafe.Oslote;
import br.net.lls.cafe.dao.LoteDao;
import br.net.lls.cafe.dao.OscafeDao;
import br.net.lls.fatcafe.dao.ServcafeDao;
import br.net.lls.cafe.controller.LoteOsloteController;

@Transactional
@Controller
public class OsloteController {
 
	@Autowired
	LoteDao loteDao;
 
	@Autowired
	OscafeDao oscafeDao;
	
	@Autowired
	ServcafeDao servcafeDao;
	
	@Autowired
	LoteOsloteController loteOsloteController;
	
	@Autowired
	SmartValidator validator;
	
	@RequestMapping("salvaOslote")
	public @ResponseBody String adiciona(@RequestBody String json,
										 BindingResult result,
										 HttpSession session) {
		
		try {
			
			ObjectMapper mapper = new ObjectMapper();
			
			JsonNode node = mapper.readTree(json);
			
			Oslote oslote = mapper.convertValue(node.get("cadastro"), Oslote.class);
			
			validator.validate(oslote, result, Oslote.OsloteValida.class);
			
			if(result.hasFieldErrors()) {
				return ControllerUtil.getMessageError(result.getFieldError());
			}
			else {
				
				Oscafe oscafe = oscafeDao.buscaPorId(oslote.getId());
				
				oscafe.setDesdobras(oslote.getDesdobras());
				oscafe.setSacasQuebra(oslote.getSacasQuebra());
				oscafe.setPesoQuebra(oslote.getPesoQuebra());
				oscafe.setSacasAcrescimo(oslote.getSacasAcrescimo());
				oscafe.setPesoAcrescimo(oslote.getPesoAcrescimo());
				
				oscafeDao.setStatusFechado(oscafe, true, session);
				
				if (oscafe.getId() > 0 && oscafe.getStatus() == Status.FECHADA) {
					
					return ControllerUtil.getMessageSuccess("Finalizada com sucesso!\n" + oscafe.getLote());
					
				}
			
			}
				
			return ControllerUtil.getMessageError("Erro ao salvar!");
			
		} catch (JsonGenerationException e) {
			return ControllerUtil.getMessageError(e.toString());
			
		} catch (IOException e) {
			return ControllerUtil.getMessageError(e.toString());
		}
		
	}
	
	@RequestMapping("achaOslote")
	public @ResponseBody String acha(@RequestBody @Valid Id id,
									 BindingResult result) {
		
		if(result.hasFieldErrors()) {
			return ControllerUtil.getMessageError(result.getFieldError());
		}
		
		Oscafe oscafe = oscafeDao.buscaPorId(id.getId());
		
		JSONObject oscafeJSONObject = new JSONObject();
			
		int sacasDesdobras = loteDao.getSacasDesdobras(oscafe.getLotes(), oscafeJSONObject);
		
		JSONObject servcafeJSONObject = servcafeDao.getServcafeJSONObject(oscafe.getServcafes());
			
		oscafeJSONObject = loteDao.juntaJSONObject(new JSONObject[]{oscafeJSONObject, servcafeJSONObject});
		
		JSONObject jsonObject = oscafeDao.getJSONById(oscafe, oscafeJSONObject);
		
		jsonObject.put("status", "200");
		
		return jsonObject.toString();
		
	}
	
	@RequestMapping("removeOslote")
	public @ResponseBody String remove(@RequestBody @Valid Id id,
									   BindingResult result,
									   HttpSession session) {
		
		return loteOsloteController.remove(id, result, session);
		
	}
	
}
