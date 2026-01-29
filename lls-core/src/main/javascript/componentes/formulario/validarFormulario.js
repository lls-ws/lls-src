/* =========================================================
 * validarFormulario.js
 * http://lls.net.br/
 * ========================================================= */

function validarFormulario() {
	
	jQuery.validator.addMethod("noSpace", function(value) { 
		return value[0] !== " " && value != ""; 
		}, "No space please and don't leave it empty"
	);
	
	jQuery.validator.addMethod("checkurl", function(value) {
		return /^(www\.)[A-Za-z0-9_-]+\.+[A-Za-z0-9.\/%&=\?_:;-]+$/.test(value) || value === "";
		}, "Please enter a valid URL."
	);

	jQuery.validator.addMethod('positiveNumber', function (value) { 
		return Number(value) > 0;
		}, 'Informe um número maior que zero!'
	);
	
	jQuery.validator.addMethod('maskNumber', function (value) { 
		return Number(formataNumeroSql(value)) > 0;
		}, 'Informe um número maior que zero!'
	);
	
	jQuery.validator.methods.number = function (value, element) {
		if (!$.isNumeric(value)) value = formataNumeroSql(value);
		return this.optional(element) || /\d{1,3}(\.\d{3})*(\.\d\d)?|\.\d\d/.test(value);
	}
	
	jQuery.validator.methods.max = function (value, element, param) {
		if (!$.isNumeric(value)) value = formataNumeroSql(value);
		return this.optional(element) || Number(value) <= param;
	}

	jQuery.validator.methods.min = function (value, element, param) {
		if (!$.isNumeric(value)) value = formataNumeroSql(value);
		return this.optional(element) || Number(value) >= param;
	}
	
}
