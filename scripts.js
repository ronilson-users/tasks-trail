
document.addEventListener("DOMContentLoaded", () => {
  console.log("app criando na DOM");

  const main = document.getElementById("main");

  const appContainer = document.createElement("div");
  appContainer.className = "app-container";

  const screenBackdrop = document.createElement("div");
  screenBackdrop.className = "screen-backdrop";
  appContainer.appendChild(screenBackdrop);

  const contentHome = document.createElement("div");
  contentHome.className = "content-home";
  contentHome.id = "content-home";

  const btnDetails = document.createElement("button");
  btnDetails.className = "btn-details btn";
  btnDetails.textContent = "Details";
  btnDetails.onclick = navigateToTrail;

  const navHome = document.createElement("div");
  navHome.className = "nav-back-to";
  navHome.appendChild(btnDetails);

  contentHome.appendChild(navHome);

  const welcome = document.createElement("div");
  welcome.textContent = "Ola, Dev Aqui vc analiza sua trilha";
  welcome.className = "welcome";
  contentHome.appendChild(welcome);

  const contentTasks = document.createElement("div");
  contentTasks.className = "content-tasks";

  const ulHome = document.createElement("ul");
  ulHome.className = "tasks-ul";
  ulHome.id = "trail-tasks";
  contentTasks.appendChild(ulHome);

  contentHome.appendChild(contentTasks);

  const contentDetails = document.createElement("div");
  contentDetails.className = "content-details";
  contentDetails.id = "content-details";

  const nav = document.createElement("div");
  nav.className = "nav-back-to";

  const btnHome = document.createElement("button");
  btnHome.className = "btn-home btn";
  btnHome.textContent = "Home";
  btnHome.onclick = navigateToHome;

  const btnTrail = document.createElement("button");
  btnTrail.className = "btn-trail btn";
  btnTrail.textContent = "Trail";
  btnTrail.onclick = navigateToTrail;

  const btnClear = document.createElement("button");
  btnClear.className = "btn-clear btn";
  btnClear.textContent = "Clear Tasks";
  btnClear.onclick = clearTasks;

  nav.appendChild(btnClear);
  nav.appendChild(btnHome);
  nav.appendChild(btnTrail);
  contentDetails.appendChild(nav);

  const taskList = document.createElement("ul");
  taskList.className = "task-list";
  taskList.id = "task-list";
  contentDetails.appendChild(taskList);

  const contentTrail = document.createElement("div");
  contentTrail.className = "content-trail";
  contentTrail.id = "content-trail";

  const btnHomeFromTrail = document.createElement("button");
  btnHomeFromTrail.className = "btn-home btn";
  btnHomeFromTrail.textContent = "Home";
  btnHomeFromTrail.onclick = navigateToHome;

  const navTrail = document.createElement("div");
  navTrail.className = "nav-back-to";

  const titleTrail = document.createElement("span");
  titleTrail.textContent = "Trilha";

  navTrail.appendChild(titleTrail);
  navTrail.appendChild(btnHomeFromTrail);
  contentTrail.appendChild(navTrail);

  const containerTrail = document.createElement("div");
  containerTrail.className = "container-trail";

  const infoTrail = document.createElement("span");
  infoTrail.className = "infoTrail";
  infoTrail.textContent =
    "Para criar uma trilha de estudos organizada por temas específicos, é importante definir claramente os objetivos de aprendizagem e os tópicos que cada tema abordará";

  containerTrail.appendChild(infoTrail);

  const inputGroup = document.createElement("div");
  inputGroup.className = "input-group";

  const input = document.createElement("input");
  input.type = "text";
  input.className = "trail-input";
  input.placeholder = "Insira a Trilha";
  input.id = "trail-input";

  const btnAdd = document.createElement("button");
  btnAdd.textContent = "Add Trail";
  btnAdd.className = "btn-trail btn";
  btnAdd.onclick = addTrail;

  inputGroup.appendChild(input);
  inputGroup.appendChild(btnAdd);
  containerTrail.appendChild(inputGroup);

  const trailItens = document.createElement("div");
  trailItens.className = "trail-list";

  const ulTrail = document.createElement("ul");
  ulTrail.className = "trail-ul";
  ulTrail.id = "trail-list";

  trailItens.appendChild(ulTrail);
  containerTrail.appendChild(trailItens);
  contentTrail.appendChild(containerTrail);

  const btnFloat = document.createElement("button");
  btnFloat.textContent = "+";
  btnFloat.className = "floating-button";
  btnFloat.onclick = openModal;
  appContainer.appendChild(btnFloat);

  const addTaskModal = document.createElement("div");
  addTaskModal.id = "addTaskModal";
  addTaskModal.className = "addTaskModal";

  const modalContent = document.createElement("div");
  modalContent.className = "modal-content";

  const closeModal = document.createElement("span");
  closeModal.textContent = "×";
  closeModal.className = "close";
  closeModal.onclick = closeModalFunc;

  const titleModal = document.createElement("h2");
  titleModal.textContent = "Adicionar Task";

  const inputTask = document.createElement("input");
  inputTask.className = "input-taskModal";
  inputTask.id = "input-taskModal";
  inputTask.type = "text";
  inputTask.placeholder = "Insert task";

  const selectModal = document.createElement("select");
  selectModal.id = "taskSelect";

  const btnSelect = document.createElement("button");
  btnSelect.className = "btn";
  btnSelect.textContent = "Add";
  btnSelect.onclick = addTask;

  modalContent.appendChild(closeModal);
  modalContent.appendChild(titleModal);
  modalContent.appendChild(selectModal);
  modalContent.appendChild(inputTask);
  modalContent.appendChild(btnSelect);

  addTaskModal.appendChild(modalContent);
  appContainer.appendChild(addTaskModal);

  appContainer.appendChild(contentHome);
  appContainer.appendChild(contentDetails);
  appContainer.appendChild(contentTrail);

  main.appendChild(appContainer);

  let dataTrails = [];
  let dataTask = [];

  const saveLocal = () => {
    localStorage.setItem("dataTask", JSON.stringify(dataTask));

    localStorage.setItem("dataTrails", JSON.stringify(dataTrails));
  };

  const getLocal = () => {
    const tasksLocal = JSON.parse(localStorage.getItem("dataTask"));
    if (tasksLocal) {
      dataTask = tasksLocal;
    }
    console.log("dataTask", dataTask);
  };

  const getLocalTrails = () => {
    const trailsLocal = JSON.parse(localStorage.getItem("dataTrails"));
    if (trailsLocal) {
      dataTrails = trailsLocal;
      updateSelectOptions();
    }
    console.log("dataTrails", dataTrails);
  };

  const renderHome = () => {
    const ulHome = document.getElementById("trail-tasks");
    ulHome.innerHTML = "";

    const tasksByTrail = dataTask.reduce((acc, task) => {
      if (!acc[task.trail]) {
        acc[task.trail] = 0;
      }
      acc[task.trail]++;
      return acc;
    }, {});

    for (const trail in tasksByTrail) {
      const li = document.createElement("li");
      li.textContent = `${trail} (${tasksByTrail[trail]} tasks)`;
      li.className = "trail-item";
      li.onclick = () => navigateToDetails(trail);
      ulHome.appendChild(li);
    }
  };

  const renderDetails = (trail) => {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    const tasksForTrail = dataTask.filter((task) => task.trail === trail);

    tasksForTrail.forEach((task) => {
      const li = document.createElement("li");
      li.textContent = task.task;
      li.className = "task-content";
      taskList.appendChild(li);
    });
  };

  const renderTrails = () => {
    const ulTrail = document.getElementById("trail-list");
    ulTrail.innerHTML = "";
    dataTrails.forEach((trail) => {
      const li = document.createElement("li");
      li.textContent = trail;

      const deleteButton = document.createElement("button");
      deleteButton.className = "btn";
      deleteButton.textContent = "Excluir";
      deleteButton.onclick = function () {
        ulTrail.removeChild(li);
        dataTrails = dataTrails.filter((t) => t !== trail);
        updateSelectOptions();
        saveLocal();
      };

      li.appendChild(deleteButton);
      ulTrail.appendChild(li);
    });
  };

  // clear all localStorage
  function clearTasks() {
    localStorage.removeItem("dataTask");
    localStorage.removeItem("dataTrails");
    dataTask = [];
    dataTrails = [];
    renderTasks();
    renderTrails();
    updateSelectOptions();
    console.log("tasks removidas com sucesso");
  }

  // Open Modal
  function openModal() {
    addTaskModal.style.display = "block";
  }
  // Close MOdal
  function closeModalFunc() {
    addTaskModal.style.display = "none";
    renderTasks();
    renderTrails();
    saveLocal();
  }
  // Add Task to Trail
  function addTask() {
    const taskTitle = document.getElementById("input-taskModal").value;

    const selectTrail = document.getElementById("taskSelect");
    const selectedTrail = selectTrail.value;

    if (taskTitle && selectedTrail) {
      dataTask.push({ trail: selectedTrail, task: taskTitle });
      saveLocal();
      renderHome();
      closeModalFunc();
      taskTitle.value = "";
    }
  }
  // Update Select Options
  function updateSelectOptions() {
    const selectTrail = document.getElementById("taskSelect");
    selectTrail.innerHTML = "";
    dataTrails.forEach((trail) => {
      const option = document.createElement("option");
      option.value = trail;
      option.textContent = trail;
      selectTrail.appendChild(option);
    });
  }
  // Add Trail
  function addTrail() {
    const input = document.getElementById("trail-input");
    const ulTrail = document.getElementById("trail-list");
    const newTrailText = input.value.trim();

    if (newTrailText !== "") {
      dataTrails.push(newTrailText);

      const li = document.createElement("li");
      li.textContent = newTrailText;

      const deleteButton = document.createElement("button");
      deleteButton.className = "btn";
      deleteButton.textContent = "Excluir";
      deleteButton.onclick = function () {
        ulTrail.removeChild(li);
        dataTrails = dataTrails.filter((trail) => trail !== newTrailText);
        updateSelectOptions();
        saveLocal();
      };

      li.appendChild(deleteButton);
      ulTrail.appendChild(li);

      input.value = "";

      updateSelectOptions();
      saveLocal();
    }
  }

  // Navigation to Home
  function navigateToHome() {
    document.getElementById("content-home").style.display = "flex";
    document.getElementById("content-details").style.display = "none";
    document.getElementById("content-trail").style.display = "none";
    renderHome();
  }
 function lorde(){
  return
 }


  // NAvigation to Details
  function navigateToDetails(trail) {
    document.getElementById("content-details").style.display = "flex";
    document.getElementById("content-home").style.display = "none";
    document.getElementById("content-trail").style.display = "none";
    renderDetails(trail);
  }

  // NAvigation to trail
  function navigateToTrail() {
    document.getElementById("content-trail").style.display = "flex";
    document.getElementById("content-details").style.display = "none";
    document.getElementById("content-home").style.display = "none";
    renderTrails();
  }

  getLocal();
  getLocalTrails();
  navigateToHome();
});

