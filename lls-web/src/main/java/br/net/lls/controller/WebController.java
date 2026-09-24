package br.net.lls.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Locale;
import java.time.Year;

@Controller
public class WebController {

	@GetMapping("/login")
	public String loginPage(Model model, Locale locale) {
		
		int currentYear = Year.now().getValue();
		
        model.addAttribute("currentYear", currentYear);
        model.addAttribute("currentLocale", locale);
		
		if (isAuthenticated()) {
            return "redirect:/home";
        }
        return "login"; // Retorna o template login.html se não estiver logado
		
	}
	
	@GetMapping("/home")
	public String homePage(@RequestParam(name="name", required=false, defaultValue="LLS") String name, Model model) {
		model.addAttribute("name", name);
		return "home";
	}
	
	@GetMapping("/")
	public String redirectRoot() {
		if (isAuthenticated()) {
            return "redirect:/home";
        }
        return "redirect:/login";
	}
	
	/**
     * Método auxiliar que verifica se o usuário atual está autenticado no Spring Security.
     */
    private boolean isAuthenticated() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
        // O Spring Security coloca um token anônimo por padrão se o usuário não estiver logado.
        // Precisamos checar se a autenticação existe, se está ativa e se NÃO é anônima.
        if (authentication == null || !authentication.isAuthenticated()) {
            return false;
        }
        
        return !(authentication instanceof AnonymousAuthenticationToken);
    }

}
