const xhr = new XMLHttpRequest(),
  method = "GET",
  url = "../common_html/header.html";

xhr.open(method, url, true);
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    const restxt = xhr.responseText;
    document.write(restxt);
  }
};
xhr.send();
