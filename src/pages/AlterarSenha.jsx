import { useState } from 'react'
import { Alert, Button, Card, Col, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { api, mensagemDeErro } from '../api/client'

export function AlterarSenha() {
  const navigate = useNavigate()
  const [senhaAtual, setSenhaAtual] = useState('')
  const [novaSenha, setNovaSenha] = useState('')
  const [confirmacao, setConfirmacao] = useState('')
  const [erro, setErro] = useState(null)
  const [erros, setErros] = useState({})
  const [enviando, setEnviando] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setErro(null)
    setErros({})

    // a API não recebe a confirmação: ela é conferida só aqui
    if (novaSenha !== confirmacao) {
      setErros({ confirmacao: ['As senhas não conferem.'] })
      return
    }

    setEnviando(true)
    try {
      await api('/auth/alterar-senha/', {
        method: 'POST',
        body: { senha_atual: senhaAtual, nova_senha: novaSenha },
      })
      navigate('/perfil', { state: { mensagem: 'Senha alterada.' } })
    } catch (erro) {
      setErro(mensagemDeErro(erro))
      setErros(erro.dados ?? {})
      setEnviando(false)
    }
  }

  return (
    <Row className="justify-content-center">
      <Col md={8} lg={6}>
        <Card>
          <Card.Body>
            <h2 className="mb-4">Alterar senha</h2>
            {erro && <Alert variant="danger">{erro}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="senhaAtual">
                <Form.Label>Senha atual</Form.Label>
                <Form.Control type="password" value={senhaAtual} onChange={e => setSenhaAtual(e.target.value)} isInvalid={!!erros.senha_atual} required />
                <Form.Control.Feedback type="invalid">{erros.senha_atual?.join(' ')}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="novaSenha">
                <Form.Label>Nova senha</Form.Label>
                <Form.Control type="password" value={novaSenha} onChange={e => setNovaSenha(e.target.value)} isInvalid={!!erros.nova_senha} required />
                <Form.Control.Feedback type="invalid">{erros.nova_senha?.join(' ')}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="confirmacao">
                <Form.Label>Confirme a nova senha</Form.Label>
                <Form.Control type="password" value={confirmacao} onChange={e => setConfirmacao(e.target.value)} isInvalid={!!erros.confirmacao} required />
                <Form.Control.Feedback type="invalid">{erros.confirmacao?.join(' ')}</Form.Control.Feedback>
              </Form.Group>
              <div className="d-flex gap-2">
                <Button variant="outline-secondary" onClick={() => navigate('/perfil')}>Cancelar</Button>
                <Button type="submit" disabled={enviando}>Salvar</Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}
