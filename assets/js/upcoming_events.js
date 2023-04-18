import {
  getAllData,
  getCategorys,
  displayCategories,
  createEventCard,
  createErrorMessage,
  compararProperties,
  checkIncludes,
  comprobarDate,
} from "./functions.js";

const inputSearch = document.querySelector(".form-control");
const buttonSearch = document.querySelector(".btn");
const cardsContainer = document.getElementById("cards_container");
const categoryContainer = document.getElementById("filters");

const setEventListeners = () => {
  inputSearch.addEventListener("change", () => {
    filtrosSearch = inputSearch.value;
    imprimirData(dataGlobal, filtros, filtrosSearch, cardsContainer);
  });

  buttonSearch.addEventListener("click", (event) => {
    event.preventDefault();
  });
  const inputs = getCategorys();
  for (let input of inputs) {
    input.addEventListener("change", () => {
      if (input.checked) {
        filtros.push(input.defaultValue);
        imprimirData(dataGlobal, filtros, filtrosSearch, cardsContainer);
      } else {
        filtros = filtros.filter((filtro) => {
          return filtro !== input.defaultValue;
        });
        imprimirData(dataGlobal, filtros, filtrosSearch, cardsContainer);
      }
    });
  }
};
let filtros = [];
let dataGlobal = await getAllData();
let filtrosSearch = "";
displayCategories(dataGlobal, categoryContainer);

setEventListeners();

export const imprimirData = (
  dataGlobal,
  filtros,
  filtrosSearch,
  cardsContainer
) => {
  cardsContainer.innerHTML = "";
  let dataFiltered = [];
  // Este if solo funciona si hay checkboxes marcados y no hay algo en el search bar
  if (filtros.length > 0 && filtrosSearch.length > 0) {
    for (let filtro of filtros) {
      for (let event of dataGlobal.events) {
        if (
          compararProperties(event.category, filtro) &&
          comprobarDate(event.date, dataGlobal.currentDate, "upcoming")
        ) {
          if (
            checkIncludes(event.name, filtrosSearch) ||
            checkIncludes(event.description, filtrosSearch)
          ) {
            dataFiltered.push(event);
          }
        }
      }
    }
  }
  // Este if solo funciona si no hay checkboxes marcados y solo hay algo en el search bar
  else if (filtros.length === 0 && filtrosSearch.length > 0) {
    for (let event of dataGlobal.events) {
      if (
        (checkIncludes(event.name, filtrosSearch) ||
          checkIncludes(event.description, filtrosSearch)) &&
        comprobarDate(event.date, dataGlobal.currentDate, "upcoming")
      ) {
        dataFiltered.push(event);
      }
    }
  }
  // Este if solo funciona si hay checkboxes marcados y no hay nada en el search bar
  else if (filtros.length > 0 && filtrosSearch.length === 0) {
    for (let filtro of filtros) {
      for (let event of dataGlobal.events) {
        if (
          (compararProperties(
            event.category.toLowerCase(),
            filtro.toLowerCase()
          ) ||
            (compararProperties(
              event.category.toLowerCase(),
              filtrosSearch.toLowerCase()
            ) &&
              checkIncludes(event.name, filtrosSearch)) ||
            checkIncludes(event.description, filtro)) &&
          comprobarDate(event.date, dataGlobal.currentDate, "upcoming")
        ) {
          dataFiltered.push(event);
        }
      }
    }
  } else {
    dataFiltered = dataGlobal.events.filter((event) =>
      comprobarDate(event.date, dataGlobal.currentDate, "upcoming")
    );
  }
  if (dataFiltered.length > 0) {
    for (let event of dataFiltered) {
      cardsContainer.appendChild(createEventCard(event));
    }
  } else {
    cardsContainer.appendChild(createErrorMessage());
  }
};

imprimirData(dataGlobal, filtros, filtrosSearch, cardsContainer);
