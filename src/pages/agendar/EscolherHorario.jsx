import { Alert, Button, Card, Form, InputGroup } from 'react-bootstrap'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { Carregando } from '../../components/Carregando'
import { Erro } from '../../components/Erro'
import { Foto } from '../../components/Foto'
import { formatarHora, hoje, somarDias } from '../../formatos'
import { useApi } from '../../hooks/useApi'

export function EscolherHorario() {
  const navigate = useNavigate()
  const location = useLocation()
  const [params, setParams] = useSearchParams()
  const servico = params.get('servico')
  const recurso = params.get('recurso')
  const data = params.get('data') ?? hoje()

  let caminho = `/horarios-livres/?servico=${servico}&data=${data}`
  if (recurso) {
    caminho += `&recurso=${recurso}`
  }
  const { dados, erro, carregando, recarregar } = useApi(caminho)

  function mudarData(novaData) {
    const novos = new URLSearchParams(params)
    novos.set('data', novaData)
    setParams(novos, { replace: true })
  }

  function escolher(recursoId, inicio) {
    const escolha = new URLSearchParams({ servico, recurso: recursoId, inicio })
    navigate(`/agendar/confirmar?${escolha}`, {
      state: { voltar: location.pathname + location.search },
    })
  }

  const comHorarios = dados ? dados.filter(item => item.horarios.length > 0) : []

  return (
    <>
      <small className="text-secondary">Passo 3 de 4</small>
      <h2 className="mb-4">Quando?</h2>

      {location.state?.erro && <Alert variant="warning">{location.state.erro}</Alert>}

      <InputGroup className="mb-4">
        <Button variant="outline-secondary" onClick={() => mudarData(somarDias(data, -1))} disabled={data <= hoje()}>
          <i className="bi bi-chevron-left"></i>
        </Button>
        <Form.Control type="date" value={data} min={hoje()} onChange={e => mudarData(e.target.value)} />
        <Button variant="outline-secondary" onClick={() => mudarData(somarDias(data, 1))}>
          <i className="bi bi-chevron-right"></i>
        </Button>
      </InputGroup>

      {erro && <Erro erro={erro} tentarDeNovo={recarregar} />}
      {carregando && <Carregando />}

      {dados && comHorarios.length === 0 && (
        <Alert variant="info" className="d-flex align-items-center">
          Sem horários livres neste dia.
          <Button variant="outline-primary" size="sm" className="ms-auto" onClick={() => mudarData(somarDias(data, 1))}>
            Ver o dia seguinte
          </Button>
        </Alert>
      )}

      {comHorarios.map(item => (
        <Card key={item.recurso.id} className="mb-3">
          <Card.Header className="d-flex align-items-center gap-2">
            <Foto src={item.recurso.foto} tamanho={32} />
            {item.recurso.nome}
          </Card.Header>
          <Card.Body className="d-flex flex-wrap gap-2">
            {item.horarios.map(horario => (
              <Button key={horario} variant="outline-primary" onClick={() => escolher(item.recurso.id, horario)}>
                {formatarHora(horario)}
              </Button>
            ))}
          </Card.Body>
        </Card>
      ))}
    </>
  )
}
