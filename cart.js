let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}






const cartLink = document.getElementById('cart-link');
const cartBox = document.getElementById('cart-box');

cartBox.style.display = 'none';


cartLink.addEventListener('click', () => {
  cartBox.style.display = cartBox.style.display === 'none' ? 'block' : 'none';
});













// add to cart 

function addToCart(image, name, price) {
  // create a new list item for the cart
  var listItem = document.createElement('li');
  
  // create an image element for the item
  var itemImage = document.createElement('img');
  itemImage.src = 'img/' + image;
  itemImage.alt = name;
  itemImage.style.width = '80px';
  
  // create a span element for the item name
  var itemName = document.createElement('span');
  itemName.textContent = name;
  
  // create a span element for the item price
  var itemPrice = document.createElement('span');
  itemPrice.textContent = price + '$';
  
  // add the image, name, and price elements to the list item
  listItem.appendChild(itemImage);
  listItem.appendChild(itemName);
  listItem.appendChild(itemPrice);
  
  // add the list item to the cart
  var cartItems = document.getElementById('cart-items');
  cartItems.appendChild(listItem);
}


function addToCart(image, name, price) {
  // Create a new row in the cart table
  var table = document.getElementById("cart-table");
  var row = table.insertRow(-1);

  // Insert the product image, name, and price in the row
  var cell1 = row.insertCell(0);
  cell1.innerHTML = "<img src='img/" + image + "' style='width: 130px;'>";

  var cell2 = row.insertCell(1);
  cell2.innerHTML = name;

  var cell3 = row.insertCell(2);
  cell3.innerHTML = price + "$";

  // Calculate the total price and update the "Total" label
  var total = document.getElementById("total");
  var currentTotal = parseFloat(total.innerHTML.replace("$", ""));
  var newTotal = currentTotal + price;
  total.innerHTML = newTotal.toFixed(2) + "$";
}


// Get the cart box and cart table elements

const cartTable = document.getElementById("cart-table");

// Listen for changes to the cart table
cartTable.addEventListener("DOMSubtreeModified", function() {
  // Add the stretch class to the cart box
  cartBox.classList.add("stretch");
});



