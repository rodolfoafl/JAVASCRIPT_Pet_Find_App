const petfinder = require("@petfinder/petfinder-js");

const client = new petfinder.Client({
  apiKey: "uI26IH8HKLS8Ay1jPOl4okdpKGKdcdevtKWXzgTw8ovlyiTgqd",
  secret: "c5EkaRDc5idxObFlKrpeJJ02kPPjh6tmTf1QGDN3"
});

//DOM elements
const petFormEl = document.getElementById("pet-form");
const animalEl = document.getElementById("animal");
const resultsEl = document.getElementById("results");

//Event listeners
petFormEl.addEventListener("submit", fetchAnimals);

//Functions
//Fetch from Petfinder API
function fetchAnimals(e) {
  e.preventDefault();

  let searchOpt = {
    type: animalEl.value
  };

  //Fetch animals
  client.animal
    .search(searchOpt)
    .then(resp => {
      showAnimals(resp.data.animals);
    })
    .catch(err => console.log(err));
}

function showAnimals(animals) {
  resultsEl.innerHTML = "";
  animals.forEach(animal => {
    console.log(animal);

    const div = document.createElement("div");
    div.classList.add("card", "card-body", "mb-3");
    div.innerHTML = `
      <div class="row">
        <div class="col-sm-6">
        <h4>${animal.name} (${animal.age})</h4>
        <p class="text-secondary">
          ${animal.breeds.primary} 
          ${checkSecondaryBreed(animal.breeds.secondary)}
        </p>
        <p>
          ${checkAddresses(animal.contact.address)}
        </p>
        <ul class="list-group">
          ${checkPhone(animal.contact.phone)}
          ${checkEmail(animal.contact.email)}
        </ul>
        </div>
        <div class="col-sm-6 text-center">
          ${checkPhotos(animal.photos)}
        </div>
      </div>
    `;
    resultsEl.appendChild(div);
  });
}

function checkSecondaryBreed(secondBreed) {
  if (secondBreed != null) {
    return " / " + secondBreed;
  } else {
    return "";
  }
}

function checkPhone(phone) {
  if (phone != null) {
    return `<li class="list-group-item">Phone: ${phone}</li>`;
  } else {
    return "";
  }
}

function checkPhotos(photos) {
  if (photos.length > 0) {
    return `<img src="${photos[0].medium}" class="img-fluid mt-2"></img>`;
  } else {
    return "";
  }
}

function checkEmail(email) {
  if (email != null) {
    return `<li class="list-group-item">Email: ${email}</li>`;
  } else {
    return "";
  }
}

function checkAddresses(address) {
  let fullAddress = "";
  if (address.address1 != null) {
    fullAddress += address.address1 + " - ";
  }
  if (address.address2 != null) {
    fullAddress += address.address2 + " - ";
  }
  if (address.city != null) {
    fullAddress += address.city + " - ";
  }
  if (address.state != null) {
    fullAddress += address.state + " - ";
  }
  if (address.country != null) {
    fullAddress += address.country + " - ";
  }
  if (address.postcode != null) {
    fullAddress += address.postcode;
  }
  return fullAddress;
}
