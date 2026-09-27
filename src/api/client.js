const API = 'http://localhost:8000/api'
export const ORGANIZACAO = 'escola-de-musica'

function enviar(caminho, { method = 'GET', body } = {}) {
  const url = caminho.startsWith('http') ? caminho : API + caminho
  const headers = {}

  const access = localStorage.getItem('access')
  if (access) {
    headers.Authorization = `Bearer ${access}`
  }

  // FormData (envio de imagens) vai direto: o navegador monta o Content-Type
  if (body && !(body instanceof FormData)) {
    headers['Content-Type'] = 'application/json'
    body = JSON.stringify(body)
  }

  return fetch(url, { method, headers, body })
}

async function renovarToken() {
  const resposta = await fetch(`${API}/auth/renovar/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh: localStorage.getItem('refresh') }),
  })
  if (!resposta.ok) {
    return false
  }
  const { access } = await resposta.json()
  localStorage.setItem('access', access)
  return true
}

export async function api(caminho, opcoes) {
  let resposta = await enviar(caminho, opcoes)

  if (resposta.status === 401 && localStorage.getItem('refresh')) {
    if (await renovarToken()) {
      resposta = await enviar(caminho, opcoes)
    } else {
      localStorage.removeItem('access')
      localStorage.removeItem('refresh')
      window.location.href = '/login'
    }
  }

  const dados = resposta.status === 204 ? null : await resposta.json()
  if (!resposta.ok) {
    throw { status: resposta.status, dados }
  }
  return dados
}

export function mensagemDeErro(erro) {
  const dados = erro.dados
  if (!erro.status) return 'Não foi possível falar com o servidor.'
  if (erro.status === 403) return 'Você não tem permissão para esta ação.'
  if (erro.status === 404) return 'Não encontrado.'
  if (erro.status === 429) return 'Muitas tentativas, aguarde um minuto.'
  if (Array.isArray(dados)) return dados.join(' ')
  if (dados?.detail) return dados.detail
  if (dados?.non_field_errors) return dados.non_field_errors.join(' ')
  return 'Verifique os campos destacados.'
}

export function login(email, senha) {
  return api('/auth/login/', {
    method: 'POST',
    body: { organizacao: ORGANIZACAO, email, senha },
  })
}

export function cadastrar(nome, email, senha) {
  return api('/auth/cadastro/', {
    method: 'POST',
    body: { organizacao: ORGANIZACAO, nome, email, senha },
  })
}

export function redefinirSenha(email) {
  return api('/auth/redefinir-senha/', {
    method: 'POST',
    body: { organizacao: ORGANIZACAO, email },
  })
}
