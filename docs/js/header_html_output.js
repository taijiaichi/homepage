const xhr = new XMLHttpRequest(),
  method = "GET",
  url = "common_html/header.html";
const header = document.getElementById("header");

xhr.open(method, url, true);
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    const restxt = xhr.responseText;
    header.innerHTML = restxt;
  }
};
xhr.send();
