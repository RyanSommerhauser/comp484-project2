$(function() { // Makes sure that your function is called once all the DOM elements of the page are ready to be used.
    
    // Called function to update the name, happiness, and weight of our pet in our HTML
    checkAndUpdatePetInfoInHtml();
  
    // When each button is clicked, it will "call" function for that button (functions are below)
    $('.treat-button').click(clickedTreatButton);
    $('.play-button').click(clickedPlayButton);
    $('.exercise-button').click(clickedExerciseButton);
    $('.feed-button').click(clickedFeedButton);

  
    
  })
  
    // Add a variable "pet_info" equal to a object with the name (string), weight (number), and happiness (number) of your pet
    var pet_info = {
      name: "Fluffy",
      weight: 10,
      happiness: 50,
      hunger: 50
    };
  
    function clickedTreatButton() {
      pet_info.happiness += 10;
      pet_info.weight += 2;
      checkAndUpdatePetInfoInHtml();
    }
    
    function clickedPlayButton() {
      pet_info.happiness += 10;
      pet_info.weight -= 1;
      pet_info.hunger -= 5;
      checkAndUpdatePetInfoInHtml();
    }
    
    function clickedExerciseButton() {
      pet_info.happiness -= 5;
      pet_info.weight -= 3;
      pet_info.hunger -= 5;
      checkAndUpdatePetInfoInHtml();
    }
    function clickedFeedButton() {
      pet_info.hunger += 25;
      pet_info.weight += 2;
      checkAndUpdatePetInfoInHtml();
    }
  
    function checkAndUpdatePetInfoInHtml() {
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
  