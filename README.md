## video-streaming-front
Aplicação Vue 3 + TypeScript + Vite + para consumir a API: [video-streaming-back](https://github.com/BioJJ/video-streaming-back) - 

### Run Application:
#### Gerando .env:

- `VITE_BASE_URL=: 'https://localhost:3000'`

#### running:
- `yarn dev` or `npm run dev`

## or
#### running with docker compose:
- clone o repository: [video-streaming-back](https://github.com/BioJJ/video-streaming-back) 
- `docker-compose up -d`

## Acesse a aplicação pelo browser: localhost:8080

### Running tests:

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

#
## Aplicações:
- Check list de desenvolvimento: https://biojj.notion.site/Desenvolvedor-a-Full-Stack-Pleno-para-Plataforma-de-Streaming-de-V-deo-5f15378aa7284074b21a387456441c22?pvs=4
- API -> https://github.com/BioJJ/video-streaming-back

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support For `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.
