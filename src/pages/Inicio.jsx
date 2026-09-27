import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { api } from '../api/client'
import { useAuth } from '../AuthContext'
import { AulaItem } from '../components/AulaItem'
import { Carregando } from '../components/Carregando'
import { Erro } from '../components/Erro'
import { hoje } from '../formatos'
import { useApi } from '../hooks/useApi'

function ehProxima(aula) {
  return ['solicitado', 'confirmado'].includes(aula.status) && new Date(aula.fim) > new Date()
}

// percorre as páginas até achar a primeira aula que ainda não passou
async function buscarProximaAula(caminho) {
  let proxima = caminho
  while (proxima) {
    const dados = await api(proxima)
    const aula = dados.results.find(ehProxima)
    if (aula) return aula
    proxima = dados.next
  }
  return null
}

export function Inicio() {
  const { usuario } = useAuth()
  const organizacao = useApi('/organizacao/')
  const aula = useApi(`/agendamentos/?data_inicio=${hoje()}`, buscarProximaAula)

  if (organizacao.erro) return <Erro erro={organizacao.erro} tentarDeNovo={organizacao.recarregar} />
  if (aula.erro) return <Erro erro={aula.erro} tentarDeNovo={aula.recarregar} />
  if (organizacao.carregando || aula.carregando) return <Carregando />

  const { nome, descricao, logo } = organizacao.dados

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
        {aula.dados ? (
          <ListGroup className="mb-3">
            <AulaItem aula={aula.dados} />
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
