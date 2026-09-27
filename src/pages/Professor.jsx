import { Badge, Button, Card, ListGroup } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import { Avaliacao } from '../components/Avaliacao'
import { Carregando } from '../components/Carregando'
import { CarregarMais } from '../components/CarregarMais'
import { Erro } from '../components/Erro'
import { Foto } from '../components/Foto'
import { useApi, usePaginado } from '../hooks/useApi'

export function Professor() {
  const { id } = useParams()
  const { pode } = useAuth()
  const recurso = useApi(`/recursos/${id}/`)
  const servicos = useApi('/servicos/')
  const avaliacoes = usePaginado(`/avaliacoes/?recurso=${id}`)

  if (recurso.erro) return <Erro erro={recurso.erro} tentarDeNovo={recurso.recarregar} />
  if (servicos.erro) return <Erro erro={servicos.erro} tentarDeNovo={servicos.recarregar} />
  if (recurso.carregando || servicos.carregando) return <Carregando />

  const { nome, bio, foto } = recurso.dados
  const oferecidos = servicos.dados.results.filter(s => recurso.dados.servicos.includes(s.id))

  return (
    <>
      <Card className="mb-4">
        <Card.Body className="d-flex gap-4 align-items-center">
          <Foto src={foto} tamanho={120} />
          <div>
            <h2>{nome}</h2>
            <p className="text-secondary">{bio}</p>
            <div className="d-flex flex-wrap gap-1 mb-3">
              {oferecidos.map(servico => (
                <Badge key={servico.id} bg="secondary">{servico.nome}</Badge>
              ))}
            </div>
            {pode('api.add_agendamento') && (
              <Button as={Link} to={`/agendar?recurso=${id}`}>
                <i className="bi bi-calendar-plus"></i> Agendar com este professor ou sala
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>

      <h4>Avaliações</h4>
      {avaliacoes.erro && <Erro erro={avaliacoes.erro} tentarDeNovo={avaliacoes.recarregar} />}
      {!avaliacoes.carregando && !avaliacoes.erro && avaliacoes.itens.length === 0 && (
        <p className="text-secondary">Ainda sem avaliações.</p>
      )}
      <ListGroup>
        {avaliacoes.itens.map(avaliacao => (
          <Avaliacao key={avaliacao.id} avaliacao={avaliacao} />
        ))}
      </ListGroup>
      {avaliacoes.carregando ? <Carregando /> : <CarregarMais lista={avaliacoes} />}
    </>
  )
}
