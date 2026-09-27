import { Tab, Tabs } from 'react-bootstrap'
import { ListaAulas } from '../components/ListaAulas'
import { hoje, somarDias } from '../formatos'

export function MinhasAulas() {
  return (
    <>
      <h2 className="mb-4">Minhas aulas</h2>
      <Tabs defaultActiveKey="proximos" className="mb-3" mountOnEnter>
        <Tab eventKey="proximos" title="Próximos">
          <ListaAulas caminho={`/agendamentos/?data_inicio=${hoje()}`} />
        </Tab>
        <Tab eventKey="historico" title="Histórico">
          <ListaAulas caminho={`/agendamentos/?data_fim=${somarDias(hoje(), -1)}&ordering=-inicio`} />
        </Tab>
      </Tabs>
    </>
  )
}
