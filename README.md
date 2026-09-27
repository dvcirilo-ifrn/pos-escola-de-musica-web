# Escola de Música (web)

App de exemplo da disciplina de POS: cliente web em React para a API de agendamentos, seguindo a especificação da Escola de Música. Os endpoints estão na documentação da API (Swagger).

Feito a partir do *template* React do Vite, com [React Bootstrap](https://react-bootstrap.netlify.app/), [Bootstrap Icons](https://icons.getbootstrap.com/) e [React Router](https://reactrouter.com/). O histórico de *commits* mostra o app sendo construído passo a passo.

## Rodando

- Instale as dependências:
    - `npm install`
- Rode o app:
    - `npm run dev`
- Acesse http://localhost:5173

O endereço da API fica em `src/api/client.js`.

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
