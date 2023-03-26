package br.net.lls.componentes;

import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.util.JRLoader;
import net.sf.jasperreports.engine.data.JsonDataSource;
import net.sf.jasperreports.engine.query.JsonQueryExecuterFactory;
import net.sf.jasperreports.engine.design.JasperDesign;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.xml.JRXmlLoader;

import java.io.InputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.File;
import java.io.ByteArrayInputStream;

import java.util.Map;
import java.util.HashMap;

import org.apache.commons.io.FileUtils;

import br.net.lls.componentes.FileModel;

public class JasperToByteArray {
 
	public static byte[] getByteArray(String json, String nomeJasper) throws JRException, IOException {
		
		String urlJasper = "/jasper/" + nomeJasper + ".jasper";
		
		InputStream jsonStream = new ByteArrayInputStream(json.getBytes("UTF-8"));
		
		JsonDataSource dataSource = new JsonDataSource(jsonStream);
		
		Map<String,Object> params = new HashMap<String, Object>();
		
		params.put(JsonQueryExecuterFactory.JSON_INPUT_STREAM, jsonStream);
		
        JasperReport jasperReport = (JasperReport) JRLoader.loadObject(JasperToByteArray.class.getResourceAsStream(urlJasper));
        
		JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, params, dataSource);
		
		File file = File.createTempFile("relatorio.", ".pdf");
		
		JasperExportManager.exportReportToPdfStream(jasperPrint, new FileOutputStream(file));
		
		byte[] byteArray = FileUtils.readFileToByteArray(file);
		
		return byteArray;
		
	}
 
}
