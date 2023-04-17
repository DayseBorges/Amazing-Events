const cardsContainer = document.getElementById('cards_container');

let filtros = []
let dataGlobal = {}
let filtrosSearch = "";

const clearCardsContainerHTML = () => {
    cardsContainer.innerHTML = "";
}

const imprimirData = (filtros) => {
    clearCardsContainerHTML();
    let dataFiltered = []

    // || event.name.toLowerCase().includes(filtro.toLowerCase()) || event.description.toLowerCase().includes(filtro.toLowerCase())

    // Este if solo funciona si hay checkboxes marcados y no hay algo en el search bar
   
    if(filtros.length > 0 &&  filtrosSearch.length > 0) {
        for (let filtro of filtros) {
            for ( let event of dataGlobal.events ){
                if ((event.category.toLowerCase() == filtro.toLowerCase())) {
                    if(event.name.toLowerCase().includes(filtrosSearch.toLowerCase()) || event.description.toLowerCase().includes(filtrosSearch)){
                        dataFiltered.push(event)
                    }
                }
            }
        }
    }
     // Este if solo funciona si no hay checkboxes marcados y solo hay algo en el search bar
    else if( filtros.length === 0 && filtrosSearch.length > 0){
        for ( let event of dataGlobal.events ){
            if (event.name.toLowerCase().includes(filtrosSearch.toLowerCase()) || event.description.toLowerCase().includes(filtrosSearch)){
                dataFiltered.push(event)
            }
        }
    }
    // Este if solo funciona si hay checkboxes marcados y no hay nada en el search bar
    else if( filtros.length  > 0 && filtrosSearch.length === 0){
        for (let filtro of filtros) {
            for ( let event of dataGlobal.events ){
                if ((event.category.toLowerCase() == filtro.toLowerCase()) || (event.category.toLowerCase() == filtrosSearch.toLowerCase()) && event.name.toLowerCase().includes(filtrosSearch.toLowerCase()) || event.description.toLowerCase().includes(filtro.toLowerCase())) {
                    dataFiltered.push(event)
                }
            }
        }
    }
     else {   
        dataFiltered = dataGlobal.events;
    }

    if(dataFiltered.length > 0){
    for ( let event of dataFiltered ){
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
        `
        cardsContainer.appendChild(cardDiv)

    }
    } else {
        let errorMessage = document.createElement('h2')
        errorMessage.classList.add('text-center')
        errorMessage.textContent = "No se encontraron elementos que coincidan con tu busqueda."
        cardsContainer.appendChild(errorMessage);
    }
};

const categoryContainer = document.getElementById('filters');
const categorias = (data) => {
    const categoriasUnicas = {};
    let idCounter = 0;
    for (let event of data.events) {
        const categoria = event.category;
        idCounter++
        if (!categoriasUnicas[categoria]) {
            const checkbox = document.createElement("div");
            checkbox.className = "form-check";
            checkbox.classList.add("m-2");
            checkbox.innerHTML += `
            <input
                  class="form-check-input"
                  type="checkbox"
                  value="${event.category}"
                  id="check${idCounter}"
                />
                <label class="form-check-label" for="check${idCounter}"> ${event.category} </label>
            `
            categoryContainer.appendChild(checkbox)
            categoriasUnicas[categoria] = true; 
        }
    }
}

const getCategorys = () => {
    const inputs = document.querySelectorAll("input[type=checkbox]")
    return inputs;
}

const addEventsListeners = () => {
    const inputs = getCategorys();
    
    for (let input of inputs ){
        input.addEventListener('change', () => {
            if( input.checked ){
                filtros.push( input.defaultValue )
                imprimirData(filtros)
            } else {
                filtros = filtros.filter( filtro =>  filtro !== input.defaultValue )
                imprimirData(filtros)
            }
        })
    }
}

const inputSearch = document.querySelector(".form-control");
inputSearch.addEventListener("change", () => {
    const eventsFiltrados = inputSearch.value;
    filtrosSearch = eventsFiltrados;
    
    imprimirData(filtros)
})

const buttonSearch = document.querySelector(".btn");
buttonSearch.addEventListener("click", (event) => {
    event.preventDefault();
    
})


fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then(resp => {
        return resp.json();
    })
        .then( data => {
             
            dataGlobal = data; 
            imprimirData([]);
            categorias(dataGlobal);
            getCategorys();
            addEventsListeners()
        }).catch( err => console.log(err));