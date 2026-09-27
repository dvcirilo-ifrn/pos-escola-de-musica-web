import { Badge } from 'react-bootstrap'

const STATUS = {
  solicitado: { cor: 'warning', texto: 'Solicitada' },
  confirmado: { cor: 'primary', texto: 'Confirmada' },
  concluido: { cor: 'success', texto: 'Concluída' },
  cancelado: { cor: 'secondary', texto: 'Cancelada' },
}

export function StatusAula({ status }) {
  const { cor, texto } = STATUS[status]
  return <Badge bg={cor} text={cor === 'warning' ? 'dark' : undefined}>{texto}</Badge>
}
