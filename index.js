function renderProducts(productsToRender) {
  const productList = document.getElementById('product-list');

  productList.innerHTML = '';
  productsToRender.forEach(product => {
      const stars = '<i class="bi bi-star-fill gold-star"></i>'.repeat(product.rating) +
                    '<i class="bi bi-star gold-star"></i>'.repeat(5 - product.rating);
      const productCard = `
          <div class="col-lg-3 col-md-4 col-sm-6 col-12 mb-3 px-2">
              <div class="card">
                  <div class="card-body">
                  <div class="d-flex justify-content-center">
                      <img src="${product.imgSrc}" class="p-img img-fluid my-2  "></div>
                      <h6>${product.title}</h6>
                      <label>${product.category}</label>
                      <div class="d-flex">
                          <label class="my-2 fw-bold">${product.price} <i class="bi bi-currency-rupee"></i> /Day</label>
                      </div>
                      <div class="d-flex" id="star">${stars}</div>
                      <button class="btn-2 btn w-100" onclick="view(${product.id})">View Details</button>
                      <button class="add-to-cart container btn-slideshow btn my-2" onclick="addToCart(${product.id}, '${product.title}', ${product.price}, '${product.imgSrc}')">
                          Add to Cart <i class="bi bi-bag-plus"></i>
                      </button>
                  </div>
              </div>
          </div>
      `;
      productList.innerHTML += productCard;
  });
}


// Initial render
document.addEventListener('DOMContentLoaded', () => {
  renderProducts(products);
  calculate(); // Call calculate to set initial cart amount on page load
});

let basket = JSON.parse(localStorage.getItem('data')) || [];

let addToCart = (productId, productTitle, productPrice, productImgSrc) => {
  const existingProduct = basket.find(item => item.productId === productId);
  if (!existingProduct) {
    const newProduct = {
      productId: productId,
      productTitle: productTitle,
      productPrice: productPrice,
      productImgSrc: productImgSrc
    };
    basket.push(newProduct);
    localStorage.setItem('data', JSON.stringify(basket));
    calculate(); // Update the cart amount after adding an item
  } else {
    const modal = document.getElementById('cartModal');
    const modalMessage = document.getElementById('modalMessage');
    modalMessage.innerText = `${productTitle} is already in your cart.`;
    modal.style.display = 'block';
  }
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




// carousel js 

const carouselElement = document.querySelector('#carouselExampleDark');
const carousel = new bootstrap.Carousel(carouselElement, {
  interval: 1000,
  ride: 'carousel'
});
// carousel  js 

// modal pop up modal add to cart
document.addEventListener('click', function(event) {
  if (event.target.matches('.add-to-cart')) {
    const modal = document.getElementById('cartModal');
    modal.style.display = 'block';
  } else if (event.target.matches('.close')) {
    const modal = document.getElementById('cartModal');
    modal.style.display = 'none';
  } else if (event.target.matches('#cartModal')) {
    const modal = document.getElementById('cartModal');
    modal.style.display = 'none';
  }
});
// modal pop up modal add to cart




// filterproducts

function filterProducts() {
  const selectedCategories = Array.from(document.querySelectorAll('.filter-category:checked')).map(cb => cb.value);
  const selectedBrands = Array.from(document.querySelectorAll('.filter-brand:checked')).map(cb => cb.value);

  const filteredProducts = products.filter(product => {
    const matchCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category.replace(/<[^>]*>/g, '').trim());
    const matchBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    return matchCategory && matchBrand;
  });

  renderProducts(filteredProducts);
}

document.getElementById('applyFilters').addEventListener('click', filterProducts);

document.getElementById('resetFilters').addEventListener('click', function() {
  document.querySelectorAll('.filter-category, .filter-brand').forEach(checkbox => {
    checkbox.checked = false;
  });
  renderProducts(products);
});


// filterproducts 
