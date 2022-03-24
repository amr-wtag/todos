var SUPABASE_URL = "https://csnsvhmzohqmmlvjexpu.supabase.co";
var SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzbnN2aG16b2hxbW1sdmpleHB1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDY2NDI1MTQsImV4cCI6MTk2MjIxODUxNH0.RaTg59kmRNNRQlfwFUhuOIzjbZujClUketfNBHRxEW8";

var supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

var splash = document.getElementById("splash");

var datacount = 1;
var flag = "all";
var addFlag = 0;
var ulList = document.getElementById("toasted");
var create = document.getElementById("Create");
var maindiv = document.getElementById("id01");
var taskform = document.getElementById("toDoForm");
var showForm = document.getElementById("showForm");
var taskInput = document.getElementById("toDoInput");
var addButton = document.getElementById("addButton");
var deleteAdd = document.getElementById("deleteAdd");
var complete = document.getElementById("complete");
var edit = document.getElementById("edit");
var search = document.getElementById("search");

var deleteTask = document.getElementById("deleteTask");
var topButtonAll = document.getElementById("topButtonAll");
var topButtonComplete = document.getElementById("topButtonComplete");
var topButtonIncomplete = document.getElementById("topButtonIncomplete");
var searchInput = document.querySelector("searchInput");
var searchValue = document.getElementById("searchInput");
// var h2 = document.getElementById("id01");
var loadMore = document.getElementById("loadMore");
var loadCompletedMore = document.getElementById("loadCompletedMore");
var loadIncompletedMore = document.getElementById("loadIncompletedMore");
var currentIndex = 0;
var currentCompletedIndex = 0;
var currentIncompletedIndex = 0;
var bigspin = document.getElementById("bigspin");

//toast
const Toast = {
  show(message, state) {
    var image = document.createElement("img");
    var li = document.createElement("div");
    if (state === "success") {
      image.src = "./images/success.svg";
      image.alt = "tick";
      li.appendChild(image);
    }
    li.appendChild(document.createTextNode(message));
    ulList.appendChild(li);
    li.classList = "toast toast--visible";

    if (state) {
      li.classList.add(`toast--${state}`);
    }
    {
      var count = ulList.childElementCount;
      while (count--) {
        setTimeout(() => {
          ulList.removeChild(ulList.children[0]);
        }, 1000);
      }
    }
  },
};

// check if database is empty
async function checkEmpty() {
  try {
    const { data, error } = await supabase.from("todo").select();
    datacount = data.length;
    if (data.length === 0) {
      document.getElementById("emptyScreen").style = "display:block";
      loadMore.style = "display:none";
      topButtonAll.disabled = true;
      topButtonComplete.disabled = true;
      topButtonIncomplete.disabled = true;
      search.disabled = true;
    }
  } catch (e) {
    Toast.show(e, "Failed to fetch data");
  }
}
checkEmpty();
showTasks();

//clear body
function clearBody() {
  var count = maindiv.childElementCount;
  for (var i = 1; i < count; i++) {
    maindiv.removeChild(maindiv.children[1]);
  }
}

// show all tasks
topButtonAll.addEventListener("click", async function (e) {
  e.preventDefault();
  flag = "all";
  currentIndex = 0;

  // clearBody();
  if (searchValue.style.display == "block") {
    loadMore.style = "display:none";
    loadIncompletedMore.style = "display:none";
    loadCompletedMore.style = "display:none";
    bigspin.style = "display:block";
    topButtonAll.disabled = true;
    topButtonComplete.disabled = true;
    topButtonIncomplete.disabled = true;
    maindiv.classList.add("blur");

    const { data, error } = await supabase
      .from("todo")
      .select()
      .ilike("name", `%${searchValue.value}%`);
    clearBody();
    data.map((e) => {
      print(e);
    });
    maindiv.classList.remove("blur");
    topButtonAll.disabled = false;
    topButtonComplete.disabled = false;
    topButtonIncomplete.disabled = false;
    bigspin.style = "display:none";
  } else if (searchValue.style.display == "none") {
    clearBody();
    showTasks();
  }
});

// show completed tasks
topButtonComplete.addEventListener("click", async function (e) {
  e.preventDefault();
  flag = "complete";
  currentCompletedIndex = 0;
  // clearBody();
  if (searchValue.style.display == "block") {
    loadMore.style = "display:none";
    loadIncompletedMore.style = "display:none";
    loadCompletedMore.style = "display:none";
    bigspin.style = "display:block";
    topButtonAll.disabled = true;
    topButtonComplete.disabled = true;
    topButtonIncomplete.disabled = true;
    maindiv.classList.add("blur");

    const { data, error } = await supabase
      .from("todo")
      .select()
      .ilike("name", `%${searchValue.value}%`)
      .not("completed_on", "is", null);
    clearBody();
    data.map((e) => {
      print(e);
    });
    maindiv.classList.remove("blur");
    topButtonAll.disabled = false;
    topButtonComplete.disabled = false;
    topButtonIncomplete.disabled = false;
    bigspin.style = "display:none";
  } else if (searchValue.style.display == "none") {
    clearBody();
    showCompletedTasks();
  }
});

//Incompleted tasks

topButtonIncomplete.addEventListener("click", async function (e) {
  e.preventDefault();
  taskInput.style = "";
  flag = "incomplete";
  currentIncompletedIndex = 0;
  // clearBody();
  if (searchValue.style.display == "block") {
    loadMore.style = "display:none";
    loadIncompletedMore.style = "display:none";
    loadCompletedMore.style = "display:none";
    bigspin.style = "display:block";
    topButtonAll.disabled = true;
    topButtonComplete.disabled = true;
    topButtonIncomplete.disabled = true;
    maindiv.classList.add("blur");

    const { data, error } = await supabase
      .from("todo")
      .select()
      .ilike("name", `%${searchValue.value}%`)
      .is("completed_on", null);
    clearBody();
    data.map((e) => {
      print(e);
    });
    maindiv.classList.remove("blur");
    topButtonAll.disabled = false;
    topButtonComplete.disabled = false;
    topButtonIncomplete.disabled = false;
    bigspin.style = "display:none";
  } else if (searchValue.style.display == "none") {
    clearBody();
    showIncompletedTasks();
  }
});

taskform.addEventListener("submit", async function (e) {
  e.preventDefault();
});

showForm.addEventListener("submit", async function (e) {
  e.preventDefault();
});

// delete value
deleteAdd.addEventListener("click", async function (e) {
  e.preventDefault();
  taskInput.value = "";
  toggle();
});

var keycount = 0;
// add value
addButton.addEventListener("click", async function (e) {
  e.preventDefault();
  taskInput.value = taskInput.value.split("\n")[0];
  taskInput.value = taskInput.value.trim("\n");
  var spin = document.createElement("img");
  spin.src = "./images/bigspin.svg";
  spin.alt = "spin";
  spin.classList = "spinning rotateDiv";
  addFlag = 1;
  if (taskInput.value.length === 0) {
    Toast.show("Task can not be empty", "error");
  } else if (keycount === 0) {
    taskInput.disabled = true;
    ++keycount;
    var addTodoField = document.getElementById("show");

    spin.style = "display:block";
    document.getElementById("createspin").style = "display:block";
    deleteAdd.classList.add("blur");
    addButton.classList.add("blur");
    taskInput.classList.add("blur");
    try {
      const { data, error } = await supabase
        .from("todo")
        .insert([{ name: taskInput.value, created_at: new Date(Date.now()) }]);

      if (addTodoField.style.display === "block") {
        addTodoField.style.display = "none";
      }
      taskInput.value = "";
      datacount++;
      if (topButtonAll.disabled === true) {
        topButtonAll.disabled = false;
        topButtonComplete.disabled = false;
        topButtonIncomplete.disabled = false;
        search.disabled = false;
      }
      deleteAdd.classList.remove("blur");
      addButton.classList.remove("blur");
      taskInput.classList.remove("blur");
      document.getElementById("createspin").style = "display:none";
      spin.style = "display:none";
      document.getElementById("emptyScreen").style = "display:none";
      if (flag !== "complete") print(data[0]); // print value

      Toast.show("added", "success");
    } catch (e) {
      Toast.show(e, "error");
    }
    keycount = 0;
    taskInput.disabled = false;
  }
});

function toggle() {
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

// add task after enter
taskInput.onkeyup = async function (e) {
  e.preventDefault();
  if (e.key == "Enter" && keycount === 0) {
    ++keycount;
    taskInput.disabled = true;
    taskInput.value = taskInput.value.split("\n")[0];
    taskInput.value = taskInput.value.trim("\n");
    var spin = document.createElement("img");
    spin.src = "./images/bigspin.svg";
    spin.alt = "spin";
    spin.classList = "spinning rotateDiv";
    addFlag = 1;
    if (taskInput.value.length === 0) {
      Toast.show("Task can not be empty", "error");
    } else {
      var addTodoField = document.getElementById("show");

      spin.style = "display:block";
      document.getElementById("createspin").style = "display:block";
      deleteAdd.classList.add("blur");
      addButton.classList.add("blur");
      taskInput.classList.add("blur");
      try {
        const { data, error } = await supabase
          .from("todo")
          .insert([
            { name: taskInput.value, created_at: new Date(Date.now()) },
          ]);
        taskInput.value = "";
        if (addTodoField.style.display === "block") {
          addTodoField.style.display = "none";
        }
        taskInput.value = "";
        document.getElementById("createspin").style = "display:none";
        datacount++;
        if (topButtonAll.disabled === true) {
          topButtonAll.disabled = false;
          topButtonComplete.disabled = false;
          topButtonIncomplete.disabled = false;
          search.disabled = false;
        }
        deleteAdd.classList.remove("blur");
        addButton.classList.remove("blur");
        taskInput.classList.remove("blur");

        spin.style = "display:none";
        if (flag !== "complete") print(data[0]); // print value
        document.getElementById("emptyScreen").style = "display:none";

        Toast.show("added", "success");
      } catch (e) {
        Toast.show(e, "error");
      }
    }
    keycount = 0;
    taskInput.disabled = false;
  }
};

//open search field
function searchToggle() {
  setTimeout(() => {
    searchValue.focus();
  }, 0);
  if (searchValue.style.display === "none") {
    searchValue.style.display = "block";
  } else {
    searchValue.style.display = "none";
    searchValue.value = null;
    clearBody();
    if (flag == "all") showTasks();
    else if (flag == "complete") showCompletedTasks();
    else showIncompletedTasks();
  }
}

//debounce
const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    const context = this;
    const later = () => {
      timer = null;
      fn.call(this, ...args);
    };
    clearTimeout(timer);
    timer = setTimeout(later, delay);
  };
};

//search Input
const initApp = () => {
  searchValue.addEventListener("keyup", debounce(keyupLog, 500));
};
document.addEventListener("DOMContentLoaded", initApp);
//keyup log
const keyupLog = async (e) => {
  e.preventDefault();
  const text = searchValue.value;
  var blur = maindiv;
  if (text.length > 2) {
    loadMore.style = "display:none";
    loadIncompletedMore.style = "display:none";
    loadCompletedMore.style = "display:none";
    bigspin.style = "display:block";
    topButtonAll.disabled = true;
    topButtonComplete.disabled = true;
    topButtonIncomplete.disabled = true;
    blur.classList.add("blur");
    if (flag == "all") {
      const { data, error } = await supabase
        .from("todo")
        .select()
        .ilike("name", `%${text}%`);
      clearBody();
      data.map((e) => {
        print(e);
      });
    } else if (flag == "complete") {
      const { data, error } = await supabase
        .from("todo")
        .select()
        .ilike("name", `%${text}%`)
        .not("completed_on", "is", null);
      clearBody();
      data.map((e) => {
        print(e);
      });
    } else {
      const { data, error } = await supabase
        .from("todo")
        .select()
        .ilike("name", `%${text}%`)
        .is("completed_on", null);
      clearBody();

      data.map((e) => {
        print(e);
      });
    }

    bigspin.style = "display:none";
    topButtonAll.disabled = false;
    topButtonComplete.disabled = false;
    topButtonIncomplete.disabled = false;
  } else if (text.length === 0) {
    bigspin.style = "display:block";
    topButtonAll.disabled = true;
    topButtonComplete.disabled = true;
    topButtonIncomplete.disabled = true;
    blur.classList.add("blur");

    blur.classList.remove("blur");
    bigspin.style = "display:none";
    topButtonAll.disabled = false;
    topButtonComplete.disabled = false;
    topButtonIncomplete.disabled = false;
    clearBody();
    if (flag == "all") showTasks();
    else if (flag == "complete") showCompletedTasks();
    else showIncompletedTasks();
  }
  blur.classList.remove("blur");
};
// show tasks

async function showTasks() {
  var addTodoField = document.getElementById("show");
  if (addTodoField.style.display === "block") {
    addTodoField.style.display = "none";
  }
  loadIncompletedMore.style = "display:none";
  loadCompletedMore.style = "display:none";
  currentCompletedIndex = 0;
  currentIncompletedIndex = 0;
  if (splash.style.display !== "block") {
    bigspin.style = "display:block";
    topButtonAll.disabled = true;
    topButtonComplete.disabled = true;
    topButtonIncomplete.disabled = true;
  }
  maindiv.classList.add("blur");

  loadMore.style = "display:none";
  const { data, error } = await supabase
    .from("todo")
    .select()
    .order("id", { ascending: false })
    .range(currentIndex, currentIndex + 5);

  data.map((e) => {
    print(e);
  });
  if (splash.style.display == "block") {
    splash.classList.add("display-none");
    splash.style = "display:none";
  }
  maindiv.classList.remove("blur");

  bigspin.style = "display:none";
  topButtonAll.disabled = false;
  topButtonComplete.disabled = false;
  topButtonIncomplete.disabled = false;
  loadMore.style = "display:block";
  if (data.length < 6) {
    loadMore.style = "display:none";
    currentIndex = 0;
  }
}

function loadmore() {
  currentIndex += 6;
  showTasks();
}

// show completed tasks
async function showCompletedTasks() {
  var addTodoField = document.getElementById("show");
  if (addTodoField.style.display === "block") {
    addTodoField.style.display = "none";
  }
  loadMore.style = "display:none";
  loadIncompletedMore.style = "display:none";
  currentIncompletedIndex = 0;
  currentIndex = 0;
  bigspin.style = "display:block";
  topButtonAll.disabled = true;
  topButtonComplete.disabled = true;
  topButtonIncomplete.disabled = true;
  loadCompletedMore.style = "display:none";

  maindiv.classList.add("blur");
  const { data, error } = await supabase
    .from("todo")
    .select()
    .order("id", { ascending: false })
    .not("completed_on", "is", null)
    .range(currentCompletedIndex, currentCompletedIndex + 5);

  data.map((e) => {
    print(e);
  });
  bigspin.style = "display:none";
  topButtonAll.disabled = false;
  topButtonComplete.disabled = false;
  topButtonIncomplete.disabled = false;
  loadCompletedMore.style = "display:block";
  if (data.length < 6) {
    loadCompletedMore.style = "display:none";
    currentCompletedIndex = 0;
  }
  maindiv.classList.remove("blur");
}
function loadcompletedmore() {
  currentCompletedIndex += 6;
  showCompletedTasks();
}
// show Incompleted tasks
async function showIncompletedTasks() {
  var addTodoField = document.getElementById("show");
  if (addTodoField.style.display === "block") {
    addTodoField.style.display = "none";
  }
  loadMore.style = "display:none";
  loadCompletedMore.style = "display:none";
  currentCompletedIndex = 0;
  currentIndex = 0;
  bigspin.style = "display:block";
  topButtonAll.disabled = true;
  topButtonComplete.disabled = true;
  topButtonIncomplete.disabled = true;
  loadIncompletedMore.style = "display:none";

  maindiv.classList.add("blur");
  const { data, error } = await supabase
    .from("todo")
    .select()
    .is("completed_on", null)
    .order("id", { ascending: false })
    .range(currentIncompletedIndex, currentIncompletedIndex + 5);

  data.map((e) => {
    print(e);
  });
  maindiv.classList.remove("blur");
  bigspin.style = "display:none";
  topButtonAll.disabled = false;
  topButtonComplete.disabled = false;
  topButtonIncomplete.disabled = false;
  loadIncompletedMore.style = "display:block";
  if (data.length < 6) {
    loadIncompletedMore.style = "display:none";
    currentIncompletedIndex = 0;
  }
}
function loadincompletedmore() {
  currentIncompletedIndex += 6;
  showIncompletedTasks();
}
// complete
async function completedTask(e) {
  const { data, error } = await supabase
    .from("todo")
    .update({ completed_on: new Date(Date.now()) })
    .match({ id: e.id });
}

// delete
async function deleted(e) {
  const { data, error } = await supabase
    .from("todo")
    .delete()
    .match({ id: e.id });
  datacount--;
  if (datacount < 1) {
    loadMore.style = "display:none";
    currentIndex = 0;
    currentCompletedIndex = 0;
    currentIncompletedIndex = 0;
    document.getElementById("emptyScreen").style = "display:block";
    topButtonAll.disabled = true;
    topButtonComplete.disabled = true;
    topButtonIncomplete.disabled = true;
  }
}

//toggle
function toggled(input, h2, editButton, save) {
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
//print value
function print(e) {
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

  completeButton.onclick = function (e) {
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
    completedTask(input);
    try {
      if (flag === "all") {
        difference = Date.parse(new Date(Date.now())) - createdAtDate;
        days = Math.ceil(difference / (1000 * 3600 * 24));
        h2.style = "color: #0BC375;text-decoration: line-through;";
        completed.appendChild(
          document.createTextNode(`Completed in ${days} days`),
        );
        buttonComplete.appendChild(completed);
      } else if (flag === "incomplete") maindiv.removeChild(div);
      Toast.show("Task Completed", "success");
    } catch (e) {
      Toast.show(e, "error");
    }
    spin.style = "display:none";
  };

  deleteButton.onclick = async function (e) {
    e.preventDefault();
    spin.style = "display:block";
    h2.classList.add("blur");
    h6.classList.add("blur");
    buttonDiv.classList.add("blur");
    await deleted(input);
    Toast.show("Deleted task", "success");
    spin.style = "display:none";
    h2.classList.remove("blur");
    h6.classList.remove("blur");
    buttonDiv.classList.remove("blur");
    maindiv.removeChild(div);
  };

  save.onclick = async function (e) {
    e.preventDefault();
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
    input.disabled = true;
    input.value = input.value.split("\n")[0];
    try {
      const { data, error } = await supabase
        .from("todo")
        .update({ name: input.value })
        .match({ id: input.id });
      Toast.show("Changes are saved successfully", "success");
    } catch (e) {
      Toast.show(e, "error");
    }
    h2.innerHTML = "";
    h2.appendChild(document.createTextNode(input.value));
    h2.classList.remove("blur");
    h6.classList.remove("blur");
    buttonDiv.classList.remove("blur");
    spin.style = "display:none";
    input.disabled = false;
  };

  // enter press
  input.onkeyup = async function (e) {
    e.preventDefault();

    if (e.key == "Enter") {
      input.disabled = true;
      e.key.disabled = true;
      create.disabled = false;
      input.value = input.value.trim("\n");
      h6.style = "display:block";
      input.style = "display: none;";
      h2.style = "display: block";
      editButton.style = "display: block;";
      save.style = "display: none";
      spin.style = "display:block";
      h2.classList.add("blur");
      h6.classList.add("blur");
      buttonDiv.classList.add("blur");
      input.value = input.value.split("\n")[0];
      try {
        const { data, error } = await supabase
          .from("todo")
          .update({ name: input.value })
          .match({ id: input.id });
        Toast.show("Changes are saved successfully", "success");
      } catch (e) {
        Toast.show(e, "error");
      }
      h2.innerHTML = "";
      h2.appendChild(document.createTextNode(input.value));
      h2.classList.remove("blur");
      h6.classList.remove("blur");
      buttonDiv.classList.remove("blur");
      spin.style = "display:none";
      e.key.disabled = false;
      input.disabled = false;
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
    difference = Date.parse(e.completed_on) - Date.parse(e.created_at);
    days = Math.ceil(difference / (1000 * 3600 * 24));
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
