package br.net.lls.cadastro.dao;

import java.math.BigDecimal;
import java.util.List;
import br.net.lls.cadastro.Umidade;

public interface UmidadeDao {
	
	Umidade buscaPorId(int id);
	
	List lista(int pageNumber, BigDecimal codigo, int pageSize);
	
	int[] getQuantidadePaginas(int pageSize, BigDecimal codigo);
	
	void adiciona(Umidade u);
	
	void altera(Umidade u);
	
	void remove(int id);
	
	boolean verificaExiste(String campo, BigDecimal codigo);
	
	List lista(BigDecimal codigo);
	
}
