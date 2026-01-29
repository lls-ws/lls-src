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

import br.net.lls.componentes.Id;
import br.net.lls.componentes.Data;
import br.net.lls.componentes.Relatorio;
import br.net.lls.componentes.Consulta;
import br.net.lls.componentes.ControllerUtil;
import br.net.lls.cadastro.FazendaProdutor;
import br.net.lls.cadastro.dao.FazendaProdutorDao;
import br.net.lls.cadastro.Usuario;
import br.net.lls.cadastro.Preco;
import br.net.lls.cafe.Entcafe;
import br.net.lls.cafe.Saicafe;
import br.net.lls.cafe.Oscafe;
import br.net.lls.fatcafe.Servcafe;
import br.net.lls.cadastro.dao.PrecoDao;
import br.net.lls.cafe.dao.EntcafeDao;
import br.net.lls.cafe.dao.SaicafeDao;
import br.net.lls.cafe.dao.OscafeDao;
import br.net.lls.fatcafe.dao.ServcafeDao;
import br.net.lls.fatcafe.dao.BaixacafeDao;
import br.net.lls.cafe.dao.ConsultaSql;

@Transactional
@Controller
public class ServcafeOsloteController {
 
	@Autowired
	ServcafeDao servcafeDao;
	
	@Autowired
	BaixacafeDao baixacafeDao;
	
	@Autowired
	EntcafeDao entcafeDao;
	
	@Autowired
	SaicafeDao saicafeDao;
	
	@Autowired
	OscafeDao oscafeDao;
	
	@Autowired
	PrecoDao precoDao;
	
	@Autowired
	FazendaProdutorDao fazendaProdutorDao;
	
	@Autowired
	SmartValidator validator;
	
	@RequestMapping("salvaServcafeOslote")
	public @ResponseBody String adiciona(@RequestBody String json,
									     BindingResult result) {
		
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
					
					Id idOscafe = mapper.convertValue(node.get("idOscafe"), Id.class);
				
					validator.validate(idOscafe, result, Id.IdValida.class);
					
					if(result.hasFieldErrors()) {
						return ControllerUtil.getMessageError(result.getFieldError());
					}
					else {
						
						Preco preco = precoDao.buscaPorId(idPreco.getId());
						
						Oscafe oscafe = oscafeDao.buscaPorId(idOscafe.getId());
						
						servcafe.setLote(oscafe.getLote());
						servcafe.setPreco(preco);
						servcafe.setFazendaProdutor(oscafe.getFazendaProdutor());
						
						String mensagem = "";
						
						if (servcafe.getId() == 0) {
							
							servcafe.addOscafe(oscafe);
							
							servcafeDao.adiciona(servcafe);
							
							mensagem = "Salvo com sucesso!";
							
						}
						else {
							
							Servcafe servCafe = servcafeDao.buscaPorId(servcafe.getId());
							
							if (!servCafe.getBaixacafe().isEmpty()) {
								
								mensagem = "Proibido alterar!\nPrimeiro remova o pagamento!";
								
								return ControllerUtil.getMessage("400", mensagem);
									
							}
							else {
							
								servcafeDao.altera(servcafe);
								
								mensagem = "Alterado com sucesso!";
								
							}
							
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
	
	@RequestMapping("achaServcafeOslote")
	public @ResponseBody String acha(@RequestBody @Valid Id id,
									 BindingResult result) {
		
		if(result.hasFieldErrors()) {
			return ControllerUtil.getMessageError(result.getFieldError());
		}
		
		JSONObject jsonObject = servcafeDao.getJSONById(id.getId());
		
		jsonObject.put("status", "200");
		
		return jsonObject.toString();
		
	}
	
	@RequestMapping("removeServcafeOslote")
	public @ResponseBody String remove(@RequestBody @Valid Id id,
									   BindingResult result) {
		
		if(result.hasFieldErrors()) {
			return ControllerUtil.getMessageError(result.getFieldError());
		}
		else {
		
			String status = "400";
			String mensagem = "Proibido remover!";
			
			Servcafe servcafe = servcafeDao.buscaPorId(id.getId());
		
			Set<Oscafe> oscafes = servcafe.getOscafes();
			
			for (Oscafe oscafe : oscafes) {
				
				int dias = Data.getDaysDiff(oscafe.getData().getTime(),
					Data.StringToDate(Data.DataAtual()));
				
				if (dias <= ConsultaSql.getDiasPermitidos() && servcafe.getBaixacafe().isEmpty() ||
					dias <= ConsultaSql.getDiasPermitidos() && servcafe.getBaixacafe() == null) {
					
					servcafe.removeOscafe(oscafe);
					
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
		
			}
			
			return ControllerUtil.getMessage(status, mensagem);
			
		}
		
	}

	@RequestMapping("removeServcafeEntlote")
	public @ResponseBody String removeEntrada(@RequestBody @Valid Id id,
											   BindingResult result) {
		
		if(result.hasFieldErrors()) {
			return ControllerUtil.getMessageError(result.getFieldError());
		}
		else {
		
			String status = "400";
			String mensagem = "Proibido remover!";
			
			Servcafe servcafe = servcafeDao.buscaPorId(id.getId());
		
			Set<Entcafe> entcafes = servcafe.getEntcafes();
			
			for (Entcafe entcafe : entcafes) {
				
				int dias = Data.getDaysDiff(entcafe.getData().getTime(),
					Data.StringToDate(Data.DataAtual()));
				
				if (dias <= ConsultaSql.getDiasPermitidos() && servcafe.getBaixacafe().isEmpty() ||
					dias <= ConsultaSql.getDiasPermitidos() && servcafe.getBaixacafe() == null) {
					
					servcafe.removeEntcafe(entcafe);
					
					servcafeDao.remove(id.getId());

					entcafe.setCobrar(false);

					entcafeDao.altera(entcafe);
					
					status = "200";
					mensagem = "Removido com sucesso!";
					
				}
				else {
					
					if (!servcafe.getBaixacafe().isEmpty()) {
							
						mensagem += "\nPrimeiro remova o pagamento!";
							
					}
					else mensagem += "\nFora da data permitida!";
					
				}
		
			}
			
			return ControllerUtil.getMessage(status, mensagem);
			
		}
		
	}

	@RequestMapping("removeServcafeSailote")
	public @ResponseBody String removeSaida(@RequestBody @Valid Id id,
										    BindingResult result) {
		
		if(result.hasFieldErrors()) {
			return ControllerUtil.getMessageError(result.getFieldError());
		}
		else {
		
			String status = "400";
			String mensagem = "Proibido remover!";
			
			Servcafe servcafe = servcafeDao.buscaPorId(id.getId());
		
			Set<Saicafe> saicafes = servcafe.getSaicafes();
			
			for (Saicafe saicafe : saicafes) {
				
				int dias = Data.getDaysDiff(saicafe.getData().getTime(),
					Data.StringToDate(Data.DataAtual()));
				
				if (dias <= ConsultaSql.getDiasPermitidos() && servcafe.getBaixacafe().isEmpty() ||
					dias <= ConsultaSql.getDiasPermitidos() && servcafe.getBaixacafe() == null) {
					
					servcafe.removeSaicafe(saicafe);
					
					servcafeDao.remove(id.getId());

					saicafe.setCobrar(false);

					saicafeDao.altera(saicafe);
					
					status = "200";
					mensagem = "Removido com sucesso!";
					
				}
				else {
					
					if (!servcafe.getBaixacafe().isEmpty()) {
							
						mensagem += "\nPrimeiro remova o pagamento!";
							
					}
					else mensagem += "\nFora da data permitida!";
					
				}
		
			}
			
			return ControllerUtil.getMessage(status, mensagem);
			
		}
		
	}
	
}
