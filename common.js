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

// Navbar toggle function
document.getElementById('navbar-toggle-button').addEventListener('click', function() {
  var menu = document.getElementById('navbar-mobile-menu');
  menu.classList.toggle('open');
});

// Client-side validation for form submission
document.querySelector('form').addEventListener('submit', function(event) {
  const password = document.getElementById('password').value;
  const cpassword = document.getElementById('cpassword').value;

  if (password !== cpassword) {
      alert('Passwords do not match');
      event.preventDefault(); // Prevent form submission
  }
});
