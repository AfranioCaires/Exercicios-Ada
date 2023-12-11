class Task {
  #id = Date.now().toString().slice(-5);
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
    this.status = "Pendente";
  }

  get id() {
    return this.#id;
  }

  editName(newName) {
    if (newName === null) return "Operação cancelada.";
    newName = newName.trim();
    if (!newName || newName.length < 4)
      throw new Error("O título deve ter no mínimo 4 caracteres.");
    if (!isNaN(newName))
      throw new Error("O título não deve conter apenas números.");

    this.name = newName;
    return "Nome alterado com sucesso.";
  }

  editDescription(newDescription) {
    if (newDescription === null) return "Operação cancelada.";
    newDescription = newDescription.trim();
    if (newDescription.length < 20)
      throw new Error("A descrição deve ter no mínimo 20 caracteres.");

    this.description = newDescription;
    return "Descrição alterada com sucesso.";
  }

  editStatus(newStatus) {
    if (newStatus === null) return "Operação cancelada.";
    if (!newStatus) throw new Error("O status não pode ser vazio.");
    if (typeof newStatus !== "string")
      throw new Error("O status deve ser uma string.");

    newStatus = newStatus.trim().toLowerCase();
    const estadosPermitidos = ["pendente", "fazendo", "feita"];

    if (!estadosPermitidos.includes(newStatus))
      throw new Error("O status deve ser Pendente, Fazendo ou Feita.");

    this.status = newStatus;
    return "Status alterado com sucesso.";
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
    return "Tarefa adicionada com sucesso.";
  }

  removeTask(taskId) {
    if (taskId === null) return "Operação cancelada.";
    const index = this.#tasks.findIndex((task) => task.id === taskId);
    if (index === -1) throw new Error("Não existe uma tarefa com esse ID.");
    this.#tasks.splice(index, 1);
    return "Tarefa removida com sucesso.";
  }

  searchTask(taskId) {
    const task = this.#tasks.find((task) => task.id === taskId);
    if (!task) throw new Error("Não existe uma tarefa com esse ID.");
    return task;
  }

  menu() {
    let option = prompt(
      "Selecione uma opção:\n1 - Adicionar tarefa\n2 - Procurar tarefa\n3 - Listar tarefas\n4 - Sair"
    );
    if (option === null) return option;
    if (!option || isNaN(option) || option < 1 || option > 4)
      throw new Error("Opção inválida.");
    return option;
  }
}

const taskManager = new TaskManager();

let isRunning = true;
while (isRunning) {
  const option = taskManager.menu();
  try {
    switch (option) {
      case "1":
        alert(
          taskManager.addTask(
            new Task(
              prompt("Digite o nome da tarefa"),
              prompt("Digite a descrição da tarefa")
            )
          )
        );
        break;

      case "2":
        const searchedTask = taskManager.searchTask(
          prompt("Digite o ID da tarefa que deseja buscar:")
        );
        const taskOptions = prompt(
          `Tarefa encontrada:\nNome: ${searchedTask.name}\nDescrição: ${searchedTask.description}\nStatus: ${searchedTask.status}\n\n1. editar nome\n2. editar descrição\n3. editar status\n4. remover tarefa\n5. voltar`
        );
        if (taskOptions === null) break;
        switch (taskOptions) {
          case "1":
            alert(searchedTask.editName(prompt("Digite o novo nome:")));
            break;

          case "2":
            alert(
              searchedTask.editDescription(prompt("Digite a nova descrição:"))
            );
            break;

          case "3":
            alert(searchedTask.editStatus(prompt("Digite o novo status:")));
            break;

          case "4":
            alert(taskManager.removeTask(searchedTask.id));
            break;

          case "5":
            break;

          default:
            alert("Opção inválida.");
            break;
        }

        break;

      case "3":
        if (taskManager.tasks.length > 0) {
          alert(
            `Lista de tarefas:\n${taskManager.tasks
              .map(
                (task) =>
                  `ID: ${task.id}\nNome: ${task.name}\nDescrição: ${task.description}\nStatus: ${task.status}\n`
              )
              .join("\n")}`
          );
        } else {
          alert("Não há tarefas cadastradas");
        }
        break;

      case "4":
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
