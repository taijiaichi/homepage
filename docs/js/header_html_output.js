const xhr = new XMLHttpRequest(),
  method = "GET",
  url = "common_html/header.html";
const header = document.getElementById("header"); //読み込みたい位置を指定

xhr.open(method, url, true);
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    const restxt = xhr.responseText;
    document.write(restxt);
  }
};
xhr.send();
