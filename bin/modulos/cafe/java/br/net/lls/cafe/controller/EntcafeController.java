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
import br.net.lls.cafe.Entcafe;
import br.net.lls.cafe.dao.EntcafeDao;
import br.net.lls.cafe.dao.GuiaDao;
import br.net.lls.cafe.dao.LoteDao;
import br.net.lls.fatcafe.dao.ServcafeDao;
import br.net.lls.fatcafe.dao.CafeDao;
import br.net.lls.fatcafe.dao.FatcafeDao;

@Transactional
@Controller
public class EntcafeController {
 
	@Autowired
	EntcafeDao entcafeDao;
	
	@Autowired
	LoteDao loteDao;
	
	@Autowired
	ServcafeDao servcafeDao;
	
	@Autowired
	CafeDao cafeDao;
	
	@Autowired
	FatcafeDao fatcafeDao;
	
	@Autowired
	FazendaProdutorDao fazendaProdutorDao;
	
	@Autowired
	GuiaDao guiaDao;
	
	@Autowired
	SmartValidator validator;
	
	@RequestMapping("salvaEntcafe")
	public @ResponseBody String adiciona(@RequestBody String json,
										 BindingResult result,
										 HttpSession session) {
		
		try {
			
			ObjectMapper mapper = new ObjectMapper();
			
			JsonNode node = mapper.readTree(json);
			
			Entcafe entcafe = mapper.convertValue(node.get("cadastro"), Entcafe.class);
			
			validator.validate(entcafe, result, Entcafe.EntcafeValida.class);
			
			if(result.hasFieldErrors()) {
				return ControllerUtil.getMessageError(result.getFieldError());
			}
			else {
			
				Id idFazendaProdutor = mapper.convertValue(node.get("idFazenda"), Id.class);
					
				validator.validate(idFazendaProdutor, result, Id.IdValida.class);
				
				if(result.hasFieldErrors()) {
					return ControllerUtil.getMessageError(result.getFieldError());
				}
				else {
				
					FazendaProdutor fazendaProdutor = fazendaProdutorDao.buscaPorId(idFazendaProdutor.getId());
				
					entcafe.setFazendaProdutor(fazendaProdutor);
					
					Usuario usuario = (Usuario) session.getAttribute("usuarioLogado");
			
					entcafe.setUsuario(usuario.getEmail());
					
					if (entcafe.getPeso() == null) {
							
						entcafe.setPeso(new BigDecimal(0.00));
						
					}
					
					String mensagem = "";
					
					if (entcafe.getId() == 0) {
						
						Guia guia = guiaDao.buscaPorId(1);
						
						entcafe.setLote(guia.getGuia(guia.getId()));
						
						entcafeDao.adiciona(entcafe);
						
						guiaDao.soma(1);
						
						cafeDao.criaCafe(idFazendaProdutor.getId(), fatcafeDao.getDataFatEmpresa());
						
						mensagem = "Entrada salva com sucesso!" + entcafe.getLote();
						
					}
					else {
						
						Entcafe entcafeAtual = entcafeDao.buscaPorId(entcafe.getId());
						
						entcafe.setSacas(entcafeAtual.getSacas());
						entcafe.setPeso(entcafeAtual.getPeso());
						entcafe.setPesos(entcafeAtual.getPesos());
						
						entcafeDao.altera(entcafe);
						
						mensagem = "Entrada alterada com sucesso!" + entcafe.getLote();
						
					}
					
					return ControllerUtil.getMessageSuccess(mensagem, String.valueOf(entcafe.getId()));
					
				}
				
			}
				
		} catch (JsonGenerationException e) {
			return ControllerUtil.getMessageError(e.toString());
			
		} catch (IOException e) {
			return ControllerUtil.getMessageError(e.toString());
		}
		
	}
	
	@RequestMapping("listaEntcafe")
	public @ResponseBody String lista(@RequestBody @Valid Relatorio relatorio,
									  BindingResult result) {
		
		if(result.hasFieldErrors()) {
			return ControllerUtil.getMessageError(result.getFieldError());
		}
		else {
			
			return Consulta.getJson(entcafeDao.getListaJSONArray(relatorio),
									entcafeDao.getTotalJSONObject(relatorio));
		
		}
		
	}
	
	@RequestMapping("achaEntcafe")
	public @ResponseBody String acha(@RequestBody @Valid Id id,
									 BindingResult result) {
		
		if(result.hasFieldErrors()) {
			return ControllerUtil.getMessageError(result.getFieldError());
		}
		
		Entcafe entcafe = entcafeDao.buscaPorId(id.getId());
		
		JSONObject entcafeJSONObject = new JSONObject();
			
		int sacasDesdobras = loteDao.getSacasDesdobras(entcafe.getLotes(), entcafeJSONObject);
		
		if (sacasDesdobras == entcafe.getSacas()) {
			
			JSONObject servcafeJSONObject = servcafeDao.getServcafeJSONObject(entcafe.getServcafes());
			
			entcafeJSONObject = loteDao.juntaJSONObject(new JSONObject[]{entcafeJSONObject, servcafeJSONObject});
			
		}
		
		JSONObject jsonObject = entcafeDao.getJSONById(entcafe, entcafeJSONObject, sacasDesdobras);
		
		jsonObject.put("status", "200");
		
		return jsonObject.toString();
		
	}
	
	@RequestMapping("removeEntcafe")
	public @ResponseBody String remove(@RequestBody @Valid Id id,
									   BindingResult result) {
		
		if(result.hasFieldErrors()) {
			return ControllerUtil.getMessageError(result.getFieldError());
		}
		
		String status = "400";
		String mensagem = "Proibido remover!";
		
		Entcafe entcafe = entcafeDao.buscaPorId(id.getId());
		
		int dias = Data.getDaysDiff(entcafe.getData().getTime(),
			Data.StringToDate(Data.DataAtual()));
		
		if (dias <= 1 && entcafe.getLotes() == null ||
			dias <= 1 && entcafe.getLotes().isEmpty()) {
			
			entcafeDao.remove(id.getId());
			
			status = "200";
			mensagem = "Removido com sucesso!";
			
		}
		else {
			
			if (!entcafe.getLotes().isEmpty() ||
				entcafe.getLotes() != null) {
					
				mensagem += "\nPrimeiro remova as desdobras!";
					
			}
			else mensagem += "\nFora da data permitida!";
			
		}
		
		return ControllerUtil.getMessage(status, mensagem);
		
	}
	
	@RequestMapping("getGuiaEntcafe")
	public @ResponseBody String getGuiaEntcafe() {
		
		Guia guia = guiaDao.buscaPorId(1);
						
		JSONObject dataJSON = new JSONObject();
		
		dataJSON.put("status", "200");
		dataJSON.put("data", Data.DataAtual());
		dataJSON.put("lote", guia.getGuia(guia.getId()));
		
		return dataJSON.toString();
		
	}
	
}
