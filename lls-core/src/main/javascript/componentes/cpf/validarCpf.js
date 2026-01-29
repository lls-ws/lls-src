/* =========================================================
 * validarCpf.js
 * http://lls.net.br/
 * ========================================================= */

function validarCpf(input_cpf){
 
	if(input_cpf){
	var input=input_cpf.toString();

	var numeros=[];
	var pesos_A=[10,9,8,7,6,5,4,3,2];
	var pesos_B=[11,10,9,8,7,6,5,4,3,2];
	var sum=0;
	var x1=0;
	var x2=0;

	for(var i=0;i<9 && i<input.length;i++){
	 var digito=input[i]
	 sum=sum+digito*pesos_A[i];
	}

	//calcula digito 1
	var mod=sum%11;
	if(mod>=2){
	 x1=11-mod;
	}

	//calcula digito 2
	sum=0;
	for(var i=0;i<10 && i<input.length;i++){
	 sum=sum+input[i]*pesos_B[i];
	}

	var mod=sum%11;
	if(mod>=2){
	 x2=11-mod;
	}

	if(x1==input[9] && x2==input[10]){
	 return true;
	}else{
	 return false;
	}
	}else{
	 return false;
	}
};
