function generateImgHTML(year, month) {
  const figure = document.createElement("figure");
  figure.setAttribute("class", "image");

  const a = document.createElement("a");
  a.setAttribute(
    "href",
    "data/regularMeetingImg/" + year + "-" + month + ".png"
  );

  const img = document.createElement("img");
  img.setAttribute("class", "has-ratio");
  img.setAttribute(
    "src",
    "data/regularMeetingImg/" + year + "-" + month + ".png"
  );
  img.setAttribute("alt", month + "月の定例会スケジュール");
  img.setAttribute("onerror", "noImage(this);");

  a.appendChild(img);
  figure.appendChild(a);

  return figure;
}

function mountRegularLessonsIMGs() {
  const today = new Date();
  const todaysYear = today.getFullYear();
  const todaysMonth = today.getMonth() + 1;

  const div = document.createElement("div");
  div.appendChild(generateImgHTML(todaysYear, todaysMonth));

  window.addEventListener("load", function () {
    document.getElementById("regular_lessons_schedule").appendChild(div);
  });
}

function noImage(image) {
  image.onerror = "";
  image.src = "img/noimage.png";
  return true;
}
