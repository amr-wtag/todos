var maindiv = document.getElementById("id01");
export function clearBody() {
  var count = maindiv.childElementCount;
  for (var i = 1; i < count; i++) {
    maindiv.removeChild(maindiv.children[1]);
  }
}
