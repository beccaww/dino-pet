function fetchPets() {
  const pets = getMyPets();


  Promise.all(pets.map(fetchPet)).then(pets => {
    const html = pets.map(displayPet).join('');
    $('#content').html(html);
  });

}

function getMyPets() {
  const petStr = localStorage.getItem('pets');
  return petStr ? petStr.split(',') : [];
}

const fetchPet = (petId) => {
  return fetch(`/pets/${petId}`)
    .then(res => res.json());
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
    .then(() => {
      const pets = getMyPets();
      pets.splice(pets.indexOf(petId), 1);
      localStorage.setItem('pets', pets.toString());
      fetchPets();
    })
    .catch(err => console.error(err));
  console.log("Deleting pet");
}

function initPets() {
  fetchPets();
  $('body').on('submit', 'form', deletePet);
}

$(initPets);