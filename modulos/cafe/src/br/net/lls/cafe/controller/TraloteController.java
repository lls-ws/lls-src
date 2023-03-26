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
import br.net.lls.cafe.Tracafe;
import br.net.lls.cafe.Tralote;
import br.net.lls.cafe.dao.LoteDao;
import br.net.lls.cafe.dao.TracafeDao;
import br.net.lls.cafe.controller.LoteTraloteController;

@Transactional
@Controller
public class TraloteController {
 
	@Autowired
	LoteDao loteDao;
 
	@Autowired
	TracafeDao tracafeDao;
	
	@Autowired
	LoteTraloteController loteTraloteController;
	
	@Autowired
	SmartValidator validator;
	
	@RequestMapping("salvaTralote")
	public @ResponseBody String adiciona(@RequestBody String json,
										 BindingResult result,
										 HttpSession session) {
		
		try {
			
			ObjectMapper mapper = new ObjectMapper();
			
			JsonNode node = mapper.readTree(json);
			
			Tralote tralote = mapper.convertValue(node.get("cadastro"), Tralote.class);
			
			validator.validate(tralote, result, Tralote.TraloteValida.class);
			
			if(result.hasFieldErrors()) {
				return ControllerUtil.getMessageError(result.getFieldError());
			}
			else {
				
				Tracafe tracafe = tracafeDao.buscaPorId(tralote.getId());
				
				tracafe.setDesdobras(tralote.getDesdobras());
				
				tracafeDao.setStatusFechado(tracafe, true, session);
				
				if (tracafe.getId() > 0 && tracafe.getStatus() == Status.FECHADA) {
					
					return ControllerUtil.getMessageSuccess("Finalizada com sucesso!\n" + tracafe.getLote());
					
				}
			
			}
				
			return ControllerUtil.getMessageError("Erro ao salvar!");
			
		} catch (JsonGenerationException e) {
			return ControllerUtil.getMessageError(e.toString());
			
		} catch (IOException e) {
			return ControllerUtil.getMessageError(e.toString());
		}
		
	}
	
	@RequestMapping("achaTralote")
	public @ResponseBody String acha(@RequestBody @Valid Id id,
									 BindingResult result) {
		
		if(result.hasFieldErrors()) {
			return ControllerUtil.getMessageError(result.getFieldError());
		}
		
		Tracafe tracafe = tracafeDao.buscaPorId(id.getId());
		
		JSONObject tracafeJSONObject = new JSONObject();
			
		int sacasDesdobras = loteDao.getSacasDesdobras(tracafe.getLotes(), tracafeJSONObject);
		
		JSONObject jsonObject = tracafeDao.getJSONById(tracafe, tracafeJSONObject);
		
		jsonObject.put("status", "200");
		
		return jsonObject.toString();
		
	}
	
	@RequestMapping("removeTralote")
	public @ResponseBody String remove(@RequestBody @Valid Id id,
									   BindingResult result,
									   HttpSession session) {
		
		return loteTraloteController.remove(id, result, session);
		
	}
	
}
