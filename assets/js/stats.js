import {
  getAllData,
  comprobarDate,
  tableEvent,
  getEventsMajorCapacity,
  getEventsMajorPorcentaje,
  getEventsMenorPorcentaje,
  getAllCategories,
  getGananciasPorCategoria,
  getPorcentajeAsistenciaUpcoming,
  getPorcentajeAsistenciaPast,
  getEventosPorCategoria,
} from "./functions.js";

const table1 = document.querySelector(".table1");
const table2 = document.querySelector(".table2");
const table3 = document.querySelector(".table3");

let dataGlobal = await getAllData();

const pastEvents = dataGlobal.events.filter((event) => {
  return comprobarDate(event.date, dataGlobal.currentDate, "past");
});

const upcomingEvents = dataGlobal.events.filter((event) => {
  return comprobarDate(event.date, dataGlobal.currentDate, "upcoming");
});
// Funciones table1
const sortEventsMajor = getEventsMajorPorcentaje(pastEvents);
const sortEventsMenor = getEventsMenorPorcentaje(pastEvents);
const sortEventsMajorCaracity = getEventsMajorCapacity(dataGlobal.events);
// Funciones y Constantes table2
const categorias = getAllCategories(dataGlobal);
const ingresosUpcomingPorCategoria = getGananciasPorCategoria(
  categorias,
  upcomingEvents,
  "upcoming"
);
const porcentajesAsistenciaUpcoming = getPorcentajeAsistenciaUpcoming(
  categorias,
  upcomingEvents
);
// Funciones y Constantes table3
const ingresosPastPorCategoria = getGananciasPorCategoria(
  categorias,
  pastEvents,
  "past"
);
const porcentajesAsistenciaPast = getPorcentajeAsistenciaPast(
  categorias,
  pastEvents
);
tableEvent(sortEventsMajor, sortEventsMenor, sortEventsMajorCaracity, table1);

tableEvent(
  categorias,
  ingresosUpcomingPorCategoria,
  porcentajesAsistenciaUpcoming,
  table2
);
tableEvent(
  categorias,
  ingresosPastPorCategoria,
  porcentajesAsistenciaPast,
  table3
);

//To do
// const assistanceByCategory = tableEvent(
//   sortEventsMajor,
//   sortEventsMenor,
//   sortEventsMajorCaracity,
//   table1
// );
