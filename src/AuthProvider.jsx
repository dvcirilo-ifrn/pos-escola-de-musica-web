import { useEffect, useState } from 'react'
import { api, login } from './api/client'
import { AuthContext } from './AuthContext'

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null)
  const [carregando, setCarregando] = useState(localStorage.getItem('access') !== null)

  useEffect(() => {
    if (localStorage.getItem('access')) {
      api('/auth/eu/')
        .then(setUsuario)
        .catch(() => setUsuario(null))
        .finally(() => setCarregando(false))
    }
  }, [])

  async function entrar(email, senha) {
    const { access, refresh } = await login(email, senha)
    localStorage.setItem('access', access)
    localStorage.setItem('refresh', refresh)
    setUsuario(await api('/auth/eu/'))
  }

  function sair() {
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
    setUsuario(null)
  }

  function pode(permissao) {
    return usuario !== null && usuario.permissoes.includes(permissao)
  }

  const inicio = pode('api.change_organizacao') ? '/admin/agenda' : '/inicio'

  return (
    <AuthContext value={{ usuario, setUsuario, carregando, entrar, sair, pode, inicio }}>
      {children}
    </AuthContext>
  )
}

