 
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

// calculate


