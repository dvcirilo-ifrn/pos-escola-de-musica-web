import { useState } from 'react'
import { Alert, Button, Card, ListGroup } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { api, mensagemDeErro } from '../api/client'
import { useAuth } from '../AuthContext'
import { Carregando } from '../components/Carregando'
import { Confirmacao } from '../components/Confirmacao'
import { Erro } from '../components/Erro'
import { Estrelas } from '../components/Estrelas'
import { StatusAula } from '../components/StatusAula'
import { formatarData, formatarHora } from '../formatos'
import { useApi } from '../hooks/useApi'

export function Aula() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { pode } = useAuth()
  const { dados: aula, erro, carregando, recarregar } = useApi(`/agendamentos/${id}/`)
  const [erroAcao, setErroAcao] = useState(null)
  const [cancelando, setCancelando] = useState(false)

  if (erro) return <Erro erro={erro} tentarDeNovo={recarregar} />
  if (carregando) return <Carregando />

  const ativa = ['solicitado', 'confirmado'].includes(aula.status)
  const duracao = (new Date(aula.fim) - new Date(aula.inicio)) / 60000

  async function executar(acao) {
    setErroAcao(null)
    try {
      await api(`/agendamentos/${id}/${acao}/`, { method: 'POST' })
      recarregar()
    } catch (erro) {
      setErroAcao(mensagemDeErro(erro))
    }
  }

  function cancelar() {
    setCancelando(false)
    executar('cancelar')
  }

  return (
    <Card>
      <Card.Header className="d-flex justify-content-between align-items-center">
        <h4 className="mb-0">{aula.servico_nome}</h4>
        <StatusAula status={aula.status} />
      </Card.Header>
      <ListGroup variant="flush">
        <ListGroup.Item><strong>Professor ou sala:</strong> {aula.recurso_nome}</ListGroup.Item>
        {pode('api.view_agendamento') && (
          <ListGroup.Item><strong>Aluno:</strong> {aula.cliente_nome}</ListGroup.Item>
        )}
        <ListGroup.Item><strong>Dia:</strong> {formatarData(aula.inicio)}</ListGroup.Item>
        <ListGroup.Item>
          <strong>Horário:</strong> {formatarHora(aula.inicio)} às {formatarHora(aula.fim)} ({duracao} min)
        </ListGroup.Item>
        {aula.observacoes && (
          <ListGroup.Item><strong>Observações:</strong> {aula.observacoes}</ListGroup.Item>
        )}
        {aula.nota && (
          <ListGroup.Item>
            <strong>Avaliação:</strong> <Estrelas nota={aula.nota} />
            {aula.comentario && <p className="mb-0 mt-1">{aula.comentario}</p>}
          </ListGroup.Item>
        )}
      </ListGroup>
      <Card.Body>
        {erroAcao && <Alert variant="danger">{erroAcao}</Alert>}
        <div className="d-flex gap-2">
          <Button variant="outline-secondary" onClick={() => navigate(-1)}>Voltar</Button>
          {pode('api.avaliar_agendamento') && aula.status === 'concluido' && !aula.nota && (
            <Button as={Link} to={`/aulas/${id}/avaliar`}>
              <i className="bi bi-star"></i> Avaliar
            </Button>
          )}
          {pode('api.confirmar_agendamento') && aula.status === 'solicitado' && (
            <Button variant="success" onClick={() => executar('confirmar')}>
              <i className="bi bi-check-lg"></i> Confirmar
            </Button>
          )}
          {pode('api.concluir_agendamento') && aula.status === 'confirmado' && (
            <Button variant="success" onClick={() => executar('concluir')}>
              <i className="bi bi-check2-all"></i> Concluir
            </Button>
          )}
          {pode('api.cancelar_agendamento') && ativa && (
            <Button variant="outline-danger" className="ms-auto" onClick={() => setCancelando(true)}>
              Cancelar
            </Button>
          )}
        </div>
      </Card.Body>
      <Confirmacao
        show={cancelando}
        titulo="Cancelar aula"
        mensagem="Deseja mesmo cancelar esta aula?"
        textoConfirmar="Cancelar aula"
        variante="danger"
        onConfirmar={cancelar}
        onFechar={() => setCancelando(false)}
      />
    </Card>
  )
}
