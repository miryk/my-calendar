// set year 2022, for now just 2022 hardcoded
const year = 2022;

// set month (dropdown select from array)
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
  "Diciembre",
];

const days = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

const monthIndex = 9; // October

let gridItems = "";

// Step (1). Add day labels
for (let i = 0; i < days.length; i++) {
  gridItems += `<div class="grid-item days">${days[i]}</div>`;
}

// Step (2). Add empty offset dates (if necessary)
// if `firstDayOfMonth` is not equal 0, it means
// that the day is not Sunday. So, we don't need
// to generate any empty (offset) date for our calendar.
const firstDayOfMonth = new Date(year, monthIndex, 1).getDay();
if (firstDayOfMonth !== 0) {
  gridItems += `<div style="grid-column: 1 / ${firstDayOfMonth + 1}"></div>`;
}

// Step (3). Add dates
let lastDateOfMonth = new Date(year, monthIndex + 1, 0).getDate();
for (let i = 1; i <= lastDateOfMonth; i++) {
  gridItems += `
    <div class="grid-item dates">
      <div id="date-${i}" class="date-label">${i}</div>
      <div class="date-events"></div>
    </div>
  `;
}

// Step (4). Add all items to grid
const node = fromStringToNode(gridItems);
const gridEl = document.getElementById("grid-container");
gridEl.appendChild(node);

// Step (5). Add event listeners for each date
const datesElements = document.querySelectorAll(".dates");
datesElements.forEach((dateEl) => {
  dateEl.addEventListener("click", () => {
    showAddEventDialog(dateEl);
  });
});

function showAddEventDialog(dateEl) {
  const dialogContainerEl = document.getElementById("pop-window");

  if (
    !dialogContainerEl.getAttribute("style", "display") ||
    dialogContainerEl.getAttribute("style", "display") == "display:none"
  ) {
    const date = dateEl.querySelector(".date-label").innerText;

    const dialog = `
      <div>
        <button id="exit-button" onClick="closeWindow()">&times</button>
          <form id="add-event-form" autocomplete="off">
            <h3>Nuevo Evento<h3>
            <h4 style="color: blue" id="event-date">${date}/${months[monthIndex]}/${year}</h4>
            <input value="${date}/${monthIndex}/${year}" hidden>
            <label for="event">Asunto:</label>
            <input type="text" id="event" placeholder="Cumpleaños de mamá">
            <button type="submit" id="submit-button">Cargar</button>
          </form>
      </div>
    `;

    const node = fromStringToNode(dialog);
    dialogContainerEl.appendChild(node);

    // after adding the dialog content, we must display it (container)!
    // dialog container is hidden by default
    dialogContainerEl.setAttribute("style", "display: block");

    let formEl = document.getElementById("add-event-form");
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();

      const date = e.target[0].value;
      const description = e.target[1].value;

      // clear input
      e.target[1].value = "";

      // append new event to date
      const icon = `<span class="event-icon">🎂${description}</span>`;
      const node = fromStringToNode(icon);

      const dateEventsEl = dateEl.querySelector(".date-events");
      dateEventsEl.appendChild(node);

      dialogContainerEl.setAttribute("style", "display:none");
      dialogContainerEl.innerHTML = "";
    });
  }
}

function closeWindow() {
  const dialog = document.getElementById("pop-window");
  dialog.setAttribute("style", "display:none");
  dialog.innerHTML = "";
}

function fromStringToNode(string) {
  let template = document.createElement("template");
  template.innerHTML = string.trim();
  return template.content;
}
