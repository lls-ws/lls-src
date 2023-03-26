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
import br.net.lls.cadastro.Preco;
import br.net.lls.cafe.Status;
import br.net.lls.cafe.Lote;
import br.net.lls.cafe.Saicafe;
import br.net.lls.cafe.Sailote;
import br.net.lls.cafe.dao.LoteDao;
import br.net.lls.cafe.dao.SaicafeDao;
import br.net.lls.fatcafe.dao.ServcafeDao;
import br.net.lls.cadastro.dao.PrecoDao;
import br.net.lls.cafe.controller.DespejoSaicafeController;

@Transactional
@Controller
public class SailoteController {
 
	@Autowired
	LoteDao loteDao;
 
	@Autowired
	SaicafeDao saicafeDao;
	
	@Autowired
	PrecoDao precoDao;
	
	@Autowired
	ServcafeDao servcafeDao;
	
	@Autowired
	DespejoSaicafeController despejoSaicafeController;
	
	@Autowired
	SmartValidator validator;
	
	@RequestMapping("salvaSailote")
	public @ResponseBody String adiciona(@RequestBody String json,
										 BindingResult result,
										 HttpSession session) {
		
		try {
			
			ObjectMapper mapper = new ObjectMapper();
			
			JsonNode node = mapper.readTree(json);
			
			Sailote sailote = mapper.convertValue(node.get("cadastro"), Sailote.class);
			
			validator.validate(sailote, result, Sailote.SailoteValida.class);
			
			if(result.hasFieldErrors()) {
				return ControllerUtil.getMessageError(result.getFieldError());
			}
			else {
				
				Saicafe saicafe = saicafeDao.buscaPorId(sailote.getId());
				
				saicafe.setSacas(sailote.getSacasDespejo());
				saicafe.setPeso(sailote.getPesoDespejo());
				saicafe.setSacasSaida(sailote.getSacas());
				saicafe.setPesoSaida(sailote.getPeso());
				saicafe.setTicket(sailote.getTicket());
				saicafe.setCobrar(sailote.getCobrar());
				saicafe.setObservacao(sailote.getObservacao());
				
				saicafeDao.setStatusFechado(saicafe, true, session);
				
				if (saicafe.getId() > 0 && saicafe.getStatus() == Status.FECHADA) {
					
					String msg = "Finalizada com sucesso!" + saicafe.getLote();
					
					Preco preco = precoDao.buscaPorId(19);
						
					msg += servcafeDao.criaServico(saicafe, preco);
						
					return ControllerUtil.getMessageSuccess(msg);
										
				}
				
			}
				
			return ControllerUtil.getMessageError("Erro ao salvar!");
			
		} catch (JsonGenerationException e) {
			return ControllerUtil.getMessageError(e.toString());
			
		} catch (IOException e) {
			return ControllerUtil.getMessageError(e.toString());
		}
		
	}
	
	@RequestMapping("achaSailote")
	public @ResponseBody String acha(@RequestBody @Valid Id id,
									 BindingResult result) {
		
		if(result.hasFieldErrors()) {
			return ControllerUtil.getMessageError(result.getFieldError());
		}
		
		Saicafe saicafe = saicafeDao.buscaPorId(id.getId());
		
		JSONObject saicafeJSONObject = new JSONObject();
			
		JSONObject jsonObject = saicafeDao.getJSONById(saicafe, saicafeJSONObject);
		
		jsonObject.put("status", "200");
		
		return jsonObject.toString();
		
	}
	
	@RequestMapping("removeSailote")
	public @ResponseBody String remove(@RequestBody String json,
									   BindingResult result,
									   HttpSession session) {
		
		return despejoSaicafeController.remove(json, result, session);
				
	}
	
}
