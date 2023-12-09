class Task {
  #id = Date.now().toString();
  constructor(name, description) {
    name = name.trim();
    description = description.trim();

    if (!name || name.length < 4)
      throw new Error("O título deve ter no mínimo 4 caracteres.");
    if (!isNaN(name))
      throw new Error("O título não deve conter apenas números.");
    if (description.length < 20)
      throw new Error("A descrição deve ter no mínimo 20 caracteres.");

    this.name = name;
    this.description = description;
  }

  get id() {
    return this.#id;
  }

  editName(newName) {
    newName = newName.trim();
    if (!newName || newName.length < 4)
      throw new Error("O título deve ter no mínimo 4 caracteres.");
    if (!isNaN(newName))
      throw new Error("O título não deve conter apenas números.");

    this.name = newName;
  }

  editDescription(newDescription) {
    newDescription = newDescription.trim();
    if (newDescription.length < 20)
      throw new Error("A descrição deve ter no mínimo 20 caracteres.");

    this.description = newDescription;
  }
}

class TaskManager {
  #tasks = [];

  get tasks() {
    return this.#tasks;
  }

  addTask(task) {
    if (!task instanceof Task)
      throw new Error("A tarefa deve ser uma instância da classe Task.");
    if (this.#tasks.some((t) => t.name === task.name))
      throw new Error("Já existe uma tarefa com esse título.");
    this.#tasks.push(task);
  }

  removeTask(taskId) {
    const index = this.#tasks.findIndex((task) => task.id === taskId);
    if (index === -1) throw new Error("Não existe uma tarefa com esse ID.");
    this.#tasks.splice(index, 1);
  }

  searchTask(taskId) {
    const task = this.#tasks.find((task) => task.id === taskId);
    if (!task) throw new Error("Não existe uma tarefa com esse ID.");
    return task;
  }

  menu() {
    let option = prompt(
      "Selecione uma opção:\n1 - Adicionar tarefa\n2 - Remover tarefa\n3 - Procurar tarefa\n4 - Listar tarefas\n5 - Sair"
    );
    if (option === null) return option;
    if (!option || isNaN(option) || option < 1 || option > 5)
      throw new Error("Opção inválida.");
    return option;
  }
}

const taskManager = new TaskManager();

let isRunning = true;
while (isRunning) {
  try {
    const option = taskManager.menu();

    switch (option) {
      case "1":
        taskManager.addTask(
          new Task(
            prompt("Digite o nome da tarefa"),
            prompt("Digite a descrição da tarefa")
          )
        );
        break;

      case "2":
        taskManager.removeTask(
          prompt("Digite o ID da tarefa que deseja remover:")
        );
        break;

      case "3":
        taskManager.searchTask(
          prompt("Digite o ID da tarefa que deseja buscar:")
        );
        alert(
          `Tarefa encontrada:\nNome: ${searchedTask.name}\nDescrição: ${searchedTask.description}`
        );
        break;

      case "4":
        alert(
          `Lista de tarefas:\n${taskManager.tasks
            .map(
              (task) =>
                `ID: ${task.id}\nNome: ${task.name}\nDescrição: ${task.description}\n`
            )
            .join("\n")}`
        );
        break;

      case "5":
        isRunning = false;
        break;

      case null:
        isRunning = false;
        break;

      default:
        alert("Opção inválida.");
        break;
    }
  } catch (error) {
    alert(error.message);
  }
}
