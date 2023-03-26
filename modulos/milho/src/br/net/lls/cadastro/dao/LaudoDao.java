package br.net.lls.cadastro.dao;

import br.net.lls.cadastro.Laudo;

public interface LaudoDao {
	
	void altera(Laudo laudo);
	
	Laudo buscaPorId(int id);
	
	void soma();
	
}
