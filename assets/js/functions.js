export {
  getAllData,
  displayCategories,
  createCheckbox,
  createEventCard,
  compararProperties,
  checkIncludes,
  createErrorMessage,
  comprobarDate,
  cardDetails,
  filtrarData,
  tableEvent,
  getEventsMajorCapacity,
  getEventsMenorPorcentaje,
  getEventsMajorPorcentaje,
  getAllCategories,
  getEventosPorCategoria,
  calcularGananciaPorCategoria,
  getGananciasPorCategoria,
  getPorcentajeAsistenciaUpcoming,
  getPorcentajeAsistenciaPast,
};

// Parametros: -
// Accion: Hace una promesa y nos devuelve el objeto global de eventos
// Salida:  Objeto que tiene una prop currentDate y un array de eventos
const getAllData = async () => {
  let response = await fetch("https://mindhub-xj03.onrender.com/api/amazing");
  let eventsData = await response.json();
  return eventsData;
};



// Parametros: Arreglo de eventos
// Accion: Filtrar todas las categorias de estos eventos
// Salida: Array con el nombre de las categorias 

const getAllCategories = (data) => {
  let categories = [];
  data.events.forEach((event) => {
    if (!categories.includes(event.category)) {
      categories.push(event.category);
    }
  });
  return categories;
};
// Parametros: Array de Eventos (para despues sacar categorias) y contenedor de los checboxes
// Accion:  Iterar el array de categorias y por cada una crear un checkbox
// Salida: -
const displayCategories = (data, categoryContainer) => {
  const categoriasUnicas = getAllCategories(data);
  let idCounter = 1;
  for (let categoria of categoriasUnicas) {
    const checkbox = createCheckbox(categoria, idCounter);
    categoryContainer.appendChild(checkbox);
    idCounter++;
  }
};
// Parametros: Nombre de la Categoria y Arreglo de eventos
// Accion: Filtrar todos los eventos que tengan la categoria
// Salida: Arreglo de eventos de X categoria
const getEventosPorCategoria = (categoria, eventos) => {
  return eventos.filter((event) => event.category === categoria);
};

// Parametros: Nombre de la categoria y numero de ID
// Accion: Crear un elemento HTML con sus respectivas clases
// Salida: Div que contiene un checkbox con la info de la categoria
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
// Parametros: Objeto de un Evento con sus propiedades
// Accion: Crear un elemento HTML con sus respectivas clases
// Salida: Div que contiene una card con la info del evento
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
// Parametros: -
// Accion: Crear un elemento HTML con sus respectivas clases
// Salida: H2 que tiene un mensaje de error
const createErrorMessage = () => {
  let errorMessage = document.createElement("h2");
  errorMessage.classList.add("text-center");
  errorMessage.textContent =
    "No se encontraron elementos que coincidan con tu busqueda.";
  return errorMessage;
};
// Parametros: Propiedad 1 y Propiedad 2
// Accion: Comparar las dos propiedades
// Salida: Booleano que retorna true si las dos propiedas son iguales
const compararProperties = (prop1, prop2) => {
  return prop1.toLowerCase() === prop2.toLowerCase();
};
// Parametros: Propiedad 1 y Propiedad 2
// Accion: Comparar las dos propiedades con includes
// Salida: Booleano que retorna true si una propiedad incluye el valor de la otra
const checkIncludes = (prop1, prop2) => {
  return prop1.toLowerCase().includes(prop2.toLowerCase());
};
// Parametros: Fecha1, Fecha2, Condicion ("past" o "upcoming")
// Accion: Si el estado es "upcoming"  retorna si la fecha 1 es mayor a la otra, si es "past" hace lo contrario
// Salida:
const comprobarDate = (date1, date2, condicion) => {
  if (condicion === "upcoming") {
    return date1 > date2;
  } else if (condicion === "past") {
    return date1 < date2;
  } else {
    return true;
  }
};


/**
 * Crear un elemento HTML con la info del evento
 * @param {Array<Object>} obj Objeto de un Evento
 * @param {HTMLElement} detailsContainer Contenedor HTML
 * @returns {HTMLElement} con la info del evento
 */
const cardDetails = (obj, detailsContainer) => {
  const cardDetails = document.createElement("div");
  cardDetails.classList.add("row", "row-detail");
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


/**
 * Se fija las longitudes de los filtros y dependiendo de eso filtra los eventos en un arreglo
 * Basicamente lo que permite es acumular los filtros y poder usarlos cruzados
 * @param {Array<Object>} dataGlobal Recibe toda la info que trae de la API
 * @param {Array} arregloFiltrosPorCategoria un arreglo de los filtros que estan marcados (o no)
 * @param {String} filtroSearch un string con el filtro captura por el search 
 * @param {String} dateStatus un estado de tiempo ("past" "upcoming")
 * @returns {Arreglo<String>} Arreglo de eventos filtrados
 */
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
  return dataFiltered;
};
/**
 * Iterar  cada arreglo y imprimir por cada elemento un TD
 * @param {Array<String>} arr1 corresponde a la primera columna de la tabla
 * @param {Array<String>} arr2 corresponde a la segunda columna de la tabla
 * @param {Array<String>} arr3 corresponde a la tercera columna de la tabla
 * @param {String} container la tabla donde van  a aparecer los datos (past o upcoming)
 */
const tableEvent = (arr1, arr2, arr3, container) => {
  let limit = 1;
  if (!container.classList.contains("table1")) {
    limit = arr1.length;
  }
  for (let i = 0; i < limit; i++) {
    const tableDetail = document.createElement("tr");
    tableDetail.innerHTML = `
                    <td>${arr1[i]}</td>
                    <td>${arr2[i]}</td>
                    <td>${arr3[i]}</td>
        `;
    container.appendChild(tableDetail);
  }
};

/**
 * Reducir las ganancias de cada evento de la categoria a un solo valor
 * @param {Array<Object>} eventosPorCategoria Arreglo de eventos por categoria
 * @param {HTMLElement} estado estado que seria "past" o "upcoming", porque cambian las propiedades (assistance, estimate)
 * @returns {Number} Numero de las ganancias de cada evento de la categoria, ya con el signo de $
 */
const calcularGananciaPorCategoria = (eventosPorCategoria, estado) => {
  return `$ ${eventosPorCategoria
    .map((evento) =>
      estado.includes("past")
        ? evento.price * evento.assistance
        : evento.price * evento.estimate
    )
    .reduce((accum, curr) => accum + (curr || 0), 0)
    .toLocaleString()}`;
};

/**
 * Iterar el arreglo de categorias y por cada categoria llamar a calcularGananciaPorCategoria()
 * @param {Array<String>} categorias Arreglo de categorias
 * @param {Function} events eventos (para llamar a getEventosPorCategoria)
 * @param {Function} estado estado (para llamar a calcularGananciaPorCategoria)
 * @returns {Array<Number>} con las ganancias de cada categoria
 */
const getGananciasPorCategoria = (categorias, events, estado) =>
  categorias.map((categoria) => {
    return calcularGananciaPorCategoria(
      getEventosPorCategoria(categoria, events),
      estado
    );
  });

/**
 *  Por cada categoria  iterar sus eventos y calcular el porcentaje de asistencia que tuvieron
 * @param {Array<String>} categorias Array de categorias
 * @param {Array<Object>} events eventos (Futuros)
 * @returns {Array<Number>}  Arreglo que contiene el porcentaje de asistencia de cada categoria ya convertido a %
 */

const getPorcentajeAsistenciaUpcoming = (categorias, events) =>
  categorias.map((categoria) => {
    const eventosPorCategoria = getEventosPorCategoria(categoria, events);
    return `${parseFloat(
      eventosPorCategoria
        .map((evento) => (evento.estimate / evento.capacity) * 100)
        .reduce((accum, curr) => accum + (curr || 0), 0) /
        (eventosPorCategoria.length > 0 ? eventosPorCategoria.length : 1)
    ).toFixed(2)}%`;
  });

/**
 *  Por cada categoria  iterar sus eventos y calcular el porcentaje de asistencia que tuvieron
 * @param {Array<String>} categorias Array de categorias
 * @param {Array<Object>} events eventos (Pasados)
 * @returns {Array<Number>}  Arreglo que contiene el porcentaje de asistencia de cada categoria ya convertido a %
 */
const getPorcentajeAsistenciaPast = (categorias, events) =>
  categorias.map((categoria) => {
    const eventosPorCategoria = getEventosPorCategoria(categoria, events);
    return `${parseFloat(
      eventosPorCategoria
        .map((evento) => (evento.assistance / evento.capacity) * 100)
        .reduce((accum, curr) => accum + (curr || 0), 0) /
        (eventosPorCategoria.length > 0 ? eventosPorCategoria.length : 1)
    ).toFixed(2)}%`;
  });
/**
 * Por cada evento calcular el porcentaje de asistencia que tuvieron
 * @param {Array<Object>} events Array de eventos
 * @returns {Array<Number>} Arreglo ordenado de mayor a menor que contiene el porcentaje de asistencia de cada evento
 */
const getEventsMajorPorcentaje = (events) => {
  return events
    .map((event) => {
      return (event.assistance * 100) / event.capacity && event.name;
    })
    .sort();
};
/**
 * Por cada evento calcular el porcentaje de asistencia que tuvieron
 * @param {Array<Object>} events Arreglo de eventos
 * @returns {Array<Number>} Arreglo ordenado de menor a mayor que contiene el porcentaje de asistencia de cada evento
 */
const getEventsMenorPorcentaje = (events) => {
  return events
    .map((event) => {
      return (event.assistance * 100) / event.capacity && event.name;
    })
    .sort()
    .toReversed();
};

/**
 * Por cada evento calcular cual tiene mayor capacidad
 * @param {Array<Object>} events Arreglo de evento
 * @returns {Array<Number>} Arreglo ordenado de mayor a menor que contiene la capacidad de cada evento
 */
const getEventsMajorCapacity = (events) => {
  return events
    .sort((a, b) => b.capacity - a.capacity)
    .map((event) => {
      return event.name;
    });
};
