let basket = JSON.parse(localStorage.getItem('data')) || [];

const renderCart = () => {
    const cartItems = document.getElementById('cart-items');
    const orderSummary = document.getElementById('order-summary');
    const totalPriceLabel = document.getElementById('total-price');

    cartItems.innerHTML = '';
    orderSummary.innerHTML = '';

    let totalPrice = 0;

    basket.forEach((product, index) => {
        totalPrice += product.productPrice;
        cartItems.innerHTML += `
            <div class="card my-5">
                <div class="card-body row">
                    <div class="col-12 col-sm-4 col-md-3">
                        <a><img src="${product.productImgSrc}" alt="cart" class="img-fluid my-1" onerror="this.onerror=null;this.src='../../img/default.png';"></a>
                    </div>
                    <div class="col-12 col-sm-8 col-md-5">
                        <label class="my-3">Name</label>
                        <br>
                        <label class="my-2">${product.productTitle}</label>
                        <br>
                        <select class="rounded my-2 w-auto h-25 text-center" onchange="updateQuantity(${index}, this.value)">
                            <option value="1">Quantity-1</option>
                            <option value="2">Quantity-2</option>
                            <option value="3">Quantity-3</option>
                        </select>
                    </div>
                    <div class="col-12 col-sm-12 col-md-4 mt-2 text-md-end text-start">
                        <label class="close mb-5" onclick="removeFromCart(${index})">&times;</label>
                        <label class="mt-5 d-block">Price</label>
                        <br>
                        <label class="mt-4">${product.productPrice} <i class="bi bi-currency-rupee"></i></label>
                    </div>
                </div>
            </div>
        `;

        orderSummary.innerHTML += `
            <div class="d-flex justify-content-between mt-2">
                <label>${product.productTitle}</label>
                <label>${product.productPrice} <i class="bi bi-currency-rupee"></i></label>
            </div>
        `;
    });

    totalPriceLabel.innerHTML = `${totalPrice} <i class="bi bi-currency-rupee"></i>`;
};

const updateQuantity = (index, quantity) => {
    basket[index].productPrice = (basket[index].productPrice / basket[index].quantity) * quantity;
    basket[index].quantity = quantity;
    localStorage.setItem('data', JSON.stringify(basket));
    renderCart();
};

const removeFromCart = (index) => {
    basket.splice(index, 1);
    localStorage.setItem('data', JSON.stringify(basket));
    renderCart();
    calculate();
};

document.addEventListener('DOMContentLoaded', () => {
    renderCart();
    calculate();
});

let calculate = () => {
    let cart_icon = document.getElementById('cart_amount');
    if (cart_icon) {
        cart_icon.innerHTML = basket.length;
    } else {
        console.error("Element with id 'cart_amount' not found!");
    }
};

calculate();



// navbar

document.getElementById('navbar-toggle-button').addEventListener('click', function() {
    var menu = document.getElementById('navbar-mobile-menu');
    menu.classList.toggle('open');
  });
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

