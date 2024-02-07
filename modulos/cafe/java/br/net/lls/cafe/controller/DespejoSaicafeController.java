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
import br.net.lls.cafe.Saicafe;
import br.net.lls.cafe.SaicafeDespejo;
import br.net.lls.cafe.dao.GuiaDao;
import br.net.lls.cafe.dao.LoteDao;
import br.net.lls.cafe.dao.SaicafeDao;
import br.net.lls.cafe.dao.SaicafeDespejoDao;
import br.net.lls.cadastro.dao.FazendaProdutorDao;
import br.net.lls.fatcafe.dao.CafeDao;
import br.net.lls.fatcafe.dao.FatcafeDao;
import br.net.lls.cafe.dao.ConsultaSql;

@Transactional
@Controller
public class DespejoSaicafeController {
 
	@Autowired
	LoteDao loteDao;
	
	@Autowired
	SaicafeDao saicafeDao;
	
	@Autowired
	CafeDao cafeDao;
	
	@Autowired
	FatcafeDao fatcafeDao;
	
	@Autowired
	SaicafeDespejoDao saicafeDespejoDao;
	
	@Autowired
	FazendaProdutorDao fazendaProdutorDao;
	
	@Autowired
	GuiaDao guiaDao;
	
	@Autowired
	SmartValidator validator;
	
	@RequestMapping("salvaDespejoSaicafe")
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
					
						Saicafe saicafeJson = mapper.convertValue(node.get("cadastro"), Saicafe.class);
						
						validator.validate(saicafeJson, result, Saicafe.SaicafeValida.class);
						
						if(result.hasFieldErrors()) {
							return ControllerUtil.getMessageError(result.getFieldError());
						}
						else {
							
							FazendaProdutor fazendaProdutor = fazendaProdutorDao.buscaPorId(idFazendaProdutor.getId());
							
							Saicafe saicafe = saicafeJson;
							
							if (saicafe.getId() == 0) {
								
								Guia guia = guiaDao.buscaPorId(3);
								
								saicafe.setFazendaProdutor(fazendaProdutor);
								saicafe.setLote(guia.getGuia(guia.getId()));
								
								saicafeDao.adiciona(saicafe);
								
								guiaDao.soma(3);
								
								cafeDao.criaCafe(idFazendaProdutor.getId(), fatcafeDao.getDataFatEmpresa());
								
							}
							else {
								
								saicafe = saicafeDao.buscaPorId(saicafe.getId());
								
								saicafe.setFazendaProdutor(fazendaProdutor);
								saicafe.setSacas(saicafeJson.getSacas());
								saicafe.setPeso(saicafeJson.getPeso());
								saicafe.setData(saicafeJson.getData());
								saicafe.setDestino(saicafeJson.getDestino());
								saicafe.setObservacao(saicafeJson.getObservacao());
								
							}
							
							Lote lote = loteDao.buscaPorId(idLote.getId());
							
							Set<SaicafeDespejo> saicafeDespejos = new HashSet<SaicafeDespejo>();
			
							saicafeDespejos = lote.getSaicafeDespejos();
							
							String msg = "";
							
							if (saicafeDespejos.isEmpty() || saicafeDespejos == null) {
							
								msg = addSaicafeDespejo(saicafe, lote, despejo);
								
							}
							else {
								
								int cont = 0;
								
								for (SaicafeDespejo saicafeDespejo : saicafeDespejos) {
									
									if (saicafeDespejo.getSaicafe().getId() == saicafe.getId()) {
										
										int sacasTotal = 0;
										
										BigDecimal pesoTotal = saicafeDespejo.getPeso();
										
										sacasTotal = saicafeDespejo.getSacas() + despejo.getSacas() - despejo.getSaldoSacas();
										pesoTotal = pesoTotal.add(despejo.getPeso());
										pesoTotal = pesoTotal.subtract(despejo.getSaldoPeso());
										
										saicafeDespejo.setSacas(sacasTotal);
										saicafeDespejo.setPeso(pesoTotal);
										
										saicafeDespejoDao.altera(saicafeDespejo);
										
										msg = "Lote alterado com sucesso!";
										
										cont++;
										
										break;
										
									}
									
								}
								
								if (cont == 0) msg = addSaicafeDespejo(saicafe, lote, despejo);
								
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
							
							saicafeDao.checkStatusDespejado(saicafe, despejo, session);
							
							JsonObject resposta = Json.createObjectBuilder()
								.add("status", "200")
								.add("mensagem", msg)
								.add("id", lote.getId())
								.add("idCadastro", saicafe.getId())
								.add("indexStatus", Status.getStatusIndex(saicafe.getStatus()))
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
	
	@RequestMapping("achaDespejoSaicafe")
	public @ResponseBody String acha(@RequestBody String json,
									 BindingResult result) {
		
		JSONObject loteJSON = new JSONObject();
		
		SaicafeDespejo saicafeDespejo = achaSaicafeDespejo(json, result);
		
		if (saicafeDespejo == null) {
							
			loteJSON.put("status", "400");
			loteJSON.put("mensagem", "Lote inexistente!");
			
		}
		else {
			
			Lote lote = saicafeDespejo.getLote();
			
			Peneira peneira = lote.getPeneira();
			
			loteJSON.put("status", "200");
			loteJSON.put("id", lote.getId());
			loteJSON.put("idLote", lote.getId());
			loteJSON.put("lote", lote.getLote());
			loteJSON.put("sacasSaldo", lote.getSaldoSacas());
			loteJSON.put("pesoSaldo", lote.getSaldoPeso());
			loteJSON.put("sacasTotal", lote.getSacas());
			loteJSON.put("pesoTotal", lote.getPeso());
			loteJSON.put("sacas", saicafeDespejo.getSacas());
			loteJSON.put("peso", saicafeDespejo.getPeso());
			loteJSON.put("observacao", lote.getObservacao());
			loteJSON.put("pilha", lote.getPilha());
			loteJSON.put("peneira", peneira.getNome());
			
		}
								
		return loteJSON.toString();
		
	}
	
	@RequestMapping("removeDespejoSaicafe")
	public @ResponseBody String remove(@RequestBody String json,
									   BindingResult result,
									   HttpSession session) {
		
		String status = "400";
		String mensagem = "Proibido remover!";
		
		int indexStatus = 0;
		
		SaicafeDespejo saicafeDespejo = achaSaicafeDespejo(json, result);
		
		if (saicafeDespejo != null) {
							
			Lote lote = saicafeDespejo.getLote();
			
			Saicafe saicafe = saicafeDespejo.getSaicafe();
			
			int dias = Data.getDaysDiff(saicafe.getData().getTime(),
					Data.StringToDate(Data.DataAtual()));
				
			if (dias <= ConsultaSql.getDiasPermitidos()) {
				
				int sacasSaldo = lote.getSaldoSacas();
							
				BigDecimal pesoSaldo = lote.getSaldoPeso();
				
				sacasSaldo = sacasSaldo + saicafeDespejo.getSacas();
				pesoSaldo = pesoSaldo.add(saicafeDespejo.getPeso());
				
				lote.setSaldoSacas(sacasSaldo);
				lote.setSaldoPeso(pesoSaldo);
				
				loteDao.altera(lote);
				
				saicafeDespejoDao.apaga(saicafeDespejo);
				
				saicafeDao.setStatusDespejado(saicafe, false, session);
				
				indexStatus = Status.getStatusIndex(saicafe.getStatus());
				
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
	
	private String addSaicafeDespejo(Saicafe saicafe, Lote lote, Lote despejo) {
		
		SaicafeDespejo saicafeDespejo = new SaicafeDespejo();
							
		saicafeDespejo.setLote(lote);
		saicafeDespejo.setSaicafe(saicafe);
		saicafeDespejo.setSacas(despejo.getSacas());
		saicafeDespejo.setPeso(despejo.getPeso());
		
		saicafeDespejoDao.adiciona(saicafeDespejo);
		
		return "Lote adicionado com sucesso!";
		
	}
	
	private SaicafeDespejo achaSaicafeDespejo(String json, BindingResult result) {
		
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
							
					Set<SaicafeDespejo> saicafeDespejos = new HashSet<SaicafeDespejo>();
					
					saicafeDespejos = lote.getSaicafeDespejos();
					
					if (saicafeDespejos.isEmpty() || saicafeDespejos == null) return null;
					else {
					
						for (SaicafeDespejo saicafeDespejo : saicafeDespejos) {
							
							if (saicafeDespejo.getSaicafe().getId() == idCadastro.getId()) return saicafeDespejo;
							
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
