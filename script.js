$(function() { // Makes sure that your function is called once all the DOM elements of the page are ready to be used.
    
    // Called function to update the name, happiness, and weight of our pet in our HTML
    checkAndUpdatePetInfoInHtml();
  
    // When each button is clicked, it will "call" function for that button (functions are below)
    $('.add-pet-button').click(createPet);
    $('.treat-button').click(clickedTreatButton);
    $('.play-button').click(clickedPlayButton);
    $('.exercise-button').click(clickedExerciseButton);
    $('.feed-button').click(clickedFeedButton);

  
    
  })
  
    // Add a variable "pet_info" equal to a object with the name (string), weight (number), and happiness (number) of your pet
    var pet_info = null;
  
    function clickedFeedButton() {
      if (!pet_info) return;
      pet_info.hunger += 25;
      pet_info.weight += 2;

      showMessage(
        "Thanks for the food!",
        pet_info.name + " is eating...",
        2000
      );

      checkAndUpdatePetInfoInHtml();
    }
    
    function clickedTreatButton() {
      if (!pet_info) return;
      pet_info.happiness += 10;
      pet_info.weight += 2;

      showMessage(
        "Yum! That was tasty!",
        pet_info.name + " enjoyed the treat!",
        2000
      );

      checkAndUpdatePetInfoInHtml();
    }

    function clickedPlayButton() {
      if (!pet_info) return;
      pet_info.happiness += 10;
      pet_info.weight -= 1;
      pet_info.hunger -= 5;

      showMessage(
        "That was fun!",
        pet_info.name + " is playing!",
        2000
      );

      checkAndUpdatePetInfoInHtml();
    }

    function clickedExerciseButton() {
      if (!pet_info) return;
      pet_info.happiness -= 5;
      pet_info.weight -= 3;
      pet_info.hunger -= 5;

      showMessage(
        "I'm tired...",
        pet_info.name + " is exercising.",
        2000
      );

      checkAndUpdatePetInfoInHtml();
    }
  
    function checkAndUpdatePetInfoInHtml() {
      if (!pet_info) return;
      checkBoundsBeforeUpdating();
      updatePetInfoInHtml();
    }

    setInterval(function() {
      pet_info.hunger -= 1;
      checkAndUpdatePetInfoInHtml();
    }, 1000); // every 3 seconds

    setInterval(function() {
      pet_info.happiness -= 1;
      checkAndUpdatePetInfoInHtml();
    }, 3000); // every 3 seconds
    
    function checkBoundsBeforeUpdating() {
      if (pet_info.weight < 0) {
        pet_info.weight = 0;
      }
      if (pet_info.happiness < 0) {
        pet_info.happiness = 0;
      }
      if (pet_info.happiness > 100) {
        pet_info.happiness = 100;
      }
      if (pet_info.hunger < 0) {
        pet_info.hunger = 0;
      }
      if (pet_info.hunger > 100) {
        pet_info.hunger = 100;
      }
    }
    
    // Updates your HTML with the current values in your pet_info object
    function updatePetInfoInHtml() {
      $('.name').text(pet_info['name']);
      $('.weight').text(pet_info['weight']);
      $('.happiness').text(pet_info['happiness']);
      $('.hunger').text(pet_info.hunger);
    }

    function createPet() {
      var name = $('.pet-name-input').val();

      if (name.trim() === "") {
        return; // don't allow empty names
      }

      pet_info = {
        name: name,
        weight: 10,
        happiness: 50,
        hunger: 50
      };

      checkAndUpdatePetInfoInHtml();
    }

    function showMessage(mainText, subText, duration) {
    // Set text
    $('.pet-message-text').text(mainText);
    $('.pet-message-subtext').text(subText);

    // Show overlay
    $('.pet-message-overlay').fadeIn();

    // Disable buttons
    $('.button-container button').prop('disabled', true);

    // Hide after duration
    setTimeout(function() {
      $('.pet-message-overlay').fadeOut();

      // Re-enable buttons
      $('.button-container button').prop('disabled', false);
    }, duration);
  }
    