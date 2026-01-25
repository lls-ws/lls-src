package br.net.lls.cadastro.dao;

import br.net.lls.cadastro.Usuario;

public interface UsuarioDao {
	
	void adiciona(Usuario usuario);
	
	void altera(Usuario usuario);
	
	Usuario buscaPorEmail(String email);
	
	Usuario validaUsuario(Usuario usuario);
	
	boolean verificaExiste(String campo, String texto);
	
	Usuario urlDecoder(Usuario usuario);
	
	String getCodigoSeguranca();
	
	String pegaEmailTexto(Usuario usuario, int tipo);
	
}
