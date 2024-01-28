package br.net.lls.milho.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.SmartValidator;

import java.io.IOException;
import javax.validation.Valid;
import javax.json.JsonObject;

import br.net.lls.componentes.Id;
import br.net.lls.componentes.Data;
import br.net.lls.componentes.Relatorio;
import br.net.lls.componentes.Consulta;
import br.net.lls.componentes.ControllerUtil;
import br.net.lls.cadastro.FazendaProdutor;
import br.net.lls.cadastro.dao.FazendaProdutorDao;
import br.net.lls.cadastro.Umidade;
import br.net.lls.cadastro.dao.UmidadeDao;
import br.net.lls.cadastro.dao.LaudoDao;
import br.net.lls.milho.Entmilho;
import br.net.lls.milho.dao.EntmilhoDao;
import br.net.lls.milho.dao.MilhoDao;
import br.net.lls.fatmilho.dao.FatmilhoDao;

import java.util.List;
import java.util.Iterator;
import java.lang.Object;
import java.math.BigInteger;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.core.JsonGenerationException;

import org.json.JSONArray;
import org.json.JSONObject;

@Transactional
@Controller
public class EntmilhoController {
 
	@Autowired
	EntmilhoDao entmilhoDao;
	
	@Autowired
	MilhoDao milhoDao;
	
	@Autowired
	FatmilhoDao fatmilhoDao;
	
	@Autowired
	LaudoDao laudoDao;
	
	@Autowired
	UmidadeDao umidadeDao;
	
	@Autowired
	FazendaProdutorDao fazendaProdutorDao;
	
	@Autowired
	SmartValidator validator;
	
	@RequestMapping("salvaEntmilho")
	public @ResponseBody String adiciona(@RequestBody String json,
										 BindingResult result) {
		
		try {
			
			ObjectMapper mapper = new ObjectMapper();
			
			JsonNode node = mapper.readTree(json);
			
			Entmilho entmilho = mapper.convertValue(node.get("entmilho"), Entmilho.class);
			
			validator.validate(entmilho, result, Entmilho.EntmilhoValida.class);
			
			Id idUmidade = mapper.convertValue(node.get("umidade"), Id.class);
			
			validator.validate(idUmidade, result, Id.IdValida.class);
			
			if(result.hasFieldErrors()) {
				return ControllerUtil.getMessageError(result.getFieldError());
			}
			else {
				
				Umidade umidade = umidadeDao.buscaPorId(idUmidade.getId());
				
				entmilho.setUmidade(umidade);
				
				Id idFazendaProdutor = mapper.convertValue(node.get("fazendaProdutor"), Id.class);
				
				validator.validate(idFazendaProdutor, result, Id.IdValida.class);
				
				if(result.hasFieldErrors()) {
					return ControllerUtil.getMessageError(result.getFieldError());
				}
				else {
				
					FazendaProdutor fazendaProdutor = fazendaProdutorDao.buscaPorId(idFazendaProdutor.getId());
				
					entmilho.setFazendaProdutor(fazendaProdutor);
					
					if (entmilho.getId() == 0) {
						
						entmilhoDao.adiciona(entmilho);
						
						laudoDao.soma();
						
						milhoDao.setSaldoEntrada(entmilho, idFazendaProdutor.getId(), fatmilhoDao.getDataFatEmpresa());
						
						return ControllerUtil.getMessageSuccess("0");
						
					}
					
				}
				
			}
			
			return ControllerUtil.getMessageError("Erro ao salvar!");
			
		} catch (JsonGenerationException e) {
			return ControllerUtil.getMessageError(e.toString());
			
		} catch (IOException e) {
			return ControllerUtil.getMessageError(e.toString());
		}
		
	}
	
	@RequestMapping("listaEntmilho")
	public @ResponseBody String lista(@RequestBody @Valid Relatorio relatorio,
									  BindingResult result) {
		
		if(result.hasFieldErrors()) {
			return ControllerUtil.getMessageError(result.getFieldError());
		}
		else {
			
			List saldoList = milhoDao.getSaldo(relatorio);
			
			return Consulta.getJson(entmilhoDao.getListaJSONArray(relatorio),
									entmilhoDao.getTotalSaldoJSONObject(relatorio, saldoList));
			
		}
		
	}
	
	@RequestMapping("achaEntmilho")
	public @ResponseBody String acha(@RequestBody @Valid Id id,
									 BindingResult result) {
		
		if(result.hasFieldErrors()) {
			return ControllerUtil.getMessageError(result.getFieldError());
		}
		
		List entmilhoList = entmilhoDao.getListById(id.getId());
		
		JSONObject entmilhoJSON = new JSONObject();
		
		for (Iterator iterator = entmilhoList.iterator(); iterator.hasNext();) {
			
			Object[] list = (Object[]) iterator.next();
			
			entmilhoJSON.put("status", "200");
			entmilhoJSON.put("id", list[0]);
			entmilhoJSON.put("data", list[1]);
			entmilhoJSON.put("laudo", list[2]);
			entmilhoJSON.put("produtor", list[3]);
			entmilhoJSON.put("fazenda", list[4]);
			entmilhoJSON.put("bruto", list[5]);
			entmilhoJSON.put("impureza", list[6]);
			entmilhoJSON.put("valorImpureza", list[7]);
			entmilhoJSON.put("umidade", list[8]);
			entmilhoJSON.put("descontoUmidade", list[9]);
			entmilhoJSON.put("valorUmidade", list[10]);
			entmilhoJSON.put("quirela", list[11]);
			entmilhoJSON.put("valorQuirela", list[12]);
			entmilhoJSON.put("chocho", list[13]);
			entmilhoJSON.put("valorChocho", list[14]);
			entmilhoJSON.put("liquido", list[15]);
			entmilhoJSON.put("recepcao", list[16]);
			entmilhoJSON.put("limpeza", list[17]);
			entmilhoJSON.put("secagem", list[18]);
			entmilhoJSON.put("carga", list[19]);
			entmilhoJSON.put("total", list[20]);
			entmilhoJSON.put("tiket", list[21]);
			entmilhoJSON.put("placa", list[22]);
			entmilhoJSON.put("obs", list[23]);
			entmilhoJSON.put("cilo", list[24]);
			
		}
		
		return entmilhoJSON.toString();
		
	}
	
	@RequestMapping("removeEntmilho")
	public @ResponseBody String remove(@RequestBody @Valid Id id,
									   BindingResult result) {
		
		if(result.hasFieldErrors()) {
			return ControllerUtil.getMessageError(result.getFieldError());
		}
		
		String status = "";
		String mensagem = "";
		
		Entmilho entmilho = entmilhoDao.buscaPorId(id.getId());
		
		int dias = Data.getDaysDiff(entmilho.getData().getTime(), Data.StringToDate(Data.DataAtual()));
		
		if (dias == 0) {
			
			FazendaProdutor fazendaProdutor = entmilho.getFazendaProdutor();
		
			milhoDao.removeSaldoEntrada(entmilho, fazendaProdutor.getId());
		
			entmilhoDao.remove(id.getId());
			
			status = "200";
			mensagem = "Removido com sucesso!";
			
		}
		else {
			
			status = "400";
			mensagem = "Proibido remover!";
			
		}
		
		return ControllerUtil.getMessage(status, mensagem);
		
	}
	
}
