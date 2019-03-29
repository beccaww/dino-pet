function fetchPets() {
  fetch('/pets')
    .then(res => res.json())
    .then(json => {
      $('#content').append(json.pets.map(displayPet));
    });
}

function displayPet(pet) {
  return `<div><a href="/egg-pet.html?pet=${pet.id}">${pet.name}</a></div>`;
}

function initPets() {
  // fetch all the pets 
  fetchPets();
  
  // set up click events so that you can delete or navigate to a pet
}

$(initPets);
