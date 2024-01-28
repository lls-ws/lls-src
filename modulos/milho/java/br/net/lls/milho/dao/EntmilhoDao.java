package br.net.lls.milho.dao;

import java.util.List;
import org.json.JSONObject;

import br.net.lls.milho.Entmilho;
import br.net.lls.componentes.Relatorio;
import br.net.lls.componentes.LancamentoDao;

public interface EntmilhoDao extends LancamentoDao {
	
	void adiciona(Entmilho entmilho);
	
	void altera(Entmilho entmilho);
	
	Entmilho buscaPorId(int id);
	
	Entmilho urlDecoder(Entmilho entmilho);
	
	JSONObject getTotalSaldoJSONObject(Relatorio relatorio, List saldoList);
	
}
