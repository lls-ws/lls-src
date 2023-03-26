package br.net.lls.cadastro.dao;

import java.util.List;
import br.net.lls.cadastro.Peneira;

public interface PeneiraDao {
	
	Peneira buscaPorId(int id);
	
	List lista(int pageNumber, String texto, int pageSize);
	
	int[] getQuantidadePaginas(String texto, int pageSize);
	
	void adiciona(Peneira p);
	
	void altera(Peneira p);
	
	void remove(int id);
	
	boolean verificaExiste(String campo, String texto);
	
	Peneira urlDecoder(Peneira peneira);
	
}
