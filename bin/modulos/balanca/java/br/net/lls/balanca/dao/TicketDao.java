package br.net.lls.balanca.dao;

import br.net.lls.balanca.Ticket;

public interface TicketDao {
	
	void altera(Ticket ticket);
	
	Ticket buscaPorId(int id);
	
	void soma(int id);
	
}
