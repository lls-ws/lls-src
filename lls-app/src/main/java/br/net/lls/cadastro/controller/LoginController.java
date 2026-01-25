package br.net.lls.cadastro.controller;

import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.ui.Model;
import org.springframework.beans.factory.annotation.Autowired;
import javax.validation.Valid;
import javax.servlet.http.HttpSession;
import javax.json.JsonObject;
import javax.json.Json;
import java.util.Date;
import java.util.Calendar;

import br.net.lls.componentes.ControllerUtil;
import br.net.lls.componentes.Data;
import br.net.lls.componentes.Senha;
import br.net.lls.componentes.EmailUtil;
import br.net.lls.cadastro.Usuario;
import br.net.lls.cadastro.Empresa;
import br.net.lls.cadastro.dao.UsuarioDao;
import br.net.lls.cadastro.dao.EmpresaDao;

@Transactional
@Controller
public class LoginController {
	
	@Autowired
	UsuarioDao usuarioDao;

	@Autowired
	EmpresaDao empresaDao;
	
	@RequestMapping("/")
	public String menu() {return "menu";}
	
	@RequestMapping("login")
	public String login() {return "login";}
	
	@RequestMapping("usuario")
	public String usuario() {return "usuario";}
	
	@RequestMapping("senha")
	public String senha() {return "senha";}
	
	@RequestMapping("efetuaLogin")
	@ResponseBody
	public String efetuaLogin(@Valid Usuario usuario,
								BindingResult result,
								HttpSession session) {
		
		if (result.hasFieldErrors()) {
			return ControllerUtil.getMessageError(result.getFieldError());
		}
		
		Usuario usuarioValidado = usuarioDao.validaUsuario(usuario);
		
		String mensagem = "";
		
		if(usuarioValidado != null) {
			
			if (usuarioValidado.getAtivado()) {
				
				if (usuario.getSenha().equals(usuarioValidado.getSenha())) {
					
					session.setAttribute("usuarioLogado", usuarioValidado);
					
					return ControllerUtil.getMessageSuccess("Usuário logado!");
					
				}
				else{
					
					JsonObject resposta = Json.createObjectBuilder()
						.add("status", "300")
						.add("mensagem", "\nErro: Senha inválida!")
						.build();
					
					return resposta.toString();
					
				}

				
			}
			else mensagem = "Usuário não ativado!";
			
		}
		else mensagem = "Usuário não cadastrado!";
		
		return ControllerUtil.getMessageError(mensagem);
			
	}
	
	@RequestMapping("pegaUsuario")
	@ResponseBody
    public String pegaUsuario(HttpSession session) {
        
        String status = "";
		String mensagem = "";
        String emailUsuario = "";
        
        Usuario usuario = (Usuario) session.getAttribute("usuarioLogado");
        
        Date dataInicial = usuario.getData().getTime();
		Date dataAtual = Data.StringToDate(Data.DataAtual(), "dd/MM/yyyy");
		
		int dias = Data.getDaysDiff(dataInicial, dataAtual);
		
		if (dias > 180) {
			
			status = "201";
			mensagem = "Senha expirada!";
			
		}
		else {
			
			status = "200";
			mensagem = "Usuário logado!";
			
		}
        
        emailUsuario = usuario.getEmail();
        
        JsonObject resposta = Json.createObjectBuilder()
				.add("status", status)
				.add("mensagem", mensagem)
				.add("usuario", emailUsuario)
				.build();
				
		return resposta.toString();
		
    }
	
	@RequestMapping("alteraSenha")
	@ResponseBody
	public String alteraSenha(@RequestBody @Valid Senha senha,
							  BindingResult result,
							  HttpSession session) {
		
		if (result.hasFieldErrors()) {
			return ControllerUtil.getMessageError(result.getFieldError());
		}
		
		if (!senha.getSenhaNova().equals(senha.getSenhaConfirma())) {
			return ControllerUtil.getMessageError("Senha redigitada incorretamente!");
		}
		else {
			
			Usuario usuario = (Usuario) session.getAttribute("usuarioLogado");
			
			if (senha.getSenhaNova().equals(usuario.getSenha())) {
				return ControllerUtil.getMessageError("Senha nova igual a senha atual!");
			}
			else {
			
				if (senha.getSenhaAtual().equals(usuario.getSenha())) {
					
					usuario.setSenha(senha.getSenhaNova());
					usuario.setData(Calendar.getInstance());
					
					usuarioDao.altera(usuario);
					
					return ControllerUtil.getMessageSuccess("1");
					
				}
				else {
					return ControllerUtil.getMessageError("Senha atual incorreta!");
					
				}
			
			}
		
		}
		
	}
	
	@RequestMapping("efetuaCadastroLogin")
	@ResponseBody
	public String efetuaCadastroLogin(@Valid Usuario usuario,
									  BindingResult result,
									  HttpSession session) {
		
		if (result.hasFieldErrors()) {
			return ControllerUtil.getMessageError(result.getFieldError());
		}
		
		boolean existe = usuarioDao.verificaExiste("email", usuario.getEmail());
		
		if (existe) return ControllerUtil.getMessageError("Usuário já cadastrado!");
		else {
			
			Empresa empresa = new Empresa();
			
			empresa.setNome(usuario.getNome());
			empresa.setEmail(usuario.getEmail());
			empresa.setTelefone(usuario.getTelefone());
			empresa.setDataMilho(Calendar.getInstance());
			empresa.setDataCafe(Calendar.getInstance());
			empresa.setEndereco("");
			empresa.setBairro("");
			empresa.setCidade("");
			empresa.setCpfcnpj("");
			
			empresaDao.adiciona(empresa);
			
			usuario.setCodigoSeguranca(usuarioDao.getCodigoSeguranca());
			usuario.setSenha(usuario.getCodigoSeguranca());
			usuario.setData(Calendar.getInstance());
			usuario.setAdm(true);
			usuario.setAtivado(false);
			usuario.setEmpresa(empresa);
			
			usuarioDao.adiciona(usuario);
			
			String titulo = "Ativação de usuário!";
			
			String texto = usuarioDao.pegaEmailTexto(usuario, 0);
			
			EmailUtil emailUtil = new EmailUtil();
			
			boolean enviado = emailUtil.enviaEmail(usuario.getEmail(), titulo, texto);
			
			if (enviado) return ControllerUtil.getMessageSuccess("Email de ativação de usuário enviado com sucesso!");
			else return ControllerUtil.getMessageError("Email de ativação de usuário não enviado!");
			
		}
				
	}
	
	@RequestMapping("recuperaSenha")
	@ResponseBody
	public String recuperaSenha(@Valid Usuario usuario,
								BindingResult result,
								HttpSession session) {
		
		if (result.hasFieldErrors()) {
			return ControllerUtil.getMessageError(result.getFieldError());
		}
		
		usuario = usuarioDao.buscaPorEmail(usuario.getEmail());
		
		if(usuario != null) {
		
			usuario.setCodigoSeguranca(usuarioDao.getCodigoSeguranca());
			
			usuarioDao.altera(usuario);
			
			String titulo = "Recuperação de Senha!";
			
			String texto = usuarioDao.pegaEmailTexto(usuario, 1);
			
			EmailUtil emailUtil = new EmailUtil();
			
			boolean enviado = emailUtil.enviaEmail(usuario.getEmail(), titulo, texto);
			
			if (enviado) return ControllerUtil.getMessageSuccess("Email de recuperação de senha enviado com sucesso!");
			else return ControllerUtil.getMessageError("Email de recuperação de senha não enviado!");
			
		}
		else return ControllerUtil.getMessageError("Email não cadastrado!");
		
	}
	
	@RequestMapping("ativaUsuario")
	@ResponseBody
	public String ativaUsuario(@RequestBody @Valid Senha senha,
							   BindingResult result,
							   HttpSession session) {
		
		if (result.hasFieldErrors()) {
			return ControllerUtil.getMessageError(result.getFieldError());
		}
		
		Usuario usuario = usuarioDao.buscaPorEmail(senha.getEmail());
		
		if(usuario != null) {
		
			if (!senha.getSenhaNova().equals(senha.getSenhaConfirma())) {
				return ControllerUtil.getMessageError("Senha de Confirmação incorreta!");
			}
			else {
				
				if (!senha.getCodigoSeguranca().equals(usuario.getCodigoSeguranca())) {
					return ControllerUtil.getMessageError("Código de Seguranca incorreto!");
				}
				else {
				
					usuario.setAtivado(true);
					usuario.setCodigoSeguranca(usuarioDao.getCodigoSeguranca());
					usuario.setSenha(senha.getSenhaNova());
					usuario.setData(Calendar.getInstance());
					
					usuarioDao.altera(usuario);
					
					session.setAttribute("usuarioLogado", usuario);
					
					return ControllerUtil.getMessageSuccess("Usuário logado!");
						
				}
			
			}
			
		}
		else return ControllerUtil.getMessageError("Email não cadastrado!");
		
	}
	
}
