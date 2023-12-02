//  exercício 1

class Autor {
  constructor(nome, nacionalidade) {
    if (!nome || !nacionalidade) throw new Error("Dados incompletos");
    this.nome = nome;
    this.nacionalidade = nacionalidade;
  }
  detalhesAutor() {
    console.log(
      `O autor é ${this.nome} e sua nacionalidade é ${this.nacionalidade}`
    );
  }
}

class Livro extends Autor {
  constructor(nome, nacionalidade, titulo, ano) {
    if (!titulo || !ano) throw new Error("Dados incompletos");
    super(nome, nacionalidade);
    this.titulo = titulo;
    this.ano = ano;
  }
  detalhesDoLivro() {
    console.log(
      `O livro ${this.titulo} foi escrito por ${this.nome} em ${this.ano}`
    );
  }
}

class Biblioteca {
  constructor() {
    this.livros = [];
  }

  adicionarLivro(livro) {
    if (!(livro instanceof Livro)) throw new Error("Não é um livro");

    if (this.livros.includes(livro))
      throw new Error("Livro já cadastrado na biblioteca");

    this.livros.push(livro);
  }

  listaDeLivros() {
    console.log("Lista de Livros");
    this.livros.forEach((livro) => {
      console.log(`${livro.nome} - ${livro.titulo}`);
    });
  }

  buscarLivro(nome) {
    const livro = this.livros.find((livro) => livro.nome === nome);
    if (!livro) throw new Error("Livro não encontrado");
    console.log(livro);
  }

  buscarLivroPorAutor(nome) {
    const livrosAutor = this.livros.filter((livro) => livro.nome === nome);
    if (!livrosAutor) throw new Error("Autor não encontrado");
  }
}

let biblioteca = new Biblioteca();
biblioteca.adicionarLivro(
  new Livro("J.K. Rowling", "Inglaterra", "Harry Potter", 1997)
);
biblioteca.adicionarLivro(
  new Livro("J.R.R. Tolkien", "Inglaterra", "O Senhor dos Anéis", 1954)
);
biblioteca.adicionarLivro(
  new Livro("J.R.R. Tolkien", "Inglaterra", "O Silmarillion", 1977)
);

biblioteca.listaDeLivros();
biblioteca.buscarLivroPorAutor("J.R.R. Tolkien");

// erros
// const autor = new Autor("sem dados");
// const livro = new Livro("sem dados");
// biblioteca.adicionarLivro("Dados incompletos");
// biblioteca.buscarLivroPorAutor("Autor não encontrado");
// biblioteca.buscarLivro("Livro não encontrado");
