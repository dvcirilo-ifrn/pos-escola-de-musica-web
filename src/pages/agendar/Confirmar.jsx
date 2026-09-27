import { useState } from 'react'
import { Alert, Button, Card, Form, ListGroup } from 'react-bootstrap'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { api, mensagemDeErro } from '../../api/client'
import { Carregando } from '../../components/Carregando'
import { Erro } from '../../components/Erro'
import { formatarData, formatarHora, formatarPreco } from '../../formatos'
import { useApi } from '../../hooks/useApi'

export function Confirmar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [params] = useSearchParams()
  const inicio = params.get('inicio')
  const servico = useApi(`/servicos/${params.get('servico')}/`)
  const recurso = useApi(`/recursos/${params.get('recurso')}/`)
  const [observacoes, setObservacoes] = useState('')
  const [erro, setErro] = useState(null)
  const [enviando, setEnviando] = useState(false)

  if (servico.erro) return <Erro erro={servico.erro} tentarDeNovo={servico.recarregar} />
  if (recurso.erro) return <Erro erro={recurso.erro} tentarDeNovo={recurso.recarregar} />
  if (servico.carregando || recurso.carregando) return <Carregando />

  const fim = new Date(new Date(inicio).getTime() + servico.dados.duracao_min * 60000)

  async function handleSubmit(e) {
    e.preventDefault()
    setEnviando(true)
    setErro(null)
    try {
      const agendamento = await api('/agendamentos/', {
        method: 'POST',
        body: { servico: servico.dados.id, recurso: recurso.dados.id, inicio, observacoes },
      })
      navigate('/agendar/enviado', { state: { agendamento } })
    } catch (erro) {
      // a vaga acabou ou já existe outra aula no horário: volta para a escolha do horário
      if (erro.dados?.inicio) {
        navigate(location.state?.voltar ?? `/agendar/horario?servico=${servico.dados.id}&data=${inicio.slice(0, 10)}`, {
          state: { erro: erro.dados.inicio.join(' ') },
        })
      } else {
        setErro(mensagemDeErro(erro))
        setEnviando(false)
      }
    }
  }

  return (
    <>
      <small className="text-secondary">Passo 4 de 4</small>
      <h2 className="mb-4">Confirmar agendamento</h2>
      <Card>
        <ListGroup variant="flush">
          <ListGroup.Item><strong>Serviço:</strong> {servico.dados.nome}</ListGroup.Item>
          <ListGroup.Item><strong>Professor ou sala:</strong> {recurso.dados.nome}</ListGroup.Item>
          <ListGroup.Item><strong>Dia:</strong> {formatarData(inicio)}</ListGroup.Item>
          <ListGroup.Item>
            <strong>Horário:</strong> {formatarHora(inicio)} às {formatarHora(fim)} ({servico.dados.duracao_min} min)
          </ListGroup.Item>
          <ListGroup.Item><strong>Preço:</strong> {formatarPreco(servico.dados.preco)}</ListGroup.Item>
        </ListGroup>
        <Card.Body>
          {erro && <Alert variant="danger">{erro}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="observacoes">
              <Form.Label>Observações</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={observacoes}
                onChange={e => setObservacoes(e.target.value)}
                placeholder="Ex.: Banda Os Afinados, 4 integrantes"
              />
              <Form.Text>Se a aula for para um filho, informe o nome e a idade da criança.</Form.Text>
            </Form.Group>
            <div className="d-flex gap-2">
              <Button variant="outline-secondary" onClick={() => navigate(-1)}>Voltar</Button>
              <Button type="submit" disabled={enviando}>Confirmar</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  )
}
