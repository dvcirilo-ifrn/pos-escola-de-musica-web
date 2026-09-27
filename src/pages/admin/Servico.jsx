import { useState } from 'react'
import { Alert, Button, Card, Col, Form, Image, Row } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { api, buscarTodas, mensagemDeErro } from '../../api/client'
import { Carregando } from '../../components/Carregando'
import { Erro } from '../../components/Erro'
import { useApi } from '../../hooks/useApi'

const NOVO = { nome: '', descricao: '', duracao_min: 50, preco: '0.00', imagem: null, recursos: [], ativo: true }

export function NovoServico() {
  const recursos = useApi('/recursos/', buscarTodas)

  if (recursos.erro) return <Erro erro={recursos.erro} tentarDeNovo={recursos.recarregar} />
  if (recursos.carregando) return <Carregando />

  return <FormServico servico={NOVO} recursos={recursos.dados} />
}

export function EditarServico() {
  const { id } = useParams()
  const servico = useApi(`/servicos/${id}/`)
  const recursos = useApi('/recursos/', buscarTodas)

  if (servico.erro) return <Erro erro={servico.erro} tentarDeNovo={servico.recarregar} />
  if (recursos.erro) return <Erro erro={recursos.erro} tentarDeNovo={recursos.recarregar} />
  if (servico.carregando || recursos.carregando) return <Carregando />

  return <FormServico servico={servico.dados} recursos={recursos.dados} />
}

function FormServico({ servico, recursos }) {
  const navigate = useNavigate()
  const [nome, setNome] = useState(servico.nome)
  const [descricao, setDescricao] = useState(servico.descricao)
  const [duracao, setDuracao] = useState(servico.duracao_min)
  const [preco, setPreco] = useState(servico.preco)
  const [escolhidos, setEscolhidos] = useState(servico.recursos)
  const [ativo, setAtivo] = useState(servico.ativo)
  const [imagem, setImagem] = useState(servico.imagem)
  const [arquivo, setArquivo] = useState(null)
  const [erro, setErro] = useState(null)
  const [erros, setErros] = useState({})

  function marcar(id, marcado) {
    if (marcado) {
      setEscolhidos([...escolhidos, id])
    } else {
      setEscolhidos(escolhidos.filter(r => r !== id))
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setErro(null)
    setErros({})
    const corpo = { nome, descricao, duracao_min: duracao, preco, recursos: escolhidos, ativo }

    try {
      const salvo = servico.id
        ? await api(`/servicos/${servico.id}/`, { method: 'PATCH', body: corpo })
        : await api('/servicos/', { method: 'POST', body: corpo })

      // a lista de recursos vai em JSON; a imagem vai depois, em multipart
      if (arquivo) {
        const formulario = new FormData()
        formulario.append('imagem', arquivo)
        await api(`/servicos/${salvo.id}/`, { method: 'PATCH', body: formulario })
      }
      navigate('/admin/servicos')
    } catch (erro) {
      setErro(mensagemDeErro(erro))
      setErros(erro.dados ?? {})
    }
  }

  async function removerImagem() {
    try {
      await api(`/servicos/${servico.id}/`, { method: 'PATCH', body: { imagem: null } })
      setImagem(null)
    } catch (erro) {
      setErro(mensagemDeErro(erro))
    }
  }

  return (
    <Card>
      <Card.Body>
        <h2 className="mb-4">{servico.id ? 'Editar serviço' : 'Novo serviço'}</h2>
        {erro && <Alert variant="danger">{erro}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="nome">
            <Form.Label>Nome</Form.Label>
            <Form.Control value={nome} onChange={e => setNome(e.target.value)} isInvalid={!!erros.nome} required />
            <Form.Control.Feedback type="invalid">{erros.nome?.join(' ')}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="descricao">
            <Form.Label>Descrição</Form.Label>
            <Form.Control as="textarea" rows={2} value={descricao} onChange={e => setDescricao(e.target.value)} isInvalid={!!erros.descricao} />
            <Form.Control.Feedback type="invalid">{erros.descricao?.join(' ')}</Form.Control.Feedback>
          </Form.Group>
          <Row>
            <Form.Group as={Col} className="mb-3" controlId="duracao">
              <Form.Label>Duração (min)</Form.Label>
              <Form.Control type="number" value={duracao} onChange={e => setDuracao(e.target.value)} isInvalid={!!erros.duracao_min} />
              <Form.Control.Feedback type="invalid">{erros.duracao_min?.join(' ')}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} className="mb-3" controlId="preco">
              <Form.Label>Preço (R$)</Form.Label>
              <Form.Control type="number" step="0.01" value={preco} onChange={e => setPreco(e.target.value)} isInvalid={!!erros.preco} />
              <Form.Control.Feedback type="invalid">{erros.preco?.join(' ')}</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>Professores e salas que oferecem</Form.Label>
            {recursos.map(recurso => (
              <Form.Check
                key={recurso.id}
                id={`recurso-${recurso.id}`}
                label={recurso.ativo ? recurso.nome : `${recurso.nome} (inativo)`}
                checked={escolhidos.includes(recurso.id)}
                onChange={e => marcar(recurso.id, e.target.checked)}
                isInvalid={!!erros.recursos}
              />
            ))}
            {erros.recursos && <div className="text-danger small">{erros.recursos.join(' ')}</div>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="imagem">
            <Form.Label>Imagem</Form.Label>
            {imagem && (
              <div className="d-flex align-items-center gap-3 mb-2">
                <Image src={imagem} width={160} thumbnail />
                <Button variant="outline-secondary" size="sm" onClick={removerImagem}>Remover imagem</Button>
              </div>
            )}
            <Form.Control type="file" accept="image/*" onChange={e => setArquivo(e.target.files[0])} isInvalid={!!erros.imagem} />
            <Form.Control.Feedback type="invalid">{erros.imagem?.join(' ')}</Form.Control.Feedback>
          </Form.Group>
          <Form.Check
            type="switch"
            id="ativo"
            className="mb-3"
            label="Ativo (inativos não aparecem para os alunos)"
            checked={ativo}
            onChange={e => setAtivo(e.target.checked)}
          />
          <div className="d-flex gap-2">
            <Button variant="outline-secondary" onClick={() => navigate('/admin/servicos')}>Voltar</Button>
            <Button type="submit">Salvar</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  )
}
