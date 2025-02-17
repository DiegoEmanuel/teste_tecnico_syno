# Projeto Next.js

Este projeto foi criado usando [Next.js](https://nextjs.org), inicializado com [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Índice
1. [Instalação](#instalacao)
2. [Executando em Desenvolvimento](#executando-em-desenvolvimento)
3. [Configuração de Fontes](#configuracao-de-fontes)
4. [Estrutura de Pastas](#estrutura-de-pastas)
5. [Mais Informações](#mais-informacoes)
6. [Implantação (Deploy)](#implantacao-deploy)

---

## 1. Instalação

Antes de começar, certifique-se de ter o **Node.js** (versão 16 ou superior) instalado em seu ambiente.

Instale as dependências:

```bash
npm install
# ou
yarn
# ou
pnpm install
# ou
bun install
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

## 3. Configuração de Fontes

Este projeto utiliza [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) para otimizar e carregar fontes da melhor forma possível. Por padrão, é configurada a fonte [Geist](https://vercel.com/font), da Vercel.

Se quiser adicionar ou alterar fontes, consulte a documentação do [`@next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) e atualize de acordo com suas necessidades.

---

## 4. Estrutura de Pastas

Abaixo está uma visão geral dos diretórios e arquivos mais importantes do projeto:

```
.
├── app/
│   ├── page.tsx        # Página inicial que é renderizada
│   └── layout.tsx      # Layout padrão da aplicação
├── public/             # Arquivos estáticos (imagens, fontes, etc.)
├── styles/             # Estilos globais ou modulares
├── next.config.js      # Configurações do Next.js
├── package.json        # Dependências e scripts
├── README.md           # Este arquivo
└── ...
```

Use a pasta `app` para organizar páginas, rotas e componentes do seu projeto Next.js de acordo com a estrutura recomendada.

---

## 5. Mais Informações

Para aprender mais sobre Next.js, confira os seguintes recursos:

- [Documentação do Next.js](https://nextjs.org/docs) – explore recursos e APIs do Next.js.  
- [Learn Next.js](https://nextjs.org/learn) – um tutorial interativo de Next.js.

Você também pode acessar o [repositório oficial do Next.js no GitHub](https://github.com/vercel/next.js) para contribuir ou fornecer feedback.

---

## 6. Implantação (Deploy)

A maneira mais fácil de fazer deploy de uma aplicação Next.js é usando a [plataforma Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme), criada pelos mesmos desenvolvedores do Next.js.

Para mais detalhes sobre implantação, consulte a [documentação oficial de deploy do Next.js](https://nextjs.org/docs/app/building-your-application/deploying).

---

Obrigado por utilizar este projeto! Caso tenha dúvidas ou sugestões, fique à vontade para abrir uma *issue* ou contribuir diretamente.
