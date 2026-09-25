package br.net.lls.controller;

import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
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
public class LoginController {

	// Injeta o MessageSource para gerenciar as mensagens traduzidas
    @Autowired
    private MessageSource messageSource;
	
	@GetMapping("/login")
	public String login(
			@RequestParam(value = "error", required = false) String error, // Captura o ?error da URL
			HttpSession session, 
			Model model, 
			Locale locale) {
		
		int currentYear = Year.now().getValue();
		
        model.addAttribute("currentYear", currentYear);
        model.addAttribute("currentLocale", locale);
        
        // Se o parâmetro error estiver presente na URL, adiciona a mensagem
		if (error != null) {
			// "login.error.invalid" é a chave que criaremos nos arquivos .properties
            String translatedMessage = messageSource.getMessage("login.error.invalid", null, locale);
            model.addAttribute("alertMessage", translatedMessage);
		}
		
		if (isAuthenticated()) {
            return "redirect:/home";
        }
        return "login"; // Retorna o template login.html se não estiver logado
		
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
