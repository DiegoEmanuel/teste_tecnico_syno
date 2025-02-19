# Projeto Next.js frontend
 - [Backend SYNO](https://github.com/DiegoEmanuel/teste_tecnico_syno_api).
###### Se for executar local, rode primeiro o backend.

### Aplicação online - https://testetecnicosyno.vercel.app/

Este projeto foi criado usando [Next.js](https://nextjs.org), inicializado com [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Índice

1. [Instalação](#instalacao)
2. [Executando em Desenvolvimento](#executando-em-desenvolvimento)
3. [Estrutura de Pastas](#estrutura-de-pastas)
4. [Autenticação](#autenticacao)
5. [Gerenciamento de Produtos](#gerenciamento-de-produtos)
---

## ⚙️ Instalação e Execução



1. Clone o repositório:

```bash

git clone [https://github.com/DiegoEmanuel/teste_tecnico_syno]

cd [teste_tecnico_syno]

```



2. Instale as dependências:

```bash

npm install

# ou

yarn

```


---

## 2. Executando em Desenvolvimento

Após instalar as dependências, iniciou o servidor de desenvolvimento usando um dos comandos abaixo:

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

Abra [http://localhost:3000](http://localhost:3000) em seu navegador para visualizar a aplicação. As alterações realizadas nos arquivos serão refletidas automaticamente.

---

## 3Estrutura de Pastas

Abaixo está uma visão geral dos diretórios e arquivos mais importantes do projeto:

```


├── app/
│   ├── components/     # Componentes reutilizáveis
│   │   ├── auth/      # Componentes de autenticação
│   │   ├── products/  # Componentes relacionados a produtos
│   │   └── ui/        # Componentes de interface
│   ├── product/       # Páginas de produtos
│   ├── register/      # Página de registro
│   ├── page.tsx       # Página inicial
│   └── layout.tsx     # Layout principal
├── public/            # Arquivos estáticos
├── styles/            # Estilos globais
└── ...
```

## 4 Autenticação



A aplicação utiliza autenticação baseada em JWT (JSON Web Token):

- Registro de novos usuários

- Login com email e senha

- Tokens armazenados em cookies seguros

- Rotas protegidas para usuários autenticados


## 5Gerenciamento de Produtos



Funcionalidades disponíveis para produtos:

- Listagem com paginação

- Criação de novos produtos

- Edição de produtos existentes

- Visualização detalhada

- Exclusão de produtos


