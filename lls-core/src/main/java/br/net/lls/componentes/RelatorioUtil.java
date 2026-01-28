package br.net.lls.componentes;

import org.json.JSONArray;
import org.json.JSONObject;
import java.util.List;
import java.util.Iterator;

import br.net.lls.componentes.Relatorio;
import br.net.lls.cadastro.Produtor;
import br.net.lls.cadastro.FazendaProdutor;

public class RelatorioUtil {
	
	private static String getJson(Relatorio relatorio, JSONArray dadosJSONArray,
								 JSONObject totalJSONObject, JSONObject empresaJSONObject) {
		
		return getJsonList(relatorio, dadosJSONArray,
						   totalJSONObject, empresaJSONObject, "", "");
		
	}
	
	private static String getJson(Relatorio relatorio, JSONArray dadosJSONArray,
						 JSONObject totalJSONObject, JSONObject empresaJSONObject,
						 FazendaProdutor fazendaProdutor) {
		
		Produtor produtor = fazendaProdutor.getProdutor();
		
		String produtorNome = produtor.getNome();
		
		String fazendaNome = fazendaProdutor.getNome();
		
		if (relatorio.getIdProdutor() > 0) {
				
			fazendaNome = "Todas";
			
		}
		
		return getJsonList(relatorio, dadosJSONArray,
						   totalJSONObject, empresaJSONObject,
						   produtorNome, fazendaNome);
		
	}

	private static String getJsonList(Relatorio relatorio, JSONArray dadosJSONArray,
						  JSONObject totalJSONObject, JSONObject empresaJSONObject,
						  String produtor, String fazenda) {
		
		JSONObject jsonList = new JSONObject();
		
		jsonList.put("dados", dadosJSONArray);
		
		jsonList.put("total", totalJSONObject);
		
		jsonList.put("empresa", empresaJSONObject);
		
		if (produtor.equals("")) {
			
			jsonList.put("titulo", getTitulo(relatorio));
			
		}
		else {
			
			jsonList.put("titulo", getTitulo(relatorio, produtor, fazenda));
			
		}
		
		return jsonList.toString();
		
	}

	private static JSONObject getTitulo(Relatorio relatorio) {
		
		JSONObject tituloObject = new JSONObject();
		
		tituloObject.put("texto", relatorio.getNome());
		tituloObject.put("dataInicial", relatorio.getDataInicialText());
		tituloObject.put("dataFinal", relatorio.getDataFinalText());
		tituloObject.put("tipo", relatorio.getNomeTipo());
		
		return tituloObject;
		
	}

	private static JSONObject getTitulo(Relatorio relatorio, String produtor, String fazenda) {
		
		JSONObject tituloObject = new JSONObject();
		
		tituloObject.put("texto", relatorio.getNome());
		tituloObject.put("dataInicial", relatorio.getDataInicialText());
		tituloObject.put("dataFinal", relatorio.getDataFinalText());
		tituloObject.put("produtor", produtor);
		tituloObject.put("fazenda", fazenda);
		tituloObject.put("tipo", relatorio.getNomeTipo());
			
		return tituloObject;
		
	}
	
	public static FileModel getFileModel(Relatorio relatorio, String jrxml,
										 JSONArray listaJSONArray, JSONObject totalJSONObject,
										 JSONObject empresaJSONObject, FazendaProdutor fazendaProdutor)
									 throws Exception {
		
		String json = "";
		
		if (fazendaProdutor != null) {
			
			jrxml += "2";
			
			json = getJson(relatorio, listaJSONArray, totalJSONObject, empresaJSONObject,
						   fazendaProdutor);
			
		}
		else {
			
			json = getJson(relatorio, listaJSONArray, totalJSONObject, empresaJSONObject);
			
		}
		
		return new FileModel("Filename",
							 "application/pdf",
							 JasperToByteArray.getByteArray(json, jrxml));
	
	}

	public static String getNomeTipo(Relatorio relatorio, int tipo) {
		
		String nomeTipo = "";
		
		switch (tipo) {
		
			case 0:
		
				switch (relatorio.getTipo()) {
					
					case 0:
						nomeTipo = "Abertos";
						break;
					case 1:
						nomeTipo = "Pagos";
						break;
					case 2:
						nomeTipo = "Todos";
						break;
				
				}
		
				break;
				
			case 1:
			
				switch (relatorio.getTipo()) {
			
					case 0:
						nomeTipo = "Faturados";
						break;
					case 1:
						nomeTipo = "A Faturar";
						break;
					case 2:
						nomeTipo = "Todos";
						break;
				
				}
				
				break;
			
			case 2:
			
				switch (relatorio.getTipo()) {
			
					case 0:
						nomeTipo = "Abertas";
						break;
					case 1:
						nomeTipo = "Fechadas";
						break;
					case 2:
						nomeTipo = "Todas";
						break;
				
				}
				
				break;
				
			case 3:
			
				switch (relatorio.getTipo()) {
			
					case 0:
						nomeTipo = "Abertas";
						break;
					case 1:
						nomeTipo = "Despejadas";
						break;
					case 2:
						nomeTipo = "Fechadas";
						break;
					case 3:
						nomeTipo = "Todas";
						break;
				
				}
				
				break;
				
			case 4:
		
				switch (relatorio.getTipo()) {
					
					case 0:
						nomeTipo = "Abertos";
						break;
					case 1:
						nomeTipo = "Fechados";
						break;
					case 2:
						nomeTipo = "Todos";
						break;
				
				}
		
				break;
		
		}
		
		return nomeTipo;
		
	}
	
}
