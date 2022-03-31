var create = document.getElementById("Create");
var taskInput = document.getElementById("toDoInput");
create.addEventListener("click", toggle);
export function toggle() {
  setTimeout(() => {
    taskInput.focus();
  }, 0);
  var addTodoField = document.getElementById("show");
  if (addTodoField.style.display === "none") {
    addTodoField.style.display = "block";
  } else {
    addTodoField.style.display = "none";
  }
}

export function toggled(input, h2, editButton, save) {
  if (input.style.display === "none") {
    input.style.display = "block";
  }
  if (h2.style.display === "block") {
    h2.style.display = "none";
  }
  if (editButton.style.display === "block") {
    editButton.style.display = "none";
  }
  if (save.style.display === "none") {
    save.style.display = "block";
  }
}
