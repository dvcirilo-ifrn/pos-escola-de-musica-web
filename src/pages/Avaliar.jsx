import { useState } from 'react'
import { Alert, Button, Card, Form } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { api, mensagemDeErro } from '../api/client'
import { Carregando } from '../components/Carregando'
import { Erro } from '../components/Erro'
import { formatarData } from '../formatos'
import { useApi } from '../hooks/useApi'

export function Avaliar() {
  const { id } = useParams()
  const navigate = useNavigate()
  const aula = useApi(`/agendamentos/${id}/`)
  const [nota, setNota] = useState(0)
  const [comentario, setComentario] = useState('')
  const [erro, setErro] = useState(null)

  if (aula.erro) return <Erro erro={aula.erro} tentarDeNovo={aula.recarregar} />
  if (aula.carregando) return <Carregando />

  async function handleSubmit(e) {
    e.preventDefault()
    setErro(null)
    try {
      await api(`/agendamentos/${id}/avaliar/`, { method: 'POST', body: { nota, comentario } })
      navigate(`/aulas/${id}`)
    } catch (erro) {
      setErro(mensagemDeErro(erro))
    }
  }

  return (
    <Card>
      <Card.Body>
        <h2>Avaliar aula</h2>
        <p className="text-secondary">
          {aula.dados.servico_nome} com {aula.dados.recurso_nome}, {formatarData(aula.dados.inicio)}
        </p>
        {erro && <Alert variant="danger">{erro}</Alert>}
        <Form onSubmit={handleSubmit}>
          <div className="mb-3">
            {[1, 2, 3, 4, 5].map(n => (
              <Button key={n} variant="link" className="p-1 fs-2 text-warning" onClick={() => setNota(n)}>
                <i className={n <= nota ? 'bi bi-star-fill' : 'bi bi-star'}></i>
              </Button>
            ))}
          </div>
          <Form.Group className="mb-3" controlId="comentario">
            <Form.Label>Comentário</Form.Label>
            <Form.Control as="textarea" rows={3} value={comentario} onChange={e => setComentario(e.target.value)} />
          </Form.Group>
          <Button type="submit" disabled={nota === 0}>Enviar</Button>
        </Form>
      </Card.Body>
    </Card>
  )
}
