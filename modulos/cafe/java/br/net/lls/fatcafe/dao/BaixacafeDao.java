package br.net.lls.fatcafe.dao;

import java.util.Set;
import java.util.List;
import java.math.BigDecimal;
import org.json.JSONObject;

import br.net.lls.fatcafe.Baixacafe;
import br.net.lls.componentes.Relatorio;

public interface BaixacafeDao {
	
	void adiciona(Baixacafe baixaCafe);
	
	void altera(Baixacafe baixaCafe);
	
	void remove(Baixacafe baixacafe);
	
	Baixacafe buscaPorId(int id);
	
	List getListById(int idServ);
	
	List getBaixas(int idServ);
	
	List getTotaisBaixas(int idServ);
	
	Baixacafe urlDecoder(Baixacafe baixaCafe);
	
	BigDecimal getValorPago(Set<Baixacafe> baixacafes, JSONObject servcafeJSONObject);
	
}
