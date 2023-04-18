export {
  getAllData,
  getCategorys,
  displayCategories,
  createCheckbox,
  createEventCard,
  compararProperties,
  checkIncludes,
  createErrorMessage,
  comprobarDate,
  cardDetails,
  filtrarData,
};

const getAllData = async () => {
  let response = await fetch("https://mindhub-xj03.onrender.com/api/amazing");
  let eventsData = await response.json();

  return eventsData;
};
const getCategorys = () => {
  const inputs = document.querySelectorAll("input[type=checkbox]");
  return inputs;
};
const displayCategories = (data, categoryContainer) => {
  const categoriasUnicas = {};
  let idCounter = 0;
  for (let event of data.events) {
    const categoria = event.category;
    idCounter++;
    if (!categoriasUnicas[categoria]) {
      const checkbox = createCheckbox(categoria, idCounter);
      categoryContainer.appendChild(checkbox);
      categoriasUnicas[categoria] = true;
    }
  }
};
const createCheckbox = (category, idCounter) => {
  const checkbox = document.createElement("div");
  checkbox.className = "form-check";
  checkbox.classList.add("m-2");
  checkbox.innerHTML += `
            <input
                  class="form-check-input"
                  type="checkbox"
                  value="${category}"
                  id="check${idCounter}"
                />
                <label class="form-check-label" for="check${idCounter}"> ${category} </label>`;
  return checkbox;
};

const createEventCard = (event) => {
  const cardDiv = document.createElement("div");
  cardDiv.className = "card";
  cardDiv.classList.add("m-3");
  cardDiv.innerHTML = `
        <img src="${event.image}" class="card-img-top" alt="..." />
        <div class="card-body container-relative">
            <h5 class="card-title">${event.name}</h5>
            <p class="card-text">
                ${event.description}
            </p>
            <a href="../pages/details.html?id=${event._id}" class="btn btn-primary btn-bottom">Ver Más</a>
        </div>
    `;
  return cardDiv;
};

const createErrorMessage = () => {
  let errorMessage = document.createElement("h2");
  errorMessage.classList.add("text-center");
  errorMessage.textContent =
    "No se encontraron elementos que coincidan con tu busqueda.";
  return errorMessage;
};

const compararProperties = (prop1, prop2) => {
  return prop1.toLowerCase() === prop2.toLowerCase();
};

const checkIncludes = (prop1, prop2) => {
  return prop1.toLowerCase().includes(prop2.toLowerCase());
};

const comprobarDate = (date1, date2, condicion) => {
  if (condicion === "upcoming") {
    return date1 > date2;
  } else if (condicion === "past") {
    return date1 < date2;
  } else {
    return true;
  }
};

const cardDetails = (obj, detailsContainer) => {
  const cardDetails = document.createElement("div");
  cardDetails.classList.add(
    "row",
    "row-detail",
    "no-gutters",
    "margin-details"
  );
  cardDetails.innerHTML = `
                <div class="col-md-5 col-sm-12 img-detail">
                  <img
                    src=${obj.image}
                    class="img col-sm-12"
                    alt="Imagen del Evento"
                  />
                </div>
                <div class="col-md-7 col-sm-12">
                  <div class="card-body">
                    <h5 class="card-title">${obj.name}</h5>
                    <p class="text-category">${obj.category}</p>
                    <p class="card-text">
                    ${obj.description}
                    </p>
                    <div class="list-group list">
                        <li class="list-group-item list-group-item-action">Fecha: ${new Date(
                          obj.date
                        )
                          .toLocaleString()
                          .slice(0, 9)}</li>
                        <li class="list-group-item list-group-item-action">Local: ${
                          obj.place
                        }</li>
                        <li class="list-group-item list-group-item-action">Pecio: $ ${
                          obj.price
                        }</li>
                    </div>
                  </div>
                </div>
              </div> 
    `;
  detailsContainer.appendChild(cardDetails);
};

const filtrarData = (
  dataGlobal,
  arregloFiltrosPorCategoria,
  filtroSearch,
  dateStatus
) => {
  let dataFiltered = [];
  // Este if solo funciona si hay checkboxes marcados y no hay algo en el search bar
  if (arregloFiltrosPorCategoria.length > 0 && filtroSearch.length > 0) {
    for (let filtro of arregloFiltrosPorCategoria) {
      for (let event of dataGlobal.events) {
        if (
          compararProperties(event.category, filtro) &&
          comprobarDate(event.date, dataGlobal.currentDate, dateStatus)
        ) {
          if (
            checkIncludes(event.name, filtroSearch) ||
            checkIncludes(event.description, filtroSearch)
          ) {
            dataFiltered.push(event);
          }
        }
      }
    }
  }
  // Este if solo funciona si no hay checkboxes marcados y solo hay algo en el search bar
  else if (arregloFiltrosPorCategoria.length === 0 && filtroSearch.length > 0) {
    for (let event of dataGlobal.events) {
      if (
        (checkIncludes(event.name, filtroSearch) ||
          checkIncludes(event.description, filtroSearch)) &&
        comprobarDate(event.date, dataGlobal.currentDate, dateStatus)
      ) {
        dataFiltered.push(event);
      }
    }
  }
  // Este if solo funciona si hay checkboxes marcados y no hay nada en el search bar
  else if (arregloFiltrosPorCategoria.length > 0 && filtroSearch.length === 0) {
    for (let filtro of arregloFiltrosPorCategoria) {
      for (let event of dataGlobal.events) {
        if (
          (compararProperties(
            event.category.toLowerCase(),
            filtro.toLowerCase()
          ) ||
            (compararProperties(
              event.category.toLowerCase(),
              filtroSearch.toLowerCase()
            ) &&
              checkIncludes(event.name, filtroSearch)) ||
            checkIncludes(event.description, filtro)) &&
          comprobarDate(event.date, dataGlobal.currentDate, dateStatus)
        ) {
          dataFiltered.push(event);
        }
      }
    }
  } else {
    dataFiltered = dataGlobal.events.filter((event) =>
      comprobarDate(event.date, dataGlobal.currentDate, dateStatus)
    );
  }
  console.log(dataFiltered);
  return dataFiltered;
};

// if (arregloFiltrosPorCategoria.length > 0) {
// console.log("hay filtro de categoria");
// arregloFiltrosPorCategoria.forEach((filtroCategoria) => {
//   for (let event of dataGlobal) {
//     if (
//       compararProperties(event.category, filtroCategoria) ||
//       Object.entries(event).includes(filtroSearch)
//     ) {
//       dataFiltered.push(event);
//     }
//   }
// });
// }
