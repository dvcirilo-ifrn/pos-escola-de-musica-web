# Escola de Música (web)

App de exemplo da disciplina de POS: cliente web em React para a API de agendamentos, seguindo a especificação da Escola de Música. Os endpoints estão na documentação da API (Swagger).

Feito a partir do *template* React do Vite, com [React Bootstrap](https://react-bootstrap.netlify.app/), [Bootstrap Icons](https://icons.getbootstrap.com/) e [React Router](https://reactrouter.com/). O histórico de *commits* mostra o app sendo construído passo a passo.

## Rodando

- Instale as dependências:
    - `npm install`
- Rode o app:
    - `npm run dev`
- Acesse http://localhost:5173

### Endereço da API

O endereço da API vem da variável `VITE_API_URL`, definida no arquivo `.env` (padrão: `http://localhost:8000/api`). Para usar outro endereço sem alterar o `.env`, crie um `.env.local` (ignorado pelo git):

```
VITE_API_URL=https://endereco-da-api/api
```

Na hospedagem (Netlify, Vercel, Cloudflare Pages...), defina a variável `VITE_API_URL` nas configurações do projeto. Ela é lida no momento do `npm run build`, então é preciso gerar o *build* de novo ao trocar o endereço.

## Organização do código

```
src/
├── api/client.js      # fetch com o token, renovação automática e mensagens de erro
├── AuthContext.js     # contexto com o usuário logado e as permissões (useAuth)
├── AuthProvider.jsx   # login, logout e carregamento do usuário
├── hooks/useApi.js    # useApi (buscar dados) e usePaginado (listas com "Carregar mais")
├── formatos.js        # datas, horas e preços em pt-BR
├── custom.scss        # cores do Bootstrap personalizadas
├── components/        # peças reutilizadas: Menu, Layout, Erro, Carregando, AulaItem...
└── pages/             # uma tela por arquivo
    ├── agendar/       # fluxo de agendamento (C2 a C6)
    └── admin/         # telas do administrador (A1 a A10)
```

As telas seguem os identificadores da especificação (E1, C1, A1...). O menu e os botões aparecem conforme as `permissoes` do usuário (`pode('api.confirmar_agendamento')`), nunca pelo nome do grupo.

## Personalizando as cores

As cores do Bootstrap são definidas em `src/custom.scss`, antes de importar o Bootstrap:

```scss
$primary: #0a2f5f;
$warning: #f89800;

@import 'bootstrap/scss/bootstrap';
```

Veja as outras variáveis em [Bootstrap: Sass](https://getbootstrap.com/docs/5.3/customize/sass/).
