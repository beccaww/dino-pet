function fetchEgg(e) {
  e.preventDefault();
  fetch('/pets', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        name: $('input.name:checked').val(),
        state: 'egg'
      })
    })
    .then(res => res.json())
    .then(json => {
      const pets = localStorage.getItem('pets');
      console.log('pets', pets);
      const pet_string = `${json.id},${pets}`;
      localStorage.setItem('pets', pet_string);
      window.location = ('/pets.html');
    })
    .catch(err => console.error(err));

}

function choosePet() {
  $('body').on('submit', 'form', fetchEgg);

}

$(choosePet);