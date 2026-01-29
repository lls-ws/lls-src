package br.net.lls.fatcafe.dao;

import java.util.Date;
import java.util.List;
import org.json.JSONObject;

import br.net.lls.componentes.Relatorio;
import br.net.lls.componentes.LancamentoDao;

public interface FatcafeDao extends LancamentoDao {
	
	void setFaturamento(Relatorio relatorio);
	
	Date getDataFatEmpresa();
	
	Date getDataUltimoFaturamento(Relatorio relatorio);
	
}
