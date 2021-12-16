// TEST ARRAY

let todoList = [
  {
    id: 1,
    text: "Play games",
    isComplited: false,
    date: new Date().toLocaleDateString(),
  },
  {
    id: 2,
    text: "Play ",
    isComplited: true,
    date: new Date().toLocaleDateString(),
  },
  {
    id: 3,
    text: "Play gg games",
    isComplited: false,
    date: new Date().toLocaleDateString(),
  },
];

//ROOT

const root = document.querySelector("#root");
const header = createHeader();
const main = createTodoList(todoList);

header.addEventListener("click", (event) => onHeaderClick(event));

root.append(header, main);

//HANDLERS

const onHeaderClick = (event) => {
  if (event.target.id === "input") {
  } else if (event.target.id === "btnAdd") {
    const item = {
      id: todoList.length + 1,
      text: event.target.previousElementSibling.value,
      isComplited: false,
      date: new Date().toLocaleDateString(),
    };
    todoList.push(item);
    render(todoList);
  } else if (event.target.id === "btnDeleteAll") {
    todoList.length = 0;
    render(todoList);
  } else if (event.target.id === "btnDeleteLast") {
    todoList.pop();
    render(todoList);
  } else if (event.target.id === "btnShowAll") {
    render(todoList);
  } else if (event.target.id === "btnShowComplited") {
    const onlyComplited = todoList.filter((item) => item.isComplited === true);
    render(onlyComplited);
  }
};

const onItemClick = (event) => {
  if (event.target.id === "checkbox") {
    if (event.target.checked) {
      todoList.forEach((item) => {
        if (+event.target.parentElement.id === +item.id) {
          item.isComplited = true;
        }
      });
    } else {
      todoList.forEach((item) => {
        if (+event.target.parentElement.id === +item.id) {
          item.isComplited = false;
        }
      });
    }
    render(todoList);
  } else if (event.target.id === "btnDelete") {
    todoList = todoList.filter((item) => item.id != event.target.parentElement.id);
    render(todoList);
  }
};

// RENDER

function render(todoList) {
  const todo = createTodoList(todoList);
  main.innerHTML = "";
  main.append(todo);
}

// UTILS

function createElement(tag, className, text = "") {
  const element = document.createElement(tag);
  element.className = className;
  element.textContent = text;
  return element;
}

// COMPONENTS

function createHeader() {
  const header = createElement("header", "d-flex align-items-center gap-1");
  const input = createElement("input", "form-control flex-grow-1");
  const btnAdd = createElement("button", "btn btn-info", "Add");
  const btnDeleteAll = createElement("button", "btn btn-info", "Delete All");
  const btnDeleteLast = createElement("button", "btn btn-info", "Delete Last");
  const btnShowAll = createElement("button", "btn btn-info", "Show All");
  const btnShowCompleted = createElement("button", "btn btn-info", "Show Completed");
  input.id = "input";
  btnAdd.id = "btnAdd";
  btnDeleteAll.id = "btnDeleteAll";
  btnDeleteLast.id = "btnDeleteLast";
  btnShowAll.id = "btnShowAll";
  btnShowCompleted.id = "btnShowComplited";

  header.append(btnShowAll, btnShowCompleted, btnDeleteAll, btnDeleteLast, input, btnAdd);
  return header;
}

function createTodoList(todoList) {
  const list = createElement("div", "d-flex flex-column gap-3", "");
  todoList.forEach((item) => {
    const todoItem = createTodoItem(item);
    list.append(todoItem);
  });
  list.addEventListener("click", (event) => onItemClick(event));
  return list;
}

function createTodoItem(item) {
  const card = createElement("div", "d-flex align-items-center justify-content-between gap-6 border border-dark border-3 rounded");
  const checkbox = createElement("input", "", "");
  checkbox.type = "checkbox";
  checkbox.checked = item.isComplited;
  const text = createElement("p", "d-flex flex-grow-1 justify-content-center my-0", item.text);
  const date = createElement("p", "my-0 mx-5 bg-info", item.date);
  const btnDelete = createElement("button", "btn-close bg-info");
  card.id = item.id;
  checkbox.id = "checkbox";
  btnDelete.id = "btnDelete";

  card.append(checkbox, text, date, btnDelete);
  return card;
}
