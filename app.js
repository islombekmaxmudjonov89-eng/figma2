const toursContainer = document.getElementById("tours-container");
const bookingForm = document.getElementById("booking-form");

const itemTitle = document.getElementById("itemTitle");
const itemCity = document.getElementById("itemCity");
const itemImage = document.getElementById("itemImage");
const itemDescription = document.getElementById("itemDescription");

const API = "http://localhost:3000/destinations";

function getProducts() {
  fetch(API)
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      toursContainer.innerHTML = "";

      let items = data.destinations || data;

      for (let i = 0; i < items.length; i++) {
        let tovar = items[i];

        toursContainer.innerHTML += `
          <div class="card">
            <div class="card-img-holder">
              <img src="${tovar.image}" alt="${tovar.title}" />
            </div>
            <div class="card-body">
              <h3 class="card-title">${tovar.title}</h3>
              <p class="card-price">from ${tovar.price || 1200} $</p>
              <p class="card-meta">🗓 ${tovar.duration || "5 Days"} | ⭐ ${tovar.rating || 4.9} (${tovar.country || tovar.city || ""})</p>
              <p class="card-desc">${tovar.description}</p>
              <a href="#" class="card-link">Read More &rarr;</a>
              <button onclick="deleteProduct(${tovar.id})">Delete</button>
            </div>
          </div>
        `;
      }
    });
}

bookingForm.addEventListener("submit", function(e) {
  e.preventDefault();

  let newProduct = {
    title: itemTitle.value,
    country: itemCity.value,
    image: itemImage.value,
    description: itemDescription.value
  };

  fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newProduct)
  })
  .then(function() {
    alert("Ma'lumot qo'shildi ✅");
    bookingForm.reset();
    getProducts();
  });
});

function deleteProduct(id) {
  fetch(API + "/" + id, {
    method: "DELETE"
  })
  .then(function() {
    alert("O'chirildi 🗑️");
    getProducts();
  });
}

getProducts();