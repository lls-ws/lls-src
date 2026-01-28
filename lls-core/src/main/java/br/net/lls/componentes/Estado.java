package br.net.lls.componentes;

public enum Estado {
	AC, AL, AP, AM, BA, CE, DF, ES, GO, MA, MT, MS, MG, PA, PB, PR, PE, PI, RJ, RN, RS, RO, RR, SP, SC, SE, TO;
	
	public static String getEstadoNome(Estado estado){
		switch (estado){
			case AC : return "AC";
			case AL : return "AL";
			case AP : return "AP";
			case AM : return "AM";
			case BA : return "BA";
			case CE : return "CE";
			case DF : return "DF";
			case ES : return "ES";
			case GO : return "GO";
			case MA : return "MA";
			case MT : return "MT";
			case MS : return "MS";
			case MG : return "MG";
			case PA : return "PA";
			case PB : return "PB";
			case PR : return "PR";
			case PE : return "PE";
			case PI : return "PI";
			case RJ : return "RJ";
			case RN : return "RN";
			case RS : return "RS";
			case RO : return "RO";
			case RR : return "RR";
			case SP : return "SP";
			case SC : return "SC";
			case SE : return "SE";
			case TO : return "TO";
			default : return "";
		}
	}
    
}
