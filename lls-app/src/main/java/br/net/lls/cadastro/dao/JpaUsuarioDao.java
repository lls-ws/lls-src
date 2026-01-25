package br.net.lls.cadastro.dao;

import br.net.lls.cadastro.Usuario;
import javax.persistence.Query;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import javax.persistence.NoResultException;
import org.hibernate.Session;
import org.hibernate.Criteria;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.criterion.Criterion;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.lang.Math;

@Repository
public class JpaUsuarioDao implements UsuarioDao {
	
	@PersistenceContext
	EntityManager entityManager;
	
	public void adiciona(Usuario usuario) {
		
		urlDecoder(usuario);
		
		entityManager.persist(usuario);
		
	}
	
	public void altera(Usuario usuario) {
		
		urlDecoder(usuario);
		
		entityManager.merge(usuario);
		
	}
	
	public Usuario buscaPorEmail(String email) {
		
		Session session = (Session) entityManager.getDelegate();
		
		Criteria criteria = session.createCriteria(Usuario.class);
		
		Criterion campoCriterion = Restrictions.eq("email", email);
		
		criteria.add(campoCriterion);
		
		criteria.setMaxResults(1);
		
		Usuario usuario = (Usuario) criteria.uniqueResult();
		
		return usuario;
		
	}
	
	public Usuario validaUsuario(Usuario usuario) {
		
		Query query = entityManager.createQuery("SELECT u FROM Usuario u WHERE u.email = :email");
		
		query.setParameter("email", usuario.getEmail());
		
		try {
			
			usuario = (Usuario)query.getSingleResult();
			return usuario;
			
		}
		catch(NoResultException e){
			
			return null;
			
		}
		
	}
	
	public boolean verificaExiste(String campo, String texto) {
		
		Session session = (Session) entityManager.getDelegate();
		
		Criteria criteria = session.createCriteria(Usuario.class);
		
		criteria.setProjection(Projections.rowCount());
		
		Criterion campoCriterion = Restrictions.eq(campo, texto);
		
		criteria.add(campoCriterion);
		
		Long total = (Long) criteria.uniqueResult();
		
		if (total == 1) return true;
		else return false;
		
	}
	
	public Usuario urlDecoder(Usuario usuario) {
		
		 try {
		
			usuario.setNome(URLDecoder.decode(usuario.getNome(), "UTF-8"));
		
		} catch (java.io.UnsupportedEncodingException e) {}
		
		return usuario;
		
	}
	
	public String getCodigoSeguranca() {
		
		int digito1 = (int)(Math.random() * 9);
		int digito2 = (int)(Math.random() * 9);
		int digito3 = (int)(Math.random() * 9);
		int digito4 = (int)(Math.random() * 9);
		int digito5 = (int)(Math.random() * 9);
		int digito6 = (int)(Math.random() * 9);
		
		String senha = String.valueOf(digito1);
		senha += String.valueOf(digito2);
		senha += String.valueOf(digito3);
		senha += String.valueOf(digito4);
		senha += String.valueOf(digito5);
		senha += String.valueOf(digito6);
		
		return String.valueOf(senha);
		
	}
	
	public String pegaEmailTexto(Usuario usuario, int tipo) {
		
		String textoCorpo = "ativação do usuário";
		String textoLink = "ativar";
		String textoUrl = "usuario";
		
		if (tipo == 1) {
			
			textoCorpo = "recuperação de senha";
			textoLink = "recuperar";
			textoUrl = "senha";
			
		}
		
		String urlLink = "https://homeoffice.lls.net.br/" + textoUrl;
		
		String textoHtml = "<form>";
			textoHtml += "<br>Olá <b>" + usuario.getNome() + "</b>,<br>";
			textoHtml += "<br>Segue informações para " + textoCorpo + "!<br>";
			textoHtml += "<br>Codigo de Segurança: <b>" + usuario.getCodigoSeguranca() + "</b><br>";
			textoHtml += "<br>Acesse o link para " + textoLink + ":<br>" + urlLink;
			textoHtml += "<br><br>Att,<br>";
			textoHtml += "<br><b>LLS Tecnologia</b>";
			textoHtml += "</form>";
		
		return textoHtml;
		
	}
	
}
