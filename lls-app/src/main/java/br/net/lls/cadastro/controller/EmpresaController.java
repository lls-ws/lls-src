package br.net.lls.cadastro.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.SmartValidator;

import java.net.URLDecoder;
import java.io.IOException;
import javax.validation.Valid;
import javax.json.JsonObject;
import javax.servlet.http.HttpSession;

import br.net.lls.componentes.Id;
import br.net.lls.componentes.Data;
import br.net.lls.componentes.ControllerUtil;
import br.net.lls.cadastro.Usuario;
import br.net.lls.cadastro.Empresa;
import br.net.lls.cadastro.dao.EmpresaDao;

import java.util.List;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.core.JsonGenerationException;

import org.json.JSONArray;
import org.json.JSONObject;

@Transactional
@Controller
public class EmpresaController {
 
	@Autowired
	EmpresaDao empresaDao;
	
	@Autowired
	SmartValidator validator;
	
	@RequestMapping("salvaEmpresa")
	public @ResponseBody String adiciona(@RequestBody String json,
										 BindingResult result) {
		
		try {
			
			ObjectMapper mapper = new ObjectMapper();
			
			JsonNode node = mapper.readTree(json);
			
			Empresa empresa = mapper.convertValue(node.get("empresa"), Empresa.class);
			
			validator.validate(empresa, result, Empresa.EmpresaValida.class);
			
			if (result.hasFieldErrors()) {
				return ControllerUtil.getMessageError(result.getFieldError());
			}
			else {
				
				empresaDao.altera(empresa);
				
				return ControllerUtil.getMessageSuccess("1");
				
			}
			
		} catch (JsonGenerationException e) {
			return ControllerUtil.getMessageError(e.toString());
			
		} catch (IOException e) {
			return ControllerUtil.getMessageError(e.toString());
		}
	}
	
	@RequestMapping("achaEmpresa")
	public @ResponseBody String acha(HttpSession session) {
		
		Usuario usuario = (Usuario) session.getAttribute("usuarioLogado");
		
		Empresa empresa = empresaDao.buscaPorId(usuario.getEmpresa().getId());
		
		JSONObject empresaJSON = getEmpresaJSON(empresa);
		
		empresaJSON.put("status", "200");
		
		return empresaJSON.toString();
		
	}
	
	@RequestMapping("getData")
	public @ResponseBody String getData() {
		
		JSONObject dataJSON = new JSONObject();
		
		dataJSON.put("status", "200");
		dataJSON.put("data", Data.DataAtual());
		
		return dataJSON.toString();
		
	}
	
	private JSONObject getEmpresaJSON(Empresa empresa) {
		
		JSONObject empresaJSON = new JSONObject();
		
		empresaJSON.put("id", empresa.getId());
		empresaJSON.put("nome", empresa.getNome());
		empresaJSON.put("endereco", empresa.getEndereco());
		empresaJSON.put("bairro", empresa.getBairro());
		empresaJSON.put("cidade", empresa.getCidade());
		empresaJSON.put("estado", empresa.getEstado());
		empresaJSON.put("cep", empresa.getCep());
		empresaJSON.put("cpfcnpj", empresa.getCpfcnpj());
		empresaJSON.put("ie", empresa.getIe());
		empresaJSON.put("email", empresa.getEmail());
		empresaJSON.put("site", empresa.getSite());
		empresaJSON.put("telefone", empresa.getTelefone());
		empresaJSON.put("dataMilho", empresa.getDataMilhoText());
		empresaJSON.put("dataCafe", empresa.getDataCafeText());
		
		return empresaJSON;

	}
	
}
