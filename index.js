function renderProducts() {
  const productList = document.getElementById('product-list');

  productList.innerHTML = '';
  products.forEach(product => {
      const stars = '<i class="bi bi-star-fill gold-star"></i>'.repeat(product.rating) +
                    '<i class="bi bi-star gold-star"></i>'.repeat(5 - product.rating);
      const productCard = `
          <div class="col-lg-3 col-md-4 col-sm-6 col-12 mb-3 px-2">
              <div class="card">
                  <div class="card-body">
                      <img src="${product.imgSrc}" class="img-fluid my-2">
                      <h6>${product.title}</h6>
                      <label>${product.category}</label>
                      <div class="d-flex">
                          <label class="my-2 fw-bold">${product.price} <i class="bi bi-currency-rupee"></i></label>
                      </div>
                      <div class="d-flex">${stars}</div>
                      <button class="btn-2 btn w-100" onclick="view(${product.id})">View Details</button>
                      <button onclick="addToCart(${product.id}, '${product.title}', ${product.price}, '${product.imgSrc}')" class="container btn-slideshow btn my-2">
                          Add to Cart <i class="bi bi-bag-plus"></i>
                      </button>
                  </div>
              </div>
          </div>
      `;
      productList.innerHTML += productCard;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  calculate(); // Call calculate to set initial cart amount on page load
});

let basket = JSON.parse(localStorage.getItem('data')) || [];

let addToCart = (productId, productTitle, productPrice, productImgSrc) => {
  const newProduct = {
      productId: productId,
      productTitle: productTitle,
      productPrice: productPrice,
      productImgSrc: productImgSrc
  };
  basket.push(newProduct);
  localStorage.setItem('data', JSON.stringify(basket));
  calculate(); // Update the cart amount after adding an item
};

let calculate = () => {
  let cart_icon = document.getElementById('cart_amount');
  let cart_amount = basket.length;
  cart_icon.innerHTML = cart_amount;
};


let view = (productId) => {
  const product = products.find(p => p.id === productId);
  if (product) {
    localStorage.setItem('productDetail', JSON.stringify(product));
    window.location.href = "./src/product-details/product.html";
  }
};

// navbar

document.getElementById('navbar-toggle-button').addEventListener('click', function() {
var menu = document.getElementById('navbar-mobile-menu');
menu.classList.toggle('open');
});

const carouselElement = document.querySelector('#carouselExampleDark');
const carousel = new bootstrap.Carousel(carouselElement, {
interval: 2000,
ride: 'carousel'
});


// modal
// main.js
function updateLocation(location) {
var locationLabel = document.getElementById('myBtn');
locationLabel.innerText = location; // Update the text
modal.style.display = "none"; // Close the modal after selecting location
}

// JavaScript to handle modal display
var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];

// Open the modal
btn.onclick = function() {
modal.style.display = "block";
}

// Close the modal
span.onclick = function() {
modal.style.display = "none";
}

// Close the modal when clicking outside of it
window.onclick = function(event) {
if (event.target == modal) {
modal.style.display = "none";
}
}

// Search filter function
document.getElementById('searchInput').addEventListener('input', function() {
var filter = this.value.toLowerCase();
var labels = document.querySelectorAll('.locations label');
labels.forEach(function(label) {
var text = label.innerText.toLowerCase();
if (text.includes(filter)) {
  label.style.display = 'block';
} else {
  label.style.display = 'none';
}
});
});