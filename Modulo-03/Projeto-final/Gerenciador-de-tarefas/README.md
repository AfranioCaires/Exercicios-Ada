## To-Do App

**Tema do Exercício: Aplicativo de Lista de Tarefas (To-Do List) com Programação Orientada a Objetos em JavaScript**

**Requisitos:**

1. Criar um aplicativo de lista de tarefas que permita adicionar, remover e marcar tarefas como concluídas.
2. Cada tarefa deve ter uma descrição, uma prioridade (baixa, média, alta) e um status (pendente, concluída).
3. O aplicativo deve permitir a criação de múltiplas listas de tarefas.
4. Implementar métodos para exibir a lista de tarefas, adicionar tarefas, remover tarefas e marcar tarefas como concluídas.
5. O sistema deve calcular estatísticas, como o número total de tarefas, o número de tarefas concluídas e o número de tarefas pendentes em uma lista.

**Classes:**

1. `Tarefa`: Representa uma tarefa na lista. Atributos: `descricao`, `prioridade`, `status`.
2. `ListaTarefas`: Representa uma lista de tarefas. Atributos: `nome`, `tarefas`.

- Métodos: `adicionarTarefa(tarefa)`, `removerTarefa(tarefa)`, `marcarConcluida(tarefa)`, `exibirLista()`, `calcularEstatisticas()`.

1. `AplicativoToDoList`: Representa o aplicativo de lista de tarefas. Atributos: `listasTarefas`, `listaAtual`.

- Métodos: `criarLista(nome)`, `selecionarLista(nome)`, `exibirListasDisponiveis()`.

**Exemplo de Uso:**

```javascript
// Criar instâncias de Tarefa,
const tarefa1 = new Tarefa("Estudar JavaScript", "alta", "pendente");
const tarefa2 = new Tarefa("Fazer exercícios de POO", "média", "pendente");
const tarefa3 = new Tarefa("Comprar mantimentos", "baixa", "pendente");
const tarefa4 = new Tarefa("Correr no parque", "média", "pendente");

const appToDoList = new AplicativoToDoList();
appToDoList.criarLista("Estudos");
appToDoList.selecionarLista("Estudos").adicionarTarefa(tarefa1);
appToDoList.selecionarLista("Estudos").adicionarTarefa(tarefa2);
appToDoList.criarLista("Compras");
appToDoList.selecionarLista("Compras").adicionarTarefa(tarefa3);
appToDoList.criarLista("Pessoal");
appToDoList.selecionarLista("Pessoal").adicionarTarefa(tarefa4);

// Exibir listas disponíveis
console.log(appToDoList.exibirListasDisponiveis());

// Exibir lista de tarefas atual
appToDoList.listaAtual.exibirLista();

// Marcar tarefa como concluída
appToDoList.selecionarLista("Estudos");
appToDoList.listaAtual.marcarConcluida(tarefa1);

// Exibir estatísticas da lista
console.log(appToDoList.listaAtual.calcularEstatisticas
```
