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

import br.net.lls.componentes.Id;
import br.net.lls.componentes.Consulta;
import br.net.lls.componentes.ControllerUtil;
import br.net.lls.cadastro.Produtor;
import br.net.lls.cadastro.TelefoneProdutor;
import br.net.lls.cadastro.FazendaProdutor;
import br.net.lls.cadastro.dao.ProdutorDao;
import br.net.lls.cadastro.dao.TelefoneProdutorDao;
import br.net.lls.cadastro.dao.FazendaProdutorDao;

import java.util.List;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

import java.io.IOException;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.core.JsonGenerationException;

import org.json.JSONArray;
import org.json.JSONObject;

@Transactional
@Controller
public class ProdutorController {
	
	@Autowired
	ProdutorDao produtorDao;
	
	@Autowired
	TelefoneProdutorDao telefoneProdutorDao;
	
	@Autowired
	FazendaProdutorDao fazendaDao;
	
	@Autowired
	SmartValidator validator;
	
	@RequestMapping("salvaProdutor")
	public @ResponseBody String adiciona(@RequestBody String json,
										 BindingResult result) {
		
		String status = "";
		String mensagem = "";
		
		try {
			
			ObjectMapper mapper = new ObjectMapper();
			
			JsonNode node = mapper.readTree(json);
			
			Produtor produtor = mapper.convertValue(node.get("produtor"), Produtor.class);
			
			validator.validate(produtor, result, Produtor.ProdutorValida.class);
			
			if(result.hasFieldErrors()) {
				return ControllerUtil.getMessageError(result.getFieldError());
			} 
			else {
				
				produtor = produtorDao.urlDecoder(produtor);
				
				boolean verificaExisteCpfcnpj = produtorDao.verificaExiste("cpfcnpj", produtor.getCpfcnpj());
				
				mensagem = " em uso!\n";
				
				if (verificaExisteCpfcnpj) {
					
					status = "400";
					
					if (produtor.getCpfcnpj().length() == 14) {
					
						mensagem = "Cnpj " + mensagem;
						
					}
					else {
						
						mensagem = "Cpf " + mensagem;
						
					}
					
				}
				
				if (produtor.getId() == 0) {
					
					if (!verificaExisteCpfcnpj) {
						
						produtorDao.adiciona(produtor);
						
						status = "200";
						
						mensagem = produtor.getNome() + " salvo com sucesso!";
						
					}
					
				}
				else {
					
					Produtor produtorAtual = produtorDao.buscaPorId(produtor.getId());
						
					if (produtorAtual.getCpfcnpj().equals(produtor.getCpfcnpj())) {
					
						produtorDao.altera(produtor);
					
						status = "200";
					
						mensagem = produtor.getNome() + " alterado com sucesso!";
					
					}
					else if (!produtorAtual.getCpfcnpj().equals(produtor.getCpfcnpj()) && !verificaExisteCpfcnpj) {
					
						produtorDao.altera(produtor);
					
						status = "200";
					
						mensagem = produtor.getNome() + " alterado com sucesso!";
					
					}
					
				}
				
				if (status.equals("200")) {
					
					TelefoneProdutor[] telefones = mapper.convertValue(node.get("telefones"), TelefoneProdutor[].class);
					
					for (int i = 0; i < telefones.length; i++) {
						
						TelefoneProdutor telefone = telefones[i];
						
						if (!telefone.getNumero().equals("")) {
							
							validator.validate(telefone, result, TelefoneProdutor.TelefoneProdutorValida.class);
							
							if (result.hasFieldErrors()) {
								
								status = "400";
								
								FieldError erro = result.getFieldError();
								
								mensagem += "\nErro: " + erro.getDefaultMessage();						
								
							} else {
								
								if (telefone.getId() == 0) {
									
									telefone.setProdutor(produtor);
									
									telefoneProdutorDao.urlDecoder(telefone);
									
									telefoneProdutorDao.adiciona(telefone);
									
								}
								else {
									
									TelefoneProdutor telefoneProdutor = telefoneProdutorDao.buscaPorId(telefone.getId());
									
									telefoneProdutorDao.urlDecoder(telefoneProdutor, telefone);
									
									telefoneProdutorDao.altera(telefoneProdutor);
									
								}
								
							}
							
						}
						
					}
					
					FazendaProdutor[] fazendas = mapper.convertValue(node.get("fazendas"), FazendaProdutor[].class);
					
					for (int i = 0; i < fazendas.length; i++) {
						
						FazendaProdutor fazenda = fazendas[i];
						
						if (!fazenda.getNome().equals("")) {
							
							validator.validate(fazenda, result, FazendaProdutor.FazendaProdutorValida.class);
							
							if (result.hasFieldErrors()) {
								
								status = "400";
								
								FieldError erro = result.getFieldError();
								
								mensagem += "\nErro: " + erro.getDefaultMessage();						
								
							} else {
								
								if (fazenda.getId() == 0) {
									
									fazenda.setProdutor(produtor);
									
									fazendaDao.urlDecoder(fazenda);
									
									fazendaDao.adiciona(fazenda);
									
								}
								else {
									
									FazendaProdutor fazendaProdutor = fazendaDao.buscaPorId(fazenda.getId());
									
									fazendaDao.urlDecoder(fazendaProdutor, fazenda);
									
									fazendaDao.altera(fazendaProdutor);
									
								}
								
							}
							
						}
						
					}
					
				}
				
			}
			
			return ControllerUtil.getMessage(status, mensagem);
			
		} catch (JsonGenerationException e) {
			return ControllerUtil.getMessageError(e.toString());
			
		} catch (IOException e) {
			return ControllerUtil.getMessageError(e.toString());
		}
		
	}
	
	@RequestMapping("listaProdutor")
	public @ResponseBody String lista(@RequestBody @Valid Id id,
									  BindingResult result) {
		
		if(result.hasFieldErrors()) {
			return ControllerUtil.getMessageError(result.getFieldError());
		}
		else {
			
			int pageSize = 8;
			
			List produtorList = produtorDao.lista(id.getId(), id.getNome(), pageSize);
			
			JSONArray produtoresArray = new JSONArray();
			
			for (Iterator iterator = produtorList.iterator(); iterator.hasNext();) {
				
				Produtor produtor = (Produtor) iterator.next();
				
				JSONObject produtorJSON = new JSONObject();
				
				produtorJSON.put("id", produtor.getId());
				produtorJSON.put("nome", produtor.getNome());
				produtorJSON.put("cpfcnpj", produtor.getCpfcnpj());
				produtorJSON.put("endereco", produtor.getEndereco());
				produtorJSON.put("bairro", produtor.getBairro());
				produtorJSON.put("cidade", produtor.getCidade());
				produtorJSON.put("estado", produtor.getEstadoNome());
				produtorJSON.put("cep", produtor.getCep());
				
				produtoresArray.put(produtorJSON);
				
			}
			
			int[] array = produtorDao.getQuantidadePaginas(id.getNome(), pageSize);
			
			JSONObject totalJSONObject = new JSONObject();
			
			totalJSONObject.put("paginas", array[0]);
			totalJSONObject.put("qtd", array[1]);
			
			return Consulta.getJson(produtoresArray, totalJSONObject);
			
		}
		
	}
	
	@RequestMapping("achaProdutor")
	public @ResponseBody String acha(@RequestBody @Valid Id id,
									 BindingResult result) {
		
		if(result.hasFieldErrors()) {
			return ControllerUtil.getMessageError(result.getFieldError());
		}
		
		Produtor produtor = produtorDao.buscaPorId(id.getId());
		
		JSONObject obj = getProdutorJSON(produtor);
		
		obj.put("status", "200");
		
		return obj.toString();
		
	}
	
	@RequestMapping("removeProdutor")
	public @ResponseBody String remove(@RequestBody @Valid Id id,
									   BindingResult result) {
		
		if(result.hasFieldErrors()) {
			return ControllerUtil.getMessageError(result.getFieldError());
		}
		
		produtorDao.remove(id.getId());
		
		return ControllerUtil.getMessageSuccess("2");
		
	}
	
	private JSONObject getProdutorJSON(Produtor produtor) {
		
		JSONObject produtorJSON = new JSONObject();
			
		produtorJSON.put("id", produtor.getId());
		produtorJSON.put("nome", produtor.getNome());
		produtorJSON.put("endereco", produtor.getEndereco());
		produtorJSON.put("bairro", produtor.getBairro());
		produtorJSON.put("cidade", produtor.getCidade());
		produtorJSON.put("estado", produtor.getEstadoNome());
		produtorJSON.put("cep", produtor.getCep());
		produtorJSON.put("email", produtor.getEmail());
		produtorJSON.put("site", produtor.getSite());
		produtorJSON.put("cpfcnpj", produtor.getCpfcnpj());
		produtorJSON.put("observacao", produtor.getObservacao());
		
		Set<TelefoneProdutor> telefoneProdutor = new HashSet<TelefoneProdutor>();
			
		telefoneProdutor = produtor.getProdutorTelefones();
		
		JSONArray telefonesProdutorArray = new JSONArray();
		
		for (TelefoneProdutor t : telefoneProdutor) {
			
			JSONObject telefoneProdutorJSON = new JSONObject();
			
			telefoneProdutorJSON.put("id", t.getId());
			telefoneProdutorJSON.put("numero", t.getNumero());
			telefoneProdutorJSON.put("responsavel", t.getResponsavel());
			telefoneProdutorJSON.put("tipo", t.getTipoNome());
			telefoneProdutorJSON.put("operadora", t.getOperadoraNome());
			
			telefonesProdutorArray.put(telefoneProdutorJSON);
			
			produtorJSON.put("telefones", telefonesProdutorArray);
			
		}
		
		Set<FazendaProdutor> fazenda = new HashSet<FazendaProdutor>();
			
		fazenda = produtor.getProdutorFazendaProdutors();
		
		JSONArray fazendasArray = new JSONArray();
		
		for (FazendaProdutor f : fazenda) {
			
			JSONObject fazendaJSON = new JSONObject();
			
			fazendaJSON.put("id", f.getId());
			fazendaJSON.put("nome", f.getNome());
			fazendaJSON.put("endereco", f.getEndereco());
			fazendaJSON.put("bairro", f.getBairro());
			fazendaJSON.put("cidade", f.getCidade());
			fazendaJSON.put("estado", f.getEstadoNome());
			fazendaJSON.put("cep", f.getCep());				
			fazendaJSON.put("ie", f.getIe());
			fazendaJSON.put("cpfcnpj", f.getCpfcnpj());
			
			fazendasArray.put(fazendaJSON);
			
			produtorJSON.put("fazendas", fazendasArray);
			
		}
		
		return produtorJSON;
	}
	
}
