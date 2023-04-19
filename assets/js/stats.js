import { getAllData, comprobarDate, tableEvent } from "./functions.js";

const table1 = document.querySelector(".table1");
const table2 = document.querySelector(".table2");
const table3 = document.querySelector(".table3");

let dataGlobal = await getAllData();

const filteredData = dataGlobal.events.filter((event) => {
    return comprobarDate(event.date, dataGlobal.currentDate, "past");
})

// Funciones table1
const sortEventsMajor = filteredData.map((event) => {
        return (event.assistance * 100) / event.capacity && event.name;
}).sort();

const sortEventsMenor = filteredData.map((event) => {
  return (event.assistance * 100) / event.capacity && event.name;
}).sort().toReversed();

const sortEventsMajorCaracity = dataGlobal.events.sort((a, b) => b.capacity - a.capacity).map((event) => {
  return event.name;
})

//To do 
const assistanceByCategory = 


tableEvent(sortEventsMajor, sortEventsMenor, sortEventsMajorCaracity, table1)
