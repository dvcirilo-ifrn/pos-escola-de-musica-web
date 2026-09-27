# Escola de Música (web)

App de exemplo da disciplina de POS: cliente web em React para a API de agendamentos, seguindo a especificação da Escola de Música. Os endpoints estão na documentação da API (Swagger).

Feito a partir do *template* React do Vite, com [React Bootstrap](https://react-bootstrap.netlify.app/), [Bootstrap Icons](https://icons.getbootstrap.com/) e [React Router](https://reactrouter.com/). O histórico de *commits* mostra o app sendo construído passo a passo.

O app e a API são independentes: o app é só um site estático que conversa com a API pela internet.

## Rodando

- Instale as dependências:
    - `npm install`
- Copie o arquivo de exemplo de variáveis de ambiente:
    - `cp .env.example .env`
- Preencha o `.env` com o endereço da API e o slug da organização:
    - `VITE_API_URL`: endereço da API, terminando em `/api`;
    - `VITE_ORGANIZACAO`: slug da organização usada no cadastro e no login.
- Rode o app:
    - `npm run dev`
- Acesse http://localhost:5173

As variáveis são lidas pelo Vite (`import.meta.env`) em `src/api/client.js`. O `.env` não vai para o git.

## Publicando na Vercel

- Importe o repositório na [Vercel](https://vercel.com/): ela reconhece o projeto Vite sozinha (`npm run build`, pasta `dist`);
- Em **Environment Variables**, defina `VITE_API_URL` e `VITE_ORGANIZACAO`;
- Faça o *deploy*.

As variáveis são lidas no momento do *build*: ao trocar alguma, faça o *deploy* de novo.

O `vercel.json` faz todas as rotas abrirem o `index.html`. Sem ele, recarregar a página em um endereço como `/aulas/9` daria erro 404, porque essas rotas só existem dentro do React (React Router).

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
