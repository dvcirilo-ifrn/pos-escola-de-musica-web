import { Button, Modal } from 'react-bootstrap'

export function Confirmacao({ show, titulo, mensagem, textoConfirmar = 'Confirmar', variante = 'primary', onConfirmar, onFechar }) {
  return (
    <Modal show={show} onHide={onFechar} centered>
      <Modal.Header closeButton>
        <Modal.Title>{titulo}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{mensagem}</Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onFechar}>Voltar</Button>
        <Button variant={variante} onClick={onConfirmar}>{textoConfirmar}</Button>
      </Modal.Footer>
    </Modal>
  )
}
