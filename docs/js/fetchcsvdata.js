function sortedByWeek(rawdata) {
  const sortedData = {};
  for (const week of ["日", "月", "火", "水", "木", "金", "土"]) {
    dayOfTheWeek = rawdata.filter((element) => element["曜日"] === week);
    sortedData[week] = dayOfTheWeek;
  }
  return sortedData;
}

function sortedByStartYearMonth(rawdata) {
  const sortedData = {};
  const setOfStartYearMonth = [
    ...new Set(
      rawdata.map((element) => element["開始年"] + "/" + element["開始月"])
    ),
  ];
  for (const yearmonth of setOfStartYearMonth) {
    dayOfTheStartYearAndMonth = rawdata.filter(
      (element) => element["開始年"] + "/" + element["開始月"] === yearmonth
    );
    sortedData[yearmonth] = dayOfTheStartYearAndMonth;
  }
  return [sortedData, setOfStartYearMonth];
}

function generateRegularClassHTMLBySortedData(data) {
  const wrapper = document.createElement("div");
  wrapper.setAttribute("class", "generated_data");

  for (const week of ["日", "月", "火", "水", "木", "金", "土"]) {
    if (data[week].length === 0) {
      continue;
    }
    {
      const currentweek = document.createElement("dev");
      currentweek.setAttribute("class", "week");

      {
        const weekTitle = document.createElement("h3");
        weekTitle.setAttribute("class", "week_title");
        weekTitle.innerHTML = week + "曜日";

        currentweek.appendChild(weekTitle);
      }
      for (const classroom of data[week]) {
        const currentClass = document.createElement("div");
        currentClass.setAttribute("class", "classroom");
        {
          const classTitle = document.createElement("h4");
          classTitle.setAttribute("class", "class_title");
          classTitle.innerHTML =
            "●" +
            classroom["種目名"] +
            "<br>" +
            '<span class="start_end_time">' +
            classroom["開始時間"] +
            "～" +
            classroom["終了時間"] +
            "</span>";
          currentClass.appendChild(classTitle);
        }
        {
          const classDetail = document.createElement("p");
          classDetail.setAttribute("class", "class_detail");
          classDetail.innerHTML = classroom["説明"];
          currentClass.appendChild(classDetail);
        }
        {
          const instructor = document.createElement("div");
          instructor.setAttribute("class", "instructor");
          instructor.innerHTML = "●講師 :" + classroom["講師"];
          currentClass.appendChild(instructor);
        }
        {
          const venue = document.createElement("div");
          venue.setAttribute("class", "venue");
          venue.innerHTML = "●会場 :" + classroom["会場"];
          currentClass.appendChild(venue);
        }
        {
          const office = document.createElement("div");
          office.setAttribute("class", "office");
          office.innerHTML = "●事務担当 :" + classroom["事務担当"];
          currentClass.appendChild(office);
        }
        currentweek.appendChild(currentClass);
      }
      wrapper.appendChild(currentweek);
    }
  }
  return wrapper;
}

function generateAnnualEventsPCHTMLBySortedData(data, setOfStartYearMonth) {
  const weekday = ["日", "月", "火", "水", "木", "金", "土"];
  const table = document.createElement("table");
  table.setAttribute(
    "class",
    "generated_data table is-bordered is-hidden-touch"
  );

  {
    const thead = document.createElement("thead");
    const tr = document.createElement("tr");

    const th_month = document.createElement("th");
    th_month.innerHTML = "月";
    tr.appendChild(th_month);

    const th_day = document.createElement("th");
    th_day.innerHTML = "日";
    tr.appendChild(th_day);

    const th_event_name = document.createElement("th");
    th_event_name.innerHTML = "行事名";
    tr.appendChild(th_event_name);

    const th_event_organizer = document.createElement("th");
    th_event_organizer.innerHTML = "主催";
    tr.appendChild(th_event_organizer);

    const th_event_place = document.createElement("th");
    th_event_place.innerHTML = "会場";
    tr.appendChild(th_event_place);
    thead.appendChild(tr);

    table.appendChild(thead);
  }

  {
    const tbody = document.createElement("tbody");

    for (const yearmonth of setOfStartYearMonth) {
      const number_of_events_on_month = data[yearmonth].length;
      let is_first_event_of_month = true;

      for (const event of data[yearmonth]) {
        console.log(event);
        const startDate = new Date(
          event["開始年"],
          parseInt(event["開始月"], 10) - 1,
          event["開始日"]
        );
        const endDate = new Date(
          event["終了年"],
          parseInt(event["終了月"], 10) - 1,
          event["終了日"]
        );
        const tr = document.createElement("tr");

        if (is_first_event_of_month) {
          const td_month = document.createElement("td");
          td_month.innerHTML = yearmonth;
          td_month.setAttribute("rowspan", number_of_events_on_month);
          tr.appendChild(td_month);

          is_first_event_of_month = false;
        }

        const td_day = document.createElement("td");
        let dateinfo = "";
        if (startDate.valueOf() === endDate.valueOf()) {
          dateinfo =
            startDate.getDate() + "(" + weekday[startDate.getDay()] + ")";
        } else if (startDate.getMonth() === endDate.getMonth()) {
          dateinfo =
            startDate.getDate() +
            "(" +
            weekday[startDate.getDay()] +
            ") ～ " +
            endDate.getDate() +
            "(" +
            weekday[endDate.getDay()] +
            ")";
        } else {
          dateinfo =
            startDate.getDate() +
            "(" +
            weekday[startDate.getDay()] +
            ") ～ " +
            (endDate.getMonth() + 1) +
            "/" +
            endDate.getDate() +
            "(" +
            weekday[endDate.getDay()] +
            ")";
        }
        td_day.innerHTML = dateinfo;
        tr.appendChild(td_day);

        const td_event_name = document.createElement("td");
        td_event_name.innerHTML = event["行事名"];
        tr.appendChild(td_event_name);

        const td_event_organizer = document.createElement("td");
        td_event_organizer.innerHTML = event["主催"];
        tr.appendChild(td_event_organizer);

        const td_event_location = document.createElement("td");
        td_event_location.innerHTML = event["会場"];
        tr.appendChild(td_event_location);

        tbody.appendChild(tr);
      }
    }
    table.appendChild(tbody);
  }

  return table;
}

function generateAnnualEventsMobileHTMLBySortedData(data, setOfStartYearMonth) {
  const weekday = ["日", "月", "火", "水", "木", "金", "土"];
  const wrapper = document.createElement("div");
  wrapper.setAttribute("class", "generated_data is-hidden-desktop");

  for (const yearmonth of setOfStartYearMonth) {
    const currentmonth = document.createElement("div");
    currentmonth.setAttribute("class", "month");
    {
      const monthTitle = document.createElement("h3");
      monthTitle.setAttribute("class", "month_title");
      monthTitle.innerHTML = yearmonth;

      currentmonth.appendChild(monthTitle);
    }
    for (const event of data[yearmonth]) {
      const startDate = new Date(
        event["開始年"],
        parseInt(event["開始月"], 10) - 1,
        event["開始日"]
      );
      const endDate = new Date(
        event["終了年"],
        parseInt(event["終了月"], 10) - 1,
        event["終了日"]
      );

      const currentEvent = document.createElement("div");
      currentEvent.setAttribute("class", "event");

      {
        const eventTitle = document.createElement("p");
        eventTitle.setAttribute("class", "event_title");

        let dateinfo = "";
        if (startDate.valueOf() === endDate.valueOf()) {
          dateinfo =
            startDate.getDate() + "(" + weekday[startDate.getDay()] + ")";
        } else if (startDate.getMonth() === endDate.getMonth()) {
          dateinfo =
            startDate.getDate() +
            "(" +
            weekday[startDate.getDay()] +
            ") ～ " +
            endDate.getDate() +
            "(" +
            weekday[endDate.getDay()] +
            ")";
        } else {
          dateinfo =
            startDate.getDate() +
            "(" +
            weekday[startDate.getDay()] +
            ") ～ " +
            (endDate.getMonth() + 1) +
            "/" +
            endDate.getDate() +
            "(" +
            weekday[endDate.getDay()] +
            ")";
        }
        eventTitle.innerHTML = dateinfo;
        currentEvent.appendChild(eventTitle);
      }
      {
        const eventInfo = document.createElement("p");
        eventInfo.setAttribute("class", "event_info");
        eventInfo.innerHTML =
          '行事名 : <span class="event_name">' +
          event["行事名"] +
          "</span><br>主催 : " +
          event["主催"] +
          "<br>会場 : " +
          event["会場"];
        currentEvent.appendChild(eventInfo);
      }
      currentmonth.appendChild(currentEvent);
    }
    wrapper.appendChild(currentmonth);
  }
  return wrapper;
}

function generateCommitteesMobileHTML(data) {
  const wrapper = document.createElement("div");
  wrapper.setAttribute("class", "generated_data is-hidden-desktop");

  for (const person of data) {
    const commitee = document.createElement("div");
    commitee.setAttribute("class", "commitee");
    commitee.innerHTML =
      '<div class="job_title">' +
      person["役職"] +
      '</div><div class="name">' +
      person["名前"] +
      '</div><div class="sub-organ">' +
      person["所属"] +
      "</div>";

    wrapper.appendChild(commitee);
  }
  return wrapper;
}

function generateCommitteesPCHTML(data) {
  const table = document.createElement("table");
  table.setAttribute(
    "class",
    "generated_data table is-bordered is-striped is-hidden-touch"
  );
  const tbody = document.createElement("tbody");

  for (const person of data) {
    const tr = document.createElement("tr");

    const td_job = document.createElement("td");
    td_job.innerHTML = person["役職"];
    tr.appendChild(td_job);

    const td_name = document.createElement("td");
    td_name.innerHTML = person["名前"];
    tr.appendChild(td_name);

    const td_sub_organ = document.createElement("td");
    td_sub_organ.innerHTML = person["所属"];
    tr.appendChild(td_sub_organ);

    tbody.appendChild(tr);
  }
  table.appendChild(tbody);

  return table;
}

function mountTaichiLessonsHTMLTable() {
  const req = new XMLHttpRequest();
  req.open("get", "data/taichiLessons.csv", true);
  req.send(null);

  req.onload = function () {
    parsedata = Papa.parse(req.responseText, { header: true, skipEmptyLines: true });
    sorteddata = sortedByWeek(parsedata.data);

    div = generateRegularClassHTMLBySortedData(sorteddata);
    document.getElementById("taichi-lesson").appendChild(div);
  };
}

function mountTyokenLessonsHTMLTable() {
  const req = new XMLHttpRequest();
  req.open("get", "data/tyokenLessons.csv", true);
  req.send(null);

  req.onload = function () {
    parsedata = Papa.parse(req.responseText, { header: true, skipEmptyLines: true });
    sorteddata = sortedByWeek(parsedata.data);

    div = generateRegularClassHTMLBySortedData(sorteddata);
    document.getElementById("tyoken-lesson").appendChild(div);
  };
}

function mountAnnualEventsHTMLTable() {
  const req = new XMLHttpRequest();
  req.open("get", "data/annualEvents.csv", true);
  req.send(null);

  req.onload = function () {
    parsedata = Papa.parse(req.responseText, { header: true, skipEmptyLines: true });
    let [sorteddata, setOfStartYearMonth] = sortedByStartYearMonth(
      parsedata.data
    );

    div = generateAnnualEventsMobileHTMLBySortedData(
      sorteddata,
      setOfStartYearMonth
    );
    document.getElementById("annual-events").appendChild(div);

    table = generateAnnualEventsPCHTMLBySortedData(
      sorteddata,
      setOfStartYearMonth
    );
    document.getElementById("annual-events").appendChild(table);
  };
}

function mountCommitteesHTML() {
  const req = new XMLHttpRequest();
  req.open("get", "data/committee.csv", true);
  req.send(null);

  req.onload = function () {
    parsedata = Papa.parse(req.responseText, { header: true, skipEmptyLines: true });

    div = generateCommitteesMobileHTML(parsedata.data);
    document.getElementById("commitees").appendChild(div);

    table = generateCommitteesPCHTML(parsedata.data);
    document.getElementById("commitees").appendChild(table);
  };
}
