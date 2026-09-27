import { useState } from 'react'
import { Alert, Badge, Button, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Carregando } from '../../components/Carregando'
import { CarregarMais } from '../../components/CarregarMais'
import { Erro } from '../../components/Erro'
import { FiltroAtivo } from '../../components/FiltroAtivo'
import { Foto } from '../../components/Foto'
import { usePaginado } from '../../hooks/useApi'

export function Recursos() {
  const [ativo, setAtivo] = useState('')
  const recursos = usePaginado(ativo ? `/recursos/?ativo=${ativo}` : '/recursos/')

  return (
    <>
      <div className="d-flex flex-wrap align-items-center gap-2 mb-4">
        <h2 className="me-auto mb-0">Professores e salas</h2>
        <FiltroAtivo valor={ativo} onChange={setAtivo} />
        <Button as={Link} to="/admin/recursos/novo">
          <i className="bi bi-plus-lg"></i> Novo professor ou sala
        </Button>
      </div>

      {recursos.erro && <Erro erro={recursos.erro} tentarDeNovo={recursos.recarregar} />}
      {!recursos.carregando && !recursos.erro && recursos.itens.length === 0 && (
        <Alert variant="info">Cadastre o primeiro professor ou sala.</Alert>
      )}
      <ListGroup>
        {recursos.itens.map(recurso => (
          <ListGroup.Item
            key={recurso.id}
            action
            as={Link}
            to={`/admin/recursos/${recurso.id}`}
            className="d-flex align-items-center gap-3"
          >
            <Foto src={recurso.foto} tamanho={48} />
            <div className="me-auto">
              <div className="fw-semibold">{recurso.nome}</div>
              <small className="text-secondary">Capacidade: {recurso.capacidade}</small>
            </div>
            {recurso.ativo ? <Badge bg="success">Ativo</Badge> : <Badge bg="secondary">Inativo</Badge>}
          </ListGroup.Item>
        ))}
      </ListGroup>
      {recursos.carregando ? <Carregando /> : <CarregarMais lista={recursos} />}
    </>
  )
}
