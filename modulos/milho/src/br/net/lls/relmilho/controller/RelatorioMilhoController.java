package br.net.lls.relmilho.controller;

import java.util.List;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;

import br.net.lls.componentes.FileModel;
import br.net.lls.componentes.Relatorio;
import br.net.lls.componentes.RelatorioUtil;
import br.net.lls.cadastro.FazendaProdutor;
import br.net.lls.cadastro.dao.FazendaProdutorDao;
import br.net.lls.cadastro.dao.EmpresaDao;
import br.net.lls.milho.dao.EntmilhoDao;
import br.net.lls.milho.dao.SaimilhoDao;
import br.net.lls.milho.dao.MilhoDao;
import br.net.lls.fatmilho.dao.FatmilhoDao;
import br.net.lls.fatmilho.dao.ServmilhoDao;

@Transactional
@Controller
public class RelatorioMilhoController {
 
	@Autowired
	EmpresaDao empresaDao;
 
	@Autowired
	FazendaProdutorDao fazendaDao;
	
	@Autowired
	EntmilhoDao entmilhoDao;
	
	@Autowired
	SaimilhoDao saimilhoDao;
	
	@Autowired
	MilhoDao milhoDao;
	
	@Autowired
	FatmilhoDao fatmilhoDao;
	
	@Autowired
	ServmilhoDao servmilhoDao;
	
	@RequestMapping(value = "relatorioEntmilho")
	public @ResponseBody FileModel relatorioEntmilho(@RequestBody Relatorio relatorio) throws Exception {
		
		String jrxml = "entradamilho";
		relatorio.setNome("Relação de Entradas de Milho");
		
		List saldoList = milhoDao.getSaldo(relatorio);
		
		return RelatorioUtil.getFileModel(relatorio, jrxml,
										  entmilhoDao.getListaJSONArray(relatorio),
										  entmilhoDao.getTotalSaldoJSONObject(relatorio, saldoList),
										  empresaDao.getJSONObject(),
										  fazendaDao.buscaPorId(relatorio.getIdFazenda()));
		
	}
	
	@RequestMapping(value = "relatorioSaimilho")
	public @ResponseBody FileModel relatorioSaimilho(@RequestBody Relatorio relatorio) throws Exception {
		
		String jrxml = "saidamilho";
		relatorio.setNome("Relação de Saídas de Milho");
		
		List saldoList = milhoDao.getSaldo(relatorio);
		
		return RelatorioUtil.getFileModel(relatorio, jrxml,
										  saimilhoDao.getListaJSONArray(relatorio),
										  saimilhoDao.getTotalSaldoJSONObject(relatorio, saldoList),
										  empresaDao.getJSONObject(),
										  fazendaDao.buscaPorId(relatorio.getIdFazenda()));
		
	}
	
	@RequestMapping(value = "relatorioMilho")
	public @ResponseBody FileModel relatorioMilho(@RequestBody Relatorio relatorio) throws Exception {
		
		String jrxml = "saldomilho";
		relatorio.setNome("Saldo de Milho");
		
		return RelatorioUtil.getFileModel(relatorio, jrxml,
										  milhoDao.getListaJSONArray(relatorio),
										  milhoDao.getTotalJSONObject(relatorio),
										  empresaDao.getJSONObject(),
										  fazendaDao.buscaPorId(relatorio.getIdFazenda()));
		
	}
	
	@RequestMapping(value = "relatorioMovimentomilho")
	public @ResponseBody FileModel relatorioMovimentomilho(@RequestBody Relatorio relatorio) throws Exception {
		
		String jrxml = "movimentomilho";
		relatorio.setNome("Relação de Faturamento de Milho");
		
		return RelatorioUtil.getFileModel(relatorio, jrxml,
										  fatmilhoDao.getListaJSONArray(relatorio),
										  fatmilhoDao.getTotalJSONObject(relatorio),
										  empresaDao.getJSONObject(),
										  fazendaDao.buscaPorId(relatorio.getIdFazenda()));
		
	}
	
	@RequestMapping(value = "relatorioServicomilho")
	public @ResponseBody FileModel relatorioServicomilho(@RequestBody Relatorio relatorio) throws Exception {
		
		String jrxml = "servicomilho";
		relatorio.setNome("Relação de Serviços de Milho");
		relatorio.setNomeTipo(RelatorioUtil.getNomeTipo(relatorio, 0));
		
		return RelatorioUtil.getFileModel(relatorio, jrxml,
										  servmilhoDao.getListaJSONArray(relatorio),
										  servmilhoDao.getTotalJSONObject(relatorio),
										  empresaDao.getJSONObject(),
										  fazendaDao.buscaPorId(relatorio.getIdFazenda()));
		
	}
	
	@RequestMapping(value = "relatorioSintetizamilho")
	public @ResponseBody FileModel relatorioSintetizamilho(@RequestBody Relatorio relatorio) throws Exception {
		
		String jrxml = "sintetizamilho";
		relatorio.setNome("Relação Sintetizada dos Serviços de Milho");
		relatorio.setNomeTipo(RelatorioUtil.getNomeTipo(relatorio, 1));
		
		return RelatorioUtil.getFileModel(relatorio, jrxml,
										  servmilhoDao.getListaSintetizadoJSONArray(relatorio),
										  servmilhoDao.getTotalSintetizadoJSONObject(relatorio),
										  empresaDao.getJSONObject(),
										  fazendaDao.buscaPorId(relatorio.getIdFazenda()));
		
	}
	
}
