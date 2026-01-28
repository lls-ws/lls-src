package br.net.lls.componentes;

public enum Tipo {
	FIXO, CELULAR;
	
	public static String getTipoNome(Tipo tipo){
		switch (tipo){
			case FIXO : return "FIXO";
			case CELULAR : return "CELULAR";
			default : return "";
		}
	}
    
}
