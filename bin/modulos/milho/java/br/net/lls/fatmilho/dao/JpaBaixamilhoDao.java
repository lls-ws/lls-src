package br.net.lls.fatmilho.dao;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;
import org.hibernate.Query;
import org.hibernate.Session;
import java.util.List;

import br.net.lls.fatmilho.Baixamilho;
import br.net.lls.fatmilho.dao.BaixamilhoDao;
import br.net.lls.fatmilho.dao.BaixamilhoSql;
import br.net.lls.componentes.Id;
import br.net.lls.componentes.Relatorio;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;

@Repository
public class JpaBaixamilhoDao implements BaixamilhoDao {
	
	@PersistenceContext
	EntityManager entityManager;
	
	public void adiciona(Baixamilho baixaMilho) {
		
		urlDecoder(baixaMilho);
		
		entityManager.persist(baixaMilho);
		
	}
	
	public Baixamilho buscaPorId(int id) {
		
		return entityManager.find(Baixamilho.class, id);
		
	}
	
	public List getListById(int idServ) {
		
		Session session = (Session) entityManager.getDelegate();

		String consulta = "SELECT servMilho.id AS ID, " +
								"servMilho.data AS DATA, " +
								"produtor.nome AS PRODUTOR, " +
								"fazendaProdutor.nome AS FAZENDA, " +
								"preco.nome AS SERVICO, " +
								"servMilho.valor AS TOTAL, " +
								"IFNULL(baixas.PAGO, 0) AS PAGO, " +
								"(servMilho.valor - IFNULL(baixas.PAGO, 0)) AS VALOR, " +
								"servMilho.obs AS OBS " +
						"FROM Servmilho servMilho " +
						"INNER JOIN Preco preco " +
						"ON servMilho.preco_id = preco.id " +
						"INNER JOIN FazendaProdutor fazendaProdutor " +
						"ON servMilho.fazendaProdutor_id = fazendaProdutor.id ";
					
		String consulta2 = BaixamilhoSql.getConsultaTotalPago() + 
							"INNER JOIN Produtor produtor " +
							"ON fazendaProdutor.produtor_id = produtor.id " +
							"WHERE servMilho.id = :idServ ";
		
		consulta += consulta2;
		
		Query query = session.createSQLQuery(consulta);
		
		query.setParameter("idServ", idServ);
		
		return query.list();
		
	}
	
	public List getTotaisBaixas(int idServ) {
		
		Session session = (Session) entityManager.getDelegate();
		
		String consulta = "SELECT COUNT(baixaMilho.id) AS QTD, " +
								 "SUM(baixaMilho.valor) AS TOTAL " +
						"FROM Baixamilho baixaMilho " +
							"WHERE baixaMilho.servMilho_id = :id ";
		
		Query query = session.createSQLQuery(consulta);
		
		query.setParameter("id", idServ);
		
		return query.list();
		
	}
	
	public List getBaixas(int idServ) {
		
		Session session = (Session) entityManager.getDelegate();
		
		String consulta = "SELECT baixaMilho.id AS ID, " +
								 "baixaMilho.data AS DATA, " +
								 "baixaMilho.valor AS VALOR, " +
								 "baixaMilho.obs " +
						"FROM Baixamilho baixaMilho " +
							"WHERE baixaMilho.servMilho_id = :id ";
		
		Query query = session.createSQLQuery(consulta);
		
		query.setParameter("id", idServ);
		
		return query.list();
		
	}

	public void remove(Baixamilho baixamilho) {
		
		entityManager.remove(baixamilho);
			
	}
	
	public void altera(Baixamilho baixaMilho) {
		
		urlDecoder(baixaMilho);
		
		entityManager.merge(baixaMilho);
		
	}
	
	public Baixamilho urlDecoder(Baixamilho baixaMilho) {
		
		 try {
		
			baixaMilho.setObs(URLDecoder.decode(baixaMilho.getObs(), "UTF-8"));
			
		} catch (java.io.UnsupportedEncodingException e) {}
		
		return baixaMilho;
		
	}

}
