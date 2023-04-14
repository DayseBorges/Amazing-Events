// let data_resultado = {}
// fetch("https://mindhub-xj03.onrender.com/api/amazing")
//     .then(resp => resp.json())
//         .then(data => {
//         
//         } );


/* <div class="card m-3" style="width: 18rem">
<img src="./assets/img/Cine7.jpg" class="card-img-top" alt="..." />
<div class="card-body container-relative">
  <h5 class="card-title">Cine</h5>
  <p class="card-text">
    Una salida al cine es una actividad divertida y relajante que te
    permite disfrutar de una buena película en compañía de amigos o
    familiares. Ya sea que prefieras películas de acción, comedias o
    dramas, siempre hay algo emocionante que ver en la pantalla grande
  </p>
  <a href="#" class="btn btn-primary btn-bottom">Ver Más</a>
</div>
</div> */
const cardsContainer = document.getElementById('cards_container');
const imprimirData = (data) => {
    
    for ( let event of data.events ){
        const cardDiv = document.createElement("div");
        cardDiv.innerHTML = `
        <div class="card m-3" style="width: 18rem">
            <img src="${event.image}" class="card-img-top" alt="..." />
            <div class="card-body container-relative">
                <h5 class="card-title">${event.name}</h5>
                <p class="card-text">
                    ${event.description}
                </p>
                <a href="../pages/details.html?id=${event._id}" class="btn btn-primary btn-bottom">Ver Más</a>
            </div>
        </div>
        `
        cardsContainer.appendChild(cardDiv)
    }
};

fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then(resp => {
        return resp.json();
    })
        .then( data => {
            imprimirData(data);
        });
