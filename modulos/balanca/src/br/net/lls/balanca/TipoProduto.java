package br.net.lls.balanca;

public enum TipoProduto {
	CAFE, MILHO, OUTROS;
	
	public static int getTipoPesoIndex(TipoProduto tipoProduto){
		switch (tipoProduto){
			case CAFE : return 0;
			case MILHO : return 1;
			case OUTROS : return 2;
			default : return 0;
		}
	}
	
	public static String getTipoProdutoNome(TipoProduto tipoProduto){
		switch (tipoProduto){
			case CAFE : return "CAFE";
			case MILHO : return "MILHO";
			case OUTROS : return "OUTROS";
			default : return "CAFE";
		}
	}
    
}
