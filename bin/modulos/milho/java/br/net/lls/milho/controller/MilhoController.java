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
import br.net.lls.componentes.Relatorio;
import br.net.lls.componentes.Consulta;
import br.net.lls.componentes.ControllerUtil;
import br.net.lls.cadastro.FazendaProdutor;
import br.net.lls.cadastro.dao.FazendaProdutorDao;
import br.net.lls.cadastro.Umidade;
import br.net.lls.cadastro.dao.UmidadeDao;
import br.net.lls.milho.Milho;
import br.net.lls.milho.Tramilho;
import br.net.lls.milho.Saimilho;
import br.net.lls.milho.Entmilho;
import br.net.lls.milho.dao.MilhoDao;
import br.net.lls.milho.dao.SaimilhoDao;
import br.net.lls.milho.dao.EntmilhoDao;
import br.net.lls.fatmilho.dao.FatmilhoDao;

import java.util.List;
import java.util.Iterator;
import java.lang.Object;
import java.math.BigDecimal;
import java.math.BigInteger;

import org.json.JSONArray;
import org.json.JSONObject;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.core.JsonGenerationException;

@Transactional
@Controller
public class MilhoController {
 
	@Autowired
	MilhoDao milhoDao;
	
	@Autowired
	SaimilhoDao saimilhoDao;
	
	@Autowired
	EntmilhoDao entmilhoDao;
	
	@Autowired
	FatmilhoDao fatmilhoDao;
	
	@Autowired
	UmidadeDao umidadeDao;
	
	@Autowired
	FazendaProdutorDao fazendaProdutorDao;
	
	@Autowired
	SmartValidator validator;
	
	@RequestMapping("achaMilho")
	public @ResponseBody String acha(@RequestBody @Valid Id id,
									 BindingResult result) {
		
		if(result.hasFieldErrors()) {
			return ControllerUtil.getMessageError(result.getFieldError());
		}
		
		List milhoList = milhoDao.getListById(id.getId());
		
		JSONObject milhoJSON = new JSONObject();
		
		for (Iterator iterator = milhoList.iterator(); iterator.hasNext();) {
			
			Object[] list = (Object[]) iterator.next();
			
			milhoJSON.put("status", "200");
			milhoJSON.put("id", list[0]);
			milhoJSON.put("produtor", list[1]);
			milhoJSON.put("fazenda", list[2]);
			milhoJSON.put("dataEntrada", list[3]);
			milhoJSON.put("entrada", list[4]);
			milhoJSON.put("dataSaida", list[5]);
			milhoJSON.put("saida", list[6]);
			milhoJSON.put("saldo", list[7]);
			milhoJSON.put("dataFaturamento", list[8]);
			
		}
		
		return milhoJSON.toString();
		
	}
	
	@RequestMapping("listaMilho")
	public @ResponseBody String lista(@RequestBody @Valid Relatorio relatorio,
									  BindingResult result) {
		
		if(result.hasFieldErrors()) {
			return ControllerUtil.getMessageError(result.getFieldError());
		}
		else {
			
			return Consulta.getJson(milhoDao.getListaJSONArray(relatorio),
									milhoDao.getTotalJSONObject(relatorio));
			
		}
		
	}

	@RequestMapping("listaProcuraMilho")
	public @ResponseBody String listaProcura(@RequestBody @Valid Id id,
											 BindingResult result) {
		
		if(result.hasFieldErrors()) {
			return ControllerUtil.getMessageError(result.getFieldError());
		}
		else {
			
			List produtorList = milhoDao.listaProcura(id.getNome());
			
			JSONArray produtoresArray = new JSONArray(produtorList);
						
			JSONObject jsonList = new JSONObject();
			
			jsonList.put("cadastros", produtoresArray);
			
			jsonList.put("status", "200");
			
			return jsonList.toString();
			
		}
		
	}

	@RequestMapping("salvaTramilho")
	public @ResponseBody String transferencia(@RequestBody String json,
										 BindingResult result) {
		
		String status = "";
		String mensagem = "";
		
		try {
			
			ObjectMapper mapper = new ObjectMapper();
			
			JsonNode node = mapper.readTree(json);
			
			Tramilho tramilho = mapper.convertValue(node.get("tramilho"), Tramilho.class);
			
			validator.validate(tramilho, result, Tramilho.TramilhoValida.class);
			
			if(result.hasFieldErrors()) {
				return ControllerUtil.getMessageError(result.getFieldError());
			}
			else {
				
				FazendaProdutor fazendaProdutorSaida = fazendaProdutorDao.buscaPorId(tramilho.getIdFazendaSaida());
				
				Saimilho saimilho = new Saimilho();
				
				saimilho.setData(tramilho.getData());
				saimilho.setLiquido(tramilho.getLiquido());
				saimilho.setDestino("Transferido");
				saimilho.setObs(tramilho.getObs());
				saimilho.setFazendaProdutor(fazendaProdutorSaida);
				
				saimilhoDao.adiciona(saimilho);
				
				milhoDao.setSaldoSaida(saimilho, tramilho.getIdFazendaSaida());
				
				FazendaProdutor fazendaProdutorEntrada = fazendaProdutorDao.buscaPorId(tramilho.getIdFazendaEntrada());
				
				Umidade umidade = umidadeDao.buscaPorId(1);
				
				Entmilho entmilho = new Entmilho();
				
				entmilho.setData(tramilho.getData());
				entmilho.setLiquido(tramilho.getLiquido());
				entmilho.setObs(tramilho.getObs());
				entmilho.setFazendaProdutor(fazendaProdutorEntrada);
				entmilho.setUmidade(umidade);
				entmilho.setBruto(new BigDecimal(0));
				entmilho.setImpureza(new BigDecimal(0));
				entmilho.setChocho(new BigDecimal(0));
				entmilho.setQuirela(new BigDecimal(0));
				entmilho.setCarga(new BigDecimal(0));
				entmilho.setLimpeza(new BigDecimal(0));
				entmilho.setSecagem(new BigDecimal(0));
				entmilho.setRecepcao(new BigDecimal(0));
				entmilho.setTotal(new BigDecimal(0));
				
				entmilhoDao.adiciona(entmilho);
				
				milhoDao.setSaldoEntrada(entmilho, tramilho.getIdFazendaEntrada(), fatmilhoDao.getDataFatEmpresa());
				
				status = "200";
				
				mensagem = "Transferido com sucesso!";
				
			}
			
			return ControllerUtil.getMessage(status, mensagem);
			
		} catch (JsonGenerationException e) {
			return ControllerUtil.getMessageError(e.toString());
			
		} catch (IOException e) {
			return ControllerUtil.getMessageError(e.toString());
		}
		
	}
	
}
