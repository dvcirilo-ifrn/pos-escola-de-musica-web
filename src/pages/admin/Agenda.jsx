import { Alert, Col, Form, ListGroup, Row } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom'
import { buscarTodas } from '../../api/client'
import { AulaItem } from '../../components/AulaItem'
import { Carregando } from '../../components/Carregando'
import { Erro } from '../../components/Erro'
import { SeletorData } from '../../components/SeletorData'
import { hoje } from '../../formatos'
import { useApi } from '../../hooks/useApi'

export function Agenda() {
  const [params, setParams] = useSearchParams()
  const data = params.get('data') ?? hoje()
  const recurso = params.get('recurso') ?? ''

  let caminho = `/agendamentos/?data_inicio=${data}&data_fim=${data}`
  if (recurso) {
    caminho += `&recurso=${recurso}`
  }
  const aulas = useApi(caminho, buscarTodas)
  const recursos = useApi('/recursos/')

  function mudar(nome, valor) {
    const novos = new URLSearchParams(params)
    novos.set(nome, valor)
    setParams(novos, { replace: true })
  }

  return (
    <>
      <h2 className="mb-4">Agenda do dia</h2>
      <Row>
        <Col md={6}>
          <SeletorData data={data} onChange={valor => mudar('data', valor)} />
        </Col>
        <Col md={6}>
          <Form.Select className="mb-4" value={recurso} onChange={e => mudar('recurso', e.target.value)}>
            <option value="">Todos os professores e salas</option>
            {recursos.dados?.results.map(r => (
              <option key={r.id} value={r.id}>{r.nome}</option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      {aulas.erro && <Erro erro={aulas.erro} tentarDeNovo={aulas.recarregar} />}
      {aulas.carregando && <Carregando />}
      {aulas.dados?.length === 0 && <Alert variant="info">Nenhuma aula neste dia.</Alert>}
      <ListGroup>
        {aulas.dados?.map(aula => (
          <AulaItem key={aula.id} aula={aula} mostrarAluno />
        ))}
      </ListGroup>
    </>
  )
}
