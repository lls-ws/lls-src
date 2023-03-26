package br.net.lls.componentes;

public enum Operadora {
	CLARO, CTBC, NEXTEL, OI, TIM, VIVO;
	
	public static String getOperadoraNome(Operadora operadora){
		switch (operadora){
			case CLARO : return "CLARO";
			case CTBC : return "CTBC";
			case NEXTEL : return "NEXTEL";
			case OI : return "OI";
			case TIM : return "TIM";
			case VIVO : return "VIVO";
			default : return "";
		}
	}
    
}
