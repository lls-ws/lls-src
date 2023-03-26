package br.net.lls.cadastro.dao;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Root;
import javax.persistence.TypedQuery;

import java.math.BigDecimal;
import java.util.List;
import java.util.ArrayList;

import br.net.lls.cadastro.Peneira;
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
public class JpaPeneiraDao implements PeneiraDao {
	
	@PersistenceContext
	EntityManager entityManager;
	
	public void adiciona(Peneira peneira) {
		
		urlDecoder(peneira);
		
		entityManager.persist(peneira);
		
	}
	
	public void altera(Peneira peneira) {
		
		urlDecoder(peneira);
		
		entityManager.merge(peneira);
		
	}
	
	public List lista(int pageNumber, String texto, int pageSize) {
		
		Session session = (Session) entityManager.getDelegate();
		
		Criteria criteria = session.createCriteria(Peneira.class)
			.setProjection(Projections.projectionList()
				.add(Projections.property("id"), "id")
				.add(Projections.property("nome"), "nome"))
			.add(Restrictions.ilike("nome", texto, MatchMode.ANYWHERE))
			.addOrder(Order.asc("nome"))
			.setFirstResult((pageNumber - 1) * pageSize)
			.setMaxResults(pageSize)
			.setResultTransformer(Transformers.aliasToBean(Peneira.class));
		
		List list = criteria.list();
		
		return list;
		
	}
	
	public void remove(int id) {
		
		Peneira peneira = buscaPorId(id);
		
		entityManager.remove(peneira);
		
	}
	
	public Peneira buscaPorId(int id) {
		
		return entityManager.find(Peneira.class, id);
		
	}
	
	public boolean verificaExiste(String campo, String texto) {
		
		Session session = (Session) entityManager.getDelegate();
		
		Criteria criteria = session.createCriteria(Peneira.class);
		
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
		
		Criteria criteriaCount = session.createCriteria(Peneira.class);
		
		criteriaCount.setProjection(Projections.rowCount());
		
		criteriaCount.add(Restrictions.ilike("nome", texto, MatchMode.ANYWHERE));
		
		Long totalRecords = (Long) criteriaCount.uniqueResult();
		
		int qtdPaginas = (totalRecords.intValue() + pageSize - 1) / pageSize;
			
		int[] array = new int[2];
		
		array[0] = qtdPaginas;
		array[1] = totalRecords.intValue();
		
		return array;
		
	}
	
	public Peneira urlDecoder(Peneira peneira) {
		 
		 if (peneira != null) {
		 
			 try {
			
				peneira.setNome(URLDecoder.decode(peneira.getNome(), "UTF-8"));
				
			} catch (java.io.UnsupportedEncodingException e) {}
		
		}
			
		return peneira;
		
	}
	
}
