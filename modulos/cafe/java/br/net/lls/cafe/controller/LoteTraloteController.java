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
import br.net.lls.cafe.Tracafe;
import br.net.lls.cafe.Tralote;
import br.net.lls.cafe.dao.LoteDao;
import br.net.lls.cafe.dao.TracafeDao;
import br.net.lls.cafe.controller.LoteController;

@Transactional
@Controller
public class LoteTraloteController {
 
	@Autowired
	LoteDao loteDao;
	
	@Autowired
	PeneiraDao peneiraDao;
	
	@Autowired
	TracafeDao tracafeDao;
	
	@Autowired
	SmartValidator validator;
	
	@Autowired
	LoteController loteController;
	
	@RequestMapping("salvaLoteTralote")
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
					
					Tralote tralote = mapper.convertValue(node.get("cadastro"), Tralote.class);
					
					validator.validate(tralote, result, Tralote.TraloteValida.class);
					
					if(result.hasFieldErrors()) {
						return ControllerUtil.getMessageError(result.getFieldError());
					}
					else {
						
						Tracafe tracafe = tracafeDao.buscaPorId(tralote.getId());
						
						String mensagem = "Proibido salvar!";
						
						boolean saldoLotes = loteDao.checkSaldo(tracafe.getLotes());
						
						if (!saldoLotes) {
							
							mensagem += "\nLote com saldo alterado!";
							
							return ControllerUtil.getMessage("400", mensagem);
							
						}
						else {
							
							tracafe.setDesdobras(tralote.getDesdobras());
							
							Usuario usuario = (Usuario) session.getAttribute("usuarioLogado");
							
							lote.setUsuario(usuario.getEmail());
							lote.setSaldoSacas(lote.getSacas());
							lote.setSaldoPeso(lote.getPeso());
							
							if (lote.getId() == 0) {
								
								lote.addTracafe(tracafe);
								
								loteDao.adiciona(lote);
								
								mensagem = "Lote adicionado com sucesso!";
								
							}
							else {
								
								loteDao.altera(lote);
								
								mensagem = "Lote alterado com sucesso!";
								
							}
							
							tracafeDao.checkStatusFechado(tracafe, lote, session);
							
							JsonObject resposta = Json.createObjectBuilder()
								.add("status", "200")
								.add("mensagem", mensagem)
								.add("id", lote.getId())
								.add("idCadastro", tracafe.getId())
								.add("indexStatus", Status.getStatusIndex(tracafe.getStatus()))
								.build();
								
							return resposta.toString();
							
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
	
	@RequestMapping("achaLoteTralote")
	public @ResponseBody String acha(@RequestBody @Valid Id id,
									 BindingResult result) {
		
		return loteController.acha(id, result);
		
	}
	
	@RequestMapping("removeLoteTralote")
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
		
			Set<Tracafe> tracafes = lote.getTracafes();
			
			for (Tracafe tracafe : tracafes) {
				
				int dias = Data.getDaysDiff(tracafe.getData().getTime(),
					Data.StringToDate(Data.DataAtual()));
				
				boolean saldoLotes = loteDao.checkSaldo(tracafe.getLotes());
				
				if (dias <= 1 && saldoLotes) {
					
					lote.removeTracafe(tracafe);
					
					loteDao.remove(id.getId());
					
					tracafeDao.setStatusFechado(tracafe, false, session);
					
					indexStatus = Status.getStatusIndex(tracafe.getStatus());
					
					status = "200";
					mensagem = "Removido com sucesso!";
					
				}
				else {
					
					if (!saldoLotes) mensagem += "\nLote com saldo alterado!";
					else mensagem += "\nFora da data permitida!";
					
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
