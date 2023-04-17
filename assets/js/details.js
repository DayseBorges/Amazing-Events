const urlParams = new URLSearchParams(location.search); 
let id = urlParams.get('id');

const detailsContainer = document.querySelector(".container-card");

let obj = {};
const imprimirCard = (obj) => {
    console.log(obj);
    const cardDetails = document.createElement("div");
    cardDetails.classList.add("row", "row-detail", "no-gutters");
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
                    <p class="card-text">
                    ${obj.description}
                    </p>
                    <p class="card-text">
                      date
                    </p>
                  </div>
                </div>
              </div> 
    `
    
    detailsContainer.appendChild(cardDetails);
}

fetch("https://mindhub-xj03.onrender.com/api/amazing")
    .then(resp => {
        return resp.json();
    })
        .then( data => {
            console.log(data);
            obj = data.events.find((iten) => iten._id == id)
            imprimirCard(obj)
            
        }).catch( err => console.log(err));

