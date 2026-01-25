package br.net.lls.componentes;

import org.apache.commons.dbcp.BasicDataSource;

public class CustomDataSource extends BasicDataSource {
	
	public void init() {
		addConnectionProperty("useUnicode", "true");
		addConnectionProperty("characterEncoding", "UTF-8");
		//addConnectionProperty("characterEncoding", "ISO-8859-1");
	}
	
}
