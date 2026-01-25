package br.net.lls.cadastro.dao;

import java.util.List;
import br.net.lls.cadastro.TelefoneProdutor;

public interface TelefoneProdutorDao {
	
	TelefoneProdutor buscaPorId(int id);
	
	List<String> achar(int id);
	
	List<TelefoneProdutor> lista();
	
	void adiciona(TelefoneProdutor tp);
	
	void altera(TelefoneProdutor tp);
	
	void remove(int id);
	
	void urlDecoder(TelefoneProdutor telefoneProdutor);
	
	void urlDecoder(TelefoneProdutor telefoneProdutor, TelefoneProdutor telefone);
	
}
