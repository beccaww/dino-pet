function fetchPets() {
  //get pet ids from local storage
  const pets = localStorage.getItem('pets');
  console.log(pets); 
  pets.split(',');
  console.log(pets.split(','));
  //iterate over all ids
  function forEachId(callback) {
    for (i=0; i < pets.length; i++) {
      callback(pets.key(i)); 
    }
}

  // display them
  fetch('/pets')
    .then(res => res.json())
    .then(json => {
      $('#content').html('');
      $('#content').append(json.pets.map(displayPet));
    });
}

function displayPet(pet) {
  return `
  <section>
    <form class="individual-pet-form">
      <h3>
        <a href="/egg-pet.html?pet=${pet.id}">${pet.name}</a>
      </h3>
      <input class="pet-id" type="hidden" value="${pet.id}" />
      <button type="submit" class="delete button" >Delete</button>
    </form>
  </section>`;
}

function deletePet(e) {
  const form = $(e.target);
  const petId = form.find('.pet-id').val();
  e.preventDefault();
  fetch(`/pets/${petId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(fetchPets)
    .catch(err => console.error(err));
  console.log("Deleting pet");
}

function initPets() {
  fetchPets();
  $('body').on('submit', 'form', deletePet);
}

$(initPets);