package br.net.lls.fatcafe.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.SmartValidator;
import java.util.Set;
import java.util.List;
import java.lang.Object;
import java.math.BigDecimal;
import org.json.JSONArray;
import org.json.JSONObject;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.core.JsonGenerationException;
import java.io.IOException;
import javax.validation.Valid;
import javax.json.JsonObject;
import javax.json.Json;
import javax.servlet.http.HttpSession;

import br.net.lls.componentes.Id;
import br.net.lls.componentes.Data;
import br.net.lls.componentes.Relatorio;
import br.net.lls.componentes.Consulta;
import br.net.lls.componentes.ControllerUtil;
import br.net.lls.cadastro.FazendaProdutor;
import br.net.lls.cadastro.dao.FazendaProdutorDao;
import br.net.lls.cadastro.Usuario;
import br.net.lls.cadastro.Preco;
import br.net.lls.fatcafe.Servcafe;
import br.net.lls.cadastro.dao.PrecoDao;
import br.net.lls.fatcafe.dao.ServcafeDao;
import br.net.lls.fatcafe.dao.BaixacafeDao;
import br.net.lls.fatcafe.controller.ServcafeOsloteController;
import br.net.lls.fatcafe.dao.CafeDao;
import br.net.lls.fatcafe.dao.FatcafeDao;
import br.net.lls.cafe.dao.ConsultaSql;

@Transactional
@Controller
public class ServcafeController {
 
	@Autowired
	ServcafeDao servcafeDao;
	
	@Autowired
	CafeDao cafeDao;
	
	@Autowired
	FatcafeDao fatcafeDao;
	
	@Autowired
	BaixacafeDao baixacafeDao;
	
	@Autowired
	PrecoDao precoDao;
	
	@Autowired
	FazendaProdutorDao fazendaProdutorDao;
	
	@Autowired
	SmartValidator validator;
	
	@Autowired
	ServcafeOsloteController servcafeOsloteController;
	
	@RequestMapping("salvaServicocafe")
	public @ResponseBody String adiciona(@RequestBody String json,
										 BindingResult result,
										 HttpSession session) {
		
		try {
			
			ObjectMapper mapper = new ObjectMapper();
			
			JsonNode node = mapper.readTree(json);
			
			Servcafe servcafe = mapper.convertValue(node.get("cadastro"), Servcafe.class);
			
			validator.validate(servcafe, result, Servcafe.ServcafeValida.class);
			
			if(result.hasFieldErrors()) {
				return ControllerUtil.getMessageError(result.getFieldError());
			}
			else {
			
				Id idPreco = mapper.convertValue(node.get("idPreco"), Id.class);
				
				validator.validate(idPreco, result, Id.IdValida.class);
				
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
					
						Preco preco = precoDao.buscaPorId(idPreco.getId());
					
						FazendaProdutor fazendaProdutor = fazendaProdutorDao.buscaPorId(idFazendaProdutor.getId());
					
						servcafe.setPreco(preco);
						servcafe.setFazendaProdutor(fazendaProdutor);
						
						String mensagem = "";
						
						if (servcafe.getId() == 0) {
							
							servcafeDao.adiciona(servcafe);
							
							cafeDao.criaCafe(idFazendaProdutor.getId(), fatcafeDao.getDataFatEmpresa());
							
							mensagem = "Salvo com sucesso!";
							
						}
						else {
							
							servcafe.setAutomatico(false);
							
							servcafeDao.altera(servcafe);
							
							mensagem = "Alterado com sucesso!";
							
						}
						
						return ControllerUtil.getMessageSuccess(mensagem, String.valueOf(servcafe.getId()));
						
					}
					
				}
				
			}
			
		} catch (JsonGenerationException e) {
			return ControllerUtil.getMessageError(e.toString());
			
		} catch (IOException e) {
			return ControllerUtil.getMessageError(e.toString());
		}
	}
	
	@RequestMapping("listaServicocafe")
	public @ResponseBody String servico(@RequestBody @Valid Relatorio relatorio,
										  BindingResult result) {
		
		if(result.hasFieldErrors()) {
			return ControllerUtil.getMessageError(result.getFieldError());
		}
		else {
			
			return Consulta.getJson(servcafeDao.getListaJSONArray(relatorio),
									servcafeDao.getTotalJSONObject(relatorio));
			
		}
		
	}
	
	@RequestMapping("achaServicocafe")
	public @ResponseBody String acha(@RequestBody @Valid Id id,
									 BindingResult result) {
		
		if(result.hasFieldErrors()) {
			return ControllerUtil.getMessageError(result.getFieldError());
		}
		
		Servcafe servcafe = servcafeDao.buscaPorId(id.getId());
		
		JSONObject servcafeJSONObject = new JSONObject();
			
		BigDecimal valorPago = baixacafeDao.getValorPago(servcafe.getBaixacafe(), servcafeJSONObject);
		
		JSONObject jsonObject = servcafeDao.getJSONById(servcafe, servcafeJSONObject, valorPago);
		
		jsonObject.put("status", "200");
		
		return jsonObject.toString();
		
	}
	
	@RequestMapping("removeServicocafe")
	public @ResponseBody String remove(@RequestBody @Valid Id id,
									   BindingResult result) {
		
		if(result.hasFieldErrors()) {
			return ControllerUtil.getMessageError(result.getFieldError());
		}
		
		String status = "400";
		String mensagem = "Proibido remover!";
		
		Servcafe servcafe = servcafeDao.buscaPorId(id.getId());
		
		if (servcafe.getEntcafes().isEmpty() && servcafe.getSaicafes().isEmpty() && servcafe.getOscafes().isEmpty()) {
		
			int dias = Data.getDaysDiff(servcafe.getData().getTime(),
					   Data.StringToDate(Data.DataAtual()));
			
			if (dias <= ConsultaSql.getDiasPermitidos() && servcafe.getBaixacafe().isEmpty() || 
				dias <= ConsultaSql.getDiasPermitidos() && servcafe.getBaixacafe() == null) {
			
				servcafeDao.remove(id.getId());
			
				status = "200";
				mensagem = "Removido com sucesso!";
				
			}
			else {
					
				if (!servcafe.getBaixacafe().isEmpty()) {
						
					mensagem += "\nPrimeiro remova o pagamento!";
						
				}
				else mensagem += "\nFora da data permitida!";
				
			}
			
			return ControllerUtil.getMessage(status, mensagem);
		
		}
		else {
			
			if (!servcafe.getEntcafes().isEmpty()) {
				
				return servcafeOsloteController.removeEntrada(id, result);
				
			}
			else if (!servcafe.getSaicafes().isEmpty()) {
				
				return servcafeOsloteController.removeSaida(id, result);
				
			}
			else if (!servcafe.getOscafes().isEmpty()) {
				
				return servcafeOsloteController.remove(id, result);
				
			}
			
			mensagem += "Erro ao tentar remover!";
			
			return ControllerUtil.getMessage(status, mensagem);
			
		}
		
	}

	@RequestMapping("listaSintetizacafe")
	public @ResponseBody String sintetiza(@RequestBody @Valid Relatorio relatorio,
										  BindingResult result) {
		
		if(result.hasFieldErrors()) {
			return ControllerUtil.getMessageError(result.getFieldError());
		}
		else {
			
			return Consulta.getJson(servcafeDao.getListaSintetizadoJSONArray(relatorio),
									servcafeDao.getTotalSintetizadoJSONObject(relatorio));
			
		}
		
	}

}
