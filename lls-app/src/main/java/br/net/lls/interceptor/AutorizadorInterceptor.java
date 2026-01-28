package br.net.lls.interceptor;

import jakarta.servlet.http.HttpSession;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.servlet.HandlerInterceptor;

public class AutorizadorInterceptor implements HandlerInterceptor {
	
	@Override
	public boolean preHandle(HttpServletRequest request,
							 HttpServletResponse response,
							 Object controller) throws Exception {
			
		String uri = request.getRequestURI();
		
		HttpSession session = request.getSession();
		
		if(uri.endsWith("ativaUsuario") || uri.endsWith("senha") || uri.endsWith("usuario") ||
		   uri.endsWith("efetuaCadastroLogin") || uri.endsWith("recuperaSenha") ||
		   uri.endsWith("efetuaLogin") || uri.endsWith("login")) {
			
			if(session.getAttribute("usuarioLogado") == null) {
				
				return true;
				
			}
			
			response.sendRedirect("/");
			
			return false;
			
		}
		
		if(session.getAttribute("usuarioLogado") != null) {
			
			if(uri.endsWith("logout")) {
				
				session.invalidate();
		
				response.sendRedirect("login");
				
				return false;
				
			}
			
			return true;
			
		}
		
		response.sendRedirect("login");
		
		return false;
	}
}
