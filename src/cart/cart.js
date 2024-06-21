let basket = JSON.parse(localStorage.getItem('data')) || [];

const renderCart = () => {
    const cartItems = document.getElementById('cart-items');
    const orderSummary = document.getElementById('order-summary');
    const totalPriceLabel = document.getElementById('total-price');

    cartItems.innerHTML = '';
    orderSummary.innerHTML = '';

    let totalPrice = 0;

    basket.forEach((product, index) => {
        // Ensure product has a quantity property
        if (!product.quantity) {
            product.quantity = 1;
        }

        totalPrice += product.productPrice;

        cartItems.innerHTML += `
            <div class="card my-5">
                <div class="card-body row">
                    <div class="col-12 col-sm-4 col-md-3">
                        <a><img src="${product.productImgSrc}" alt="cart" class="img-fluid my-1" onerror="this.onerror=null;this.src='../../img/default.png';"></a>
                    </div>
                    <div class="col-12 col-sm-8 col-md-5 text-center">
                        <label class="">Name</label>
                        <br>
                        <label class="my-2">${product.productTitle}</label>
                        <br>
                        <select class="rounded my-2 w-auto h-25 text-center" onchange="updateQuantity(${index}, this.value)">
                            <option value="1" ${product.quantity == 1 ? 'selected' : ''}>Quantity-1</option>
                            <option value="2" ${product.quantity == 2 ? 'selected' : ''}>Quantity-2</option>
                            <option value="3" ${product.quantity == 3 ? 'selected' : ''}>Quantity-3</option>
                        </select>
                    </div>
                    <div class="col-12 col-sm-12 col-md-4   text-center">
                        <label class="close mb-1" onclick="removeFromCart(${index})">&times;</label>
                        <label class="d-block">Price</label>
                        <br>
                        <label class="">${product.productPrice} <i class="bi bi-currency-rupee"></i></label>
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
    let product = basket[index];
    let pricePerUnit = product.productPrice / product.quantity;

    // Update product's price and quantity
    product.productPrice = pricePerUnit * parseInt(quantity);
    product.quantity = parseInt(quantity);

    // Update localStorage and re-render the cart
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
    // Ensure all products in basket have quantity property
    basket.forEach(product => {
        if (!product.quantity) {
            product.quantity = 1;
        }
    });

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
