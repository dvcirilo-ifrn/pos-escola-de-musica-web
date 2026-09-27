import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export function Entrada() {
  return (
    <div className="text-center">
      <i className="bi bi-music-note-beamed display-1 text-primary"></i>
      <h1 className="mt-3">Escola de Música</h1>
      <p className="text-secondary">
        Aulas de violão, piano e canto, musicalização infantil e estúdio para ensaio de bandas.
      </p>
      <div className="d-grid gap-2 mt-4">
        <Button as={Link} to="/login">Entrar</Button>
        <Button as={Link} to="/cadastro" variant="outline-primary">Criar conta</Button>
      </div>
    </div>
  )
}
