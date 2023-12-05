// Sistema de login

class Usuario {
  constructor(nome, usuario, senha) {
    if (!nome || !usuario || !senha) throw new Error("Dados incompletos");
    this.nome = nome;
    this.senha = senha;
    this.usuario = usuario;
    this.logado = false;
  }
}

class SistemaDeLogin {
  #usuarios = [];

  cadastrarUsuario(usuario) {
    if (!(usuario instanceof Usuario))
      throw new Error("Não é um usuário válido");

    if (this.#usuarios.find((user) => user.usuario === usuario.usuario))
      throw new Error("Usuário já cadastrado");

    this.#usuarios.push(usuario);
    console.log("Usuário cadastrado com sucesso");
  }

  realizarLogin(usuario, senha) {
    if (!usuario || !senha) throw new Error("Dados incompletos");

    const usuarioCadastrado = this.#usuarios.find(
      (user) => user.usuario === usuario && user.senha === senha
    );
    if (!usuarioCadastrado) throw new Error("Usuário ou senha incorretos");

    usuarioCadastrado.logado = true;
    console.log("Login realizado com sucesso");
    return usuarioCadastrado;
  }

  mensagemDeBoasVindas(usuario) {
    if (!usuario || !usuario.logado)
      throw new Error("Realize o login primeiro");

    if (!(usuario instanceof Usuario))
      throw new Error("Não é um usuário válido");

    console.log(`Olá ${usuario.nome}, seja bem vindo(a)!`);
  }
}

const sistemaDeLogin = new SistemaDeLogin();
const usuario = new Usuario("João", "joao", "123456");
// const usuario = new Usuario("João", "joao", "123456"); // Usuário já cadastrado

const usuario2 = new Usuario("Maria", "maria", "123456");

console.log(sistemaDeLogin.cadastrarUsuario(usuario));
console.log(sistemaDeLogin.cadastrarUsuario(usuario2));

console.log(
  sistemaDeLogin.mensagemDeBoasVindas(
    sistemaDeLogin.realizarLogin("maria", "123456")
  )
);
sistemaDeLogin.realizarLogin("joao", "123456");

console.log(sistemaDeLogin.mensagemDeBoasVindas(usuario));
