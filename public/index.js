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
      let pets = localStorage.getItem('pets');
      pets = pets ? `${json.id},${pets}` : json.id;
      localStorage.setItem('pets', pets);
      window.location = ('/pets.html');
    })
    .catch(err => console.error(err));

}

function choosePet() {
  $('body').on('submit', 'form', fetchEgg);

}

$(choosePet);