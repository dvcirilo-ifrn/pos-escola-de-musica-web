import { Alert, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { mensagemDeErro } from '../api/client'

export function Erro({ erro, tentarDeNovo }) {
  const navigate = useNavigate()

  return (
    <Alert variant="danger" className="d-flex align-items-center">
      <i className="bi bi-exclamation-triangle me-2"></i>
      {mensagemDeErro(erro)}
      {erro.status === 404 ? (
        <Button variant="outline-danger" size="sm" className="ms-auto" onClick={() => navigate(-1)}>
          Voltar
        </Button>
      ) : (
        <Button variant="outline-danger" size="sm" className="ms-auto" onClick={tentarDeNovo}>
          Tentar de novo
        </Button>
      )}
    </Alert>
  )
}
