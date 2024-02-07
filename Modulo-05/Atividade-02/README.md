# We love movies

Nós Amamos Filmes é uma aplicação de catálogo de filmes construída com React. Ela permite que os usuários naveguem por uma seleção de filmes de diferentes gêneros e épocas. De cinema clássico às produções mais recentes, temos opções para todos os gostos. 

## Deploy
Para acessar uma versão live do projeto, basta acessar o deploy:
[Link do deploy na netlify]( https://jocular-mooncake-d24a37.netlify.app/ ).

## Estrutura do Projeto

O projeto está estruturado da seguinte forma:

- `src/components`: Este diretório contém todos os componentes React usados na aplicação. Cada componente tem seu próprio diretório com os arquivos JSX e CSS do componente.
- `src/assets`: Este diretório contém todos os ativos estáticos usados na aplicação, como imagens.
- `src/main.jsx`: Este é o ponto de entrada da aplicação.
- `index.html`: Este é o principal arquivo HTML que inclui a div raiz onde a aplicação React é injetada.

## Componentes

A aplicação é composta por vários componentes:

- `App`: Este é o componente raiz da aplicação. Ele compõe o layout da aplicação incluindo os componentes Header, Hero, MovieList e Footer.
- `Header`: Este componente exibe o cabeçalho da aplicação.
- `Hero`: Este componente exibe uma seção hero com um título e um conteúdo de texto.
- `MovieList`: Este componente exibe uma lista de cartões de filmes.
- `Card`: Este componente exibe um cartão de filme com detalhes sobre o filme.
- `Footer`: Este componente exibe o rodapé da aplicação.

## Executando o Projeto

Para executar o projeto, use o seguinte comando:

```sh
npm run dev
```

Para construir o projeto, use o seguinte comando:

```sh
npm run build
```

## Dependências

O projeto usa as seguintes dependências:

- `react`: Uma biblioteca JavaScript para construir interfaces de usuário.
- `react-dom`: Serve como o ponto de entrada para os renderizadores DOM e de servidor para React.
- `@vitejs/plugin-react`: Um plugin Vite que fornece suporte a fast refresh e JSX para React.
- `eslint`: Uma ferramenta para identificar e relatar padrões encontrados no código ECMAScript/JavaScript.

## Contribuindo

Contribuições são bem-vindas. Por favor, abra uma issue ou submeta um pull request no GitHub.
