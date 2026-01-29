package br.net.lls.fatmilho.dao;

import java.util.List;
import br.net.lls.fatmilho.Baixamilho;
import br.net.lls.componentes.Relatorio;

public interface BaixamilhoDao {
	
	void adiciona(Baixamilho baixaMilho);
	
	void altera(Baixamilho baixaMilho);
	
	void remove(Baixamilho baixamilho);
	
	Baixamilho buscaPorId(int id);
	
	List getListById(int idServ);
	
	List getBaixas(int idServ);
	
	List getTotaisBaixas(int idServ);
	
	Baixamilho urlDecoder(Baixamilho baixaMilho);
	
}
