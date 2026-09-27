import { ListGroup } from 'react-bootstrap'
import { formatarData } from '../formatos'
import { Estrelas } from './Estrelas'

export function Avaliacao({ avaliacao }) {
  return (
    <ListGroup.Item>
      <div className="d-flex justify-content-between">
        <Estrelas nota={avaliacao.nota} />
        <small className="text-secondary">{formatarData(avaliacao.inicio)}</small>
      </div>
      {avaliacao.comentario && <p className="my-1">{avaliacao.comentario}</p>}
      <small className="text-secondary">
        {avaliacao.cliente_nome} · {avaliacao.servico_nome} · {avaliacao.recurso_nome}
      </small>
    </ListGroup.Item>
  )
}
