package br.net.lls.cadastro.dao;

import java.util.List;
import br.net.lls.componentes.Id;
import br.net.lls.cadastro.Preco;

public interface PrecoDao {
	
	Preco buscaPorId(int id);
	
	List lista(int pageNumber, Id id, int pageSize);
	
	int[] getQuantidadePaginas(String texto, int pageSize);
	
	void adiciona(Preco p);
	
	void altera(Preco p);
	
	void remove(int id);
	
	boolean verificaExiste(String campo, String texto);
	
	List listaEntmilho();
	
	Preco urlDecoder(Preco preco);
	
}
