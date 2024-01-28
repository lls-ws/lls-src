package br.net.lls.fatmilho.dao;

import java.util.List;
import org.json.JSONObject;
import org.json.JSONArray;

import br.net.lls.fatmilho.Servmilho;
import br.net.lls.componentes.Relatorio;
import br.net.lls.componentes.LancamentoDao;

public interface ServmilhoDao extends LancamentoDao {
	
	boolean remover(int id);
	
	void setServico(Relatorio relatorio);
	
	void adiciona(Servmilho servMilho);
	
	void altera(Servmilho servMilho);
	
	Servmilho buscaPorId(int id);
	
	void baixa(int id, boolean pago);
	
	Servmilho urlDecoder(Servmilho servMilho);
	
	void updateServico(Relatorio relatorio);
	
	void finalizarFaturamento(Relatorio relatorio);
	
	JSONObject getJSONById(int id);
	
	List getListSintetizado(Relatorio relatorio);
	
	List getListTotalSintetizado(Relatorio relatorio);
	
	JSONArray getListaSintetizadoJSONArray(Relatorio relatorio);
	
	JSONObject getTotalSintetizadoJSONObject(Relatorio relatorio);
	
}
