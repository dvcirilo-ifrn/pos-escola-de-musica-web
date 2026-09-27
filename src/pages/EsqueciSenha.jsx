import { useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { mensagemDeErro, redefinirSenha } from '../api/client'

export function EsqueciSenha() {
  const [email, setEmail] = useState('')
  const [enviado, setEnviado] = useState(false)
  const [erro, setErro] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setErro(null)
    try {
      await redefinirSenha(email)
      setEnviado(true)
    } catch (erro) {
      setErro(mensagemDeErro(erro))
    }
  }

  return (
    <>
      <h2 className="mb-4">Esqueci minha senha</h2>
      {enviado ? (
        <Alert variant="success">
          Se o e-mail estiver cadastrado, você receberá um link para criar uma nova senha.
        </Alert>
      ) : (
        <Form onSubmit={handleSubmit}>
          {erro && <Alert variant="danger">{erro}</Alert>}
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>E-mail</Form.Label>
            <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </Form.Group>
          <Button type="submit" className="w-100">Enviar link</Button>
        </Form>
      )}
      <Link to="/login" className="d-block mt-3">Voltar para o login</Link>
    </>
  )
}
