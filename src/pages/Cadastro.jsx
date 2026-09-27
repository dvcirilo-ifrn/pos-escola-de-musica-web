import { useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { cadastrar, mensagemDeErro } from '../api/client'
import { useAuth } from '../AuthContext'

export function Cadastro() {
  const { entrar } = useAuth()
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState(null)
  const [erros, setErros] = useState({})
  const [enviando, setEnviando] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setEnviando(true)
    setErro(null)
    setErros({})
    try {
      await cadastrar(nome, email, senha)
      await entrar(email, senha)
    } catch (erro) {
      setErro(mensagemDeErro(erro))
      setErros(erro.dados ?? {})
      setEnviando(false)
    }
  }

  return (
    <>
      <h2 className="mb-4">Criar conta</h2>
      {erro && <Alert variant="danger">{erro}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="nome">
          <Form.Label>Nome</Form.Label>
          <Form.Control value={nome} onChange={e => setNome(e.target.value)} isInvalid={!!erros.nome} required />
          <Form.Control.Feedback type="invalid">{erros.nome?.join(' ')}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>E-mail</Form.Label>
          <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} isInvalid={!!erros.email} required />
          <Form.Control.Feedback type="invalid">{erros.email?.join(' ')}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="senha">
          <Form.Label>Senha</Form.Label>
          <Form.Control type="password" value={senha} onChange={e => setSenha(e.target.value)} isInvalid={!!erros.senha} required />
          <Form.Control.Feedback type="invalid">{erros.senha?.join(' ')}</Form.Control.Feedback>
        </Form.Group>
        <Button type="submit" className="w-100" disabled={enviando}>Criar conta</Button>
      </Form>
      <p className="mt-3 mb-0">
        Já tem conta? <Link to="/login">Entrar</Link>
      </p>
    </>
  )
}
