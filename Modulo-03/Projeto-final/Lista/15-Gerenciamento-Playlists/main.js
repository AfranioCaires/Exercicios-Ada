class Musica {
  constructor(titulo, artista, duracao) {
    if (!titulo || !artista || !duracao)
      throw new Error("Todos os campos devem ser preenchidos.");

    this.titulo = titulo;
    this.artista = artista;
    this.duracao = duracao;
  }
}

class Playlist {
  constructor(nome) {
    if (!nome) throw new Error("O nome da playlist deve ser fornecido.");

    this.nome = nome;
    this.musicas = [];
  }

  adicionarMusica(musica) {
    if (!(musica instanceof Musica))
      throw new Error("A música fornecida é inválida.");
    if (this.musicas.includes(musica))
      throw new Error("A música já está na playlist.");
    this.musicas.push(musica);
  }

  reproduzir() {
    if (this.musicas.length === 0) console.log("A playlist está vazia.");
    else {
      console.log(`Reproduzindo a playlist "${this.nome}":`);
      this.musicas.forEach((musica, index) => {
        console.log(
          `${index + 1}. ${musica.titulo} - ${musica.artista} (${
            musica.duracao
          })`
        );
      });
    }
  }
}

class Usuario {
  constructor(nome) {
    if (!nome) throw new Error("O nome do usuário deve ser fornecido.");

    this.nome = nome;
    this.bibliotecaMusical = new BibliotecaMusical();
    this.playlists = [];
  }

  criarPlaylist(nome) {
    const playlist = new Playlist(nome);
    this.playlists.push(playlist);
    return playlist;
  }
}

class BibliotecaMusical {
  constructor() {
    this.musicas = [];
  }

  adicionarMusica(musica) {
    if (!(musica instanceof Musica))
      throw new Error("A música fornecida é inválida.");
    this.musicas.push(musica);
  }
}

// Testes
const usuario = new Usuario("João");
const biblioteca = usuario.bibliotecaMusical;

const musica1 = new Musica("Música 1", "Artista 1", "3:30");
const musica2 = new Musica("Música 2", "Artista 2", "4:15");
const musica3 = new Musica("Música 3", "Artista 3", "2:50");

biblioteca.adicionarMusica(musica1);
biblioteca.adicionarMusica(musica2);
biblioteca.adicionarMusica(musica3);

const playlist1 = usuario.criarPlaylist("Playlist 1");
playlist1.adicionarMusica(musica1);
playlist1.adicionarMusica(musica2);

const playlist2 = usuario.criarPlaylist("Playlist 2");
playlist2.adicionarMusica(musica3);

playlist1.reproduzir();
playlist2.reproduzir();
