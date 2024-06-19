

// Function to update the selected location
function updateLocation(location) {
  localStorage.setItem('selectedLocation', location);
  document.getElementById('myBtn').innerText = location;
  var modal = document.getElementById("myModal");
  modal.style.display = "none"; // Close the modal after selecting location
}

// Retrieve the selected location from localStorage on page load
window.onload = function() {
  var selectedLocation = localStorage.getItem('selectedLocation');
  if (selectedLocation) {
    document.getElementById('myBtn').innerText = selectedLocation;
  } else {
    document.getElementById('myBtn').innerText = "Select Your Region";
  }
};

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




// // filter section
// document.addEventListener('DOMContentLoaded',function(){
//   const checkboxes = document.querySelectorAll('.form-check-input');
//   const productList = document.getElementById('product-list');


// function displayProducts(products){
//   productList.innerHTML='';
//   products.forEach(product =>{

 
//     const productDiv = document.createElement('div');
//     productDiv.className = 'item';
//     productDiv.textContent = '${product.name}';
//     productDiv.dataset.category = product.category;
//     productDiv.dataset.company=product.company;
//     productList.appendChild(productDiv);
//   })
// }


// function filterProducts(){
// const selectedCatogories = Array.from(document.querySelectorAll('.form-check-input:checked')).map(checkboxes=>checkboxes.id);
// const items = document.querySelectorAll('#product-list .item');

// items.forEach(item =>{
//   const itemCategory = item.dataset.category;
//   const itemCompany = item.dataset.company;
//   if(selectedCatogories.includes(itemCategory)|| selectedCatogories.includes(itemCompany)){
//     item.classList.remove('hidden');
//   }else{
//     item.classList.add('hidden');
//   }
// })
// }
// checkboxes.forEach(checkboxes =>{
//   checkboxes.addEventListener('change',filterProducts);
// })

// displayProducts(products)


// })


// // filter section