var ulList = document.getElementById("toasted");
export function show(message, state) {
  var image = document.createElement("img");
  var li = document.createElement("div");
  if (state === "success") {
    image.src = "./images/success.svg";
    image.alt = "tick";
    li.appendChild(image);
  }
  li.appendChild(document.createTextNode(` ${message}`));
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
}
