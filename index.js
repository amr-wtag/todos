import supabase from "./server.js";
import { clearBody } from "./clear.js";
import {
  checkEmptyDB,
  topButtonAllSearch,
  topButtonIncompleteSearch,
  topButtonCompleteSearch,
  addTask,
  showTasksDB,
  showCompletedTasksDB,
  showIncompletedTasksDB,
} from "./dbCall.js";
import { showvalue } from "./showvalue.js";
import { show } from "./toast.js";

import { toggle } from "./toggleFunctions.js";

document.addEventListener("DOMContentLoaded", function () {
  var splash = document.getElementById("splash");

  var flag = "all";
  var datacount;
  var maindiv = document.getElementById("id01");
  var taskform = document.getElementById("toDoForm");
  var showForm = document.getElementById("showForm");
  var taskInput = document.getElementById("toDoInput");
  var addButton = document.getElementById("addButton");
  var deleteAdd = document.getElementById("deleteAdd");
  var search = document.getElementById("search");

  var topButtonAll = document.getElementById("topButtonAll");
  var topButtonComplete = document.getElementById("topButtonComplete");
  var topButtonIncomplete = document.getElementById("topButtonIncomplete");
  var searchValue = document.getElementById("searchInput");
  var loadMore = document.getElementById("loadMore");
  var loadCompletedMore = document.getElementById("loadCompletedMore");
  var loadIncompletedMore = document.getElementById("loadIncompletedMore");
  var currentIndex = 0;
  var currentCompletedIndex = 0;
  var currentIncompletedIndex = 0;
  var bigspin = document.getElementById("bigspin");

  search.addEventListener("click", searchToggle);
  loadMore.addEventListener("click", loadmore);
  loadCompletedMore.addEventListener("click", loadcompletedmore);
  loadIncompletedMore.addEventListener("click", loadincompletedmore);

  // check if database is empty
  async function checkEmpty() {
    try {
      datacount = await checkEmptyDB();
      localStorage.setItem("datacount", datacount);
      if (datacount === 0) {
        document.getElementById("emptyScreen").style = "display:block";
        loadMore.style = "display:none";
        topButtonAll.disabled = true;
        topButtonComplete.disabled = true;
        topButtonIncomplete.disabled = true;
        search.disabled = true;
      }
    } catch (e) {
      show(e, "Failed to fetch data");
    }
  }
  checkEmpty();
  topButtonAll.classList.add("aferclickShadow");
  showTasks();

  //clear body

  // show all tasks
  topButtonAll.addEventListener("click", async function (e) {
    topButtonAll.classList.add("aferclickShadow");
    topButtonComplete.classList.remove("aferclickShadow");
    topButtonIncomplete.classList.remove("aferclickShadow");
    e.preventDefault();
    flag = "all";
    currentIndex = 0;
    if (searchValue.style.display == "block") {
      loadMore.style = "display:none";
      loadIncompletedMore.style = "display:none";
      loadCompletedMore.style = "display:none";
      bigspin.style = "display:block";
      topButtonAll.disabled = true;
      topButtonComplete.disabled = true;
      topButtonIncomplete.disabled = true;
      maindiv.classList.add("blur");
      const data = await topButtonAllSearch(searchValue.value);
      clearBody();
      data.map((e) => {
        showvalue(e);
      });

      maindiv.classList.remove("blur");
      topButtonAll.disabled = false;
      topButtonComplete.disabled = false;
      topButtonIncomplete.disabled = false;
      bigspin.style = "display:none";
    } else if (searchValue.style.display == "none") {
      showTasks();
    }
  });

  // show completed tasks
  topButtonComplete.addEventListener("click", async function (e) {
    e.preventDefault();
    topButtonAll.classList.remove("aferclickShadow");
    topButtonComplete.classList.add("aferclickShadow");
    topButtonIncomplete.classList.remove("aferclickShadow");
    flag = "complete";
    currentCompletedIndex = 0;
    if (searchValue.style.display == "block") {
      loadMore.style = "display:none";
      loadIncompletedMore.style = "display:none";
      loadCompletedMore.style = "display:none";
      bigspin.style = "display:block";
      topButtonAll.disabled = true;
      topButtonComplete.disabled = true;
      topButtonIncomplete.disabled = true;
      maindiv.classList.add("blur");
      const data = await topButtonCompleteSearch(searchValue.value);
      clearBody();
      data.map((e) => {
        showvalue(e);
      });
      maindiv.classList.remove("blur");
      topButtonAll.disabled = false;
      topButtonComplete.disabled = false;
      topButtonIncomplete.disabled = false;
      bigspin.style = "display:none";
    } else if (searchValue.style.display == "none") {
      showCompletedTasks();
    }
  });

  //Incompleted tasks

  topButtonIncomplete.addEventListener("click", async function (e) {
    e.preventDefault();
    topButtonAll.classList.remove("aferclickShadow");
    topButtonComplete.classList.remove("aferclickShadow");
    topButtonIncomplete.classList.add("aferclickShadow");
    taskInput.style = "";
    flag = "incomplete";
    currentIncompletedIndex = 0;
    if (searchValue.style.display == "block") {
      loadMore.style = "display:none";
      loadIncompletedMore.style = "display:none";
      loadCompletedMore.style = "display:none";
      bigspin.style = "display:block";
      topButtonAll.disabled = true;
      topButtonComplete.disabled = true;
      topButtonIncomplete.disabled = true;
      maindiv.classList.add("blur");
      const data = await topButtonIncompleteSearch(searchValue.value);

      clearBody();
      data.map((e) => {
        showvalue(e);
      });
      maindiv.classList.remove("blur");
      topButtonAll.disabled = false;
      topButtonComplete.disabled = false;
      topButtonIncomplete.disabled = false;
      bigspin.style = "display:none";
    } else if (searchValue.style.display == "none") {
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
    // taskInput.value = taskInput.value.split("\n")[0];
    taskInput.value = taskInput.value.trim("\n");
    var spin = document.createElement("img");
    spin.src = "./images/bigspin.svg";
    spin.alt = "spin";
    spin.classList = "spinning rotateDiv";
    if (taskInput.value.length < 3) {
      show("Task length can not be less than 3", "error");
      taskInput.focus();
    } else if (keycount === 0) {
      taskInput.disabled = true;
      ++keycount;
      var addTodoField = document.getElementById("show");
      document.getElementById("emptyScreen").style = "display:none";
      spin.style = "display:block";
      document.getElementById("createspin").style = "display:block";
      deleteAdd.classList.add("blur");
      addButton.classList.add("blur");
      taskInput.classList.add("blur");
      try {
        const data = await addTask(taskInput.value);

        if (addTodoField.style.display === "block") {
          addTodoField.style.display = "none";
        }
        taskInput.value = "";
        datacount++;
        localStorage.setItem("datacount", datacount);
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

        if (flag !== "complete") await showvalue(data[0], 1); // showvalue value

        show("added", "success");
      } catch (e) {
        show(e, "error");
      }
      keycount = 0;
      taskInput.disabled = false;
    }
  });

  // add task after enter
  taskInput.onkeyup = async function (e) {
    e.preventDefault();
    if (e.key == "Enter" && keycount === 0) {
      ++keycount;
      // taskInput.value = taskInput.value.split("\n")[0]; //this may be used in future
      taskInput.value = taskInput.value.trim("\n");
      var spin = document.createElement("img");
      spin.src = "./images/bigspin.svg";
      spin.alt = "spin";
      spin.classList = "spinning rotateDiv";
      // addFlag = 1;
      if (taskInput.value.length < 3) {
        show("Task length can not be less than 3", "error");
        taskInput.focus();
        console.log(e.key);
      } else {
        var addTodoField = document.getElementById("show");
        document.getElementById("emptyScreen").style = "display:none";
        spin.style = "display:block";
        document.getElementById("createspin").style = "display:block";
        deleteAdd.classList.add("blur");
        addButton.classList.add("blur");
        taskInput.classList.add("blur");
        try {
          const data = await addTask(taskInput.value);
          taskInput.value = "";
          if (addTodoField.style.display === "block") {
            addTodoField.style.display = "none";
          }
          taskInput.value = "";
          document.getElementById("createspin").style = "display:none";
          datacount++;
          localStorage.setItem("datacount", datacount);
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

          if (flag !== "complete") await showvalue(data[0], 1); // showvalue value

          show("added", "success");
        } catch (e) {
          show(e, "error");
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

      if (searchChange === true && searchValue.value.length !== 0) {
        searchValue.value = null;
        searchChange = false;
        if (flag == "all") showTasks();
        else if (flag == "complete") showCompletedTasks();
        else showIncompletedTasks();
      }
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
  var searchChange = false;
  //search Input
  const keyupLog = async (e) => {
    e.preventDefault();
    const text = searchValue.value;
    var blur = maindiv;
    if (text.length > 2) {
      searchChange = true;
      loadMore.style = "display:none";
      loadIncompletedMore.style = "display:none";
      loadCompletedMore.style = "display:none";
      bigspin.style = "display:block";
      topButtonAll.disabled = true;
      topButtonComplete.disabled = true;
      topButtonIncomplete.disabled = true;
      blur.classList.add("blur");
      if (flag == "all") {
        const data = await topButtonAllSearch(searchValue.value);
        clearBody();
        data.map((e) => {
          showvalue(e);
        });
      } else if (flag == "complete") {
        const data = await topButtonCompleteSearch(searchValue.value);
        clearBody();
        data.map((e) => {
          showvalue(e);
        });
      } else {
        const data = await topButtonIncompleteSearch(searchValue.value);
        clearBody();

        data.map((e) => {
          showvalue(e);
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
      if (flag == "all") showTasks();
      else if (flag == "complete") showCompletedTasks();
      else showIncompletedTasks();
    }
    blur.classList.remove("blur");
  };
  searchValue.addEventListener("keyup", debounce(keyupLog, 500));
  // show tasks

  async function showTasks() {
    var addTodoField = document.getElementById("show");
    maindiv.classList.add("blur");

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
    const data = await showTasksDB(currentIndex);
    if (currentIndex === 0) clearBody();
    data.map((e) => {
      showvalue(e);
    });
    maindiv.classList.remove("blur");
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
    const data = await showCompletedTasksDB(currentCompletedIndex);
    if (currentCompletedIndex === 0) clearBody();
    data.map((e) => {
      showvalue(e);
    });
    maindiv.classList.remove("blur");
    bigspin.style = "display:none";
    topButtonAll.disabled = false;
    topButtonComplete.disabled = false;
    topButtonIncomplete.disabled = false;
    loadCompletedMore.style = "display:block";
    if (data.length < 6) {
      loadCompletedMore.style = "display:none";
      currentCompletedIndex = 0;
    }
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
    const data = await showIncompletedTasksDB(currentIncompletedIndex);
    if (currentIncompletedIndex === 0) clearBody();
    data.map((e) => {
      showvalue(e);
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
});
