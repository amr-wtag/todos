var taskform = document.getElementById("to_do_form");
var taskInput = document.getElementById("to_do_input");
var tasksList = document.getElementById("tasksList");
const todoList = document.querySelector(".todoList");
const edit = document.querySelector(".edit");
let Arr = [];
showTasks();
taskform.addEventListener("submit", function (e) {
  e.preventDefault();

  let getLocalStorage = localStorage.getItem("to-do");
  if (getLocalStorage == null) {
    Arr = [];
  } else {
    Arr = JSON.parse(getLocalStorage);
  }
  if (Arr.find((element) => element.name === taskInput.value) === undefined) {
    Arr.push({ name: taskInput.value, check: false });
    localStorage.setItem("to-do", JSON.stringify(Arr));
  } else {
    window.alert("Already in the tasks");
  }
  taskInput.value = "";
  showTasks();
});

function showTasks() {
  let getLocalStorage = localStorage.getItem("to-do");
  if (getLocalStorage == null) {
    Arr = [];
  } else {
    Arr = JSON.parse(getLocalStorage);
  }
  todoList.innerHTML = "";
  Arr.map((element) => {
    //console.log(element);
    todoList.innerHTML +=
      element.check === "checked"
        ? `<div><li><strong style="text-decoration: line-through;">${element.name}</strong><input type="checkbox" class="fa fa-click"id=${element.name} value=${element.check}
    ${element.check}
    ></input> <i class="fa-solid fa-pen-to-square"id=${element.name}></i>
    <i class="fas fa-trash" id=${element.name}><i/></li></div>`
        : `<div><li><strong>${element.name}</strong><input type="checkbox" class="fa fa-click"id=${element.name} value=${element.check}
    ${element.check}
    ></input> <i class="fa-solid fa-pen-to-square"id=${element.name}></i>
    <i class="fas fa-trash" id=${element.name}><i/></li></div>`;
  });
  //todoList.innerHTML = liTag;fa-solid fa-square-check
}
todoList.addEventListener("click", function deleteCheck(e) {
  const item = e.target;
  //console.log(JSON.stringify(item.classList[1]));
  let array = JSON.parse(localStorage.getItem("to-do"));
  let index = array.findIndex((element) => element.name === item.id);
  if (item.classList[1] === "fa-trash") {
    // Deleteing task
    console.log(JSON.stringify(item.id));
    //localStorage.removeItem("to-do"[item.id] /* JSON.stringify(item.id) */);

    //console.log(index);
    array.splice(index, 1);
    localStorage.setItem("to-do", JSON.stringify(array));
  }
  if (item.classList[1] === "fa-click") {
    // checkbox if tsk is done

    if (array[index].check === false) array[index].check = "checked";
    else array[index].check = false;
    //console.log(array[index].check);
    localStorage.setItem("to-do", JSON.stringify(array));
    //console.log("clicked");
  }
  if (item.classList[1] === "fa-pen-to-square") {
    edit.innerHTML = "";
    edit.innerHTML = `<div><input id="inp" value=${array[index].name}><button class="submit" value=${index} id="save">save</button></div>`;
    //console.log(document.getElementById("save"));
    /* if (document.getElementById("save")) {
      array[index].name = document.getElementById("inp");
    } */
  }
  showTasks();
});
edit.addEventListener("click", function (e) {
  const item = e.target;
  let array = JSON.parse(localStorage.getItem("to-do"));
  // console.log(item.classList[0]);
  //console.log(document.getElementById("inp").value);
  if (/* document.getElementById("save") */ item.classList[0] === "submit") {
    array[document.getElementById("save").value].name =
      document.getElementById("inp").value;
    localStorage.setItem("to-do", JSON.stringify(array));
    edit.innerHTML = "";
  }

  /* todoList.addEventListener; */
  showTasks();
});
/* edit.addEventListener("submit", function (e) {
  edit.innerHTML = "";
}); */
/* if (item.classList[1] === "fa-pen-to-square") {
  let array = JSON.parse(localStorage.getItem("to-do"));
  let index = array.findIndex((element) => element.name === item.id);

  edit.innerHTML = `<input
            id="to_do_input"
            type="text"
            class="rounded-pill"
            placeholder=""
            value="${array[index].name}
            required
          />
          <button
            type="submit"
            id="to_do_button"
            class="btn btn-primary btn-lg rounded-pill"
          >`;
} */
