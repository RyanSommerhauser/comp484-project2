$(function() { // Makes sure that your function is called once all the DOM elements of the page are ready to be used.
    $('.add-pet-button').click(createPet);
  })
  
function createPetBox(name) {
var box = $(`
  <div class="dashboard-box">

    <div class="pet-message-area">
      <p class="pet-message-text"></p>
      <p class="pet-message-subtext"></p>
    </div>

    <div class="pet-stats">
      <div>Name: <strong class="name"></strong></div>
      <div>Weight: <strong class="weight"></strong></div>
      <div>Happiness: <strong class="happiness"></strong></div>
      <div>Hunger: <strong class="hunger"></strong></div>
    </div>

    <div class="button-container">
      <button class="treat-button">Treat</button>
      <button class="play-button">Play</button>
      <button class="exercise-button">Exercise</button>
      <button class="feed-button">Feed</button>
    </div>

  </div>
`);

  // create pet object inside box
  box.data("pet", {
    name: name,
    weight: 10,
    happiness: 50,
    hunger: 50
  });

  updateBoxUI(box);

  // attach events
  attachPetEvents(box);

  return box;
}

function createPet() {
  var name = $('.pet-name-input').val();

  if (name.trim() === "") return;

  var box = createPetBox(name);

  $('.pet-container').append(box);

  $('.pet-name-input').val("");
};

function attachPetEvents(box) {

  box.find('.treat-button').click(function() {
    var pet = box.data("pet");

    pet.happiness += 10;
    pet.weight += 2;

    showMessage(box, "Yum!", pet.name + " loved the treat!", 2000);
    updateBoxUI(box);
  });

  box.find('.play-button').click(function() {
    var pet = box.data("pet");

    pet.happiness += 10;
    pet.weight -= 1;
    pet.hunger -= 5;

    showMessage(box, "Fun!", pet.name + " is playing!", 2000);
    updateBoxUI(box);
  });

  box.find('.exercise-button').click(function() {
    var pet = box.data("pet");

    pet.happiness -= 5;
    pet.weight -= 3;
    pet.hunger -= 5;

    showMessage(box, "Phew...", pet.name + " is tired!", 2000);
    updateBoxUI(box);
  });

  box.find('.feed-button').click(function() {
    var pet = box.data("pet");

    pet.hunger += 25;
    pet.weight += 2;

    showMessage(box, "Thanks!", pet.name + " is eating!", 2000);
    updateBoxUI(box);
  });
}


setInterval(function() {

  $('.dashboard-box').each(function() {
    var box = $(this);
    var pet = box.data("pet");

    if (!pet) return;

    pet.hunger -= 2;
    pet.happiness -= 1;

    updateBoxUI(box);
  });

}, 3000);

// unused right now
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

// Updates HTML with the current values in pet_info object
function updateBoxUI(box) {
  var pet = box.data("pet");

  box.find('.name').text(pet.name);
  box.find('.weight').text(pet.weight);
  box.find('.happiness').text(pet.happiness);
  box.find('.hunger').text(pet.hunger);
}


function showMessage(box, mainText, subText, duration) {
  // Set text inside this box only
  box.find('.pet-message-text').text(mainText);
  box.find('.pet-message-subtext').text(subText);

  // Show message
  box.find('.pet-message-area').fadeIn();

  // Disable only this box's buttons
  box.find('.button-container button').prop('disabled', true);

  setTimeout(function() {
    box.find('.pet-message-area').fadeOut();

    // Re-enable only this box's buttons
    box.find('.button-container button').prop('disabled', false);
  }, duration);
}
