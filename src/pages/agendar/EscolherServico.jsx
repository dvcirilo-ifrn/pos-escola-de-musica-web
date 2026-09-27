import { Alert, Card, Col, Row } from 'react-bootstrap'
import { Link, useSearchParams } from 'react-router-dom'
import { Carregando } from '../../components/Carregando'
import { Erro } from '../../components/Erro'
import { formatarPreco } from '../../formatos'
import { useApi } from '../../hooks/useApi'

export function EscolherServico() {
  const [params] = useSearchParams()
  const recurso = params.get('recurso')
  const { dados, erro, carregando, recarregar } = useApi('/servicos/')

  if (erro) return <Erro erro={erro} tentarDeNovo={recarregar} />
  if (carregando) return <Carregando />

  let servicos = dados.results
  if (recurso) {
    servicos = servicos.filter(servico => servico.recursos.includes(Number(recurso)))
  }

  function proximoPasso(servico) {
    if (recurso) {
      return `/agendar/horario?servico=${servico.id}&recurso=${recurso}`
    }
    return `/agendar/professor?servico=${servico.id}`
  }

  return (
    <>
      <small className="text-secondary">Passo 1 de 4</small>
      <h2 className="mb-4">Qual serviço?</h2>
      {servicos.length === 0 && <Alert variant="info">Nenhum serviço disponível.</Alert>}
      <Row xs={1} md={2} lg={3} className="g-4">
        {servicos.map(servico => (
          <Col key={servico.id}>
            <Card as={Link} to={proximoPasso(servico)} className="h-100 text-decoration-none">
              {servico.imagem ? (
                <Card.Img variant="top" src={servico.imagem} />
              ) : (
                <div className="text-center bg-body-tertiary py-4">
                  <i className="bi bi-music-note-list display-4 text-secondary"></i>
                </div>
              )}
              <Card.Body>
                <Card.Title>{servico.nome}</Card.Title>
                <Card.Text className="text-secondary">{servico.descricao}</Card.Text>
              </Card.Body>
              <Card.Footer className="d-flex justify-content-between">
                <span><i className="bi bi-clock"></i> {servico.duracao_min} min</span>
                <strong>{formatarPreco(servico.preco)}</strong>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  )
}
