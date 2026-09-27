import { Alert, Card, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Carregando } from '../components/Carregando'
import { CarregarMais } from '../components/CarregarMais'
import { Erro } from '../components/Erro'
import { Foto } from '../components/Foto'
import { usePaginado } from '../hooks/useApi'

export function Professores() {
  const recursos = usePaginado('/recursos/')

  if (recursos.erro) return <Erro erro={recursos.erro} tentarDeNovo={recursos.recarregar} />

  return (
    <>
      <h2 className="mb-4">Professores e salas</h2>
      {!recursos.carregando && recursos.itens.length === 0 && <Alert variant="info">Nenhum professor ou sala cadastrado.</Alert>}
      <Row xs={1} md={2} lg={3} className="g-4">
        {recursos.itens.map(recurso => (
          <Col key={recurso.id}>
            <Card as={Link} to={`/professores/${recurso.id}`} className="h-100 text-decoration-none">
              <Card.Body className="d-flex gap-3">
                <Foto src={recurso.foto} tamanho={64} />
                <div>
                  <Card.Title>{recurso.nome}</Card.Title>
                  <Card.Text className="text-secondary">{recurso.bio}</Card.Text>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {recursos.carregando ? <Carregando /> : <CarregarMais lista={recursos} />}
    </>
  )
}
