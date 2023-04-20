import { getAllData, cardDetails } from "./functions.js";

let dataGlobal = await getAllData();

// Parametros: -
// Accion: Buscar el id que viene por URL, instanciando URLSearchParams y pasandole como parametro la URL de la pestaña en la que estamos
const urlParams = new URLSearchParams(location.search);
// Salida: Devuleve el id que viene por URL
let id = urlParams.get("id");

// Accion: Buscar el objeto que coincide con el ID de la url
// Salida: Objeto con el id de parametro
let obj = dataGlobal.events.find((iten) => iten._id == id);

const detailsContainer = document.querySelector(".container-card");
cardDetails(obj, detailsContainer);
