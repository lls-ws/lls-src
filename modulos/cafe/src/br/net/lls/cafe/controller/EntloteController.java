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
import br.net.lls.cafe.Lote;
import br.net.lls.cafe.Entcafe;
import br.net.lls.cafe.Entlote;
import br.net.lls.cafe.dao.LoteDao;
import br.net.lls.cafe.dao.EntcafeDao;
import br.net.lls.fatcafe.dao.ServcafeDao;
import br.net.lls.cadastro.dao.PrecoDao;
import br.net.lls.cafe.controller.LoteEntloteController;

@Transactional
@Controller
public class EntloteController {
 
	@Autowired
	LoteDao loteDao;
 
	@Autowired
	EntcafeDao entcafeDao;
	
	@Autowired
	PrecoDao precoDao;
	
	@Autowired
	ServcafeDao servcafeDao;
	
	@Autowired
	LoteEntloteController loteEntloteController;
	
	@Autowired
	SmartValidator validator;
	
	@RequestMapping("salvaEntlote")
	public @ResponseBody String adiciona(@RequestBody String json,
										 BindingResult result,
										 HttpSession session) {
		
		try {
			
			ObjectMapper mapper = new ObjectMapper();
			
			JsonNode node = mapper.readTree(json);
			
			Entlote entlote = mapper.convertValue(node.get("cadastro"), Entlote.class);
			
			validator.validate(entlote, result, Entlote.EntloteValida.class);
			
			if(result.hasFieldErrors()) {
				return ControllerUtil.getMessageError(result.getFieldError());
			}
			else {
				
				Entcafe entcafe = entcafeDao.buscaPorId(entlote.getId());
				
				entcafeDao.checkFechado(entcafe, entlote, session);
					
				if (entcafe.getId() > 0 && entcafe.getFechado()) {
					
					String msg = "Desdobra salva com sucesso!" + entcafe.getLote();
					
					Preco preco = precoDao.buscaPorId(18);
						
					msg += servcafeDao.criaServico(entcafe, preco);
						
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
	
	@RequestMapping("achaEntlote")
	public @ResponseBody String acha(@RequestBody @Valid Id id,
									 BindingResult result) {
		
		if(result.hasFieldErrors()) {
			return ControllerUtil.getMessageError(result.getFieldError());
		}
		
		Entcafe entcafe = entcafeDao.buscaPorId(id.getId());
		
		JSONObject entcafeJSONObject = new JSONObject();
			
		int sacasDesdobras = loteDao.getSacasDesdobras(entcafe.getLotes(), entcafeJSONObject);
		
		JSONObject jsonObject = entcafeDao.getJSONById(entcafe, entcafeJSONObject);
		
		jsonObject.put("status", "200");
		
		return jsonObject.toString();
		
	}
	
	@RequestMapping("removeEntlote")
	public @ResponseBody String remove(@RequestBody @Valid Id id,
									   BindingResult result,
									   HttpSession session) {
		
		return loteEntloteController.remove(id, result, session);
		
	}
	
}
