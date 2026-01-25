package br.net.lls.cadastro.dao;

import br.net.lls.cadastro.FazendaProdutor;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;
import java.util.ArrayList;
import org.springframework.stereotype.Repository;

import org.hibernate.Session;
import org.hibernate.Criteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.criterion.MatchMode;
import org.hibernate.FetchMode;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;

@Repository
public class JpaFazendaProdutorDao implements FazendaProdutorDao {
	
	@PersistenceContext
	EntityManager entityManager;
	
	public void adiciona(FazendaProdutor fazendaProdutor) {
		
		entityManager.persist(fazendaProdutor);
	
	}
	
	public void altera(FazendaProdutor fazendaProdutor) {
		
		entityManager.merge(fazendaProdutor);
	
	}
	
	public List lista(String nomeProdutor) {
		
		Session session = (Session) entityManager.getDelegate();
		
		Criteria criteria = session.createCriteria(FazendaProdutor.class, "fazenda")
			.createAlias("produtor", "produtor")
			.setProjection(Projections.projectionList()
				.add(Projections.property("fazenda.id"), "id")
				.add(Projections.property("fazenda.nome"), "nome")
				.add(Projections.property("fazenda.ie"), "ie")
				.add(Projections.property("produtor.nome"), "nome_produtor")
				.add(Projections.property("produtor.id"), "id_produtor")
			)
			.add(Restrictions.ilike("produtor.nome", nomeProdutor, MatchMode.ANYWHERE))
			.addOrder(Order.asc("produtor.nome"));
		
		List list = criteria.list();
		
		return list;
		
	}
	
	public void remove(int id) {
		
		FazendaProdutor fazenda = buscaPorId(id);
		
		entityManager.remove(fazenda);
		
	}
	
	public FazendaProdutor buscaPorId(int id) {
		
		return entityManager.find(FazendaProdutor.class, id);
		
	}
	
	public List<String> achar(int id) {
		
		FazendaProdutor fazenda = buscaPorId(id);
		
		List<String> list = new ArrayList<String>();
		
		list.add(String.valueOf(fazenda.getId()));
		list.add(fazenda.getNome());
		list.add(fazenda.getEndereco());
		list.add(fazenda.getBairro());
		list.add(fazenda.getCidade());
		list.add(fazenda.getEstadoNome());
		list.add(fazenda.getCep());
		list.add(fazenda.getIe());
		list.add(fazenda.getCpfcnpj());
		
		return list;
		
	}
	
	public void urlDecoder(FazendaProdutor fazendaProdutor) {
		
		 try {
		
			fazendaProdutor.setNome(URLDecoder.decode(fazendaProdutor.getNome(), "UTF-8"));
			fazendaProdutor.setEndereco(URLDecoder.decode(fazendaProdutor.getEndereco(), "UTF-8"));
			fazendaProdutor.setBairro(URLDecoder.decode(fazendaProdutor.getBairro(), "UTF-8"));
			fazendaProdutor.setCidade(URLDecoder.decode(fazendaProdutor.getCidade(), "UTF-8"));
			
			fazendaProdutor.setEstado(fazendaProdutor.getEstado());
			fazendaProdutor.setCep(fazendaProdutor.getCep());
			fazendaProdutor.setIe(fazendaProdutor.getIe());
			fazendaProdutor.setCpfcnpj(fazendaProdutor.getCpfcnpj());
			
		} catch (java.io.UnsupportedEncodingException e) {}
		
	}
	
	public void urlDecoder(FazendaProdutor fazendaProdutor, FazendaProdutor fazenda) {
		
		 try {
		
			fazendaProdutor.setNome(URLDecoder.decode(fazenda.getNome(), "UTF-8"));
			fazendaProdutor.setEndereco(URLDecoder.decode(fazenda.getEndereco(), "UTF-8"));
			fazendaProdutor.setBairro(URLDecoder.decode(fazenda.getBairro(), "UTF-8"));
			fazendaProdutor.setCidade(URLDecoder.decode(fazenda.getCidade(), "UTF-8"));
			
			fazendaProdutor.setEstado(fazenda.getEstado());
			fazendaProdutor.setCep(fazenda.getCep());
			fazendaProdutor.setIe(fazenda.getIe());
			fazendaProdutor.setCpfcnpj(fazenda.getCpfcnpj());
			
		} catch (java.io.UnsupportedEncodingException e) {}
		
	}
	
}
