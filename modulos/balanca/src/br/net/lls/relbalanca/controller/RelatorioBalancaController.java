package br.net.lls.relbalanca.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import javax.validation.Valid;
import org.json.JSONArray;
import org.json.JSONObject;
import java.util.Set;

import br.net.lls.componentes.Id;
import br.net.lls.componentes.FileModel;
import br.net.lls.componentes.Relatorio;
import br.net.lls.componentes.RelatorioUtil;
import br.net.lls.componentes.JasperToByteArray;
import br.net.lls.cadastro.dao.EmpresaDao;
import br.net.lls.cadastro.dao.FazendaProdutorDao;
import br.net.lls.balanca.Peso;
import br.net.lls.balanca.dao.PesoDao;
import br.net.lls.balanca.controller.PesoController;
import br.net.lls.relcafe.controller.RelatorioCafeController;
import br.net.lls.cafe.Entcafe;

@Transactional
@Controller
public class RelatorioBalancaController {
 
	@Autowired
	EmpresaDao empresaDao;
 
	@Autowired
	FazendaProdutorDao fazendaDao;
	
	@Autowired
	PesoDao pesoDao;
	
	@Autowired
	PesoController pesoController;
	
	@Autowired
	RelatorioCafeController relatorioCafeController;
	
	@RequestMapping(value = "relatorioPeso")
	public @ResponseBody FileModel relatorioPeso(@RequestBody @Valid Relatorio relatorio,
												 BindingResult result) throws Exception {
		
		if(result.hasFieldErrors()) {
			return null;
		}
		else {
		
			String jrxml = "pesagem";
			relatorio.setNome("Relação de Pesagens da Balança");
			relatorio.setNomeTipo(RelatorioUtil.getNomeTipo(relatorio, 2));
			
			return RelatorioUtil.getFileModel(relatorio, jrxml,
											  pesoDao.getListaJSONArray(relatorio),
											  pesoDao.getTotalJSONObject(relatorio),
											  empresaDao.getJSONObject(),
											  fazendaDao.buscaPorId(relatorio.getIdFazenda()));
			
		}
		
	}
	
	@RequestMapping(value = "guiaPeso")
	public @ResponseBody FileModel guiaEntcafe(@RequestBody @Valid Id id,
												BindingResult result) throws Exception {
		
		if(result.hasFieldErrors()) {
			return null;
		}
		else {

			Peso peso = pesoDao.buscaPorId(id.getId());
			
			Set<Entcafe> entcafes = peso.getEntcafes();
				
			for (Entcafe entcafe : entcafes) {
				
				id.setId(entcafe.getId());
				
			}
			
			return relatorioCafeController.guiaEntcafe(id, result);
			
		}
		
	}
	
	@RequestMapping(value = "imprimirPeso")
	public @ResponseBody FileModel imprimirPeso(@RequestBody @Valid Id id,
													BindingResult result) throws Exception {
		
		if(result.hasFieldErrors()) {
			return null;
		}
		else {

			String jrxml = "ticketpeso";
			
			Peso peso = pesoDao.buscaPorId(id.getId());
			
			JSONObject pesoJSONObject = pesoDao.getJSONById(peso);
			
			pesoJSONObject.put("texto", "Ticket de Peso");
			
			pesoController.setProdutorDados(peso, pesoJSONObject);
			
			JSONObject jsonList = new JSONObject();
			
			jsonList.put("empresa", empresaDao.getJSONObject());
			jsonList.put("titulo", pesoJSONObject);
			
			String json = jsonList.toString();
			
			return new FileModel("Filename",
								 "application/pdf",
								 JasperToByteArray.getByteArray(json, jrxml));
			
		}
		
	}
	
}
