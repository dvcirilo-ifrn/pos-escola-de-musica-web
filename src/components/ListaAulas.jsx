import { ListGroup } from 'react-bootstrap'
import { usePaginado } from '../hooks/useApi'
import { AulaItem } from './AulaItem'
import { Carregando } from './Carregando'
import { CarregarMais } from './CarregarMais'
import { Erro } from './Erro'

export function ListaAulas({ caminho, vazio = 'Nenhuma aula aqui.', mostrarAluno = false }) {
  const aulas = usePaginado(caminho)

  if (aulas.erro) return <Erro erro={aulas.erro} tentarDeNovo={aulas.recarregar} />

  return (
    <>
      {!aulas.carregando && aulas.itens.length === 0 && <p className="text-secondary">{vazio}</p>}
      <ListGroup>
        {aulas.itens.map(aula => (
          <AulaItem key={aula.id} aula={aula} mostrarAluno={mostrarAluno} />
        ))}
      </ListGroup>
      {aulas.carregando ? <Carregando /> : <CarregarMais lista={aulas} />}
    </>
  )
}
