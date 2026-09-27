import { useEffect, useState } from 'react'
import { api } from '../api/client'

// Baseado no useData de https://react.dev/learn/reusing-logic-with-custom-hooks
export function useApi(caminho) {
  const [resposta, setResposta] = useState({ caminho: null })
  const [tentativa, setTentativa] = useState(0)

  useEffect(() => {
    let ignore = false
    api(caminho)
      .then(dados => {
        if (!ignore) setResposta({ caminho, dados })
      })
      .catch(erro => {
        if (!ignore) setResposta({ caminho, erro })
      })
    return () => {
      ignore = true
    }
  }, [caminho, tentativa])

  function recarregar() {
    setResposta({ caminho: null })
    setTentativa(tentativa + 1)
  }

  // enquanto a resposta for de outro caminho, ainda está carregando
  const atual = resposta.caminho === caminho
  return {
    dados: atual ? resposta.dados : null,
    erro: atual ? resposta.erro : null,
    carregando: !atual,
    recarregar,
  }
}

// Para as listas paginadas da API: { count, next, previous, results }
export function usePaginado(caminho) {
  const [lista, setLista] = useState({ caminho: null, itens: [], proxima: null })
  const [erro, setErro] = useState(null)
  const [tentativa, setTentativa] = useState(0)
  const [carregandoMais, setCarregandoMais] = useState(false)

  useEffect(() => {
    let ignore = false
    api(caminho)
      .then(dados => {
        if (ignore) return
        setErro(null)
        setLista({ caminho, itens: dados.results, proxima: dados.next })
      })
      .catch(erro => {
        if (!ignore) setErro(erro)
      })
    return () => {
      ignore = true
    }
  }, [caminho, tentativa])

  async function carregarMais() {
    setCarregandoMais(true)
    try {
      const dados = await api(lista.proxima)
      setLista({ caminho, itens: [...lista.itens, ...dados.results], proxima: dados.next })
    } catch (erro) {
      setErro(erro)
    }
    setCarregandoMais(false)
  }

  function recarregar() {
    setErro(null)
    setLista({ caminho: null, itens: [], proxima: null })
    setTentativa(tentativa + 1)
  }

  const atual = lista.caminho === caminho
  return {
    itens: atual ? lista.itens : [],
    erro,
    carregando: (!atual && !erro) || carregandoMais,
    temMais: atual && lista.proxima !== null,
    carregarMais,
    recarregar,
  }
}
