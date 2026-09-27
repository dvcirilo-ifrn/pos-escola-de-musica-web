import { Alert, Button, Card, Col, Row } from 'react-bootstrap'
import { Link, useSearchParams } from 'react-router-dom'
import { Carregando } from '../../components/Carregando'
import { CarregarMais } from '../../components/CarregarMais'
import { Erro } from '../../components/Erro'
import { Foto } from '../../components/Foto'
import { usePaginado } from '../../hooks/useApi'

export function EscolherProfessor() {
  const [params] = useSearchParams()
  const servico = params.get('servico')
  const recursos = usePaginado(`/recursos/?servicos=${servico}`)

  if (recursos.erro) return <Erro erro={recursos.erro} tentarDeNovo={recursos.recarregar} />
  if (recursos.carregando && recursos.itens.length === 0) return <Carregando />

  return (
    <>
      <small className="text-secondary">Passo 2 de 4</small>
      <h2 className="mb-4">Com quem ou onde?</h2>
      {recursos.itens.length === 0 ? (
        <Alert variant="info">Nenhum professor ou sala realiza este serviço.</Alert>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          <Col>
            <Card className="h-100">
              <Card.Body className="d-flex gap-3">
                <i className="bi bi-people-fill text-secondary display-5"></i>
                <div>
                  <Card.Title>Qualquer um</Card.Title>
                  <Card.Text className="text-secondary">Mostra os horários livres de todos.</Card.Text>
                  <Button as={Link} to={`/agendar/horario?servico=${servico}`}>Escolher</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
          {recursos.itens.map(recurso => (
            <Col key={recurso.id}>
              <Card className="h-100">
                <Card.Body className="d-flex gap-3">
                  <Foto src={recurso.foto} tamanho={64} />
                  <div>
                    <Card.Title>{recurso.nome}</Card.Title>
                    <Card.Text className="text-secondary">{recurso.bio}</Card.Text>
                    <Button as={Link} to={`/agendar/horario?servico=${servico}&recurso=${recurso.id}`}>
                      Escolher
                    </Button>
                    <Button as={Link} to={`/professores/${recurso.id}`} variant="link">
                      Ver avaliações
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
      {recursos.carregando ? <Carregando /> : <CarregarMais lista={recursos} />}
    </>
  )
}
