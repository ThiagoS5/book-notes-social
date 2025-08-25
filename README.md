# 📖 Book Notes Social: Uma Rede Social para Amantes de Livros

![Banner da Aplicação](https://dummyimage.com/1200x600/282a36/ffffff.png&text=Book+Notes+Social)

> Um projeto Front-End que permite aos usuários compartilhar e descobrir anotações de livros, promovendo uma comunidade de leitores engajados.

**[Acesse a demonstração ao vivo](deploy.com)**

---

## 🚀 Sobre o Projeto

**Book Notes Social** é uma plataforma web moderna construída com o objetivo de ser o principal projeto do meu portfólio. A aplicação foi desenvolvida do zero, utilizando as tecnologias mais recentes do ecossistema React, como Next.js 15 e React 19, para criar uma experiência de usuário rápida, interativa e responsiva.

A ideia central é oferecer um espaço onde leitores possam não apenas registrar suas próprias anotações e pensamentos sobre os livros que estão lendo, mas também interagir com as anotações de outros usuários, criando uma rede social focada em conhecimento e literatura.

## ✨ Principais Funcionalidades

- **📚 &nbsp; Estante de Livros Personalizada:** Adicione livros à sua estante, marcando-os como "Lendo", "Lido" ou "Quero Ler".
- **✍️ &nbsp; Criação de Anotações:** Faça anotações detalhadas sobre seus livros, incluindo trechos, pensamentos e emoções associadas.
- **🌐 &nbsp; Integração com Google Books API:** Pesquise e adicione livros facilmente através da vasta base de dados do Google Books.
- **📊 &nbsp; Dashboard de Estatísticas:** Visualize seu progresso de leitura com estatísticas e gráficos interativos.
- **👤 &nbsp; Perfis de Usuário:** Crie seu perfil, veja sua atividade e explore os perfis de outros leitores.
- **🎨 &nbsp; Tema Claro e Escuro:** Interface adaptável com suporte para temas claro e escuro.
- **📱 &nbsp; Design Responsivo:** Experiência de uso otimizada para desktops, tablets e smartphones.
- **🔍 &nbsp; Busca Avançada:** Encontre livros e anotações rapidamente com uma busca modal eficiente.

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído com um conjunto de tecnologias modernas e robustas, focadas em performance e escalabilidade.

- **Frontend:**
  - **Framework:** [Next.js](https://nextjs.org/) (v15) com App Router e Turbopack
  - **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
  - **UI Library:** [React](https://react.dev/) (v19)
  - **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
  - **Componentes:** [shadcn/ui](https://ui.shadcn.com/) (construído sobre Radix UI)
  - **Ícones:** [Lucide React](https://lucide.dev/)
- **Formulários:**
  - **Gerenciamento:** [React Hook Form](https://react-hook-form.com/)
  - **Validação:** [Zod](https://zod.dev/)
- **Qualidade de Código:**
  - **Linter:** [ESLint](https://eslint.org/)
- **Infraestrutura e Deploy:**
  - **Plataforma:** [Vercel](https://vercel.com/)

## 📂 Estrutura do Projeto

O projeto segue uma arquitetura baseada em componentes, organizada para facilitar a manutenção e a escalabilidade.

```
c:/Dev/book-notes-social/
├───public/               # Arquivos estáticos
└───src/
    ├───app/              # Rotas, layouts e páginas (Next.js App Router)
    ├───components/       # Componentes reutilizáveis (Atoms, Molecules, Organisms)
    ├───context/          # Contextos globais da aplicação
    ├───hooks/            # Hooks customizados
    ├───lib/              # Funções utilitárias, schemas e dados mockados
    ├───services/         # Lógica de integração com APIs externas
    └───types/            # Definições de tipos globais
```

## 🏁 Como Executar o Projeto Localmente

Siga os passos abaixo para configurar e executar o projeto em seu ambiente de desenvolvimento.

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/ThiagoS5/book-notes-social.git
    cd book-notes-social
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    ```

3.  **Execute o servidor de desenvolvimento:**

    ```bash
    npm run dev
    ```

4.  **Abra no navegador:**
    Acesse [http://localhost:3000](http://localhost:3000) para ver a aplicação em funcionamento.

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

<p align="center">
  Feito com ❤️ por <strong>Thiago Soares</strong>
</p>
<p align="center">
  <a href="https://www.linkedin.com/in/thiago-marqueti-soares/">LinkedIn</a> • 
  <a href="https://github.com/ThiagoS5">GitHub</a>
</p>
