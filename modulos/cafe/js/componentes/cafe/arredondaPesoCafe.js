/* =========================================================
 * arredondaPesoCafe.js
 * http://lls.net.br/
 * ========================================================= */

function arredondaPesoCafe(valores) {
	
	valores["inteiro"] = valores.peso ^ 0;
	valores["decimal"] = Number((valores.peso - valores.inteiro).toFixed(2));
		
	if (valores.decimal < 0.50 || valores.decimal >= 0.60) {
		valores.peso = Math.round(valores.peso);
	}
	else valores.peso = Number(valores.inteiro) + 0.5;
	
}
