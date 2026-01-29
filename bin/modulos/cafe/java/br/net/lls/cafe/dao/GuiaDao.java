package br.net.lls.cafe.dao;

import br.net.lls.cafe.Guia;

public interface GuiaDao {
	
	void altera(Guia guia);
	
	Guia buscaPorId(int id);
	
	void soma(int id);
	
}
