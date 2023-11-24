const tasks = [];

let isRunning = true;
while (isRunning) {
  const input = +prompt(`Digite um número:\n
  1. Adicionar uma tarefa
  2. Editar uma tarefa salva
  3. Remover uma tarefa salva
  4. Listar todas as tarefas salvas
  5. Obter uma tarefa pelo id\n
  0. Sair\n`);

  switch (input) {
    case 0:
      isRunning = false;
      break;

    case 1:
      addTask();
      break;

    case 2:
      editTask();
      break;

    case 3:
      deleteTask();
      break;

    case 4:
      showTasks();
      break;

    case 5:
      searchTask(+prompt("Digite o ID da tarefa que deseja Buscar:"));
      break;

    default:
      alert("Opcção inválida");
      break;
  }
}

function addTask() {
  try {
    const name = prompt("Digite o nome da tarefa").trim().toUpperCase();

    if (!name || name.length < 4)
      throw new Error("O título deve ter no mínimo 4 caracteres.");

    if (!isNaN(name))
      throw new Error("O título não deve conter apenas números.");

    const titleExists = tasks.some((task) => task.name === name);
    if (titleExists) throw new Error("Já existe uma tarefa com esse título.");

    const description = prompt("Digite a descrição da tarefa").trim();

    if (description.length < 20)
      throw new Error("A descrição deve ter no mínimo 20 caracteres.");

    const newTask = {
      id: generateUniqueID(),
      name: name,
      description: description,
    };

    tasks.push(newTask);

    alert("Tarefa adicionada com sucesso!");
  } catch (error) {
    alert(`Houve um erro: ${error.message}`);
  }
}

function generateUniqueID() {
  let random;
  do {
    random = Math.floor(Math.random() * 100000);
  } while (tasks.some((task) => task.id === random));
  return random;
}

function editTask() {
  try {
    const inputTaskId = +prompt("Digite o ID da tarefa que deseja modificar:");
    const index = tasks.findIndex((task) => task.id === inputTaskId);

    if (index === -1) throw new Error("Tarefa não encontrada");

    const newTitle = prompt("Digite o novo título da tarefa")
      .trim()
      .toUpperCase();

    if (!newTitle || newTitle.length < 4 || !isNaN(newTitle))
      throw new Error("O novo título é inválido");

    const newDescription = prompt("Digite a nova descrição da tarefa").trim();

    if (!newDescription || newDescription.length < 20)
      throw new Error("A nova descrição é inválida");

    tasks[index].name = newTitle;
    tasks[index].description = newDescription;

    alert("Tarefa modificada com sucesso!");
  } catch (error) {
    alert(`Houve um erro: ${error.message}`);
  }
}

function deleteTask() {
  try {
    const inputTaskId = +prompt("Digite o ID da tarefa que deseja deletar:");
    const index = tasks.findIndex((task) => task.id === inputTaskId);

    if (index === -1) {
      throw new Error("Tarefa não encontrada");
    }

    tasks.splice(index, 1);
    alert("Tarefa removida com sucesso!");
  } catch (error) {
    alert(`Houve um erro: ${error.message}`);
  }
}

function showTasks() {
  tasks.forEach((task, index) => {
    alert(`Título: ${task.name}
    Descrição: ${task.description}
    ID: ${task.id}\n
    Tarefa ${++index} de ${tasks.length}`);
  });
}

function searchTask(inputTaskId) {
  try {
    const index = tasks.findIndex((task) => task.id === inputTaskId);

    if (index === -1) throw new Error("Tarefa não encontrada");

    alert(`Título: ${tasks[index].name}
    Descrição: ${tasks[index].description}
    ID: ${tasks[index].id}`);
  } catch (error) {
    alert(`Houve um erro: ${error.message}`);
  }
}
