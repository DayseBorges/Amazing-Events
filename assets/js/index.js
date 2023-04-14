const cardsContainer = document.getElementById('cards_container');
const imprimirData = (data) => {
    for ( let event of data.events ){
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
};

fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then(resp => {
        return resp.json();
    })
        .then( data => {
            imprimirData(data);
        });
