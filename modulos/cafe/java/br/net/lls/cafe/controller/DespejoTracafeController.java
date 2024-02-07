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
import java.util.List;
import java.util.Iterator;
import java.lang.Object;
import java.io.IOException;
import javax.validation.Valid;
import javax.json.JsonObject;
import javax.json.Json;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.core.JsonGenerationException;
import org.json.JSONArray;
import org.json.JSONObject;
import java.util.Set;
import java.util.HashSet;
import java.math.BigDecimal;
import java.math.RoundingMode;

import br.net.lls.componentes.Id;
import br.net.lls.componentes.Data;
import br.net.lls.componentes.Relatorio;
import br.net.lls.componentes.Consulta;
import br.net.lls.componentes.ControllerUtil;
import br.net.lls.cadastro.Usuario;
import br.net.lls.cadastro.Peneira;
import br.net.lls.cadastro.FazendaProdutor;
import br.net.lls.cafe.Status;
import br.net.lls.cafe.Guia;
import br.net.lls.cafe.Lote;
import br.net.lls.cafe.Tracafe;
import br.net.lls.cafe.TracafeDespejo;
import br.net.lls.cafe.dao.GuiaDao;
import br.net.lls.cafe.dao.LoteDao;
import br.net.lls.cafe.dao.TracafeDao;
import br.net.lls.cafe.dao.TracafeDespejoDao;
import br.net.lls.cadastro.dao.FazendaProdutorDao;
import br.net.lls.fatcafe.dao.CafeDao;
import br.net.lls.fatcafe.dao.FatcafeDao;

@Transactional
@Controller
public class DespejoTracafeController {
 
	@Autowired
	LoteDao loteDao;
	
	@Autowired
	TracafeDao tracafeDao;
	
	@Autowired
	CafeDao cafeDao;
	
	@Autowired
	FatcafeDao fatcafeDao;
	
	@Autowired
	TracafeDespejoDao tracafeDespejoDao;
	
	@Autowired
	FazendaProdutorDao fazendaProdutorDao;
	
	@Autowired
	GuiaDao guiaDao;
	
	@Autowired
	SmartValidator validator;
	
	@RequestMapping("salvaDespejoTracafe")
	public @ResponseBody String adiciona(@RequestBody String json,
										 BindingResult result,
										 HttpSession session) {
		
		try {
			
			ObjectMapper mapper = new ObjectMapper();
			
			JsonNode node = mapper.readTree(json);
			
			Lote despejo = mapper.convertValue(node.get("lote"), Lote.class);
			
			validator.validate(despejo, result, Lote.LoteValida.class);
			
			if(result.hasFieldErrors()) {
				return ControllerUtil.getMessageError(result.getFieldError());
			}
			else {
			
				Id idLote = mapper.convertValue(node.get("idCampoProcura"), Id.class);
					
				validator.validate(idLote, result, Id.IdValida.class);
				
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
					
						Id idFazendaDestino = mapper.convertValue(node.get("idFazendaDestino"), Id.class);
					
						validator.validate(idFazendaDestino, result, Id.IdValida.class);
						
						if(result.hasFieldErrors()) {
							return ControllerUtil.getMessageError(result.getFieldError());
						}
						else {
					
							Tracafe tracafeJson = mapper.convertValue(node.get("cadastro"), Tracafe.class);
							
							validator.validate(tracafeJson, result, Tracafe.TracafeValida.class);
							
							if(result.hasFieldErrors()) {
								return ControllerUtil.getMessageError(result.getFieldError());
							}
							else {
								
								FazendaProdutor fazendaProdutor = fazendaProdutorDao.buscaPorId(idFazendaProdutor.getId());
								FazendaProdutor fazendaDestino = fazendaProdutorDao.buscaPorId(idFazendaDestino.getId());
								
								Tracafe tracafe = tracafeJson;
								
								if (tracafe.getId() == 0) {
									
									Guia guia = guiaDao.buscaPorId(4);
									
									tracafe.setFazendaProdutor(fazendaProdutor);
									tracafe.setFazendaDestino(fazendaDestino);
									tracafe.setLote(guia.getGuia(guia.getId()));
									
									tracafeDao.adiciona(tracafe);
									
									guiaDao.soma(4);
									
									cafeDao.criaCafe(idFazendaProdutor.getId(), fatcafeDao.getDataFatEmpresa());
									cafeDao.criaCafe(idFazendaDestino.getId(), fatcafeDao.getDataFatEmpresa());
									
								}
								else {
									
									tracafe = tracafeDao.buscaPorId(tracafe.getId());
									
									tracafe.setFazendaProdutor(fazendaProdutor);
									tracafe.setFazendaDestino(fazendaDestino);
									tracafe.setSacas(tracafeJson.getSacas());
									tracafe.setPeso(tracafeJson.getPeso());
									tracafe.setData(tracafeJson.getData());
									tracafe.setObservacao(tracafeJson.getObservacao());
									
								}
								
								Lote lote = loteDao.buscaPorId(idLote.getId());
								
								Set<TracafeDespejo> tracafeDespejos = new HashSet<TracafeDespejo>();
				
								tracafeDespejos = lote.getTracafeDespejos();
								
								String msg = "";
								
								if (tracafeDespejos.isEmpty() || tracafeDespejos == null) {
								
									msg = addTracafeDespejo(tracafe, lote, despejo);
									
								}
								else {
									
									int cont = 0;
									
									for (TracafeDespejo tracafeDespejo : tracafeDespejos) {
										
										if (tracafeDespejo.getTracafe().getId() == tracafe.getId()) {
											
											int sacasTotal = 0;
											
											BigDecimal pesoTotal = tracafeDespejo.getPeso();
											
											sacasTotal = tracafeDespejo.getSacas() + despejo.getSacas() - despejo.getSaldoSacas();
											pesoTotal = pesoTotal.add(despejo.getPeso());
											pesoTotal = pesoTotal.subtract(despejo.getSaldoPeso());
											
											tracafeDespejo.setSacas(sacasTotal);
											tracafeDespejo.setPeso(pesoTotal);
											
											tracafeDespejoDao.altera(tracafeDespejo);
											
											msg = "Lote alterado com sucesso!";
											
											cont++;
											
											break;
											
										}
										
									}
									
									if (cont == 0) msg = addTracafeDespejo(tracafe, lote, despejo);
									
								}
								
								int sacasSaldo = 0;
								
								BigDecimal pesoSaldo = lote.getSaldoPeso();
								
								sacasSaldo = lote.getSaldoSacas() - despejo.getSacas() + despejo.getSaldoSacas();
								pesoSaldo = pesoSaldo.subtract(despejo.getPeso());
								pesoSaldo = pesoSaldo.add(despejo.getSaldoPeso());
								
								if (sacasSaldo == 0) pesoSaldo = new BigDecimal(0.00);
								
								lote.setSaldoSacas(sacasSaldo);
								lote.setSaldoPeso(pesoSaldo);
								
								loteDao.altera(lote);
								
								despejo.setId(lote.getId());
								
								tracafeDao.checkStatusDespejado(tracafe, despejo, session);
								
								JsonObject resposta = Json.createObjectBuilder()
									.add("status", "200")
									.add("mensagem", msg)
									.add("id", lote.getId())
									.add("idCadastro", tracafe.getId())
									.add("indexStatus", Status.getStatusIndex(tracafe.getStatus()))
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
	
	@RequestMapping("achaDespejoTracafe")
	public @ResponseBody String acha(@RequestBody String json,
									 BindingResult result) {
		
		JSONObject loteJSON = new JSONObject();
		
		TracafeDespejo tracafeDespejo = achaTracafeDespejo(json, result);
		
		if (tracafeDespejo == null) {
							
			loteJSON.put("status", "400");
			loteJSON.put("mensagem", "Lote inexistente!");
			
		}
		else {
			
			Lote lote = tracafeDespejo.getLote();
			
			Peneira peneira = lote.getPeneira();
			
			loteJSON.put("status", "200");
			loteJSON.put("id", lote.getId());
			loteJSON.put("idLote", lote.getId());
			loteJSON.put("lote", lote.getLote());
			loteJSON.put("sacasSaldo", lote.getSaldoSacas());
			loteJSON.put("pesoSaldo", lote.getSaldoPeso());
			loteJSON.put("sacasTotal", lote.getSacas());
			loteJSON.put("pesoTotal", lote.getPeso());
			loteJSON.put("sacas", tracafeDespejo.getSacas());
			loteJSON.put("peso", tracafeDespejo.getPeso());
			loteJSON.put("observacao", lote.getObservacao());
			loteJSON.put("pilha", lote.getPilha());
			loteJSON.put("peneira", peneira.getNome());
			
		}
								
		return loteJSON.toString();
		
	}
	
	@RequestMapping("removeDespejoTracafe")
	public @ResponseBody String remove(@RequestBody String json,
									   BindingResult result,
									   HttpSession session) {
		
		String status = "400";
		String mensagem = "Proibido remover!";
		
		int indexStatus = 0;
		
		TracafeDespejo tracafeDespejo = achaTracafeDespejo(json, result);
		
		if (tracafeDespejo != null) {
							
			Lote lote = tracafeDespejo.getLote();
			
			Tracafe tracafe = tracafeDespejo.getTracafe();
			
			int dias = Data.getDaysDiff(tracafe.getData().getTime(),
					Data.StringToDate(Data.DataAtual()));
				
			if (dias <= 1 && Status.getStatusIndex(tracafe.getStatus()) < 2) {
				
				int sacasSaldo = lote.getSaldoSacas();
							
				BigDecimal pesoSaldo = lote.getSaldoPeso();
				
				sacasSaldo = sacasSaldo + tracafeDespejo.getSacas();
				pesoSaldo = pesoSaldo.add(tracafeDespejo.getPeso());
				
				lote.setSaldoSacas(sacasSaldo);
				lote.setSaldoPeso(pesoSaldo);
				
				loteDao.altera(lote);
				
				tracafeDespejoDao.apaga(tracafeDespejo);
				
				tracafeDao.setStatusDespejado(tracafe, false, session);
				
				indexStatus = Status.getStatusIndex(tracafe.getStatus());
				
				status = "200";
				mensagem = "Removido com sucesso!";
				
			}
			else mensagem += "\nFora da data permitida!";
			
		}
		else mensagem += "\nErro no lote de despejo!";
		
		JsonObject resposta = Json.createObjectBuilder()
			.add("status", status)
			.add("mensagem", mensagem)
			.add("indexStatus", indexStatus)
			.build();
			
		return resposta.toString();
				
	}
	
	private String addTracafeDespejo(Tracafe tracafe, Lote lote, Lote despejo) {
		
		TracafeDespejo tracafeDespejo = new TracafeDespejo();
							
		tracafeDespejo.setLote(lote);
		tracafeDespejo.setTracafe(tracafe);
		tracafeDespejo.setSacas(despejo.getSacas());
		tracafeDespejo.setPeso(despejo.getPeso());
		
		tracafeDespejoDao.adiciona(tracafeDespejo);
		
		return "Lote adicionado com sucesso!";
		
	}

	private TracafeDespejo achaTracafeDespejo(String json, BindingResult result) {
		
		try {
			
			ObjectMapper mapper = new ObjectMapper();
			
			JsonNode node = mapper.readTree(json);
			
			Id idLote = mapper.convertValue(node.get("idLote"), Id.class);
				
			validator.validate(idLote, result, Id.IdValida.class);
			
			if(result.hasFieldErrors()) return null;
			else {
			
				Id idCadastro = mapper.convertValue(node.get("idCadastro"), Id.class);
					
				validator.validate(idCadastro, result, Id.IdValida.class);
				
				if(result.hasFieldErrors()) return null;
				else {
					
					Lote lote = loteDao.buscaPorId(idLote.getId());
							
					Set<TracafeDespejo> tracafeDespejos = new HashSet<TracafeDespejo>();
					
					tracafeDespejos = lote.getTracafeDespejos();
					
					if (tracafeDespejos.isEmpty() || tracafeDespejos == null) return null;
					else {
					
						for (TracafeDespejo tracafeDespejo : tracafeDespejos) {
							
							if (tracafeDespejo.getTracafe().getId() == idCadastro.getId()) return tracafeDespejo;
							
						}
						
						return null;
						
					}
					
				}
			
			}
			
		} catch (JsonGenerationException e) {
			return null;
			
		} catch (IOException e) {
			return null;
		}
		
	}
	
}
