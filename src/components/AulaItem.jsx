import { ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { formatarData, formatarHora } from '../formatos'
import { StatusAula } from './StatusAula'

export function AulaItem({ aula, mostrarAluno = false }) {
  return (
    <ListGroup.Item action as={Link} to={`/aulas/${aula.id}`} className="d-flex align-items-center gap-3">
      <div className="text-center">
        <div className="fw-bold">{formatarHora(aula.inicio)}</div>
        <small className="text-secondary">{formatarData(aula.inicio)}</small>
      </div>
      <div className="me-auto">
        <div className="fw-semibold">{aula.servico_nome}</div>
        <small className="text-secondary">
          {aula.recurso_nome}
          {mostrarAluno && ` · ${aula.cliente_nome}`}
        </small>
        {mostrarAluno && aula.observacoes && (
          <div><small className="fst-italic">{aula.observacoes}</small></div>
        )}
      </div>
      <StatusAula status={aula.status} />
    </ListGroup.Item>
  )
}
