function fetchPets() {
  fetch('/pets')
    .then(res => res.json())
    .then(json => {
      $('#content').append(json.pets.map(displayPet));
    });
}

function displayPet(pet) {
  return `<div><form><h3><a href="/egg-pet.html?pet=${pet.id}">${pet.name}</a></h3><button type="submit" class="delete button" >Delete</button></form></div>`;
}

function deletePet(e) {
  e.preventDefault();
  fetch(`/pets/${pet.id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        name: $('input.name:checked').val(),
        state: 'egg'
      })
    })
    .catch(err => console.error(err));
  console.log("Deleting pet");
}

function initPets() {
  // fetch all the pets 
  fetchPets();
  
  // set up click events so that you can delete or navigate to a pet
  $('body').on('submit', 'form', deletePet);
}

$(initPets);

