import { Button, Form, InputGroup } from 'react-bootstrap'
import { somarDias } from '../formatos'

export function SeletorData({ data, onChange, min }) {
  return (
    <InputGroup className="mb-4">
      <Button variant="outline-secondary" onClick={() => onChange(somarDias(data, -1))} disabled={min && data <= min}>
        <i className="bi bi-chevron-left"></i>
      </Button>
      <Form.Control type="date" value={data} min={min} onChange={e => onChange(e.target.value)} />
      <Button variant="outline-secondary" onClick={() => onChange(somarDias(data, 1))}>
        <i className="bi bi-chevron-right"></i>
      </Button>
    </InputGroup>
  )
}
