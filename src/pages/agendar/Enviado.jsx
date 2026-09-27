import { Alert, Button, Card, ListGroup } from 'react-bootstrap'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { AulaItem } from '../../components/AulaItem'

export function Enviado() {
  const location = useLocation()
  const agendamento = location.state?.agendamento

  if (!agendamento) {
    return <Navigate to="/aulas" />
  }

  return (
    <Card className="text-center">
      <Card.Body>
        <i className="bi bi-check-circle-fill text-success display-3"></i>
        <h2 className="my-3">Agendamento enviado!</h2>
        <ListGroup className="mb-3 text-start">
          <AulaItem aula={agendamento} />
        </ListGroup>
        <Alert variant="info">O administrador da escola vai confirmar a sua aula.</Alert>
        <div className="d-flex justify-content-center gap-2">
          <Button as={Link} to={`/aulas/${agendamento.id}`}>Ver aula</Button>
          <Button as={Link} to="/inicio" variant="outline-primary">Início</Button>
        </div>
      </Card.Body>
    </Card>
  )
}
