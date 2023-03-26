package br.net.lls.cadastro.dao;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Root;
import javax.persistence.TypedQuery;

import java.math.BigDecimal;
import java.util.List;
import java.util.ArrayList;

import br.net.lls.componentes.Id;
import br.net.lls.cadastro.Preco;
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
public class JpaPrecoDao implements PrecoDao {
	
	@PersistenceContext
	EntityManager entityManager;
	
	public void adiciona(Preco preco) {
		
		urlDecoder(preco);
		
		entityManager.persist(preco);
		
	}
	
	public void altera(Preco preco) {
		
		urlDecoder(preco);
		
		entityManager.merge(preco);
		
	}
	
	public List lista(int pageNumber, Id id, int pageSize) {
		
		Session session = (Session) entityManager.getDelegate();
		
		Criteria criteria = session.createCriteria(Preco.class, "preco")
			.setProjection(Projections.projectionList()
				.add(Projections.property("preco.id"), "id")
				.add(Projections.property("preco.valor"), "valor")
				.add(Projections.property("preco.nome"), "nome"))
			.add(Restrictions.ilike("preco.nome", id.getNome(), MatchMode.ANYWHERE))
			.addOrder(Order.asc("preco.nome"))
			.setFirstResult((pageNumber - 1) * pageSize)
			.setMaxResults(pageSize)
			.setResultTransformer(Transformers.aliasToBean(Preco.class));
		
		ArrayList<Integer> ids = new ArrayList<Integer> ();
		
		ids.add(21);
		ids.add(22);
		ids.add(23);
		ids.add(24);
		
		if (pageSize == 0) {
		
			if (id.getId() == 0) {
				
				criteria.add(Restrictions.in("preco.id", ids));
				
			}
			else {
				
				ids.add(20);
				ids.add(16);
				
				criteria.add(Restrictions.not(Restrictions.in("preco.id", ids)));
				
			}

		}
		
		List list = criteria.list();
		
		return list;
		
	}
	
	public void remove(int id) {
		
		Preco preco = buscaPorId(id);
		
		entityManager.remove(preco);
		
	}
	
	public Preco buscaPorId(int id) {
		
		return entityManager.find(Preco.class, id);
		
	}
	
	public boolean verificaExiste(String campo, String texto) {
		
		Session session = (Session) entityManager.getDelegate();
		
		Criteria criteria = session.createCriteria(Preco.class);
		
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
		
		Criteria criteriaCount = session.createCriteria(Preco.class);
		
		criteriaCount.setProjection(Projections.rowCount());
		
		criteriaCount.add(Restrictions.ilike("nome", texto, MatchMode.ANYWHERE));
		
		Long totalRecords = (Long) criteriaCount.uniqueResult();
		
		int qtdPaginas = (totalRecords.intValue() + pageSize - 1) / pageSize;
			
		int[] array = new int[2];
		
		array[0] = qtdPaginas;
		array[1] = totalRecords.intValue();
			
		return array;
		
	}
	
	public List listaEntmilho() {
		
		ArrayList<Integer> ids = new ArrayList<Integer> ();
		
		ids.add(21);
		ids.add(23);
		ids.add(24);
		
		Session session = (Session) entityManager.getDelegate();
		
		Criteria criteria = session.createCriteria(Preco.class, "preco")
			.setProjection(Projections.projectionList()
				.add(Projections.property("preco.id"), "id")
				.add(Projections.property("preco.nome"), "nome")
				.add(Projections.property("preco.valor"), "valor"))
			.add(Restrictions.in("preco.id", ids))
			.addOrder(Order.asc("preco.id"));
		
		List list = criteria.list();
		
		return list;
		
	}
	
	public Preco urlDecoder(Preco preco) {
		 
		 if (preco != null) {
		 
			 try {
			
				preco.setNome(URLDecoder.decode(preco.getNome(), "UTF-8"));
				
			} catch (java.io.UnsupportedEncodingException e) {}
		
		}
			
		return preco;
		
	}
	
}
