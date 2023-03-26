package br.net.lls.cadastro.dao;

import java.util.List;
import br.net.lls.cadastro.Produtor;

public interface ProdutorDao {
	
	Produtor buscaPorId(int id);
	
	List lista(int pageNumber, String texto, int pageSize);
	
	int[] getQuantidadePaginas(String texto, int pageSize);
	
	void adiciona(Produtor p);
	
	void altera(Produtor p);
	
	void remove(int id);
	
	boolean verificaExiste(String campo, String texto);
	
	Produtor urlDecoder(Produtor produtor);
	
}
