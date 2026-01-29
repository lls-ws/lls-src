package br.net.lls.fatcafe.dao;

import java.util.Set;
import java.util.List;
import java.math.BigDecimal;
import org.json.JSONObject;
import org.json.JSONArray;

import br.net.lls.cadastro.Preco;
import br.net.lls.cafe.Entcafe;
import br.net.lls.cafe.Saicafe;
import br.net.lls.fatcafe.Servcafe;
import br.net.lls.componentes.Relatorio;
import br.net.lls.componentes.LancamentoDao;

public interface ServcafeDao extends LancamentoDao {
	
	void setServico(Relatorio relatorio);
	
	void adiciona(Servcafe servCafe);
	
	void altera(Servcafe servCafe);
	
	Servcafe buscaPorId(int id);
	
	void baixa(int id, boolean pago);
	
	Servcafe urlDecoder(Servcafe servCafe);
	
	void finalizarFaturamento(Relatorio relatorio);
	
	List getListSintetizado(Relatorio relatorio);
	
	List getListTotalSintetizado(Relatorio relatorio);
	
	JSONArray getListaSintetizadoJSONArray(Relatorio relatorio);
	
	JSONObject getTotalSintetizadoJSONObject(Relatorio relatorio);
	
	void updateCafe();
	
	JSONObject getJSONById(Servcafe servcafe, JSONObject servcafeJSONObject, BigDecimal valorPago);
	
	String criaServico(Entcafe entcafe, Preco preco);
	
	JSONObject getServcafeJSONObject(Set<Servcafe> servcafes);
	
	String criaServico(Saicafe saicafe, Preco preco);
	
	JSONObject getJSONById(int id);
	
}
