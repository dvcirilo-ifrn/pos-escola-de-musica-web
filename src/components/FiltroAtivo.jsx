import { Form } from 'react-bootstrap'

export function FiltroAtivo({ valor, onChange }) {
  return (
    <Form.Select value={valor} onChange={e => onChange(e.target.value)} className="w-auto">
      <option value="">Todos</option>
      <option value="true">Ativos</option>
      <option value="false">Inativos</option>
    </Form.Select>
  )
}
