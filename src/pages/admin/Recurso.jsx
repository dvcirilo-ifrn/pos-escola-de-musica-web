import { useState } from 'react'
import { Alert, Button, Card, Form } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { api, mensagemDeErro } from '../../api/client'
import { Carregando } from '../../components/Carregando'
import { Erro } from '../../components/Erro'
import { Foto } from '../../components/Foto'
import { useApi } from '../../hooks/useApi'

const NOVO = { nome: '', bio: '', foto: null, capacidade: 1, ativo: true }

export function NovoRecurso() {
  return <FormRecurso recurso={NOVO} />
}

export function EditarRecurso() {
  const { id } = useParams()
  const { dados, erro, carregando, recarregar } = useApi(`/recursos/${id}/`)

  if (erro) return <Erro erro={erro} tentarDeNovo={recarregar} />
  if (carregando) return <Carregando />

  return <FormRecurso recurso={dados} />
}

function FormRecurso({ recurso }) {
  const navigate = useNavigate()
  const [nome, setNome] = useState(recurso.nome)
  const [bio, setBio] = useState(recurso.bio)
  const [capacidade, setCapacidade] = useState(recurso.capacidade)
  const [ativo, setAtivo] = useState(recurso.ativo)
  const [foto, setFoto] = useState(recurso.foto)
  const [arquivo, setArquivo] = useState(null)
  const [erro, setErro] = useState(null)
  const [erros, setErros] = useState({})

  async function handleSubmit(e) {
    e.preventDefault()
    setErro(null)
    setErros({})

    const formulario = new FormData()
    formulario.append('nome', nome)
    formulario.append('bio', bio)
    formulario.append('capacidade', capacidade)
    formulario.append('ativo', ativo)
    if (arquivo) {
      formulario.append('foto', arquivo)
    }

    try {
      if (recurso.id) {
        await api(`/recursos/${recurso.id}/`, { method: 'PATCH', body: formulario })
      } else {
        await api('/recursos/', { method: 'POST', body: formulario })
      }
      navigate('/admin/recursos')
    } catch (erro) {
      setErro(mensagemDeErro(erro))
      setErros(erro.dados ?? {})
    }
  }

  async function removerFoto() {
    try {
      await api(`/recursos/${recurso.id}/`, { method: 'PATCH', body: { foto: null } })
      setFoto(null)
    } catch (erro) {
      setErro(mensagemDeErro(erro))
    }
  }

  return (
    <Card>
      <Card.Body>
        <div className="d-flex align-items-center mb-4">
          <h2 className="me-auto mb-0">{recurso.id ? 'Editar professor ou sala' : 'Novo professor ou sala'}</h2>
          {recurso.id && (
            <Button as={Link} to={`/admin/recursos/${recurso.id}/horarios`} variant="outline-primary">
              <i className="bi bi-clock"></i> Horários
            </Button>
          )}
        </div>
        {erro && <Alert variant="danger">{erro}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="nome">
            <Form.Label>Nome</Form.Label>
            <Form.Control value={nome} onChange={e => setNome(e.target.value)} isInvalid={!!erros.nome} required />
            <Form.Control.Feedback type="invalid">{erros.nome?.join(' ')}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="bio">
            <Form.Label>Bio</Form.Label>
            <Form.Control as="textarea" rows={3} value={bio} onChange={e => setBio(e.target.value)} isInvalid={!!erros.bio} />
            <Form.Control.Feedback type="invalid">{erros.bio?.join(' ')}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="capacidade">
            <Form.Label>Capacidade</Form.Label>
            <Form.Control type="number" value={capacidade} onChange={e => setCapacidade(e.target.value)} isInvalid={!!erros.capacidade} />
            <Form.Text>Quantos alunos ao mesmo tempo: 1 para aulas individuais, mais para turmas.</Form.Text>
            <Form.Control.Feedback type="invalid">{erros.capacidade?.join(' ')}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="foto">
            <Form.Label>Foto</Form.Label>
            <div className="d-flex align-items-center gap-3 mb-2">
              <Foto src={foto} tamanho={64} />
              {foto && (
                <Button variant="outline-secondary" size="sm" onClick={removerFoto}>Remover foto</Button>
              )}
            </div>
            <Form.Control type="file" accept="image/*" onChange={e => setArquivo(e.target.files[0])} isInvalid={!!erros.foto} />
            <Form.Control.Feedback type="invalid">{erros.foto?.join(' ')}</Form.Control.Feedback>
          </Form.Group>
          <Form.Check
            type="switch"
            id="ativo"
            className="mb-3"
            label="Ativo (inativos não aparecem para os alunos)"
            checked={ativo}
            onChange={e => setAtivo(e.target.checked)}
          />
          <div className="d-flex gap-2">
            <Button variant="outline-secondary" onClick={() => navigate('/admin/recursos')}>Voltar</Button>
            <Button type="submit">Salvar</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  )
}
