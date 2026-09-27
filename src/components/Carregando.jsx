import { Spinner } from 'react-bootstrap'

export function Carregando() {
  return (
    <div className="text-center my-5">
      <Spinner animation="border" variant="primary" />
    </div>
  )
}
