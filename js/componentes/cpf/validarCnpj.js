/* =========================================================
 * validarCnpj.js
 * http://lls.net.br/
 * ========================================================= */

function validarCnpj(input_cnpj){

	if(input_cnpj){
	var input=input_cnpj.toString();
	var pesos_A=[5,4,3,2,9,8,7,6,5,4,3,2];
	var pesos_B=[6,5,4,3,2,9,8,7,6,5,4,3,2];
	var sum=0;
	var x1=0;
	var x2=0;
	for(var i=0;i<12;i++){
	 sum=sum+input[i]*pesos_A[i];
	}
	//calcula digito 1
	var mod=sum%11;
	if(mod>=2){
	 x1=11-mod;
	}
	//calcula digito 2
	sum=0;
	for(var i=0;i<13;i++){
	 sum=sum+input[i]*pesos_B[i];
	}
	var mod=sum%11;
	if(mod>=2){
	 x2=11-mod;
	}

	//test digitos
	if(x1==input[12] && x2==input[13]){
	 return true;
	}else{
	 return false;
	}
	}else{
	return false;
	}
};
