package br.net.lls.cadastro.dao;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import java.util.List;
import java.util.ArrayList;

import br.net.lls.cadastro.Produtor;
import org.springframework.stereotype.Repository;

import org.hibernate.Session;
import org.hibernate.Criteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Criterion;
import org.hibernate.transform.Transformers;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;

@Repository
public class JpaProdutorDao implements ProdutorDao {
	
	@PersistenceContext
	EntityManager entityManager;
	
	public void adiciona(Produtor produtor) {
		
		entityManager.persist(produtor);
		
	}
	
	public void altera(Produtor produtor) {
		
		entityManager.merge(produtor);
		
	}
	
	public List lista(int pageNumber, String texto, int pageSize) {
		
		Session session = (Session) entityManager.getDelegate();
		
		Criterion nomeCriterion = Restrictions.ilike("nome", texto, MatchMode.ANYWHERE);
		
		Criterion cpfcnpjCriterion = Restrictions.ilike("cpfcnpj", texto, MatchMode.ANYWHERE);
		
		Criteria criteria = session.createCriteria(Produtor.class)
			.setProjection(Projections.projectionList()
				.add(Projections.property("id"), "id")
				.add(Projections.property("nome"), "nome")
				.add(Projections.property("cpfcnpj"), "cpfcnpj")
				.add(Projections.property("endereco"), "endereco")
				.add(Projections.property("bairro"), "bairro")
				.add(Projections.property("cidade"), "cidade")
				.add(Projections.property("estado"), "estado")
				.add(Projections.property("cep"), "cep")
			)
			.add(Restrictions.or(nomeCriterion, cpfcnpjCriterion))
			.addOrder(Order.asc("nome"))
			.setFirstResult((pageNumber - 1) * pageSize)
			.setMaxResults(pageSize)
			.setResultTransformer(Transformers.aliasToBean(Produtor.class));
		
		List list = criteria.list();
		
		return list;
		
	}
	
	public void remove(int id) {
		
		Produtor produtor = buscaPorId(id);
		
		entityManager.remove(produtor);
		
	}
	
	public Produtor buscaPorId(int id) {
		
		return entityManager.find(Produtor.class, id);
		
	}
	
	public boolean verificaExiste(String campo, String texto) {
		
		Session session = (Session) entityManager.getDelegate();
		
		Criteria criteria = session.createCriteria(Produtor.class);
		
		criteria.setProjection(Projections.rowCount());
		
		Criterion campoCriterion = Restrictions.eq(campo, texto);
		
		criteria.add(campoCriterion);
		
		Long total = (Long) criteria.uniqueResult();
		
		if (total == 1) {
			
			return true;
			
		}
		else {
			
			return false;
		}
		
	}
	
	public int[] getQuantidadePaginas(String texto, int pageSize) {
		
		Session session = (Session) entityManager.getDelegate();
		
		Criteria criteriaCount = session.createCriteria(Produtor.class);
		
		criteriaCount.setProjection(Projections.rowCount());
		
		Criterion nomeCriterion = Restrictions.ilike("nome", texto, MatchMode.ANYWHERE);
		
		Criterion cpfcnpjCriterion = Restrictions.ilike("cpfcnpj", texto, MatchMode.ANYWHERE);
		
		Criterion emailCriterion = Restrictions.ilike("email", texto, MatchMode.ANYWHERE);
		
		criteriaCount.add(Restrictions.or(nomeCriterion, cpfcnpjCriterion, emailCriterion));
		
		Long totalRecords = (Long) criteriaCount.uniqueResult();
		
		int qtdPaginas = (totalRecords.intValue() + pageSize - 1) / pageSize;
		
		int[] array = new int[2];
		
		array[0] = qtdPaginas;
		array[1] = totalRecords.intValue();
			
		return array;
		
	}
	
	public Produtor urlDecoder(Produtor produtor) {
		
		 try {
		
			produtor.setNome(URLDecoder.decode(produtor.getNome(), "UTF-8"));
			produtor.setEndereco(URLDecoder.decode(produtor.getEndereco(), "UTF-8"));
			produtor.setBairro(URLDecoder.decode(produtor.getBairro(), "UTF-8"));
			produtor.setCidade(URLDecoder.decode(produtor.getCidade(), "UTF-8"));
			produtor.setObservacao(URLDecoder.decode(produtor.getObservacao(), "UTF-8"));
		
		} catch (java.io.UnsupportedEncodingException e) {}
		
		return produtor;
		
	}
	
}
