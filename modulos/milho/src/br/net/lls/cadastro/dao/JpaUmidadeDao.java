package br.net.lls.cadastro.dao;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Root;
import javax.persistence.TypedQuery;

import java.math.BigDecimal;
import java.util.List;
import java.util.ArrayList;

import br.net.lls.cadastro.Umidade;
import org.springframework.stereotype.Repository;

import org.hibernate.Session;
import org.hibernate.Criteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Criterion;
import org.hibernate.transform.Transformers;

@Repository
public class JpaUmidadeDao implements UmidadeDao {
	
	@PersistenceContext
	EntityManager entityManager;
	
	public void adiciona(Umidade umidade) {
		
		entityManager.persist(umidade);
		
	}
	
	public void altera(Umidade umidade) {
		
		entityManager.merge(umidade);
		
	}
	
	public List lista(int pageNumber, BigDecimal codigo, int pageSize) {
		
		Session session = (Session) entityManager.getDelegate();
		
		Criteria criteria = session.createCriteria(Umidade.class)
			.setProjection(Projections.projectionList()
				.add(Projections.property("id"), "id")
				.add(Projections.property("codigo"), "codigo")
				.add(Projections.property("desconto"), "desconto")
				.add(Projections.property("valor"), "valor"))
			.add(Restrictions.ge("codigo", codigo))
			.addOrder(Order.asc("codigo"))
			.setFirstResult((pageNumber - 1) * pageSize)
			.setMaxResults(pageSize)
			.setResultTransformer(Transformers.aliasToBean(Umidade.class));
		
		List list = criteria.list();
		
		return list;
		
	}
	
	public void remove(int id) {
		
		Umidade umidade = buscaPorId(id);
		
		entityManager.remove(umidade);
		
	}
	
	public Umidade buscaPorId(int id) {
		
		return entityManager.find(Umidade.class, id);
		
	}
	
	public boolean verificaExiste(String campo, BigDecimal codigo) {
		
		Session session = (Session) entityManager.getDelegate();
		
		Criteria criteria = session.createCriteria(Umidade.class);
		
		criteria.setProjection(Projections.rowCount());
		
		Criterion valorCriterion = Restrictions.eq(campo, codigo);
		
		criteria.add(valorCriterion);
		
		Long total = (Long) criteria.uniqueResult();
		
		if (total == 1) {
			
			return true;
			
		}
		else {
			
			return false;
		}
		
	}
	
	public int[] getQuantidadePaginas(int pageSize, BigDecimal codigo) {
		
		Session session = (Session) entityManager.getDelegate();
		
		Criteria criteriaCount = session.createCriteria(Umidade.class);
		
		criteriaCount.setProjection(Projections.rowCount());
		
		Criterion valorCriterion = Restrictions.ge("codigo", codigo);
		
		criteriaCount.add(valorCriterion);
		
		Long totalRecords = (Long) criteriaCount.uniqueResult();
		
		int qtdPaginas = (totalRecords.intValue() + pageSize - 1) / pageSize;
		
		int[] array = new int[2];
		
		array[0] = qtdPaginas;
		array[1] = totalRecords.intValue();
		
		return array;
		
	}
	
	public List lista(BigDecimal codigo) {
		
		Session session = (Session) entityManager.getDelegate();
		
		Criteria criteria = session.createCriteria(Umidade.class, "umidade")
			.setProjection(Projections.projectionList()
				.add(Projections.property("umidade.id"), "id")
				.add(Projections.property("umidade.codigo"), "codigo")
				.add(Projections.property("umidade.desconto"), "desconto")
				.add(Projections.property("umidade.valor"), "valor"))
			.add(Restrictions.eq("umidade.codigo", codigo))
			.addOrder(Order.asc("umidade.codigo"));
		
		List list = criteria.list();
		
		return list;
		
	}
	
}
