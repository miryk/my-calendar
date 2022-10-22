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

  // Blanks out the side panel
  const sidePanelEventEl = document.getElementById("events-container");
  sidePanelEventEl.innerHTML = ""
}


function handleMonthSelect(index) {
  const _index = parseInt(index, 10)

  monthIndex = _index;
  console.log(monthIndex)

  generateMonth(_index)
}


function showAddEventDialog(dateEl) {
  const dialogEl = document.getElementById("dialog-window");
  const date = dateEl.querySelector(".date-label").innerText;

  dialogEl.style.display = "block";

  const formEl = document.getElementById('add-event-form');
  
  
  formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    const description = e.target[1].value
    
    const sidePanelEventEl = document.getElementById("events-container");
    const dateEventsEl = dateEl.querySelector(".date-events");
    let emojiStr = "";
    let sidePanelShowEvent = "";

        let emojiIndex = e.target[0].value;

    if (emojiIndex == 0) {
      emojiStr = `
      <div class="event-container">
        <span class="event-icon">🎂${description}</span>
      </div>`;

      sidePanelShowEvent= `
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
    

  
    closeDialog();
  })
}


function closeDialog() {
  const dialogEl = document.getElementById("dialog-window");
  dialogEl.style.display = "none";
}


function fromStringToNode(string) {
  let template = document.createElement("template");
  template.innerHTML = string.trim();
  return template.content;
}
