function fetchPets() {
  fetch('/pets')
    .then(res => res.json())
    .then(json => {
      $('#content').html('');
      $('#content').append(json.pets.map(displayPet));
    });
}

function displayPet(pet) {
  return `
  <div>
    <form class="individual-pet-form">
      <h3>
        <a href="/egg-pet.html?pet=${pet.id}">${pet.name}</a>
      </h3>
      <input class="pet-id" type="hidden" value="${pet.id}" />
      <button type="submit" class="delete button" >Delete</button>
    </form>
  </div>`;
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

