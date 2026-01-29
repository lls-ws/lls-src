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

import br.net.lls.componentes.Id;
import br.net.lls.componentes.Data;
import br.net.lls.componentes.Relatorio;
import br.net.lls.componentes.Consulta;
import br.net.lls.componentes.ControllerUtil;
import br.net.lls.cadastro.Usuario;
import br.net.lls.cadastro.Peneira;
import br.net.lls.cadastro.Preco;
import br.net.lls.cafe.Lote;
import br.net.lls.cafe.Entcafe;
import br.net.lls.cafe.Entlote;
import br.net.lls.cadastro.dao.PrecoDao;
import br.net.lls.cadastro.dao.PeneiraDao;
import br.net.lls.cafe.dao.LoteDao;
import br.net.lls.cafe.dao.EntcafeDao;
import br.net.lls.fatcafe.dao.ServcafeDao;
import br.net.lls.cafe.controller.LoteController;
import br.net.lls.cafe.dao.ConsultaSql;

@Transactional
@Controller
public class LoteEntloteController {
 
	@Autowired
	LoteDao loteDao;
	
	@Autowired
	PeneiraDao peneiraDao;
	
	@Autowired
	EntcafeDao entcafeDao;
	
	@Autowired
	PrecoDao precoDao;
	
	@Autowired
	ServcafeDao servcafeDao;
	
	@Autowired
	SmartValidator validator;
	
	@Autowired
	LoteController loteController;
	
	private String tipoLote = "Lote de Entrada";
	
	@RequestMapping("salvaLoteEntlote")
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
					
					Entlote entlote = mapper.convertValue(node.get("cadastro"), Entlote.class);
					
					validator.validate(entlote, result, Entlote.EntloteValida.class);
					
					if(result.hasFieldErrors()) {
						return ControllerUtil.getMessageError(result.getFieldError());
					}
					else {
					
						Entcafe entcafe = entcafeDao.buscaPorId(entlote.getId());
						
						String mensagem = "Proibido salvar!";
						
						boolean saldoLotes = loteDao.checkSaldo(entcafe.getLotes());
						
						if (!saldoLotes) {
							
							mensagem += "\nLote com saldo alterado!";
							
							return ControllerUtil.getMessage("400", mensagem);
							
						}
						else {
						
							Usuario usuario = (Usuario) session.getAttribute("usuarioLogado");
							
							lote.setUsuario(usuario.getEmail());
							lote.setSaldoSacas(lote.getSacas());
							lote.setSaldoPeso(lote.getPeso());
							
							String msg = "";
							
							if (lote.getId() == 0) {
								
								lote.addEntcafe(entcafe);
								
								loteDao.adiciona(lote);
								
								msg = "Lote de Entrada adicionado com sucesso!";
								
							}
							else {
								
								loteDao.altera(lote);
								
								msg = tipoLote + " alterado com sucesso!";
								
							}
							
							entcafeDao.checkFechado(entcafe, entlote, session);
							
							int indexStatus = 0;
							
							if (entcafe.getFechado()) {
								
								indexStatus = 1;
								
								Preco preco = precoDao.buscaPorId(18);
							
								servcafeDao.criaServico(entcafe, preco);
								
							}
							
							JsonObject resposta = Json.createObjectBuilder()
								.add("status", "200")
								.add("mensagem", msg)
								.add("id", lote.getId())
								.add("idCadastro", entcafe.getId())
								.add("indexStatus", indexStatus)
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
	
	@RequestMapping("achaLoteEntlote")
	public @ResponseBody String acha(@RequestBody @Valid Id id,
									 BindingResult result) {
		
		return loteController.acha(id, result);
		
	}
	
	@RequestMapping("removeLoteEntlote")
	public @ResponseBody String remove(@RequestBody @Valid Id id,
									   BindingResult result,
									   HttpSession session) {
		
		if(result.hasFieldErrors()) {
			return ControllerUtil.getMessageError(result.getFieldError());
		}
		else {
		
			String status = "400";
			String mensagem = "Proibido remover!";
			
			int indexStatus = 0;
			
			Lote lote = loteDao.buscaPorId(id.getId());
		
			Set<Entcafe> entcafes = lote.getEntcafes();
			
			for (Entcafe entcafe : entcafes) {
				
				int dias = Data.getDaysDiff(entcafe.getData().getTime(),
					Data.StringToDate(Data.DataAtual()));
				
				boolean saldoLotes = loteDao.checkSaldo(entcafe.getLotes());
				
				if (dias <= ConsultaSql.getDiasPermitidos() && saldoLotes) {
					
					lote.removeEntcafe(entcafe);
					
					loteDao.remove(id.getId());

					entcafeDao.setFechado(entcafe, false, session);
					
					if (!entcafe.getFechado()) indexStatus = 0;
					
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
