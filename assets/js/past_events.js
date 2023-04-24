import {
  getAllData,
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
  const inputs = document.querySelectorAll("input[type=checkbox]");

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

// Parametros: data global que viene de la API, arreglo de filtros, texto que viene del search, container HTML y estado("past" "upcoming")
// que seria la tabla donde van  a aparecer
// Accion: Llamar a filtrarData() y iterar el arreglo que nos devuelve, para imprimir por cada evento una card
// Salida: -
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
