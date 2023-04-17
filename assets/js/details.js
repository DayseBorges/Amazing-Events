<<<<<<< HEAD
<<<<<<< HEAD

const urlParams = new URLSearchParams(location.search); 
let id = urlParams.get('id');

=======
const urlParams = new URLSearchParams(location.search); 
let id = urlParams.get('id');
=======
const urlParams = new URLSearchParams(location.search);
let id = urlParams.get("id");
>>>>>>> e3dc3e527211be0ff4cf22fa450a64db756fab3a

const detailsContainer = document.querySelector(".container-card");

let obj = {};
const imprimirCard = (obj) => {
  console.log(obj);
  const cardDetails = document.createElement("div");
  cardDetails.classList.add("row", "row-detail", "no-gutters", "margin-details");
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
                        <li class="list-group-item list-group-item-action">Fecha: ${new Date(obj.date).toLocaleString().slice(0, 9)}</li>
                        <li class="list-group-item list-group-item-action">Local: ${obj.place}</li>
                        <li class="list-group-item list-group-item-action">Pecio: $ ${obj.price}</li>
                    </div>
                  </div>
                </div>
              </div> 
    `;

  detailsContainer.appendChild(cardDetails);
};

fetch("https://mindhub-xj03.onrender.com/api/amazing")
<<<<<<< HEAD
    .then(resp => {
        return resp.json();
    })
        .then( data => {
            console.log(data);
            obj = data.events.find((iten) => iten._id == id)
            imprimirCard(obj)
            
        }).catch( err => console.log(err));
>>>>>>> c5769d413cfbd8a93975ea80681f02baf9815fe7

=======
  .then((resp) => {
    return resp.json();
  })
  .then((data) => {
    console.log(data);
    obj = data.events.find((iten) => iten._id == id);
    imprimirCard(obj);
  })
  .catch((err) => console.log(err));
>>>>>>> e3dc3e527211be0ff4cf22fa450a64db756fab3a
