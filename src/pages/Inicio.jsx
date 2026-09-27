import { useAuth } from '../AuthContext'

export function Inicio() {
  const { usuario } = useAuth()
  return <h2>Olá, {usuario.nome}!</h2>
}
