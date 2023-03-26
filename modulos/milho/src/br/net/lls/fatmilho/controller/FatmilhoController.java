package br.net.lls.fatmilho.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import java.io.IOException;
import javax.validation.Valid;
import javax.json.JsonObject;
import java.util.List;
import java.util.Date;
import org.json.JSONObject;

import br.net.lls.componentes.ControllerUtil;
import br.net.lls.componentes.Relatorio;
import br.net.lls.componentes.Consulta;
import br.net.lls.componentes.Data;
import br.net.lls.fatmilho.dao.FatmilhoDao;
import br.net.lls.fatmilho.dao.ServmilhoDao;

@Transactional
@Controller
public class FatmilhoController {
 
	@Autowired
	FatmilhoDao fatmilhoDao;
	
	@Autowired
	ServmilhoDao servmilhoDao;
	
	@RequestMapping("listaMovimentomilho")
	public @ResponseBody String movimento(@RequestBody @Valid Relatorio relatorio,
										  BindingResult result) {
		
		if(result.hasFieldErrors()) {
			return ControllerUtil.getMessageError(result.getFieldError());
		}
		else {
			
			return Consulta.getJson(fatmilhoDao.getListaJSONArray(relatorio),
									fatmilhoDao.getTotalJSONObject(relatorio));
			
		}
		
	}
	
	@RequestMapping("executaFaturamilho")
	public @ResponseBody String faturamento(@RequestBody @Valid Relatorio relatorio,
											BindingResult result) {
		
		if(result.hasFieldErrors()) {
			return ControllerUtil.getMessageError(result.getFieldError());
		}
		else {
			
			String status = "";
			String mensagem = "";
			
			Date dataInicialFaturamento = relatorio.getDataInicial().getTime();
			Date dataFinalFaturamento = relatorio.getDataFinal().getTime();
			Date dataUltimoFaturamento = fatmilhoDao.getDataUltimoFaturamento(relatorio);
			
			int diasInicial = Data.getDaysDiff(dataUltimoFaturamento, dataInicialFaturamento);
			
			int diasFinal = Data.getDaysDiff(dataInicialFaturamento, dataFinalFaturamento);
			
			int diasDataFinalAtual = Data.getDaysDiff(Data.StringToDate(Data.DataAtual()), dataFinalFaturamento);
			
			boolean verificaMes = Data.verificaMes(dataInicialFaturamento, dataFinalFaturamento);
			
			boolean verificaDias = false;
			
			if (relatorio.getIdFazenda() == 0) {
			
				if (diasFinal >= 25 && diasFinal <= 31 && diasDataFinalAtual <= 5) {
					
					verificaDias = true;
					
				}
				
			}
			else {
				
				if (diasFinal <= 31 && diasDataFinalAtual <= 5) {
					
					verificaDias = true;
					
				}
				
			}
			
			if (dataInicialFaturamento.after(dataUltimoFaturamento) &&
				diasInicial == 1 && verificaDias && verificaMes) {
				
				fatmilhoDao.setFaturamento(relatorio);
				
				servmilhoDao.setServico(relatorio);
				
				servmilhoDao.updateServico(relatorio);
				
				servmilhoDao.finalizarFaturamento(relatorio);
				
				status = "200";
				
				mensagem = "Faturamento executado com sucesso!";
				
			}
			else {
				
				status = "400";
				
				mensagem = "Faturamento nao permitido!";
				
			}
			
			return ControllerUtil.getMessage(status, mensagem);
			
		}
		
	}
	
}
