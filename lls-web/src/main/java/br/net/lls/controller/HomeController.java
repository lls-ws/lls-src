package br.net.lls.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Locale;
import java.time.Year;

@Controller
public class HomeController {

	@GetMapping("/home")
	public String homePage(
			@RequestParam(name="name", required=false) String name,
			Model model, 
			Locale locale) {
		
		int currentYear = Year.now().getValue();
		
        model.addAttribute("currentYear", currentYear);
        model.addAttribute("currentLocale", locale);
		
		model.addAttribute("name", name);
		
		return "home";
	}

}
