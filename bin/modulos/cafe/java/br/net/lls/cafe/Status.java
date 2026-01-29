package br.net.lls.cafe;

public enum Status {
	ABERTA, DESPEJADA, FECHADA;
	
	public static int getStatusIndex(Status status){
		switch (status){
			case ABERTA : return 0;
			case DESPEJADA : return 1;
			case FECHADA : return 2;
			default : return 0;
		}
	}
	
	public static String getStatusNome(Status status){
		switch (status){
			case ABERTA : return "ABERTA";
			case DESPEJADA : return "DESPEJADA";
			case FECHADA : return "FECHADA";
			default : return "ABERTA";
		}
	}
    
}
