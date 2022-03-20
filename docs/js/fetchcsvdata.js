function fetchCommittee() {
  const req = new XMLHttpRequest();
  req.open("get", "data/committee.csv", true);
  req.send(null);

  req.onload = function () {
    parsedata = Papa.parse(req.responseText);

    const TBody = document.createElement("tbody");
    for (const element of parsedata.data) {
      const TR = document.createElement("tr");

      const Title = document.createElement("th");
      Title.appendChild(document.createTextNode(element[0]));

      const Name = document.createElement("td");
      Name.appendChild(document.createTextNode(element[1]));

      const Other = document.createElement("td");
      Other.appendChild(document.createTextNode("(" + element[2] + ")"));

      TR.appendChild(Title);
      TR.appendChild(Name);
      TR.appendChild(Other);

      TBody.appendChild(TR);
    }
    document.getElementById("committee").appendChild(TBody);
  };
}

function fetchRegularLessons() {
  const req = new XMLHttpRequest();
  req.open("get", "data/regularLessons.csv", true);
  req.send(null);

  const TBody = document.createElement("tbody");
  req.onload = function () {
    parsedata = Papa.parse(req.responseText);

    for (const week of ["日", "月", "火", "水", "木", "金", "土"]) {
      dataFilteredByWeek = parsedata.data.filter(
        (element) => element[0] === week
      );

      if (dataFilteredByWeek.length === 0) {
        continue;
      }

      const TR1 = document.createElement("tr");
      TR1.setAttribute("class", "week");

      const TH11 = document.createElement("th");
      TH11.setAttribute("class", "is-hidden-touch");
      TH11.setAttribute("colspan", "5");
      TH11.innerHTML = week + "曜日";
      TR1.appendChild(TH11);

      const TH12 = document.createElement("th");
      TH12.setAttribute("class", "is-hidden-desktop");
      TH12.innerHTML = week + "曜日";
      TR1.appendChild(TH12);

      TBody.appendChild(TR1);

      const TR2 = document.createElement("tr");
      TR2.setAttribute("class", "caption is-hidden-touch");

      const TH21 = document.createElement("th");
      TH21.setAttribute("class", "time");
      TH21.innerHTML = "時間";
      TR2.appendChild(TH21);

      const TH22 = document.createElement("th");
      TH22.setAttribute("class", "name");
      TH22.innerHTML = "競技";
      TR2.appendChild(TH22);

      const TH23 = document.createElement("th");
      TH23.setAttribute("class", "instructor");
      TH23.innerHTML = "講師";
      TR2.appendChild(TH23);

      const TH24 = document.createElement("th");
      TH24.setAttribute("class", "about");
      TH24.innerHTML = "内容";
      TR2.appendChild(TH24);

      const TH25 = document.createElement("th");
      TH25.setAttribute("class", "clerk");
      TH25.innerHTML = "事務担当";
      TR2.appendChild(TH25);

      TBody.appendChild(TR2);

      for (const element of dataFilteredByWeek) {
        const TR = document.createElement("tr");
        TR.setAttribute("class", "lesson");

        const TD1 = document.createElement("td");
        TD1.setAttribute("class", "time is-hidden-touch");
        TD1.innerHTML = element[1];
        TR.appendChild(TD1);

        const TD2 = document.createElement("td");
        TD2.setAttribute("class", "name is-hidden-touch");
        TD2.innerHTML = element[2];
        TR.appendChild(TD2);

        const TD3 = document.createElement("td");
        TD3.setAttribute("class", "instructor is-hidden-touch");
        TD3.innerHTML = element[3].split("/").join("<br />");
        TR.appendChild(TD3);

        const TD4 = document.createElement("td");
        TD4.setAttribute("class", "about");
        TD4.innerHTML =
          '<span class="is-hidden-desktop">' +
          "時間 : " +
          element[1] +
          "<br />" +
          "競技 : " +
          element[2] +
          "<br />" +
          "講師 : " +
          element[3].split("/").join("・") +
          "<br />" +
          "事務担当 : " +
          element[5] +
          "<br />" +
          "内容 :<br />" +
          "</span>" +
          element[4];
        TR.appendChild(TD4);

        const TD5 = document.createElement("td");
        TD5.setAttribute("class", "instructor is-hidden-touch");
        TD5.innerHTML = element[5];
        TR.appendChild(TD5);

        TBody.appendChild(TR);
      }
    }
    document.getElementById("regular-lesson").appendChild(TBody);
  };
}

function fetchOtherLessons() {
  const req = new XMLHttpRequest();
  req.open("get", "data/otherLessons.csv", true);
  req.send(null);

  const TBody = document.createElement("tbody");
  req.onload = function () {
    parsedata = Papa.parse(req.responseText);

    const cities = [...new Set(parsedata.data.map((x) => x[0]))];
    for (const city of cities) {
      dataFilteredByCity = parsedata.data.filter(
        (element) => element[0] === city
      );

      if (dataFilteredByCity.length === 0) {
        continue;
      }

      const TR1 = document.createElement("tr");
      TR1.setAttribute("class", "city");

      const TH11 = document.createElement("th");
      TH11.setAttribute("class", "is-hidden-touch");
      TH11.setAttribute("colspan", "6");
      TH11.innerHTML = city;
      TR1.appendChild(TH11);

      const TH12 = document.createElement("th");
      TH12.setAttribute("class", "is-hidden-desktop");
      TH12.innerHTML = city;
      TR1.appendChild(TH12);

      TBody.appendChild(TR1);

      const TR2 = document.createElement("tr");
      TR2.setAttribute("class", "caption is-hidden-touch");

      const TH21 = document.createElement("th");
      TH21.setAttribute("class", "week");
      TH21.innerHTML = "曜日";
      TR2.appendChild(TH21);

      const TH22 = document.createElement("th");
      TH22.setAttribute("class", "time");
      TH22.innerHTML = "時間";
      TR2.appendChild(TH22);

      const TH23 = document.createElement("th");
      TH23.setAttribute("class", "name");
      TH23.innerHTML = "教室名・講座名";
      TR2.appendChild(TH23);

      const TH24 = document.createElement("th");
      TH24.setAttribute("class", "location");
      TH24.innerHTML = "会場";
      TR2.appendChild(TH24);

      const TH25 = document.createElement("th");
      TH25.setAttribute("class", "event");
      TH25.innerHTML = "種目内容";
      TR2.appendChild(TH25);

      const TH26 = document.createElement("th");
      TH26.setAttribute("class", "instructor");
      TH26.innerHTML = "講師";
      TR2.appendChild(TH26);

      TBody.appendChild(TR2);

      for (const element of dataFilteredByCity) {
        const TR = document.createElement("tr");
        TR.setAttribute("class", "lesson");

        const TD1 = document.createElement("td");
        TD1.setAttribute("class", "week is-hidden-touch");
        TD1.innerHTML = element[1];
        TR.appendChild(TD1);

        const TD2 = document.createElement("td");
        TD2.setAttribute("class", "time is-hidden-touch");
        TD2.innerHTML = element[2];
        TR.appendChild(TD2);

        const TD3 = document.createElement("td");
        TD3.setAttribute("class", "name is-hidden-touch");
        TD3.innerHTML = element[3];
        TR.appendChild(TD3);

        const TD4 = document.createElement("td");
        TD4.setAttribute("class", "location is-hidden-touch");
        TD4.innerHTML = element[4];
        TR.appendChild(TD4);

        const TD5 = document.createElement("td");
        TD5.setAttribute("class", "event is-hidden-touch");
        TD5.innerHTML = element[5];
        TR.appendChild(TD5);

        const TD6 = document.createElement("td");
        TD6.setAttribute("class", "instructor is-hidden-touch");
        TD6.innerHTML = element[6].split("/").join("<br />");
        TR.appendChild(TD6);

        const TD7 = document.createElement("td");
        TD7.setAttribute("class", "about is-hidden-desktop");
        TD7.innerHTML =
          "曜日 : " +
          element[1] +
          "<br />" +
          "時間 : " +
          element[2] +
          "<br />" +
          "教室名・講座名 : " +
          element[3] +
          "<br />" +
          "会場 : " +
          element[4] +
          "<br />" +
          "種目内容 : " +
          element[5] +
          "<br />" +
          "講師 : " +
          element[6].split("/").join("<br />") +
          "<br />";
        TR.appendChild(TD7);

        TBody.appendChild(TR);
      }
    }

    document.getElementById("other-lesson").appendChild(TBody);
  };
}

function fetchActivities() {
  const req = new XMLHttpRequest();
  req.open("get", "data/activities.csv", true);
  req.send(null);

  req.onload = function () {
    parsedata = Papa.parse(req.responseText);

    events = parsedata.data.map((x) => {
      return {
        start: x[0],
        end: x[0],
        day: x[0],
        organaizer: x[1],
        title: x[2],
        location: x[3],
        description: x[4],
      };
    });

    var calendarEl = document.getElementById("activity-calendar");
    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: "dayGridMonth",
      buttonText: { today: "今日の日付" },
      events: events,
      eventClick: function (info) {
        alert(
          "日付 : " +
            info.event.extendedProps.day +
            "\n" +
            "主催 : " +
            info.event.extendedProps.organaizer +
            "\n" +
            "行事名 : " +
            info.event.title +
            "\n" +
            "会場 : " +
            info.event.extendedProps.location +
            "\n" +
            "詳細 : " +
            info.event.extendedProps.description
        );
      },
    });

    calendar.setOption("locale", "jp");
    calendar.render();
  };
}
