package br.net.lls.milho.dao;

import java.util.List;
import org.json.JSONObject;

import br.net.lls.milho.Saimilho;
import br.net.lls.componentes.Relatorio;
import br.net.lls.componentes.LancamentoDao;

public interface SaimilhoDao extends LancamentoDao {
	
	void adiciona(Saimilho entmilho);
	
	void altera(Saimilho entmilho);
	
	Saimilho buscaPorId(int id);
	
	Saimilho urlDecoder(Saimilho entmilho);
	
	JSONObject getTotalSaldoJSONObject(Relatorio relatorio, List saldoList);
	
}
