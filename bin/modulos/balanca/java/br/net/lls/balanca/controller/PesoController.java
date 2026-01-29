package br.net.lls.balanca.controller;

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
import javax.json.Json;
import javax.json.JsonObject;
import java.math.BigDecimal;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.core.JsonGenerationException;
import org.json.JSONArray;
import org.json.JSONObject;
import java.util.Set;

import br.net.lls.componentes.Id;
import br.net.lls.componentes.Data;
import br.net.lls.componentes.Relatorio;
import br.net.lls.componentes.Consulta;
import br.net.lls.componentes.ControllerUtil;
import br.net.lls.cadastro.Usuario;
import br.net.lls.cadastro.Produtor;
import br.net.lls.cadastro.FazendaProdutor;
import br.net.lls.cadastro.dao.FazendaProdutorDao;
import br.net.lls.balanca.Ticket;
import br.net.lls.balanca.Peso;
import br.net.lls.balanca.TipoPeso;
import br.net.lls.balanca.TipoProduto;
import br.net.lls.balanca.Pesocafe;
import br.net.lls.balanca.dao.PesoDao;
import br.net.lls.balanca.dao.TicketDao;
import br.net.lls.cafe.Guia;
import br.net.lls.cafe.Entcafe;
import br.net.lls.cafe.dao.EntcafeDao;
import br.net.lls.cafe.dao.GuiaDao;
import br.net.lls.fatcafe.dao.CafeDao;
import br.net.lls.fatcafe.dao.FatcafeDao;
import br.net.lls.cafe.dao.ConsultaSql;

@Transactional
@Controller
public class PesoController {
 
	@Autowired
	PesoDao pesoDao;
	
	@Autowired
	TicketDao ticketDao;
	
	@Autowired
	FazendaProdutorDao fazendaProdutorDao;
	
	@Autowired
	GuiaDao guiaDao;
	
	@Autowired
	EntcafeDao entcafeDao;
	
	@Autowired
	CafeDao cafeDao;
	
	@Autowired
	FatcafeDao fatcafeDao;
	
	@Autowired
	SmartValidator validator;
	
	@RequestMapping("salvaPeso")
	public @ResponseBody String adiciona(@RequestBody String json,
										 BindingResult result,
										 HttpSession session) {
		
		try {
			
			ObjectMapper mapper = new ObjectMapper();
			
			JsonNode node = mapper.readTree(json);
			
			Peso peso = mapper.convertValue(node.get("cadastro"), Peso.class);
			
			validator.validate(peso, result, Peso.PesoValida.class);
			
			if(result.hasFieldErrors()) {
				return ControllerUtil.getMessageError(result.getFieldError());
			}
			else {
				
				Usuario usuario = (Usuario) session.getAttribute("usuarioLogado");
				
				peso.setUsuario(usuario.getEmail());
				
				int indexStatus = 0;
				
				String mensagem = "";
				
				if (peso.getId() == 0) {
					
					Ticket ticket = ticketDao.buscaPorId(1);
					
					peso.setTicket(ticket.getTicket());
					
					peso.setData(
						Data.StringToCalendar(
							peso.getDataText(), Data.HoraAtual()
						)
					);
					
					ticketDao.soma(1);
					
					mensagem = "Pesagem salva com sucesso!\nTicket: " + peso.getTicket();
					
					mensagem += checkEntcafe(peso, node, mapper, result);
					
					pesoDao.adiciona(peso);
					
				}
				else {
					
					Peso pesoAtual = pesoDao.buscaPorId(peso.getId());
					
					peso.setData(
						Data.StringToCalendar(
							pesoAtual.getDataText(), pesoAtual.getHora() + ":00"
						)
					);
					
					if (peso.getLiquido().compareTo(BigDecimal.ZERO) > 0) {
						
						peso.setDataFinalizado(
							Data.StringToCalendar(
								peso.getDataFinalizadoText(), Data.HoraAtual()
							)
						);
						
						peso.setFechado(true);
						
						indexStatus = 1;
						
						mensagem = "Pesagem finalizada com sucesso!\nTicket: " + peso.getTicket();
					
					}
					else {
						
						mensagem = "Pesagem alterada com sucesso!\nTicket: " + peso.getTicket();
						
					}
					
					mensagem += checkEntcafe(peso, node, mapper, result, pesoAtual);
					
					pesoDao.altera(peso);
					
				}
				
				JsonObject resposta = Json.createObjectBuilder()
					.add("status", "200")
					.add("mensagem", mensagem)
					.add("id", peso.getId())
					.add("indexStatus", indexStatus)
					.add("data", peso.getDataText())
					.build();
					
				return resposta.toString();
				
			}
				
		} catch (JsonGenerationException e) {
			return ControllerUtil.getMessageError(e.toString());
			
		} catch (IOException e) {
			return ControllerUtil.getMessageError(e.toString());
		}
		
	}
	
	@RequestMapping("listaPeso")
	public @ResponseBody String lista(@RequestBody @Valid Relatorio relatorio,
									  BindingResult result) {
		
		if(result.hasFieldErrors()) {
			return ControllerUtil.getMessageError(result.getFieldError());
		}
		else {
			
			return Consulta.getJson(pesoDao.getListaJSONArray(relatorio),
									pesoDao.getTotalJSONObject(relatorio));
		
		}
		
	}
	
	@RequestMapping("achaPeso")
	public @ResponseBody String acha(@RequestBody @Valid Id id,
									 BindingResult result) {
		
		if(result.hasFieldErrors()) {
			return ControllerUtil.getMessageError(result.getFieldError());
		}
		
		Peso peso = pesoDao.buscaPorId(id.getId());
		
		JSONObject jsonObject = pesoDao.getJSONById(peso);
		
		setProdutorDados(peso, jsonObject);
		
		jsonObject.put("status", "200");
		
		return jsonObject.toString();
		
	}
	
	@RequestMapping("removePeso")
	public @ResponseBody String remove(@RequestBody @Valid Id id,
									   BindingResult result) {
		
		if(result.hasFieldErrors()) {
			return ControllerUtil.getMessageError(result.getFieldError());
		}
		
		String status = "400";
		String mensagem = "Proibido remover!";
		
		Peso peso = pesoDao.buscaPorId(id.getId());
		
		int dias = Data.getDaysDiff(peso.getData().getTime(),
			Data.StringToDate(Data.DataAtual()));
		
		if (dias <= ConsultaSql.getDiasPermitidos() && !peso.getFechado()) {
			
			if (peso.getTipoProduto() == TipoProduto.CAFE &&
				peso.getFazendaProdutor_id() > 0 &&
				peso.getTipoPeso() == TipoPeso.ENTRADA) {
					
				Set<Entcafe> entcafes = peso.getEntcafes();
				
				for (Entcafe entcafe : entcafes) {
					
					peso.removeEntcafe(entcafe);
					
					entcafeDao.remove(entcafe.getId());
					
				}	
				
			}
			
			pesoDao.remove(id.getId());
			
			status = "200";
			mensagem = "Removido com sucesso!";
			
		}
		else {
			
			if (peso.getFechado()) {
					
				mensagem += "\nPesagem fechada!";
					
			}
			else mensagem += "\nFora da data permitida!";
			
		}
		
		return ControllerUtil.getMessage(status, mensagem);
		
	}
	
	@RequestMapping("achaBaixapeso")
	public @ResponseBody String achaBaixa(@RequestBody @Valid Id id,
										  BindingResult result) {
		
		return this.acha(id, result);
		
	}
	
	@RequestMapping("getGuiaPeso")
	public @ResponseBody String getGuiaEntcafe() {
		
		Ticket ticket = ticketDao.buscaPorId(1);
		
		Guia guia = guiaDao.buscaPorId(1);
						
		JSONObject dataJSON = new JSONObject();
		
		dataJSON.put("status", "200");
		dataJSON.put("data", Data.DataAtual());
		dataJSON.put("lote", guia.getGuia(guia.getId()));
		dataJSON.put("ticket", ticket.getTicket());
		
		return dataJSON.toString();
		
	}
	
	private String checkEntcafe(Peso peso, JsonNode node, ObjectMapper mapper, BindingResult result) {
		
		return checkEntcafe(peso, node, mapper, result, null);
		
	}
	
	private String checkEntcafe(Peso peso, JsonNode node, ObjectMapper mapper, BindingResult result, Peso pesoAtual) {
		
		String mensagem = "";
		
		if (peso.getTipoProduto() == TipoProduto.CAFE &&
			peso.getFazendaProdutor_id() > 0 &&
			peso.getTipoPeso() == TipoPeso.ENTRADA) {
			
			Pesocafe pesoCafe = mapper.convertValue(node.get("pesocafe"), Pesocafe.class);
			
			validator.validate(pesoCafe, result, Pesocafe.PesocafeValida.class);
			
			if(result.hasFieldErrors()) {
				return ControllerUtil.getMessageError(result.getFieldError());
			}
			else {
			
				if (peso.getId() == 0) {
				
					FazendaProdutor fazendaProdutor = fazendaProdutorDao.buscaPorId(peso.getFazendaProdutor_id());
					
					Guia guia = guiaDao.buscaPorId(1);
					
					Entcafe entcafe = new Entcafe();
					
					BigDecimal pesoNota = new BigDecimal(pesoCafe.getSacas() * 60.5);
					
					entcafe.setLote(guia.getGuia(guia.getId()));
					entcafe.setNota(pesoCafe.getNota());
					entcafe.setValor(pesoCafe.getValor());
					entcafe.setSacasNota(pesoCafe.getSacas());
					entcafe.setPesoNota(pesoNota);
					entcafe.setSacas(0);
					entcafe.setPeso(new BigDecimal(0.00));
					entcafe.setPlaca(peso.getPlaca());
					entcafe.setTicket(peso.getTicket());
					entcafe.setUsuario(peso.getUsuario());
					entcafe.setFazendaProdutor(fazendaProdutor);
					entcafe.setObservacao("Gerado automaticamente pelo ticket de pesagem!");
					
					entcafeDao.adiciona(entcafe);
					
					guiaDao.soma(1);
					
					cafeDao.criaCafe(peso.getFazendaProdutor_id(), fatcafeDao.getDataFatEmpresa());
					
					peso.addEntcafe(entcafe);
					
					mensagem = "\nLote: " + entcafe.getLote();
					
				}
				else {
					
					Set<Entcafe> entcafes = pesoAtual.getEntcafes();
					
					for (Entcafe entcafe : entcafes) {
					
						if (peso.getLiquido().compareTo(BigDecimal.ZERO) > 0) {
							
							entcafe.setData(peso.getData());
							entcafe.setSacas(pesoCafe.getSacas());
							entcafe.setPeso(peso.getLiquido());
							
						}
							
						BigDecimal pesoNota = new BigDecimal(pesoCafe.getSacas() * 60.5);
						
						entcafe.setNota(pesoCafe.getNota());
						entcafe.setValor(pesoCafe.getValor());
						entcafe.setSacasNota(pesoCafe.getSacas());
						entcafe.setPesoNota(pesoNota);
						entcafe.setPlaca(peso.getPlaca());
						entcafe.setUsuario(peso.getUsuario());
							
						entcafeDao.altera(entcafe);
						
						mensagem = "\nLote: " + entcafe.getLote();
						
					}
					
				}
				
			}
			
		}
		
		return mensagem;
		
	}
	
	public void setProdutorDados(Peso peso, JSONObject jsonObject) {
		
		int idProdutor = 0;
		int idFazenda = 0;
		
		String produtorNome = "";
		String fazendaNome = "";
		
		if (peso.getFazendaProdutor_id() == 0) {
			
			produtorNome = peso.getProdutor();
			
		}
		else {
			
			FazendaProdutor fazendaProdutor = fazendaProdutorDao.buscaPorId(peso.getFazendaProdutor_id());
			Produtor produtor = fazendaProdutor.getProdutor();
			
			idProdutor = produtor.getId();
			idFazenda = fazendaProdutor.getId();
			
			produtorNome = produtor.getNome();
			fazendaNome = fazendaProdutor.getNome();
			
		}
		
		jsonObject.put("idProdutor", idProdutor);
		jsonObject.put("idFazenda", idFazenda);
		jsonObject.put("produtor", produtorNome);
		jsonObject.put("fazenda", fazendaNome);
		
	}
	
}
