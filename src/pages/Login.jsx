import { useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { mensagemDeErro } from '../api/client'
import { useAuth } from '../AuthContext'

export function Login() {
  const { entrar } = useAuth()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState(null)
  const [enviando, setEnviando] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setEnviando(true)
    setErro(null)
    try {
      await entrar(email, senha)
    } catch (erro) {
      setErro(mensagemDeErro(erro))
      setEnviando(false)
    }
  }

  return (
    <>
      <h2 className="mb-4">Entrar</h2>
      {erro && <Alert variant="danger">{erro}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>E-mail</Form.Label>
          <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="senha">
          <Form.Label>Senha</Form.Label>
          <Form.Control type="password" value={senha} onChange={e => setSenha(e.target.value)} required />
        </Form.Group>
        <Button type="submit" className="w-100" disabled={enviando}>Entrar</Button>
      </Form>
      <div className="d-flex justify-content-between mt-3">
        <Link to="/cadastro">Criar conta</Link>
        <Link to="/esqueci-senha">Esqueci minha senha</Link>
      </div>
    </>
  )
}
