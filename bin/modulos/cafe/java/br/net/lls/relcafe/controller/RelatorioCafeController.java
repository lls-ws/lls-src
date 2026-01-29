package br.net.lls.relcafe.controller;

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

import br.net.lls.componentes.Id;
import br.net.lls.componentes.FileModel;
import br.net.lls.componentes.Relatorio;
import br.net.lls.componentes.RelatorioUtil;
import br.net.lls.componentes.JasperToByteArray;
import br.net.lls.cadastro.dao.EmpresaDao;
import br.net.lls.cadastro.dao.FazendaProdutorDao;
import br.net.lls.cafe.Entcafe;
import br.net.lls.cafe.Saicafe;
import br.net.lls.cafe.dao.LoteDao;
import br.net.lls.cafe.dao.EntcafeDao;
import br.net.lls.cafe.dao.SaicafeDao;
import br.net.lls.cafe.dao.SaicafeDespejoDao;
import br.net.lls.cafe.Oscafe;
import br.net.lls.cafe.dao.OscafeDao;
import br.net.lls.cafe.dao.OscafeDespejoDao;
import br.net.lls.cafe.Tracafe;
import br.net.lls.cafe.dao.TracafeDao;
import br.net.lls.cafe.dao.TracafeDespejoDao;
import br.net.lls.fatcafe.dao.ServcafeDao;
import br.net.lls.fatcafe.dao.FatcafeDao;

@Transactional
@Controller
public class RelatorioCafeController {
 
	@Autowired
	EmpresaDao empresaDao;
 
	@Autowired
	FazendaProdutorDao fazendaDao;
	
	@Autowired
	LoteDao loteDao;
	
	@Autowired
	ServcafeDao servcafeDao;
	
	@Autowired
	FatcafeDao fatcafeDao;
	
	@Autowired
	EntcafeDao entcafeDao;
	
	@Autowired
	SaicafeDao saicafeDao;
	
	@Autowired
	SaicafeDespejoDao saicafeDespejoDao;
	
	@Autowired
	OscafeDao oscafeDao;
	
	@Autowired
	OscafeDespejoDao oscafeDespejoDao;
	
	@Autowired
	TracafeDao tracafeDao;
	
	@Autowired
	TracafeDespejoDao tracafeDespejoDao;
	
	@RequestMapping(value = "relatorioEntcafe")
	public @ResponseBody FileModel relatorioEntcafe(@RequestBody @Valid Relatorio relatorio,
													BindingResult result) throws Exception {
		
		if(result.hasFieldErrors()) {
			return null;
		}
		else {
		
			String jrxml = "entradacafe";
			relatorio.setNome("Relação de Entradas de Café");
			relatorio.setNomeTipo(RelatorioUtil.getNomeTipo(relatorio, 2));
			
			return RelatorioUtil.getFileModel(relatorio, jrxml,
											  entcafeDao.getListaJSONArray(relatorio),
											  entcafeDao.getTotalJSONObject(relatorio),
											  empresaDao.getJSONObject(),
											  fazendaDao.buscaPorId(relatorio.getIdFazenda()));
			
		}
		
	}
	
	@RequestMapping(value = "relatorioSaicafe")
	public @ResponseBody FileModel relatorioSaicafe(@RequestBody @Valid Relatorio relatorio,
													BindingResult result) throws Exception {
		
		if(result.hasFieldErrors()) {
			return null;
		}
		else {
		
			String jrxml = "saidacafe";
			relatorio.setNome("Relação de Saídas de Café");
			relatorio.setNomeTipo(RelatorioUtil.getNomeTipo(relatorio, 3));
			
			return RelatorioUtil.getFileModel(relatorio, jrxml,
											  saicafeDao.getListaJSONArray(relatorio),
											  saicafeDao.getTotalJSONObject(relatorio),
											  empresaDao.getJSONObject(),
											  fazendaDao.buscaPorId(relatorio.getIdFazenda()));
			
		}
		
	}
	
	@RequestMapping(value = "relatorioOscafe")
	public @ResponseBody FileModel relatorioOscafe(@RequestBody @Valid Relatorio relatorio,
													BindingResult result) throws Exception {
		
		if(result.hasFieldErrors()) {
			return null;
		}
		else {
		
			String jrxml = "oscafe";
			relatorio.setNome("Relação de Serviços de Café");
			relatorio.setNomeTipo(RelatorioUtil.getNomeTipo(relatorio, 3));
			
			return RelatorioUtil.getFileModel(relatorio, jrxml,
											  oscafeDao.getListaJSONArray(relatorio),
											  oscafeDao.getTotalJSONObject(relatorio),
											  empresaDao.getJSONObject(),
											  fazendaDao.buscaPorId(relatorio.getIdFazenda()));
			
		}
		
	}
	
	@RequestMapping(value = "relatorioTracafe")
	public @ResponseBody FileModel relatorioTracafe(@RequestBody @Valid Relatorio relatorio,
													BindingResult result) throws Exception {
		
		if(result.hasFieldErrors()) {
			return null;
		}
		else {
		
			String jrxml = "transferenciacafe";
			relatorio.setNome("Relação de Transferências de Café");
			relatorio.setNomeTipo(RelatorioUtil.getNomeTipo(relatorio, 3));
			
			return RelatorioUtil.getFileModel(relatorio, jrxml,
											  tracafeDao.getListaJSONArray(relatorio),
											  tracafeDao.getTotalJSONObject(relatorio),
											  empresaDao.getJSONObject(),
											  fazendaDao.buscaPorId(relatorio.getIdFazenda()));
			
		}
		
	}
	
	@RequestMapping(value = "relatorioFaturacafe")
	public @ResponseBody FileModel relatorioFaturacafe(@RequestBody @Valid Relatorio relatorio,
														BindingResult result) throws Exception {
		
		if(result.hasFieldErrors()) {
			return null;
		}
		else {
		
			String jrxml = "faturamentocafe";
			relatorio.setNome("Relação de Faturamentos de Café");
			relatorio.setNomeTipo(RelatorioUtil.getNomeTipo(relatorio, 0));
			
			return RelatorioUtil.getFileModel(relatorio, jrxml,
											  fatcafeDao.getListaJSONArray(relatorio),
											  fatcafeDao.getTotalJSONObject(relatorio),
											  empresaDao.getJSONObject(),
											  fazendaDao.buscaPorId(relatorio.getIdFazenda()));
			
		}
		
	}
	
	@RequestMapping(value = "relatorioExtratocafe")
	public @ResponseBody FileModel relatorioExtratocafe(@RequestBody @Valid Relatorio relatorio,
														BindingResult result) throws Exception {
		
		if(result.hasFieldErrors()) {
			return null;
		}
		else {
		
			String jrxml = "extratocafe";
			relatorio.setNome("Relação de Lotes de Café");
			relatorio.setNomeTipo(RelatorioUtil.getNomeTipo(relatorio, 4));
			
			return RelatorioUtil.getFileModel(relatorio, jrxml,
											  loteDao.getListaJSONArray(relatorio),
											  loteDao.getTotalJSONObject(relatorio),
											  empresaDao.getJSONObject(),
											  fazendaDao.buscaPorId(relatorio.getIdFazenda()));
			
		}
		
	}
	
	@RequestMapping(value = "relatorioSaldocafe")
	public @ResponseBody FileModel relatorioSaldocafe(@RequestBody @Valid Relatorio relatorio,
														BindingResult result) throws Exception {
		
		if(result.hasFieldErrors()) {
			return null;
		}
		else {
		
			String jrxml = "saldocafe";
			relatorio.setNome("Relação de Saldos de Café");
			relatorio.setNomeTipo(RelatorioUtil.getNomeTipo(relatorio, 0));
			
			return RelatorioUtil.getFileModel(relatorio, jrxml,
											  loteDao.getSaldoJSONArray(relatorio),
											  loteDao.getTotalSaldoJSONObject(relatorio),
											  empresaDao.getJSONObject(),
											  fazendaDao.buscaPorId(relatorio.getIdFazenda()));
			
		}
		
	}
	
	@RequestMapping(value = "relatorioServicocafe")
	public @ResponseBody FileModel relatorioServicocafe(@RequestBody @Valid Relatorio relatorio,
														BindingResult result) throws Exception {
		
		if(result.hasFieldErrors()) {
			return null;
		}
		else {
		
			String jrxml = "servicocafe";
			relatorio.setNome("Relação de Cobranças de Café");
			relatorio.setNomeTipo(RelatorioUtil.getNomeTipo(relatorio, 0));
			
			return RelatorioUtil.getFileModel(relatorio, jrxml,
											  servcafeDao.getListaJSONArray(relatorio),
											  servcafeDao.getTotalJSONObject(relatorio),
											  empresaDao.getJSONObject(),
											  fazendaDao.buscaPorId(relatorio.getIdFazenda()));
			
		}
		
	}
	
	@RequestMapping(value = "relatorioSintetizacafe")
	public @ResponseBody FileModel relatorioSintetizacafe(@RequestBody @Valid Relatorio relatorio,
														BindingResult result) throws Exception {
		
		if(result.hasFieldErrors()) {
			return null;
		}
		else {
		
			String jrxml = "sintetizacafe";
			relatorio.setNome("Relação de Cobranças de Café");
			relatorio.setNomeTipo(RelatorioUtil.getNomeTipo(relatorio, 1));
			
			return RelatorioUtil.getFileModel(relatorio, jrxml,
											  servcafeDao.getListaSintetizadoJSONArray(relatorio),
											  servcafeDao.getTotalSintetizadoJSONObject(relatorio),
											  empresaDao.getJSONObject(),
											  fazendaDao.buscaPorId(relatorio.getIdFazenda()));
			
		}
		
	}
	
	@RequestMapping(value = "guiaEntcafe")
	public @ResponseBody FileModel guiaEntcafe(@RequestBody @Valid Id id,
												BindingResult result) throws Exception {
		
		if(result.hasFieldErrors()) {
			return null;
		}
		else {

			String jrxml = "guiaentradacafe";
			
			Entcafe entcafe = entcafeDao.buscaPorId(id.getId());
			
			JSONObject entcafeJSONObject = entcafeDao.getJSONById(entcafe, new JSONObject(), 0);
			
			entcafeJSONObject.put("texto", "Guia de Recebimento de Café");
			
			JSONObject jsonList = new JSONObject();
			
			jsonList.put("empresa", empresaDao.getJSONObject());
			jsonList.put("titulo", entcafeJSONObject);
			
			String json = jsonList.toString();
			
			return new FileModel("Filename",
								 "application/pdf",
								 JasperToByteArray.getByteArray(json, jrxml));
			
		}
		
	}
	
	@RequestMapping(value = "guiaEntcafeFechada")
	public @ResponseBody FileModel guiaEntcafeFechada(@RequestBody @Valid Id id,
													  BindingResult result) throws Exception {
		
		if(result.hasFieldErrors()) {
			return null;
		}
		else {

			String jrxml = "guiaentradacafefechada";
			
			JSONObject jsonList = new JSONObject();
		
			Entcafe entcafe = entcafeDao.buscaPorId(id.getId());
				
			JSONObject desdobrasJSONObject = new JSONObject();
				
			int sacasDesdobras = loteDao.getSacasDesdobras(entcafe.getLotes(), desdobrasJSONObject);
			
			JSONArray desdobrasJSONArray = desdobrasJSONObject.getJSONArray("lancamentos").getJSONArray(0);
			
			JSONObject totalDesdobrasJSONObject = desdobrasJSONObject.getJSONArray("rodape").getJSONObject(0);
			
			if (sacasDesdobras == entcafe.getSacas()) {
				
				JSONObject servcafeJSONObject = servcafeDao.getServcafeJSONObject(entcafe.getServcafes());
				
				JSONArray servcafeJSONArray  = servcafeJSONObject.getJSONArray("lancamentos").getJSONArray(0);
				
				JSONObject totalServcafeJSONObject = servcafeJSONObject.getJSONArray("rodape").getJSONObject(0);
				
				jsonList.put("cobranca", servcafeJSONArray);
				jsonList.put("totalCobranca", totalServcafeJSONObject);
				
			}
			
			JSONObject entcafeJSONObject = new JSONObject();
			
			entcafeJSONObject = entcafeDao.getJSONById(entcafe, entcafeJSONObject, sacasDesdobras);
			
			entcafeJSONObject.put("texto", "Guia de Recebimento de Café");
			
			jsonList.put("empresa", empresaDao.getJSONObject());
			jsonList.put("titulo", entcafeJSONObject);
			jsonList.put("desdobras", desdobrasJSONArray);
			jsonList.put("totalDesdobras", totalDesdobrasJSONObject);
			
			String json = jsonList.toString();
			
			return new FileModel("Filename",
								 "application/pdf",
								 JasperToByteArray.getByteArray(json, jrxml));
			
		}
		
	}
	
	@RequestMapping(value = "guiaSaicafeFechada")
	public @ResponseBody FileModel guiaSaicafeFechada(@RequestBody @Valid Id id,
													  BindingResult result) throws Exception {
		
		if(result.hasFieldErrors()) {
			return null;
		}
		else {

			String jrxml = "guiasaidacafefechada";
			
			JSONObject jsonList = new JSONObject();
			
			Saicafe saicafe = saicafeDao.buscaPorId(id.getId());
		
			JSONObject despejoJSONObject = new JSONObject();
				
			int sacasDespejo = saicafeDespejoDao.getSacasDespejo(saicafe.getSaicafeDespejos(), despejoJSONObject);
			
			JSONArray despejoJSONArray  = despejoJSONObject.getJSONArray("lancamentos").getJSONArray(0);
			
			JSONObject totalDespejoJSONObject = despejoJSONObject.getJSONArray("rodape").getJSONObject(0);
			
			if (sacasDespejo == saicafe.getSacas()) {
				
				JSONObject servcafeJSONObject = servcafeDao.getServcafeJSONObject(saicafe.getServcafes());
				
				JSONArray servcafeJSONArray  = servcafeJSONObject.getJSONArray("lancamentos").getJSONArray(0);
				
				JSONObject totalServcafeJSONObject = servcafeJSONObject.getJSONArray("rodape").getJSONObject(0);
				
				jsonList.put("cobranca", servcafeJSONArray);
				jsonList.put("totalCobranca", totalServcafeJSONObject);
				
			}
			
			JSONObject saicafeJSONObject = new JSONObject();
			
			saicafeJSONObject = saicafeDao.getJSONById(saicafe, saicafeJSONObject, sacasDespejo);
			
			saicafeJSONObject.put("texto", "Guia de Embarque de Café");
			
			jsonList.put("empresa", empresaDao.getJSONObject());
			jsonList.put("titulo", saicafeJSONObject);
			jsonList.put("despejo", despejoJSONArray);
			jsonList.put("totalDespejo", totalDespejoJSONObject);
			
			String json = jsonList.toString();
			
			return new FileModel("Filename",
								 "application/pdf",
								 JasperToByteArray.getByteArray(json, jrxml));
			
		}
		
	}
	
	@RequestMapping(value = "guiaOscafeFechada")
	public @ResponseBody FileModel guiaOscafeFechada(@RequestBody @Valid Id id,
													  BindingResult result) throws Exception {
		
		if(result.hasFieldErrors()) {
			return null;
		}
		else {

			String jrxml = "guiaservicocafefechada";
			
			JSONObject jsonList = new JSONObject();
			
			Oscafe oscafe = oscafeDao.buscaPorId(id.getId());
			
			JSONObject despejoJSONObject = new JSONObject();
				
			int sacasDespejo = oscafeDespejoDao.getSacasDespejo(oscafe.getOscafeDespejos(), despejoJSONObject);
			
			JSONArray despejoJSONArray  = despejoJSONObject.getJSONArray("lancamentos").getJSONArray(0);
			
			JSONObject totalDespejoJSONObject = despejoJSONObject.getJSONArray("rodape").getJSONObject(0);
			
			int qtdServico = 0;
			
			if (sacasDespejo == oscafe.getSacas()) {
				
				JSONObject desdobrasJSONObject = new JSONObject();
				
				sacasDespejo = loteDao.getSacasDesdobras(oscafe.getLotes(), desdobrasJSONObject);
				
				JSONArray desdobrasJSONArray = desdobrasJSONObject.getJSONArray("lancamentos").getJSONArray(0);
				
				JSONObject totalDesdobrasJSONObject = desdobrasJSONObject.getJSONArray("rodape").getJSONObject(0);
				
				jsonList.put("desdobras", desdobrasJSONArray);
				jsonList.put("totalDesdobras", totalDesdobrasJSONObject);
				
				if (sacasDespejo > 0) {
					
					JSONObject servcafeJSONObject = servcafeDao.getServcafeJSONObject(oscafe.getServcafes());
					
					JSONArray servcafeJSONArray  = servcafeJSONObject.getJSONArray("lancamentos").getJSONArray(0);
					
					JSONObject totalServcafeJSONObject = servcafeJSONObject.getJSONArray("rodape").getJSONObject(0);
					
					jsonList.put("cobranca", servcafeJSONArray);
					jsonList.put("totalCobranca", totalServcafeJSONObject);
					
					qtdServico = totalServcafeJSONObject.getInt("qtd");
					
				}
				
			}
			
			JSONObject oscafeJSONObject = new JSONObject();
			
			oscafeJSONObject = oscafeDao.getJSONById(oscafe, oscafeJSONObject, sacasDespejo);
			
			oscafeJSONObject.put("texto", "Ordem de Serviço de Café");
			oscafeJSONObject.put("qtdServico", qtdServico);
			
			jsonList.put("empresa", empresaDao.getJSONObject());
			jsonList.put("titulo", oscafeJSONObject);
			jsonList.put("despejo", despejoJSONArray);
			jsonList.put("totalDespejo", totalDespejoJSONObject);
			
			String json = jsonList.toString();
			
			return new FileModel("Filename",
								 "application/pdf",
								 JasperToByteArray.getByteArray(json, jrxml));
			
		}
		
	}
	
	@RequestMapping(value = "guiaTracafeFechada")
	public @ResponseBody FileModel guiaTracafeFechada(@RequestBody @Valid Id id,
													  BindingResult result) throws Exception {
		
		if(result.hasFieldErrors()) {
			return null;
		}
		else {

			String jrxml = "guiatransferenciacafefechada";
			
			JSONObject jsonList = new JSONObject();
			
			Tracafe tracafe = tracafeDao.buscaPorId(id.getId());
			
			JSONObject despejoJSONObject = new JSONObject();
			
			int sacasDespejo = tracafeDespejoDao.getSacasDespejo(tracafe.getTracafeDespejos(), despejoJSONObject);
			
			JSONArray despejoJSONArray  = despejoJSONObject.getJSONArray("lancamentos").getJSONArray(0);
			
			JSONObject totalDespejoJSONObject = despejoJSONObject.getJSONArray("rodape").getJSONObject(0);
			
			if (sacasDespejo == tracafe.getSacas()) {
				
				JSONObject desdobrasJSONObject = new JSONObject();
				
				sacasDespejo = loteDao.getSacasDesdobras(tracafe.getLotes(), desdobrasJSONObject);
				
				JSONArray desdobrasJSONArray = desdobrasJSONObject.getJSONArray("lancamentos").getJSONArray(0);
				
				JSONObject totalDesdobrasJSONObject = desdobrasJSONObject.getJSONArray("rodape").getJSONObject(0);
				
				jsonList.put("desdobras", desdobrasJSONArray);
				jsonList.put("totalDesdobras", totalDesdobrasJSONObject);
				
			}
			
			JSONObject tracafeJSONObject = new JSONObject();
			
			tracafeJSONObject = tracafeDao.getJSONById(tracafe, tracafeJSONObject, sacasDespejo);
			
			tracafeJSONObject.put("texto", "Guia de Transferência de Café");
			
			jsonList.put("empresa", empresaDao.getJSONObject());
			jsonList.put("titulo", tracafeJSONObject);
			jsonList.put("despejo", despejoJSONArray);
			jsonList.put("totalDespejo", totalDespejoJSONObject);
			
			String json = jsonList.toString();
			
			return new FileModel("Filename",
								 "application/pdf",
								 JasperToByteArray.getByteArray(json, jrxml));
			
		}
		
	}
	
}
