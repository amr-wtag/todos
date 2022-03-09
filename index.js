// const { add } = require("nodemon/lib/rules");

var SUPABASE_URL = "https://csnsvhmzohqmmlvjexpu.supabase.co";
var SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzbnN2aG16b2hxbW1sdmpleHB1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDY2NDI1MTQsImV4cCI6MTk2MjIxODUxNH0.RaTg59kmRNNRQlfwFUhuOIzjbZujClUketfNBHRxEW8";

var supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

var taskform = document.getElementById("to_do_form");
var taskInput = document.getElementById("to_do_input");
var add_button = document.getElementById("add_button");
var delete_add = document.getElementById("delete_add");
var complete = document.getElementById("complete");
var edit = document.getElementById("edit");
var delete_task = document.getElementById("delete_task");
var h2 = document.getElementById("id01");
showTasks();
/* taskform && */
taskform.addEventListener("submit", async function (e) {
  e.preventDefault();

  //console.log(e);
  /* if (document.getElementById("add_button") == e.target) {
    console.log("add_button");
  } */
  /* insert query */
  /*  */

  // fetch query
  /* const { data, error } = await supabase.from("todo").select();
  console.log(data);
  h2.appendChild(document.createTextNode(data[0].name));
  document.getElementById("id01").appendChild(h2);
  console.log(h2); */
  // showTasks();
});

// add value
add_button.addEventListener("click", async function (e) {
  //e.preventDefault();
  if (taskInput.value.length === 0) {
    alert("Task can not be empty");
  } else {
    const { data, error } = await supabase
      .from("todo")
      .insert([{ name: taskInput.value }]);
    taskInput.value = "";
    print(data[0]);
  }
});

function toggle() {
  var x = document.getElementById("show");
  //console.log(x.style.display);
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

async function showTasks() {
  const { data, error } = await supabase
    .from("todo")
    .select()
    .order("id", { ascending: true });
  // console.log(data);
  //console.log(data);
  data.map((e) => {
    var div = document.createElement("div");
    var input = document.createElement("input");
    var h2 = document.createElement("h2");
    //h2.id = e.id;
    div.onclick = function (e) {
      toggled(input);
    };
    print(e);
    //h2.append(document.createTextNode("onclick='toggle()'"));
    /* h2.classList.add("card");
    h2.id = e.id;
    input.id = e.id;
    h2.value = e.name;
    input.value = e.name;
    input.style = "display: none;";
    // h2.elementList.add("onclick='toggle()'");
    // h2.insertAdjacentElement("onclick", "toggle()");
    h2.appendChild(document.createTextNode(e.name));
    div.appendChild(input);
    div.appendChild(h2);
    //console.log(h2);
    document.getElementById("id01").appendChild(div); */
  });
}
// completed
async function completed(e) {
  /* var tab = e.split("-");
  var id = tab[1]; */
  //var x = document.getElementById("show");

  const { data, error } = await supabase
    .from("todo")
    .update({ completed_on: new Date(Date.now()) })
    .match({ id: e.id });
}

// delete
async function deleted(e) {
  /* var tab = e.split("-");
  var id = tab[1]; */
  //var x = document.getElementById("show");

  const { data, error } = await supabase
    .from("todo")
    .delete()
    .match({ id: e.id });
}

function saved() {}

function toggled(input, h2, edit_button, save) {
  /* var tab = e.split("-");
  var id = tab[1]; */
  //var x = document.getElementById("show");
  //console.log(x.style.display);
  //console.log(input.style.display);
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
  // console.log(e.id);
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
  // console.log(button_div);

  edit_button.onclick = function (e) {
    //console.log(input.display);
    toggled(input, h2, edit_button, save);
    //console.log(div);
  };
  complete_button.onclick = function (e) {
    // console.log("completed");
    button_div.removeChild(complete_button);
    button_div.removeChild(edit_button);
    completed(input);
  };

  delete_button.onclick = function (e) {
    document.getElementById("id01").removeChild(div);
    deleted(input);
  };

  save.onclick = async function (e) {
    //console.log(input.value);
    input.style = "display: none;";
    h2.style = "display: block;";
    edit_button.style = "display: block;";
    save.style = "display: none";
    const { data, error } = await supabase
      .from("todo")
      .update({ name: input.value })
      .match({ id: input.id });
    /* console.log(h2);
    // */
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
  edit_button.style = "display: block;";
  save.style = "display: none";
  //if (e.completed_on !== null) input.display.color = "green";
  // h2.elementList.add("onclick='toggle()'");
  // h2.insertAdjacentElement("onclick", "toggle()");
  h2.appendChild(document.createTextNode(e.name));
  div.appendChild(input);

  div.appendChild(h2);
  div.appendChild(button_div);
  //console.log(button.value);
  document.getElementById("id01").appendChild(div);
}
