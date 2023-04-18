import {
  getAllData,
  getCategorys,
  displayCategories,
  createEventCard,
  createErrorMessage,
  compararProperties,
  checkIncludes,
  comprobarDate,
  filtrarData,
} from "./functions.js";

const inputSearch = document.querySelector(".form-control");
const buttonSearch = document.querySelector(".btn");
const cardsContainer = document.getElementById("cards_container");
const categoryContainer = document.getElementById("filters");

let filtros = [];
let dataAPI = await getAllData();
let filtroSearch = "";

const setEventListeners = () => {
  inputSearch.addEventListener("change", () => {
    filtroSearch = inputSearch.value;
    imprimirData(dataAPI, filtros, filtroSearch, cardsContainer, "past");
  });

  buttonSearch.addEventListener("click", (event) => {
    event.preventDefault();
  });
  const inputs = getCategorys();
  for (let input of inputs) {
    input.addEventListener("change", () => {
      if (input.checked) {
        filtros.push(input.defaultValue);
        imprimirData(dataAPI, filtros, filtroSearch, cardsContainer, "past");
      } else {
        filtros = filtros.filter((filtro) => {
          return filtro !== input.defaultValue;
        });
        imprimirData(dataAPI, filtros, filtroSearch, cardsContainer, "past");
      }
    });
  }
};

displayCategories(dataAPI, categoryContainer);

setEventListeners();

const imprimirData = (
  dataGlobal,
  filtros,
  filtroSearch,
  cardsContainer,
  dateStatus
) => {
  cardsContainer.innerHTML = "";
  let dataFiltered = filtrarData(dataGlobal, filtros, filtroSearch, dateStatus);

  if (dataFiltered.length > 0) {
    for (let event of dataFiltered) {
      cardsContainer.appendChild(createEventCard(event));
    }
  } else {
    cardsContainer.appendChild(createErrorMessage());
  }
};

imprimirData(dataAPI, filtros, filtroSearch, cardsContainer, "past");
