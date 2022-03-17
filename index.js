var SUPABASE_URL = "https://csnsvhmzohqmmlvjexpu.supabase.co";
var SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzbnN2aG16b2hxbW1sdmpleHB1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDY2NDI1MTQsImV4cCI6MTk2MjIxODUxNH0.RaTg59kmRNNRQlfwFUhuOIzjbZujClUketfNBHRxEW8";

var supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
var flag = "all";
var addFlag = 0;
var create = document.getElementById("Create");
var maindiv = document.getElementById("id01");
var taskform = document.getElementById("to_do_form");
var showForm = document.getElementById("show_form");
var taskInput = document.getElementById("to_do_input");
var add_button = document.getElementById("add_button");
var delete_add = document.getElementById("delete_add");
var complete = document.getElementById("complete");
var edit = document.getElementById("edit");
// var searchInput = document.getElementById("searchInput");
var search = document.getElementById("search");

var delete_task = document.getElementById("delete_task");
var top_button_all = document.getElementById("top_button_all");
var top_button_complete = document.getElementById("top_button_complete");
var top_button_incomplete = document.getElementById("top_button_incomplete");
var searchInput = document.querySelector("searchInput");
var h2 = document.getElementById("id01");
var loadMore = document.getElementById("loadMore");
var loadCompletedMore = document.getElementById("loadCompletedMore");
var loadIncompletedMore = document.getElementById("loadIncompletedMore");
var currentIndex = 0;
var currentCompletedIndex = 0;
var currentIncompletedIndex = 0;
var bigspin = document.getElementById("bigspin");

async function checkEmpty() {
  const { data, error } = await supabase.from("todo").select();
  if (data.length === 0) {
    top_button_all.disabled = true;
    top_button_complete.disabled = true;
    top_button_incomplete.disabled = true;
    search.disabled = true;
  }
}
checkEmpty();
showTasks();

// show all tasks
top_button_all.addEventListener("click", async function (e) {
  e.preventDefault();
  flag = "all";
  currentIndex = 0;
  var count = document.getElementById("id01").childElementCount;
  for (var i = 1; i < count; i++) {
    document
      .getElementById("id01")
      .removeChild(document.getElementById("id01").children[1]);
  }
  showTasks();
});

// show completed tasks
top_button_complete.addEventListener("click", async function (e) {
  e.preventDefault();
  flag = "complete";
  var count = document.getElementById("id01").childElementCount;
  for (var i = 1; i < count; i++) {
    document
      .getElementById("id01")
      .removeChild(document.getElementById("id01").children[1]);
  }
  showCompletedTasks();
});

//Incompleted tasks

top_button_incomplete.addEventListener("click", async function (e) {
  e.preventDefault();
  taskInput.style = "";
  flag = "incomplete";
  var count = document.getElementById("id01").childElementCount;
  for (var i = 1; i < count; i++) {
    document
      .getElementById("id01")
      .removeChild(document.getElementById("id01").children[1]);
  }
  showIncompletedTasks();
});

taskform.addEventListener("submit", async function (e) {
  e.preventDefault();
});

// fetch query
/* const { data, error } = await supabase.from("todo").select();
  console.log(data);
  h2.appendChild(document.createTextNode(data[0].name));
  document.getElementById("id01").appendChild(h2);
  console.log(h2); */
// showTasks();
showForm.addEventListener("submit", async function (e) {
  e.preventDefault();
});

// delete value
delete_add.addEventListener("click", async function (e) {
  e.preventDefault();
  taskInput.value = "";
  toggle();
});
// add value
add_button.addEventListener("click", async function (e) {
  e.preventDefault();
  taskInput.value = taskInput.value.trim("\n");
  var spin = document.createElement("img");
  spin.src = "./images/bigspin.svg";
  spin.alt = "spin";
  spin.style = "display:block";
  spin.classList = "spinning rotateDiv";
  addFlag = 1;
  if (taskInput.value.length === 0) {
    alert("Task can not be empty");
  } else {
    spin.style = "display:block";
    const { data, error } = await supabase
      .from("todo")
      .insert([{ name: taskInput.value, created_at: new Date(Date.now()) }]);
    var x = document.getElementById("show");
    if (x.style.display === "block") {
      x.style.display = "none";
      console.log(x.style.display);
    }
    taskInput.value = "";

    if (top_button_all.disabled === true) {
      top_button_all.disabled = false;
      top_button_complete.disabled = false;
      top_button_incomplete.disabled = false;
      search.disabled = false;
    }

    print(data[0]); // print value
    spin.style = "display:none";
  }
});

function toggle() {
  // taskInput.value = null;
  setTimeout(() => {
    taskInput.focus();
    // taskInput.placeholder = "Enter Task";
  }, 0);
  var x = document.getElementById("show");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

// add task after enter
taskInput.onkeyup = async function (e) {
  e.preventDefault();
  if (e.key == "Enter") {
    taskInput.value = taskInput.value.trim("\n");

    console.log(taskInput.value.length);
    var spin = document.createElement("img");
    spin.src = "./images/bigspin.svg";
    spin.alt = "spin";
    spin.style = "display:block";
    spin.classList = "spinning rotateDiv";
    addFlag = 1;
    if (taskInput.value.length === 0) {
      alert("Task can not be empty");
    } else {
      spin.style = "display:block";
      const { data, error } = await supabase
        .from("todo")
        .insert([{ name: taskInput.value, created_at: new Date(Date.now()) }]);
      var x = document.getElementById("show");
      if (x.style.display === "block") {
        x.style.display = "none";
      }
      taskInput.value = "";

      if (top_button_all.disabled === true) {
        top_button_all.disabled = false;
        top_button_complete.disabled = false;
        top_button_incomplete.disabled = false;
        search.disabled = false;
      }

      print(data[0]); // print value
      spin.style = "display:none";
    }
  }
};

//open search field
function searchToggle() {
  var x = document.getElementById("searchInput");
  // console.log(x);
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
  //search Input
  x.addEventListener("keyup", async (e) => {
    e.preventDefault();
    const text = e.currentTarget.value;

    if (text.length > 2) {
      bigspin.style = "display:block";
      const { data, error } = await supabase
        .from("todo")
        .select()
        .like("name", `%${text}%`);
      var count = document.getElementById("id01").childElementCount;
      for (var i = 1; i < count; i++) {
        document
          .getElementById("id01")
          .removeChild(document.getElementById("id01").children[1]);
      }
      data.map((e) => {
        print(e);
      });
      bigspin.style = "display:none";
    }
    if (text.length === 0) {
      // bigspin.style = "display:block";
      console.log(bigspin.style.display);
      var count = document.getElementById("id01").childElementCount;
      for (var i = 1; i < count; i++) {
        document
          .getElementById("id01")
          .removeChild(document.getElementById("id01").children[1]);
      }

      showTasks();
      // bigspin.style = "display:none";
    }
  });
}
// show tasks

async function showTasks() {
  var x = document.getElementById("show");
  if (x.style.display === "block") {
    x.style.display = "none";
  }
  loadMore.style = "display:block";
  loadIncompletedMore.style = "display:none";
  loadCompletedMore.style = "display:none";
  currentCompletedIndex = 0;
  currentIncompletedIndex = 0;
  bigspin.style = "display:block";
  const { data, error } = await supabase
    .from("todo")
    .select()
    .order("id", { ascending: false })
    .range(currentIndex, currentIndex + 5);

  data.map((e) => {
    print(e);
  });
  bigspin.style = "display:none";
}

function loadmore() {
  currentIndex += 6;
  showTasks();
}

// show completed tasks
async function showCompletedTasks() {
  var x = document.getElementById("show");
  if (x.style.display === "block") {
    x.style.display = "none";
  }
  loadMore.style = "display:none";
  loadIncompletedMore.style = "display:none";
  loadCompletedMore.style = "display:block";
  currentIncompletedIndex = 0;
  currentIndex = 0;
  bigspin.style = "display:block";
  const { data, error } = await supabase
    .from("todo")
    .select()
    .order("id", { ascending: false })
    .range(currentCompletedIndex, currentCompletedIndex + 5);

  console.log(data[0]);
  if (data === null) console.log("empty");
  data.map((e) => {
    if (e.completed_on !== null) print(e);
  });
  bigspin.style = "display:none";
}
function loadcompletedmore() {
  currentCompletedIndex += 6;
  showCompletedTasks();
}
// show Incompleted tasks
async function showIncompletedTasks() {
  var x = document.getElementById("show");
  if (x.style.display === "block") {
    x.style.display = "none";
  }
  loadMore.style = "display:none";
  loadCompletedMore.style = "display:none";
  loadIncompletedMore.style = "display:block";
  currentCompletedIndex = 0;
  currentIndex = 0;
  bigspin.style = "display:block";
  const { data, error } = await supabase
    .from("todo")
    .select()
    .is("completed_on", null)
    .order("id", { ascending: false })
    .range(currentIncompletedIndex, currentIncompletedIndex + 5);

  data.map((e) => {
    print(e);
  });
  bigspin.style = "display:none";
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
  if (data.length === 0) {
    top_button_all.disabled = true;
    top_button_complete.disabled = true;
    top_button_incomplete.disabled = true;
  }
}

/* function saved() {} */

function toggled(input, h2, edit_button, save) {
  if (input.style.display === "none") {
    input.style.display = "block";
  } /* else {
    e.style.display = "none";
  } */
  if (h2.style.display === "block") {
    h2.style.display = "none";
  } /* else {
    f.style.display = "block";
  } */
  if (edit_button.style.display === "block") {
    edit_button.style.display = "none";
  }
  if (save.style.display === "none") {
    save.style.display = "block";
  }
}
//print value
function print(e) {
  var div = document.createElement("div");
  var button_div = document.createElement("div");
  var createdAt_spin = document.createElement("div");
  var input = document.createElement("textarea");
  var h2 = document.createElement("h2");
  var h6 = document.createElement("h6");
  var button_complete = document.createElement("div");
  var created_at_date = Date.parse(e.created_at);
  var complete_button = document.createElement("button");
  var edit_button = document.createElement("button");
  var delete_button = document.createElement("button");
  var actual_complete_button = document.createElement("img");
  var actual_edit_button = document.createElement("img");
  var actual_delete_button = document.createElement("img");
  var spin = document.createElement("img");
  var save = document.createElement("button");
  var completed = document.createElement("rectangle");

  save.appendChild(document.createTextNode("save"));
  save.type = "submit";
  // may be need in future
  /*  complete_button.value = e.id;
  edit_button.value = e.id;
  delete_button.value = e.id; */
  completed.classList = "complete_date";
  actual_complete_button.src = "./images/tick.svg";
  actual_complete_button.alt = "tick";
  actual_edit_button.src = "./images/edit.svg";
  actual_edit_button.alt = "edit";
  actual_delete_button.src = "./images/vector.svg";
  actual_delete_button.alt = "delete";
  edit_button.appendChild(actual_edit_button);
  complete_button.appendChild(actual_complete_button);
  delete_button.appendChild(actual_delete_button);
  edit_button.classList = "boxed_button";
  delete_button.classList = "boxed_button";
  complete_button.classList = "boxed_button";
  spin.src = "./images/bigspin.svg";
  spin.alt = "spin";
  spin.style = "display:none";
  spin.classList = "spinning rotateDiv";
  var val = e.name;
  if (e.completed_on === null) {
    button_div.appendChild(save);
    button_div.appendChild(complete_button);
    button_div.appendChild(edit_button);
  }

  button_div.appendChild(delete_button);

  edit_button.onclick = function (e) {
    e.preventDefault();
    setTimeout(() => {
      input.focus(); /* , input.select(); */
    }, 0);
    // input.autofocus = true;
    h6.style = "display:none";
    toggled(input, h2, edit_button, save);
    document.getElementById("show").style.display = "none";
    create.disabled = true;
  };

  complete_button.onclick = function (e) {
    e.preventDefault();
    create.disabled = false;
    h6.style = "display:block";
    input.style = "display: none;";
    h2.style = "display: block";
    edit_button.style = "display: block;";
    save.style = "display: none";
    spin.style = "display:block";
    button_div.removeChild(complete_button);
    button_div.removeChild(edit_button);
    completedTask(input);
    if (flag === "all") {
      difference = Date.parse(new Date(Date.now())) - created_at_date;
      days = Math.ceil(difference / (1000 * 3600 * 24));
      h2.style = "color: #0BC375;text-decoration: line-through;";
      completed.appendChild(
        document.createTextNode(`Completed in ${days} days`),
      );
      button_complete.appendChild(completed);
    } else if (flag === "incomplete")
      document.getElementById("id01").removeChild(div);
    spin.style = "display:none";
  };

  delete_button.onclick = async function (e) {
    e.preventDefault();
    spin.style = "display:block";

    deleted(input);
    document.getElementById("id01").removeChild(div);
    const { data, error } = await supabase
      .from("todo")
      .select()
      .order("id", { ascending: false })
      .range(currentIndex + 5, currentIndex + 5);

    data.map((e) => {
      print(e);
    });
    spin.style = "display:none";
  };

  save.onclick = async function (e) {
    e.preventDefault();
    create.disabled = false;

    h6.style = "display:block";
    input.style = "display: none;";
    h2.style = "display: block";
    edit_button.style = "display: block;";
    save.style = "display: none";
    spin.style = "display:block";
    const { data, error } = await supabase
      .from("todo")
      .update({ name: input.value })
      .match({ id: input.id });

    h2.innerHTML = "";
    h2.appendChild(document.createTextNode(input.value));
    spin.style = "display:none";
  };

  // enter press
  input.onkeyup = async function (e) {
    e.preventDefault();
    /* setTimeout(() => {
      input.focus(), input.select();
    }, 0); */

    if (e.key == "Enter") {
      create.disabled = false;
      input.value = input.value.trim("\n");
      h6.style = "display:block";
      input.style = "display: none;";
      h2.style = "display: block";
      edit_button.style = "display: block;";
      save.style = "display: none";
      spin.style = "display:block";
      const { data, error } = await supabase
        .from("todo")
        .update({ name: input.value })
        .match({ id: input.id });

      h2.innerHTML = "";
      h2.appendChild(document.createTextNode(input.value));
      spin.style = "display:none";
    }
  };

  button_div.classList = "button_div";

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
  edit_button.style = "display: block;";
  save.style = "display: none";
  h2.appendChild(document.createTextNode(e.name));
  h6.appendChild(document.createTextNode("Created At: " + e.created_at));
  createdAt_spin.appendChild(h6);
  div.classList = "divClass";
  var difference;
  var days;
  if (e.completed_on !== null) {
    difference = Date.parse(e.completed_on) - Date.parse(e.created_at);
    days = Math.ceil(difference / (1000 * 3600 * 24));
    // console.log(days);
  }
  createdAt_spin.classList = "createdAt_spin";
  div.appendChild(input);
  div.appendChild(h2);
  createdAt_spin.appendChild(spin);
  div.appendChild(createdAt_spin);
  button_complete.classList = "button_complete";
  button_complete.appendChild(button_div);
  if (e.completed_on !== null) {
    completed.appendChild(document.createTextNode(`Completed in ${days} days`));
    button_complete.appendChild(completed);
  }
  div.appendChild(button_complete);
  // console.log(div);

  if (addFlag === 1) {
    document.getElementById("id01").prepend(div);

    document.getElementById("id01").prepend(document.getElementById("show"));
    addFlag = 0;
  } else document.getElementById("id01").appendChild(div);
}
