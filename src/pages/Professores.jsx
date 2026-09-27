import { useEffect, useState } from 'react'
import { Alert, Card, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { api } from '../api/client'
import { Carregando } from '../components/Carregando'
import { Erro } from '../components/Erro'
import { Foto } from '../components/Foto'

export function Professores() {
  const [recursos, setRecursos] = useState(null)
  const [erro, setErro] = useState(null)
  const [tentativa, setTentativa] = useState(0)

  useEffect(() => {
    let ignore = false
    api('/recursos/')
      .then(dados => {
        if (!ignore) setRecursos(dados.results)
      })
      .catch(erro => {
        if (!ignore) setErro(erro)
      })
    return () => {
      ignore = true
    }
  }, [tentativa])

  function tentarDeNovo() {
    setErro(null)
    setTentativa(tentativa + 1)
  }

  if (erro) return <Erro erro={erro} tentarDeNovo={tentarDeNovo} />
  if (!recursos) return <Carregando />

  return (
    <>
      <h2 className="mb-4">Professores e salas</h2>
      {recursos.length === 0 && <Alert variant="info">Nenhum professor ou sala cadastrado.</Alert>}
      <Row xs={1} md={2} lg={3} className="g-4">
        {recursos.map(recurso => (
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
    </>
  )
}
