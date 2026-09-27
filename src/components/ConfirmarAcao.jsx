import { Confirmacao } from './Confirmacao'

const ACOES = {
  confirmar: { titulo: 'Confirmar aula', mensagem: 'Deseja confirmar esta aula?', variante: 'success' },
  concluir: { titulo: 'Concluir aula', mensagem: 'Deseja marcar esta aula como concluída?', variante: 'success' },
  cancelar: { titulo: 'Cancelar aula', mensagem: 'Deseja mesmo cancelar esta aula?', variante: 'danger' },
}

export function ConfirmarAcao({ acao, onConfirmar, onFechar }) {
  const { titulo, mensagem, variante } = ACOES[acao] ?? ACOES.confirmar

  return (
    <Confirmacao
      show={acao !== null}
      titulo={titulo}
      mensagem={mensagem}
      textoConfirmar={titulo}
      variante={variante}
      onConfirmar={onConfirmar}
      onFechar={onFechar}
    />
  )
}
