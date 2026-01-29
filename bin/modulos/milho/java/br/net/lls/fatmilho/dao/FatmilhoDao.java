package br.net.lls.fatmilho.dao;

import java.util.Date;
import java.util.List;
import org.json.JSONObject;

import br.net.lls.componentes.Relatorio;
import br.net.lls.componentes.LancamentoDao;

public interface FatmilhoDao extends LancamentoDao {
	
	void setFaturamento(Relatorio relatorio);
	
	Date getDataFatEmpresa();
	
	Date getDataFatMilho(int id);
	
	Date getDataUltimoFaturamento(Relatorio relatorio);
	
}
