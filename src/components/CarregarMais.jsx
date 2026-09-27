import { Button } from 'react-bootstrap'

export function CarregarMais({ lista }) {
  if (!lista.temMais) return null
  return (
    <div className="text-center my-3">
      <Button variant="outline-primary" onClick={lista.carregarMais} disabled={lista.carregando}>
        Carregar mais
      </Button>
    </div>
  )
}
