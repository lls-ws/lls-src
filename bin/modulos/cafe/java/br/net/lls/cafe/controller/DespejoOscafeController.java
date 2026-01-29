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
import br.net.lls.cafe.Oscafe;
import br.net.lls.cafe.OscafeDespejo;
import br.net.lls.cafe.dao.GuiaDao;
import br.net.lls.cafe.dao.LoteDao;
import br.net.lls.cafe.dao.OscafeDao;
import br.net.lls.cafe.dao.OscafeDespejoDao;
import br.net.lls.cadastro.dao.FazendaProdutorDao;
import br.net.lls.fatcafe.dao.CafeDao;
import br.net.lls.fatcafe.dao.FatcafeDao;

@Transactional
@Controller
public class DespejoOscafeController {
 
	@Autowired
	LoteDao loteDao;
	
	@Autowired
	OscafeDao oscafeDao;
	
	@Autowired
	CafeDao cafeDao;
	
	@Autowired
	FatcafeDao fatcafeDao;
	
	@Autowired
	OscafeDespejoDao oscafeDespejoDao;
	
	@Autowired
	FazendaProdutorDao fazendaProdutorDao;
	
	@Autowired
	GuiaDao guiaDao;
	
	@Autowired
	SmartValidator validator;
	
	@RequestMapping("salvaDespejoOscafe")
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
					
						Oscafe oscafeJson = mapper.convertValue(node.get("cadastro"), Oscafe.class);
						
						validator.validate(oscafeJson, result, Oscafe.OscafeValida.class);
						
						if(result.hasFieldErrors()) {
							return ControllerUtil.getMessageError(result.getFieldError());
						}
						else {
							
							FazendaProdutor fazendaProdutor = fazendaProdutorDao.buscaPorId(idFazendaProdutor.getId());
							
							Oscafe oscafe = oscafeJson;
							
							if (oscafe.getId() == 0) {
								
								Guia guia = guiaDao.buscaPorId(2);
								
								oscafe.setFazendaProdutor(fazendaProdutor);
								oscafe.setLote(guia.getGuia(guia.getId()));
								
								oscafeDao.adiciona(oscafe);
								
								guiaDao.soma(2);
								
								cafeDao.criaCafe(idFazendaProdutor.getId(), fatcafeDao.getDataFatEmpresa());
								
							}
							else {
								
								oscafe = oscafeDao.buscaPorId(oscafe.getId());
								
								oscafe.setFazendaProdutor(fazendaProdutor);
								oscafe.setSacas(oscafeJson.getSacas());
								oscafe.setPeso(oscafeJson.getPeso());
								oscafe.setData(oscafeJson.getData());
								oscafe.setInstrucoes(oscafeJson.getInstrucoes());
								oscafe.setObservacao(oscafeJson.getObservacao());
								
							}
							
							Lote lote = loteDao.buscaPorId(idLote.getId());
							
							Set<OscafeDespejo> oscafeDespejos = new HashSet<OscafeDespejo>();
			
							oscafeDespejos = lote.getOscafeDespejos();
							
							String msg = "";
							
							if (oscafeDespejos.isEmpty() || oscafeDespejos == null) {
							
								msg = addOscafeDespejo(oscafe, lote, despejo);
								
							}
							else {
								
								int cont = 0;
								
								for (OscafeDespejo oscafeDespejo : oscafeDespejos) {
									
									if (oscafeDespejo.getOscafe().getId() == oscafe.getId()) {
										
										int sacasTotal = 0;
										
										BigDecimal pesoTotal = oscafeDespejo.getPeso();
										
										sacasTotal = oscafeDespejo.getSacas() + despejo.getSacas() - despejo.getSaldoSacas();
										pesoTotal = pesoTotal.add(despejo.getPeso());
										pesoTotal = pesoTotal.subtract(despejo.getSaldoPeso());
										
										oscafeDespejo.setSacas(sacasTotal);
										oscafeDespejo.setPeso(pesoTotal);
										
										oscafeDespejoDao.altera(oscafeDespejo);
										
										msg = "Lote alterado com sucesso!";
										
										cont++;
										
										break;
										
									}
									
								}
								
								if (cont == 0) msg = addOscafeDespejo(oscafe, lote, despejo);
								
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
							
							oscafeDao.checkStatusDespejado(oscafe, despejo, session);
							
							JsonObject resposta = Json.createObjectBuilder()
								.add("status", "200")
								.add("mensagem", msg)
								.add("id", lote.getId())
								.add("idCadastro", oscafe.getId())
								.add("indexStatus", Status.getStatusIndex(oscafe.getStatus()))
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
	
	@RequestMapping("achaDespejoOscafe")
	public @ResponseBody String acha(@RequestBody String json,
									 BindingResult result) {
		
		JSONObject loteJSON = new JSONObject();
		
		OscafeDespejo oscafeDespejo = achaOscafeDespejo(json, result);
		
		if (oscafeDespejo == null) {
							
			loteJSON.put("status", "400");
			loteJSON.put("mensagem", "Lote inexistente!");
			
		}
		else {
			
			Lote lote = oscafeDespejo.getLote();
			
			Peneira peneira = lote.getPeneira();
			
			loteJSON.put("status", "200");
			loteJSON.put("id", lote.getId());
			loteJSON.put("idLote", lote.getId());
			loteJSON.put("lote", lote.getLote());
			loteJSON.put("sacasSaldo", lote.getSaldoSacas());
			loteJSON.put("pesoSaldo", lote.getSaldoPeso());
			loteJSON.put("sacasTotal", lote.getSacas());
			loteJSON.put("pesoTotal", lote.getPeso());
			loteJSON.put("sacas", oscafeDespejo.getSacas());
			loteJSON.put("peso", oscafeDespejo.getPeso());
			loteJSON.put("observacao", lote.getObservacao());
			loteJSON.put("pilha", lote.getPilha());
			loteJSON.put("peneira", peneira.getNome());
			
		}
								
		return loteJSON.toString();
		
	}
	
	@RequestMapping("removeDespejoOscafe")
	public @ResponseBody String remove(@RequestBody String json,
									   BindingResult result,
									   HttpSession session) {
		
		String status = "400";
		String mensagem = "Proibido remover!";
		
		int indexStatus = 0;
		
		OscafeDespejo oscafeDespejo = achaOscafeDespejo(json, result);
		
		if (oscafeDespejo != null) {
							
			Lote lote = oscafeDespejo.getLote();
			
			Oscafe oscafe = oscafeDespejo.getOscafe();
			
			int dias = Data.getDaysDiff(oscafe.getData().getTime(),
					Data.StringToDate(Data.DataAtual()));
				
			if (dias <= 1 && Status.getStatusIndex(oscafe.getStatus()) < 2) {
				
				int sacasSaldo = lote.getSaldoSacas();
							
				BigDecimal pesoSaldo = lote.getSaldoPeso();
				
				sacasSaldo = sacasSaldo + oscafeDespejo.getSacas();
				pesoSaldo = pesoSaldo.add(oscafeDespejo.getPeso());
				
				lote.setSaldoSacas(sacasSaldo);
				lote.setSaldoPeso(pesoSaldo);
				
				loteDao.altera(lote);
				
				oscafeDespejoDao.apaga(oscafeDespejo);
				
				oscafeDao.setStatusDespejado(oscafe, false, session);
				
				indexStatus = Status.getStatusIndex(oscafe.getStatus());
				
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
	
	private String addOscafeDespejo(Oscafe oscafe, Lote lote, Lote despejo) {
		
		OscafeDespejo oscafeDespejo = new OscafeDespejo();
							
		oscafeDespejo.setLote(lote);
		oscafeDespejo.setOscafe(oscafe);
		oscafeDespejo.setSacas(despejo.getSacas());
		oscafeDespejo.setPeso(despejo.getPeso());
		
		oscafeDespejoDao.adiciona(oscafeDespejo);
		
		return "Lote adicionado com sucesso!";
		
	}

	private OscafeDespejo achaOscafeDespejo(String json, BindingResult result) {
		
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
							
					Set<OscafeDespejo> oscafeDespejos = new HashSet<OscafeDespejo>();
					
					oscafeDespejos = lote.getOscafeDespejos();
					
					if (oscafeDespejos.isEmpty() || oscafeDespejos == null) return null;
					else {
					
						for (OscafeDespejo oscafeDespejo : oscafeDespejos) {
							
							if (oscafeDespejo.getOscafe().getId() == idCadastro.getId()) return oscafeDespejo;
							
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
