package br.net.lls.milho.dao;

import java.util.Date;
import java.util.List;
import org.json.JSONObject;

import br.net.lls.milho.Milho;
import br.net.lls.milho.Entmilho;
import br.net.lls.milho.Saimilho;
import br.net.lls.componentes.Relatorio;
import br.net.lls.componentes.LancamentoDao;

public interface MilhoDao extends LancamentoDao {
	
	void adiciona(Milho milho);
	
	void altera(Milho milho);
	
	Milho buscaPorId(int id);
	
	boolean verificaExisteSaldo(int id);
	
	void setSaldoEntrada(Entmilho entmilho, int id, Date dataFaturamento);
	
	void removeSaldoEntrada(Entmilho entmilho, int id);
	
	void setSaldoSaida(Saimilho saimilho, int id);
	
	void removeSaldoSaida(Saimilho saimilho, int id);
	
	List listaProcura(String nome);
	
	List getSaldo(Relatorio relatorio);
	
}
