import supabase from "./server.js";
import { toggled } from "./toggleFunctions.js";
import { checkEmptyDB, updateData, completedTask } from "./dbCall.js";
import { show } from "./toast.js";
var maindiv = document.getElementById("id01");
var topButtonAll = document.getElementById("topButtonAll");
var topButtonComplete = document.getElementById("topButtonComplete");
var topButtonIncomplete = document.getElementById("topButtonIncomplete");
var create = document.getElementById("Create");

export function showvalue(e, addFlag) {
  var div = document.createElement("div");
  var textareaH2Div = document.createElement("div");
  var buttonDiv = document.createElement("div");
  var createdAtSpin = document.createElement("div");
  var input = document.createElement("textarea");
  var h2 = document.createElement("label");
  var h6 = document.createElement("label");
  h6.classList = "h6Class";
  var buttonComplete = document.createElement("div");
  var createdAtDate = Date.parse(e.created_at);
  var completeButton = document.createElement("button");
  var editButton = document.createElement("button");
  var deleteButton = document.createElement("button");
  var actualCompleteButton = document.createElement("img");
  var actualEditButton = document.createElement("img");
  var actualDeleteButton = document.createElement("img");
  var spin = document.createElement("img");
  var save = document.createElement("button");
  var completed = document.createElement("label");

  save.appendChild(document.createTextNode("save"));
  save.type = "submit";
  save.classList = "save";
  completed.classList = "completeDate";
  actualCompleteButton.src = "./images/tick.svg";
  actualCompleteButton.alt = "tick";
  actualEditButton.src = "./images/edit.svg";
  actualEditButton.alt = "edit";
  actualDeleteButton.src = "./images/vector.svg";
  actualDeleteButton.alt = "delete";
  editButton.appendChild(actualEditButton);
  completeButton.appendChild(actualCompleteButton);
  deleteButton.appendChild(actualDeleteButton);
  editButton.classList = "boxedButton";
  deleteButton.classList = "boxedButton";
  completeButton.classList = "boxedButton";
  spin.src = "./images/bigspin.svg";
  spin.alt = "spin";
  spin.style = "display:none";
  spin.classList = "spinning rotateDiv";
  var val = e.name;
  if (e.completed_on === null) {
    buttonDiv.appendChild(save);
    buttonDiv.appendChild(completeButton);
    buttonDiv.appendChild(editButton);
  }

  buttonDiv.appendChild(deleteButton);

  editButton.onclick = function (e) {
    e.preventDefault();
    setTimeout(() => {
      input.focus();
    }, 0);
    h6.style = "display:none";
    toggled(input, h2, editButton, save);
    document.getElementById("show").style.display = "none";
    create.disabled = true;
  };

  completeButton.onclick = async function (e) {
    e.preventDefault();
    create.disabled = false;
    h6.style = "display:block";
    input.style = "display: none;";
    h2.style = "display: block";
    editButton.style = "display: block;";
    save.style = "display: none";
    spin.style = "display:block";
    buttonDiv.removeChild(completeButton);
    buttonDiv.removeChild(editButton);
    h2.classList.add("blur");
    h6.classList.add("blur");
    buttonDiv.classList.add("blur");
    await completedTask(input);
    h2.classList.remove("blur");
    h6.classList.remove("blur");
    buttonDiv.classList.remove("blur");
    try {
      if (topButtonAll.classList.contains("aferclickShadow")) {
        difference = Date.parse(new Date(Date.now())) - createdAtDate;
        days = Math.floor(difference / (1000 * 3600 * 24));
        h2.style = "color: #0BC375;text-decoration: line-through;";
        completed.appendChild(
          document.createTextNode(`Completed in ${days} days`),
        );
        buttonComplete.appendChild(completed);
      } else if (topButtonIncomplete.classList.contains("aferclickShadow"))
        maindiv.removeChild(div);
      show("Task Completed", "success");
    } catch (e) {
      show(e, "error");
    }
    spin.style = "display:none";
  };

  deleteButton.onclick = async function (e) {
    e.preventDefault();
    create.disabled = false;
    spin.style = "display:block";
    h2.classList.add("blur");
    h6.classList.add("blur");
    buttonDiv.classList.add("blur");
    completed.classList.add("blur");
    await deleted(input);
    show("Deleted task", "success");
    spin.style = "display:none";
    h2.classList.remove("blur");
    h6.classList.remove("blur");
    buttonDiv.classList.remove("blur");
    completed.classList.remove("blur");
    maindiv.removeChild(div);
  };

  save.onclick = async function (e) {
    e.preventDefault();
    if (input.value.length < 3) {
      show("Task length can not be less than 3", "error");
      input.focus();
    } else {
      input.disabled = true;
      create.disabled = false;

      h6.style = "display:block";
      input.style = "display: none;";
      h2.style = "display: block";
      editButton.style = "display: block;";
      save.style = "display: none";
      spin.style = "display:block";

      h2.classList.add("blur");
      h6.classList.add("blur");
      buttonDiv.classList.add("blur");
      try {
        input.value = input.value.trim(" ");
        input.value = input.value.trim("\n");
        input.value = input.value.split("\n")[0];
        const data = await updateData(input);
        show("Changes are saved successfully", "success");
      } catch (e) {
        show(e, "error");
      }
      h2.innerHTML = "";
      h2.appendChild(document.createTextNode(input.value));
      h2.classList.remove("blur");
      h6.classList.remove("blur");
      buttonDiv.classList.remove("blur");
      spin.style = "display:none";
      input.disabled = false;
    }
  };

  // enter press
  input.onkeyup = async function (e) {
    e.preventDefault();
    if (e.key == "Enter") {
      input.value = input.value.trim("\n");
      input.disabled = true;
      if (input.value.length < 3) {
        show("Task length can not be less than 3", "error");
        input.value = input.value.trim(" ");
        input.value = input.value.trim("\n");
        input.value = input.value.split("\n")[0];
        input.disabled = false;
        input.focus();
      } else {
        create.disabled = false;
        h6.style = "display:block";
        input.style = "display: none;";
        h2.style = "display: block";
        editButton.style = "display: block;";
        save.style = "display: none";
        spin.style = "display:block";
        h2.classList.add("blur");
        h6.classList.add("blur");
        buttonDiv.classList.add("blur");

        try {
          input.value = input.value.trim(" ");
          input.value = input.value.trim("\n");
          input.value = input.value.split("\n")[0];
          const data = await updateData(input);
          show("Changes are saved successfully", "success");
        } catch (e) {
          show(e, "error");
        }
        h2.innerHTML = "";
        h2.appendChild(document.createTextNode(input.value));
        h2.classList.remove("blur");
        h6.classList.remove("blur");
        buttonDiv.classList.remove("blur");
        spin.style = "display:none";
        input.disabled = false;
      }
    }
  };

  buttonDiv.classList = "buttonDiv";

  h2.classList.add("card");
  h2.id = e.id;
  input.id = e.id;
  h2.value = e.name;

  input.value = e.name;
  input.style = "display: none;";
  h2.style = "display: block;";
  if (e.completed_on !== null) {
    h2.style = "color: #0BC375;text-decoration: line-through;";
  }
  editButton.style = "display: block;";
  save.style = "display: none";
  h2.appendChild(document.createTextNode(e.name));
  h6.appendChild(document.createTextNode("Created At: " + e.created_at));
  createdAtSpin.appendChild(h6);
  div.classList = "divClass";
  var difference;
  var days;
  if (e.completed_on !== null) {
    difference = Date.parse(e.completed_on) - createdAtDate;
    days = Math.floor(difference / (1000 * 3600 * 24));
  }
  createdAtSpin.classList = "createdAtSpin";

  textareaH2Div.appendChild(input);
  textareaH2Div.appendChild(h2);
  div.appendChild(textareaH2Div);
  createdAtSpin.appendChild(spin);
  div.appendChild(createdAtSpin);
  buttonComplete.classList = "buttonComplete";
  buttonComplete.appendChild(buttonDiv);
  if (e.completed_on !== null) {
    completed.appendChild(document.createTextNode(`Completed in ${days} days`));
    buttonComplete.appendChild(completed);
  }
  div.appendChild(buttonComplete);

  if (addFlag === 1) {
    maindiv.prepend(div);

    maindiv.prepend(document.getElementById("show"));
    addFlag = 0;
  } else maindiv.appendChild(div);
}

//delete
async function deleted(e) {
  const { data, error } = await supabase
    .from("todo")
    .delete()
    .match({ id: e.id });
  var datacount = parseInt(localStorage.getItem("datacount"));
  datacount--;
  console.log(datacount);
  localStorage.setItem("datacount", datacount);
  if (datacount < 1) {
    loadMore.style = "display:none";
    document.getElementById("emptyScreen").style = "display:block";
    topButtonAll.disabled = true;
    topButtonComplete.disabled = true;
    topButtonIncomplete.disabled = true;
  }
}
