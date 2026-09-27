import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import { AulaItem } from '../components/AulaItem'
import { Carregando } from '../components/Carregando'
import { Erro } from '../components/Erro'
import { hoje } from '../formatos'
import { useApi } from '../hooks/useApi'

export function Inicio() {
  const { usuario } = useAuth()
  const organizacao = useApi('/organizacao/')
  const aulas = useApi(`/agendamentos/?data_inicio=${hoje()}`)

  if (organizacao.erro) return <Erro erro={organizacao.erro} tentarDeNovo={organizacao.recarregar} />
  if (aulas.erro) return <Erro erro={aulas.erro} tentarDeNovo={aulas.recarregar} />
  if (organizacao.carregando || aulas.carregando) return <Carregando />

  const { nome, descricao, logo } = organizacao.dados
  const proxima = aulas.dados.results.find(
    aula => ['solicitado', 'confirmado'].includes(aula.status) && new Date(aula.fim) > new Date(),
  )

  return (
    <Row className="g-4">
      <Col md={5}>
        <Card className="text-center h-100">
          <Card.Body>
            <Image src={logo ?? '/logo.png'} alt={nome} fluid className="mb-3" />
            <Card.Text className="text-secondary">{descricao}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={7}>
        <h2>Olá, {usuario.nome}!</h2>
        <h5 className="mt-4">Sua próxima aula</h5>
        {proxima ? (
          <ListGroup className="mb-3">
            <AulaItem aula={proxima} />
          </ListGroup>
        ) : (
          <p className="text-secondary">Você não tem aulas agendadas.</p>
        )}
        <Button as={Link} to="/agendar" size="lg">
          <i className="bi bi-calendar-plus"></i> Agendar
        </Button>
      </Col>
    </Row>
  )
}
