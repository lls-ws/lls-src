/* =========================================================
 * getPreferredTheme.js
 * 
 * Autor: Leandro Luiz
 * email: lls.homeoffice@gmail.com
 * ========================================================= */

function getPreferredTheme() {
  
	let storedTheme = localStorage.getItem("theme");
  
	if (!storedTheme) {
		storedTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
	}

	if (storedTheme === "dark" ) {
	  
	  $("#toggleTheme").removeClass("fa-moon").addClass("fa-sun");
	  $(".form-signin").css("background-color", "black");
	  
	} else {
	  
	  $("#toggleTheme").removeClass("fa-sun").addClass("fa-moon");
	  $(".form-signin").css("background-color", "gray");
	  
	}

	return storedTheme;
  
}
