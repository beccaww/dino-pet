function fetchPets() {
  fetch('/pets')
    .then(res => res.json())
    .then(json => {
      $('#content').append(json.pets.map(displayPet));
    });
}

function displayPet(pet) {
  return `<div><form><h2><a href="/egg-pet.html?pet=${pet.id}">${pet.name}</a></h2><button type="submit" class="delete button" >Delete</button></form></div>`;
}

function deletePet(e, id) {
  e.preventDefault();
  fetch(`/egg-pet.html?pet=${pet.id}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json'
    },
  })
  //.then(res => res.json())
  //.then(json => console.log(json))
  .catch(err => console.error(err));
}

function initPets() {
  // fetch all the pets 
  fetchPets();
  
  // set up click events so that you can delete or navigate to a pet
  $('body').on('submit', 'form', deletePet);
}

$(initPets);

