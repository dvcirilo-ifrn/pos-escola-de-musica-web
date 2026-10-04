import { useState } from 'react'
import { Alert, Button, Card, Col, Form, Row } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import { api, mensagemDeErro } from '../api/client'
import { useAuth } from '../AuthContext'
import { Foto } from '../components/Foto'

export function Perfil() {
  const { usuario, setUsuario, sair } = useAuth()
  const location = useLocation()
  const [nome, setNome] = useState(usuario.nome)
  const [foto, setFoto] = useState(null)
  const [erro, setErro] = useState(null)
  const [erros, setErros] = useState({})
  const [salvo, setSalvo] = useState(false)

  async function salvar(corpo) {
    setErro(null)
    setErros({})
    setSalvo(false)
    try {
      setUsuario(await api('/auth/eu/', { method: 'PATCH', body: corpo }))
      setSalvo(true)
    } catch (erro) {
      setErro(mensagemDeErro(erro))
      setErros(erro.dados ?? {})
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    const formulario = new FormData()
    formulario.append('nome', nome)
    if (foto) {
      formulario.append('foto', foto)
    }
    salvar(formulario)
  }

  return (
    <Row className="justify-content-center">
      <Col md={8} lg={6}>
        <Card>
          <Card.Body>
            <div className="text-center mb-4">
              <Foto src={usuario.foto} tamanho={96} />
              <h2 className="mt-2 mb-0">{usuario.nome}</h2>
              <div className="text-secondary">{usuario.email}</div>
              <div className="text-secondary">{usuario.organizacao.nome}</div>
            </div>

            {erro && <Alert variant="danger">{erro}</Alert>}
            {salvo && <Alert variant="success">Perfil atualizado.</Alert>}
            {location.state?.mensagem && <Alert variant="success">{location.state.mensagem}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="nome">
                <Form.Label>Nome</Form.Label>
                <Form.Control value={nome} onChange={e => setNome(e.target.value)} isInvalid={!!erros.nome} required />
                <Form.Control.Feedback type="invalid">{erros.nome?.join(' ')}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="foto">
                <Form.Label>Foto</Form.Label>
                <Form.Control type="file" accept="image/*" onChange={e => setFoto(e.target.files[0])} isInvalid={!!erros.foto} />
                <Form.Control.Feedback type="invalid">{erros.foto?.join(' ')}</Form.Control.Feedback>
              </Form.Group>
              <div className="d-flex gap-2">
                <Button type="submit">Salvar</Button>
                {usuario.foto && (
                  <Button variant="outline-secondary" onClick={() => salvar({ foto: null })}>
                    Remover foto
                  </Button>
                )}
                <Button as={Link} to="/perfil/senha" variant="outline-primary" className="ms-auto">
                  <i className="bi bi-key"></i> Alterar senha
                </Button>
                <Button variant="outline-danger" onClick={sair}>
                  <i className="bi bi-box-arrow-right"></i> Sair
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}
