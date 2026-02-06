/* =========================================================
 * toggleTheme.js
 * 
 * Autor: Leandro Luiz
 * email: lls.homeoffice@gmail.com
 * ========================================================= */

function toggleTheme() {
  
	let currentTheme = getPreferredTheme();

	const newTheme = currentTheme === "dark" ? "light" : "dark";

	applyTheme(newTheme);

	localStorage.setItem("theme", newTheme);
	
	getPreferredTheme();
  
}
