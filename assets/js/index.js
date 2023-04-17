const cardsContainer = document.getElementById('cards_container');

let filtros = []
let dataGlobal = {}

const clearCardsContainerHTML = () => {
    cardsContainer.innerHTML = "";
}
const imprimirData = (filtros) => {
    clearCardsContainerHTML();
    let dataFiltered = []

    if( filtros.length   > 0 ){
        for (let filtro of filtros) {
            for ( let event of dataGlobal.events ){
                if ( event.category.toLowerCase() == filtro.toLowerCase()){
                    dataFiltered.push(event)
                }
            }
        }
    } else {
        
        dataFiltered = dataGlobal.events;
    }
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
        `;
    cardsContainer.appendChild(cardDiv);
  }
};

const categoryContainer = document.getElementById('filters');
const categorias = (data) => {
    const categoriasUnicas = {};
    for (let event of data.events) {
        const categoria = event.category;

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
                <label class="form-check-label" for="check1"> ${event.category} </label>
            `
            categoryContainer.appendChild(checkbox)
            categoriasUnicas[categoria] = true; 
        }
    }
}

    
const getCategorys = () => {
  const inputs = document.querySelectorAll("input[type=checkbox]");
  return inputs;
};


const listenerEvent = () => {
    let inputs = getCategorys();
    inputs.forEach(input => {
        input.addEventListener("change", () => {
            input.checked ?
                console.log("ok") :
                console.log("no")
            
        })
    });
}


fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then(resp => {
        return resp.json();
    })
        .then( data => {
            imprimirData(data);
            categorias(data);
            getCategorys();
            listenerEvent()
        });


        