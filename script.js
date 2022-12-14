const year = 2022;

const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Setiembre",
  "Octubre",
  "Noviembre",
  "Diciembre"
];

const days = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado"
]

let monthIndex = 0;
generateMonth(monthIndex);

// constructs month selector
const monthSelector = document.querySelector('#select-month');
let monthSelections = "";
monthSelections += `
  <select id="months-selector" onChange="handleMonthSelect(this.value)">`
for (let i = 0; i < months.length; i++) {
  monthSelections += `
  <option id="month" value=${i}>${months[i]}</option>
  `
}
monthSelections += `</select>`;
const monthNode = fromStringToNode(monthSelections);
monthSelector.appendChild(monthNode);


function generateMonth(monthIndex) {
  const gridEl = document.querySelector("#grid-container");
  // blank out to overwrite
  gridEl.innerHTML = "";
  let gridItems = "";

  // (1). iterate through days
  for (let i = 0; i < days.length; i++) {
    gridItems += `<div class="grid-item days">${days[i]}</div>`;
  };

  // (2). blank space if needed
  const firstDayOfMonth = new Date(year, monthIndex, 1).getDay();
  if (firstDayOfMonth !== 0) {
    gridItems += `<div style="grid-column: 1 / ${firstDayOfMonth + 1}"></div>`;
  };

  // (3). loads the numbers of dates of the month
  let lastDateOfMonth = new Date(year, monthIndex + 1, 0).getDate();
  for (let i = 1; i <= lastDateOfMonth; i++) {
    gridItems += `
    <div class="grid-item dates">
      <div id="date-${i}" class="date-label">${i}</div>
      <div class="date-events"></div>
    </div>
    `
  };

  const node = fromStringToNode(gridItems);
  gridEl.appendChild(node);


  // Add event listeners for each date
  const datesElements = document.querySelectorAll(".dates");
  datesElements.forEach((dateEl) => {
    dateEl.addEventListener("click", () => {
      showAddEventDialog(dateEl);
    });
  });

  // Blanks out the side panel per month
  const sidePanelEventEl = document.getElementById("events-container");
  sidePanelEventEl.innerHTML = ""
}


function handleMonthSelect(index) {
  const _index = parseInt(index, 10)

  monthIndex = _index;

  generateMonth(_index)
}


function showAddEventDialog(dateEl) {
  const dialogEl = document.getElementById("dialog-window");

  dialogEl.style.display = "block";

  const formEl = document.getElementById('add-event-form');
  const date = dateEl.querySelector(".date-label").innerText;


  formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    const description = e.target[1].value;

    // const date = dateEl.querySelector(".date-label").innerText;
    const sidePanelEventEl = document.getElementById("events-container");
    const dateEventsEl = dateEl.querySelector(".date-events");
    let emojiStr = "";
    let sidePanelShowEvent = "";

    let emojiIndex = e.target[0].value;

    // constructs html depending on emoji
    if (emojiIndex == 0) {
      emojiStr = `
      <div class="event-container">
        <span class="event-icon">🎂${description}</span>
      </div>`;

      sidePanelShowEvent = `
      <div>
        <span>${date}/${monthIndex + 1}/${year} - 🎂${description}</span>
      </div>
      `

    } else if (emojiIndex == 1) {
      emojiStr = `
      <div class="event-container">
        <span class="event-icon">💃🏻${description}</span>
      </div>`;

      sidePanelShowEvent = `
      <div>
        <span>${date}/${monthIndex + 1}/${year} - 💃🏻${description}</span>
      </div>
      `

    } else if (emojiIndex == 2) {
      emojiStr = `
      <div class="event-container">
        <span class="event-icon">💼${description}</span>
      </div>`;

      sidePanelShowEvent = `
      <div>
        <span>${date}/${monthIndex + 1}/${year} - 💼${description}</span>
      </div>
      `

    } else if (emojiIndex == 3) {
      emojiStr = `
      <div class="event-container">
        <span class="event-icon">🌎${description}</span>
      </div>`;

      sidePanelShowEvent = `
      <div>
        <span>${date}/${monthIndex + 1}/${year} - 🌎${description}</span>
      </div>
      `

    } else {
      emojiStr = `
      <div class="event-container">
        <span class="event-icon">🦙${description}</span>
      </div>`;

      sidePanelShowEvent = `
      <div>
        <span>${date}/${monthIndex + 1}/${year} - 🦙${description}</span>
      </div>
      `
    };

    const emojiNode = fromStringToNode(emojiStr);
    dateEventsEl.appendChild(emojiNode);

    const sideEventNode = fromStringToNode(sidePanelShowEvent);
    sidePanelEventEl.appendChild(sideEventNode);

    // resets text input
    e.target[1].value = "";

    // closes dialog when submited
    closeDialog();
  })
}


function closeDialog() {
  const dialogEl = document.getElementById("dialog-window");
  dialogEl.style.display = "none";
  const inputDetail = document.getElementById("event-detail");
  inputDetail.value = "";
}


function fromStringToNode(string) {
  let template = document.createElement("template");
  template.innerHTML = string.trim();
  return template.content;
}
