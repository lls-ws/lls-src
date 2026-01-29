package br.net.lls.balanca;

public enum TipoPeso {
	ENTRADA, SAIDA;
	
	public static int getTipoPesoIndex(TipoPeso tipoPeso){
		switch (tipoPeso){
			case ENTRADA : return 0;
			case SAIDA : return 1;
			default : return 0;
		}
	}
	
	public static String getTipoPesoNome(TipoPeso tipoPeso){
		switch (tipoPeso){
			case ENTRADA : return "ENTRADA";
			case SAIDA : return "SAIDA";
			default : return "ENTRADA";
		}
	}
    
}
