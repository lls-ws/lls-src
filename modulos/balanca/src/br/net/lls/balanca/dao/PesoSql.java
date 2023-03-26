package br.net.lls.balanca.dao;

import br.net.lls.componentes.Relatorio;
import br.net.lls.componentes.Consulta;

public class PesoSql  {
	
	public static String getConsulta(Relatorio relatorio, String consulta, int tipo) {
		
		String nomeFazenda = ", 'Terceiro' AS fazenda ";
		String nomeProdutor = ", peso.produtor AS produtor ";
		
		String tabela = "FROM Peso peso ";
		String condicao = Consulta.getTipoConsulta(relatorio.getTipo(), "peso");
		String filtroFazenda = "AND peso.fazendaProdutor_id = 0 ";
		String filtroData = " DATE(peso.data) >= :dataInicial " +
							"AND DATE(peso.data) <= :dataFinal ";
		
		if (!condicao.equals("")) condicao += "AND " + filtroData;
		else condicao = "WHERE " + filtroData;
		
		if (relatorio.getIdFazenda() == 0) {
			
			String consultaTerceiro = consulta;
			
			if (tipo == 0) {
				consultaTerceiro += nomeFazenda + nomeProdutor;
			}
			
			consultaTerceiro += tabela + condicao + filtroFazenda;
			
			consulta = Consulta.getFiltroFazenda(relatorio, consulta, tabela, "", tipo) + condicao;
			consulta = consultaTerceiro + "UNION ALL " + consulta;
		}
		else {
			consulta = Consulta.getFiltroFazenda(relatorio, consulta, tabela, "", tipo) + condicao;
		}
		
		return consulta;
		
	}
	
}
