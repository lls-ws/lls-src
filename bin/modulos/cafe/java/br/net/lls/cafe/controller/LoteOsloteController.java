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
import javax.json.JsonObject;
import javax.json.Json;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.core.JsonGenerationException;
import java.util.Set;
import java.math.BigDecimal;

import br.net.lls.componentes.Id;
import br.net.lls.componentes.Data;
import br.net.lls.componentes.Relatorio;
import br.net.lls.componentes.Consulta;
import br.net.lls.componentes.ControllerUtil;
import br.net.lls.cadastro.Usuario;
import br.net.lls.cadastro.Peneira;
import br.net.lls.cadastro.dao.PeneiraDao;
import br.net.lls.cafe.Status;
import br.net.lls.cafe.Lote;
import br.net.lls.cafe.Oscafe;
import br.net.lls.cafe.Oslote;
import br.net.lls.cafe.dao.LoteDao;
import br.net.lls.cafe.dao.OscafeDao;
import br.net.lls.cafe.controller.LoteController;

@Transactional
@Controller
public class LoteOsloteController {
 
	@Autowired
	LoteDao loteDao;
	
	@Autowired
	PeneiraDao peneiraDao;
	
	@Autowired
	OscafeDao oscafeDao;
	
	@Autowired
	SmartValidator validator;
	
	@Autowired
	LoteController loteController;
	
	@RequestMapping("salvaLoteOslote")
	public @ResponseBody String adiciona(@RequestBody String json,
										 BindingResult result,
										 HttpSession session) {
		
		try {
			
			ObjectMapper mapper = new ObjectMapper();
			
			JsonNode node = mapper.readTree(json);
			
			Lote lote = mapper.convertValue(node.get("lote"), Lote.class);
			
			validator.validate(lote, result, Lote.LoteValida.class);
			
			if(result.hasFieldErrors()) {
				return ControllerUtil.getMessageError(result.getFieldError());
			}
			else {
			
				Id idPeneira = mapper.convertValue(node.get("idCampoProcura"), Id.class);
					
				validator.validate(idPeneira, result, Id.IdValida.class);
				
				if(result.hasFieldErrors()) {
					return ControllerUtil.getMessageError(result.getFieldError());
				}
				else {
				
					Peneira peneira = peneiraDao.buscaPorId(idPeneira.getId());
				
					lote.setPeneira(peneira);
					
					Oslote oslote = mapper.convertValue(node.get("cadastro"), Oslote.class);
					
					validator.validate(oslote, result, Oslote.OsloteValida.class);
					
					if(result.hasFieldErrors()) {
						return ControllerUtil.getMessageError(result.getFieldError());
					}
					else {
					
						Oscafe oscafe = oscafeDao.buscaPorId(oslote.getId());
						
						String mensagem = "Proibido salvar!";
						
						if (!oscafe.getServcafes().isEmpty()) {
								
							mensagem += "\nPrimeiro remova os valores cobrados!";
							
							return ControllerUtil.getMessage("400", mensagem);
							
						}
						else {
							
							boolean saldoLotes = loteDao.checkSaldo(oscafe.getLotes());
				
							if (!saldoLotes) {
								
								mensagem += "\nLote com saldo alterado!";
								
								return ControllerUtil.getMessage("400", mensagem);
								
							}
							else {
							
								oscafe.setDesdobras(oslote.getDesdobras());
								oscafe.setSacasQuebra(oslote.getSacasQuebra());
								oscafe.setPesoQuebra(oslote.getPesoQuebra());
								oscafe.setSacasAcrescimo(oslote.getSacasAcrescimo());
								oscafe.setPesoAcrescimo(oslote.getPesoAcrescimo());
								
								Usuario usuario = (Usuario) session.getAttribute("usuarioLogado");
								
								lote.setUsuario(usuario.getEmail());
								lote.setSaldoSacas(lote.getSacas());
								lote.setSaldoPeso(lote.getPeso());
								
								if (lote.getId() == 0) {
									
									lote.addOscafe(oscafe);
									
									loteDao.adiciona(lote);
									
									mensagem = "Lote adicionado com sucesso!";
									
								}
								else {
									
									loteDao.altera(lote);
									
									mensagem = "Lote alterado com sucesso!";
									
								}
								
								oscafeDao.checkStatusFechado(oscafe, lote, session);
								
								JsonObject resposta = Json.createObjectBuilder()
									.add("status", "200")
									.add("mensagem", mensagem)
									.add("id", lote.getId())
									.add("idCadastro", oscafe.getId())
									.add("indexStatus", Status.getStatusIndex(oscafe.getStatus()))
									.build();
									
								return resposta.toString();
								
							}
							
						}
						
					}
					
				}
				
			}
			
		} catch (JsonGenerationException e) {
			return ControllerUtil.getMessageError(e.toString());
			
		} catch (IOException e) {
			return ControllerUtil.getMessageError(e.toString());
		}
		
	}
	
	@RequestMapping("achaLoteOslote")
	public @ResponseBody String acha(@RequestBody @Valid Id id,
									 BindingResult result) {
		
		return loteController.acha(id, result);
		
	}
	
	@RequestMapping("removeLoteOslote")
	public @ResponseBody String remove(@RequestBody @Valid Id id,
									   BindingResult result,
									   HttpSession session) {
		
		if(result.hasFieldErrors()) {
			return ControllerUtil.getMessageError(result.getFieldError());
		}
		else {
		
			String status = "400";
			String mensagem = "Proibido remover!";
			
			int indexStatus = 1;
			
			Lote lote = loteDao.buscaPorId(id.getId());
		
			Set<Oscafe> oscafes = lote.getOscafes();
			
			for (Oscafe oscafe : oscafes) {
				
				int dias = Data.getDaysDiff(oscafe.getData().getTime(),
					Data.StringToDate(Data.DataAtual()));
				
				boolean saldoLotes = loteDao.checkSaldo(oscafe.getLotes());
				
				if (dias <= 1 && saldoLotes && oscafe.getServcafes().isEmpty() ||
					dias <= 1 && saldoLotes && oscafe.getServcafes() == null) {
					
					lote.removeOscafe(oscafe);
					
					loteDao.remove(id.getId());
					
					oscafeDao.setStatusFechado(oscafe, false, session);
					
					indexStatus = Status.getStatusIndex(oscafe.getStatus());
					
					status = "200";
					mensagem = "Removido com sucesso!";
					
				}
				else {
					
					if (!oscafe.getServcafes().isEmpty()) {
							
						mensagem += "\nPrimeiro remova os valores cobrados!";
							
					}
					else {
					
						if (!saldoLotes) mensagem += "\nLote com saldo alterado!";
						else mensagem += "\nFora da data permitida!";
						
					}
					
				}
		
			}
			
			JsonObject resposta = Json.createObjectBuilder()
				.add("status", status)
				.add("mensagem", mensagem)
				.add("indexStatus", indexStatus)
				.build();
				
			return resposta.toString();
				
		}
		
	}
	
}
