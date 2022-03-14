var SUPABASE_URL = "https://csnsvhmzohqmmlvjexpu.supabase.co";
var SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzbnN2aG16b2hxbW1sdmpleHB1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDY2NDI1MTQsImV4cCI6MTk2MjIxODUxNH0.RaTg59kmRNNRQlfwFUhuOIzjbZujClUketfNBHRxEW8";

var supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
var node;
var maindiv = document.getElementById("id01");
var taskform = document.getElementById("to_do_form");
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
showTasks();

// show all tasks
top_button_all.addEventListener("click", async function (e) {
  e.preventDefault();
  document.getElementById("id01").innerHTML = "";
  showTasks();
});

// show completed tasks
top_button_complete.addEventListener("click", async function (e) {
  e.preventDefault();
  document.getElementById("id01").innerHTML = "";
  showCompletedTasks();
});

//Incompleted tasks

top_button_incomplete.addEventListener("click", async function (e) {
  e.preventDefault();
  document.getElementById("id01").innerHTML = "";
  showIncompletedTasks();
});

taskform.addEventListener("submit", async function (e) {
  e.preventDefault();

  // fetch query
  /* const { data, error } = await supabase.from("todo").select();
  console.log(data);
  h2.appendChild(document.createTextNode(data[0].name));
  document.getElementById("id01").appendChild(h2);
  console.log(h2); */
  // showTasks();
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
  if (taskInput.value.length === 0) {
    alert("Task can not be empty");
  } else {
    const { data, error } = await supabase
      .from("todo")
      .insert([{ name: taskInput.value }]);
    var x = document.getElementById("show");
    if (x.style.display === "block") {
      x.style.display = "none";
    }
    taskInput.value = "";
    print(data[0]); // print value
  }
});

function toggle() {
  var x = document.getElementById("show");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

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
      const { data, error } = await supabase
        .from("todo")
        .select()
        .like("name", `%${text}%`);
      console.log(data);
      document.getElementById("id01").innerHTML = "";
      data.map((e) => {
        print(e);
      });
    }
  });
}
// show tasks

async function showTasks() {
  loadMore.style = "display:block";
  loadIncompletedMore.style = "display:none";
  loadCompletedMore.style = "display:none";
  currentCompletedIndex = 0;
  currentIncompletedIndex = 0;
  const { data, error } = await supabase
    .from("todo")
    .select()
    .order("id", { ascending: true })
    .range(currentIndex, currentIndex + 5);
  data.map((e) => {
    print(e);
  });
}

function loadmore() {
  currentIndex += 6;
  showTasks();
}

// show completed tasks
async function showCompletedTasks() {
  loadMore.style = "display:none";
  loadIncompletedMore.style = "display:none";
  loadCompletedMore.style = "display:block";
  currentIncompletedIndex = 0;
  currentIndex = 0;

  const { data, error } = await supabase
    .from("todo")
    .select()
    .order("id", { ascending: true })
    .range(currentCompletedIndex, currentCompletedIndex + 5);

  data.map((e) => {
    console.log(e.name);
    if (e.completed_on !== null) print(e);
  });
}
function loadcompletedmore() {
  currentCompletedIndex += 6;
  showCompletedTasks();
}
// show Incompleted tasks
async function showIncompletedTasks() {
  loadMore.style = "display:none";
  loadCompletedMore.style = "display:none";
  loadIncompletedMore.style = "display:block";
  currentCompletedIndex = 0;
  currentIndex = 0;

  const { data, error } = await supabase
    .from("todo")
    .select()
    .is("completed_on", null)
    .order("id", { ascending: true })
    .range(currentIncompletedIndex, currentIncompletedIndex + 5);

  data.map((e) => {
    print(e);
  });
}
function loadincompletedmore() {
  currentIncompletedIndex += 6;
  showIncompletedTasks();
}
// complete
async function completed(e) {
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
}

function saved() {}

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
  var input = document.createElement("input");
  var h2 = document.createElement("h2");
  var complete_button = document.createElement("img");
  var edit_button = document.createElement("img");
  var delete_button = document.createElement("img");
  var save = document.createElement("button");
  edit_button.appendChild(document.createTextNode("edit"));
  complete_button.appendChild(document.createTextNode("complete"));
  delete_button.appendChild(document.createTextNode("delete"));
  save.appendChild(document.createTextNode("save"));
  // may be need in future
  /*  complete_button.value = e.id;
  edit_button.value = e.id;
  delete_button.value = e.id; */
  complete_button.src = "./images/tick.svg";
  complete_button.alt = "tick";
  edit_button.src = "./images/edit.svg";
  edit_button.alt = "edit";
  delete_button.src = "./images/vector.svg";
  delete_button.alt = "delete";
  var val = e.name;
  if (e.completed_on === null) {
    button_div.appendChild(save);
    button_div.appendChild(complete_button);
    button_div.appendChild(edit_button);
  }

  button_div.appendChild(delete_button);

  edit_button.onclick = function (e) {
    toggled(input, h2, edit_button, save);
  };

  complete_button.onclick = function (e) {
    button_div.removeChild(complete_button);
    button_div.removeChild(edit_button);
    completed(input);
    document.getElementById("id01").removeChild(div);
  };

  delete_button.onclick = function (e) {
    document.getElementById("id01").removeChild(div);
    deleted(input);
  };

  save.onclick = async function (e) {
    input.style = "display: none;";
    h2.style = "display: block";
    edit_button.style = "display: block;";
    save.style = "display: none";
    const { data, error } = await supabase
      .from("todo")
      .update({ name: input.value })
      .match({ id: input.id });

    h2.innerHTML = "";
    h2.appendChild(document.createTextNode(input.value));
  };

  h2.classList.add("card");
  h2.id = e.id;
  input.id = e.id;
  h2.value = e.name;
  input.value = e.name;
  input.style = "display: none;";
  h2.style = "display: block;";
  if (e.completed_on !== null) {
    h2.style = "color: green;text-decoration: line-through;";
  }
  edit_button.style = "display: block;";
  save.style = "display: none";
  h2.appendChild(document.createTextNode(e.name));
  div.classList = "divClass";
  div.appendChild(input);

  div.appendChild(h2);
  div.appendChild(button_div);
  document.getElementById("id01").appendChild(div);
  node = maindiv.childNodes;
}
