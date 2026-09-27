export function formatarData(iso) {
  return new Date(iso).toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric' })
}

export function formatarHora(iso) {
  return new Date(iso).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
}

export function formatarPreco(preco) {
  return Number(preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

// data no formato AAAA-MM-DD usado pela API e pelo <input type="date">
export function dataISO(data) {
  const ano = data.getFullYear()
  const mes = String(data.getMonth() + 1).padStart(2, '0')
  const dia = String(data.getDate()).padStart(2, '0')
  return `${ano}-${mes}-${dia}`
}

export function hoje() {
  return dataISO(new Date())
}

export function somarDias(data, dias) {
  const nova = new Date(`${data}T00:00`)
  nova.setDate(nova.getDate() + dias)
  return dataISO(nova)
}
