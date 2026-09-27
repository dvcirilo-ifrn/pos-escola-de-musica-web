import { useState } from 'react'
import { Alert, Badge, Button, Image, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Carregando } from '../../components/Carregando'
import { CarregarMais } from '../../components/CarregarMais'
import { Erro } from '../../components/Erro'
import { FiltroAtivo } from '../../components/FiltroAtivo'
import { formatarPreco } from '../../formatos'
import { usePaginado } from '../../hooks/useApi'

export function Servicos() {
  const [ativo, setAtivo] = useState('')
  const servicos = usePaginado(ativo ? `/servicos/?ativo=${ativo}` : '/servicos/')

  return (
    <>
      <div className="d-flex flex-wrap align-items-center gap-2 mb-4">
        <h2 className="me-auto mb-0">Serviços</h2>
        <FiltroAtivo valor={ativo} onChange={setAtivo} />
        <Button as={Link} to="/admin/servicos/novo">
          <i className="bi bi-plus-lg"></i> Novo serviço
        </Button>
      </div>

      {servicos.erro && <Erro erro={servicos.erro} tentarDeNovo={servicos.recarregar} />}
      {!servicos.carregando && !servicos.erro && servicos.itens.length === 0 && (
        <Alert variant="info">Cadastre o primeiro serviço.</Alert>
      )}
      <ListGroup>
        {servicos.itens.map(servico => (
          <ListGroup.Item
            key={servico.id}
            action
            as={Link}
            to={`/admin/servicos/${servico.id}`}
            className="d-flex align-items-center gap-3"
          >
            {servico.imagem ? (
              <Image src={servico.imagem} width={64} rounded />
            ) : (
              <i className="bi bi-music-note-list fs-2 text-secondary"></i>
            )}
            <div className="me-auto">
              <div className="fw-semibold">{servico.nome}</div>
              <small className="text-secondary">
                {servico.duracao_min} min · {formatarPreco(servico.preco)}
              </small>
            </div>
            {servico.ativo ? <Badge bg="success">Ativo</Badge> : <Badge bg="secondary">Inativo</Badge>}
          </ListGroup.Item>
        ))}
      </ListGroup>
      {servicos.carregando ? <Carregando /> : <CarregarMais lista={servicos} />}
    </>
  )
}
