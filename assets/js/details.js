import { getAllData, cardDetails } from "./functions.js";

let dataGlobal = await getAllData();
console.log(dataGlobal.events);
const urlParams = new URLSearchParams(location.search);
let id = urlParams.get("id");

let obj = dataGlobal.events.find((iten) => iten._id == id);

const detailsContainer = document.querySelector(".container-card");
cardDetails(obj, detailsContainer);
