package br.net.lls.cadastro.dao;

import java.util.List;
import br.net.lls.cadastro.FazendaProdutor;

public interface FazendaProdutorDao {
	
	FazendaProdutor buscaPorId(int id);
	
	List<String> achar(int id);
	
	List lista(String nomeProdutor);
	
	void adiciona(FazendaProdutor f);
	
	void altera(FazendaProdutor f);
	
	void remove(int id);
	
	void urlDecoder(FazendaProdutor fazendaProdutor);
	
	void urlDecoder(FazendaProdutor fazendaProdutor, FazendaProdutor fazenda);
	
}
