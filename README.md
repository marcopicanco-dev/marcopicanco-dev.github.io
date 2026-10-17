# Marco Aurélio

Conteúdo sobre programação, matemática, ciência e tecnologia. O objetivo é compartilhar conhecimento, experiências e insights sobre esses temas. Espero que você encontre algo interessante para ler e aprender aqui!

## Desenvolvimento

Use Node.js 22.22.2 ou uma versão compatível indicada em `package.json`, com npm 12.2 ou superior. O CI utiliza as versões de `.nvmrc` e `packageManager`.

```sh
nvm install
nvm use
npm install --global npm@12.2.0
npm ci
npm run dev
```

Para reproduzir as verificações do CI:

```sh
npm run lint
npm run security
npm run build
```

Os detalhes da atualização que corrigiu a auditoria de dependências estão em
[docs/security/dependency-upgrade.md](docs/security/dependency-upgrade.md).

## License

MIT
