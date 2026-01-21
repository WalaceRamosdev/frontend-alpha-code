# Astro Starter Kit: Basics

```sh
npm create astro@latest -- --template basics
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src
│   ├── assets
│   │   └── astro.svg
│   ├── components
│   │   └── Welcome.astro
│   ├── layouts
│   │   └── Layout.astro
│   └── pages
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 🗄️ Banco de Dados

O projeto utiliza **SQLite** para desenvolvimento local. O arquivo do banco está localizado na raiz como `dev.db`.

### Como acessar via DBeaver:
1. Abra o **DBeaver**.
2. Clique em **Nova Conexão** (ícone de tomada com um +).
3. Selecione **SQLite** e clique em *Próximo*.
4. No campo **Path**, clique em *Navegar* e selecione o arquivo `dev.db` na pasta raiz deste projeto.
5. Clique em **Testar Conexão** (ele pode pedir para baixar os drivers do SQLite, aceite).
6. Clique em **Finalizar**.

### Como acessar via Prisma Studio (Recomendado):
Execute o comando abaixo no terminal para abrir uma interface visual no seu navegador:
```sh
npx prisma studio
```

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
