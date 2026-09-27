import { useState } from 'react'
import { Alert, Button, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { api, mensagemDeErro } from '../../api/client'
import { Carregando } from '../../components/Carregando'
import { CarregarMais } from '../../components/CarregarMais'
import { Confirmacao } from '../../components/Confirmacao'
import { Erro } from '../../components/Erro'
import { formatarData, formatarHora } from '../../formatos'
import { usePaginado } from '../../hooks/useApi'

export function AConfirmar() {
  const pedidos = usePaginado('/agendamentos/?status=solicitado')
  const [cancelando, setCancelando] = useState(null)
  const [erroAcao, setErroAcao] = useState(null)

  async function executar(id, acao) {
    setErroAcao(null)
    try {
      await api(`/agendamentos/${id}/${acao}/`, { method: 'POST' })
      pedidos.recarregar()
    } catch (erro) {
      setErroAcao(mensagemDeErro(erro))
    }
  }

  function cancelar() {
    executar(cancelando, 'cancelar')
    setCancelando(null)
  }

  if (pedidos.erro) return <Erro erro={pedidos.erro} tentarDeNovo={pedidos.recarregar} />

  return (
    <>
      <h2 className="mb-4">A confirmar</h2>
      {erroAcao && <Alert variant="danger">{erroAcao}</Alert>}
      {!pedidos.carregando && pedidos.itens.length === 0 && (
        <Alert variant="success">Nenhum pedido para confirmar.</Alert>
      )}
      <ListGroup>
        {pedidos.itens.map(aula => (
          <ListGroup.Item key={aula.id} className="d-flex flex-wrap align-items-center gap-3">
            <div className="text-center">
              <div className="fw-bold">{formatarHora(aula.inicio)}</div>
              <small className="text-secondary">{formatarData(aula.inicio)}</small>
            </div>
            <div className="me-auto">
              <Link to={`/aulas/${aula.id}`} className="fw-semibold">{aula.servico_nome}</Link>
              <div><small className="text-secondary">{aula.recurso_nome} · {aula.cliente_nome}</small></div>
              {aula.observacoes && <small className="fst-italic">{aula.observacoes}</small>}
            </div>
            <div className="d-flex gap-2">
              <Button variant="success" size="sm" onClick={() => executar(aula.id, 'confirmar')}>
                <i className="bi bi-check-lg"></i> Confirmar
              </Button>
              <Button variant="outline-danger" size="sm" onClick={() => setCancelando(aula.id)}>
                Cancelar
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
      {pedidos.carregando ? <Carregando /> : <CarregarMais lista={pedidos} />}

      <Confirmacao
        show={cancelando !== null}
        titulo="Cancelar pedido"
        mensagem="Deseja mesmo cancelar este pedido de aula?"
        textoConfirmar="Cancelar pedido"
        variante="danger"
        onConfirmar={cancelar}
        onFechar={() => setCancelando(null)}
      />
    </>
  )
}
